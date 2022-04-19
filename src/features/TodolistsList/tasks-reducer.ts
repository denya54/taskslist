import {addTodolistAC, fetchTodolistsTC, removeTodolistAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks: tasks, todolistId: todolistId}
    })

export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    })

export const addTaskTC = createAsyncThunk('tasks/addTask',
    async (param: { title: string, todolistId: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                // const action = addTaskAC({task: task})
                //  dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return task
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, {
        dispatch,
        getState,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return rejectWithValue('task not found in the state')
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.domainModel
        }
        try {
            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                return param

            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        // addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        // },
        // updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
        //setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
        //   state[action.payload.todolistId] = action.payload.tasks
        //},
    },
    extraReducers: builder => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        })
    }
})

// export const addTaskAC = slice.actions.addTaskAC
//export const updateTaskAC = slice.actions.updateTaskAC


export const tasksReducer = slice.reducer

// thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             const tasks = res.data.items
//             dispatch(setTasksAC({tasks: tasks, todolistId: todolistId}))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         })
// }
// export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.deleteTask(todolistId, taskId)
//         .then(res => {
//             const action = removeTaskAC({taskId: taskId, todolistId: todolistId})
//             dispatch(action)
//         })
// }
// export const addTaskTC_ = (title: string, todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     todolistsAPI.createTask(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const task = res.data.data.item
//                 const action = addTaskAC({task: task})
//                 dispatch(action)
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const updateTaskTC_ = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             //throw new Error("task not found in the state");
//             console.warn('task not found in the state')
//             return
//         }
//
//         const apiModel: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             title: task.title,
//             status: task.status,
//             ...domainModel
//         }
//
//         todolistsAPI.updateTask(todolistId, taskId, apiModel)
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     const action = updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId})
//                     dispatch(action)
//                 } else {
//                     handleServerAppError(res.data, dispatch);
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch);
//             })
//     }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
