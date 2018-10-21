export class CollectorRole {
    public static run(creep: Creep) {
        if (creep.ticksToLive !== undefined && creep.ticksToLive < 20) {
            creep.drop(RESOURCE_ENERGY);
            if (creep.carry.energy == 0) {
                creep.suicide();
            }
            return;
        }
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
            this.findSite(creep);
            creep.say('🚧 build');
        }

        if (creep.memory.working) {
            const resources = creep.room.find(FIND_DROPPED_RESOURCES, { filter: { id: creep.memory.target } });
            if (resources.length > 0) {
                if (creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(resources[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                this.findSite(creep);
            }
        }
        else {
            const containers = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure: StructureContainer) => {
                    return structure.structureType === STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity;
                }
            });
            if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    private static findSite(creep: Creep): void {
        let targets = creep.room.find(FIND_DROPPED_RESOURCES);
        if (targets.length > 0) {
            targets = this.SortSites(targets);
            creep.memory.working = true;
            creep.memory.target = targets[0].id;
            return;
        }
    }

    public static SortSites(sites: Resource<ResourceConstant>[]) {
        return sites.sort((a, b) => {
            if (a.amount > b.amount) {
                return 1;
            }
            if (a.amount < b.amount) {
                return -1;
            }
            return 0;
        });
    }
}
