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
import NoteItem from "./noteItem";

export const NoteField = ({ date, notesList, noteIndex }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const url = "http://localhost:3001/api/notes";

  const putDataToDB = async () => {
    const newData = {
      date: date,
      content: text,
      numberOfStrings: wordCount,
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

  console.log(notesList);
  console.log(noteIndex);
  // useEffect(() => {

  //   putDataToDB();
  // }, []);

  // useEffect(() => {
  //   const updateText = async () => {
  //     await axios.patch(`http://localhost:3001/api/tasks/${noteID}`, {
  //       content: text,
  //     });
  //   };
  //   updateText();
  // }, [text]);

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
        <div className="save-btn" onClick={onClick}>
          SAVE
        </div>
      </div>

      <div className="field">
        {notesList.length > 0
          ? notesList.map((note) => {
              console.log(note.content);
              return <NoteItem note={note} dateClicked={date} />;
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

  .text-field {
    height: 100%;
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
    font-family: "Nunito", sans-serif;
    font-weight: lighter;

    background-color: var(--box-color);
    border-radius: 0 0 var(--border-radius) var(--border-radius);

    padding: 1rem 2rem 1rem 2rem;
  }
`;
