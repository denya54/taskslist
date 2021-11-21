import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    deleteTask: (todolistID: string, taskID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newName: string) => void

}
export const Task = React.memo ((props: TaskPropsType) => {
    const deleteTaskClick = (taskID: string) => props.deleteTask(props.todolistID, taskID)

    const changeTaskNameHandler = useCallback((newName: string) => props.changeTaskTitle(props.todolistID, props.task.id, newName),
        [props.changeTaskTitle, props.todolistID, props.task.id])


    const changeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked)
    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={props.task.isDone} onChange={changeIsDone}/>
            <EditableSpan taskName={props.task.name}
                          func={(newName: string) => changeTaskNameHandler(newName)}/>
            <button onClick={() => deleteTaskClick(props.task.id)}>x</button>
        </li>

    )
})