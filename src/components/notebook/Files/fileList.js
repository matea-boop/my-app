import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FileItem from "./fileItem";

export const FileList = ({ fileList, page, setTotalPages }) => {
  const filesPerPage = 4;
  const startIndex = (page - 1) * filesPerPage;
  const [clicked, setClicked] = useState();

  const selectedFiles =
    fileList.length > 0
      ? fileList.slice(startIndex, startIndex + filesPerPage)
      : [];

  useEffect(() => {
    setTotalPages(Math.ceil(fileList.length / filesPerPage));
  }, [fileList]);

  const getFirstFile =
    selectedFiles.length > 0 ? selectedFiles.find((file, i) => i === 0) : null;

  const firstFileID = getFirstFile ? getFirstFile._id : null;

  useEffect(() => {
    setClicked(firstFileID);
  }, [firstFileID]);

  return (
    <Wrapper>
      {selectedFiles && selectedFiles.length > 0 ? (
        selectedFiles.map((file) => {
          return (
            <div
              key={file._id}
              className="file-item"
              onClick={() => setClicked(file._id)}
              id={file._id === clicked ? "active" : "inactive"}
            >
              <FileItem file={file} clicked={clicked} />
            </div>
          );
        })
      ) : (
        <div
          className="no-files"
          style={{
            fontSize: " 0.9rem",
            fontWeight: "normal",
            color: "var(--text-color)",
          }}
        >
          No files
        </div>
      )}
    </Wrapper>
  );
};
export default FileList;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  z-index: 1;

  gap: 0.5rem;
  margin: 0.3rem 2rem 1rem 2rem;

  .file-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #inactive {
    background: var(--inactive-file-color);
    border-radius: var(--border-radius);
  }

  #active {
    border-radius: var(--border-radius);

    :nth-child(1) {
      background: var(--orange-file-color);

      .icon {
        opacity: 1;
        color: var(--mainorange-color);
      }
    }

    :nth-child(2) {
      background: var(--blue-file-color);

      .icon {
        color: var(--mainblue-color);
        opacity: 1;
      }

      .delete {
        &:hover {
          opacity: 1;
          color: var(--mainblue-color);
        }
      }

      .enter {
        &:hover {
          opacity: 1;
          color: var(--mainblue-color);
        }
      }
    }

    :nth-child(3) {
      background: var(--green-file-color);

      .icon {
        color: var(--maingreen-color);
        opacity: 1;
      }

      .delete {
        &:hover {
          opacity: 1;
          color: var(--maingreen-color);
        }
      }

      .enter {
        &:hover {
          opacity: 1;
          color: var(--maingreen-color);
        }
      }
    }

    :nth-child(4) {
      background: var(--red-file-color);

      .icon {
        color: var(--mainred-color);
        opacity: 1;
      }

      .delete {
        &:hover {
          opacity: 1;
          color: var(--mainred-color);
        }
      }

      .enter {
        &:hover {
          opacity: 1;
          color: var(--mainred-color);
        }
      }
    }
  }

  .no-files {
    position: absolute;

    height: 100%;
    width: 100%;

    color: var(--text-color);
    font-size: var(--text-size);
    font-weight: lighter;

    padding: 1rem;
  }
`;
