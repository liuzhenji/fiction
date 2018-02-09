'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import abc from 'abc'

var Counter = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Counter;
}(_wepy2.default.component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.props = {
    num: {
      type: [Number, String],
      coerce: function coerce(v) {
        return +v;
      },
      default: 50
    }
  };
  this.data = {};
  this.events = {
    'index-broadcast': function indexBroadcast() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
  this.watch = {
    num: function num(curVal, oldVal) {
      console.log('\u65E7\u503C\uFF1A' + oldVal + '\uFF0C\u65B0\u503C\uFF1A' + curVal);
    }
  };
  this.methods = {
    plus: function plus() {
      this.num = this.num + 1;
      console.log(this.$name + ' plus tap');

      this.$emit('index-emit', 1, 2, 3);
    },
    minus: function minus() {
      this.num = this.num - 1;
      console.log(this.$name + ' minus tap');
    }
  };
};

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsImNvbXBvbmVudCIsInByb3BzIiwibnVtIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImNvZXJjZSIsInYiLCJkZWZhdWx0IiwiZGF0YSIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiLCJ3YXRjaCIsImN1clZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJwbHVzIiwiJGVtaXQiLCJtaW51cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQTs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFnQixlQUFLQyxTOzs7OztPQUN4Q0MsSyxHQUFRO0FBQ05DLFNBQUs7QUFDSEMsWUFBTSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsQ0FESDtBQUVIQyxjQUFRLGdCQUFVQyxDQUFWLEVBQWE7QUFDbkIsZUFBTyxDQUFDQSxDQUFSO0FBQ0QsT0FKRTtBQUtIQyxlQUFTO0FBTE47QUFEQyxHO09BVVJDLEksR0FBTyxFO09BRVBDLE0sR0FBUztBQUNQLHVCQUFtQiwwQkFBYTtBQUFBOztBQUM5QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQUMsY0FBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7T0FPVEcsSyxHQUFRO0FBQ05oQixPQURNLGVBQ0RpQixNQURDLEVBQ09DLE1BRFAsRUFDZTtBQUNuQlAsY0FBUUMsR0FBUix3QkFBa0JNLE1BQWxCLGdDQUErQkQsTUFBL0I7QUFDRDtBQUhLLEc7T0FNUkUsTyxHQUFVO0FBQ1JDLFFBRFEsa0JBQ0E7QUFDTixXQUFLcEIsR0FBTCxHQUFXLEtBQUtBLEdBQUwsR0FBVyxDQUF0QjtBQUNBVyxjQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBTCxHQUFhLFdBQXpCOztBQUVBLFdBQUtRLEtBQUwsQ0FBVyxZQUFYLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CO0FBQ0QsS0FOTztBQU9SQyxTQVBRLG1CQU9DO0FBQ1AsV0FBS3RCLEdBQUwsR0FBVyxLQUFLQSxHQUFMLEdBQVcsQ0FBdEI7QUFDQVcsY0FBUUMsR0FBUixDQUFZLEtBQUtDLEtBQUwsR0FBYSxZQUF6QjtBQUNEO0FBVk8sRzs7O2tCQTFCU2hCLE8iLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gIC8vIGltcG9ydCBhYmMgZnJvbSAnYWJjJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIG51bToge1xyXG4gICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXHJcbiAgICAgICAgY29lcmNlOiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgcmV0dXJuICt2O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVmYXVsdDogNTBcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICB9XHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1icm9hZGNhc3QnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICBudW0gKGN1clZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYOaXp+WAvO+8miR7b2xkVmFsfe+8jOaWsOWAvO+8miR7Y3VyVmFsfWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgcGx1cyAoKSB7XHJcbiAgICAgICAgdGhpcy5udW0gPSB0aGlzLm51bSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgcGx1cyB0YXAnKTtcclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5kZXgtZW1pdCcsIDEsIDIsIDMpO1xyXG4gICAgICB9LFxyXG4gICAgICBtaW51cyAoKSB7XHJcbiAgICAgICAgdGhpcy5udW0gPSB0aGlzLm51bSAtIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgbWludXMgdGFwJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==