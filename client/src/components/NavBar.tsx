import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const profile = authData?.getUser?.profile;
  const username = authData?.getUser?.username;

  return (
    <>
      <Link href="/">StudBud</Link>
      {authLoading ? (
        <div>Loading</div>
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div>
          <Link href="/find-buddy">
            <a>Find Buddy</a>
          </Link>
          <span>Hello, {username}</span>
          <Link href={profile ? `/dashboard/${profile.id}` : "/create-profile"}>
            <a>Profile</a>
          </Link>
          <Link href="/logout">
            <a>Log out</a>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/find-buddy">
            <a>Find Buddy</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
