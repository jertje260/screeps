import { Search } from "findStrategies/search";

export class HarvesterRole {

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
        }
        if (creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            this.findTarget(creep);
            creep.memory.working = false;
        }

        if (creep.memory.working) {
            const source = creep.room.find(FIND_STRUCTURES, { filter: { id: creep.memory.source } })[0];
            if (source == null) {
                console.log('source not found');
            }
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }

        if (!creep.memory.working) {
            let target = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { id: creep.memory.target }
            })[0];
            if (target === null) {
                this.findTarget(creep);
                target = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: { id: creep.memory.target }
                })[0];
            }
            const transferResult = creep.transfer(target, RESOURCE_ENERGY)
            if (transferResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            if (transferResult === ERR_FULL) {
                this.findTarget(creep);
            }
        }
    }


    private static findTarget(creep: Creep) {
        console.log('finding target');
        const targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure: StructureSpawn | StructureExtension | StructureTower) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            creep.memory.target = targets[0].id;
        }
    }
};
