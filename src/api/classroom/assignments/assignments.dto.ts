import { IsString } from "class-validator";

export class createAssignmentDto {
    @IsString()
    title: string
}