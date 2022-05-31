import React, { useState } from "react";
import style from "./listItemForm.module.scss";
import { Spinner } from "../spinner";

export function ListItemForm({ item, useListItemContext }) {
  const { deleteItem, editItem, completeItem } = useListItemContext();

  const [mode, setMode] = useState("read");
  const [isLoading, setIsLoading] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);

  const [textValue, setTextValue] = useState(item.content);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          className={
            style.listItem + " " + (item.completed ? style.completed : "")
          }
          onSubmit={async (e) => {
            e.preventDefault();
            if (mode === "edit") {
              setIsLoading(true);
              await editItem(item.id, textValue);
              setIsLoading(false);
              setMode("read");
            }
          }}
        >
          <ul>
            <li>
              {mode === "read" && textValue}

              {mode === "edit" ? (
                <input
                  placeholder={item.content}
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />
              ) : (
                ""
              )}
              {!item.completed ? (
                <div>
                  {mode === "edit" ? (
                    <button>Save</button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setMode("edit");
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      await deleteItem(item);
                      setIsLoading(false);
                    }}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log("in timeout");
                      setIsLoading(true);
                      await completeItem(item.id);
                      setIsLoading(false);
                    }}
                  >
                    Completed
                  </button>
                </div>
              ) : null}
            </li>
          </ul>
        </form>
      )}
    </>
  );
}

