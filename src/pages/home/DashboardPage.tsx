import React from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import ReactApexChart from "react-apexcharts";
import { Flex, Text, Button, Box, Card, Avatar } from "@radix-ui/themes";
const DashboardPage = () => {
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
    // <div className=" bg-stone-50 dark:bg-neutral-900 flex flex-col flex-1 gap-3 px-48 py-8">
    //   <h1 className="font-bold dark:text-white text-xl">Dashboard</h1>
    //   <div className="bg-white p-6  border shadow-sm rounded-2xl">
    //     <ReactApexChart
    //       options={data.options}
    //       series={data.series}
    //       type="area"
    //       height={350}
    //     />
    //   </div>
    //   {/* <div className="bg-white flex-1 dark:bg-neutral-800 dark:border-neutral-700 flex flex-col p-6 border  rounded-lg shadow-sm"></div> */}
    // </div>
    <Flex direction="column" gap="2" justify={"between"}>
      <Text size={"5"} weight={"medium"}>
        Shifts
      </Text>
      <Box className={""}>
        <Card>
          <Flex gap="2" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback="TG"
            />
            <Flex gap={""} direction={"column"}>
              <Text as="div" size="2" weight="bold">
                Teodros girmay
              </Text>
              <Text as="div" size="1" color="lime">
                Engineering
              </Text>
              <Button variant={"soft"} size={"1"}>
                View Profile
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
