export class UpgraderRole {

    public static run(creep: Creep): void {
        if (creep.ticksToLive !== undefined && creep.ticksToLive < 20) {
            creep.drop(RESOURCE_ENERGY);
            if (creep.carry.energy == 0) {
                creep.suicide();
            }
            return;
        }
        if (!creep.memory.working && creep.carry.energy === 0) {
            creep.say('finding resources');
            const nearestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter:
                    (structure: Structure<STRUCTURE_CONTAINER>) => structure.structureType == STRUCTURE_CONTAINER
            }
            );
            if (nearestContainer === null) {
                console.log('no container found');
            } else {
                creep.memory.source = nearestContainer.id
                creep.memory.working = true;
            }
        }
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = false;
            creep.say('⚡ upgrade');
        }

        if (!creep.memory.working) {
            if (creep.room.controller !== undefined && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            const sources = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.source } });
            if (creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};
