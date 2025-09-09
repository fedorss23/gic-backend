import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class EducactionCreateDto {
    @IsString()
    name: string

    @IsString()
    country: string

    @IsString()
    type: string

    @IsString()
    timeStart: string

    @IsString()
    timeFinal: string
}

export class EducationUpdateDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    type: string

    @IsString()
    @IsOptional()
    timeStart: string

    @IsString()
    @IsOptional()
    timeFinal: string
}