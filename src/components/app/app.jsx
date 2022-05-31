import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  TodoistItemProvider,
  useListItemContext
} from "../../contexts/todoist-context";
import { Authbutton } from "../authbutton";
import { Form } from "../form";
import { Signoutbutton } from "../signoutbutton";
import { ToDoList } from "../todolist";
import style from "./app.module.scss";


export function App({ theme }) {
  const [inputText, setInputText] = useState("");

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className={style.container + " " + theme.main}>
          <Routes>
            <Route path="/" element={<Authbutton />} />
            <Route
              path="/list"
              element={
                <div>
                  {!localStorage.getItem("accessToken") && (
                    <Navigate to="/" replace={true} />
                  )}
                  <header
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <h1>To Do List</h1>
                    <span style={{ flex: "1 1 auto" }}></span>
                    <Signoutbutton />
                  </header>
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
      </BrowserRouter>
    </React.StrictMode>
  );
}
