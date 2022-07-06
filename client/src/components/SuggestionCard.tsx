import { useRouter } from "next/router";
import { useGetManyProfilesLazyQuery } from "../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../utils/constants";

interface SuggestionCardProps {
  interest_name: string;
}

const SuggestionCard = (props: SuggestionCardProps) => {
  const router = useRouter();
  const [_, { refetch }] = useGetManyProfilesLazyQuery();
  const handleClick = (value: string) => {
    router.push(`/find?search_input=${value}`);
    refetch({
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
