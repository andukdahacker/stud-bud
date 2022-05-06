import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import {
  GetUserDocument,
  GetUserQuery,
  useLogoutMutation,
} from "../generated/graphql";

const LogOut = () => {
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

  if (loading)
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );
  return (
    <div>
      <NavBar />
      <span>Are you sure you want to log out?</span>
      <button onClick={logout}>Yes</button>
      <button onClick={router.back}>No</button>
      <div>{data?.logout.IOutput.message}</div>
    </div>
  );
};

export default LogOut;
