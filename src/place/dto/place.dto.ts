import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlaceDto {
    @IsString()
    name: string

    @IsString()
    type: string

    @IsNumber()
    price: number

    @IsString()
    location: string

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls: string
}

export class UpdatePlaceDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    type?: string

    @IsNumber()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    desc?: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}