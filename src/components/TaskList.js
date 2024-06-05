import axios from "axios";
import { useCallback, useEffect, useState } from "react";


function TaskList() {
    const [todos, setTodos] = useState([])

    const fetchTodos = useCallback(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(json => setTodos(json.data))
    }, [])

    const handlClick = (todo) => {
        console.log(todo.id)
        let updatedTodo = { ...todo, completed: !todo.completed }
        axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo).then(response => {
            console.log(response.data)
            alert(JSON.stringify(response.data), 'Updated')

        })
    }


    const renderedTodos = todos.map((todo) => {
        return (
            <div key={todo.id} className="mx-8 my-4">
                <div className="flex justify-between bg-gray-100 p-4">
                    <div>
                        {todo.title}
                    </div>
                    <div className="cursor-pointer" onClick={() => handlClick(todo)}  > {todo.completed ? <span className="text-green-400" >Completed </span> : <span className="text-red-500 " >Incompleted</span>} </div>
                </div>
            </div>)
    })

    useEffect(() => {
        fetchTodos()
    },
        [fetchTodos]
    );

    return (
        <>
            {renderedTodos}
        </>
    )
}

export default TaskList