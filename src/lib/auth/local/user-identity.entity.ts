import { User } from "../../../api/user/user.entity"

export type userIdentity = {
    id: string,
    provider: string,
    credentials: {
        username: string,
        hashedPassword: string 
    },
    user: User
}
