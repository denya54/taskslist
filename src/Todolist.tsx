import React from "react";
import {TaskType} from "./App";


type TodolistPropsType = {
    name: string
    tasks: Array<TaskType>
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
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].name}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}