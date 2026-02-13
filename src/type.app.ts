import { User } from '@prisma/client'

export interface IResultFromJwtVerify {
    id: string
    iat: number
    exp: number
}
