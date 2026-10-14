import { IsEmail, IsEnum, IsString, IsUrl, Matches } from "class-validator";
import { Role } from "../user/user.entity";

export class registerDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEnum(
        ['student', 'teacher'],
        {
            message: 'role deve essere studente o insegnante'
        }
    )
    role: Role;

    @IsUrl()
    picture: string;

    @IsEmail()
    username: string;

    @Matches(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'),
        {
            message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
        }
    )
    password: string;
}

export class loginDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;
}