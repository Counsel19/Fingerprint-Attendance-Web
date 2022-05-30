import { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getAttendanceSummary,
  getSingleAttendanceSummary,
} from "../../../services/getService";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = ({ aspect, title, singleUserId }) => {
  const d = new Date();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!singleUserId) {
        const {
          currentMonthRes,
          oneMonthRes,
          twoMonthRes,
          threeMonthRes,
          fourMonthRes,
          fiveMonthRes,
        } = await getAttendanceSummary();
        setChartData([
          {
            name: monthNames[fiveMonthRes.number],
            Total: fiveMonthRes.data.length,
          },
          {
            name: monthNames[fourMonthRes.number],
            Total: fourMonthRes.data.length,
          },
          {
            name: monthNames[threeMonthRes.number],
            Total: threeMonthRes.data.length,
          },
          {
            name: monthNames[twoMonthRes.number],
            Total: twoMonthRes.data.length,
          },
          {
            name: monthNames[oneMonthRes.number],
            Total: oneMonthRes.data.length,
          },
          { name: monthNames[d.getMonth()], Total: currentMonthRes.length },
        ]);
      } else {
        const {
          currentMonthRes,
          oneMonthRes,
          twoMonthRes,
          threeMonthRes,
          fourMonthRes,
          fiveMonthRes,
        } = await getSingleAttendanceSummary(singleUserId);

        setChartData([
          {
            name: monthNames[fiveMonthRes.number],
            Total: fiveMonthRes.data.length,
          },
          {
            name: monthNames[fourMonthRes.number],
            Total: fourMonthRes.data.length,
          },
          {
            name: monthNames[threeMonthRes.number],
            Total: threeMonthRes.data.length,
          },
          {
            name: monthNames[twoMonthRes.number],
            Total: twoMonthRes.data.length,
          },
          {
            name: monthNames[oneMonthRes.number],
            Total: oneMonthRes.data.length,
          },
          { name: monthNames[d.getMonth()], Total: currentMonthRes.length },
        ]);
      }
    };

    getData();
  }, [singleUserId]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="99%" aspect={aspect}>
        <AreaChart
          width={300}
          height={400}
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#17b42a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#17b42a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
