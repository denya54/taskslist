import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

function AppWithRedux() {

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback( (todolistID: string, filterValue: FilterType) => {
        let action = changeTodolistFilterAC(todolistID, filterValue)
        dispatch(action)
    }, [])

    const deleteTask = useCallback ((todolistID: string, taskID: string) => {
        let action = deleteTaskAC(todolistID, taskID)
        dispatch(action)
    }, [])

    const addTask = useCallback ((todolistID: string, nameNewTask: string) => {
        let action = addTaskAC(todolistID, nameNewTask)
        dispatch(action)
    }, [])

    const changeStatus = useCallback( (todolistID: string, taskID: string, isDone: boolean) => {
        let action = changeTaskStatusAC(todolistID, taskID, isDone)
        dispatch(action)
    }, [])

    const deleteTodolist = useCallback((todolistID: string) => {
        let action = deleteTodolistAC(todolistID)
        dispatch(action)
    }, [])

    const addTodolist = useCallback ((newTodolistName: string) => {
        const action = addTodolistAC(newTodolistName)
        dispatch(action)
    },[])

    const changeTaskTitle = useCallback( (todolistID: string, taskID: string, newName: string) => {
        let action = changeTaskTitleAC(todolistID, taskID, newName)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback( (todolistID: string, newName: string) => {
        let action = changeTodolistTitleAC(todolistID, newName)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <AddItemForm func={addTodolist}/>
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id]

                // if (td.filter === 'active') {
                //     tasksForTodolist = tasks[td.id].filter(task => task.isDone === false)
                // }
                // if (td.filter === 'completed') {
                //     tasksForTodolist = tasks[td.id].filter(task => task.isDone === true)
                // }
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

export default AppWithRedux;
