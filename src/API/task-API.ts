import axios from "axios";

type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
}

type TaskResponseType = {
    error: null | string
    items: Array<TaskType>
    totalCount: number
}
type CreateTaskResponseType = {
    data: {item: TaskType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
type DeleteTaskResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
type UpdateTaskResponseType = {
    data: {item: TaskType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '089d3e24-70d2-4632-9ce2-42855d61866e'
    }
})

export const taskAPI = {
    getTasks(todolistID: string) {
        return instance.get<TaskResponseType>(`/${todolistID}/tasks`)
    },
    createTask(todolistID: string, taskTitle: string) {
        return instance.post<CreateTaskResponseType>(`/${todolistID}/tasks`, {title: taskTitle})
    },
    updateTask(todolistID: string, taskID: string, newTaskTitle: string) {
        return instance.put<UpdateTaskResponseType>(`/${todolistID}/tasks/${taskID}`,
            {
                title: newTaskTitle,
                description: null,
                completed: false,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null
            })
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<DeleteTaskResponseType>(`/${todolistID}/tasks/${taskID}`)
    }
}