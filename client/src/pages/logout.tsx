import Head from "next/head";
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
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
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
          <button
            onClick={router.back}
            className="p-3 ml-5 text-sm font-medium leading-6 text-gray-900 rounded shadow-sm bg-gray-50 shadow-gray-900"
          >
            No
          </button>
        </div>
        <div>{data?.logout.IOutput.message}</div>
      </div>
    </div>
  );
};

export default LogOut;
