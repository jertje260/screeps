import { SpawnConfig } from "./spawnConfig";

export class Spawning {
    public static HandleSpawning(spawn: StructureSpawn, harvesters: Creep[], builders: Creep[], upgraders: Creep[], repairers: Creep[]) {
        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                'Building ' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        } else {
            const hasConstructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0;
            const hasRepairs = _.filter(spawn.room.find(FIND_STRUCTURES), (structure: AnyStructure) =>
                structure.hits < structure.hitsMax
            ).length > 0;
            if (spawn.room.controller === undefined) {
                return;
            }
            const nextRole = SpawnConfig.GetNextScreep(spawn.room.controller.level, harvesters.length, upgraders.length, builders.length, repairers.length, hasConstructionSites, hasRepairs);

            if (nextRole !== undefined) {
                const bodyParts = SpawnConfig.GetBodyParts(nextRole, spawn.room.energyAvailable, spawn.room.energyCapacityAvailable, harvesters.length, upgraders.length, builders.length, repairers.length);
                if (bodyParts !== undefined) {
                    const name = nextRole.toString() + Game.time;
                    if (spawn.spawnCreep(bodyParts, name, { memory: { role: nextRole, room: spawn.room.name, working: false, building: false } }) !== ERR_NOT_ENOUGH_ENERGY) {
                        console.log(`Spawning ${name}`);
                    };
                }
            }
        }
    }
}
