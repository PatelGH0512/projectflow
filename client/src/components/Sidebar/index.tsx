"use client";

import {
  FaHome,
  FaBriefcase,
  FaSearch,
  FaCog,
  FaUser,
  FaUsers,
  FaChevronUp,
  FaChevronDown,
  FaLayerGroup,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const sidebarClassNames = `
    fixed flex h-full flex-col overflow-y-auto 
    border-r border-gray-200 bg-gradient-to-b from-white to-gray-100 shadow-md 
    transition-all duration-300 ease-in-out dark:border-gray-800 dark:from-black dark:to-gray-900 
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      {/* HEADER */}
      <div className="flex min-h-[56px] items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
        <div className="relative h-10 w-full max-w-[120px]">
          <Image
            src={
              isDarkMode
                ? "https://s3-projectflow.s3.us-east-1.amazonaws.com/logo-Dark.png"
                : "https://s3-projectflow.s3.us-east-1.amazonaws.com/logo-Light.png"
            }
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="p-1 transition hover:scale-105 hover:text-gray-500 dark:text-white"
          aria-label="Collapse sidebar"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav
        role="navigation"
        aria-label="Sidebar Navigation"
        className="flex flex-col"
      >
        <SidebarLink icon={<FaHome />} label="Home" href="/" />
        <SidebarLink icon={<FaBriefcase />} label="Timeline" href="/timeline" />
        <SidebarLink icon={<FaSearch />} label="Search" href="/search" />
        <SidebarLink icon={<FaCog />} label="Settings" href="/settings" />
        <SidebarLink icon={<FaUser />} label="Users" href="/users" />
        <SidebarLink icon={<FaUsers />} label="Teams" href="/teams" />
      </nav>

      {/* COLLAPSIBLE PROJECTS */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <FaLayerGroup />
            Projects
          </span>
          {showProjects ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={<FaBriefcase />}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
      </div>

      {/* MOBILE FOOTER */}
      <div className="flex flex-col items-center border-t border-gray-200 px-6 py-4 dark:border-gray-800 md:hidden">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              {currentUserDetails?.profilePictureUrl ? (
                <Image
                  src={`https://s3-projectflow.s3.us-east-1.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUser className="h-6 w-6 text-gray-600 dark:text-white" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {currentUserDetails?.username}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center gap-3 px-6 py-3 text-sm transition duration-150 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-500/5 dark:hover:bg-gray-800 ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-gray-700"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[4px] rounded-r-md bg-blue-500" />
        )}
        <span className="h-5 w-5 text-base">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
