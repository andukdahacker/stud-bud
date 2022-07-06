import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import {
  useGetMyTutorOrderLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";

const OneHourTutor = () => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;

  const [
    getMyTutorOrder,
    { data: GetMyTutorOrderData, loading: GetMyTutorOrderLoading },
  ] = useGetMyTutorOrderLazyQuery();

  const my_tutor_orders = GetMyTutorOrderData?.getMyTutorOrder?.tutor_order;
  if (GetUserLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  useEffect(() => {
    async function fetchData() {
      await getMyTutorOrder({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);

  return (
    <Layout>
      <div>Your tutor orders</div>
      {GetMyTutorOrderLoading ? (
        <Loading />
      ) : (
        <div>
          {my_tutor_orders?.map((tutor_order, index) => {
            return (
              <div key={index}>
                <Link href={`/one-hour-tutor/${tutor_order.id}`}>
                  <a>
                    <div>{tutor_order.problem}</div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <Link href={"/one-hour-tutor/create-tutor-order"}>
        <a>Create a tutor order</a>
      </Link>
    </Layout>
  );
};

export default OneHourTutor;
