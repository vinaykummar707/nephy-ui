import React from "react";
import ReactApexChart from "react-apexcharts";

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
    <div className=" dark:bg-neutral-900 flex flex-col flex-1  gap-3 py-4 px-8">
      <h1 className="font-bold dark:text-white text-xl">Dashboard</h1>
      <div className="bg-white pt-4 pr-4  border">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="area"
          height={350}
        />
      </div>
      {/* <div className="bg-white flex-1 dark:bg-neutral-800 dark:border-neutral-700 flex flex-col p-6 border  rounded-lg shadow-sm"></div> */}
    </div>
  );
};

export default DashboardPage;
