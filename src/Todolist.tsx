import React, {useCallback} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";


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
    changeTodolistTitle: (todolistID: string, newName: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const changeFilterClick = useCallback((filterValue: FilterType) => props.changeFilter(props.id, filterValue), [props.changeFilter, props.id])
    // const deleteTaskClick = (taskID: string) => props.deleteTask(props.id, taskID)

    const deleteTodolistClick = () => props.deleteTodolist(props.id)

    const addTaskHandler = useCallback((newTitle: string) => props.addTask(props.id, newTitle), [props.addTask, props.id])

    // const changeTaskNameHandler = useCallback((taskID: string, newName: string) => props.changeTaskTitle(props.id, taskID, newName), [props.changeTaskTitle, props.id])

    const changeTodolistNameHandler = useCallback((newName: string) => props.changeTodolistTitle(props.id, newName), [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => task.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone === true)
    }


    return (
        <div>
            <h3><EditableSpan taskName={props.name} func={changeTodolistNameHandler}/>
            </h3>
            <button onClick={deleteTodolistClick}>x</button>
            <AddItemForm func={addTaskHandler}/>
            <ul>
                {tasksForTodolist.map(task => {
                    return <Task key={task.id}
                                 todolistID={props.id}
                                 task={task}
                                 deleteTask={props.deleteTask}
                                 changeStatus={props.changeStatus}
                                 changeTaskTitle={props.changeTaskTitle}/>

                    // const changeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, task.id, e.currentTarget.checked)
                    // return (
                    //     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    //         <input type="checkbox" checked={task.isDone} onChange={changeIsDone}/>
                    //         <EditableSpan taskName={task.name}
                    //                       func={(newName: string) => changeTaskNameHandler(task.id, newName)}/>
                    //         <button onClick={() => deleteTaskClick(task.id)}>x</button>
                    //     </li>
                    //
                    // )
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
})

