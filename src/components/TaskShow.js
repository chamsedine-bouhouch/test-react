import axios from "axios"
import { GoTrash } from "react-icons/go"

function TaskShow({ todo, onUpdate }) {
    const handleToggleCompleted = (todo) => {
        let updatedTodo = { ...todo, completed: !todo.completed }
        axios.put(`http://127.0.0.1:3001/todos/${todo.id}`, updatedTodo).then(response => {
            //  alert(JSON.stringify(response.data), 'Updated')
            onUpdate()

        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:3001/todos/${id}`).then(response => {
            //  alert(JSON.stringify('Todo ' + id + ' Deleted'))
            onUpdate()
        })

    }

    return (
        <div className="my-4">
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
}

export default TaskShow