"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
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

  const sidebarClassNames = `fixed top-0 left-0 z-40 flex h-screen flex-col justify-between overflow-y-auto border-r border-gray-200 bg-gradient-to-b from-white to-gray-100 p-0 shadow-md transition-all dark:border-gray-800 dark:from-black dark:to-gray-900 ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  return (
    <div className={sidebarClassNames}>
      {/* HEADER */}
      <div className="flex min-h-[56px] items-center justify-between border-b border-gray-200 px-6 py-3 dark:border-gray-800">
        <div className="text-xl font-bold tracking-wide text-gray-800 dark:text-white">
          ProjectFlow
        </div>
        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="p-1 transition hover:scale-105 hover:text-gray-500 dark:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* TEAM INFO */}
      <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <Image
          src="https://s3-projectflow.s3.us-east-1.amazonaws.com/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Devarshi’s Team
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <LockIcon className="h-3 w-3" />
            <span>Private</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col py-2">
        <SidebarLink icon={Home} label="Home" href="/" />
        <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
        <SidebarLink icon={Search} label="Search" href="/search" />
        <SidebarLink icon={Settings} label="Settings" href="/settings" />
        <SidebarLink icon={User} label="Users" href="/users" />
        <SidebarLink icon={Users} label="Teams" href="/teams" />
      </nav>

      {/* COLLAPSIBLE PROJECTS */}
      <div className="mt-2 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <span>Projects</span>
          {showProjects ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
      </div>

      {/* COLLAPSIBLE PRIORITY */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setShowPriority(!showPriority)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <span>Priority</span>
          {showPriority ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>

      {/* MOBILE FOOTER */}
      <div className="mt-auto flex flex-col items-center border-t border-gray-200 px-6 py-4 dark:border-gray-800 md:hidden">
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
                <User className="h-6 w-6 text-gray-600 dark:text-white" />
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
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center gap-3 px-6 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-gray-700"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[4px] bg-blue-500" />
        )}
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
