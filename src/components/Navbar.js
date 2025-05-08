"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Phone screen width threshold
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const options = [
    { name: "About", link: "about" },
    { name: "Pricing", link: "pricing" },
    { name: "Contact Us", link: "contact" },
    { name: "About", link: "about" },
  ];
  return (
    <div className="h-20 flex justify-between sm:justify-around items-center p-4 relative shadow-md">
      <h1 className="font-extrabold text-2xl sm:text-3xl">BeTheBeast</h1>
      {isMobile && (
        <>
          {!isMenuOpen ? (
            <svg
              onClick={() => {
                // your custom logic here
                setIsMenuOpen(true);
                console.log(isMenuOpen);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <>
              <svg
                onClick={() => {
                  // your custom logic here
                  setIsMenuOpen(false);
                  console.log(isMenuOpen);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <div className="absolute top-full w-[40%] bg-white shadow-2xl p-5 z-10 rounded-sm right-0 text-right">
                {" "}
                <ul>
                  {options.map((item, index) => (
                    <li key={index} className="h-10">
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}

      {!isMobile && (
        <ul className="flex gap-6">
          {options.map((item, index) => (
            <li key={index} className="hover:underline">
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
