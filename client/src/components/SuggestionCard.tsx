import { useRouter } from "next/router";

interface SuggestionCardProps {
  interest_name: string;
}

const SuggestionCard = (props: SuggestionCardProps) => {
  const router = useRouter();
  const handleClick = (value: string) => {
    router.push(`/find-buddy?search_input=${value}`, undefined, {
      shallow: true,
    });
  };
  return (
    <div onClick={() => handleClick(props.interest_name)}>
      #{props.interest_name}
    </div>
  );
};

export default SuggestionCard;
