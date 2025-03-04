import { IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";

/**
 * class for validating the user data
 */
export class SignupDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/^(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' })
    password: string;
}

export class SigninDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}