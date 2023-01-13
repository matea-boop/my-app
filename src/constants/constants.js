import React from "react";
import { HiDocumentText } from "react-icons/hi";
import { HiViewGrid } from "react-icons/hi";
import { HiCalendar } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi";
import { HiChartPie } from "react-icons/hi2";
import { HiCog6Tooth } from "react-icons/hi2";

export const menuItems = [
  {
    id: 1,
    text: "Overview",
    icon: <HiViewGrid />,
    url: "/Overview",
  },
  {
    id: 2,
    text: "Calendar",
    icon: <HiCalendar />,
    url: "/Calendar",
  },
  {
    id: 3,
    text: "Notebook",
    icon: <HiDocumentText />,
    url: "/Notebook",
  },
  {
    id: 4,
    text: "Tasks",
    icon: <HiCheckCircle />,
    url: "/Tasks",
  },
  {
    id: 5,
    text: "Statisics",
    icon: <HiChartPie />,
    url: "/Statistics",
  },
  {
    id: 6,
    text: "Settings",
    icon: <HiCog6Tooth />,
    url: "/Settings",
  },
];

export const motivationalText = [
  {
    id: 0, //0%
    text: "No work for today :(",
  },
  {
    id: 1, //0-10%
    text: "We are just getting started...",
  },
  {
    id: 2, //10-30%
    text: "Good job! Warming up!",
  },
  {
    id: 3, //30-49%
    text: "Almost half way!",
  },
  {
    id: 4, //50%
    text: "Harder half is over!",
  },
  {
    id: 5, // 50-70%
    text: "Don't lose focus now!",
  },
  {
    id: 6, // 70-90%
    text: "Almost There!",
  },
  {
    id: 7, // 90-99%
    text: "You can do it!",
  },
  {
    id: 8, // 100%
    text: "Congrats! All done!",
  },
];
