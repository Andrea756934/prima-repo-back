export type Role = 'student' | 'teacher';

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    role: Role,
    fullName: string,
    picture: string
}
