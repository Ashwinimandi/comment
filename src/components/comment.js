// Comments.js

import React, { useState, useRef, useEffect } from "react";
import "./comment.css";

const Comments = ({
  comments,
  handleAddcomments,
  handleEditcomments,
  handleDeletecomments,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState({
    name: "",
    cmnt: "",
  });
  const inputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  const handleAdd = () => {
    if (editMode) {
      handleEditcomments(comments.id, inputRef?.current?.innerText);
    } else {
      let newComments = {
        id: Date.now(),
        cmnt: input.cmnt,
        name: input.name,
        items: [],
      };
      handleAddcomments(comments.id, newComments);
      setInput({ name: "", cmnt: "" });
      setShowInput(false);
    }
    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeletecomments(comments.id);
  };
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  return (
    <div>
      <div
        className={`comment-container ${
          comments.id !== 1 ? "reply-container" : ""
        }`}
      >
        {comments.id === 1 ? (
          <>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              placeholder="Name"
              className="input"
            />
            <br />
            <input
              type="text"
              value={input.cmnt}
              name="cmnt"
              onChange={(e) => setInput({ ...input, cmnt: e.target.value })}
              placeholder="Comment"
              className="input"
            />
            <br />
            <button onClick={handleAdd} className="button">
              Post
            </button>
          </>
        ) : (
          <div>
            <div>
              <span>{comments.name}</span>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
              >
                {comments.cmnt}
              </span>
            </div>
            {showInput && (
              <>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={input.cmnt}
                    onChange={(e) =>
                      setInput({ ...input, cmnt: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            {showInput ? (
              <div>
                <button onClick={handleAdd} className="reply">
                  Reply
                </button>
                <button onClick={() => setShowInput(false)} className="reply">
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowInput(true)} className="reply">
                  Reply
                </button>
                <button onClick={handleDelete}>Delete</button>
                <button
                  onClick={() => {
                    setEditMode(true);
                  }}
                  className="reply"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ paddingLeft: "25px" }}>
        {comments?.items?.map((ele) => (
          <Comments
            key={ele.id}
            comments={ele}
            handleAddcomments={handleAddcomments}
            handleEditcomments={handleEditcomments}
            handleDeletecomments={handleDeletecomments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
