import { GoTrash } from "react-icons/go"
import api from "../api"
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

function TaskShow({ todo, onUpdate }) {
    const handleToggleCompleted = (todo) => {
        let updatedTodo = { ...todo, completed: !todo.completed }
        api.put(`/todos/${todo.id}`, updatedTodo).then(response => {
             alert(JSON.stringify(response.data), 'Updated')
            onUpdate()

        })
    }

    const handleDelete = (id) => {
        api.delete(`/todos/${id}`).then(response => {
             alert(JSON.stringify('Todo ' + id + ' Deleted'))
            onUpdate()
        })

    }

    return (
        <div className="my-4">
            <div className="flex justify-between items-center bg-gray-100 p-4">
                <div className="flex  items-center cursor-pointer" onClick={() => handleToggleCompleted(todo)} >
                    {todo.completed ? <BiCheckboxChecked className="text-3xl text-green-300" /> : <BiCheckbox className="text-3xl text-red-400" />}
                    <div className="text-xl ml-4 ">
                        {todo.title}
                    </div>
                </div>
             

                    <GoTrash className="text-xl mx-4 cursor-pointer text-red-800" onClick={() => { handleDelete(todo.id) }} />
               
            </div>
        </div>
    )
}

export default TaskShow