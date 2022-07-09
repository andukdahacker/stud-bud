import { TutorOrderTutorConnectStatusCode } from "../generated/graphql";

interface TutorOrderRespondButtonProps {
  status: TutorOrderTutorConnectStatusCode;
}

const TutorOrderRespondButton = ({ status }: TutorOrderRespondButtonProps) => {
  if (status === TutorOrderTutorConnectStatusCode.Requested) {
    return <div></div>;
  }

  if (status === TutorOrderTutorConnectStatusCode.Declined) {
    return <div></div>;
  }

  if (status === TutorOrderTutorConnectStatusCode.Accepted) {
    return <div></div>;
  }
  return null;
};

export default TutorOrderRespondButton;
