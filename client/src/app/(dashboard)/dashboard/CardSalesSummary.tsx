import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  const [timeframe, setTimeframe] = useState("weekly");

  const salesData = useMemo(() => {
    if (!data?.salesSummary) return [];

    const sortedData = [...data.salesSummary].sort(
      (a, b) => new Date(a.period).getTime() - new Date(b.period).getTime()
    );

    return sortedData.map((sale, index, array) => {
      if (index === 0) {
        return { ...sale, changePercentage: 0 };
      }
      const previousSale = array[index - 1];
      const changePercentage =
        ((sale.totalSales - previousSale.totalSales) /
          previousSale.totalSales) *
        100;
      return { ...sale, changePercentage };
    });
  }, [data]);

  const totalSalesSum = useMemo(
    () => salesData.reduce((acc, curr) => acc + curr.totalSales, 0) || 0,
    [salesData]
  );

  const averageChangePercentage = useMemo(
    () =>
      salesData.reduce((acc, curr) => acc + curr.changePercentage, 0) /
        (salesData.length - 1) || 0,
    [salesData]
  );

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalSales > curr.totalSales ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.period
    ? new Date(highestValueData.period).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mt-5 md:mt-0 flex justify-between items-center mb-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  $
                  {totalSalesSum.toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e) => {
                  setTimeframe(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `${(value / 1000).toFixed(0)}K`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalSales"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{salesData.length || 0} periods</p>
              <p className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
