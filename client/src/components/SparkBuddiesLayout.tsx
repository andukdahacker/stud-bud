import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

interface SparkBuddiesLayoutProps {
  P?: any;
}

const SparkBuddiesLayout = ({
  children,
}: PropsWithChildren<SparkBuddiesLayoutProps>) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-around py-5 border-b border-black">
        <Link href={`/spark-buddies/find`}>
          <a
            className={`${
              router.route == "/spark-buddies/find"
                ? "text-white bg-black py-1 px-2"
                : null
            } font-bold `}
          >
            Find Buddy
          </a>
        </Link>
        <Link href={`/spark-buddies/buddies`}>
          <a
            className={`${
              router.route == "/spark-buddies/buddies"
                ? "text-white bg-black py-1 px-2"
                : null
            } font-bold `}
          >
            My Buddies
          </a>
        </Link>
        <Link href={`/spark-buddies/buddies/requests`}>
          <a
            className={`${
              router.route == "/spark-buddies/buddies/requests"
                ? "text-white bg-black py-1 px-2"
                : null
            } font-bold `}
          >
            Buddy requests
          </a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default SparkBuddiesLayout;
