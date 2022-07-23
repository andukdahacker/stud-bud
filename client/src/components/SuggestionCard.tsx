import { ApolloQueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Exact,
  GetManyProfilesInput,
  GetManyProfilesQuery,
  GetManyTutorOrdersInput,
  GetManyTutorOrdersQuery,
  GetMyBuddiesInput,
  GetMyBuddiesQuery,
  ProfileWhereUniqueInput,
} from "../generated/graphql";
import {
  BUDDIES_TAKE_LIMIT,
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
  findOption: findOptions;
  user_profile_id: string | undefined;
}

const SuggestionCard = ({
  interest_name,
  refetchManyProfiles,
  refetchManyTutorOrders,
  refetchMyBuddies,
  findOption,
  user_profile_id,
}: SuggestionCardProps) => {
  const router = useRouter();

  const handleClick = (value: string) => {
    if (
      (refetchManyProfiles && findOption == "buddies") ||
      (refetchManyProfiles && findOption == "tutors")
    ) {
      router.push(`/spark-buddies/find?search_input=${value}`);
      refetchManyProfiles({
        where: {
          search_input: value,
          take: PROFILES_TAKE_LIMIT,
        },
      });
    } else if (findOption === "tutor orders" && refetchManyTutorOrders) {
      router.push(`/spark-buddies/find?search_input=${value}`);
      refetchManyTutorOrders({
        where: {
          search_input: value,
          take: TUTOR_ORDER_TAKE_LIMIT,
        },
      });
    } else if (
      findOption === "relationships" &&
      refetchMyBuddies &&
      user_profile_id
    ) {
      router.push(`/spark-buddies/buddies?search_input=${value}`);
      refetchMyBuddies({
        where: {
          profile_id: user_profile_id,
        },
        input: {
          take: BUDDIES_TAKE_LIMIT,
          search_input: value,
        },
      });
    }
  };
  return (
    <div
      onClick={() => handleClick(interest_name)}
      className="z-10 block w-full px-1 py-2 text-lg bg-white border-b border-l border-r border-gray-300 cursor-pointer font-lexend hover:bg-gray-200"
    >
      {interest_name}
    </div>
  );
};

export default SuggestionCard;
