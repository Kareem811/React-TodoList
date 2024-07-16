"use client";
import React, { useEffect, useState } from 'react';
import { fetchData, addData, updateData, deleteData } from '../app/Api';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);
  
    useEffect(() => {
      const loadTodos = async () => {
        const data = await fetchData();
        setTodos(data);
      };
  
      loadTodos();
    }, []);
  
    const handleAdd = async () => {
      if (editId) {
        await updateData(editId, { title, description }, file);
      } else {
        await addData({ title, description }, file);
      }
      setTitle('');
      setDescription('');
      setFile(null);
      setEditId(null);
      const data = await fetchData();
      setTodos(data);
    };
  
    const handleEdit = (todo) => {
      setTitle(todo.title);
      setDescription(todo.description);
      setFile(null);
      setEditId(todo.id);
    };
  
    const handleDelete = async (id) => {
      await deleteData(id);
      const data = await fetchData();
      setTodos(data);
    };
  
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{editId ? 'Edit Todo' : 'Add Todo'}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              {editId ? 'Update Todo' : 'Add Todo'}
            </button>
          </div>
        </div>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
              <p className="mb-2">{todo.description}</p>
              {todo.file && (
                <a
                  href={`http://localhost:8000/storage/${todo.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mb-4 inline-block"
                >
                  View File
                </a>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TodoList;