import {Dispatch} from 'redux'
import {setAppInitializedAC, setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodolistsDataAC} from "../TodolistsList/todolists-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const loginTC = createAsyncThunk('auth/login',
    async (dataForLogin: LoginParamsType, thunkApi) => {
        thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login(dataForLogin)
            if (res.data.resultCode === 0) {
                thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
                return
            } else {
                handleServerAppError(res.data, thunkApi.dispatch);
                thunkApi.dispatch(setAppStatusAC({status: 'failed'}))
                return thunkApi.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            // @ts-ignore
            const error: AxiosError = err
            handleServerNetworkError(error, thunkApi.dispatch)
            return thunkApi.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    }
)

export const logoutTC = createAsyncThunk('auth/logout',
    async (param, thunkApi) => {
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            //thunkApi.dispatch(setIsLoggedInAC({value: false}))
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkApi.dispatch(clearTodolistsDataAC())
            return
        } else {
            handleServerAppError(res.data, thunkApi.dispatch)
            return thunkApi.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue({})
    }
})

export const initializeAppTC = createAsyncThunk('auth/initializeApp',
    async (param, thunkApi) => {
        thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
            const res = await authAPI.me()
                if (res.data.resultCode === 0) {
                    thunkApi.dispatch(setIsLoggedInAC({value: true}));
                    thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    thunkApi.dispatch(setIsLoggedInAC({value: false}))
                    thunkApi.dispatch(setAppStatusAC({status: 'failed'}))
                }
            thunkApi.dispatch(setAppInitializedAC({isInitialized: true}))
    })

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        });
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isLoggedIn = true
        })
    }
})

export const authReducer = slice.reducer

const {setIsLoggedInAC} = slice.actions

// thunks
// export const loginTC_ = (dataForLogin: LoginParamsType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     authAPI.login(dataForLogin)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC({value: true}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//                 dispatch(setAppStatusAC({status: 'failed'}))
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// export const logoutTC_ = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC({value: false}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//                 dispatch(clearTodolistsDataAC())
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// export const initializeAppTC_ = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     authAPI.me().then(res => {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: true}));
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//             dispatch(setIsLoggedInAC({value: false}))
//             dispatch(setAppStatusAC({status: 'failed'}))
//         }
//     })
//         .finally(() => {
//             dispatch(setAppInitializedAC({isInitialized: true}))
//         })
// }

