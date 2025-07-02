import React from "react";

type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <div>
        <h1
          className={`${
            isSmallText ? "text-lg" : "text-3xl"
          } bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent transition-all duration-300 dark:text-white`}
        >
          {name}
        </h1>
        <div className="mt-1 h-1 w-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-sky-400 dark:to-fuchsia-500"></div>
      </div>
      {buttonComponent && (
        <div className="transition-transform hover:scale-105">
          {buttonComponent}
        </div>
      )}
    </div>
  );
};

export default Header;
