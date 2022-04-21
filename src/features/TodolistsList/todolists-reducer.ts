import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        // thunkApi.dispatch(setTodolistsAC({todolists: res.data}))
        thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
        const listsTodolists = res.data
        listsTodolists.forEach((td) => {
            thunkApi.dispatch(fetchTasksTC(td.id))
        })
        return res.data
    } catch (error) {
        handleServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    thunkApi.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)

    thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolist: res.data.data.item}

})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkApi) => {
    const res = await todolistsAPI.updateTodolist(param.id, param.title)
    return {id: param.id, title: param.title}
})

const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
            //  state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
            //state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)
        },
        clearTodolistsDataAC() {
            return []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const changeTodolistFilterAC = slice.actions.changeTodolistFilterAC
export const changeTodolistEntityStatusAC = slice.actions.changeTodolistEntityStatusAC
export const clearTodolistsDataAC = slice.actions.clearTodolistsDataAC
export const todolistsReducer = slice.reducer


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
