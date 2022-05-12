import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import logo from "../assets/Mark.jpg";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const profile = authData?.getUser?.profile;

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-white shadow-md shadow-gray-200 ">
      <div className="flex items-center">
        <Link href="/">
          <a className="flex items-center text-sm font-medium leading-5">
            <Image src={logo} />
            <div
              className={`text-center ml-10 ${
                router.route == "/" && `text-blue-700`
              }`}
            >
              Home
            </div>
          </a>
        </Link>
        <Link href="/find-buddy">
          <a
            className={` ml-10 text-sm font-medium ${
              router.route == "/find-buddy"
                ? `text-blue-700`
                : `text-gray-800 hover:text-blue-700`
            }`}
          >
            Find Buddy
          </a>
        </Link>
      </div>
      {authLoading ? (
        <div>Loading</div>
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div>
          <Link href={profile ? `/dashboard/${profile.id}` : "/create-profile"}>
            <a
              className={`text-sm font-medium  ${
                router.route == "/dashboard/[profileId]"
                  ? `text-blue-700`
                  : `text-gray-800 hover:text-blue-700`
              }`}
            >
              Profile
            </a>
          </Link>
          <Link href="/logout">
            <a className="ml-10 text-sm font-medium text-gray-800 hover:text-blue-700">
              Log out
            </a>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <a className="text-sm font-medium text-gray-800 hover:text-blue-700">
              Sign in
            </a>
          </Link>
          <Link href="/register">
            <a className="p-3 ml-10 text-sm font-medium leading-6 text-white bg-[#0056FF] shadow-sm shadow-gray-900 rounded ">
              Sign up
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
