import { Role } from "../shared/roles/enums/role.enum";

export interface User {
    userName: string;
    token: string;
    role: Array<Role>;
}
