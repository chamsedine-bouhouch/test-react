import { createContext, useCallback, useState } from "react";
import api from "../api";

const TasksContext = createContext()

function Provider({ children }) {
    const [todos, setTodos] = useState([])
    // fetch
    const fetchTodos = useCallback(() => {
        api.get('/todos')
            .then(json => {
                setTodos(json.data)
            })
    }, [])
    // filter 
    const sortTodosByCompleted = async (isCompleted) => {
        try {
            const filtredTodos = await api.get(`/todos/?completed=${isCompleted}`)
            setTodos(filtredTodos.data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
    const createTodo = (title) => {
        api.post('/todos', {
            title,
            completed: false,
            userId: 1
        }).then(response => {
            alert(JSON.stringify(response.data), 'Added')
            fetchTodos()
        })
    }
    // update
    const updateTodo = (todo) => {
        let updatedTodo = { ...todo, completed: !todo.completed }
        api.put(`/todos/${todo.id}`, updatedTodo).then(response => {
            alert(JSON.stringify(response.data), 'Updated')
            fetchTodos()
        })
    }
    // delete
    const deleteTodo = (id) => {
        api.delete(`/todos/${id}`).then(response => {
            alert(JSON.stringify('Todo ' + id + ' Deleted'))
            fetchTodos()
        })
    }

    const store = { todos, fetchTodos, sortTodosByCompleted, createTodo, updateTodo, deleteTodo }

    return (
        <TasksContext.Provider value={store}>
            {children}
        </TasksContext.Provider>
    )
}
export { Provider }
export default TasksContext