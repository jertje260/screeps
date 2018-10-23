import { ControllerSetup } from "./controllerSetup";
import { PartSetup } from "./partSetup";
import { RoleConfig } from "./roleConfig";
import { RoleSetup } from "./roleSetup";
import { Role } from "roles/roles";

export class SpawnConfig {

    public static GetNextScreep(controllerLevel: number, harvesters = 0, upgraders = 0, builders = 0, repairers = 0, collectors = 0, fillers = 0, workToDo = false, repairToDo = false, energyOut = false, sourceCount = 0): Role | undefined {
        const controllerSetup = this.ControllerConfig.find((setup) => setup.Level === controllerLevel);
        if (controllerSetup === undefined) {
            console.log('Controller setup not found');
            return;
        }
        return controllerSetup.GetNextRole(harvesters, upgraders, builders, repairers, collectors, fillers, workToDo, repairToDo, energyOut, sourceCount);
    }

    public static GetBodyParts(role: Role, energyAvailable: number, energyCapacityAvailable: number, harvesters = 0): BodyPartConstant[] | undefined {
        const roleSetup = this.PartConfig.find((setup) => setup.Role === role);
        if (roleSetup === undefined) {
            console.log('Role Setup not found');
            return;
        }
        return roleSetup.GetPartSetup(energyAvailable, energyCapacityAvailable, harvesters);
    }

    private static PartConfig = [
        new RoleSetup(Role.Harvester, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(400, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(550, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Upgrader, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(400, [WORK, WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(550, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Builder, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(400, [WORK, WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(550, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Repairer, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, MOVE, MOVE]),
            new PartSetup(300, [WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(350, [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(400, [WORK, WORK, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(450, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(500, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(550, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Collector, [
            new PartSetup(100, [CARRY, MOVE]),
            new PartSetup(150, [CARRY, MOVE, MOVE]),
            new PartSetup(200, [CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(250, [CARRY, CARRY, CARRY, MOVE, MOVE]),
            new PartSetup(300, [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(350, [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]),
            new PartSetup(400, [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]),
        ]),
        new RoleSetup(Role.Filler, [
            new PartSetup(200, [WORK, CARRY, MOVE]),
            new PartSetup(250, [WORK, CARRY, CARRY, MOVE]),
            new PartSetup(300, [WORK, WORK, CARRY, MOVE]),
            new PartSetup(350, [WORK, WORK, CARRY, CARRY, MOVE]),
            new PartSetup(400, [WORK, WORK, WORK, CARRY, MOVE]),
            new PartSetup(450, [WORK, WORK, WORK, CARRY, CARRY, MOVE]),
            new PartSetup(500, [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]),
            new PartSetup(550, [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]),
        ]),
    ]

    private static ControllerConfig = [
        new ControllerSetup(1, [
            new RoleConfig(1, Role.Harvester),
            new RoleConfig(2, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(2, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(3, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(4, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(5, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(6, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(7, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ]),
        new ControllerSetup(8, [
            new RoleConfig(2, Role.Harvester),
            new RoleConfig(2, Role.Filler),
            new RoleConfig(1, Role.Upgrader),
            new RoleConfig(2, Role.Builder),
            new RoleConfig(2, Role.Repairer),
            new RoleConfig(1, Role.Collector)
        ])
    ];
}


