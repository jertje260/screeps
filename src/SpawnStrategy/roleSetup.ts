import { PartSetup } from "./partSetup";
import { Role } from "roles/roles";

export class RoleSetup {
    public Role: Role;
    public Setups: PartSetup[];

    constructor(role: Role, setups: PartSetup[]) {
        this.Role = role;
        this.Setups = setups;
    }

    public GetPartSetup(energyAvailable: number, energyCapacityAvailable: number, harvesters: number, upgraders: number, builders: number, repairers: number): BodyPartConstant[] | undefined {
        let waitForCapacity = false;
        switch (this.Role) {
            case Role.Upgrader:
                waitForCapacity = true;
                break;
            case Role.Builder:
                waitForCapacity = true;
                break;
            case Role.Harvester:
                if (harvesters > 1) {
                    waitForCapacity = true;
                } else {
                    waitForCapacity = false;
                }
                break;
            case Role.Repairer:
                waitForCapacity = true;
                break;
            case Role.Collector:
                waitForCapacity = true;
                break;
            default:
                throw new Error("Forgot to implement a role");
        }

        for (let i = this.Setups.length - 1; i > 0; i--) {
            if (waitForCapacity && this.Setups[i].Energy <= energyCapacityAvailable) {
                return this.Setups[i].Parts;
            }
            if (!waitForCapacity && this.Setups[i].Energy <= energyAvailable) {
                return this.Setups[i].Parts;
            }
        }
        return;
    }
}
