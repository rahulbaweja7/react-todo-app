import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./component/InputField";
import TodoList from "./component/Todolist";
import { Todo } from "./model";
import axios from "axios";
import Pagination from "./component/Pagination";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [error, setError] = useState({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        { id: Date.now(), name: todo, isDone: false, avatar: "" },
      ]);
      setTodo("");
    }
  };
  console.log(todos);

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get('https://63220eac362b0d4e7dc7c9db.mockapi.io/api/v1/todos?skip=${skip}&limit=10');
      const res = await axios.get(
        "https://63220eac362b0d4e7dc7c9db.mockapi.io/api/v1/todos"
      );
      setTodos(res.data);
    };
    console.log("RERENDERING");
    const delay = 1000; // Adjust this delay as needed
    const timer = setTimeout(fetchPosts, delay);
    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <span className="heading">To Do</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* <TodoList todos={todos.slice(0, skip + 10)} setTodos={setTodos} /> */}
      <TodoList todos={currentPosts} setTodos={setTodos} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={todos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
