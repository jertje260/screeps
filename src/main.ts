import { BuilderRole } from "roles/builder";
import { HarvesterRole } from "roles/harvester";
import { UpgraderRole } from "roles/upgrader";
import { Spawning } from "SpawnStrategy/spawning";
import { ErrorMapper } from "utils/ErrorMapper";
import { Role } from "roles/roles";
import { RepairerRole } from "roles/repairer";
import { Building } from "Building/building";
import { CollectorRole } from "roles/collecter";
import { FillerRole } from "roles/filler";
import { TowerRole } from "roles/tower";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Game time: ${Game.time}`);
  // Automatically delete memory of missing creeps
  for (const creepName in Memory.creeps) {
    if (!(creepName in Game.creeps)) {
      delete Memory.creeps[creepName];
    }
  }

  for (const spawnKey in Game.spawns) {
    const spawn = Game.spawns[spawnKey];

    Spawning.HandleSpawning(spawn);

    Building.BuildDefaultStructures(spawn);

    const towers = spawn.room.find(FIND_MY_STRUCTURES, { filter: (tower: Structure<STRUCTURE_TOWER>) => tower.structureType === STRUCTURE_TOWER });

    towers.forEach(tower => {
      if (tower.structureType === STRUCTURE_TOWER) {
        TowerRole.run(tower);
      }
    });
  }



  for (const screepName in Game.creeps) {
    const currentCreep = Game.creeps[screepName];
    if (currentCreep.memory.role === Role.Harvester) {
      HarvesterRole.run(currentCreep);
    }
    if (currentCreep.memory.role === Role.Upgrader) {
      UpgraderRole.run(currentCreep);
    }
    if (currentCreep.memory.role === Role.Builder) {
      BuilderRole.run(currentCreep);
    }
    if (currentCreep.memory.role === Role.Repairer) {
      RepairerRole.run(currentCreep);
    }
    if (currentCreep.memory.role === Role.Collector) {
      CollectorRole.run(currentCreep);
    }
    if (currentCreep.memory.role === Role.Filler) {

      FillerRole.run(currentCreep);
    }
  }
});
