import { User } from "../../user/user.entity";

export type AssignmentStudent = {
    user: User,
    completed: boolean,
    completedAt: Date | null
}

export type Assignment = {
    id: string,
    title: string,
    studentsCount: number,
    completedCount: number,
    completed: boolean,
    createdAt: Date,
    createdBy: User,
    students?: AssignmentStudent[]
}