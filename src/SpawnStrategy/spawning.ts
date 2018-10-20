import { SpawnConfig } from "./spawnConfig";

export class Spawning {
    public static HandleSpawning(spawn: StructureSpawn, harvesters: Creep[], builders: Creep[], upgraders: Creep[]) {
        const hasConstructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0;
        if (spawn.room.controller === undefined) {
            return;
        }
        const nextRole = SpawnConfig.GetNextScreep(spawn.room.controller.level, harvesters.length, upgraders.length, builders.length, hasConstructionSites);
        if (nextRole !== undefined) {
            const bodyParts = SpawnConfig.GetBodyParts(nextRole, spawn.room.energyAvailable, spawn.room.energyCapacityAvailable);
            if (bodyParts !== undefined) {
                const name = nextRole.toString() + Game.time;
                if (spawn.spawnCreep(bodyParts, name, { memory: { role: nextRole, room: spawn.room.name, working: false } }) !== ERR_NOT_ENOUGH_ENERGY) {
                    console.log(`Spawning ${name}`);
                };
            }
        }

        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role.toString(),
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
}
