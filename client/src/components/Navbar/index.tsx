import React from "react";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white px-4 py-3 shadow-sm transition dark:border-gray-800 dark:from-[#111] dark:via-black dark:to-[#111]">
      {/* Search Bar + Collapse */}
      <div className="flex items-center gap-6">
        {isSidebarCollapsed && (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            className="rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
          </button>
        )}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          <input
            type="search"
            placeholder="Search..."
            className="w-52 rounded-md border border-gray-300 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right-side Icons & User */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-400" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500" />
          )}
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className="rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="h-6 w-6 text-gray-700 dark:text-white" />
        </Link>

        {/* Divider */}
        <div className="mx-3 hidden h-6 w-px bg-gray-300 dark:bg-gray-600 md:block" />

        {/* User Profile */}
        <div className="hidden items-center space-x-3 md:flex">
          <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://s3-projectflow.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="m-auto h-6 w-6 text-gray-600 dark:text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {currentUserDetails?.username}
          </span>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
