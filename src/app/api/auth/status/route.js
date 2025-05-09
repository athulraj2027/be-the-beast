import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export  function GET() {
  const token =  cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ isLoggedIn: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ isLoggedIn: false });
  }
}
