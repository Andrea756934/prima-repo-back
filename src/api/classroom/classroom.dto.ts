import { ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class createClassroomDto {
    @IsString()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    students: string[];
}