"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var SwipeCards =
/*#__PURE__*/
function (_Component) {
  _inherits(SwipeCards, _Component);

  function SwipeCards(props) {
    var _this;

    _classCallCheck(this, SwipeCards);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SwipeCards).call(this, props));
    _this.state = {
      index: 0,
      alertLeft: false,
      alertRight: false,
      alertTop: false,
      alertBottom: false,
      containerSize: {
        x: 0,
        y: 0
      }
    };
    _this.removeCard = _this.removeCard.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setSize = _this.setSize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SwipeCards, [{
    key: "removeCard",
    value: function removeCard(side, cardId) {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          onEnd = _this$props.onEnd;
      setTimeout(function () {
        return _this2.setState(_defineProperty({}, "alert".concat(side), false));
      }, 300);
      if (children.length === this.state.index + 1 && onEnd) onEnd();
      this.setState(_defineProperty({
        index: this.state.index + 1
      }, "alert".concat(side), true));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setSize();
      window.addEventListener('resize', this.setSize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setSize);
    }
  }, {
    key: "setSize",
    value: function setSize() {
      var container = _reactDom.default.findDOMNode(this);

      var containerSize = {
        x: container.offsetWidth,
        y: container.offsetHeight
      };
      this.setState({
        containerSize: containerSize
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          index = _this$state.index,
          containerSize = _this$state.containerSize;
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          onSwipeTop = _this$props2.onSwipeTop,
          onSwipeBottom = _this$props2.onSwipeBottom;
      if (!containerSize.x || !containerSize.y) return _react.default.createElement("div", {
        className: className
      });

      var _cards = children.reduce(function (memo, c, i) {
        if (index > i) return memo;

        var props = _objectSpread({
          key: i,
          containerSize: containerSize,
          index: children.length - index
        }, _utils.DIRECTIONS.reduce(function (m, d) {
          return _objectSpread({}, m, _defineProperty({}, "onOutScreen".concat(d), function onOutScreen() {
            return _this3.removeCard(d);
          }));
        }, {}), {
          active: index === i
        });

        return [(0, _react.cloneElement)(c, props)].concat(_toConsumableArray(memo));
      }, []);

      return _react.default.createElement("div", {
        className: className
      }, _utils.DIRECTIONS.map(function (d) {
        return _react.default.createElement("div", {
          key: d,
          className: "".concat(_this3.state["alert".concat(d)] ? 'alert-visible' : '', " alert-").concat(d.toLowerCase(), " alert")
        }, _this3.props["alert".concat(d)]);
      }), _react.default.createElement("div", {
        id: "cards"
      }, _cards));
    }
  }]);

  return SwipeCards;
}(_react.Component);

var _default = SwipeCards;
exports.default = _default;