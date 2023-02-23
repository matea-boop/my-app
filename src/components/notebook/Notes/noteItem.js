import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment/moment";
import axios from "axios";

export const NoteItem = ({ note, dateClicked }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const today = moment(new Date()).format("DD/MM/YYYY");

  const date = moment(dateClicked, "DD/MM/YYYY").format("dddd Do MMMM");
  //   const url = "http://localhost:3001/api/notes";

  //   const putDataToDB = async () => {
  //     const newData = {
  //       date: date,
  //       content: text,
  //       numberOfStrings: wordCount,
  //     };

  //     try {
  //       await axios.post(url, newData, {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH",
  //         },
  //       });
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   const onClick = () => {
  //     if (notesList.length > 0) {
  //       notesList.map((note) => {
  //         if (note.date === date) {
  //           return;
  //         } else {
  //           putDataToDB();
  //         }
  //       });
  //     } else {
  //       console.log("jes");
  //       putDataToDB();
  //     }
  //   };

  //   console.log(notesList);
  //   console.log(noteIndex);
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
      <div className="date">{date}</div>

      {dateClicked === today ? (
        <textarea
          id="text-field"
          className="text-field"
          name="text-field"
          rows="4"
          columns="50"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setWordCount(
              e.target.value.replace(/^\s+|\s+$/g, "").split(/\s+/).length
            );
          }}
        >
          {note.date === today ? <div>{note.content}</div> : null}
        </textarea>
      ) : (
        <div className="content">
          {dateClicked !== note.date ? (
            <div>nema teksta taj dan</div>
          ) : (
            <div>{note.content}</div>
          )}
        </div>
      )}
    </Wrapper>
  );
};
export default NoteItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: left;

  height: 100%;
  width: 100%;

  border-radius: var(--border-radius);

  .text-field {
    height: 95%;
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
