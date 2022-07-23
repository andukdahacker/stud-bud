import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import FindBuddyPage from "../../components/FindBuddyPage";
import FindTutorOrdersPage from "../../components/FindTutorOrdersPage";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import {
  useGetManyProfilesLazyQuery,
  useGetManyTutorOrdersLazyQuery,
} from "../../generated/graphql";
import { findOptions } from "../../utils/constants";

const FindBuddy = () => {
  const router = useRouter();
  const [findOption, setFindOption] = useState<findOptions>("buddies");

  const handleClick = (option: findOptions) => {
    setFindOption(option);
  };

  const [
    getManyProfiles,
    {
      data: GetManyProfilesData,
      loading: GetManyProfilesLoading,
      refetch: refetchManyProfiles,
      fetchMore: fetchMoreManyProfiles,
      networkStatus: GetManyProfilesNetworkStatus,
    },
  ] = useGetManyProfilesLazyQuery();
  const [
    getManyTutorOrders,
    {
      data: GetManyTutorOrdersData,
      loading: GetManyTutorOrdersLoading,
      refetch: refetchManyTutorOrders,
      networkStatus: GetManyTutorOrdersNetworkStatus,
    },
  ] = useGetManyTutorOrdersLazyQuery();

  return (
    <Layout>
      <div className="flex flex-col w-full ">
        {/* <div className="w-1/5 ">
          <div
            className={`${
              findOption === "buddies" ? "bg-gray-400" : null
            } cursor-pointer`}
            onClick={() => handleClick("buddies")}
          >
            Buddies
          </div>
          <div
            className={`${
              findOption === "tutor orders" ? "bg-gray-400" : null
            } cursor-pointer`}
            onClick={() => handleClick("tutor orders")}
          >
            Tutor orders
          </div>
          <div
            className={`${
              findOption === "tutors" ? "bg-gray-400" : null
            } cursor-pointer`}
            onClick={() => handleClick("tutors")}
          >
            Tutors
          </div>
          <div
            className={`${
              findOption === "roadmaps" ? "bg-gray-400" : null
            } cursor-pointer`}
            onClick={() => handleClick("roadmaps")}
          >
            Roadmaps
          </div>
        </div> */}

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
        </div>

        <div className="p-5 ">
          <SearchBar
            findOption={findOption}
            refetchManyProfiles={refetchManyProfiles}
            refetchManyTutorOrders={refetchManyTutorOrders}
          />

          {findOption === null ? (
            <div>What are your looking for? Choose on the left bar</div>
          ) : findOption === "buddies" ? (
            <FindBuddyPage
              getManyProfiles={getManyProfiles}
              data={GetManyProfilesData}
              loading={GetManyProfilesLoading}
              fetchMore={fetchMoreManyProfiles}
              networkStatus={GetManyProfilesNetworkStatus}
            />
          ) : findOption === "tutor orders" ? (
            <FindTutorOrdersPage
              getManyTutorOrders={getManyTutorOrders}
              data={GetManyTutorOrdersData}
              loading={GetManyTutorOrdersLoading}
              networkStatus={GetManyTutorOrdersNetworkStatus}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default FindBuddy;
