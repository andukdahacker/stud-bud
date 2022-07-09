import Link from "next/link";
import { GetTutorOrderQuery, useGetUserQuery } from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import SuggestionCard from "./SuggestionCard";
import TutorOrderConnectButton from "./TutorOrderConnectButton";
import TutorOrderRequests from "./TutorOrderRequests";

interface TutorOrderPageProps {
  data: GetTutorOrderQuery | undefined;
  loading: boolean;
}

const TutorOrderPage = ({
  data,
  loading: GetTutorOrderLoading,
}: TutorOrderPageProps) => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const GetTutorOrderData = data?.getTutorOrder?.tutor_order;
  const GetTutorOrderSuccess = data?.getTutorOrder?.IOutput.success;
  const GetTutorOrderMessage = data?.getTutorOrder?.IOutput.message;
  const tutor_order_id = GetTutorOrderData?.id;
  const student = GetTutorOrderData?.student;
  const student_id = student?.id;
  const problem = GetTutorOrderData?.problem;
  const tutor_order_interests = GetTutorOrderData?.tutor_order_interest;
  const tutor_requirements = GetTutorOrderData?.tutor_requirements;

  if (GetTutorOrderLoading || GetUserLoading) return <Loading />;
  if (!GetTutorOrderSuccess) return <div>{GetTutorOrderMessage}</div>;
  if (user_profile_id !== student_id) {
    return (
      <div>
        <div>
          <Avatar img_url={student?.profile_avatar} width={40} height={40} />
          <div>Student: {student?.user?.username}</div>
        </div>

        <div>
          <TutorOrderConnectButton
            user_profile_id={user_profile_id}
            tutor_order_id={tutor_order_id}
            student_id={student_id}
          />
          <div>Problem: {problem}</div>

          <div>Tutor requirements: {tutor_requirements}</div>

          <div>
            {tutor_order_interests?.map((interest, index) => {
              return (
                <SuggestionCard
                  key={index}
                  interest_name={interest.interest.interest_name as string}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Link href={`/one-hour-tutor/edit/${tutor_order_id}`}>
        <a>Edit</a>
      </Link>
      <div>
        <div>Problem: {problem}</div>

        <div>Tutor requirements: {tutor_requirements}</div>

        <div>
          {tutor_order_interests?.map((interest, index) => {
            return (
              <SuggestionCard
                key={index}
                interest_name={interest.interest.interest_name as string}
              />
            );
          })}
        </div>
      </div>
      <TutorOrderRequests tutor_order_id={tutor_order_id} />
    </div>
  );
};

export default TutorOrderPage;
