import { ApolloQueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Exact,
  GetManyProfilesInput,
  GetManyProfilesQuery,
  GetManyTutorOrdersInput,
  GetManyTutorOrdersQuery,
} from "../generated/graphql";
import {
  findOptions,
  PROFILES_TAKE_LIMIT,
  TUTOR_ORDER_TAKE_LIMIT,
} from "../utils/constants";

interface SuggestionCardProps {
  interest_name: string;
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
  findOption: findOptions;
}

const SuggestionCard = ({
  interest_name,
  refetchManyProfiles,
  refetchManyTutorOrders,
  findOption,
}: SuggestionCardProps) => {
  const router = useRouter();

  const handleClick = (value: string) => {
    router.push(`/find?search_input=${value}`);

    if (
      (refetchManyProfiles && findOption == "buddies") ||
      (refetchManyProfiles && findOption == "tutors")
    ) {
      refetchManyProfiles({
        where: {
          search_input: value,
          take: PROFILES_TAKE_LIMIT,
        },
      });
    } else if (findOption === "tutor orders" && refetchManyTutorOrders) {
      refetchManyTutorOrders({
        where: {
          search_input: value,
          take: TUTOR_ORDER_TAKE_LIMIT,
        },
      });
    }
  };
  return (
    <div
      onClick={() => handleClick(interest_name)}
      className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl hover:cursor-pointer shadow-sm shadow-gray-500"
    >
      #{interest_name}
    </div>
  );
};

export default SuggestionCard;
