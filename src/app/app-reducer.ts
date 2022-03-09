export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.newStatus}
        default:
            return state
    }
}

export const setAppStatusAC = (newStatus: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', newStatus} as const
}


type AppActionsType = ReturnType<typeof setAppStatusAC>

