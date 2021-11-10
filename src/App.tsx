import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    name: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1 (), name: ' React', isDone: false},
        {id: v1 (), name: ' Redux', isDone: false},
        {id: v1 (), name: ' HTML', isDone: true},
        {id: v1 (), name: ' JS', isDone: false},
        {id: v1 (), name: ' GraphQL', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    const deleteTask = (taskID: string) => {
        tasks = tasks.filter(task => task.id !== taskID)
        setTasks(tasks)
    }

    const addTask = (nameNewTask: string) => {
        let newTask =  {id: v1 (), name: nameNewTask, isDone: false}
        setTasks([newTask, ...tasks])
    }


    return (
        <div className="App">
            <Todolist name={'What to learn'}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
