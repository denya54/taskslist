import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {ResponseType} from "./todolists-api";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

type ResponseLoginType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId: number
    }
}

export const authAPI = {
    login(dataForLogin: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>(`auth/login`, dataForLogin)
    }
}
