import Link from "next/link";
import { GetTutorOrderQuery, useGetUserQuery } from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
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
  const tutor = GetTutorOrderData?.tutor;
  const tutor_id = tutor?.id;
  const tutor_username = tutor?.user?.username;
  const tutor_profile_avatar = tutor?.profile_avatar;

  if (GetTutorOrderLoading || GetUserLoading) return <Loading />;
  if (!GetTutorOrderSuccess) return <div>{GetTutorOrderMessage}</div>;
  if (user_profile_id !== student_id) {
    return (
      <div>
        <div>
          <div>Student:</div>
          <Link href={`/profile/${student_id}`}>
            <a>
              <Avatar
                img_url={student?.profile_avatar}
                width={40}
                height={40}
              />
              <div>
                <b>{student?.user?.username}</b>{" "}
              </div>
            </a>
          </Link>
        </div>
        {tutor_id && tutor_id !== user_profile_id ? null : (
          <TutorOrderConnectButton
            user_profile_id={user_profile_id}
            tutor_order_id={tutor_order_id}
            student_id={student_id}
          />
        )}

        <div>
          <div>Tutor:</div>
          {tutor_id ? (
            <Link href={`/profile/${tutor_id}`}>
              <a>
                <Avatar img_url={tutor_profile_avatar} width={40} height={40} />
                <div>
                  <b>{tutor_username}</b>
                </div>
              </a>
            </Link>
          ) : (
            <div>No tutor yet</div>
          )}
        </div>

        <div>
          <div>Problem: {problem}</div>

          <div>Tutor requirements: {tutor_requirements}</div>

          <div>
            {tutor_order_interests?.map((interest, index) => {
              return (
                <div
                  key={index}
                  className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl  shadow-sm shadow-gray-500"
                >
                  {interest.interest.interest_name}
                </div>
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
        <div>Tutor:</div>
        {tutor_id ? (
          <Link href={`/profile/${tutor_id}`}>
            <a>
              <Avatar img_url={tutor_profile_avatar} width={40} height={40} />
              <div>
                <b>{tutor_username}</b>
              </div>
            </a>
          </Link>
        ) : (
          <div>No tutor yet</div>
        )}
      </div>
      <div>
        <div>Problem: {problem}</div>

        <div>Tutor requirements: {tutor_requirements}</div>

        <div>
          {tutor_order_interests?.map((interest, index) => {
            return (
              <div
                key={index}
                className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl  shadow-sm shadow-gray-500"
              >
                {interest.interest.interest_name}
              </div>
            );
          })}
        </div>
      </div>
      <TutorOrderRequests tutor_order_id={tutor_order_id} />
    </div>
  );
};

export default TutorOrderPage;
