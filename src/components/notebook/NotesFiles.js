import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import FileList from "./Files/fileList";
import axios from "axios";
import moment from "moment/moment";
import FilePagination from "./Files/filePagination";
import { useAllContext } from "../../context/indexContext";
import FileForm from "./Files/fileForm";

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
  const {
    isFileDeleted,
    isFileModalOpen,
    fileModalOpen,
    fileModalClose,
  } = useAllContext();
  const [fileList, setFileList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);

  useEffect(() => {
    getFileDataFromDB().then((res) => setFileList(res));
  }, [isFileDeleted, isFileModalOpen, fileList]);

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };

  return (
    <Wrapper>
      <div className="header-line">
        <div className="header">Files</div>
        <button className="add-btn" onClick={() => fileModalOpen()}>
          Add new
        </button>
      </div>

      <div className="file-list">
        <FileList
          fileList={fileList}
          page={page}
          setTotalPages={setTotalPages}
        />
      </div>
      <div style={isFileModalOpen ? { display: "block" } : { display: "none" }}>
        <FileForm
          type="add"
          isFileModalOpen={isFileModalOpen}
          fileModalOpen={fileModalOpen}
          fileModalClose={fileModalClose}
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

  .add-btn {
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
    witdh: 100%;
  }

  .pag-container {
    position: relative;
    display: block;

    height: 8%;
    width: 100%;

    margin-top: 1rem;
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