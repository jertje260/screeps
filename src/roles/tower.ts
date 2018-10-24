export class TowerRole {
    public static run(tower: StructureTower){
        const closestEnemy = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if(closestEnemy === null){
            const enemies = tower.room.find(FIND_HOSTILE_CREEPS);
            if(enemies.length === 0){
            console.log('no enemies');
            } else {
                tower.attack(enemies[0]);
            }
        }
        else {
            tower.attack(closestEnemy);
        }

    }
}