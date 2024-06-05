import axios from "axios"
import { useState } from "react"

function TaskAdd() {
    const [title, setTitle] = useState('')
    const handleChange = (event) => {
        console.log(event.target.value)
        setTitle(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed:true,
            userId:1
        }).then(response => {
            alert(JSON.stringify(response.data), 'Added')
            setTitle('')
        })
    }
    return (
        <div>
            <div>
                TaskAdd
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-row">
                <label>
                    Title
                </label>
                <input type="text" onChange={handleChange} />
                <button> Button </button>

            </form>

        </div>
    )
}

export default TaskAdd