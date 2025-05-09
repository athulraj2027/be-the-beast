"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full px-6 py-4 shadow-md border-b flex justify-end">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 justify-end">
          <NavigationMenuItem>
            <Link href="/" passHref>
              <NavigationMenuLink className="font-medium text-lg">
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" passHref>
              <NavigationMenuLink className="font-medium text-lg">
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signin" passHref>
              <NavigationMenuLink className="font-medium text-lg">
                Sign In
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
