import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import SuggestionCard from "../components/SuggestionCard";
import {
  GetManyInterestsInput,
  GetManyProfilesInput,
  useGetManyInterestsLazyQuery,
  useGetManyProfilesQuery,
} from "../generated/graphql";
import useDebounce from "../utils/useDebounce";

const FindBuddy = () => {
  const [
    getManyInterests,
    { data: getManyInterestsData, loading: getManyInterestsLoading },
  ] = useGetManyInterestsLazyQuery();
  const getManyInterestsSuccess =
    getManyInterestsData?.getManyInterests?.IOutput.success;
  const getManyInterestMessage =
    getManyInterestsData?.getManyInterests?.IOutput.message;
  const suggestions = getManyInterestsData?.getManyInterests?.Interest;

  const [search, setSearch] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    async function fetchData() {
      await getManyInterests({
        variables: {
          where: {
            search_input: search,
          },
        },
      });
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const router = useRouter();

  const PROFILES_TAKE_LIMIT = 1;

  const initialValues: GetManyInterestsInput & GetManyProfilesInput = {
    search_input: "",
    take: PROFILES_TAKE_LIMIT,
  };

  const onSubmit = (values: GetManyProfilesInput) => {
    router.push(`/find-buddy?search_input=${values.search_input}`, undefined, {
      shallow: true,
    });
  };

  const {
    data: getManyProfilesData,
    loading: getManyProfilesLoading,
    fetchMore,
  } = useGetManyProfilesQuery({
    variables: {
      where: {
        search_input: router.query ? (router.query.search_input as string) : "",
        take: PROFILES_TAKE_LIMIT,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const getManyProfilesSuccess =
    getManyProfilesData?.getManyProfiles?.IOutput.success;

  const getManyProfilesMessage =
    getManyProfilesData?.getManyProfiles?.IOutput.message;
  const profiles = getManyProfilesData?.getManyProfiles?.Profile;

  const getManyProfilesPageInfo =
    getManyProfilesData?.getManyProfiles?.PageInfo;

  const loadMore = () => {
    fetchMore({
      variables: {
        where: {
          search_input: router.query
            ? (router.query.search_input as string)
            : "",
          take: PROFILES_TAKE_LIMIT,
          cursor: profiles![profiles!.length - 1]?.createdAt,
        },
      },
    });
  };

  return (
    <div className="flex flex-col ">
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="flex flex-col items-center content-center justify-center w-full bg-center h-50 bg-gradient-to-r from-cyan-500 to-blue-500">
            <label className="m-6 text-3xl font-bold leading-9 text-white">
              Find your perfect buddy
            </label>
            <div className="mb-3">
              <Field
                placeholder="what are you interested in?"
                type="search"
                name="search_input"
                onKeyUp={handleChange}
                className="p-1 m-1 rounded-md w-96"
              />
              {/* <button type="submit" className="bg-green-700">
                Search
              </button> */}
            </div>
            <div className="flex content-center h-14">
              {getManyInterestsLoading ? (
                <Loading />
              ) : !getManyInterestsSuccess ? (
                <div>{getManyInterestMessage}</div>
              ) : !suggestions || !search ? null : (
                suggestions.map((interest, index) => {
                  return (
                    <SuggestionCard
                      key={index}
                      interest_name={interest?.interest_name as string}
                    />
                  );
                })
              )}
            </div>
          </Form>
        </Formik>
      </div>

      <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
        {getManyProfilesLoading ? (
          <Loading />
        ) : !getManyProfilesSuccess ? (
          <div>{getManyProfilesMessage}</div>
        ) : profiles!.length == 0 ? (
          <div>Sorry, we found no result for your search</div>
        ) : (
          profiles!.map((profile, index) => {
            const interests = profile?.profile_interests?.map((obj) => {
              return { interest_name: obj?.interest.interest_name as string };
            });
            return (
              <ProfileCard
                key={index}
                username={profile?.user?.username}
                avatar={
                  profile?.profile_avatar ? profile.profile_avatar : undefined
                }
                interests={interests}
              />
            );
          })
        )}
      </div>
      {getManyProfilesPageInfo?.hasNextPage ? (
        <button onClick={loadMore} type="button">
          Load more
        </button>
      ) : (
        <div>End of list</div>
      )}
    </div>
  );
};

export default FindBuddy;
