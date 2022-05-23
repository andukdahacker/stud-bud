import { ApolloQueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Exact,
  GetManyProfilesInput,
  GetManyProfilesQuery,
} from "../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../utils/constants";

interface SuggestionCardProps {
  interest_name: string;
  refetch: (
    variables?: Partial<Exact<{ where: GetManyProfilesInput }>> | undefined
  ) => Promise<ApolloQueryResult<GetManyProfilesQuery>>;
}

const SuggestionCard = (props: SuggestionCardProps) => {
  const router = useRouter();
  const handleClick = (value: string) => {
    router.push(`/find-buddy?search_input=${value}`);
    props.refetch({
      where: {
        search_input: value,
        take: PROFILES_TAKE_LIMIT,
      },
    });
  };
  return (
    <div
      onClick={() => handleClick(props.interest_name)}
      className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl hover:cursor-pointer shadow-sm shadow-gray-500"
    >
      #{props.interest_name}
    </div>
  );
};

export default SuggestionCard;
