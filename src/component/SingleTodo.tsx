import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import "./styles.css";

const SingleTodo: React.FC<{
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [todoPageList, setTodoPageList] = useState<Todo[]>(todos);
  const [editTodo, setEditTodo] = useState<string>(todo.name);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title: 'React POST Request Example' })
    // };
    // fetch('https://reqres.in/api/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With,Content-Type,Cache-Control,access_token",
      },
      
      body: JSON.stringify({
        name: editTodo,
        avatar: todo.avatar,
        id: todo.id,
      }),
    };
    fetch(
      `https://63220eac362b0d4e7dc7c9db.mockapi.io/api/v1/todos/${id}`,
      requestOptions
    ).then((response) => {
      // response.json();
      setEdit(false);
      console.log(todos);
      setTodoPageList(
        todoPageList.map((todo) =>
          todo.id === id ? { ...todo, name: editTodo } : todo
        )
      );
      console.log(response);
    });
    // .then(data => setState({ postId: data.id }));
  };

  const handleDelete = (id: number) => {
    setTodos(todoPageList.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todoPageList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{editTodo}</s>
      ) : (
        <span className="todos__single--text">{editTodo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <div className="photo">
            <img src={todo.avatar} alt="React Image" />
          </div>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
