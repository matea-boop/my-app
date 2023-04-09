import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export const FileForm = ({ type, file, isFileModalOpen, fileModalClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const date = moment().format("DD/MM/YYYY");
  const url = "http://localhost:3001/api/files";
  const formRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (formRef.current === null || formRef.current === undefined) {
        return;
      }
      if (formRef.current.contains(event.target)) {
        return;
      }

      fileModalClose();
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    if (type === "edit" && file) {
      setTitle(file.title);
      setContent(file.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [type, isFileModalOpen]);

  const putDataToDB = async () => {
    const newData = {
      id: uuid(),
      title: title,
      date: date,
      content: content,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      return;
    }
    if (title && type === "add") {
      putDataToDB();
      fileModalClose();
    }
    if (type === "edit") {
      if (file.title !== title) {
        await axios.patch(`http://localhost:3001/api/files/${file._id}`, {
          title: title,
        });
      } else if (file.content !== content) {
        await axios.patch(`http://localhost:3001/api/files/${file._id}`, {
          content: content,
        });
      } else {
        return;
      }
    }
  };

  return (
    <Wrapper>
      {isFileModalOpen ? (
        <div className={type === "add" ? "form" : "form-edit"}>
          <form
            ref={type === "add" ? formRef : null}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-title">
              <input
                type="text"
                maxLength="13"
                placeholder="File title"
                value={title}
                id="title"
                name="title"
                className="title-input"
                onChange={(e) =>
                  setTitle(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
              />
              <button className="submit-button" type="submit">
                {type === "add" ? "Add" : "Edit"}
              </button>
            </div>
            <div className="content">
              <textarea
                type="text"
                placeholder="Write file content..."
                value={content}
                id="content"
                name="content"
                className="content-input"
                onChange={(e) =>
                  setContent(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
              ></textarea>
            </div>
          </form>
        </div>
      ) : null}
    </Wrapper>
  );
};
export default FileForm;
const Wrapper = styled.div`
  z-index: 15;
  height: 100%;

  form {
    display: grid;
    grid-template-rows: 3rem auto;
    grid-gap: 0.5rem;

    box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);
    border-radius: var(--border-radius);

    height: 100%;
  }

  .form-edit {
    z-index: 15;
    position: absolute;

    height: 42%;
    top: 56%;
    bottom: 0;
    left: 0;
    right: 0;

    background: var(--inactive-file-color);
    border-radius: var(--border-radius);

    margin: 0 2rem 1rem 2rem;
  }

  .form {
    grid-template-columns: 1fr;
    z-index: 15;
    position: absolute;

    height: 40%;
    top: 8%;
    bottom: 0;
    left: 0;
    right: 0;

    background: var(--box-color);
    border-radius: var(--border-radius);

    margin: 0.3rem 2rem 1rem 2rem;
  }

  .title-input {
    font-size: var(--text-size);
    color: var(--text-color);

    width: 80%;
    height: 2rem;

    border: none;
    outline: none;
    border-radius: var(--border-radius);
    font-family: "Nunito", sans-serif;
    background-color: var(--sidebar-color);

    margin: 0.5rem;
    padding: 1rem;
  }

  .content {
    margin: 0 0.5rem 0.5rem 0.5rem;
    .content-input {
      disply: flex;
      text-align: top;
      font-size: var(--text-size);
      color: var(--text-color);

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

      height: 100%;
      width: 100%;

      resize: none;
      border: none;
      outline: none;
      border-radius: var(--border-radius);
      font-family: "Nunito", sans-serif;
      font-weight: lighter;
      background: none;

      padding: 1rem;
    }
  }

  .form-title {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
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
    box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);

    margin: 0.5rem;
    padding: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .submit-button:active {
    transform: scale(0.9);
    box-shadow: 0px 0px 2px -4px rgba(0, 0, 0, 1);
  }
`;
