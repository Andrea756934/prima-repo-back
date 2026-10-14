import { User } from "../user/user.entity";

export type Classroom = {
    id: string,
    name: string,
    studentsCount: number,
    createdBy: User
}