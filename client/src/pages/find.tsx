import { useState } from "react";
import FindBuddyPage from "../components/FindBuddyPage";
import FindTutorOrdersPage from "../components/FindTutorOrdersPage";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { findOptions } from "../utils/constants";

const FindBuddy = () => {
  const [findOption, setFindOption] = useState<findOptions>(null);

  const handleClick = (option: findOptions) => {
    setFindOption(option);
  };

  return (
    <Layout>
      <div className="flex w-full">
        <div className="w-1/5 ">
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
        </div>
        <div className="w-4/5">
          <SearchBar findOption={findOption} />
          {findOption === null ? (
            <div>What are your looking for? Choose on the left bar</div>
          ) : findOption === "buddies" ? (
            <FindBuddyPage />
          ) : findOption === "tutor orders" ? (
            <FindTutorOrdersPage />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default FindBuddy;
