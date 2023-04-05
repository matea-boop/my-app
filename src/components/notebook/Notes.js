import React, { useState } from "react";
import styled from "styled-components";
import NoteField from "./Notes/noteField";
import NotePercentBar from "./Notes/notePercentBar";
import NoteCalendar from "./Notes/noteCalendar";
import { useEffect } from "react";
import moment from "moment";
import getNotesDataFromDB from "../../constants/dataFunctions/noteData";

export const Notes = () => {
  const [date, setDate] = useState("");
  const [words, setWords] = useState(0);
  const [notesList, setNotesList] = useState([]);
  const today = moment(new Date()).format("DD/MM/YYYY");

  const getDate = (value) => {
    setDate(value);
  };

  const getWords = (value) => {
    setWords(value);
  };

  useEffect(() => {
    getNotesDataFromDB().then((res) => setNotesList(res));
  }, [date, notesList]);

  useEffect(() => {
    if (notesList.length > 0) {
      for (let i = 0; i < notesList.length; i++) {
        if (notesList[i].date === today) {
          setWords(notesList[i].numberOfWords);
        }
      }
    }
  }, [notesList]);

  return (
    <Wrapper>
      <div className="header-n">Notes</div>
      <NotePercentBar wordCount={words} date={date} />
      <NoteCalendar getDate={getDate} />
      <NoteField date={date} notesList={notesList} getWords={getWords} />
    </Wrapper>
  );
};
export default Notes;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  box-shadow: 0px 0px 26px -20px rgba(0, 0, 0, 1);

  .header-n {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 8%;

    color: var(--text-color);
    font-size: 1.2rem;
  }
`;
