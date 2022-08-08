import {
  TutorOrderTutorConnectStatusCode,
  useRespondTutorOrderConnectMutation,
} from "../generated/graphql";
import Loading from "./Loading";

interface TutorOrderRespondButtonProps {
  status: TutorOrderTutorConnectStatusCode | undefined;
  tutor_order_id: string | undefined;
  tutor_id: string | undefined;
  student_id: string | undefined;
}

const TutorOrderRespondButton = ({
  status,
  tutor_order_id,
  tutor_id,
  student_id,
}: TutorOrderRespondButtonProps) => {
  const [
    respond,
    {
      data: RespondTutorOrderRequestData,
      loading: RespondTutorOrderRequestLoading,
    },
  ] = useRespondTutorOrderConnectMutation();
  if (status === TutorOrderTutorConnectStatusCode.Requested) {
    const respondSuccess =
      RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.success;
    const respondMessage =
      RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.message;

    const respondTutorOrderRequest = async (
      option: TutorOrderTutorConnectStatusCode
    ) => {
      if (tutor_order_id && tutor_id && student_id)
        await respond({
          variables: {
            where: {
              tutor_order_id,
              tutor_id,
              student_id,
              status: option,
            },
          },
        });
    };

    return (
      <div>
        {RespondTutorOrderRequestLoading ? (
          <Loading />
        ) : respondSuccess ? (
          <div>{respondMessage}</div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() =>
                respondTutorOrderRequest(
                  TutorOrderTutorConnectStatusCode.Accepted
                )
              }
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() =>
                respondTutorOrderRequest(
                  TutorOrderTutorConnectStatusCode.Declined
                )
              }
            >
              Decline
            </button>
          </div>
        )}
      </div>
    );
  }

  if (status === TutorOrderTutorConnectStatusCode.Declined) {
    return <div>Declined</div>;
  }

  if (status === TutorOrderTutorConnectStatusCode.Accepted) {
    return <div>Accepted</div>;
  }
  return null;
};

export default TutorOrderRespondButton;
