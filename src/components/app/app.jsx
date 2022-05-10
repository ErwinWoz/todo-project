import { useState } from "react";
import { Form } from "../form";
import { ToDoList } from "../todolist";
import style from "./app.module.scss";
import { ListItemProvider } from "../../contexts/list-item-context";

export function App() {
  const [inputText, setInputText] = useState("");

  return (
    <div className={style.container}>
      <h1>To Do List:</h1>
      <ListItemProvider>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          //children={[<h1>Add an Item</h1>]}
        >
          {/* NOTE: This automatically passes a prop called "children" to <Form> */}
          {/* <h1>Add an Item</h1> */}
        </Form>
        <ToDoList />
      </ListItemProvider>
    </div>
  );
}
