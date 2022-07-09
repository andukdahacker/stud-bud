import { NetworkStatus } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  TutorOrderTutorConnectStatusCode,
  useConnectTutorOrderMutation,
  useGetTutorOrderTutorConnectLazyQuery,
} from "../generated/graphql";
import Loading from "./Loading";

interface TutorOrderConnectButtonProps {
  user_profile_id: string | undefined;
  tutor_order_id: string | undefined;
  student_id: string | undefined;
}
const TutorOrderConnectButton = ({
  user_profile_id,
  tutor_order_id,
  student_id,
}: TutorOrderConnectButtonProps) => {
  const [
    getTutorOrderTutorConnect,
    { data, loading, refetch: refetchTutorOrderTutorConnect, networkStatus },
  ] = useGetTutorOrderTutorConnectLazyQuery();

  const refetchTutorOrderTutorConnectLoading =
    networkStatus == NetworkStatus.refetch;

  const [
    connect,
    { data: connectTutorOrderData, loading: ConnectTutorOrderLoading },
  ] = useConnectTutorOrderMutation();

  const connectTutorOrder = async () => {
    if (user_profile_id && tutor_order_id && student_id) {
      const connectResult = await connect({
        variables: {
          where: {
            tutor_id: user_profile_id,
            tutor_order_id,
            student_id,
          },
        },
      });

      if (connectResult.data?.connectTutorOrder?.IOutput.success) {
        await refetchTutorOrderTutorConnect({
          where1: {
            profile_id: user_profile_id,
          },
          where2: {
            id: tutor_order_id,
          },
        });
      }
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
            profile_id: user_profile_id as string,
          },
          where2: {
            id: tutor_order_id as string,
          },
        },
      });
    }

    if (user_profile_id && tutor_order_id) fetchData();
  }, [user_profile_id, tutor_order_id]);

  if (loading) return <Loading />;

  if (status === TutorOrderTutorConnectStatusCode.Requested) {
    return (
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Requested
        </button>
        <button type="button" className={`${hideButton}`}>
          Undo
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
        <button type="button" className={`${hideButton}`}>
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
        <button type="button" className={`${hideButton}`}>
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={connectTutorOrder}>
        {ConnectTutorOrderLoading || refetchTutorOrderTutorConnectLoading ? (
          <Loading />
        ) : (
          <div>Connect</div>
        )}
      </button>
    </div>
  );
};

export default TutorOrderConnectButton;
