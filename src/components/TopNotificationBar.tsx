import React from "react";

const TopNotificationBar = () => {
  return (
    <div className="h-10 border-b px-4 inline-flex items-center justify-center  dark:border-neutral-700 bg-lime-300 dark:bg-lime-500">
      <p className="text-xs font-semibold tracking-wide text-neutral-900">
        New Version 2.14 is released. Please do a ctrl+shift+r to get new
        features
      </p>
    </div>
  );
};

export default TopNotificationBar;
