import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FileItem from "./fileItem";
import FileForm from "./fileForm";

const colors = [{ orange: "background-color: rgba(236, 165, 66, 0.5);" }];

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
              onClick={() => setClicked(file._id)}
              id={file._id === clicked ? "active" : "inactive"}
            >
              <FileItem file={file} fileList={fileList} clicked={clicked} />
            </div>
          );
        })
      ) : (
        <div className="no-files">No files</div>
      )}
    </Wrapper>
  );
};
export default FileList;
const Wrapper = styled.div`
  // position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  z-index: 1;

  gap: 0.5rem;
  margin: 0.3rem 2rem 1rem 2rem;

  #inactive {
    background: var(--box-color);
    border-radius: var(--border-radius);
  }

  #active {
    border-radius: var(--border-radius);

    :nth-child(1) {
      background: rgba(236, 165, 66, 0.2);

      .icon {
        opacity: 1;
        color: var(--mainorange-color);
      }
    }

    :nth-child(2) {
      background: rgba(64, 94, 255, 0.2);

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
      background: rgba(55, 142, 74, 0.2);

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
      background: rgba(235, 85, 112, 0.2);

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
