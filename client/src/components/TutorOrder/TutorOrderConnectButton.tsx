import { NetworkStatus } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  TutorOrderTutorConnectStatusCode,
  useConnectTutorOrderMutation,
  useGetTutorOrderTutorConnectLazyQuery,
  useRespondTutorOrderConnectMutation,
  useDeleteTutorOrderConnectMutation,
} from "../../generated/graphql";
import Loading from "../Loading/Loading";

interface TutorOrderConnectButtonProps {
  user_profile_id: string | undefined;
  tutor_order_id: string | undefined;
  student_id: string | undefined;
}
const TutorOrderConnectButton = ({
  user_profile_id: tutor_id,
  tutor_order_id,
  student_id,
}: TutorOrderConnectButtonProps) => {
  const [
    getTutorOrderTutorConnect,
    { data, loading, refetch: refetchTutorOrderTutorConnect, networkStatus },
  ] = useGetTutorOrderTutorConnectLazyQuery();

  const refetchTutorOrderTutorConnectLoading =
    networkStatus == NetworkStatus.refetch;

  const [connect, { loading: ConnectTutorOrderLoading }] =
    useConnectTutorOrderMutation();

  const [respond, { loading: ReconnectTutorOrderLoading }] =
    useRespondTutorOrderConnectMutation();

  const [undoOrDisconnect, { loading: DeleteTutorOrderLoading }] =
    useDeleteTutorOrderConnectMutation();

  const connectTutorOrder = async () => {
    if (tutor_id && tutor_order_id && student_id) {
      const connectResult = await connect({
        variables: {
          where: {
            tutor_id,
            tutor_order_id,
            student_id,
          },
        },
      });

      if (connectResult.data?.connectTutorOrder?.IOutput.success) {
        await refetchTutorOrderTutorConnect({
          where1: {
            profile_id: tutor_id,
          },
          where2: {
            id: tutor_order_id,
          },
        });
      }
    }
  };

  const reconnectTutorOrder = async () => {
    if (tutor_id && tutor_order_id && student_id) {
      const result = await respond({
        variables: {
          where: {
            tutor_id,
            tutor_order_id,
            student_id,
            status: TutorOrderTutorConnectStatusCode.Requested,
          },
        },
      });

      if (result.data?.respondTutorOrderConnect?.IOutput.success) {
        refetchTutorOrderTutorConnect({
          where1: {
            profile_id: tutor_id,
          },
          where2: {
            id: tutor_order_id,
          },
        });
      }
      setHideButton("hidden");
    }
  };

  const deleteTutorOrder = async () => {
    if (tutor_id && tutor_order_id) {
      const result = await undoOrDisconnect({
        variables: {
          where1: {
            id: tutor_order_id,
          },
          where2: {
            profile_id: tutor_id,
          },
        },
      });

      if (result.data?.deleteTutorOrderConnect?.IOutput.success) {
        refetchTutorOrderTutorConnect({
          where1: {
            profile_id: tutor_id,
          },
          where2: {
            id: tutor_order_id,
          },
        });
      }
      setHideButton("hidden");
    }
  };

  const [hideButton, setHideButton] = useState<string>("hidden");
  const respondButtonHandleClick = () => {
    if (hideButton === "hidden") setHideButton("");
    if (hideButton === "") setHideButton("hidden");
  };

  const status =
    data?.getTutorOrderTutorConnect?.tutor_order_tutor_connect?.status;
  useEffect(() => {
    async function fetchData() {
      await getTutorOrderTutorConnect({
        variables: {
          where1: {
            profile_id: tutor_id as string,
          },
          where2: {
            id: tutor_order_id as string,
          },
        },
        fetchPolicy: "cache-and-network",
      });
    }

    if (tutor_id && tutor_order_id) fetchData();
  }, [tutor_id, tutor_order_id]);

  if (
    loading ||
    ConnectTutorOrderLoading ||
    ReconnectTutorOrderLoading ||
    DeleteTutorOrderLoading ||
    refetchTutorOrderTutorConnectLoading
  )
    return <Loading />;

  if (status === TutorOrderTutorConnectStatusCode.Requested) {
    return (
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Requested
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={deleteTutorOrder}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (status === TutorOrderTutorConnectStatusCode.Accepted) {
    return (
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Connected
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={deleteTutorOrder}
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (status === TutorOrderTutorConnectStatusCode.Declined) {
    return (
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Declined
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={reconnectTutorOrder}
        >
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={connectTutorOrder}>
        <div>Connect</div>
      </button>
    </div>
  );
};

export default TutorOrderConnectButton;
