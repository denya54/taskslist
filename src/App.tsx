import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    name: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, name: ' React', isDone: false},
        {id: 2, name: ' Redux', isDone: false},
        {id: 3, name: ' HTML', isDone: true},
        {id: 4, name: ' JS', isDone: false},
        {id: 5, name: ' GraphQL', isDone: false},
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

    const deleteTask = (taskID: number) => {
        tasks = tasks.filter(task => task.id !== taskID)
        setTasks(tasks)
    }


    return (
        <div className="App">
            <Todolist name={'What to learn'}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
