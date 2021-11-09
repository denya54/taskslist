import React from "react";
import {FilterType, TaskType} from "./App";


type TodolistPropsType = {
    name: string
    tasks: Array<TaskType>
    deleteTask: (taskID: number) => void
    changeFilter: (filterValue: FilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <div>
                <input value={'hello world'}/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task =>  <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.name}</span><button onClick={()=>props.deleteTask(task.id)}>x</button></li>)}
            </ul>
            <div>
                <button onClick={()=> props.changeFilter('all')}>All</button>
                <button onClick={()=> props.changeFilter('active')}>Active</button>
                <button onClick={()=> props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}