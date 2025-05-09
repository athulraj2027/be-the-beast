"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "@/app/context/AuthContext";

const Signinform = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    const toastId = toast.loading("Logging you in");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/auth/signin",
        { email, password },
        config
      );
      if (response.status === 200) {
        toast.success("User logged in successfully", { id: toastId });
        setIsLoggedIn(true);
        router.push("/dashboard");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      console.log(errorMessage);
      toast.error(errorMessage, { id: toastId });
    } finally {
    }
  };
  return (
    <CardWrapper
      label="Continue your journey"
      title="Sign In"
      backButtonHref="/"
      backButtonLabel="First time here? Sign up"
    >
      <label className="text-xs">Email Address</label>
      <Input
        type="email"
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-xs">Password</label>
      <Input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="my-3 cursor-pointer" onClick={submitHandler}>
        Sign in
      </Button>
      {/* <GoogleSignInButton/> */}
    </CardWrapper>
  );
};

export default Signinform;
