import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator"

export class CreateSecutiryDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    expirenceInYears: number

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}

export class UpdateSecurityDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    price?: number

    @IsNumber()
    @IsOptional()
    expirenceInYears?: number

    @IsString()
    @IsOptional()
    desc?: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}