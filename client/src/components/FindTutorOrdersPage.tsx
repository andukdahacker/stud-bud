import Link from "next/link";
import { useRouter } from "next/router";
import { useGetManyTutorOrdersQuery } from "../generated/graphql";
import { TUTOR_ORDER_TAKE_LIMIT } from "../utils/constants";
import Loading from "./Loading";
import TutorOrderCard from "./TutorOrderCard";

const FindTutorOrdersPage = () => {
  const router = useRouter();
  const { data: GetManyTutorOrdersData, loading: GetManyTutorOrderLoading } =
    useGetManyTutorOrdersQuery({
      variables: {
        where: {
          search_input: router.query
            ? (router.query.search_input as string)
            : "",
          take: TUTOR_ORDER_TAKE_LIMIT,
        },
      },
    });

  const tutor_orders = GetManyTutorOrdersData?.getManyTutorOrders?.tutor_order;
  const noTutorOrderFound = tutor_orders?.length == 0;

  if (GetManyTutorOrderLoading) return <Loading />;
  if (noTutorOrderFound) return <div>Sorry, we found no result</div>;
  return (
    <div>
      <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
        {tutor_orders?.map((tutor_order, index) => {
          const interests = tutor_order.tutor_order_interest?.map((obj) => {
            return { interest_name: obj.interest.interest_name as string };
          });
          return (
            <TutorOrderCard
              key={index}
              tutor_order_id={tutor_order.id}
              username={tutor_order.student.user?.username}
              problem={tutor_order.problem}
              tutor_requirements={tutor_order.tutor_requirements}
              tutor_order_interests={interests}
              profile_avatar={tutor_order.student.profile_avatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FindTutorOrdersPage;
