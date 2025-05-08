import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const BackButton = ({ label, href }) => {
  return (
    <Button variant="link" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
