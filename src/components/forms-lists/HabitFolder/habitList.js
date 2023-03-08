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

function HabitList({ page, setTotalPages, formOpen }) {
  const {
    isHabitModalOpen,
    habitModalOpen,
    habitModalClose,
    isHabitClicked,
  } = useAllContext();
  const [habitList, setHabitList] = useState([]);
  const habitsPerPage = 8;
  const startIndex = (page - 1) * habitsPerPage;

  useEffect(() => {
    getHabitDataFromDB().then((res) => {
      setHabitList(res);
    });
  }, [isHabitModalOpen, formOpen, isHabitClicked]);

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
