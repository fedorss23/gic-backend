import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateEventDto {
    @IsString()
    name: string

    @IsString()
    type: string

    @IsString()
    location: string

    @IsNumber()
    price: number

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls: string
}

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    type?: string

    @IsString()
    @IsOptional()
    location?: string

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
