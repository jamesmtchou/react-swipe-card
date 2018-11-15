"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRECTIONS = exports.translate3d = void 0;

var translate3d = function translate3d(x, y) {
  var translate = "translate3d(".concat(x, "px, ").concat(y, "px, 0px)");
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  };
};

exports.translate3d = translate3d;
var DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom'];
exports.DIRECTIONS = DIRECTIONS;