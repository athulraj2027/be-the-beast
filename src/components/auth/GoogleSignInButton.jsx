"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

const GoogleSignInButton = () => {
  const {data:session} = useSession()
  return <Button onClick={() => signIn("google")}>Sign with Google</Button>;
};

export default GoogleSignInButton;
