import { SpawnConfig } from "./spawnConfig";
import { Role } from "roles/roles";

export class Spawning {
    public static HandleSpawning(spawn: StructureSpawn) {
        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                'Building ' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        } else {
            // if there is no controller, no use in spawning
            if (spawn.room.controller === undefined) {
                return;
            }
            // creeps with their roles, maybe more efficient to set these values on spawn/death
            const harvesters = _.filter(Game.creeps, (harvester: Creep) => harvester.memory.role === Role.Harvester && harvester.room == spawn.room);
            const upgraders = _.filter(Game.creeps, (upgrader: Creep) => upgrader.memory.role === Role.Upgrader && upgrader.room == spawn.room);
            const builders = _.filter(Game.creeps, (builder: Creep) => builder.memory.role === Role.Builder && builder.room == spawn.room);
            const repairers = _.filter(Game.creeps, (repairer: Creep) => repairer.memory.role === Role.Repairer && repairer.room == spawn.room);
            const collectors = _.filter(Game.creeps, (collector: Creep) => collector.memory.role === Role.Collector && collector.room == spawn.room);
            const fillers = _.filter(Game.creeps, (filler: Creep) => filler.memory.role === Role.Filler && filler.room == spawn.room);

            // booleans to find what needs to be spawned
            const hasConstructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0;
            const hasRepairs = _.filter(spawn.room.find(FIND_STRUCTURES), (structure: AnyStructure) => structure.hits < structure.hitsMax).length > 0;
            const hasEnergyOut = spawn.room.find(FIND_DROPPED_RESOURCES).length > 0;
            let sources = spawn.room.find(FIND_SOURCES);

            // find next role to be spawned
            const nextRole = SpawnConfig.GetNextScreep(spawn.room.controller.level, harvesters.length, upgraders.length, builders.length, repairers.length, collectors.length, fillers.length, hasConstructionSites, hasRepairs, hasEnergyOut, sources.length);
            if (nextRole !== undefined) {
                const bodyParts = SpawnConfig.GetBodyParts(nextRole, spawn.room.energyAvailable, spawn.room.energyCapacityAvailable, harvesters.length);
                if (bodyParts !== undefined) {
                    const name = nextRole + Game.time;
                    let source;
                    if (nextRole === Role.Filler) {
                        let uncoveredSource = _.filter(sources, (s: Source) => { return !fillers.find((creep: Creep) => { return creep.memory.source == s.id }) })[0];
                        source = uncoveredSource.id;
                    }
                    if (spawn.spawnCreep(bodyParts, name, { memory: { role: nextRole, room: spawn.room.name, working: false, building: false, source: source } }) !== ERR_NOT_ENOUGH_ENERGY) {
                        console.log(`Spawning ${name}`);
                    };
                }
            }
        }
    }
}
