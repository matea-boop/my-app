import React, { useState } from "react";
import styled from "styled-components";
import NoteField from "./Notes/noteField";
import NotePercentBar from "./Notes/notePercentBar";
import NoteCalendar from "./Notes/noteCalendar";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

async function getDataFromDB() {
  const url = "http://localhost:3001/api/notes";
  try {
    const {
      data: { notes },
    } = await axios.get(url);

    return notes;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const Notes = () => {
  const [date, setDate] = useState("");
  const [notesList, setNotesList] = useState([]);

  const getDate = (value) => {
    setDate(value);
  };

  useEffect(() => {
    getDataFromDB().then((res) => setNotesList(res));
  }, [date]);

  return (
    <Wrapper>
      <div className="header-n">Notes</div>
      <NotePercentBar />
      <NoteCalendar getDate={getDate} />
      <NoteField date={date} notesList={notesList} />
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

  .header-n {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 8%;

    font-size: 1.2rem;
  }
`;
