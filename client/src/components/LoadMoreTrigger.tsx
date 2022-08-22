import { useEffect, useRef, useState } from "react";
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
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
  }, [observer]);
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement && currentObserver) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement && currentObserver) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  if (loading) return <Loading />;
  if (!hasNextPage) return <div>End of list</div>;
  return <div ref={setElement}>Load more</div>;
};

export default LoadMoreTrigger;
