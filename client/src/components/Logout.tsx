import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import {
  GetUserDocument,
  GetUserQuery,
  useLogoutMutation,
} from "../generated/graphql";

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
    <div className="flex flex-col items-center justify-center h-full font-lexend">
      <span className="mb-10 text-2xl font-bold">
        Are you sure you want to log out?
      </span>
      <div>
        <button
          onClick={logout}
          className="px-2 py-1 m-2 font-bold text-white border-2 border-black bg-purple"
        >
          Yes
        </button>
        {children}
      </div>
      <div>{data?.logout.IOutput.message}</div>
    </div>
  );
};

export default LogOut;
