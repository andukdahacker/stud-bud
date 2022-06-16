import { NetworkStatus } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ProfileCard from "../components/ProfileCard";
import SuggestionCard from "../components/SuggestionCard";
import {
  GetManyInterestsInput,
  GetManyProfilesInput,
  useGetManyInterestsLazyQuery,
  useGetManyProfilesQuery,
} from "../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../utils/constants";
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
  const router = useRouter();

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch)
      getManyInterests({
        variables: {
          where: {
            search_input: search,
          },
        },
      });
  }, [debouncedSearch]);

  const initialValues: GetManyInterestsInput & GetManyProfilesInput = {
    search_input: "",
    take: PROFILES_TAKE_LIMIT,
  };

  const onSubmit = (values: GetManyProfilesInput) => {
    router.push(`/find-buddy?search_input=${values.search_input}`);
    refetch({
      where: {
        search_input: values.search_input,
        take: PROFILES_TAKE_LIMIT,
      },
    });
  };

  const {
    data: getManyProfilesData,
    loading: getManyProfilesLoading,
    fetchMore,
    refetch,
    networkStatus,
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
    <Layout>
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
                    refetch={refetch}
                  />
                );
              })
            )}
          </div>
        </Form>
      </Formik>

      <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
        {!getManyProfilesSuccess ? (
          <div>{getManyProfilesMessage}</div>
        ) : profiles!.length == 0 ? (
          <div>Sorry, we found no result for your search</div>
        ) : (
          profiles!.map((profile, index) => {
            const interests = profile?.profile_interests?.map((obj) => {
              return { interest_name: obj?.interest.interest_name as string };
            });
            return (
              <div key={index}>
                <ProfileCard
                  id={profile?.id}
                  username={profile?.user?.username}
                  avatar={
                    profile?.profile_avatar ? profile.profile_avatar : undefined
                  }
                  interests={interests}
                />
              </div>
            );
          })
        )}
      </div>
      {getManyProfilesPageInfo?.hasNextPage ? (
        <button onClick={loadMore} type="button">
          {getManyProfilesLoading ||
          networkStatus == NetworkStatus.fetchMore ||
          networkStatus == NetworkStatus.loading ? (
            <Loading />
          ) : (
            <div>Load more</div>
          )}
        </button>
      ) : (
        <div>End of list</div>
      )}
    </Layout>
  );
};

export default FindBuddy;
