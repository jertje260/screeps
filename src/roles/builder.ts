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
            const target = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: { id: creep.memory.target } })[0];
            if (target) {
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                this.findSite(creep);
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    private static findSite(creep: Creep): void {
        console.log(`Finding new site for ${creep.name}`);
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        targets = targets.sort((a, b) => {
            if (a.progress > b.progress) {
                return -1;
            }
            if (a.progress < b.progress) {
                return 1;
            }
            return 0;
        })
        creep.memory.target = targets[0].id;
    }
};
