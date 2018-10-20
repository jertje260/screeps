import { Role } from "roles/roles";

export class RoleConfig {
    public Amount: number;
    public Role: Role;
    constructor(amount: number, role: Role) {
        this.Amount = amount;
        this.Role = role;
    }
}
