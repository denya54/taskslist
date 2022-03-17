import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {ResponseType} from "./todolists-api";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export const authAPI = {
    login(dataForLogin: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>(`auth/login`, dataForLogin)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}
