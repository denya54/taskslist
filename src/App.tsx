import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: todolistID1, name: 'What to learn', filter: 'all'},
            {id: todolistID2, name: 'What to buy', filter: 'all'}
        ]
    )

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let newTodolists = todolists.map(td => td.id === todolistID ? {...td, filter: filterValue} : td)
        setTodolists(newTodolists)
    }

    const deleteTask = (todolistID: string, taskID: string) => {
        // let todolistTask = tasks[todolistID]
        tasks[todolistID] = tasks[todolistID].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = (todolistID: string, nameNewTask: string) => {
        let newTask = {id: v1(), name: nameNewTask, isDone: false}
        tasks[todolistID] = [...tasks[todolistID], newTask]
        setTasks({...tasks})
    }

    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        tasks[todolistID] = tasks[todolistID].map(task => task.id === taskID ? {...task, isDone: isDone} : task)
        setTasks({...tasks})
    }

    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(td => td.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (
        <div className="App">

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
                    />
                )
            })}

        </div>
    );
}

export default App;
