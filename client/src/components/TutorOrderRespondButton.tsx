import {
  TutorOrderTutorConnectStatusCode,
  useRespondTutorOrderConnectMutation,
} from "../generated/graphql";
import Loading from "./Loading";

interface TutorOrderRespondButtonProps {
  status: TutorOrderTutorConnectStatusCode | undefined;
  tutor_order_id: string | undefined;
  profile_id: string | undefined;
}

const TutorOrderRespondButton = ({
  status,
  tutor_order_id,
  profile_id,
}: TutorOrderRespondButtonProps) => {
  if (status === TutorOrderTutorConnectStatusCode.Requested) {
    const [
      respond,
      {
        data: RespondTutorOrderRequestData,
        loading: RespondTutorOrderRequestLoading,
      },
    ] = useRespondTutorOrderConnectMutation();

    const respondSuccess =
      RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.success;
    const respondMessage =
      RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.message;

    const respondTutorOrderRequest = async (
      option: TutorOrderTutorConnectStatusCode
    ) => {
      await respond({
        variables: {
          where: {
            id: tutor_order_id as string,
          },
          input: {
            tutor_id: profile_id as string,
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
