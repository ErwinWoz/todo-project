import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const TodoistItemContext = createContext(null);

export const useListItemContext = () => {
  return useContext(TodoistItemContext);
};

// Provider Component
export const TodoistItemProvider = ({ children }) => {
  const [listItems, setListItems] = useState([]);

  //get token from local storage
  const accessToken = localStorage.getItem("accessToken");
  const tokenType = localStorage.getItem("tokenType");

  // declare async data fetching function
  const getItems = async () => {
    try {
      //get response from api
      const response = await fetch("https://api.todoist.com/rest/v1/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
      });
      // convert data to json
      const items = await response.json();

      //completed tasks
      const responseCompleted = await fetch(
        "https://api.todoist.com/sync/v8/completed/get_all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${accessToken}`,
          },
        }
      );

      const completedData = await responseCompleted.json();

      // set satte with result
      setListItems([
        ...items,
        ...completedData.items.map((item) => {
          // const copy = { ...item };
          // copy.completed = true;
          return { ...item, completed: true, id: item.task_id };
        }),
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // call the function
    getItems();
  }, []);

  const addItem = async (item) => {
    try {
      await fetch("https://api.todoist.com/rest/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
        body: JSON.stringify({ content: item.text }),
      });

      // GOOD: Re-read all items
      await getItems();

      // // BAD: Manually synchronize local state with remote state
      // const item = await response.json();
      // setTodoistItems((oldItems) => {
      //   return [...oldItems, item];
      // });
    } catch (e) {
      console.error(e);
    }
  };

  const editItem = async (id, content) => {
    try {
      await fetch(`https://api.todoist.com/rest/v1/tasks/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
        body: JSON.stringify({ content: content }),
      });

      await getItems();
    } catch (e) {
      console.error(e);
    }
  };

  const completeItem = async (id) => {
    try {
      await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      await getItems();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = async (item) => {
    try {
      await fetch(`https://api.todoist.com/rest/v1/tasks/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      await getItems();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TodoistItemContext.Provider
      value={{
        // NOTE: These will be returned from useContext(ListItemContext)
        listItems,
        setListItems,
        addItem,
        deleteItem,
        editItem,
        completeItem,
      }}
    >
      {children}
    </TodoistItemContext.Provider>
  );
};
