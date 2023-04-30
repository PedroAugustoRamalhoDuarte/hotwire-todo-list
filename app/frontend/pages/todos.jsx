import React, {useState} from "react";


const Todos = ({todosData}) => {
  const [todos, setTodos] = useState(todosData.map((todo) => {
    return {
      ...todo,
      editing: false
    }
  }));


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
    setTodos(todos.filter((todo) => todo.id !== todoId))
  }

  return (
    <div className="container px-4 mx-auto pt-26">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">
          Minha lista de tarefas
        </h1>
      </div>
      {todos.map((todo) => {
        if (todo.editing) {
          return (
            <form>
              <div className="mb-4">
                <input placeholder="Nome da tarefa"
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