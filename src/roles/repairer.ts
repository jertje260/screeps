export class RepairerRole {
    public static run(creep: Creep) {
        if (creep.ticksToLive !== undefined && creep.ticksToLive < 20) {
            creep.drop(RESOURCE_ENERGY);
            if (creep.carry.energy == 0) {
                creep.suicide();
            }
            return;
        }
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.memory.target = undefined;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
            this.findSite(creep);
            creep.say('🚧 build');
        }
        if (creep.memory.working) {
            const upgradeTarget = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.target } });
            if (upgradeTarget.length > 0 && upgradeTarget[0].hits !== upgradeTarget[0].hitsMax) {
                if (creep.repair(upgradeTarget[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgradeTarget[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                this.findSite(creep);
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    public static SortUpgradables(structures: AnyStructure[]): AnyStructure[] {
        return structures.sort((a, b) => {
            if (a.hits > b.hits) {
                return 1;
            }
            if (a.hits < b.hits) {
                return -1;
            }
            return 0;
        });
    }

    private static findSite(creep: Creep): void {

        let upgradables = _.filter(creep.room.find(FIND_STRUCTURES), (structure: AnyStructure) => structure.hits !== structure.hitsMax);
        if (upgradables.length > 0) {
            upgradables = this.SortUpgradables(upgradables);
            console.log(upgradables[0].structureType);
            creep.memory.target = upgradables[0].id;
        } else {
            console.log('no repairs possible');
        }
    }
}
