'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Charge = function (_wepy$page) {
  _inherits(Charge, _wepy$page);

  function Charge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Charge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Charge.__proto__ || Object.getPrototypeOf(Charge)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      chargeTypes: new Array(),
      checkedIndex: 0,
      checkedBorderColor: '#2196F3',
      uncheckedBorderColor: '#eee',
      balance: null,
      unit: _util2.default.unit
    }, _this.methods = {
      onRadioChange: function onRadioChange(e) {
        this.checkedIndex = e.detail.value;
        this.$apply();
      },
      tapChargeBtn: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var chargeType, _ref3, data, session;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  //唤起微信支付功能
                  //充值记录
                  chargeType = this.chargeTypes[this.checkedIndex];
                  _context.next = 3;
                  return _util2.default.post({
                    url: _util2.default.urlPrefix + '/chargeproducts',
                    data: {
                      chargeTypeId: chargeType.id
                    }
                  });

                case 3:
                  _ref3 = _context.sent;
                  data = _ref3.data;

                  if (data) {
                    _wepy2.default.showToast({
                      title: '充值成功'
                    });
                    //更新本地用户余额
                    session = _wepy2.default.getStorageSync('session');

                    session.user.balance += chargeType.balance + (chargeType.bonusType ? chargeType.bonusType.price * _util2.default.ratio : 0);
                    _wepy2.default.setStorageSync('session', session);
                    this.balance = session.user.balance;
                    this.$apply();
                  }

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function tapChargeBtn() {
          return _ref2.apply(this, arguments);
        }

        return tapChargeBtn;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Charge, [{
    key: 'onLoad',
    value: function onLoad() {
      this.balance = _wepy2.default.getStorageSync('session').user.balance;
      this.$apply();
      this._loadChargeTypes();
    }

    /**
     * 加载充值产品列表
     */

  }, {
    key: '_loadChargeTypes',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref5, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chargetypes'
                });

              case 2:
                _ref5 = _context2.sent;
                data = _ref5.data;

                if (data.result) {
                  this.chargeTypes = data.result;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loadChargeTypes() {
        return _ref4.apply(this, arguments);
      }

      return _loadChargeTypes;
    }()
  }]);

  return Charge;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Charge , 'pages/Charge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJnZS5qcyJdLCJuYW1lcyI6WyJDaGFyZ2UiLCJkYXRhIiwiY2hhcmdlVHlwZXMiLCJBcnJheSIsImNoZWNrZWRJbmRleCIsImNoZWNrZWRCb3JkZXJDb2xvciIsInVuY2hlY2tlZEJvcmRlckNvbG9yIiwiYmFsYW5jZSIsInVuaXQiLCJtZXRob2RzIiwib25SYWRpb0NoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInRhcENoYXJnZUJ0biIsImNoYXJnZVR5cGUiLCJwb3N0IiwidXJsIiwidXJsUHJlZml4IiwiY2hhcmdlVHlwZUlkIiwiaWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsInNlc3Npb24iLCJnZXRTdG9yYWdlU3luYyIsInVzZXIiLCJib251c1R5cGUiLCJwcmljZSIsInJhdGlvIiwic2V0U3RvcmFnZVN5bmMiLCJfbG9hZENoYXJnZVR5cGVzIiwiZmV0Y2giLCJyZXN1bHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxJLEdBQU87QUFDTEMsbUJBQWEsSUFBSUMsS0FBSixFQURSO0FBRUxDLG9CQUFjLENBRlQ7QUFHTEMsMEJBQW9CLFNBSGY7QUFJTEMsNEJBQXNCLE1BSmpCO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxZQUFNLGVBQU1BO0FBTlAsSyxRQVNQQyxPLEdBQVU7QUFDUkMsbUJBRFEseUJBQ01DLENBRE4sRUFDUztBQUNmLGFBQUtQLFlBQUwsR0FBb0JPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBN0I7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtGQyxrQkFMRTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNTjtBQUNBO0FBQ01DLDRCQVJBLEdBUWEsS0FBS2QsV0FBTCxDQUFpQixLQUFLRSxZQUF0QixDQVJiO0FBQUE7QUFBQSx5QkFTaUIsZUFBTWEsSUFBTixDQUFXO0FBQ2hDQyx5QkFBUSxlQUFNQyxTQUFkLG9CQURnQztBQUVoQ2xCLDBCQUFNO0FBQ0ptQixvQ0FBY0osV0FBV0s7QUFEckI7QUFGMEIsbUJBQVgsQ0FUakI7O0FBQUE7QUFBQTtBQVNFcEIsc0JBVEYsU0FTRUEsSUFURjs7QUFlTixzQkFBSUEsSUFBSixFQUFVO0FBQ1IsbUNBQUtxQixTQUFMLENBQWU7QUFDYkMsNkJBQU87QUFETSxxQkFBZjtBQUdBO0FBQ0lDLDJCQUxJLEdBS00sZUFBS0MsY0FBTCxDQUFvQixTQUFwQixDQUxOOztBQU1SRCw0QkFBUUUsSUFBUixDQUFhbkIsT0FBYixJQUF5QlMsV0FBV1QsT0FBWCxJQUFzQlMsV0FBV1csU0FBWCxHQUF1QlgsV0FBV1csU0FBWCxDQUFxQkMsS0FBckIsR0FBNkIsZUFBTUMsS0FBMUQsR0FBa0UsQ0FBeEYsQ0FBekI7QUFDQSxtQ0FBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQk4sT0FBL0I7QUFDQSx5QkFBS2pCLE9BQUwsR0FBZWlCLFFBQVFFLElBQVIsQ0FBYW5CLE9BQTVCO0FBQ0EseUJBQUtPLE1BQUw7QUFDRDs7QUF6Qks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7Ozs2QkE2QkQ7QUFDUCxXQUFLUCxPQUFMLEdBQWUsZUFBS2tCLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JDLElBQS9CLENBQW9DbkIsT0FBbkQ7QUFDQSxXQUFLTyxNQUFMO0FBQ0EsV0FBS2lCLGdCQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJdUIsZUFBTUMsS0FBTixDQUFZO0FBQy9CZCx1QkFBUSxlQUFNQyxTQUFkO0FBRCtCLGlCQUFaLEM7Ozs7QUFBZmxCLG9CLFNBQUFBLEk7O0FBR04sb0JBQUlBLEtBQUtnQyxNQUFULEVBQWlCO0FBQ2YsdUJBQUsvQixXQUFMLEdBQW1CRCxLQUFLZ0MsTUFBeEI7QUFDQSx1QkFBS25CLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZEK0IsZUFBS29CLEk7O2tCQUFwQmxDLE0iLCJmaWxlIjoiQ2hhcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBkYXRhID0ge1xuICAgIGNoYXJnZVR5cGVzOiBuZXcgQXJyYXkoKSxcbiAgICBjaGVja2VkSW5kZXg6IDAsXG4gICAgY2hlY2tlZEJvcmRlckNvbG9yOiAnIzIxOTZGMycsXG4gICAgdW5jaGVja2VkQm9yZGVyQ29sb3I6ICcjZWVlJyxcbiAgICBiYWxhbmNlOiBudWxsLFxuICAgIHVuaXQ6IHV0aWxzLnVuaXRcbiAgfTtcblxuICBtZXRob2RzID0ge1xuICAgIG9uUmFkaW9DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5jaGVja2VkSW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSxcbiAgICBhc3luYyB0YXBDaGFyZ2VCdG4oKSB7XG4gICAgICAvL+WUpOi1t+W+ruS/oeaUr+S7mOWKn+iDvVxuICAgICAgLy/lhYXlgLzorrDlvZVcbiAgICAgIGNvbnN0IGNoYXJnZVR5cGUgPSB0aGlzLmNoYXJnZVR5cGVzW3RoaXMuY2hlY2tlZEluZGV4XTtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMucG9zdCh7XG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jaGFyZ2Vwcm9kdWN0c2AsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjaGFyZ2VUeXBlSWQ6IGNoYXJnZVR5cGUuaWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICflhYXlgLzmiJDlip8nXG4gICAgICAgIH0pO1xuICAgICAgICAvL+abtOaWsOacrOWcsOeUqOaIt+S9meminVxuICAgICAgICBsZXQgc2Vzc2lvbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKTtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmJhbGFuY2UgKz0gKGNoYXJnZVR5cGUuYmFsYW5jZSArIChjaGFyZ2VUeXBlLmJvbnVzVHlwZSA/IGNoYXJnZVR5cGUuYm9udXNUeXBlLnByaWNlICogdXRpbHMucmF0aW8gOiAwKSk7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nLCBzZXNzaW9uKTtcbiAgICAgICAgdGhpcy5iYWxhbmNlID0gc2Vzc2lvbi51c2VyLmJhbGFuY2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmJhbGFuY2UgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJykudXNlci5iYWxhbmNlO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgdGhpcy5fbG9hZENoYXJnZVR5cGVzKCk7XG4gIH1cblxuICAvKipcbiAgICog5Yqg6L295YWF5YC85Lqn5ZOB5YiX6KGoXG4gICAqL1xuICBhc3luYyBfbG9hZENoYXJnZVR5cGVzKCkge1xuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jaGFyZ2V0eXBlc2BcbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIHRoaXMuY2hhcmdlVHlwZXMgPSBkYXRhLnJlc3VsdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=