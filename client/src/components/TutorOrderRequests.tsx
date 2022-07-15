import { useEffect } from "react";
import { useGetManyTutorOrderRequestsLazyQuery } from "../generated/graphql";
import Loading from "./Loading";
import TutorOrderRequestCard from "./TutorOrderRequestCard";

interface TutorOrderRequestsProps {
  tutor_order_id: string | undefined;
}

const TutorOrderRequests = ({ tutor_order_id }: TutorOrderRequestsProps) => {
  const [
    getTutorOrderRequests,
    { data: getTutorOrderRequestData, loading: getTutorRequestsLoading },
  ] = useGetManyTutorOrderRequestsLazyQuery();

  const success =
    getTutorOrderRequestData?.getManyTutorOrderRequests?.IOutput.success;
  const message =
    getTutorOrderRequestData?.getManyTutorOrderRequests?.IOutput.message;
  const requests =
    getTutorOrderRequestData?.getManyTutorOrderRequests
      ?.tutor_order_tutor_connect;
  useEffect(() => {
    async function fetchData() {
      await getTutorOrderRequests({
        variables: {
          where: {
            id: tutor_order_id as string,
          },
        },
        fetchPolicy: "cache-and-network",
      });
    }

    if (tutor_order_id) fetchData();
  }, [tutor_order_id]);

  if (getTutorRequestsLoading) return <Loading />;
  if (!success) return <div>{message}</div>;
  if (requests && requests?.length === 0) return <div>No requests</div>;
  return (
    <div>
      <div>Requests</div>
      {requests?.map((request, index) => {
        return <TutorOrderRequestCard key={index} data={request} />;
      })}
    </div>
  );
};

export default TutorOrderRequests;
