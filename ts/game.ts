export default class Game {
  towers: number[][];

  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx: number, endTowerIdx: number): boolean {
    const startTower: number[] = this.towers[startTowerIdx];
    const endTower: number[] = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length === 0) {
      return true;
    } else {
      const topStartDisc: number = startTower[startTower.length - 1];
      const topEndDisc: number = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  }

  isWon(): boolean {
    return (this.towers[2].length === 3) || (this.towers[1].length === 3);
  }

  move(startTowerIdx: number, endTowerIdx: number): boolean {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  }
}
