import { IsOptional, IsString } from "class-validator";

export class PhysiquesDto {
    @IsOptional()
    @IsString()
    growth?: string

    @IsOptional()
    @IsString()
    weight?: string

    @IsOptional()
    @IsString()
    hairColor?: string

    @IsString()
    @IsOptional()
    eyeColor?: string
}