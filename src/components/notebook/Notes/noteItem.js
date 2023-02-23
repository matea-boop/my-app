import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment/moment";
import axios from "axios";

export const NoteItem = ({
  note,
  date,
  getNumberOfWords,
  getText,
  text,
  wordCount,
  notesList,
}) => {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const headerDate = moment(date, "DD/MM/YYYY").format("dddd, Do MMMM YYYY");
  const url = "http://localhost:3001/api/notes";

  // useEffect(() => {

  //   const updateText = async () => {
  //     await axios.patch(`http://localhost:3001/api/tasks/${note._id}`, {
  //       content: text,
  //     });
  //   };
  //   if(note.date === today){
  //     updateText();
  //   }

  // }, [text]);
  console.log(text);
  return (
    <Wrapper>
      {date === today ? (
        <div>
          <div className="date">{headerDate}</div>
          <textarea
            id="text-field"
            className="text-field"
            name="text-field"
            rows="4"
            columns="50"
            value={note.date === today ? note.content : text}
            onChange={(e) => {
              getText(e.target.value);
              getNumberOfWords(
                e.target.value.replace(/^\s+|\s+$/g, "").split(/\s+/).length
              );
            }}
          ></textarea>
        </div>
      ) : null}
      {}
      {date === note.date ? (
        <div>
          <div className="date">{headerDate}</div>
          <div className="content">
            <div>{note.content}</div>
          </div>
        </div>
      ) : null}
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
