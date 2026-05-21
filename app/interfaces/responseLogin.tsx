import { User } from "@/context/types";

export interface ResponseLogin {
    status: string;
    token: string;
    type: string;
    user: User;
}
