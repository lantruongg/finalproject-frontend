import React from "react";
import ReactApexChart from "react-apexcharts";

export default function chart() {
  const state = {
    series: [
      {
        name: "Quantities",
        type: "area",
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
      },
      {
        name: "Revenue",
        type: "line",
        data: [556, 693, 863, 616, 732, 246, 671, 924, 441, 612, 543],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
      },
      labels: [
        "Nov 18",
        "Nov 19",
        "Nov 20",
        "Nov 21",
        "Nov 22",
        "Nov 23",
        "Nov 24",
        "Nov 25",
        "Nov 26 ",
        "Nov 27",
        "Nov 28",
      ],
      markers: {
        size: 0,
      },
      yaxis: [
        {
          title: {
            text: "Quantities (products)",
          },
        },
        {
          opposite: true,
          title: {
            text: "Revenue (USD)",
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            console.log(y);
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <ReactApexChart
      style={{ marginTop: 150 }}
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
}
