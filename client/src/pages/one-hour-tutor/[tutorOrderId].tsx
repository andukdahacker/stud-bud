import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import TutorOrderPage from "../../components/TutorOrderPage";
import { useGetTutorOrderLazyQuery } from "../../generated/graphql";

const TutorOrder = () => {
  const router = useRouter();

  const [
    getTutorOrder,
    { data: GetTutorOrderData, loading: GetTutorOrderLoading },
  ] = useGetTutorOrderLazyQuery();

  useEffect(() => {
    async function fetchData() {
      await getTutorOrder({
        variables: {
          where: {
            id: router.query.tutorOrderId as string,
          },
        },
        fetchPolicy: "cache-and-network",
      });
    }

    if (router.isReady) fetchData();
  }, [router.isReady, router.query]);

  return (
    <Layout>
      <TutorOrderPage data={GetTutorOrderData} loading={GetTutorOrderLoading} />
    </Layout>
  );
};

export default TutorOrder;
