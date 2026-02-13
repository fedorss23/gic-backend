import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator'

export class CreateCarDto {
    @IsString()
    markName: string

    @IsString()
    lineCar: string

    @IsString()
    model: string

    @IsNumber()
    @IsOptional()
    raiting?: number

    @IsNumber()
    price: number

    @IsString()
    imageUrls: string

    @IsBoolean()
    @IsOptional()
    isNew?: boolean

    @IsBoolean()
    @IsOptional()
    isRecomended?: boolean

    @IsString()
    @IsOptional()
    representatives?: string

    @IsString()
    description: string

    @IsString()
    @IsOptional()
    amenties?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    venichleClass: string

    @IsString()
    bodyType: string

    @IsNumber()
    year: number

    @IsString()
    fuelType: string

    @IsNumber()
    maxPassangers: number

    @IsNumber()
    baggage: number

    @IsString()
    @IsOptional()
    driver?: string
}

export class UpdateCarDto {
    @IsString()
    @IsOptional()
    markName?: string

    @IsString()
    @IsOptional()
    lineCar?: string

    @IsString()
    @IsOptional()
    model?: string

    @IsNumber()
    @IsOptional()
    raiting?: number

    @IsNumber()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    imageUrls?: string

    @IsBoolean()
    @IsOptional()
    isNew?: boolean

    @IsBoolean()
    @IsOptional()
    isRecomended?: boolean

    @IsString()
    @IsOptional()
    representatives?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    amenties?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    venichleClass?: string

    @IsString()
    @IsOptional()
    bodyType?: string

    @IsNumber()
    @IsOptional()
    year?: number

    @IsString()
    @IsOptional()
    fuelType?: string

    @IsNumber()
    @IsOptional()
    maxPassangers?: number

    @IsNumber()
    @IsOptional()
    baggage?: number

    @IsString()
    @IsOptional()
    driver?: string
}
