export class PartSetup {
    public Energy: number;
    public Parts: BodyPartConstant[];
    constructor(energy: number, parts: BodyPartConstant[]) {
        this.Energy = energy;
        this.Parts = parts;
    }
}
