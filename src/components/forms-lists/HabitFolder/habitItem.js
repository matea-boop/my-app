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
  const [listBooleanLength, setListBooleanLength] = useState(
    habit.checkboxes.filter((day) => day.clicked !== false).length
  );
  const [checked, setChecked] = useState(false);

  const habitWidth = listBooleanLength
    ? ((listBooleanLength / habit.target) * 100).toFixed()
    : 0;

  useEffect(() => {
    getHabitDataFromDB().then((res) => setHabitList(res));
  }, [isHabitModalOpen, formOpen, checked, listBooleanLength]);

  const handleCheck = async (dayIndex) => {
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

    const listBoolean = habit.checkboxes.filter((day) => day.clicked !== false)
      .length;
    console.log(newArr);
    //ne gledaj habitarray nego newarr
    setListBooleanLength(listBoolean);

    console.log(listBoolean);
    console.log(habit.target);
    console.log(dayItem.clicked);
    console.log(listBooleanLength);

    console.log(habitCheckboxesArray);
    if (listBoolean === habit.target) {
      console.log("mj");
    }

    if (listBoolean < habit.target) {
      try {
        await axios.patch(`http://localhost:3001/api/habits/${habit._id}`, {
          checkboxes: newArr,
        });
      } catch (error) {
        console.log(error);
      }
    }

    habitUnclicked();
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
    <Wrapper>
      <div className="top-row">
        <p className="title">{habit.title}</p>
        <div className="corner">
          <div className="target">
            <div className="grey-bar"></div>
            <div
              className="orange-green-bar"
              style={
                habitWidth >= 100
                  ? { width: "100%", backgroundColor: "var(--maingreen-color)" }
                  : { width: `${habitWidth}%` }
              }
            ></div>
            <div className="target-number">Target 0/{habit.target}</div>
          </div>
          <div className="icon">
            <HiEllipsisVertical />
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
    z-index: 10;

    width: 100%;

    color: car(--text-color);
    font-size: var(--text-size);
    height: 80%;
  }

  .orange-green-bar {
    position: absolute;

    height: 80%;
    z-index: 5;

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
