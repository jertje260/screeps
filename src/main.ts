import { BuilderRole } from "roles/builder";
import { HarvesterRole } from "roles/harvester";
import { UpgraderRole } from "roles/upgrader";
import { Spawning } from "SpawnStrategy/spawning";
import { ErrorMapper } from "utils/ErrorMapper";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  // Automatically delete memory of missing creeps
  for (const creepName in Memory.creeps) {
    if (!(creepName in Game.creeps)) {
      delete Memory.creeps[creepName];
    }
  }

  for (const spawnKey in Game.spawns) {
    const spawn = Game.spawns[spawnKey];

    const harvesters = _.filter(Game.creeps, (harvester: Creep) => harvester.memory.role === Role.Harvester);
    const upgraders = _.filter(Game.creeps, (upgrader: Creep) => upgrader.memory.role === Role.Upgrader);
    const builders = _.filter(Game.creeps, (builder: Creep) => builder.memory.role === Role.Builder);

    Spawning.HandleSpawning(spawn, harvesters, builders, upgraders);
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
  }
});
