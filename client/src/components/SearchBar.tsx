import { ApolloQueryResult } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Exact,
  GetManyInterestsInput,
  GetManyProfilesInput,
  GetManyProfilesQuery,
  GetManyTutorOrdersInput,
  GetManyTutorOrdersQuery,
  useGetManyInterestsLazyQuery,
  useGetManyProfilesLazyQuery,
  useGetManyTutorOrdersLazyQuery,
  useGetUserQuery,
} from "../generated/graphql";
import {
  findOptions,
  PROFILES_TAKE_LIMIT,
  TUTOR_ORDER_TAKE_LIMIT,
} from "../utils/constants";
import useDebounce from "../utils/useDebounce";
import Loading from "./Loading";
import SuggestionCard from "./SuggestionCard";

interface SearchBarProps {
  findOption: findOptions;
  refetchManyProfiles(
    variables?:
      | Partial<
          Exact<{
            where: GetManyProfilesInput;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<GetManyProfilesQuery>>;

  refetchManyTutorOrders(
    variables?:
      | Partial<
          Exact<{
            where: GetManyTutorOrdersInput;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<GetManyTutorOrdersQuery>>;
}

const SearchBar = ({
  findOption,
  refetchManyProfiles,
  refetchManyTutorOrders,
}: SearchBarProps) => {
  const [
    getManyInterests,
    { data: getManyInterestsData, loading: getManyInterestsLoading },
  ] = useGetManyInterestsLazyQuery();
  const getManyInterestsSuccess =
    getManyInterestsData?.getManyInterests?.IOutput.success;
  const getManyInterestMessage =
    getManyInterestsData?.getManyInterests?.IOutput.message;
  const suggestions = getManyInterestsData?.getManyInterests?.Interest;
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;

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
    search_input: router.query.search_input
      ? (router.query.search_input as string)
      : "",
    take: PROFILES_TAKE_LIMIT,
  };
  const onSubmit = (values: GetManyProfilesInput) => {
    router.push(`/find?search_input=${values.search_input}`);
    if (user_profile_id) {
      if (findOption === "buddies") {
        refetchManyProfiles({
          where: {
            search_input: values.search_input,
            take: PROFILES_TAKE_LIMIT,
          },
        });
      } else if (findOption === "tutor orders") {
        refetchManyTutorOrders({
          where: {
            search_input: values.search_input,
            take: TUTOR_ORDER_TAKE_LIMIT,
          },
        });
      }
    }
  };

  if (findOption === null) return null;
  if (GetUserLoading) return <Loading />;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="flex flex-col items-center content-center justify-center w-full bg-center h-50 bg-gradient-to-r from-cyan-500 to-blue-500">
          <label className="m-6 text-3xl font-bold leading-9 text-white">
            Find your perfect {findOption}
          </label>
          <div className="mb-3">
            <Field
              placeholder="search by an interest or an username"
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
                    findOption={findOption}
                    refetchManyProfiles={refetchManyProfiles}
                    refetchManyTutorOrders={refetchManyTutorOrders}
                  />
                );
              })
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
