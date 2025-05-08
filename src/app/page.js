import Registerform from "@/components/auth/Registerform";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center h-[80vh]">
        <h1 className="sm:text-5xl font-bold ">
          Unleash Discipline.
          <br /> Conquer Every Day.
        </h1>
        <Registerform />
      </div>
     
    </>
  );
}
