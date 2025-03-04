import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

// class to define the validation of Article entity
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