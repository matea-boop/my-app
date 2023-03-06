import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import FileList from "./NoteFiles/fileList";
import axios from "axios";
import moment from "moment/moment";

import FilePagination from "./NoteFiles/filePagination";
import { useAllContext } from "../../context/indexContext";
import FileForm from "./NoteFiles/fileForm";

async function getFileDataFromDB() {
  const url = "http://localhost:3001/api/files";

  try {
    const {
      data: { files },
    } = await axios.get(url);

    return files;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const NoteFiles = () => {
  const { isFileDeleted } = useAllContext();
  const [fileList, setFileList] = useState([]);
  const [editFile, setEditFile] = useState();
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);
  const fileRef = useRef();
  const buttonRef = useRef();

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };

  useEffect(() => {
    getFileDataFromDB().then((res) => setFileList(res));
  }, [isFileDeleted, formOpen, isFileOpen]);

  // useEffect(() => {
  //   let handler = (event) => {
  //     if (!buttonRef.current.contains(event.target)) {
  //       setFormOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, []);

  const getOpenedFile = (value) => {
    setEditFile(value);
    // setIsFileOpen(true);
  };

  return (
    <Wrapper>
      <div className="header-line">
        <div className="header">Files</div>
        <button
          ref={buttonRef}
          className="open-form"
          onClick={() => setFormOpen(!formOpen)}
        >
          Add new
        </button>
      </div>
      <div
        className="form"
        ref={fileRef}
        style={
          formOpen ? { display: "grid", zIndex: "10" } : { display: "none" }
        }
      >
        <FileForm
          type={formOpen ? "add" : ""}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          isFileOpen={isFileOpen}
          setIsFileOpen={setIsFileOpen}
        />
      </div>
      <div className="file-list">
        <FileList
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          isFileOpen={isFileOpen}
          setIsFileOpen={setIsFileOpen}
          fileList={fileList}
          page={page}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>

      <div className="pag-container">
        <div className="pagination">
          <FilePagination
            fileList={fileList}
            totalPages={totalPages}
            handleClick={handleClick}
            pageActive={pageActive}
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default NoteFiles;
const Wrapper = styled.div`
  position: relative;

  height: 100%;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);

  .header-line {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 8%;
  }

  .header {
    text-align: center;
    flex: 1 0 auto;

    color: var(--text-color);
    font-size: 1.2rem;
  }

  .open-form {
    position: absolute;

    top: 0;
    right: 0;
    height: 8%;

    border: none;

    color: var(--text-color);
    font-family: "Nunito", sans-serif;
    font-size: var(--text-size);
    font-weight: lighter;
    opacity: 0.5;
    background: none;
    cursor: pointer;

    margin-right: 2rem;

    &:hover {
      opacity: 1;
    }
  }

  .file-list {
    height: 40%;
    width: 100%;
  }

  .form-title {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
  }

  .content {
    display: grid;
    height: auto;
    width: auto;

    .content-input {
      text-align: top;
      font-size: var(--text-size);
      color: var(--text-color);

      resize: none;
      border: none;
      outline: none;
      border-radius: var(--border-radius);
      font-family: "Nunito", sans-serif;
      font-weight: lighter;
      background-color: var(--body-color);

      margin: 0 0.5rem 0.5rem 0.5rem;
      padding: 1rem;
    }
  }

  .form {
    grid-template-columns: 1fr;

    position: absolute;

    height: 40%;
    top: 8%;
    bottom: 0;
    left: 0;
    right: 0;

    background: var(--box-color);
    border-radius: var(--border-radius);

    margin: 0.3rem 2rem 1rem 2rem;

    .title-input {
      font-size: var(--text-size);
      color: var(--text-color);

      width: 80%;
      height: 2rem;

      border: none;
      outline: none;
      border-radius: var(--border-radius);
      font-family: "Nunito", sans-serif;
      background-color: var(--body-color);

      margin: 0.5rem;
      padding: 1rem;
    }

    .submit-button {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      width: 20%;
      height: 2rem;

      border: none;
      outline: none;
      color: var(--text-color);
      font-family: "Nunito", sans-serif;
      font-size: var(--text-size);
      font-weight: lighter;
      border-radius: var(--border-radius);
      background-color: var(--sidebar-color);

      margin: 0.5rem;
      padding: 1rem;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .pag-container {
    position: relative;
    display: block;
    margin-top: 1rem;
    width: 100%;
  }
  .pagination {
    position: absolute;

    width: fit-content;

    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;
