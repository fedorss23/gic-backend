import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    name: string

    @IsString()
    type: string

    @IsNumber()
    price: number

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}

export class UpdateServiceDto {
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
    desc?: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}