import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type deletedTodolistsActionType = {
    type: 'DELETE-TODOLIST', todolistID: string
}
export const deleteTodolistAC = (todolistID: string): deletedTodolistsActionType => {
    return {
        type: 'DELETE-TODOLIST',
        todolistID: todolistID
    }
}

export type addTodolistActionType = { type: 'ADD-TODOLIST', nameNewTodolist: string,  todolistID: string }

export const addTodolistAC = (name: string) : addTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        nameNewTodolist: name,
        todolistID: v1()
    }
}

type changeTodolistTitleActionType = { type: 'CHANGE-TODOLIST-TITLE', todolistID: string, newName: string }
export const changeTodolistTitleAC = (todolistID: string, name: string): changeTodolistTitleActionType  => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        todolistID: todolistID,
        newName: name
    }
}

type changeTodolistFilterActionType = { type: 'CHANGE-TODOLIST-FILTER', todolistID: string, filter: FilterType }

export const changeTodolistFilterAC = (todolistID: string, filter: FilterType) : changeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        todolistID: todolistID,
        filter: filter
    }
}

type ActionType =
    deletedTodolistsActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            let newState = state.filter(td => td.id !== action.todolistID)
            return newState;
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistID,
                name: action.nameNewTodolist,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let newTodolists = state.map(td => td.id === action.todolistID ? {...td, name: action.newName} : td)
            return newTodolists
        case "CHANGE-TODOLIST-FILTER":
            state = state.map(td => td.id === action.todolistID ? {...td, filter: action.filter} : td)
            return {...state}
        default:
            return state
    }

}

