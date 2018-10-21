export class HarvesterRole {

    public static run(creep: Creep): void {
        if (creep.ticksToLive !== undefined && creep.ticksToLive < 20) {
            creep.drop(RESOURCE_ENERGY);
            if (creep.carry.energy == 0) {
                creep.suicide();
            }
            return;
        }
        if (creep.carry.energy < creep.carryCapacity) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            const targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure: StructureSpawn | StructureExtension | StructureTower) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
