"use strict";
var View = (function () {
    function View(game, $el) {
        this.game = game;
        this.$el = $el;
        this.fromTowerIdx = null;
        this.$el.on('click', 'ul', this.clickTower.bind(this));
        this.setupTowers();
        this.render();
    }
    View.prototype.clickTower = function (event) {
        var clickedTowerIdx = $(event.currentTarget).index();
        if (this.fromTowerIdx === null) {
            this.fromTowerIdx = clickedTowerIdx;
        }
        else {
            if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
                alert('Invalid Move! Try Again.');
            }
            this.fromTowerIdx = null;
        }
        this.render();
        if (this.game.isWon()) {
            this.$el.off('click');
            this.$el.addClass('game-over');
            alert("Good Work!");
        }
    };
    View.prototype.setupTowers = function () {
        this.$el.empty();
        this.$el.addClass('group');
        var $tower;
        var $disk;
        for (var towerIdx = 0; towerIdx < 3; towerIdx++) {
            $tower = $('<ul>');
            for (var diskIdx = 0; diskIdx < 3; diskIdx++) {
                $disk = $('<li>');
                $tower.append($disk);
            }
            this.$el.append($tower);
        }
        ;
    };
    View.prototype.render = function () {
        var $towers = this.$el.find('ul');
        $towers.removeClass();
        if (this.fromTowerIdx !== null) {
            $towers.eq(this.fromTowerIdx).addClass('selected');
        }
        this.game.towers.forEach(function (disks, towerIdx) {
            var $disks = $towers.eq(towerIdx).children();
            $disks.removeClass();
            disks.forEach(function (diskWidth, diskIdx) {
                $disks.eq(-1 * (diskIdx + 1)).addClass("disk-" + diskWidth);
            });
        });
    };
    return View;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = View;
//# sourceMappingURL=hanoi-view.js.map