import { useListItemContext } from "../../contexts/list-item-context";
import style from "./todolist.module.scss";

export function ToDoList() {
  const {
    listItems,
    deleteItem,
    editItem,
    listEditing,
    setListEditing,
    setEditingText,
  } = useListItemContext();

  const handleRemove = (id) => {
    deleteItem(id);
  };

  const handleEdit = (id) => {
    editItem(id);
  };

  return (
    <div className={style.todolist}>
      <h2>Items:</h2>
      <hr></hr>

      {listItems.map((item, id) => {
        return (
          <div key={item.id}>
            <div className={style.item}>
              <ul>
                <li>{item.text}</li>
              </ul>
            </div>
            {item.id === listEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{null}</div>
            )}
            {item.text !== "" ? (
              <div>
                {item.id === listEditing ? (
                  <button onClick={() => handleEdit(item.id)}>Update</button>
                ) : (
                  <button onClick={() => setListEditing(item.id)}>Edit</button>
                )}
                <button onClick={() => handleRemove(item.id)}>Delete</button>
              </div>
            ) : null}
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}
