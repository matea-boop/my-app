import moment from "moment/moment";
import React from "react";
import styled from "styled-components";
import { BsFileEarmark } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { useAllContext } from "../../../context/indexContext";
import FileForm from "./fileForm";

export const FileItem = ({ file, clicked }) => {
  const { fileDeleted, fileNotDeleted } = useAllContext();
  const divRef = useRef();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const deleteFromDB = async (idToDelete) => {
    fileDeleted();
    try {
      await axios.delete(`http://localhost:3001/api/files/${idToDelete}`);
      fileNotDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    deleteFromDB(file._id);
    toast.success("File deleted!");
  };

  const handleOpenFile = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    setEditModalOpen(true);
  }, [clicked]);

  return (
    <Wrapper ref={divRef}>
      <div className="top-row">
        <div className="icon">
          {" "}
          <BsFileEarmark />
        </div>
        <div className="date">{file.date}</div>
      </div>
      <div className="title">{file.title}</div>
      <div className="enter-arrow">
        <IoTrashOutline className="delete" onClick={handleDelete} />
        <BsArrowRightShort className="enter" onClick={handleOpenFile} />
      </div>

      {clicked === file._id ? (
        <FileForm
          type="edit"
          file={file}
          isFileModalOpen={editModalOpen}
          fileModalClose={setEditModalOpen}
        />
      ) : null}
    </Wrapper>
  );
};
export default FileItem;
const Wrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  // background: var(--box-color);
  border-radius: var(--border-radius);
  box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);

  height: 100%;

  .icon {
    color: var(--text-color);
    font-size: 1.5rem;
    opacity: 0.5;
  }

  .top-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;

    padding: 1rem 1rem 0.7rem 1rem;
  }

  .date {
    font-weight: lighter;
    font-size: var(--text-size);
    color: var(--text-color);
    opacity: 0.5;
  }

  .title {
    font-weight: lighter;
    font-size: 1rem;
    color: var(--text-color);

    padding-left: 1.2rem;
  }

  .enter-arrow {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;

    color: var(--text-color);
    font-size: 1.2rem;

    cursor: pointer;

    padding: 0.7rem 1rem 1rem 1rem;
  }

  .delete {
    font-size: 0.9rem;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      color: var(--mainorange-color);
    }
  }

  .enter {
    opacity: 0.5;
    &:hover {
      opacity: 1;
      color: var(--mainorange-color);
    }
  }
`;
