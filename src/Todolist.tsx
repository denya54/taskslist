import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";


type TodolistPropsType = {
    id: string
    name: string
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, nameNewTask: string) => void
    changeFilter: (todolistID: string, filterValue: FilterType) => void
    changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterType
    deleteTodolist: (todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState(false)


    const addTaskButton = () => {
        if (inputValue.trim() !== '') {
            props.addTask(props.id, inputValue)
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
            props.addTask(props.id, inputValue)
            setInputValue('')
        }
    }

    const changeFilterClick = (filterValue: FilterType) => props.changeFilter(props.id, filterValue)
    const deleteTaskClick = (taskID: string) => props.deleteTask(props.id, taskID)

    const deleteTodolistClick = () => {
        props.deleteTodolist(props.id)
    }


    return (
        <div>
            <h3>{props.name}</h3>
            <button onClick={deleteTodolistClick}>x</button>
            <div>
                <input value={inputValue} onChange={changeInputValue} onKeyPress={addTaskWithClickEnter} className={error ? 'error' : ''}/>
                <button onClick={addTaskButton}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>
            <ul>
                {props.tasks.map(task => {
                    const changeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, task.id, e.currentTarget.checked)
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