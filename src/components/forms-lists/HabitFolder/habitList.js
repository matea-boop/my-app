import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAllContext } from "../../../context/indexContext";
import HabitItem from "./habitItem";

async function getHabitDataFromDB() {
  const url = "http://localhost:3001/api/habits";

  try {
    const {
      data: { habits },
    } = await axios.get(url);

    return habits;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function HabitList({ page, setTotalPages, formOpen, getTargetsDone }) {
  const {
    isHabitModalOpen,
    habitModalOpen,
    habitModalClose,
    isHabitClicked,
    isHabitDeleted,
  } = useAllContext();
  const [habitList, setHabitList] = useState([]);
  const habitsPerPage = 8;
  const startIndex = (page - 1) * habitsPerPage;

  useEffect(() => {
    getHabitDataFromDB().then((res) => {
      setHabitList(res);
    });
    getTargetsDone(targetSumDone);
  }, [isHabitModalOpen, formOpen, isHabitClicked, habitList, isHabitDeleted]);

  const habitCheckboxesArray =
    habitList && habitList.length > 0
      ? habitList.map((habit) => {
          return habit.checkboxes;
        })
      : [];
  const habitClickedArray =
    habitCheckboxesArray && habitCheckboxesArray.length > 0
      ? habitCheckboxesArray.map((item) =>
          item.map((i) => {
            return i.clicked;
          })
        )
      : [];

  const habitArrayBoolean =
    habitClickedArray && habitClickedArray.length > 0
      ? habitClickedArray.map((item) => {
          return item.filter((i) => i === true).length;
        })
      : [];

  const targetSumDone = habitArrayBoolean.reduce(
    (total, current) => (total = total + parseInt(current)),
    0
  );

  const selectedHabits =
    habitList.length > 0
      ? habitList.slice(startIndex, startIndex + habitsPerPage)
      : [];

  useEffect(() => {
    setTotalPages(Math.ceil(habitList.length / habitsPerPage));
  }, [habitList]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "100%",
        }}
      >
        {" "}
        {selectedHabits && selectedHabits.length > 0 ? (
          selectedHabits.map((habit) => {
            return <HabitItem habit={habit} formOpen={formOpen} />;
          })
        ) : (
          <div
            style={{
              fontSize: " 0.9rem",
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No habits assigned
          </div>
        )}
      </div>
    </div>
  );
}

export default HabitList;
