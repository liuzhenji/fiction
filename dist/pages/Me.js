'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_wepy$page) {
  _inherits(Me, _wepy$page);

  function Me() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      checkMode: true,
      userInfo: new Object(),
      hasUserInfo: false,
      // canIUse: wepy.canIUse('button.open-type.getUserInfo'),
      balance: 0,
      unit: _util2.default.unit
    }, _this.methods = {
      alertDeving: function alertDeving() {
        _wepy2.default.showModal({
          title: '加入我们',
          content: '联系方式：18792576775'
        });
      },
      tapChargeRecord: function tapChargeRecord() {
        _wepy2.default.navigateTo({
          url: './ChargeRecord'
        });
      },
      tapCharge: function tapCharge() {
        _wepy2.default.navigateTo({
          url: './Charge'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Me, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(options) {
      var openid = _wepy2.default.getStorageSync('session').user.openid;
      var timeStamp = (0, _moment2.default)(Date.now()).format('YYYY-MM-DDTHH:mm:ss.sss');
      return {
        path: '/pages/Index?fromOpenid=' + openid + '&shareDate=' + timeStamp
      };
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _wepy2.default.showLoading();
                _context.next = 3;
                return this._init();

              case 3:
                _context.next = 5;
                return this._loadUserInfoFrom3rd();

              case 5:
                _wepy2.default.hideLoading();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow() {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: '_loadUserInfoFrom3rd',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref4, data, session;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/users'
                });

              case 2:
                _ref4 = _context2.sent;
                data = _ref4.data;

                if (data.result) {
                  session = _wepy2.default.getStorageSync('session');

                  _wepy2.default.setStorageSync('session', _extends({}, session, { user: data.result[0] }));
                  this.balance = data.result[0].balance;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loadUserInfoFrom3rd() {
        return _ref3.apply(this, arguments);
      }

      return _loadUserInfoFrom3rd;
    }()
  }, {
    key: '_init',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var checkRet;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //加载微信用户的基础信息
                if (!this.$parent.globalData.userInfo) {
                  this.$parent.loadUserInfoCallback = function (userInfo) {
                    _this2.userInfo = userInfo;
                    _this2.$apply();
                  };
                } else {
                  this.userInfo = this.$parent.globalData.userInfo;
                  this.$apply();
                }
                _context3.next = 3;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/systemconfigs/1'
                });

              case 3:
                checkRet = _context3.sent;

                if (!(checkRet.data === 1)) {
                  _context3.next = 8;
                  break;
                }

                this.checkMode = true;
                this.$apply();
                return _context3.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 8:
                this.checkMode = false;
                this.$apply();

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _init() {
        return _ref5.apply(this, arguments);
      }

      return _init;
    }()
  }]);

  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/Me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiZGF0YSIsImNoZWNrTW9kZSIsInVzZXJJbmZvIiwiT2JqZWN0IiwiaGFzVXNlckluZm8iLCJiYWxhbmNlIiwidW5pdCIsIm1ldGhvZHMiLCJhbGVydERldmluZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInRhcENoYXJnZVJlY29yZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0YXBDaGFyZ2UiLCJvcHRpb25zIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwidGltZVN0YW1wIiwiRGF0ZSIsIm5vdyIsImZvcm1hdCIsInBhdGgiLCJzaG93TG9hZGluZyIsIl9pbml0IiwiX2xvYWRVc2VySW5mb0Zyb20zcmQiLCJoaWRlTG9hZGluZyIsImZldGNoIiwidXJsUHJlZml4IiwicmVzdWx0Iiwic2Vzc2lvbiIsInNldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJsb2FkVXNlckluZm9DYWxsYmFjayIsImNoZWNrUmV0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsZ0JBQVUsSUFBSUMsTUFBSixFQUZMO0FBR0xDLG1CQUFhLEtBSFI7QUFJTDtBQUNBQyxlQUFTLENBTEo7QUFNTEMsWUFBTSxlQUFNQTtBQU5QLEssUUFTUEMsTyxHQUFVO0FBQ1JDLGlCQURRLHlCQUNNO0FBQ1osdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxNQURNO0FBRWJDLG1CQUFTO0FBRkksU0FBZjtBQUlELE9BTk87QUFPUkMscUJBUFEsNkJBT1U7QUFDaEIsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FYTztBQVlSQyxlQVpRLHVCQVlJO0FBQ1YsdUJBQUtGLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFoQk8sSzs7Ozs7c0NBbUJRRSxPLEVBQVM7QUFDekIsVUFBTUMsU0FBUyxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLEVBQStCQyxJQUEvQixDQUFvQ0YsTUFBbkQ7QUFDQSxVQUFNRyxZQUFZLHNCQUFPQyxLQUFLQyxHQUFMLEVBQVAsRUFBbUJDLE1BQW5CLENBQTBCLHlCQUExQixDQUFsQjtBQUNBLGFBQU87QUFDTEMsMkNBQWlDUCxNQUFqQyxtQkFBcURHO0FBRGhELE9BQVA7QUFHRDs7Ozs7Ozs7O0FBR0MsK0JBQUtLLFdBQUw7O3VCQUNNLEtBQUtDLEtBQUwsRTs7Ozt1QkFDQSxLQUFLQyxvQkFBTCxFOzs7QUFDTiwrQkFBS0MsV0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUlxQixlQUFNQyxLQUFOLENBQVk7QUFDL0JmLHVCQUFRLGVBQU1nQixTQUFkO0FBRCtCLGlCQUFaLEM7Ozs7QUFBZjlCLG9CLFNBQUFBLEk7O0FBR04sb0JBQUlBLEtBQUsrQixNQUFULEVBQWlCO0FBQ1hDLHlCQURXLEdBQ0QsZUFBS2QsY0FBTCxDQUFvQixTQUFwQixDQURDOztBQUVmLGlDQUFLZSxjQUFMLENBQW9CLFNBQXBCLGVBQW1DRCxPQUFuQyxJQUE0Q2IsTUFBTW5CLEtBQUsrQixNQUFMLENBQVksQ0FBWixDQUFsRDtBQUNBLHVCQUFLMUIsT0FBTCxHQUFlTCxLQUFLK0IsTUFBTCxDQUFZLENBQVosRUFBZTFCLE9BQTlCO0FBQ0EsdUJBQUs2QixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlEO0FBQ0Esb0JBQUksQ0FBQyxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JsQyxRQUE3QixFQUF1QztBQUNyQyx1QkFBS2lDLE9BQUwsQ0FBYUUsb0JBQWIsR0FBb0MsVUFBQ25DLFFBQUQsRUFBYztBQUNoRCwyQkFBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSwyQkFBS2dDLE1BQUw7QUFDRCxtQkFIRDtBQUlELGlCQUxELE1BS087QUFDTCx1QkFBS2hDLFFBQUwsR0FBZ0IsS0FBS2lDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QmxDLFFBQXhDO0FBQ0EsdUJBQUtnQyxNQUFMO0FBQ0Q7O3VCQUNzQixlQUFNTCxLQUFOLENBQVk7QUFDakNmLHVCQUFRLGVBQU1nQixTQUFkO0FBRGlDLGlCQUFaLEM7OztBQUFqQlEsd0I7O3NCQUlGQSxTQUFTdEMsSUFBVCxLQUFrQixDOzs7OztBQUNwQixxQkFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHFCQUFLaUMsTUFBTDtrREFDTyxJQUFJSyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDRDtBQUNELGlCQUZNLEM7OztBQUlULHFCQUFLdkMsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHFCQUFLaUMsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQS9FNEIsZUFBS1EsSTs7a0JBQWhCM0MsRSIsImZpbGUiOiJNZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHV0aWxzIGZyb20gJ0AvdXRpbHMvdXRpbCc7XG4gIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGNoZWNrTW9kZTogdHJ1ZSxcbiAgICAgIHVzZXJJbmZvOiBuZXcgT2JqZWN0KCksXG4gICAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgICAvLyBjYW5JVXNlOiB3ZXB5LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICAgIGJhbGFuY2U6IDAsXG4gICAgICB1bml0OiB1dGlscy51bml0XG4gICAgfTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBhbGVydERldmluZygpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg5YWl5oiR5LusJyxcbiAgICAgICAgICBjb250ZW50OiAn6IGU57O75pa55byP77yaMTg3OTI1NzY3NzUnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRhcENoYXJnZVJlY29yZCgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL0NoYXJnZVJlY29yZCdcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdGFwQ2hhcmdlKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vQ2hhcmdlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0aW9ucykge1xuICAgICAgY29uc3Qgb3BlbmlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnVzZXIub3BlbmlkO1xuICAgICAgY29uc3QgdGltZVN0YW1wID0gbW9tZW50KERhdGUubm93KCkpLmZvcm1hdCgnWVlZWS1NTS1ERFRISDptbTpzcy5zc3MnKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IGAvcGFnZXMvSW5kZXg/ZnJvbU9wZW5pZD0ke29wZW5pZH0mc2hhcmVEYXRlPSR7dGltZVN0YW1wfWBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZygpO1xuICAgICAgYXdhaXQgdGhpcy5faW5pdCgpO1xuICAgICAgYXdhaXQgdGhpcy5fbG9hZFVzZXJJbmZvRnJvbTNyZCgpO1xuICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xuICAgIH1cblxuICAgIGFzeW5jIF9sb2FkVXNlckluZm9Gcm9tM3JkKCkge1xuICAgICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vdXNlcnNgXG4gICAgICB9KTtcbiAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICBsZXQgc2Vzc2lvbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKTtcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnc2Vzc2lvbicsIHsuLi5zZXNzaW9uLCB1c2VyOiBkYXRhLnJlc3VsdFswXX0pO1xuICAgICAgICB0aGlzLmJhbGFuY2UgPSBkYXRhLnJlc3VsdFswXS5iYWxhbmNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIF9pbml0KCkge1xuICAgICAgLy/liqDovb3lvq7kv6HnlKjmiLfnmoTln7rnoYDkv6Hmga9cbiAgICAgIGlmICghdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LmxvYWRVc2VySW5mb0NhbGxiYWNrID0gKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgICAgdGhpcy51c2VySW5mbyA9IHVzZXJJbmZvO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm87XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGVja1JldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N5c3RlbWNvbmZpZ3MvMWBcbiAgICAgIH0pO1xuICAgICAgLy/lrqHmoLjmqKHlvI9cbiAgICAgIGlmIChjaGVja1JldC5kYXRhID09PSAxKSB7XG4gICAgICAgIHRoaXMuY2hlY2tNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja01vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG4iXX0=