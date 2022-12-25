import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import {
  GetUserDocument,
  GetUserQuery,
  useLogoutMutation,
} from "../../generated/graphql";

interface LogoutProps {
  P?: string;
}

const LogOut = ({ children }: PropsWithChildren<LogoutProps>) => {
  const [logoutMutation, { data, loading }] = useLogoutMutation();
  const client = useApolloClient();
  const router = useRouter();
  const logout = async () => {
    await logoutMutation({
      update(cache, { data }) {
        if (data?.logout.IOutput.success) {
          cache.writeQuery<GetUserQuery>({
            query: GetUserDocument,
            data: { getUser: null },
          });
        }

        router.push("/login");

        client.clearStore();
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center w-56 p-2 bg-white border-2 border-black rounded-md md:w-96 md:h-56 font-lexend">
      <span className="mb-5 font-bold text-center">
        Are you sure you want to log out?
      </span>
      <div className="flex items-center justify-center">
        <button onClick={logout} className="mr-5 purpleButton">
          Yes
        </button>
        {children}
      </div>
      <div>{data?.logout.IOutput.message}</div>
    </div>
  );
};

export default LogOut;
