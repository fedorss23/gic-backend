import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class MilitaryCreateDto {
    @IsString()
    name: string

    @IsString()
    country: string

    @IsString()
    achievements: string

    @IsString()
    timeStart: string

    @IsString()
    timeFinal: string
}

export class MilitaryUpdateDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    achievements: string

    @IsBoolean()
    @IsOptional()
    isMilitary: boolean

    @IsString()
    @IsOptional()
    timeStart: string

    @IsString()
    @IsOptional()
    timeFinal: string
}