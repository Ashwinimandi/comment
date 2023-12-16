import { useState, useEffect } from "react";

import { editNode, deleteNode, addNode } from "./useFunction";
import Comments from "./components/comment";

function App() {
  // Retrieve comments from local storage on initial load
  const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
  // const storedComments = {
  //   id: 1,
  //   items: [],
  // };

  const [comments, setComments] = useState(storedComments);
  const { addComment } = addNode();

  // Update local storage whenever comments change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddcomments = (commentId, comment) => {
    const updatedTree = addComment({ ...comments }, commentId, comment);
    setComments(updatedTree);
  };

  const handleEditcomments = (commentId, value) => {
    const editedComment = editNode(comments, commentId, value);
    setComments(editedComment);
  };

  const handleDeletecomments = (commentId) => {
    const updatedTree = deleteNode(comments, commentId);
    setComments(updatedTree);
  };

  return (
    <div className="App">
      <Comments
        key={comments.length > 0 ? comments[0].id : 1}
        comments={comments}
        handleAddcomments={handleAddcomments}
        handleEditcomments={handleEditcomments}
        handleDeletecomments={handleDeletecomments}
      />
    </div>
  );
}

export default App;
