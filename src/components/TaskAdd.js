import { useState } from "react"
import UseTasksContext from "../hooks/use-tasks-context"

function TaskAdd() {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const { createTodo } = UseTasksContext()

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (title.length > 0) {
                createTodo(title)
                setTitle('')
                setError('')
            } else {
                throw new Error("Can't Add Empty Todo")
            }
        } catch (error) {
            // console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <div className=" bg-sky-300 px-8 py-4">
            <div className="text-2xl mb-4">
                Add New Task
            </div>
            <form onSubmit={handleSubmit}>
                <div className="text-xl mb-2">
                    title
                </div>
                <input value={title} className="w-full hover:bg-sky-50  rounded  bg-white border py-2 px-4 text-xl" type="text" onChange={handleChange} />
                {error && <p className="text-red-700 mt-2">{error} </p>}
                <button type="submit" className="float-right  bg-green-700 mt-4 px-8 py-2 rounded text-white text-xl" > Add </button>
            </form>

        </div>
    )
}

export default TaskAdd