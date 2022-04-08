import { Dispatch } from 'redux'
import {setAppInitializedAC, setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodolistsDataAC} from "../TodolistsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}
// type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (dataForLogin: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(dataForLogin)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
               dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    })
        .finally(() => {
            dispatch(setAppInitializedAC({isInitialized: true}))
        })
}

