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
import React, { useEffect, useState } from "react";
import TopNotificationBar from "../../components/TopNotificationBar";
import TopNavBar from "../../components/TopNavBar";
import useUserStore from "@/store/useUserStore";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useHospitalStore from "@/store/useHospitalStore";
import useDialysisUnitStore from "@/store/useDialysisUnitStore";
import { Badge } from "@/components/ui/badge";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import ReactApexChart from "react-apexcharts";

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
      : "text-stone-400 dark:text-neutral-400";

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

  const data = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <>
      <Container>
        <Flex direction={"row"}>
          <Flex
            py={"4"}
            px={"8"}
            justify={"start"}
            direction={"column"}
            gap={"4"}
            flexGrow={"1"}
            className={"  "}
          >
            <Flex direction={"row"} justify={"between"}>
              <Text size="5" weight="bold">
                Shift Management
              </Text>
              <Flex direction={"row"} gap={"2"}>
                <Button>Create Shift</Button>
                {/*<Button variant={"outline"}>Refry</Button>*/}
              </Flex>
            </Flex>
            <Grid gap="2" columns={"2"} width="auto">
              <Card>
                <Text size="3" weight="regular">
                  Morning Shift
                </Text>
                <ReactApexChart
                  options={data.options}
                  series={data.series}
                  type="area"
                  height={250}
                />
              </Card>
              <Card></Card>
            </Grid>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
