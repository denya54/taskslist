import React, {useEffect, useState} from 'react'
import {taskAPI} from "../API/task-API";



export default {
    title: 'API Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    let todolistID = 'e9f983d6-8b9c-4733-a6b9-16297eab7999'
    useEffect(() => {
        taskAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistID = 'e9f983d6-8b9c-4733-a6b9-16297eab7999'
    let taskTitle = 'NEWNEWNEW'
    useEffect(() => {
        taskAPI.createTask(todolistID, taskTitle)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    let todolistID = 'e9f983d6-8b9c-4733-a6b9-16297eab7999'
    let taskID = '84e36423-e253-405e-8d9c-2528d6273afa'

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    let todolistID = 'e9f983d6-8b9c-4733-a6b9-16297eab7999'
    let taskID = 'ed8f7ee8-3b33-4d52-966b-fdc4687e93aa'
    let newTaskTitle = '!!!!!!!!!!!!!'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask(todolistID, taskID, newTaskTitle)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
