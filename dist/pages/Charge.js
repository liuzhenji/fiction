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
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var balanceRet;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _wepy2.default.showLoading({
                  title: '拼命加载'
                });
                _context2.next = 3;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/userbalances'
                });

              case 3:
                balanceRet = _context2.sent;

                this.balance = balanceRet.data.result[0].balance;
                this.$apply();
                this._loadChargeTypes();
                _wepy2.default.hideLoading();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLoad() {
        return _ref4.apply(this, arguments);
      }

      return onLoad;
    }()

    /**
     * 加载充值产品列表
     */

  }, {
    key: '_loadChargeTypes',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _ref6, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chargetypes'
                });

              case 2:
                _ref6 = _context3.sent;
                data = _ref6.data;

                if (data.result) {
                  this.chargeTypes = data.result;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _loadChargeTypes() {
        return _ref5.apply(this, arguments);
      }

      return _loadChargeTypes;
    }()
  }]);

  return Charge;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Charge , 'pages/Charge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJnZS5qcyJdLCJuYW1lcyI6WyJDaGFyZ2UiLCJkYXRhIiwiY2hhcmdlVHlwZXMiLCJBcnJheSIsImNoZWNrZWRJbmRleCIsImNoZWNrZWRCb3JkZXJDb2xvciIsInVuY2hlY2tlZEJvcmRlckNvbG9yIiwiYmFsYW5jZSIsInVuaXQiLCJtZXRob2RzIiwib25SYWRpb0NoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInRhcENoYXJnZUJ0biIsImNoYXJnZVR5cGUiLCJwb3N0IiwidXJsIiwidXJsUHJlZml4IiwiY2hhcmdlVHlwZUlkIiwiaWQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsInNlc3Npb24iLCJnZXRTdG9yYWdlU3luYyIsInVzZXIiLCJib251c1R5cGUiLCJwcmljZSIsInJhdGlvIiwic2V0U3RvcmFnZVN5bmMiLCJzaG93TG9hZGluZyIsImZldGNoIiwiYmFsYW5jZVJldCIsInJlc3VsdCIsIl9sb2FkQ2hhcmdlVHlwZXMiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEksR0FBTztBQUNMQyxtQkFBYSxJQUFJQyxLQUFKLEVBRFI7QUFFTEMsb0JBQWMsQ0FGVDtBQUdMQywwQkFBb0IsU0FIZjtBQUlMQyw0QkFBc0IsTUFKakI7QUFLTEMsZUFBUyxJQUxKO0FBTUxDLFlBQU0sZUFBTUE7QUFOUCxLLFFBU1BDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDTUMsQ0FETixFQUNTO0FBQ2YsYUFBS1AsWUFBTCxHQUFvQk8sRUFBRUMsTUFBRixDQUFTQyxLQUE3QjtBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS0ZDLGtCQUxFO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1OO0FBQ0E7QUFDTUMsNEJBUkEsR0FRYSxLQUFLZCxXQUFMLENBQWlCLEtBQUtFLFlBQXRCLENBUmI7QUFBQTtBQUFBLHlCQVNpQixlQUFNYSxJQUFOLENBQVc7QUFDaENDLHlCQUFRLGVBQU1DLFNBQWQsb0JBRGdDO0FBRWhDbEIsMEJBQU07QUFDSm1CLG9DQUFjSixXQUFXSztBQURyQjtBQUYwQixtQkFBWCxDQVRqQjs7QUFBQTtBQUFBO0FBU0VwQixzQkFURixTQVNFQSxJQVRGOztBQWVOLHNCQUFJQSxJQUFKLEVBQVU7QUFDUixtQ0FBS3FCLFNBQUwsQ0FBZTtBQUNiQyw2QkFBTztBQURNLHFCQUFmO0FBR0E7QUFDSUMsMkJBTEksR0FLTSxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLENBTE47O0FBTVJELDRCQUFRRSxJQUFSLENBQWFuQixPQUFiLElBQXlCUyxXQUFXVCxPQUFYLElBQXNCUyxXQUFXVyxTQUFYLEdBQXVCWCxXQUFXVyxTQUFYLENBQXFCQyxLQUFyQixHQUE2QixlQUFNQyxLQUExRCxHQUFrRSxDQUF4RixDQUF6QjtBQUNBLG1DQUFLQyxjQUFMLENBQW9CLFNBQXBCLEVBQStCTixPQUEvQjtBQUNBLHlCQUFLakIsT0FBTCxHQUFlaUIsUUFBUUUsSUFBUixDQUFhbkIsT0FBNUI7QUFDQSx5QkFBS08sTUFBTDtBQUNEOztBQXpCSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7Ozs7Ozs7OztBQThCUiwrQkFBS2lCLFdBQUwsQ0FBaUI7QUFDZlIseUJBQU87QUFEUSxpQkFBakI7O3VCQUd5QixlQUFNUyxLQUFOLENBQVk7QUFDbkNkLHVCQUFRLGVBQU1DLFNBQWQ7QUFEbUMsaUJBQVosQzs7O0FBQW5CYywwQjs7QUFHTixxQkFBSzFCLE9BQUwsR0FBZTBCLFdBQVdoQyxJQUFYLENBQWdCaUMsTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIzQixPQUF6QztBQUNBLHFCQUFLTyxNQUFMO0FBQ0EscUJBQUtxQixnQkFBTDtBQUNBLCtCQUFLQyxXQUFMOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdGOzs7Ozs7Ozs7Ozs7Ozs7dUJBSXVCLGVBQU1KLEtBQU4sQ0FBWTtBQUMvQmQsdUJBQVEsZUFBTUMsU0FBZDtBQUQrQixpQkFBWixDOzs7O0FBQWZsQixvQixTQUFBQSxJOztBQUdOLG9CQUFJQSxLQUFLaUMsTUFBVCxFQUFpQjtBQUNmLHVCQUFLaEMsV0FBTCxHQUFtQkQsS0FBS2lDLE1BQXhCO0FBQ0EsdUJBQUtwQixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE5RCtCLGVBQUt1QixJOztrQkFBcEJyQyxNIiwiZmlsZSI6IkNoYXJnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgZGF0YSA9IHtcbiAgICBjaGFyZ2VUeXBlczogbmV3IEFycmF5KCksXG4gICAgY2hlY2tlZEluZGV4OiAwLFxuICAgIGNoZWNrZWRCb3JkZXJDb2xvcjogJyMyMTk2RjMnLFxuICAgIHVuY2hlY2tlZEJvcmRlckNvbG9yOiAnI2VlZScsXG4gICAgYmFsYW5jZTogbnVsbCxcbiAgICB1bml0OiB1dGlscy51bml0XG4gIH07XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBvblJhZGlvQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuY2hlY2tlZEluZGV4ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgYXN5bmMgdGFwQ2hhcmdlQnRuKCkge1xuICAgICAgLy/llKTotbflvq7kv6HmlK/ku5jlip/og71cbiAgICAgIC8v5YWF5YC86K6w5b2VXG4gICAgICBjb25zdCBjaGFyZ2VUeXBlID0gdGhpcy5jaGFyZ2VUeXBlc1t0aGlzLmNoZWNrZWRJbmRleF07XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLnBvc3Qoe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY2hhcmdlcHJvZHVjdHNgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY2hhcmdlVHlwZUlkOiBjaGFyZ2VUeXBlLmlkXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5YWF5YC85oiQ5YqfJ1xuICAgICAgICB9KTtcbiAgICAgICAgLy/mm7TmlrDmnKzlnLDnlKjmiLfkvZnpop1cbiAgICAgICAgbGV0IHNlc3Npb24gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJyk7XG4gICAgICAgIHNlc3Npb24udXNlci5iYWxhbmNlICs9IChjaGFyZ2VUeXBlLmJhbGFuY2UgKyAoY2hhcmdlVHlwZS5ib251c1R5cGUgPyBjaGFyZ2VUeXBlLmJvbnVzVHlwZS5wcmljZSAqIHV0aWxzLnJhdGlvIDogMCkpO1xuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJywgc2Vzc2lvbik7XG4gICAgICAgIHRoaXMuYmFsYW5jZSA9IHNlc3Npb24udXNlci5iYWxhbmNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBvbkxvYWQoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+aLvOWRveWKoOi9vSdcbiAgICB9KTtcbiAgICBjb25zdCBiYWxhbmNlUmV0ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJiYWxhbmNlc2BcbiAgICB9KTtcbiAgICB0aGlzLmJhbGFuY2UgPSBiYWxhbmNlUmV0LmRhdGEucmVzdWx0WzBdLmJhbGFuY2U7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgICB0aGlzLl9sb2FkQ2hhcmdlVHlwZXMoKTtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICog5Yqg6L295YWF5YC85Lqn5ZOB5YiX6KGoXG4gICAqL1xuICBhc3luYyBfbG9hZENoYXJnZVR5cGVzKCkge1xuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jaGFyZ2V0eXBlc2BcbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIHRoaXMuY2hhcmdlVHlwZXMgPSBkYXRhLnJlc3VsdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=