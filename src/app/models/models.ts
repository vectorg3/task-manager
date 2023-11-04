import { ITASK } from "./TASK";

export interface LoginBody{
    userName: string,
    password: string,
}

export interface SignUpBody extends LoginBody{
    tasks: ITASK[]
}

export interface User{
    userName: string,
    tasks: ITASK[],
    token: string,
    updatedAt: Date | string,
}