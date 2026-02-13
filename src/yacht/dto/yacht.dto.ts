import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateYachtDto {
    @IsString()
    markName: string

    @IsString()
    model: string

    @IsString()
    line: string

    @IsNumber()
    price: number

    @IsString()
    desc: string

    @IsString()
    @IsOptional()
    imageUrls?: string
}

export class UpdateYachtDto {
    @IsString()
    @IsOptional()
    markName?: string

    @IsString()
    @IsOptional()
    model?: string

    @IsString()
    @IsOptional()
    line?: string

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
