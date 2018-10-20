export class Building {
    public static BuildDefaultStructures(spawn: StructureSpawn): void {
        const sources = spawn.room.find(FIND_SOURCES);
        for (let i = 0; i < sources.length; i++) {
            let pos = sources[i].pos;
            spawn.room.createConstructionSite(pos.x + 1, pos.y, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x + 1, pos.y + 1, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x + 1, pos.y - 1, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x - 1, pos.y, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x - 1, pos.y + 1, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x - 1, pos.y - 1, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x, pos.y + 1, STRUCTURE_ROAD);
            spawn.room.createConstructionSite(pos.x, pos.y - 1, STRUCTURE_ROAD);
        }
    }


}
