export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.newStatus}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (newStatus: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', newStatus} as const
}

export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}


type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>

