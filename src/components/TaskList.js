import { useEffect, useState } from "react";


function TaskList() {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodos(json))
    }

    const renderedTodos = todos.map((todo) => {

        return (
            <div key={todo.id} className="">
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