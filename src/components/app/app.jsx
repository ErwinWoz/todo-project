import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Form } from "../form";
import { ToDoList } from "../todolist";
import style from "./app.module.scss";
import {
  TodoistItemProvider,
  useListItemContext,
} from "../../contexts/todoist-context";
import { Authbutton } from "../authbutton";
import { Signoutbutton } from "../signoutbutton";

export function App(props) {
  const [inputText, setInputText] = useState("");

  return (
    <div className={style.container}>
      <Routes>
        <Route path="/" element={<Authbutton />} />
        <Route
          path="/list"
          element={
            <div>
              {!localStorage.getItem("accessToken") && (
                <Navigate to="/" replace={true} />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <h1>To Do List</h1>
                <span style={{ flex: "1 1 auto" }}></span>
                <Signoutbutton />
              </div>
              <TodoistItemProvider>
                <Form
                  useListItemContext={useListItemContext}
                  inputText={inputText}
                  setInputText={setInputText}
                  //children={[<h1>Add an Item</h1>]}
                >
                  {/* NOTE: This automatically passes a prop called "children" to <Form> */}
                  {/* <h1>Add an Item</h1> */}
                </Form>
                <ToDoList useListItemContext={useListItemContext} />
              </TodoistItemProvider>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
