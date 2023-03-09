import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAllContext } from "../../../context/indexContext";
import axios from "axios";
import { FiSquare } from "react-icons/fi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FiCheckSquare } from "react-icons/fi";
import HabitForm from "./HabitForm";

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

function HabitItem({ habit, formOpen }) {
  const {
    isHabitModalOpen,
    habitModalOpen,
    habitModalClose,
    isHabitClicked,
    habitClicked,
    habitUnclicked,
  } = useAllContext();

  const [habitList, setHabitList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [editHabitModalOpen, setEditHabitModalOpen] = useState(false);
  const [listBooleanLength, setListBooleanLength] = useState(
    habit.checkboxes.filter((day) => day.clicked !== false).length
  );
  const [checked, setChecked] = useState(false);
  var curr = new Date();
  const today = curr.getDay();
  const choiceRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!choiceRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const habitWidth = listBooleanLength
    ? ((listBooleanLength / habit.target) * 100).toFixed()
    : 0;

  useEffect(() => {
    getHabitDataFromDB().then((res) => setHabitList(res));
  }, [
    isHabitModalOpen,
    formOpen,
    checked,
    listBooleanLength,
    editHabitModalOpen,
  ]);

  const handleCheck = async (dayIndex) => {
    if (dayIndex >= today - 1) {
      habitClicked();
      const habitItem0 =
        habitList.length > 0
          ? habitList.filter((item) => item._id === habit._id)
          : null;
      const habitItem = habitItem0 ? habitItem0[0] : null;
      const habitCheckboxesArray = habitItem ? habitItem.checkboxes : [];

      const dayItem =
        habitCheckboxesArray && habitCheckboxesArray.length > 0
          ? habitCheckboxesArray[dayIndex]
          : null;
      const clickedBoolean = dayItem ? dayItem.clicked : null;
      const newArr = habitCheckboxesArray
        ? habitCheckboxesArray.map((day, index) => {
            if (index === dayIndex) {
              return { ...day, clicked: !clickedBoolean };
            } else {
              return day;
            }
          })
        : [];

      const listBoolean = newArr
        ? newArr.filter((day) => day.clicked !== false).length
        : 0;

      setListBooleanLength(listBoolean);

      if (listBoolean <= habit.target && dayIndex >= today - 1) {
        try {
          await axios.patch(`http://localhost:3001/api/habits/${habit._id}`, {
            checkboxes: newArr,
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (listBoolean >= habit.target) {
        try {
          await axios.patch(`http://localhost:3001/api/habits/${habit._id}`, {
            status: true,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.patch(`http://localhost:3001/api/habits/${habit._id}`, {
            status: false,
          });
        } catch (error) {
          console.log(error);
        }
      }

      habitUnclicked();
    }
  };

  const deleteFromDB = async (idToDelete) => {
    // context za delete i not deleted
    try {
      await axios.delete(`http://localhost:3001/api/habits/${idToDelete}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper style={habit.status ? { opacity: "0.5" } : { opacity: "1" }}>
      <div className="top-row">
        <p className="title">{habit.title}</p>
        <div className="corner">
          <div className="target">
            <div className="grey-bar"></div>
            <div
              className="orange-green-bar"
              style={
                habitWidth >= 100
                  ? {
                      width: "100%",
                      backgroundColor: "var(--maingreen-color)",
                      opacity: "1",
                    }
                  : { width: `${habitWidth}%` }
              }
            ></div>
            <div className="target-number">
              {" "}
              {listBooleanLength > habit.target
                ? listBooleanLength - 1
                : listBooleanLength}
              /{habit.target}
            </div>
          </div>
          <div className="icon-box" ref={choiceRef}>
            <div className="icon">
              {" "}
              <HiEllipsisVertical
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              />
            </div>
            <div
              className="icon-choice-container"
              {...(openMenu ? { open: openMenu } : null)}
            >
              <div className="choice" role="button">
                Delete habit
              </div>
              <div
                className="choice"
                onClick={() => {
                  setOpenMenu(false);
                  setEditHabitModalOpen(true);
                }}
                role="button"
              >
                Edit habit
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="checkboxes"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        {habit.checkboxes.length > 0
          ? habit.checkboxes.map((check, dayIndex) => {
              return (
                <div
                  className="day"
                  style={check.clicked ? { opacity: "1" } : { opacity: "0.3" }}
                  onClick={() => {
                    handleCheck(dayIndex);
                  }}
                >
                  <p className="day-name">{check.day}</p>
                  <div className="day-box">
                    {!check.clicked ? (
                      <FiSquare style={{ strokeWidth: "1" }} />
                    ) : (
                      <FiCheckSquare style={{ strokeWidth: "1" }} />
                    )}
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {editHabitModalOpen ? (
        <HabitForm
          type="edit"
          habit={habit}
          isHabitModalOpen={editHabitModalOpen}
          habitModalClose={setEditHabitModalOpen}
        />
      ) : null}
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
    z-index: 6;

    width: 100%;

    color: car(--text-color);
    font-size: var(--text-size);
    height: 80%;
  }

  .orange-green-bar {
    position: absolute;

    height: 80%;
    z-index: 3;

    background-color: var(--mainblue-color);
    border-radius: 1rem;

    opacity: 0.3;
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

  .icon-box {
    z-index: 8;
    position: relative;
    display: flex;

    align-items: center;
    justify-content: center;

    height: 1rem;
    font-size: 1rem;

    opacity: 1;

    margin-left: 0.5rem;
    cursor: pointer;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .icon-choice-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 200;

    top: -1.4rem;
    right: 1.4rem;
    min-width: 5.5rem;

    opacity: 0;
    transition: opacity 0.2s;
    animation: fade-out 0.2s forwards;
    background-color: var(--mainorange-color);
    border-radius: var(--border-radius);
  }

  .icon-choice-container[open] {
    animation: fade-in 0.2s forwards;
    opacity: 1;
    transition: opacity 0.2s;
  }

  .choice {
    color: var(--box-color);
    font-size: 0.8rem;

    cursor: pointer;
    opacity: 0.5;

    margin-right: auto;
    padding: 0.5rem;

    &:hover {
      opacity: 1;
    }

    &:last-child {
      padding-top: 0;
    }
  }

  @keyframes fade-in {
    0% {
      clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 100% 50%);
      transform: scale(0);
    }
    50% {
      clip-path: polygon(0 0, 100% 40%, 100% 60%, 0% 100%);
      transform: scale(0.5);
    }
    75% {
      clip-path: polygon(0 0, 100% 20%, 100% 80%, 0% 100%);
      transform: scale(0.7);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transform: scale(1);
    }
  }
  @keyframes fade-out {
    100% {
      clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 100% 50%);
      transform: scale(0);
      transform-origin: 100% 50%;
    }
    75% {
      clip-path: polygon(0 0, 100% 40%, 100% 60%, 0% 100%);
    }
    50% {
      clip-path: polygon(0 0, 100% 20%, 100% 80%, 0% 100%);
    }
    0% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transform: scale(1);
      transform-origin: 100% 50%;
    }
  }
`;

export default HabitItem;
