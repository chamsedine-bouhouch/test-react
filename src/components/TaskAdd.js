import { useState } from "react"
import api from "../api"

function TaskAdd({ onCreate }) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const handleChange = (event) => {
        // console.log(event.target.value)
        setTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (title.length > 0) {
                api.post('/todos', {
                    title,
                    completed: false,
                    userId: 1
                }).then(response => {
                    // alert(JSON.stringify(response.data), 'Added')
                    onCreate()
                })
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
        <div className=" bg-sky-300 p-8">
            <div className="text-2xl mb-4">
                Add New Task
            </div>
            <form
                className=""
                onSubmit={handleSubmit}
            >
                <div className="text-xl mb-2">
                    title
                </div>
                <input value={title} className="w-1/2 hover:bg-sky-50  rounded  bg-white border border py-2 px-4 text-xl" type="text" onChange={handleChange} />
                <button type="submit" className="bg-green-700 mx-4 px-8 py-2 rounded text-white text-xl" > Button </button>
                {error && <p className="text-red-500 mt-2 " >{error} </p>}
            </form>

        </div>
    )
}

export default TaskAdd