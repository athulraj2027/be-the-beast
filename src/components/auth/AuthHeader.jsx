import React from "react";

const AuthHeader = ({ label, title }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default AuthHeader;
