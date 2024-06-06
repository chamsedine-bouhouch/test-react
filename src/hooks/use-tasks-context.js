import { useContext } from "react";
import TasksContext from "../context/tasks";

export default function UseTasksContext() {
    return useContext(TasksContext)
}