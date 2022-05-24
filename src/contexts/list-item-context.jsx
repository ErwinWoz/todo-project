import { createContext, useContext, useState, useEffect } from "react";

const ListItemContext = createContext(null);

export const useListItemContext = () => {
  return useContext(ListItemContext);
};

// Provider Component
export const ListItemProvider = ({ children }) => {
  // NOTE: This will give `listItems` the right value on the FIRST RENDER.
  const [listItems, setListItems] = useState(
    JSON.parse(localStorage.getItem("listItems")) || []
  );

  const [listEditing, setListEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // NOTE: This waits one render, THEN sets `listItems` to the right value (causing another render).
  //   useEffect(() => {
  //     const items = JSON.parse(localStorage.getItem("listItems"));
  //     if (items) {
  //       setListItems(items);
  //     }
  //   }, []);

  // useEffect: calls the given function whenever the value of any
  //            of the given "dependencies" changes.
  // NOTE: useEffect ALWAYS calls the function once after the first render.
  useEffect(() => {
    // save list items in local storage
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);              

  const addItem = (item) => {
    // NOTE: Setting states is asynchronous. This means the value of listItems could
    //       change before this update completes. This would be BAD, because we would
    //       lose whatever changes happened.

    // BAD
    // setListItems([...listItems, item]);

    // GOOD
    setListItems((listItems) => {
      return [...listItems, item];
    });
  };

  const deleteItem = (id) => {
    const newlist = listItems.filter((item) => item.id !== id);
    setListItems(newlist);
  };

  const editItem = (id) => {
    const updatedList = listItems.map((item) => {
      if (item.id === id) {
        item.text = editingText;
      }
      return item;
    });
    setListItems(updatedList);
    setListEditing(null);
  };

  return (
    <ListItemContext.Provider
      value={{
        // NOTE: These will be returned from useContext(ListItemContext)
        listItems,
        setListItems,
        addItem,
        deleteItem,
        editItem,
        listEditing,
        setListEditing,
        setEditingText,
      }}
    >
      {children}
    </ListItemContext.Provider>
  );
};
