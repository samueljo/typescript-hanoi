/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var game_1 = __webpack_require__(1);
	var hanoi_view_1 = __webpack_require__(2);
	$(function () {
	    var rootEl = $('.hanoi');
	    var game = new game_1.default();
	    new hanoi_view_1.default(game, rootEl);
	});
	//# sourceMappingURL=main.js.map

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);