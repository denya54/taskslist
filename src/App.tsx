import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    name: string
    isDone: boolean
}

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, name: ' React', isDone: false},
        {id: 2, name: ' Redux', isDone: false},
        {id: 3, name: ' HTML', isDone: false}
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, name: 'SpiderMan1', isDone: false},
        {id: 2, name: 'SpiderMan2', isDone: false},
        {id: 3, name: 'SpiderMan3', isDone: false}
    ]


    return (
        <div className="App">
            <Todolist name={'What to learn'} tasks={tasks1}/>
            <Todolist name={'Songs'} tasks={tasks2}/>


        </div>
    );
}

export default App;
