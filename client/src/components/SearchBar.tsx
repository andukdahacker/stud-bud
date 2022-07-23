import { ApolloQueryResult } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Exact,
  GetManyInterestsInput,
  GetManyProfilesInput,
  GetManyProfilesQuery,
  GetManyTutorOrdersInput,
  GetManyTutorOrdersQuery,
  GetMyBuddiesInput,
  GetMyBuddiesQuery,
  ProfileWhereUniqueInput,
  useGetManyInterestsLazyQuery,
  useGetUserQuery,
} from "../generated/graphql";
import {
  BUDDIES_TAKE_LIMIT,
  findOptions,
  PROFILES_TAKE_LIMIT,
  TUTOR_ORDER_TAKE_LIMIT,
} from "../utils/constants";
import useDebounce from "../utils/useDebounce";
import Loading from "./Loading";
import SuggestionCard from "./SuggestionCard";

interface SearchBarProps {
  findOption: findOptions;
  refetchManyProfiles?(
    variables?:
      | Partial<
          Exact<{
            where: GetManyProfilesInput;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<GetManyProfilesQuery>>;

  refetchManyTutorOrders?(
    variables?:
      | Partial<
          Exact<{
            where: GetManyTutorOrdersInput;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<GetManyTutorOrdersQuery>>;

  refetchMyBuddies?(
    variables?:
      | Partial<
          Exact<{
            where: ProfileWhereUniqueInput;
            input: GetMyBuddiesInput;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<GetMyBuddiesQuery>>;
}

const SearchBar = ({
  findOption,
  refetchManyProfiles,
  refetchManyTutorOrders,
  refetchMyBuddies,
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
  const [hiddenSuggest, setHiddenSuggest] = useState(true);
  const [mouseAtSuggest, setMouseAtSuggest] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (hiddenSuggest === true) setHiddenSuggest(false);
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
    if (user_profile_id) {
      if (findOption === "buddies" && refetchManyProfiles) {
        router.push(`/spark-buddies/find?search_input=${values.search_input}`);
        refetchManyProfiles({
          where: {
            search_input: values.search_input,
            take: PROFILES_TAKE_LIMIT,
          },
        });
      } else if (findOption === "tutor orders" && refetchManyTutorOrders) {
        router.push(`/spark-buddies/find?search_input=${values.search_input}`);
        refetchManyTutorOrders({
          where: {
            search_input: values.search_input,
            take: TUTOR_ORDER_TAKE_LIMIT,
          },
        });
      } else if (findOption === "relationships" && refetchMyBuddies) {
        router.push(
          `/spark-buddies/buddies?search_input=${values.search_input}`
        );
        refetchMyBuddies({
          where: {
            profile_id: user_profile_id,
          },
          input: {
            take: BUDDIES_TAKE_LIMIT,
            search_input: values.search_input,
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
        <Form className="flex flex-col items-center justify-center p-5 ">
          <div className="relative inline-block w-1/3 ">
            <Field
              placeholder="search by an interest or an username"
              type="search"
              name="search_input"
              onKeyUp={handleChange}
              onBlur={() => {
                if (mouseAtSuggest == false) setHiddenSuggest(true);
              }}
              className="w-full p-3 border border-black"
            />
            <button type="submit" className="absolute right-3 bottom-3">
              <FontAwesomeIcon icon="magnifying-glass" size="lg" />
            </button>
            <div
              onMouseEnter={() => setMouseAtSuggest(true)}
              onMouseLeave={() => setMouseAtSuggest(false)}
              onClick={() => setHiddenSuggest(true)}
              className={`${
                hiddenSuggest ? "hidden" : null
              } absolute flex flex-col items-start justify-center w-full max-h-56 overflow-auto`}
            >
              {getManyInterestsLoading ? (
                <Loading />
              ) : !getManyInterestsSuccess ? (
                <div>{getManyInterestMessage}</div>
              ) : !suggestions || !search ? null : (
                suggestions.map((interest, index) => {
                  return (
                    <SuggestionCard
                      key={index}
                      user_profile_id={user_profile_id}
                      interest_name={interest?.interest_name as string}
                      findOption={findOption}
                      refetchManyProfiles={refetchManyProfiles}
                      refetchManyTutorOrders={refetchManyTutorOrders}
                      refetchMyBuddies={refetchMyBuddies}
                    />
                  );
                })
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
