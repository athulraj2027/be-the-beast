"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "./GoogleSignInButton";

// import { RegisterSchema } from "../../../schema";
// import { useForm } from "react-hook-form";

const Registerform = () => {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!usernameRegex.test(username)) {
      toast.error(
        "Username must be 3–20 characters and contain only letters, numbers, or underscores."
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character."
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };
  const submitHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    const toastId = toast.loading("Creating new user");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/auth/signup",
        { username, email, password },
        config
      );
      if (response.status === 200) {
        toast.success("User created successfully", { id: toastId });

        router.push("/signin");
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
      label="Create an account"
      title="Get Started"
      backButtonHref="/signin"
      backButtonLabel="Already have an account? Sign in"
    >
      <label className="text-xs">Username</label>
      <Input
        placeholder="Enter an username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="text-xs">Email Address</label>
      <Input
        type="email"
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-xs">Password</label>
      <Input
        type="password"
        placeholder="Enter a password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="text-xs">Confirm Password</label>
      <Input
        type="password"
        placeholder="Confirm your password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button className="my-3 cursor-pointer" onClick={submitHandler}>
        Sign up
      </Button>
      {/* <GoogleSignInButton/> */}
    </CardWrapper>
  );
};

export default Registerform;
