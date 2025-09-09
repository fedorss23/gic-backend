import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class AwardCreateDto {
    @IsString()
    name: string

    @IsString()
    country: string

    @IsString()
    achievements: string

    @IsBoolean()
    isMilitary: boolean

    @IsString()
    time: string
}

export class AwardUpdateDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    achievements: string

    @IsString()
    @IsOptional()
    time: string

    @IsBoolean()
    @IsOptional()
    isMilitary: boolean
}