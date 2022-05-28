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
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-start  h-[45rem] p-56">
      <span className="mb-10 text-2xl font-bold">
        Are you sure you want to log out?
      </span>
      <div>
        <button
          onClick={logout}
          className="p-3 text-sm font-medium leading-6 text-white bg-[#0056FF] rounded shadow-sm shadow-gray-900"
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
