import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Layout from "../components/Layouts/Layout";
import homeImg1 from "../../public/home-image-1.png";
import homeImg2 from "../../public/home-image-2.png";
import homeImg3 from "../../public/home-image-3.png";
import homeImg4 from "../../public/home-image-4.png";
import homeImg5 from "../../public/home-image-5.png";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="w-full h-full p-10 text-center">
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_5rem)] ">
          <div className="pb-10 text-2xl font-bold">
            <span className=" text-blue">Kick start</span> your learning journey
            with
            <span className="text-blue"> SPARKLE</span>
          </div>
          <button type="button" className="hidden purpleButton">
            Get started
          </button>

          <Image src={homeImg1} />

          <button type="button" className="purpleButton">
            Get started
          </button>
        </div>

        <div className="mt-10 text-2xl font-bold text-blue">
          With SPARKLE, you can
        </div>
        <div>
          <div>
            <div>
              <Image src={homeImg2} />
            </div>
            <div className="mt-5 font-bold">Find a Learning Buddy</div>
            <div>make study more fun and focused</div>
            <button type="button" className="mt-5 purpleButton">
              EXPLORE
            </button>
          </div>

          <div>
            <div className="mt-10">
              <Image src={homeImg5} />
            </div>
            <div className="mt-5 font-bold">Online personal tutor</div>
            <div>get personal learning support</div>
            <button type="button" className="mt-5 purpleButton">
              COMING SOON
            </button>
          </div>

          <div>
            <div className="mt-10">
              <Image src={homeImg3} />
            </div>
            <div className="mt-5 font-bold">Online personal tutor</div>
            <div>get personal learning support</div>
            <button type="button" className="mt-5 purpleButton">
              COMING SOON
            </button>
          </div>
        </div>

        <div className="mt-10 text-2xl font-bold text-blue">
          Frequently Asked Questions
        </div>
        <div className="max-w-2xl mx-auto mt-5 border-t border-l border-r border-black ">
          <FAQ
            question="What is SPARKLE?"
            answer="SPARKLE is the combination of SPARK and LEARNING. We are ambitious to help young people spark their learning spirit and kick start their learning journey in an easy, connective and effective way."
          />
          <FAQ
            question="What is SPARKLE?"
            answer="SPARKLE is the combination of SPARK and LEARNING. We are ambitious to help young people spark their learning spirit and kick start their learning journey in an easy, connective and effective way."
          />
          <FAQ
            question="What is SPARKLE?"
            answer="SPARKLE is the combination of SPARK and LEARNING. We are ambitious to help young people spark their learning spirit and kick start their learning journey in an easy, connective and effective way."
          />
        </div>
        <div className="mt-10 text-2xl font-bold text-blue">
          Kick start your learning journey today!
        </div>
        <button type="button" className="mt-5 purpleButton">
          GET STARTED
        </button>
      </div>
    </Layout>
  );
};

interface FAQProps {
  question: string;
  answer: string;
}
const FAQ = ({ question, answer }: FAQProps) => {
  const [dropDown, setDropdown] = useState(false);
  return (
    <div className="w-full p-2 border-b border-black">
      <div className="flex justify-between w-full">
        <div>{question}</div>
        <div onClick={() => setDropdown(!dropDown)}>
          {dropDown ? <AiOutlineDown size={20} /> : <AiOutlineUp size={20} />}
        </div>
      </div>
      <div className={dropDown ? " text-sm font-extralight p-2" : "hidden"}>
        {answer}
      </div>
    </div>
  );
};

export default Home;
