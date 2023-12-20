import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getDataChart } from "../../api";

export default function Chart() {
  const [data, setData] = useState([]);
  const quantitiesData = data.map((entry) => entry.itemCount);
  const revenueData = data.map((entry) => entry.totalPrice);
  const dateLabels = data.map((entry) => {
    const { year, month, day } = entry._id;
    // Assuming date format is YYYY-MM-DD, adjust as needed
    return `${new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  });
  useEffect(() => {
    const getData = async () => {
      const result = await getDataChart();
      setData(result.data);
    };
    getData();
  }, []);
  const state = {
    series: [
      {
        name: "Quantities",
        type: "area",
        data: quantitiesData,
      },
      {
        name: "Revenue",
        type: "line",
        data: revenueData,
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
      labels: dateLabels,
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
