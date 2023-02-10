import React from "react";
import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import styled from "styled-components";
import moment from "moment/moment";
import axios from "axios";

async function getDataProgressFromDB() {
  const url = "http://localhost:3001/api/tasks/ProgressStatistics";
  try {
    const progress = await axios.get(url);

    return progress.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const AreaChartProgress = () => {
  const [progressList, setProgressList] = useState([]);
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];
  const resultDates = [];
  const data = { id: 0, list: [], dateData: [] };
  const test = [];
  const testData = [];

  useEffect(() => {
    getDataProgressFromDB().then((res) => setProgressList(res));
  }, [mainList]);

  const current = moment();
  let n = 7;
  while (n > 0) {
    resultDates.push({
      id: n,
      dateFormat: current.format("DD/MM/YYYY"),
      dateName: current.format("ddd"),
    });
    current.subtract(1, "day");
    n--;
  }

  const check =
    resultDates.length > 0
      ? resultDates.reverse().forEach((i) => {
          test.push({
            id: i.id,
            dateName: i.dateName,
            dateFormat: i.dateFormat,
            value: "100",
          });
        })
      : null;

  const check1 =
    progressList.length > 0
      ? progressList.forEach((task) => {
          mainList.push(task);
        })
      : null;

  const check2 =
    test.length > 0
      ? test.forEach((i) => {
          testData.push({
            id: i.id,
            name: i.dateName,
            date: i.dateFormat,
            percent: 0,
          });
          progressList.map((x) => {
            if (i.dateFormat === x.date) {
              testData.push({
                id: i.id,
                name: i.dateName,
                date: i.dateFormat,
                percent: x.percent,
              });
            }
          });
        })
      : null;

  const pass =
    testData.length > 0
      ? testData.filter(function(item, index) {
          const fixed = index + 1;
          return testData.indexOf(item.id) === fixed;
        })
      : null;

  const unique = [...new Map(testData.map((m) => [m.id, m])).values()];

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={unique} margin={{ right: 30, top: 30 }}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#405eff" stopOpacity={0.9} />
              <stop offset="90%" stopColor="#405eff" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="percent"
            type="monotone"
            stroke="#405eff"
            strokeLinecap="round"
            strokeWidth={3}
            animationDuration={800}
            animationEasing={"ease-in-out"}
            fill="url(#color)"
          />
          <XAxis
            dataKey="name"
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            dataKey="percent"
            axisLine={false}
            interval={0}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomToolTip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const getWeekNames = (label) => {
  if (label === "Mon") {
    return "Monday";
  }
  if (label === "Tue") {
    return "Tuesday";
  }
  if (label === "Wed") {
    return "Wednesday";
  }
  if (label === "Thu") {
    return "Thursday";
  }
  if (label === "Fri") {
    return "Friday";
  }
  if (label === "Sat") {
    return "Saturday";
  }
  if (label === "Sun") {
    return "Sunday";
  }
  return "0";
};

function CustomToolTip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltipArea">
        <div className="tooltipArea-header">
          <h4>{getWeekNames(label)},&nbsp;</h4>
          <p>
            {moment(payload[0].payload.date, "DD/MM/YYYY").format("D MMM YYYY")}
          </p>
        </div>

        <p>{`${payload[0].value.toFixed()}% assignments done`}</p>
      </div>
    );
  }
}

export default AreaChartProgress;

const Wrapper = styled.div``;
