import { useState } from "react";
import style from "./todolist.module.scss";
import { ListItemForm } from "../listItemForm";

export function ToDoList({ useListItemContext }) {
  const { listItems, deleteItem, editItem } = useListItemContext();

  // useState returns an array containing...
  // - the state variable
  // - the setter function
  const [isShowingCompleted, setIsShowingCompleted] = useState(false);

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
        {listItems.map(
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
        <section className={style.completedTasks}>
          {listItems.map(
            (item) =>
              item.completed && (
                <ListItemForm
                  key={item.id}
                  item={item}
                  useListItemContext={useListItemContext}
                />
              )
          )}
        </section>
      )}
    </div>
  );
}
