export const addNode = () => {
  const addComment = (tree, commentId, newComment) => {
    if (tree.id === commentId) {
      tree.items.push(newComment);
      return tree;
    }

    const updatedItems = tree.items.map((ele) =>
      addComment(ele, commentId, newComment)
    );

    return { ...tree, items: updatedItems };
  };

  return { addComment };
};

export const editNode = (tree, commentId, value) => {
  if (tree.id === commentId) {
    tree.name = value;
    return tree;
  }

  const updatedItems = tree.items.map((ob) => editNode(ob, commentId, value));

  return { ...tree, items: updatedItems };
};

export const deleteNode = (tree, commentId) => {
  const updatedItems = tree.items.filter((ob) => ob.id !== commentId);

  return { ...tree, items: updatedItems };
};
