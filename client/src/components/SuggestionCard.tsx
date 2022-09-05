import { SearchInput } from "../utils/types";

interface SuggestionCardProps {
  interest_name: string;
  onSubmit: (value: SearchInput) => void;
}

const SuggestionCard = ({ interest_name, onSubmit }: SuggestionCardProps) => {
  return (
    <div
      onClick={() => onSubmit({ search_input: interest_name })}
      className="z-10 block w-full px-1 py-2 text-lg bg-white border-b border-l border-r border-gray-300 cursor-pointer font-lexend hover:bg-gray-200"
    >
      {interest_name}
    </div>
  );
};

export default SuggestionCard;
