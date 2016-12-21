"use strict";
var Game = (function () {
    function Game() {
        this.towers = [[3, 2, 1], [], []];
    }
    Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
        var startTower = this.towers[startTowerIdx];
        var endTower = this.towers[endTowerIdx];
        if (startTower.length === 0) {
            return false;
        }
        else if (endTower.length === 0) {
            return true;
        }
        else {
            var topStartDisc = startTower[startTower.length - 1];
            var topEndDisc = endTower[endTower.length - 1];
            return topStartDisc < topEndDisc;
        }
    };
    Game.prototype.isWon = function () {
        return (this.towers[2].length === 3) || (this.towers[1].length === 3);
    };
    Game.prototype.move = function (startTowerIdx, endTowerIdx) {
        if (this.isValidMove(startTowerIdx, endTowerIdx)) {
            this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
//# sourceMappingURL=game.js.map