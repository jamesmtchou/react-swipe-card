"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hammerjs = _interopRequireDefault(require("hammerjs"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _SimpleCard = _interopRequireDefault(require("./SimpleCard"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DraggableCard =
/*#__PURE__*/
function (_Component) {
  _inherits(DraggableCard, _Component);

  function DraggableCard(props) {
    var _this;

    _classCallCheck(this, DraggableCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DraggableCard).call(this, props));
    _this.state = {
      x: 0,
      y: 0,
      initialPosition: {
        x: 0,
        y: 0
      },
      startPosition: {
        x: 0,
        y: 0
      },
      animation: null,
      pristine: true
    };
    _this.resetPosition = _this.resetPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePan = _this.handlePan.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DraggableCard, [{
    key: "resetPosition",
    value: function resetPosition() {
      var _this$props$container = this.props.containerSize,
          x = _this$props$container.x,
          y = _this$props$container.y;

      var card = _reactDom.default.findDOMNode(this);

      var initialPosition = {
        x: Math.round((x - card.offsetWidth) / 2),
        y: Math.round((y - card.offsetHeight) / 2)
      };
      this.setState({
        x: initialPosition.x,
        y: initialPosition.y,
        initialPosition: initialPosition,
        startPosition: {
          x: 0,
          y: 0
        }
      });
    }
  }, {
    key: "panstart",
    value: function panstart() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      this.setState({
        animation: false,
        startPosition: {
          x: x,
          y: y
        },
        pristine: false
      });
    }
  }, {
    key: "panend",
    value: function panend(ev) {
      var _this2 = this;

      var screen = this.props.containerSize;

      var card = _reactDom.default.findDOMNode(this);

      var getDirection = function getDirection() {
        switch (true) {
          case _this2.state.x < -50:
            return 'Left';

          case _this2.state.x + (card.offsetWidth - 50) > screen.x:
            return 'Right';

          case _this2.state.y < -50:
            return 'Top';

          case _this2.state.y + (card.offsetHeight - 50) > screen.y:
            return 'Bottom';

          default:
            return false;
        }
      };

      var direction = getDirection();

      if (this.props["onSwipe".concat(direction)]) {
        this.props["onSwipe".concat(direction)]();
        this.props["onOutScreen".concat(direction)](this.props.index);
      } else {
        this.resetPosition();
        this.setState({
          animation: true
        });
      }
    }
  }, {
    key: "panmove",
    value: function panmove(ev) {
      this.setState(this.calculatePosition(ev.deltaX, ev.deltaY));
    }
  }, {
    key: "pancancel",
    value: function pancancel(ev) {
      console.log(ev.type);
    }
  }, {
    key: "handlePan",
    value: function handlePan(ev) {
      ev.preventDefault();
      this[ev.type](ev);
      return false;
    }
  }, {
    key: "handleSwipe",
    value: function handleSwipe(ev) {
      console.log(ev.type);
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition(deltaX, deltaY) {
      var _this$state$initialPo = this.state.initialPosition,
          x = _this$state$initialPo.x,
          y = _this$state$initialPo.y;
      return {
        x: x + deltaX,
        y: y + deltaY
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.hammer = new _hammerjs.default.Manager(_reactDom.default.findDOMNode(this));
      this.hammer.add(new _hammerjs.default.Pan({
        threshold: 2
      }));
      this.hammer.on('panstart panend pancancel panmove', this.handlePan);
      this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe);
      this.resetPosition();
      window.addEventListener('resize', this.resetPosition);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
        this.hammer = null;
      }

      window.removeEventListener('resize', this.resetPosition);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          x = _this$state2.x,
          y = _this$state2.y,
          animation = _this$state2.animation,
          pristine = _this$state2.pristine;
      var style = (0, _utils.translate3d)(x, y);
      return _react.default.createElement(_SimpleCard.default, _extends({}, this.props, {
        style: style,
        className: animation ? 'animate' : pristine ? 'inactive' : ''
      }));
    }
  }]);

  return DraggableCard;
}(_react.Component);

var _default = DraggableCard;
exports.default = _default;