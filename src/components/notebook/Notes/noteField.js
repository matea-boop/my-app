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

export const NoteField = ({ date, notesList }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const today = moment(new Date()).format("DD/MM/YYYY");
  const url = "http://localhost:3001/api/notes";

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
    if (notesList.length > 0) {
      notesList.map((note) => {
        if (note.date === date) {
          return;
        } else {
          putDataToDB();
        }
      });
    } else {
      console.log("jes");
      putDataToDB();
    }
  };

  return (
    <Wrapper>
      <div className="all-btns">
        <div className="buttons">
          <RxFontBold />
          <RxUnderline />
          <RxStrikethrough />
          <RxFontItalic />
          <RxTextAlignLeft />
          <RxTextAlignCenter />
          <RxTextAlignJustify />
          <RxTextAlignRight />
          <RxListBullet />
        </div>
        <div
          className="save-btn"
          onClick={onClick}
          style={date === today ? { display: "flex" } : { display: "none" }}
        >
          SAVE
        </div>
      </div>

      <div className="field">
        {notesList.length > 0
          ? notesList.map((note) => {
              if (date === note.date) {
                return (
                  <NoteItem
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

  .all-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 80%;
    height: 10%;
  }

  .save-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20%;
    height: 50%;

    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);

    cursor: pointer;
    border-radius: var(--border-radius);
    background-color: var(--sidebar-color);
  }
  .buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 80%;

    color: var(--text-color);
    opacity: 0.5;
  }

  .field {
    height: 90%;
    width: 100%;
  }

  .date {
    height: 5%;

    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;
    opacity: 0.5;

    padding: 0 2rem 0 2rem;
  }

  .content {
    height: 100%;
    width: 100%;

    color: var(--text-color);
    font-family: "Nunito", sans-serif;
    font-weight: lighter;

    padding: 1rem 2rem 1rem 2rem;
  }
`;
