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
import getNotesDataFromDB from "../../../constants/dataFunctions/noteData";

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
  weekButton,
  monthButton,
}) => {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [progressList, setProgressList] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const weekDates = [];
  const weeklyData = [];
  const monthDates = [];
  const monthlyData = [];

  useEffect(() => {
    getDataProgressFromDB().then((res) => setProgressList(res));
    getNotesDataFromDB().then((res) => setNoteList(res));
  }, [isModalOpen, isDeleted, isTaskChecked]);

  const currentDateWeek = moment();
  let n = 7;
  let x = 30;
  while (n > 0) {
    weekDates.push({
      id: n,
      dateFormat: currentDateWeek.format("DD/MM/YYYY"),
      dateName: currentDateWeek.format("ddd"),
    });
    currentDateWeek.subtract(1, "day");
    n--;
  }

  const currentDateMonth = moment();
  while (x > 0) {
    monthDates.push({
      id: x,
      dateFormat: currentDateMonth.format("DD/MM/YYYY"),
      dateName: currentDateMonth.format("ddd"),
    });
    currentDateMonth.subtract(1, "day");
    x--;
  }

  const weekArray =
    weekDates.length > 0
      ? weekDates.reverse().map((day) => ({
          id: day.id,
          dateName: day.dateName,
          dateFormat: day.dateFormat,
        }))
      : [];

  const monthArray =
    monthDates.length > 0
      ? monthDates.reverse().map((day) => ({
          id: day.id,
          dateName: day.dateName,
          dateFormat: day.dateFormat,
        }))
      : [];

  const combineMonth =
    monthArray.length > 0
      ? monthArray.forEach((i) => {
          monthlyData.push({
            id: i.id,
            name: i.dateName,
            date: i.dateFormat,
            percent: 0,
            all: "No",
            notebook: 0,
          });
          if (progressList.length > 0) {
            progressList.map((x) => {
              if (i.dateFormat === x.date) {
                monthlyData.push({
                  id: i.id,
                  name: i.dateName,
                  date: i.dateFormat,
                  percent: x.percent,
                  all: x.all,
                  notebook: 0,
                });
              }
            });
          }
        })
      : null;

  const combineWeek =
    weekArray.length > 0
      ? weekArray.forEach((i) => {
          weeklyData.push({
            id: i.id,
            name: i.dateName,
            date: i.dateFormat,
            percent: 0,
            all: "No",
            notebook: 0,
          });
          if (progressList.length > 0) {
            progressList.map((x) => {
              if (i.dateFormat === x.date) {
                weeklyData.push({
                  id: i.id,
                  name: i.dateName,
                  date: i.dateFormat,
                  percent: x.percent,
                  all: x.all,
                  notebook: 0,
                });
              }
            });
          }
        })
      : null;

  const orderedWeekData = [
    ...new Map(weeklyData.map((m) => [m.id, m])).values(),
  ];
  const orderedMonthData = [
    ...new Map(monthlyData.map((m) => [m.id, m])).values(),
  ];

  const weekData =
    orderedWeekData && orderedWeekData.length > 0
      ? orderedWeekData.map((week) => {
          const exists =
            noteList.length > 0
              ? noteList.find((note, i) => note.date === week.date)
              : null;
          if (exists) {
            return {
              ...week,
              notebook: noteList
                .map((note, i) =>
                  note.date === week.date
                    ? note.numberOfWords > 69
                      ? 100
                      : ((note.numberOfWords / 70) * 100).toFixed()
                    : 0
                )
                .filter(Boolean),
            };
          } else {
            return { ...week, notebook: [0] };
          }
        })
      : [];

  const monthData =
    orderedMonthData && orderedMonthData.length > 0
      ? orderedMonthData.map((month) => {
          const exists =
            noteList.length > 0
              ? noteList.find((note, i) => note.date === month.date)
              : null;
          if (exists) {
            return {
              ...month,
              notebook: noteList
                .map((note, i) =>
                  note.date === month.date
                    ? note.numberOfWords > 69
                      ? 100
                      : ((note.numberOfWords / 70) * 100).toFixed()
                    : 0
                )
                .filter(Boolean),
            };
          } else {
            return { ...month, notebook: [0] };
          }
        })
      : [];

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
            fill="url(#colorblue)"
            style={
              button1Clicked
                ? { opacity: "1", transition: "all 0.2s" }
                : { opacity: "0", transition: "all 0.2s" }
            }
          />
          <Area
            dataKey="notebook[0]"
            type="monotone"
            stroke="#eca542"
            strokeLinecap="round"
            strokeWidth={2}
            className="notebook"
            fill="none"
            style={
              button2Clicked
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
            type="number"
            domain={[0, 100]}
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
}) {
  if (active) {
    let todaysDate = new Date().toLocaleDateString();
    return (
      <div className="tooltipArea">
        <div className="tooltipArea-header">
          <h4>{getWeekNames(payload[0].payload.name)},&nbsp;</h4>
          <p>
            {moment(payload[0].payload.date, "DD/MM/YYYY").format("D MMM YYYY")}
          </p>
        </div>
        {button1Clicked ? (
          <p>
            {payload[0].payload.all === "No"
              ? payload[0].payload.date === new Date().toLocaleDateString()
                ? `${payload[0].payload.all} tasks assigned today`
                : `${payload[0].payload.all} tasks assigned that day`
              : `${payload[0].value.toFixed()}% tasks done`}
          </p>
        ) : null}
        {button2Clicked ? (
          <p>
            {payload[1].value === 0
              ? "No notes written"
              : `${payload[1].value}% notes written that day`}
          </p>
        ) : null}
      </div>
    );
  }
}

export default AreaChartProgress;

const Wrapper = styled.div``;
