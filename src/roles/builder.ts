import { Search } from "findStrategies/search";

export class BuilderRole {

    public static run(creep: Creep): void {
        if (creep.ticksToLive !== undefined && creep.ticksToLive < 20) {
            creep.drop(RESOURCE_ENERGY);
            if (creep.carry.energy == 0) {
                creep.suicide();
            }
            return;
        }
        if (!creep.memory.working && creep.carry.energy === 0) {
            Search.SetNearestSource(creep, true);
            creep.say('get energy');
        }
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = false;
            this.findSite(creep);
            creep.say('🚧 build');
        }

        if (!creep.memory.working) {
            console.log('working');
            const buildTargets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, { filter: { id: creep.memory.target } });
            if (buildTargets.length > 0) {
                if (creep.build(buildTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                console.log('finding site');
                this.findSite(creep);
            }
        }
        else {
            console.log('going to source');
            const sources = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.source } });
            if (creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    private static findSite(creep: Creep): void {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            targets = this.SortSites(targets);
            console.log(targets[0].structureType);
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
