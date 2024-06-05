import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import TaskShow from "./TaskShow";
import TaskAdd from "./TaskAdd";


function TaskList() {
    const [todos, setTodos] = useState([])
    const [isCompleted, setIsCompleted] = useState(true)

    const fetchTodos = useCallback(() => {
        axios.get('http://127.0.0.1:3001/todos')
            .then(json => {
                setTodos(json.data)
            })
    }, [])

    const handleFilter = async () => {
        setIsCompleted(!isCompleted)
        try {
            const filtredTodos = await axios.get(`http://127.0.0.1:3001/todos/?completed=${isCompleted}`)
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
        <div className="flex flex-col">
            <TaskAdd onCreate={fetchTodos} />

            <GoFilter onClick={handleFilter} className="text-4xl cursor-pointer my-4" />
            <div>
                {renderedTodos}
            </div>
        </div>
    )
}

export default TaskList