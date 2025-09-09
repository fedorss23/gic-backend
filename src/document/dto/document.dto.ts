import { IsString } from "class-validator";

export class DocumentDto {
    @IsString()
    classification: string

    @IsString()
    url: string
}