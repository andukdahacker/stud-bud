import { useRouter } from "next/router";

import FindBuddyPage from "../../components/FindBuddyPage";

import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import SparkBuddiesLayout from "../../components/SparkBuddiesLayout";
import { useGetManyProfilesLazyQuery } from "../../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../../utils/constants";
import { SearchInput } from "../../utils/types";

const FindBuddy = () => {
  const router = useRouter();

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

  const onSubmitRefetchManyProfiles = ({ search_input }: SearchInput) => {
    router.push(`/spark-buddies/find?search_input=${search_input}`);
    refetchManyProfiles({
      where: {
        search_input: search_input,
        take: PROFILES_TAKE_LIMIT,
      },
    });
  };

  return (
    <Layout>
      <SparkBuddiesLayout>
        <div className="p-5 ">
          <SearchBar onSubmit={onSubmitRefetchManyProfiles} />

          <FindBuddyPage
            getManyProfiles={getManyProfiles}
            data={GetManyProfilesData}
            loading={GetManyProfilesLoading}
            fetchMore={fetchMoreManyProfiles}
            networkStatus={GetManyProfilesNetworkStatus}
          />
        </div>
      </SparkBuddiesLayout>
    </Layout>
  );
};

export default FindBuddy;
