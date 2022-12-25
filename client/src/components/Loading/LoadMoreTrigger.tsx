import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

interface LoadMoreTriggerProps {
  loading: boolean;
  hasNextPage: boolean | undefined;
  loadMore: () => void;
}

const LoadMoreTrigger = ({
  loading,
  hasNextPage,
  loadMore,
}: LoadMoreTriggerProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const loader = useRef(loadMore);
  useEffect(() => {
    loader.current = loadMore;
  }, [loadMore]);
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loader.current();
      }
    });
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
  if (!hasNextPage) return null;
  return <div ref={setElement}></div>;
};

export default LoadMoreTrigger;
