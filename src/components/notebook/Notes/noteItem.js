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
  onClick,
}) => {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const headerDate = moment(note.date, "DD/MM/YYYY").format(
    "dddd, Do MMMM YYYY"
  );

  return (
    <Wrapper>
      {date === note.date && note.date !== today ? (
        <div style={{ height: "100%" }}>
          <div className="percent-date">
            <div className="date">{headerDate}</div>
            <div className="number">
              {note.numberOfWords > 70
                ? 100
                : ((note.numberOfWords / 70) * 100).toFixed()}
              %
            </div>
          </div>

          <div className="content">
            <div>{note.content}</div>
          </div>
        </div>
      ) : null}

      {note.date === today ? (
        <div style={{ height: "100%" }}>
          <div className="top-field">
            <div className="date">
              {moment(today, "DD/MM/YYYY").format("dddd, Do MMMM YYYY")}
            </div>

            <div
              className="save-btn"
              onClick={onClick}
              style={date === today ? { display: "flex" } : { display: "none" }}
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
            defaultValue={note.content}
            onChange={(e) => {
              getText(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
              getNumberOfWords(
                e.target.value.replace(/^\s+|\s+$/g, "").split(/\s+/).length
              );
            }}
          ></textarea>
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

  .percent-date {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 5%;

    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;

    padding-bottom: 1rem;
  }

  .top-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    padding-top: 1.5rem;
  }

  .date {
    width: 80%;
    padding: 0 2rem 0 2rem;
  }

  .number {
    opacity: 0.5;
    padding: 1rem 2rem 0 2rem;
  }

  .date-x {
    height: 5%;

    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;
    opacity: 0.5;

    padding: 0 2rem 0 2rem;
  }

  .content {
    height: 95%;
    width: 100%;

    color: var(--text-color);
    font-family: "Nunito", sans-serif;
    font-weight: lighter;

    padding: 1rem 2rem 1rem 2rem;
  }

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
`;
