import React from "react";
import { HiDocumentText } from "react-icons/hi";
import { HiViewGrid } from "react-icons/hi";
import { HiCalendar } from "react-icons/hi";

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
];

export const motivationalText = [
  {
    id: 0, //0%
    text: "We are just getting started...",
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

export const activityType = [
  { id: 0, color: "var(--mainorange-color)", actName: "personal" },
  { id: 1, color: "var(--mainred-color)", actName: "work/study" },
  { id: 2, color: "var(--maingreen-color)", actName: "meeting" },
  { id: 2, color: "var(--mainblue-color)", actName: "appointment" },
];

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthsOfYear = [
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
