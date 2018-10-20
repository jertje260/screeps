
import { BuilderRole } from "roles/builder";

test('roads last', () => {
    expect(
        BuilderRole.SortSites(
            [
                {
                    id: "a",
                    structureType: STRUCTURE_ROAD,
                    my: true,
                    owner: { username: "DutchJer" },
                    progress: 0,
                    progressTotal: 0,
                }: ConstructionSite<BuildableStructureConstant>
            ])
        [0].structureType
})
