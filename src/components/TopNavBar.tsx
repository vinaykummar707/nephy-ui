import React from "react";
import useUserStore from "@/store/useUserStore";

const TopNavBar = () => {
  const { user } = useUserStore();

  return (
    <div className="h-14 border-b px-4 inline-flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 bg-white">
      <div className="inline-flex items-center gap-2">
        <div className="size-7 bg-lime-300 rounded-lg"></div>
        <h1 className="font-bold dark:text-white text-lg">Nephbuddy</h1>
      </div>

      <div className="inline-flex items-center gap-2">
        {/* <Moon variant="Linear" size={24} className="text-neutral-900" /> */}
        <div className="size-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        <p className="text-sm font-medium">
          {user?.firstName}
          {user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default TopNavBar;
