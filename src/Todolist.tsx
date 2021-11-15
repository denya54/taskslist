import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (todolistID: string, taskID: string, newName: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const changeFilterClick = (filterValue: FilterType) => props.changeFilter(props.id, filterValue)
    const deleteTaskClick = (taskID: string) => props.deleteTask(props.id, taskID)

    const deleteTodolistClick = () => {
        props.deleteTodolist(props.id)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    }

    const changeTaskNameHandler = (taskID: string, newName: string) => {
        props.changeTaskTitle(props.id, taskID, newName)
    }

    return (
        <div>
            <h3>{props.name}</h3>
            <button onClick={deleteTodolistClick}>x</button>
            <AddItemForm func={addTaskHandler}/>
            <ul>
                {props.tasks.map(task => {
                    const changeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, task.id, e.currentTarget.checked)
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeIsDone}/>
                            <EditableSpan taskName={task.name}
                                          func={(newName: string) => changeTaskNameHandler(task.id, newName)}/>
                            <button onClick={() => deleteTaskClick(task.id)}>x</button>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilterClick('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilterClick('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilterClick('completed')}>Completed
                </button>
            </div>
        </div>
    )
}