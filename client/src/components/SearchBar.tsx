import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetManyInterestsLazyQuery,
  useGetUserQuery,
} from "../generated/graphql";

import { SearchInput } from "../utils/types";
import useDebounce from "../utils/useDebounce";
import Loading from "./Loading";
import SuggestionCard from "./SuggestionCard";

interface SearchBarProps {
  onSubmit: (value: SearchInput) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
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

  const initialValues = {
    search_input: router.query.search_input
      ? (router.query.search_input as string)
      : "",
  };

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
                  const interest_name = interest?.interest_name;
                  return (
                    <SuggestionCard
                      key={index}
                      onSubmit={onSubmit}
                      interest_name={interest_name!}
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
