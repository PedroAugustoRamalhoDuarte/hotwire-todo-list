import React, {useEffect, useState} from "react";
import {router} from '@inertiajs/react'

const Todos = ({todosData}) => {
  const [todos, setTodos] = useState(todosData.map((todo) => {
    return {
      ...todo,
      editing: false
    }
  }));
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTodoName, setNewTodoName] = useState('');

  useEffect(() => {
    setTodos(todosData.map((todo) => {
      return {
        ...todo,
        editing: false
      }
    }));
  }, [todosData])


  const createTodo = (e) => {
    e.preventDefault();
    router.post('/inertia/todos', {
      name: newTodoName,
    })
    // setNewTodoName('');
    // setShowNewForm(false);
  }

  const editTodo = (todo, e) => {
    e.preventDefault();
    router.patch(`/inertia/todos/${todo.id}`, {
      name: todo.name,
    })
  }
  const toggleEditing = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          editing: !todo.editing
        }
      } else {
        return todo;
      }
    }))
  }

  const removeTodo = (todoId) => {
    router.delete(`/inertia/todos/${todoId}`)
  }

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Minha lista de tarefas
        </h1>
        <button className="border-2 border-handwrite border-black p-2 mt-5"
                onClick={() => setShowNewForm(true)}>
          Adicionar nova tarefa
        </button>
      </div>

      {
        showNewForm && (
          <form onSubmit={(e) => createTodo(e)}>
            <div className="mb-4">
              <input
                type="text"
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                placeholder="Nome da tarefa"
                className="form-input mt-1 block w-full border-2 border-handwrite border-black p-2"/>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="border-2 border-handwrite border-black p-2"
                type="submit">
                Enviar
              </button>
              <button className="border-2 border-handwrite border-black p-2"
                      onClick={() => setShowNewForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )
      }
      {todos.map((todo) => {
        if (todo.editing) {
          return (
            <form onSubmit={(e) => editTodo(todo, e)}>
              <div className="mb-4">
                <input
                  type="text"
                  value={todo.name}
                  onChange={(e) => setTodos((todos) => todos.map((todoEdit) => {
                    if (todoEdit.id === todo.id) {
                      return {
                        ...todoEdit,
                        name: e.target.value
                      }
                    } else {
                      return todoEdit;
                    }
                  }))}
                  placeholder="Nome da tarefa"
                  className="form-input mt-1 block w-full border-2 border-handwrite border-black p-2"/>
              </div>
              <div className="flex items-center justify-between">
                <button className="border-2 border-handwrite border-black p-2" onClick="submit">
                  Enviar
                </button>
                <button className="border-2 border-handwrite border-black p-2"
                        onClick={() => toggleEditing(todo.id)}>
                  Cancelar
                </button>
              </div>
            </form>
          )
        } else {
          return (
            <div className="flex justify-between border-2 border-handwrite border-black mt-5 p-3">
              {todo.name}
              <div className="flex gap-2">
                <button className="border-2 border-handwrite border-black p-2"
                        onClick={() => toggleEditing(todo.id)}>
                  Editar
                </button>
                <button className="border-2 border-handwrite border-black p-2"
                        onClick={() => removeTodo(todo.id)}>
                  Remover
                </button>
              </div>
            </div>
          )
        }
      })}
    </div>
  );
}

export default Todos;