export class BuilderRole {

    public static run(creep: Creep): void {

        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
            this.findSite(creep);
            creep.say('🚧 build');
        }

        if (creep.memory.working) {
            const buildTargets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, { filter: { id: creep.memory.target } });
            if (buildTargets.length > 0) {
                if (creep.build(buildTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                this.findSite(creep);
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    private static findSite(creep: Creep): void {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            targets = this.SortSites(targets);
            console.log(targets[0].structureType);
            creep.memory.building = true;
            creep.memory.target = targets[0].id;
            return;
        }
    }

    public static SortSites(sites: ConstructionSite<BuildableStructureConstant>[]) {
        return sites.sort((a, b) => {
            if (a.structureType > b.structureType) {
                return 1;
            }
            if (a.structureType < b.structureType) {
                return -1;
            }
            if (a.progress > b.progress) {
                return -1;
            }
            if (a.progress < b.progress) {
                return 1;
            }
            return 0;
        });
    }
};
