import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Layout from "../components/Layout";
import homeImg1 from "../public/home-image-1.png";
import homeImg2 from "../public/home-image-2.png";
import homeImg3 from "../public/home-image-3.png";
import homeImg4 from "../public/home-image-4.png";
import homeImg5 from "../public/home-image-5.png";

const Home: NextPage = () => {
  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [dropDown3, setDropDown3] = useState(false);

  const handleClick = (option: number) => {
    if (option === 1) {
      if (dropDown1 === false) {
        setDropDown1(true);
      } else {
        setDropDown1(false);
      }
    }
    if (option === 2) {
      if (dropDown2 === false) {
        setDropDown2(true);
      } else {
        setDropDown2(false);
      }
    }
    if (option === 3) {
      if (dropDown3 === false) {
        setDropDown3(true);
      } else {
        setDropDown3(false);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col ">
        <div className="flex items-center justify-center w-full border-b border-black">
          <div className="flex flex-col items-baseline justify-center w-2/3 pl-20 ">
            <h1 className="text-3xl tracking-widest text-blue font-lexendZetta">
              First steps in learning has never been easy
            </h1>
            <span className="my-8 text-xl">
              Don't worry, SPARKLE has solutions for you
            </span>
            <button
              type="button"
              className="px-2 py-1 font-bold text-white border-2 border-black bg-purple"
            >
              GET STARTED
            </button>
          </div>
          <Image src={homeImg1} width={600} height={500} className="w-1/3 " />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center p-10 text-3xl tracking-widest border-b border-r border-black text-blue font-lexendZetta">
            We are here to spark your learning by {`>>`}
          </div>
          <div className="flex items-center justify-center p-10 border-b border-black">
            <Image src={homeImg2} width={300} height={200} />
            <div className="flex flex-col items-end justify-center ">
              <div className="text-xl tracking-widest font-lexendZetta">
                Learning Buddy
              </div>
              <span className="my-5">
                More <b>connective</b> and <b>disciplined</b>
              </span>
              <button
                type="button"
                className="px-2 py-1 font-bold text-white border-2 border-black bg-purple"
              >
                EXPLORE
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center p-10 border-b border-r border-black">
            <Image src={homeImg3} width={300} height={200} className="" />
            <div className="flex flex-col items-end justify-center ">
              <div className="text-xl tracking-widest font-lexendZetta">
                1-hour tutoring
              </div>
              <span className="my-5">get personal learning support</span>
              <span className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
                COMING SOON
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center p-10 border-b border-black">
            <Image src={homeImg4} width={300} height={200} />
            <div className="flex flex-col items-end justify-center">
              <span className="text-xl tracking-widest font-lexendZetta">
                Learning roadmaps
              </span>
              <span className="my-5">clear your learning path</span>
              <span className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
                COMING SOON
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-10 border-b border-r border-black">
            <Image src={homeImg5} width={300} height={200} />
            <div className="flex flex-col items-end justify-center">
              <div className="text-xl tracking-widest font-lexendZetta">
                Be the tutor
              </div>
              <span className="my-5">give knowledge, receive rewards</span>
              <span className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
                COMING SOON
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center p-10 border-b border-black">
            <div className="text-xl tracking-widest font-lexendZetta">
              and many to come ...
            </div>
            <span className="my-5">
              to help you learning journey become effective and easy
            </span>
            <span className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
              JOIN NOW
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen p-10">
          <div className="text-3xl tracking-widest text-blue font-lexendZetta">
            Frequently Ask Questions
          </div>
          <div className="m-5 border border-black w-[64rem]">
            <div className="p-5 border-b border-black">
              <div className="flex justify-between my-5">
                <div className="text-xl tracking-widest font-lexendZetta">
                  What is SPARKLE?
                </div>
                <button type="button" onClick={() => handleClick(1)}>
                  <FontAwesomeIcon
                    icon="angle-down"
                    size="lg"
                    rotation={dropDown1 ? undefined : 180}
                  />
                </button>
              </div>
              <span className={`${dropDown1 ? null : "hidden"} font-light `}>
                SPARKLE is the combination of SPARK and LEARNING. We are
                ambitious to help young people spark their learning spirit and
                kick start their learning journey in an easy, connective and
                effective way.
              </span>
            </div>
            <div className="p-5 border-b border-black">
              <div className="flex justify-between my-5">
                <div className="text-xl tracking-widest font-lexendZetta">
                  How does SPARKLE work?
                </div>
                <button type="button" onClick={() => handleClick(2)}>
                  <FontAwesomeIcon
                    icon="angle-down"
                    size="lg"
                    rotation={dropDown2 ? undefined : 180}
                  />
                </button>
              </div>

              <span className={`${dropDown2 ? null : "hidden"} font-light `}>
                SPARKLE is the combination of SPARK and LEARNING. We are
                ambitious to help young people spark their learning spirit and
                kick start their learning journey in an easy, connective and
                effective way.
              </span>
            </div>
            <div className="p-5 ">
              <div className="flex justify-between my-5">
                <div className="text-xl tracking-widest font-lexendZetta">
                  How much does SPARKLE cost?
                </div>
                <button type="button" onClick={() => handleClick(3)}>
                  <FontAwesomeIcon
                    icon="angle-down"
                    size="lg"
                    rotation={dropDown3 ? undefined : 180}
                  />
                </button>
              </div>

              <span className={`${dropDown3 ? null : "hidden"} font-light `}>
                SPARKLE is the combination of SPARK and LEARNING. We are
                ambitious to help young people spark their learning spirit and
                kick start their learning journey in an easy, connective and
                effective way.
              </span>
            </div>
          </div>

          <div className="mb-5 text-xl tracking-widest font-lexendZetta">
            Kick start your learning journey today
          </div>

          <button className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
            Click here
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
