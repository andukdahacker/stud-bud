import MyBuddyRequests from "../../components/BuddyRequest/MyBuddyRequests";
import MyRelationshipRequests from "../../components/BuddyRequest/MyRelationshipRequests";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";

const YourBuddyRequests = () => {
  return (
    <>
      <Layout>
        <SparkBuddiesLayout>
          <MyRelationshipRequests />
          <MyBuddyRequests />
        </SparkBuddiesLayout>
      </Layout>
    </>
  );
};

export default YourBuddyRequests;
