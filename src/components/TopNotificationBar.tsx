const TopNotificationBar = () => {
  return (
    <div className="h-10 border-b px-4 inline-flex items-center justify-center  dark:border-neutral-700 bg-secondary dark:bg-lime-500">
      <p className="text-secondary-foreground text-xs font-semibold tracking-wide">
        New Version 2.14 is released. Please do a ctrl+shift+r to get new
        features
      </p>
    </div>
  );
};

export default TopNotificationBar;
