import { RoleConfig } from "./roleConfig";
import { Role } from "roles/roles";

export class ControllerSetup {
    public Level: number;
    public Roles: RoleConfig[];

    constructor(level: number, roles: RoleConfig[]) {
        this.Level = level;
        this.Roles = roles;
    }

    public GetNextRole(harvesterCount: number, upgraderCount: number, builderCount: number, repairerCount: number, collectorCount: number, workToDo: boolean, repairToDo: boolean, energyOut: boolean): Role | undefined {
        for (const roleConfig of this.Roles) {
            if (roleConfig.Role === Role.Harvester && roleConfig.Amount > harvesterCount) {
                return Role.Harvester;
            }
            if (roleConfig.Role === Role.Upgrader && roleConfig.Amount > upgraderCount) {
                return Role.Upgrader;
            }
            if (roleConfig.Role === Role.Builder && roleConfig.Amount > builderCount && workToDo) {
                return Role.Builder;
            }
            if (roleConfig.Role === Role.Repairer && roleConfig.Amount > repairerCount && repairToDo) {
                return Role.Repairer;
            }
            if (roleConfig.Role === Role.Collector && roleConfig.Amount > collectorCount && energyOut) {
                return Role.Collector;
            }
        }
        return;
    }
}

