import { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import TaskShow from "./TaskShow";
import TaskAdd from "./TaskAdd";
 import UseTasksContext from "../hooks/use-tasks-context";


function TaskList() {
     const [isCompleted, setIsCompleted] = useState(true)
    const { todos, fetchTodos, sortTodosByCompleted } = UseTasksContext()

    const handleFilter = async () => {
        setIsCompleted(!isCompleted)
        sortTodosByCompleted(isCompleted)
    }

    const renderedTodos = todos.length > 0 ? todos.map((todo) => {
        return (
            <TaskShow key={todo.id} todo={todo} />
        )
    }) : 'Your todo list is empty'

    useEffect(() => {
        fetchTodos()
    },
        [fetchTodos]
    );

    return (
        <div className="grid">
            <TaskAdd />
            <GoFilter onClick={handleFilter} className="justify-self-end text-4xl cursor-pointer mr-8 mt-4" />
            <div className="mx-4">
                {renderedTodos}
            </div>
        </div>
    )
}

export default TaskList