import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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

  const initialValues: GetManyInterestsInput & GetManyProfilesInput = {
    search_input: "",
  };

  const onSubmit = (values: GetManyProfilesInput) => {
    router.push(`/find-buddy?search_input=${values.search_input}`, undefined, {
      shallow: true,
    });
  };

  const { data: getManyProfilesData, loading: getManyProfilesLoading } =
    useGetManyProfilesQuery({
      variables: {
        where: {
          search_input: router.query
            ? (router.query.search_input as string)
            : "",
        },
      },
    });
  const getManyProfilesSuccess =
    getManyProfilesData?.getManyProfiles?.IOutput.success;
  const getManyProfilesMessage =
    getManyProfilesData?.getManyProfiles?.IOutput.message;
  const profiles = getManyProfilesData?.getManyProfiles?.Profile;

  return (
    <>
      <NavBar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field
            placeholder="search"
            type="search"
            name="search_input"
            onKeyUp={handleChange}
          />
          <button type="submit">Search</button>
          {getManyInterestsLoading ? (
            <div>Loading...</div>
          ) : !getManyInterestsSuccess ? (
            <div>{getManyInterestMessage}</div>
          ) : !suggestions || !search ? null : (
            suggestions.map((interest, index) => {
              //component: Search suggestions
              return (
                <div key={index}>
                  <p>{interest?.interest_name}</p>
                </div>
              );
            })
          )}
        </Form>
      </Formik>

      <h2>Profiles</h2>
      {getManyProfilesLoading ? (
        <div>Loading...</div>
      ) : !getManyProfilesSuccess ? (
        <div>{getManyProfilesMessage}</div>
      ) : profiles!.length == 0 ? (
        <div>Sorry, we found no result for your search</div>
      ) : (
        profiles!.map((profile, index) => {
          //component: Search profile results
          return (
            <div key={index}>
              <p>{profile?.user?.username}</p>
            </div>
          );
        })
      )}
    </>
  );
};

export default FindBuddy;
