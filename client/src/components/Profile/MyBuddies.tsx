import { NetworkStatus } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  RelationshipFragment,
  useGetMyBuddiesLazyQuery,
} from "../../generated/graphql";
import { BUDDIES_TAKE_LIMIT } from "../../utils/constants";
import { getAge } from "../../utils/getAge";
import Loading from "../Loading/Loading";
import LoadMoreTrigger from "../Loading/LoadMoreTrigger";
import SearchBar from "../Search/SearchBar";

import Avatar from "./Avatar";

interface MyBuddiesProps {
  profile_id: string;
}

const MyBuddies = ({ profile_id }: MyBuddiesProps) => {
  const [
    getMyBuddies,
    {
      data: GetMyBuddiesData,
      loading: GetMyBuddiesLoading,
      fetchMore,
      refetch,
      networkStatus,
    },
  ] = useGetMyBuddiesLazyQuery();
  const buddies = GetMyBuddiesData?.getMyBuddies?.relationships;
  const hasNextPage = GetMyBuddiesData?.getMyBuddies?.PageInfo?.hasNextPage;
  const endCursor = GetMyBuddiesData?.getMyBuddies?.PageInfo?.endCursor;
  const [search, setSearch] = useState<string>("");
  const fetchMoreMyBuddiesLoading = networkStatus === NetworkStatus.fetchMore;

  const fetchMyBuddies = async () => {
    await getMyBuddies({
      variables: {
        where: {
          profile_id,
        },
        input: {
          search_input: "",
          take: BUDDIES_TAKE_LIMIT,
        },
      },
      notifyOnNetworkStatusChange: true,
    });
  };

  const loadMore = async () => {
    await fetchMore({
      variables: {
        where: {
          profile_id,
        },
        input: {
          search_input: search,
          take: BUDDIES_TAKE_LIMIT,
          requester_id: endCursor?.id_1,
          addressee_id: endCursor?.id_2,
        },
      },
    });
  };
  const refetchBuddyRequests = async (value: string) => {
    setSearch(value);
    await refetch({
      where: {
        profile_id,
      },
      input: {
        search_input: value,
        take: BUDDIES_TAKE_LIMIT,
      },
    });
  };

  useEffect(() => {
    fetchMyBuddies();
  }, []);

  return (
    <>
      <div>
        <SearchBar searchQuery={refetchBuddyRequests} />

        <div>
          {GetMyBuddiesLoading ? (
            <Loading />
          ) : !buddies ? null : buddies.length < 1 ? null : (
            buddies.map((buddy, index) => {
              return <BuddyCard buddy={buddy} key={index} />;
            })
          )}
        </div>
        <div>
          <LoadMoreTrigger
            loadMore={loadMore}
            hasNextPage={hasNextPage}
            loading={fetchMoreMyBuddiesLoading}
          />
        </div>
      </div>
    </>
  );
};

interface BuddyCardProps {
  buddy: RelationshipFragment;
}

const BuddyCard = ({ buddy }: BuddyCardProps) => {
  const requester = buddy.addressee;
  const username = requester.user?.username;
  const avatar = requester.profile_avatar;
  const age = getAge(requester.birthday);
  const location = requester.location?.location_name;
  return (
    <>
      <div>
        <Avatar img_url={avatar} />
        <div>{username}</div>
        <div>
          {age} - {location}
        </div>
      </div>
    </>
  );
};

export default MyBuddies;
