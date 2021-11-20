import { TaskStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, deletedTodolistsActionType} from "./todolists-reducer";

type deleteTaskActionType = {
    type: 'DELETE-TASK', todolistID: string, taskID: string
}
export const deleteTaskAC = (todolistID: string, taskID: string): deleteTaskActionType => {
    return {
        type: 'DELETE-TASK',
        todolistID: todolistID,
        taskID: taskID
    }
}

type addTaskActionType = { type: 'ADD-TASK', todolistID: string,  newTaskTitle: string, taskID: string }

export const addTaskAC = (todolistID: string, newTaskTitle: string) : addTaskActionType => {
    return {
        type: 'ADD-TASK',
        todolistID: todolistID,
        newTaskTitle: newTaskTitle,
        taskID: v1()
    }
}
type changeTaskStatusActionType = { type: 'CHANGE-TASK-STATUS', todolistID: string, taskID: string, isDone: boolean}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): changeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID: todolistID,
        taskID: taskID,
        isDone: isDone
    }
}

type changeTaskTitleActionType = {  type: 'CHANGE-TASK-TITLE', todolistID: string, taskID: string, newName: string
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, newName: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistID: todolistID,
        taskID: taskID,
        newName: newName
    }
}

type ActionType = deleteTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | addTodolistActionType | deletedTodolistsActionType

let initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            state[action.todolistID] = state[action.todolistID].filter(task => task.id !== action.taskID)
            return  ({...state});
        case "ADD-TASK":
            let newTask = {id: v1(), name: action.newTaskTitle, isDone: false}
            state[action.todolistID] = [newTask, ...state[action.todolistID]]
            return {...state};
        case "CHANGE-TASK-STATUS":
            state[action.todolistID] = state[action.todolistID].map(task => task.id === action.taskID ? {...task, isDone: action.isDone} : task)
            return {...state};
        case 'CHANGE-TASK-TITLE':
            state[action.todolistID] = state[action.todolistID].map(task => task.id === action.taskID ? {...task, name: action.newName} : task)
            return {...state}
        case "ADD-TODOLIST":
           return {[action.todolistID]: [], ...state}
        case "DELETE-TODOLIST":
            const copyState = {...state};
            delete copyState[action.todolistID];
            return copyState;
        default:
            return state
    }

}

