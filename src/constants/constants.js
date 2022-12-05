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

export const linksAddBtn = [
  {
    id: 1,
    text: "Task",
  },
  {
    id: 2,
    text: "Event",
  },
  {
    id: 3,
    text: "Habit",
  },
  {
    id: 4,
    text: "Deadline",
  },
  {
    id: 5,
    text: "Notebook",
  },
];
