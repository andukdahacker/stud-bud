import Loading from "./Loading";

interface LoadMoreTriggerProps {
  loading: boolean;
  hasNextPage: boolean | undefined;
  loadMore(): void;
}

const LoadMoreTrigger = ({
  loading,
  hasNextPage,
  loadMore,
}: LoadMoreTriggerProps) => {
  if (loading) return <Loading />;
  if (!hasNextPage) return <div>End of list</div>;
  return (
    <div onClick={loadMore} className="cursor-pointer">
      Load more
    </div>
  );
};

export default LoadMoreTrigger;
