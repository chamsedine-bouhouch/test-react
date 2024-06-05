import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import TaskShow from "./TaskShow";


function TaskList() {
    const [todos, setTodos] = useState([])
    const [isCompleted, setIsCompleted] = useState(true)

    const fetchTodos = useCallback(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(json => setTodos(json.data))
    }, [])

    const handleFilter = async () => {
        setIsCompleted(!isCompleted)
         try {
            const filtredTodos = await axios.get(`https://jsonplaceholder.typicode.com/todos/?completed=${isCompleted}`)
             setTodos(filtredTodos.data)
        } catch (error) {
            console.error(error)
        }
    }

    const renderedTodos = todos.map((todo) => {
        return (
            <TaskShow todo={todo} />
        )
    })

    useEffect(() => {
        fetchTodos()
    },
        [fetchTodos]
    );

    return (
        <div className="flex flex-col">
            <GoFilter onClick={handleFilter} className="text-4xl cursor-pointer my-4" />
            <div>
                {renderedTodos}
            </div>
        </div>
    )
}

export default TaskList