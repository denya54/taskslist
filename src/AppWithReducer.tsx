import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    name: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    name: string
    filter: FilterType
}

export type TaskStateType = {
    [id: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
            {id: todolistID1, name: 'What to learn', filter: 'all'},
            {id: todolistID2, name: 'What to buy', filter: 'all'}
        ]
    )

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), name: ' React', isDone: false},
                {id: v1(), name: ' Redux', isDone: false},
                {id: v1(), name: ' HTML', isDone: true},
                {id: v1(), name: ' JS', isDone: false},
                {id: v1(), name: ' GraphQL', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), name: ' Milk', isDone: false},
                {id: v1(), name: ' Beef', isDone: false},
                {id: v1(), name: ' Beer', isDone: true},
                {id: v1(), name: ' Fish', isDone: false},
                {id: v1(), name: ' Nuts', isDone: false}
            ]
        }
    )

    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        let action = changeTodolistFilterAC(todolistID, filterValue)
        dispatchToTodolists(action)
    }

    const deleteTask = (todolistID: string, taskID: string) => {
        let action = deleteTaskAC(todolistID, taskID)
        dispatchToTasks(action)
    }

    const addTask = (todolistID: string, nameNewTask: string) => {
        let action = addTaskAC(todolistID, nameNewTask)
        dispatchToTasks(action)
    }

    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        let action = changeTaskStatusAC(todolistID, taskID, isDone)
        dispatchToTasks(action)
    }

    const deleteTodolist = (todolistID: string) => {
        let action = deleteTodolistAC(todolistID)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const addTodolist = (newTodolistName: string) => {
        const action = addTodolistAC(newTodolistName)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newName: string) => {
        let action = changeTaskTitleAC(todolistID, taskID, newName)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (todolistID: string, newName: string) => {
        let action = changeTodolistTitleAC(todolistID, newName)
        dispatchToTodolists(action)
    }

    return (
        <div className="App">
            <AddItemForm func={addTodolist}/>
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id]

                if (td.filter === 'active') {
                    tasksForTodolist = tasks[td.id].filter(task => task.isDone === false)
                }
                if (td.filter === 'completed') {
                    tasksForTodolist = tasks[td.id].filter(task => task.isDone === true)
                }
                return (
                    <Todolist key={td.id}
                              id={td.id}
                              name={td.name}
                              tasks={tasksForTodolist}
                              deleteTask={deleteTask}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              changeFilter={changeFilter}
                              filter={td.filter}
                              deleteTodolist={deleteTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

export default AppWithReducer;
