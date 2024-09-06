import {
  ArrowDown2,
  ArrowUp2,
  Driver,
  Element3,
  Flash,
  Graph,
  Health,
  Hospital,
  Lock,
  Note,
  Notification,
  Profile2User,
  RowHorizontal,
  Save2,
  SecurityUser,
  Setting2,
  Timer,
  Timer1,
  User,
  WatchStatus,
} from "iconsax-react";
import NavItem from "../../components/NavItem";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNotificationBar from "../../components/TopNotificationBar";
import TopNavBar from "../../components/TopNavBar";
import useUserStore from "@/store/useUserStore";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useHospitalStore from "@/store/useHospitalStore";
import useDialysisUnitStore from "@/store/useDialysisUnitStore";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const iconSize = 24;
  const location = useLocation();
  const { user } = useUserStore();

  const isRouterActive = (path: string) => location.pathname.includes(path);
  const iconVariant = (path: string) =>
    isRouterActive(path) ? "Bold" : "Linear";

  const iconColor = (path) =>
    isRouterActive(path)
      ? "text-primary-foreground"
      : "text-primary dark:text-neutral-400";

  const navlinks = [
    {
      label: "Dashboard",
      path: "dashboard",
      icon: (
        <Element3
          variant={iconVariant("/dashboard")}
          className={iconColor("/dashboard")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Running Dialysis",
      path: "activity",
      icon: (
        <Health
          variant={iconVariant("/activity")}
          className={iconColor("/activity")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Departments",
      path: "dialysisUnits",
      icon: (
        <Hospital
          variant={iconVariant("/dialysisUnits")}
          className={iconColor("/dialysisUnits")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Administrators",
      path: "administrators",
      icon: (
        <Lock
          variant={iconVariant("/administrators")}
          className={iconColor("/administrators")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Patient Shifts",
      path: "shifts",
      icon: (
        <Timer1
          variant={iconVariant("/shifts")}
          className={iconColor("/shifts")}
          size={iconSize}
        />
      ),
    },

    {
      label: "Machines",
      path: "machines",
      icon: (
        <WatchStatus
          variant={iconVariant("machines")}
          className={iconColor("machines")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Patients",
      path: "patients",
      icon: (
        <Profile2User
          variant={iconVariant("/patients")}
          className={iconColor("/patients")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Technicians",
      path: "technicians",
      icon: (
        <SecurityUser
          variant={iconVariant("technicians")}
          className={iconColor("technicians")}
          size={iconSize}
        />
      ),
    },

    {
      label: "Medical Reports",
      path: "medical-bills",
      icon: (
        <Note
          variant={iconVariant("medical-bills")}
          className={iconColor("medical-bills")}
          size={iconSize}
        />
      ),
    },
    {
      label: "Dialysis Bills",
      path: "Dialysis-bills",
      icon: (
        <Driver
          variant={iconVariant("Dialysis-bills")}
          className={iconColor("Dialysis-bills")}
          size={iconSize}
        />
      ),
    },

    // {
    //   label: "Summaries",
    //   path: "summaries",
    //   icon: (
    //     <Save2
    //       variant={iconVariant("summaries")}
    //       className={iconColor("summaries")}
    //       size={iconSize}
    //     />
    //   ),
    // },
    // {
    //   label: "notifications",
    //   path: "notifications",
    //   icon: (
    //     <Notification
    //       variant={iconVariant("/notifications")}
    //       className={iconColor("/notifications")}
    //       size={iconSize}
    //     />
    //   ),
    // },
    {
      label: "Settings",
      path: "settings",
      icon: (
        <Setting2
          variant={iconVariant("settings")}
          className={iconColor("settings")}
          size={iconSize}
        />
      ),
    },
  ];

  const { activeDialysisUnit } = useDialysisUnitStore();

  return (
    <div className="h-screen overflow-hidden w-screen flex flex-col">
      <div className="flex flex-col  flex-initial">
        <TopNotificationBar />
        <TopNavBar />
      </div>
      <div className="flex-1 overflow-hidden flex">
        <div className="px-4 py-4 w-[14%]  dark:bg-neutral-800 bg-neutral-10 dark:border-neutral-700 border-r bg-n flex  justify-between flex-col">
          <div className="flex gap-2 flex-col">
            <p className="text-neutral-500 px-1 dark:text-neutral-400 capitalize text-sm">
              menu
            </p>
            <div
              className="flex gap-1.5
             flex-col"
            >
              {navlinks.map((link: any) => (
                <NavItem
                  title={link.label}
                  to={link.path}
                  active={isRouterActive(link.path)}
                  icon={link.icon}
                />
              ))}
            </div>
          </div>

          <div className=" inline-flex items-center justify-between px-2.5 py-2  dark:border-neutral-700  border rounded-md">
            <div className="flex space-y flex-col">
              <p className="font-semibold dark:text-white text-sm ">
                Dialysis Unit 1
              </p>
              <p className=" text-neutral-400 dark:text-neutral-500 text-xs ">
                4th Floor - Nampally
              </p>
            </div>
            <ArrowUp2
              className="text-neutral-900 dark:text-white"
              stroke="4"
              size={18}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
