interface SuggestionCardProps {
  value: string;
  searchQuery: (value: string) => any;
}

const SuggestionCard = ({ value, searchQuery }: SuggestionCardProps) => {
  return (
    <div
      onClick={() => {
        searchQuery(value);
      }}
      className="z-10 block w-full px-1 py-2 text-lg bg-white border-b border-l border-r border-gray-300 cursor-pointer font-lexend hover:bg-gray-200"
    >
      {value}
    </div>
  );
};

export default SuggestionCard;
