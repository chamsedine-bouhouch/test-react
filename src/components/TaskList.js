import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { GoTrash, GoFilter } from "react-icons/go";


function TaskList() {
    const [todos, setTodos] = useState([])
    const [isCompleted, setIsCompleted] = useState(true)

    const fetchTodos = useCallback(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(json => setTodos(json.data))
    }, [])

    const handleToggleCompleted = (todo) => {
        console.log(todo.id)
        let updatedTodo = { ...todo, completed: !todo.completed }
        axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo).then(response => {
            console.log(response.data)
            alert(JSON.stringify(response.data), 'Updated')

        })
    }

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(response => {
            console.log(response)
            alert(JSON.stringify('Todo ' + id + ' Deleted'))
        })

    }

    const handleFilter = async () => {
        setIsCompleted(!isCompleted)
        console.log(isCompleted)
        try {
            const filtredTodos = await axios.get(`https://jsonplaceholder.typicode.com/todos/?completed=${isCompleted}`)
            console.log(filtredTodos)
            setTodos(filtredTodos.data)
        } catch (error) {
            console.error(error)
        }


    }

    const renderedTodos = todos.map((todo) => {
        return (
            <div key={todo.id} className="my-4">
                <div className="flex justify-between bg-gray-100 p-4">
                    <div>
                        {todo.title}
                    </div>
                    <div className="flex">
                        <div className="cursor-pointer" onClick={() => handleToggleCompleted(todo)} >
                            {todo.completed ? <span className="text-green-400" >Completed </span> : <span className="text-red-300 " >Incompleted</span>}
                        </div>
                        <GoTrash className="mx-4 text-red-800" onClick={() => { handleDelete(todo.id) }} />
                    </div>
                </div>
            </div>

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