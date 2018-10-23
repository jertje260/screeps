export class FillerRole {
    public static run(creep: Creep) {
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            if (creep.memory.target === undefined) {
                this.findTarget(creep);
            }
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            if (creep.memory.target === undefined) {
                this.findTarget(creep);
            }
            let targets = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.target } });
            if (targets.length === 0) {
                this.findTarget(creep);
            } else {
                const transferResult = creep.transfer(targets[0], RESOURCE_ENERGY);
                if (transferResult === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
                if (transferResult === ERR_FULL) {
                    console.log('container full, finding another one');
                    this.findTarget(creep);
                }
            }
        } else {
            let source = creep.room.find(FIND_SOURCES, { filter: { id: creep.memory.source } })[0];
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }

    private static findTarget(creep: Creep) {
        let nearestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        });
        if (nearestContainer !== null) {
            creep.memory.target = nearestContainer.id;
        } else {
            console.log("Couldn't find a container nearby to fill");
        }
    }
}
