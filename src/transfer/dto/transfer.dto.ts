import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTransferDto {
    @IsString()
    name: string

    @IsString()
    type: string

    @IsString()
    way: string

    @IsNumber()
    price: number

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}

export class UpdateTransferDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    type?: string

    @IsString()
    @IsOptional()
    way?: string

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
