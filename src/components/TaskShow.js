import { GoTrash } from "react-icons/go"
import api from "../api"

function TaskShow({ todo, onUpdate }) {
    const handleToggleCompleted = (todo) => {
        let updatedTodo = { ...todo, completed: !todo.completed }
        api.put(`/todos/${todo.id}`, updatedTodo).then(response => {
            //  alert(JSON.stringify(response.data), 'Updated')
            onUpdate()

        })
    }

    const handleDelete = (id) => {
        api.delete(`/todos/${id}`).then(response => {
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
                    <GoTrash className="mx-4 cursor-pointer text-red-800" onClick={() => { handleDelete(todo.id) }} />
                </div>
            </div>
        </div>
    )
}

export default TaskShow