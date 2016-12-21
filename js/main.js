"use strict";
var game_1 = require("./game");
var hanoi_view_1 = require("./hanoi-view");
$(function () {
    var rootEl = $('.hanoi');
    var game = new game_1.default();
    new hanoi_view_1.default(game, rootEl);
});
//# sourceMappingURL=main.js.map