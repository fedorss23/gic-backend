import { User } from "@prisma/client"

export interface IUserWithPassword extends User {
    password: string
}

export interface IResultFromJwtVerify {
    id: string
    iat: number
    exp: number
}
