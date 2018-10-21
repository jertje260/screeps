export class Building {
    public static BuildDefaultStructures(spawn: StructureSpawn): void {
        if (!spawn.memory.defaultRoads) {
            const sources = spawn.room.find(FIND_SOURCES);
            const terrain = Game.map.getRoomTerrain(spawn.room.name);
            for (const source of sources) {
                const pos = source.pos;
                const positions = [
                    { x: pos.x + 1, y: pos.y },
                    { x: pos.x + 1, y: pos.y + 1 },
                    { x: pos.x + 1, y: pos.y - 1 },
                    { x: pos.x - 1, y: pos.y },
                    { x: pos.x - 1, y: pos.y + 1 },
                    { x: pos.x - 1, y: pos.y - 1 },
                    { x: pos.x, y: pos.y + 1 },
                    { x: pos.x, y: pos.y - 1 }
                ];
                for (const position of positions) {
                    const terrainType = terrain.get(position.x, position.y);
                    console.log(terrainType);
                    if (terrainType !== TERRAIN_MASK_WALL && terrainType !== TERRAIN_MASK_LAVA) {
                        spawn.room.createConstructionSite(position.x, position.y, STRUCTURE_ROAD);
                    }
                }

            }
            spawn.memory.defaultRoads = true;
        }
    }


}
