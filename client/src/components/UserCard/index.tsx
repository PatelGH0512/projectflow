import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md dark:border-gray-700 dark:bg-white/5">
      {user.profilePictureUrl ? (
        <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300 shadow-sm dark:border-gray-600">
          <Image
            src={`https://s3-projectflow.s3.us-east-1.amazonaws.com/${user.profilePictureUrl}`}
            alt="profile picture"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 dark:text-white">
          {user.username}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
