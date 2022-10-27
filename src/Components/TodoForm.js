import React, { useState, useRef } from 'react' // useRefで、inputで入力した値を簡単に取得できる
import List from './List';
import { v4 as uuidv4 } from 'uuid'; // uuid ==>> ランダムな文字列がidとして割り当てられる
import Btn from './Btn';
import Form from './Form';

const TodoForm = () => {
  const [todos, setTodos] = useState([]) // 初期値をオブジェクトとして管理

  const todoNameRef = useRef();

  const handleAddTodo = () => { // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => { // useStateのtodosの状態を変更
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }]; // 追加する前のtodo=prevTodosリストに、第２引数のオブジェクトを追加するというスプレッド構文
    });
    todoNameRef.current.value = null; // inputに入力されている文字を空にする
  }

  // チェックボックスを押して発火した時に呼ぶ関数
  const toggleTodo = (id) => {
    const newTodos = [...todos]; // todosリストをコピー(前の状態のリストをいじらないようにする)
    const todo = newTodos.find((todo) => todo.id === id); // mapと似ている(配列の要素を１つずつ見ていくイメージ)
    todo.completed = !todo.completed; // チェックボックスを反転
    setTodos(newTodos);
  }

  // 削除ボタンを押して発火した時に呼ぶ関数
  const deleteTodo = (id) => {
    let newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id); // 削除ボタンを押した行のtodo
    // 削除ボタンを押した行のtodoを削除
    newTodos = newTodos.filter((todo) => (todo.id !== id))
    setTodos(newTodos);
  }

  return (
    <>
      <Form 
        type='text' 
        ref={todoNameRef} 
      />
      <Btn 
        name={"追加"} 
        clickFunc={handleAddTodo} 
      />
      <List 
        contents={todos}
        toggleContent={toggleTodo} 
        deleteContent={deleteTodo} 
      />
      <div>残りのタスク: {todos.filter((todo) => !todo.completed).length}</div> {/* filter関数でfalseのみを絞り込み */}
    </>
  );
}
export default TodoForm;




//------------------------ここから下は無視していただいて------------------------

  // 勉強用メモ
  // 配列listに要素を追加する関数
  // const listUp = () => {
  //   const newList = [...list, text+" "];
  //   setText("");
  //   setList(newList);
  // };