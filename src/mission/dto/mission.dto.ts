import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class MissionCreateDto {
    @IsString()
    name: string

    @IsString()
    country: string

    @IsString()
    role: string

    @IsBoolean()
    isMilitary: boolean

    @IsString()
    timeStart: string

    @IsString()
    timeFinal: string
}

export class MissionUpdateDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    role: string

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