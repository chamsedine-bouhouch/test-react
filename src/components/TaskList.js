import { useCallback, useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import TaskShow from "./TaskShow";
import TaskAdd from "./TaskAdd";
import api from "../api";


function TaskList() {
    const [todos, setTodos] = useState([])
    const [isCompleted, setIsCompleted] = useState(true)

    const fetchTodos = useCallback(() => {
        api.get('/todos')
            .then(json => {
                setTodos(json.data)
            })
    }, [])

    const handleFilter = async () => {
        setIsCompleted(!isCompleted)
        try {
            const filtredTodos = await api.get(`/todos/?completed=${isCompleted}`)
            setTodos(filtredTodos.data)
        } catch (error) {
            console.error(error)
        }
    }

    const renderedTodos = todos.length > 0 ? todos.map((todo) => {
        return (
            <TaskShow key={todo.id} onUpdate={fetchTodos} todo={todo} />
        )
    }) : 'Your todo list is empty'

    useEffect(() => {
        fetchTodos()
    },
        [fetchTodos]
    );

    return (
        <div className="grid">
            <TaskAdd onCreate={fetchTodos} />
            <GoFilter onClick={handleFilter} className="justify-self-end text-4xl cursor-pointer mr-8 mt-4" />
            <div className="mx-4">
                {renderedTodos}
            </div>
        </div>
    )
}

export default TaskList