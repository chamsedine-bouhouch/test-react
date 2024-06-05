import axios from "axios";
import { useEffect, useState } from "react";


function TaskList() {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(json => setTodos(json.data))
    }

    const renderedTodos = todos.map((todo) => {

        return (
            <div key={todo.id} className="mx-8 my-4">
                <div className="flex justify-between bg-gray-100 p-4">
                    <div>
                        {todo.title}
                    </div>
                    <div> {todo.completed ? <span className="text-green-400" >Completed </span> : <span className="text-red-500 " >Incompleted</span>} </div>
                </div>
            </div>)
    })

    useEffect(() => {
        fetchTodos()
    }, []);
    return (
        <>
            {renderedTodos}
        </>
    )
}

export default TaskList