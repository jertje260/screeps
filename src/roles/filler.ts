export class FillerRole {
    public static run(creep: Creep) {
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            if (creep.memory.target === undefined) {
                let nearestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: { structureType: STRUCTURE_CONTAINER }
                });
                if (nearestContainer !== null) {
                    creep.memory.target = nearestContainer.id;
                } else {
                    console.log("Couldn't find a container nearby");
                }
            }
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            let target = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.target } })[0];
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            let source = creep.room.find(FIND_SOURCES, { filter: { id: creep.memory.source } })[0];
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
}
