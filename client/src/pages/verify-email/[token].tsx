import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import {
  GetUserDocument,
  GetUserQuery,
  useVerifyEmailMutation,
} from "../../generated/graphql";

const VerifyEmail = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const [verifyEmail, { data, loading }] = useVerifyEmailMutation();
  const verifyEmailSuccess = data?.verifyEmail.IOutput.success;
  const verifyEmailMessage = data?.verifyEmail.IOutput.message;

  useEffect(() => {
    async function verify(token: string) {
      const result = await verifyEmail({
        variables: {
          input: {
            token,
          },
        },
        update: (cache, { data }) => {
          if (data?.verifyEmail.IOutput.success) {
            cache.writeQuery<GetUserQuery>({
              query: GetUserDocument,
              data: {
                __typename: "Query",
                getUser: data.verifyEmail.User,
              },
            });
          }
        },
      });

      if (result.data?.verifyEmail.IOutput.success) {
        router.push("/");
      }
    }

    if (router.isReady) verify(token);
  }, [router.isReady]);

  return (
    <Layout>
      {loading ? (
        <div>Verifying account...</div>
      ) : !verifyEmailSuccess ? (
        <div>{verifyEmailMessage}</div>
      ) : null}
    </Layout>
  );
};

export default VerifyEmail;
