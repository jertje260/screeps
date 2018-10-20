import { Role } from "roles/roles";

interface CreepMemory {
    role: Role;
    room: string;
    working: boolean;
    target?: string;
}
