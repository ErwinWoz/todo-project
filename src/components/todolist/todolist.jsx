import { useState } from "react";
import style from "./todolist.module.scss";
import { ListItemForm } from "../listItemForm";

export function ToDoList({ useListItemContext }) {
  const { listItems, deleteItem, editItem } = useListItemContext();

  // useState returns an array containing...
  // - the state variable
  // - the setter function
  const [isShowingCompleted, setIsShowingCompleted] = useState(false);

  const itemsPerPage = 5;
  const [pageCount, setPageCount] = useState(1);

  return (
    <div
      className={
        style.todolist +
        " " +
        (isShowingCompleted ? style.isShowingCompleted : "")
      }
    >
      <h2>Items:</h2>
      <section>
        {listItems.slice(0).reverse().map( //reverse list order using slice() and reverse()
          (item) =>
            !item.completed && (
              <ListItemForm
                key={item.id}
                item={item}
                useListItemContext={useListItemContext}
              />
            )
        )}
      </section>
      <button
        onClick={() => {
          setIsShowingCompleted(!isShowingCompleted);
        }}
      >
        Show/Hide Completed
      </button>
      {isShowingCompleted && (
        <>
          <section className={style.completedTasks}>
            {listItems
              // NOTE: YOU return false to exclude an item from the new array
              // Filter out the incomplete items...
              .filter((item) => item.completed)
              // Slice off the ones after this page...
              .slice(0, itemsPerPage * pageCount)
              // Replace the items with form components...
              .map((item) => (
                <ListItemForm
                  key={item.id}
                  item={item}
                  useListItemContext={useListItemContext}
                />
              ))}
          </section>
          {listItems.filter((item) => item.completed).length > itemsPerPage && (
            <button
              onClick={() => {
                setPageCount(pageCount + 1);
              }}
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
}
