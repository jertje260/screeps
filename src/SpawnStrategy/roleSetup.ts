import { PartSetup } from "./partSetup";

export class RoleSetup {
    public Role: Role;
    public Setups: PartSetup[];

    constructor(role: Role, setups: PartSetup[]) {
        this.Role = role;
        this.Setups = setups;
    }

    public GetPartSetup(energyAvailable: number, energyCapacityAvailable: number): BodyPartConstant[] | undefined {
        let waitForCapacity = false;
        switch (this.Role) {
            case Role.Upgrader:
            case Role.Builder:
                waitForCapacity = true;
                break;
            case Role.Harvester:
                waitForCapacity = false;
                break;
            default:
                throw new Error("Forgot to implement a role");
        }

        for (let i = this.Setups.length; i > 0; i--) {
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
