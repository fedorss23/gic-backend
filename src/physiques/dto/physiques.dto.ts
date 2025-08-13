import { IsString } from "class-validator";

export class PhysiquesDto {
    @IsString()
    growth: string

    @IsString()
    weight: string

    @IsString()
    hairColor: string

    @IsString()
    eyeColor: string
}