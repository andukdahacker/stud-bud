import { useRouter } from "next/router";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import useDebounce from "../../utils/useDebounce";

interface SearchBarProps {
  searchQuery: (value: string) => any;
}

const SearchBar = ({
  searchQuery,
  children,
}: PropsWithChildren<SearchBarProps>) => {
  const router = useRouter();
  const search_query_string = router.query.search_query as string;
  const [search, setSearch] = useState<string>("");
  const [hiddenSuggest, setHiddenSuggest] = useState(true);
  const [mouseAtSuggest, setMouseAtSuggest] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (hiddenSuggest === true) setHiddenSuggest(false);
  };

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) searchQuery(debouncedSearch);
  }, [debouncedSearch]);
  useEffect(() => {
    if (router.isReady && search_query_string) {
      setSearch(search_query_string);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="relative w-full h-full ">
      <input
        value={search}
        type="search"
        placeholder="search"
        onChange={handleChange}
        onBlur={() => {
          if (mouseAtSuggest == false) setHiddenSuggest(true);
        }}
        className="w-full h-full px-2 py-1 border border-black rounded-md"
      />

      {hiddenSuggest || search == "" ? null : (
        <div
          onMouseEnter={() => setMouseAtSuggest(true)}
          onMouseLeave={() => setMouseAtSuggest(false)}
          onClick={() => setHiddenSuggest(true)}
          className="absolute flex flex-col items-start justify-center w-full overflow-y-scroll max-h-56"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
