import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAllContext } from "../../../context/indexContext";
import axios from "axios";
import { FiSquare } from "react-icons/fi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FiCheckSquare } from "react-icons/fi";

const weekDays = [
  { day: "MON", clicked: false },
  { day: "TUE", clicked: false },
  { day: "WED", clicked: false },
  { day: "THU", clicked: false },
  { day: "FRI", clicked: false },
  { day: "SAT", clicked: false },
  { day: "SUN", clicked: false },
];

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

function HabitItem({ habit }) {
  const { isHabitModalOpen, habitModalOpen, habitModalClose } = useAllContext();

  const [habitList, setHabitList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    getHabitDataFromDB().then((res) => setHabitList(res));
  }, [isHabitModalOpen]);

  //   useEffect(() => {
  //     let handler = (event) => {
  //       if (divRef.current.contains(event.target)) {
  //         setClicked(task._id);
  //       }
  //     };
  //     document.addEventListener("mousedown", handler);
  //     return () => {
  //       setClicked("");
  //       document.removeEventListener("mousedown", handler);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (task.status === true) {
  //       setChecked(true);
  //       taskChecked();
  //     } else {
  //       setChecked(false);
  //       taskUnchecked();
  //     }
  //   }, [task.status]);

  // const handleCheck = async () => {
  //   setChecked(!checked);
  //   await axios.patch(`http://localhost:3001/api/habit/${habit._id}`, {
  //     status: !checked,
  //   });
  // };

  //   useEffect(() =>{

  //   }, [checked])

  const deleteFromDB = async (idToDelete) => {
    // context za delete i not deleted
    try {
      await axios.delete(`http://localhost:3001/api/habits/${idToDelete}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="top-row">
        <p className="title">{habit.title}</p>
        <div className="corner">
          <div className="target">
            <div className="grey-bar"></div>
            <div className="orange-green-bar"></div>
            <div className="target-number">Target 0/{habit.target}</div>
          </div>
          <div className="icon">
            <HiEllipsisVertical />
          </div>
        </div>
      </div>
      <div className="checkboxes">
        {weekDays.length > 0
          ? weekDays.map((week, index) => {
              return (
                <div
                  className="day"
                  style={!week.clicked ? { opacity: "0.3" } : { opacity: "1" }}
                  onClick={() => {
                    setChecked(!checked);
                    setIndex(index);
                  }}
                >
                  <p className="day-name">{week.day}</p>
                  <div className="day-box">
                    <FiSquare style={{ strokeWidth: "1" }} />
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {/* kasnije za edit 
      {editModalOpen ? (
        <TaskForm
          type="edit"
          task={task}
          isModalOpen={editModalOpen}
          modalClose={setEditModalOpen}
        />
      ) : null} */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  margin-bottom: 3%;

  height: 13%;
  width: 100%;

  .top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;

    padding: 0 0.5rem 0.5rem 1rem;
  }

  .corner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 40%;
    height: 100%;
  }

  .title,
  .target {
    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);
  }

  .target {
    position: relative;

    width: 100%;
    height: 100%;
  }

  .grey-bar {
    position: absolute;
    width: 100%;
    height: 80%;
    z-index: 1;

    background-color: var(--sidebar-color);
    border-radius: 1rem;
  }

  .target-number {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;

    width: 100%;

    color: car(--text-color);
    font-size: var(--text-size);
    height: 80%;
  }

  .orange-green-bar {
    position: absolute;
    width: 50%;
    height: 80%;
    z-index: 10;

    background-color: var(--mainblue-color);
    border-radius: 1rem;

    opacity: 0.5;
  }

  .checkboxes {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 90%;

    padding: 0 1rem 0 1rem;
  }

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .day-name {
    font-size: 0.5rem;
    text-transform: uppercase;
    font-weight: lighter;
    color: var(--text-color);
  }

  .day-box {
    display: flex;

    align-items: end;

    font-size: 1rem;
    stroke-width: 1;
    font-weight: lighter;
  }
  .icon {
    display: flex;

    align-items: center;
    justify-content: center;

    height: 1rem;
    font-size: 1rem;

    opacity: 0.5;

    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

export default HabitItem;
