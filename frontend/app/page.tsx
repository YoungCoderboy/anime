import Image from "next/image";
import { Dancing_Script } from "next/font/google";
const font = Dancing_Script({ subsets: ["latin"] });
const page = () => {
  return (
    <div>
      <div className="flex flex-row space-x-5 items-center justify-between align-center pt-10 p-10">
        <div>
          <h1 className={`${font.className} text-7xl`}>Akihabara Central</h1>
          <p className={`${font.className} text-2xl pt-5 text-wrap`}>
            {` We combine your love of anime with a thriving fan community! Find exclusive merch, connect with fellow otaku, and celebrate the anime world together.`}
          </p>
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/onepiece.png"
            alt="apple"
            // className="hidden md:block"
            width="500"
            height="500"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-5 items-center justify-between align-center pt-10 p-10">
        <div className="hidden md:block">
          <Image
            src="/images/onepiece2.png"
            alt="apple"
            // classNam e="hidden md:block"
            width="500"
            height="500"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className={`${font.className} text-5xl`}>
            What are your waiting for Join us Now !!
          </h1>
          <div className="border-solid border-2 border-sky-500 w-fit p-2 rounded-lg hover:bg-blue-500 hover:text-black mt-10">
            <button className="text-2xl ">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
