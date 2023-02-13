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
import { useAllContext } from "../../../context/indexContext";

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

export const AreaChartProgress = ({
  button1Clicked,
  button2Clicked,
  button3Clicked,
  weekButton,
  monthButton,
}) => {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [progressList, setProgressList] = useState([]);
  const [data, setData] = useState([]);
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];

  const weekDates = [];
  const wtest = [];
  const wtestData = [];

  const monthDates = [];
  const mtestData = [];
  const mtest = [];

  useEffect(() => {
    getDataProgressFromDB().then((res) => setProgressList(res));
    // if (weekButton) {
    //   setData(weekData);
    // } else {
    //   setData(monthData);
    // }
  }, [isModalOpen, isDeleted, isTaskChecked]);

  // useEffect(() => {
  //   if (weekButton) {
  //     setData(weekData);
  //   } else {
  //     setData(monthData);
  //   }
  // }, [progressList, weekButton, monthButton]);

  const current = moment();
  let n = 7;
  let x = 30;
  while (n > 0) {
    weekDates.push({
      id: n,
      dateFormat: current.format("DD/MM/YYYY"),
      dateName: current.format("ddd"),
    });
    current.subtract(1, "day");
    n--;
  }

  const mcurrent = moment();
  while (x > 0) {
    monthDates.push({
      id: x,
      dateFormat: mcurrent.format("DD/MM/YYYY"),
      dateName: mcurrent.format("ddd"),
    });
    mcurrent.subtract(1, "day");
    x--;
  }

  const check =
    weekDates.length > 0
      ? weekDates.reverse().forEach((i) => {
          wtest.push({
            id: i.id,
            dateName: i.dateName,
            dateFormat: i.dateFormat,
            value: "100",
          });
        })
      : null;

  const mckeck =
    monthDates.length > 0
      ? monthDates.reverse().forEach((i) => {
          mtest.push({
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

  const mcheck2 =
    mtest.length > 0
      ? mtest.forEach((i) => {
          mtestData.push({
            id: i.id,
            name: i.dateName,
            date: i.dateFormat,
            percent: 0,
            all: "No",
            notebook: 0,
            allProgress: 100,
          });
          if (progressList.length > 0) {
            progressList.map((x) => {
              if (i.dateFormat === x.date) {
                mtestData.push({
                  id: i.id,
                  name: i.dateName,
                  date: i.dateFormat,
                  percent: x.percent,
                  all: x.all,
                  notebook: 0,
                  allProgress: 100,
                });
              }
            });
          }
        })
      : null;

  const check2 =
    wtest.length > 0
      ? wtest.forEach((i) => {
          wtestData.push({
            id: i.id,
            name: i.dateName,
            date: i.dateFormat,
            percent: 0,
            all: "No",
            notebook: 0,
            allProgress: 100,
          });
          if (progressList.length > 0) {
            progressList.map((x) => {
              if (i.dateFormat === x.date) {
                wtestData.push({
                  id: i.id,
                  name: i.dateName,
                  date: i.dateFormat,
                  percent: x.percent,
                  all: x.all,
                  notebook: 0,
                  allProgress: 100,
                });
              }
            });
          }
        })
      : null;

  const weekData = [...new Map(wtestData.map((m) => [m.id, m])).values()];
  const monthData = [...new Map(mtestData.map((m) => [m.id, m])).values()];

  return (
    <Wrapper>
      <ResponsiveContainer width="99%" height={200}>
        <AreaChart
          data={monthButton ? monthData : weekData}
          margin={{ right: 30, top: 30 }}
        >
          <defs>
            <linearGradient id="colorblue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#405eff" stopOpacity={0.9} />
              <stop offset="90%" stopColor="#405eff" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colororange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#eca542" stopOpacity={0.9} />
              <stop offset="90%" stopColor="#eca542" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="percent"
            type="monotone"
            stroke="#405eff"
            strokeLinecap="round"
            strokeWidth={3}
            className="tasks"
            // animationDuration={800}
            // animationEasing={"ease-in-out"}
            fill="url(#colorblue)"
            style={
              button1Clicked
                ? { opacity: "1", transition: "all 0.2s" }
                : { opacity: "0", transition: "all 0.2s" }
            }
          />
          <Area
            dataKey="notebook"
            type="monotone"
            stroke="#eca542"
            strokeLinecap="round"
            strokeWidth={3}
            className="notebook"
            // animationDuration={800}
            // animationEasing={"ease-in-out"}
            fill="url(#colororange)"
            style={
              button2Clicked
                ? { opacity: "1", transition: "all 0.2s" }
                : { opacity: "0", transition: "all 0.2s" }
            }
          />
          <Area
            dataKey="allProgress"
            type="monotone"
            stroke="#e8f4fa"
            strokeLinecap="round"
            strokeWidth={2}
            className="all"
            // animationDuration={800}
            // animationEasing={"ease-in-out"}
            fill="none"
            style={
              button3Clicked
                ? { opacity: "1", transition: "all 0.2s" }
                : { opacity: "0", transition: "all 0.2s" }
            }
          />
          <XAxis
            dataKey={monthButton ? "date" : "name"}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(x, index) => {
              if (monthButton) {
                const day = index + 1;
                if (day === 1 || day % 6 === 0) {
                  const date = moment(x, "DD/MM/YYYY").format("DD MM");
                  return date;
                }
                return "";
              }
              return x;
            }}
          />
          <YAxis
            dataKey="percent"
            axisLine={false}
            interval={0}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(x) => {
              if (x === 0) {
                return "";
              }
              return x;
            }}
          />
          <Tooltip
            content={
              <CustomToolTip
                button1Clicked={button1Clicked}
                button2Clicked={button2Clicked}
                button3Clicked={button3Clicked}
              />
            }
          />
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

function CustomToolTip({
  active,
  payload,
  label,
  button1Clicked,
  button2Clicked,
  button3Clicked,
}) {
  if (active) {
    return (
      <div className="tooltipArea">
        <div className="tooltipArea-header">
          <h4>{getWeekNames(payload[0].payload.name)},&nbsp;</h4>
          <p>
            {moment(payload[0].payload.date, "DD/MM/YYYY").format("D MMM YYYY")}
          </p>
        </div>
        {button1Clicked ? (
          <p
            style={
              button2Clicked || button3Clicked
                ? {
                    display: "none",
                  }
                : { display: "flex" }
            }
          >
            {payload[0].payload.all === "No"
              ? `${payload[0].payload.all} tasks assigned that day`
              : `${payload[0].value.toFixed()}% tasks done`}
          </p>
        ) : null}
        {button2Clicked ? (
          <p
            style={
              button1Clicked || button3Clicked
                ? {
                    display: "none",
                  }
                : { display: "flex" }
            }
          >{`${payload[1].value.toFixed()}% notebook `}</p>
        ) : null}
        {button3Clicked ? (
          <p>{`${payload[2].value.toFixed()}% assignments done`}</p>
        ) : null}
      </div>
    );
  }
}

export default AreaChartProgress;

const Wrapper = styled.div``;
