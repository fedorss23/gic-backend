import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class ProfessionCreateDto {
    @IsString()
    name: string

    @IsString()
    country: string

    @IsString()
    tasks: string

    @IsBoolean()
    isMilitary: boolean

    @IsString()
    timeStart: string

    @IsString()
    timeFinal: string
}

export class ProfessionUpdateDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    tasks: string

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