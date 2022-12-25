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
    <div className="flex flex-col w-full h-full ">
      <div className="flex items-center justify-around p-2 border-b border-black">
        <Link href={`/spark-buddies/create-buddy-request`}>
          <a
            className={
              router.route == "/spark-buddies/create-buddy-request"
                ? "text-white text-center bg-black font-bold rounded-md py-1 px-2"
                : "text-center font-bold"
            }
          >
            Create request
          </a>
        </Link>
        <Link href={`/spark-buddies/find-buddy`}>
          <a
            className={
              router.route == "/spark-buddies/find-buddy"
                ? "text-white text-center bg-black rounded-md font-bold py-1 px-2"
                : "font-bold text-center"
            }
          >
            Find Buddy
          </a>
        </Link>
        <Link href={`/spark-buddies/your-buddy-requests`}>
          <a
            className={
              router.route == "/spark-buddies/your-buddy-requests" ||
              router.route == "/spark-buddies/add-buddy-requests" ||
              router.route == "/spark-buddies/buddy-request"
                ? "text-white rounded-md font-bold text-center bg-black py-1 px-2"
                : "font-bold text-center"
            }
          >
            Your requests
          </a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default SparkBuddiesLayout;
