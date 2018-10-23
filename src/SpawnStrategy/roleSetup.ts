import { PartSetup } from "./partSetup";
import { Role } from "roles/roles";

export class RoleSetup {
    public Role: Role;
    public Setups: PartSetup[];

    constructor(role: Role, setups: PartSetup[]) {
        this.Role = role;
        this.Setups = setups;
    }

    public GetPartSetup(energyAvailable: number, energyCapacityAvailable: number, harvesters: number): BodyPartConstant[] | undefined {
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
            case Role.Filler:
                waitForCapacity = true;
                break;
            default:
                return this.unreachableRole(this.Role);
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

    private unreachableRole(x: never): never;

    private unreachableRole(x: Role) {
        throw new Error("Didn't export to get role " + x);
    }

}
