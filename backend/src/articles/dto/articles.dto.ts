import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class ArticlesDto {

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id_article: number

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    quantity: number;
}