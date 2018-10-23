export class Search {
    public static SetNearestSource(creep: Creep, workingSuccess: boolean | null) {
        let container = creep.room.find(FIND_STRUCTURES, { filter: (structure: StructureContainer) => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy > 0 });
        if (container.length === 0) {
            console.log('No container with energy nearby');
        } else {
            creep.memory.source = container[0].id;
            if (workingSuccess !== null) {
                creep.memory.working = workingSuccess;
            }
        }
    }
}
