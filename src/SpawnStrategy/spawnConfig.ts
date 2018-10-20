import { ControllerSetup } from "./controllerSetup";
import { PartSetup } from "./partSetup";
import { RoleConfig } from "./roleConfig";
import { RoleSetup } from "./roleSetup";

export class SpawnConfig {

    public static GetNextScreep(controllerLevel: number, harvesters = 0, upgraders = 0, builders = 0, workToDo = false): Role | undefined {
        const controllerSetup = this.ControllerConfig.find((setup) => setup.Level === controllerLevel);
        if (controllerSetup === undefined) {
            return;
        }
        return controllerSetup.GetNextRole(harvesters, upgraders, builders, workToDo);
    }

    public static GetBodyParts(role: Role, energyAvailable: number, energyCapacityAvailable: number): BodyPartConstant[] | undefined {
        const roleSetup = this.PartConfig.find((setup) => setup.Role === role);
        if (roleSetup === undefined) {
            return;
        }
        return roleSetup.GetPartSetup(energyAvailable, energyCapacityAvailable);
    }

    private static PartConfig = [
        new RoleSetup(Role.Harvester, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(400, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Upgrader, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(400, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Builder, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(400, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
    ]

    private static ControllerConfig = [
        new ControllerSetup(1, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Upgrader)
        ]),
        new ControllerSetup(1, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Upgrader),
            new RoleConfig(2, Role.Builder)
        ])
    ];
}


