// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: Role;
  room: string;
  working: boolean;
  target?: string;
}

interface Memory {
  uuid: number;
  log: any;
}

declare enum Role {
  Harvester = 1,
  Builder = 2,
  Upgrader = 3
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
