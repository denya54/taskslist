import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";


type TodolistPropsType = {
    name: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    addTask: (nameNewTask: string) => void
    changeFilter: (filterValue: FilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    let [inputValue, setInputValue] = useState('')

    const addTaskButton = () => {
        props.addTask(inputValue)
        setInputValue('')
    }
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    const addTaskWithClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            props.addTask(inputValue)
            setInputValue('')
        }
    }

    const changeFilterClick = (filterValue: FilterType) => {
        props.changeFilter(filterValue)
    }
    const deleteTaskClick = (taskID: string) => {
        props.deleteTask(taskID)
    }

    return (
        <div>
            <h3>{props.name}</h3>
            <div>
                <input value={inputValue} onChange={changeInputValue} onKeyPress={addTaskWithClickEnter}/>
                <button onClick={addTaskButton}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.name}</span>
                            <button onClick={() => deleteTaskClick(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterClick('all')}>All</button>
                <button onClick={() => changeFilterClick('active')}>Active</button>
                <button onClick={() => changeFilterClick('completed')}>Completed</button>
            </div>
        </div>
    )
}