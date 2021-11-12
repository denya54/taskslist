import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";


type TodolistPropsType = {
    name: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    addTask: (nameNewTask: string) => void
    changeFilter: (filterValue: FilterType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterType
}



export const Todolist = (props: TodolistPropsType) => {
    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState(false)


    const addTaskButton = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue)
            setInputValue('')
        }
        else {
            setError(true)
        }
    }
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const addTaskWithClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            props.addTask(inputValue)
            setInputValue('')
        }
    }

    const changeFilterClick = (filterValue: FilterType) => props.changeFilter(filterValue)
    const deleteTaskClick = (taskID: string) => props.deleteTask(taskID)



    return (
        <div>
            <h3>{props.name}</h3>
            <div>
                <input value={inputValue} onChange={changeInputValue} onKeyPress={addTaskWithClickEnter} className={error ? 'error' : ''}/>
                <button onClick={addTaskButton}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>
            <ul>
                {props.tasks.map(task => {
                    const changeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(task.id, e.currentTarget.checked)
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done': ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeIsDone}/>
                            <span>{task.name}</span>
                            <button onClick={() => deleteTaskClick(task.id)}>x</button>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => changeFilterClick('all')}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => changeFilterClick('active')}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={() => changeFilterClick('completed')}>Completed</button>
            </div>
        </div>
    )
}