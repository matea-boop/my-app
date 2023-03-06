import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RxUnderline } from "react-icons/rx";
import { RxFontBold } from "react-icons/rx";
import { RxStrikethrough } from "react-icons/rx";
import { RxFontItalic } from "react-icons/rx";
import { RxTextAlignLeft } from "react-icons/rx";
import { RxTextAlignCenter } from "react-icons/rx";
import { RxTextAlignJustify } from "react-icons/rx";
import { RxTextAlignRight } from "react-icons/rx";
import { RxListBullet } from "react-icons/rx";
import axios from "axios";
import moment from "moment/moment";
import NoteItem from "./noteItem";

export const NoteField = ({ date, notesList, getWords }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [noteIndex, setNoteIndex] = useState("");
  const [change, setChange] = useState(false);
  const today = moment(new Date()).format("DD/MM/YYYY");
  const url = "http://localhost:3001/api/notes";

  const dateList = [];

  const x =
    notesList.length > 0
      ? notesList.map((note) => {
          dateList.push(note.date);
        })
      : null;

  useEffect(() => {
    const y =
      notesList.length > 0
        ? notesList.map((note) => {
            return note.date === today ? setNoteIndex(note._id) : null;
          })
        : null;
  });

  const getText = (value) => {
    setText(value);
  };

  const getNumberOfWords = (value) => {
    setWordCount(value);
  };

  const putDataToDB = async () => {
    const newData = {
      date: date,
      content: text,
      numberOfWords: wordCount,
    };

    try {
      await axios.post(url, newData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClick = () => {
    setChange(!change);
    const updateText = async () => {
      await axios.patch(`http://localhost:3001/api/notes/${noteIndex}`, {
        content: text,
        numberOfWords: wordCount,
      });
    };
    if (dateList.length > 0 && notesList.length > 0) {
      if (dateList.includes(date)) {
        if (date === today) {
          updateText();
        }
        console.log("ne moze");
        return;
      } else {
        console.log("moze");
        putDataToDB();
      }
    } else {
      console.log("jes");
      putDataToDB();
    }
  };

  useEffect(() => {
    getWords(wordCount);
  }, [text, wordCount]);

  return (
    <Wrapper>
      <div className="field">
        {notesList.length > 0
          ? notesList.map((note) => {
              if (date === note.date) {
                return (
                  <NoteItem
                    onClick={onClick}
                    note={note}
                    date={date}
                    getNumberOfWords={getNumberOfWords}
                    getText={getText}
                    text={text}
                    notesList={notesList}
                    wordCount={wordCount}
                  />
                );
              }
            })
          : null}
        {date === today && !dateList.includes(date) ? (
          <div style={{ height: "100%" }}>
            <div className="top-field">
              <div className="date">
                {moment(today, "DD/MM/YYYY").format("dddd, Do MMMM YYYY")}
              </div>

              <div
                className="save-btn"
                onClick={onClick}
                style={
                  date === today ? { display: "flex" } : { display: "none" }
                }
              >
                SAVE
              </div>
            </div>
            <textarea
              id="text-field"
              className="text-field"
              name="text-field"
              placeholder="Start your notes..."
              rows="4"
              columns="50"
              value={text}
              onChange={(e) => {
                setText(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                );
                setWordCount(
                  e.target.value.replace(/^\s+|\s+$/g, "").split(/\s+/).length
                );
              }}
            ></textarea>
          </div>
        ) : null}
        {dateList.length > 0 && !dateList.includes(date) && date !== today ? (
          <div className="top-field-no-content">
            <div className="date-no-content">
              {moment(date, "DD/MM/YYYY").format("dddd, Do MMMM YYYY")}
            </div>
            <div className="text-field">
              <div>No notes taken on this day.</div>
            </div>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};
export default NoteField;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 78%;
  width: 90%;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  margin-bottom: 1.5rem;

  .save-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20%;
    height: 100%;

    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);

    cursor: pointer;
    border-radius: var(--border-radius);
    background-color: var(--sidebar-color);

    margin-right: 2rem;
    padding: 0.5rem 0 0.5rem 0;
  }

  .top-field-no-content {
    display: flex;

    align-items: left;
    flex-direction: column;

    width: 100%;

    padding-top: 1.5rem;
  }

  .top-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    width: 100%;

    padding-top: 1.5rem;
  }

  .field {
    height: 100%;
    width: 100%;
  }

  .text-field {
    height: 90%;
    width: 100%;

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: var(--box-color);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--body-color);
      border-radius: 10px;
    }

    resize: none;
    border: none;
    outline: none;

    color: var(--text-color);
    font-size: var(--text-size);
    font-family: "Nunito", sans-serif;
    font-weight: lighter;

    background-color: var(--box-color);
    border-radius: 0 0 var(--border-radius) var(--border-radius);

    padding: 1rem 2rem 1rem 2rem;
  }

  .date {
    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;
    opacity: 0.5;

    padding: 0 2rem 0 2rem;
  }

  .date-no-content {
    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;
    opacity: 0.5;

    padding: 0.5rem 2rem 0 2rem;
  }

  .content {
    height: 95%;
    width: 100%;

    color: var(--text-color);
    font-size: var(--text-size);
    font-family: "Nunito", sans-serif;
    font-weight: lighter;

    padding: 1rem 2rem 1rem 2rem;
  }
`;
