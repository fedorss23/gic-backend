import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator'

export class UserCreate {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8, {
        message: 'Password must be at least 8 characters long',
    })
    password: string

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsString()
    @IsOptional()
    role: string
}
