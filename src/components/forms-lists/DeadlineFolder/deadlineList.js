import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAllContext } from "../../../context/indexContext";
import DeadlineItem from "./deadlineItem";

async function getDeadlineDataFromDB() {
  const url = "http://localhost:3001/api/deadlines";

  try {
    const {
      data: { deadlines },
    } = await axios.get(url);

    return deadlines;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function DeadlineList({}) {
  const {
    isDeadlineModalOpen,
    deadlineModalOpen,
    deadlineModalClose,
    isDeadlineChanged,
    isDeadlineDeleted,
  } = useAllContext();
  const [deadlineList, setDeadlineList] = useState([]);
  const habitsPerPage = 8;
  const startIndex = 0;
  //    (page - 1) * habitsPerPage;

  useEffect(() => {
    getDeadlineDataFromDB().then((res) => {
      setDeadlineList(res);
    });
  }, [isDeadlineModalOpen, isDeadlineChanged, isDeadlineDeleted]);
  console.log(deadlineList);
  const selectedDeadlines =
    deadlineList && deadlineList.length > 0
      ? deadlineList.slice(startIndex, startIndex + habitsPerPage)
      : [];

  //   useEffect(() => {
  //     setTotalPages(Math.ceil(deadlineList.length / habitsPerPage));
  //   }, [deadlineList]);

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
        {selectedDeadlines && selectedDeadlines.length > 0 ? (
          selectedDeadlines.map((deadline) => {
            return <DeadlineItem deadline={deadline} />;
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
            No deadlines set
          </div>
        )}
      </div>
    </div>
  );
}

export default DeadlineList;
