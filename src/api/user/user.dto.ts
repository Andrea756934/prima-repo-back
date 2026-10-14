import { IsEnum } from "class-validator";
import { Role } from "./user.entity";

export class listUsersDto {
    @IsEnum(
        ['student', 'teacher'], 
        { 
            message: 'type deve essere student o teacher' 
        }
    )
    role: Role;
}