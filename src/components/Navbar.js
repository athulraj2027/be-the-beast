"use client";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn, setIsLoggedIn, checkAuth } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Phone screen width threshold
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Signing out");

      await axios.get("/api/auth/logout");
      setIsLoggedIn(false);
      router.push("/");
      toast.success("Signed out successfully", { id: toastId });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const publicOptions = [
    { name: "About", link: "about" },
    { name: "Pricing", link: "pricing" },
    { name: "Contact Us", link: "contact" },
    { name: "Features", link: "features" },
  ];
  const signedInOptions = [
    { name: "Dashboard", link: "dashboard" },
    { name: "Calendar", link: "calendar" },
    { name: "Analysis", link: "analysis" },
    { name: "Profile", link: "profile" },
    {
      name: "Logout",
      action: handleLogout,
    },
  ];

  const options = isLoggedIn ? signedInOptions : publicOptions;
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
                      {item.link ? (
                        <Link href={item.link}>{item.name}</Link>
                      ) : (
                        <span onClick={item.action}>{item.name}</span>
                      )}
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
              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                <span onClick={item.action}>{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
