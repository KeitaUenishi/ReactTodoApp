import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./Components/InputTodo";
import { InCompleteTodos } from "./Components/InCompleteTodos";
import { CompleteTodos } from "./Components/CompleteTodos";

export const App = () => {
  // 入力したTODOのState
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOのState
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了のTODOのState
  const [completeTodos, setCompleteTodos] = useState([]);

  // inputに入力される度に、ステートの値を変更する関数
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンクリック時の処理
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタンクリック時の関数
  const onClickDelete = (index) => {
    // スプレッド関数でincompleteTodosの内容をnewTodosにコピー
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタンクリック時の関数
  const onClickComplete = (index) => {
    // スプレッド関数でincompleteTodosの内容をnewIncompleteTodosにコピー
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo５個まで！</p>
      )}
      <InCompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
