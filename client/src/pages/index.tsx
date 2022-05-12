import type { NextPage } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Image from "next/image";
import friendsImg from "../assets/friends.png";
import Head from "next/head";
import worldIcon from "../assets/world-icon.png";
import messageIcon from "../assets/message-icon.png";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavBar />
      <div className="flex flex-col ">
        {/* hero section */}
        <div className="bg-gradient-to-b from-[#0056FF] to-purple-100 h-[44rem] flex flex-col justify-start items-center w-full p-20">
          <div className="w-[50rem]  items-center flex flex-col">
            <h1 className="w-[50rem] text-center text-6xl font-extrabold text-gray-50 mb-10 mt-20">
              A Buddy is worth a thousand books
            </h1>
            <span className="w-[40rem] text-center text-gray-50 text-xl font-normal">
              Let’s find yourself a study buddy that can go along with you
              during the journey of getting new knowledge
            </span>
            <Link href="/find-buddy">
              <a className="p-3 mt-10 text-sm font-medium leading-6 text-white bg-[#0056FF] rounded shadow-sm shadow-gray-900 ">
                Find a Buddy
              </a>
            </Link>
          </div>
        </div>

        {/* section 2 */}
        <div className="flex flex-col items-center justify-start w-full h-screen p-20 ">
          <h2 className="mb-10 text-6xl font-extrabold leading-10 text-gray-900 ">
            A better way to learn
          </h2>

          <div className="flex items-center justify-center w-full h-[30rem]">
            <div className="w-1/2 text-center">
              <Image src={friendsImg} width={500} />
            </div>
            <div className="flex flex-col w-1/2 ">
              <div className="w-[40rem]  mb-10 flex">
                <div className="flex items-center justify-center w-24 bg-[#0056FF] rounded-md h-14">
                  <Image src={worldIcon} />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Interest based Buddy
                  </h3>
                  <span className="text-base font-normal leading-6 text-gray-500">
                    Connect with friends near you or miles away from you but
                    having the same interest and wants to study the same topic
                    together.
                  </span>
                </div>
              </div>

              <div className="w-[40rem] h-14  mt-10 flex">
                <div className="flex items-center justify-center w-20 bg-[#0056FF] rounded-md h-14">
                  <Image src={messageIcon} />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Quick setup and matching
                  </h3>
                  <span className="text-base font-normal leading-6 text-gray-500">
                    Create an account and start searching study buddy, connect
                    with them and set a study routine together
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section 3 */}

        <div className="flex flex-col h-screen ">
          <div className="flex flex-col items-center p-10 h-2/3">
            <h2 className="mb-5 text-4xl font-extrabold text-gray-900">
              Find the right people quickly
            </h2>
            <span className="text-xl font-normal text-gray-500">
              Connect to our popular buddies
            </span>
            <div>Cards</div>
          </div>
          <div className="flex items-center justify-between p-10 bg-gray-50 h-1/3">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900">
                Ready to dive in?
              </h2>
              <h2 className="text-4xl font-extrabold text-[#0056FF]">
                Start finding your study buddy!
              </h2>
            </div>
            <div className="flex">
              <Link href="/register">
                <a className="p-3 text-sm font-medium leading-6 text-white bg-[#0056FF] rounded shadow-sm shadow-gray-900">
                  Get started
                </a>
              </Link>
              <div className="">
                <div className="p-3 ml-5 text-sm font-medium leading-6 text-[#0056FF] rounded shadow-sm bg-gray-50 shadow-gray-900">
                  Learn more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
