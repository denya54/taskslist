import axios from "axios";

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodolistResponseType = {
    data: {
        item: TodolistType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type DeleteTodolistResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type UpdateTodolistResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '089d3e24-70d2-4632-9ce2-42855d61866e'
    }
})


const baseURL = 'https://social-network.samuraijs.com/api/1.1'
console.log(baseURL + `/up`)

export const todolistAPI = {
    updateTodolist (todolistID: string, newTitle: string) {
        return instance.put<UpdateTodolistResponseType>(`/todo-lists/${todolistID}`, {title: newTitle})
    },
    getTodolists () {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    createTodolist (title: string) {
        return instance.post<CreateTodolistResponseType>(`/todo-lists`,{title: title})
    },
    deleteTodolist (todolistID: string) {
        return instance.delete<DeleteTodolistResponseType>( `/todo-lists/${todolistID}`)
    }
}