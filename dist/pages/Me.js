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
                //todo:考虑用户没有授权用户信息等情况
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiZGF0YSIsImNoZWNrTW9kZSIsInVzZXJJbmZvIiwiT2JqZWN0IiwiaGFzVXNlckluZm8iLCJiYWxhbmNlIiwidW5pdCIsIm1ldGhvZHMiLCJ0YXBDaGFyZ2VSZWNvcmQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGFwQ2hhcmdlIiwic2hvd0xvYWRpbmciLCJfaW5pdCIsIl9sb2FkVXNlckluZm9Gcm9tM3JkIiwiaGlkZUxvYWRpbmciLCJmZXRjaCIsInVybFByZWZpeCIsInJlc3VsdCIsInNlc3Npb24iLCJnZXRTdG9yYWdlU3luYyIsInNldFN0b3JhZ2VTeW5jIiwidXNlciIsIiRhcHBseSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibG9hZFVzZXJJbmZvQ2FsbGJhY2siLCJjaGVja1JldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxnQkFBVSxJQUFJQyxNQUFKLEVBRkw7QUFHTEMsbUJBQWEsS0FIUjtBQUlMO0FBQ0FDLGVBQVMsQ0FMSjtBQU1MQyxZQUFNLGVBQU1BO0FBTlAsSyxRQVNQQyxPLEdBQVU7QUFDUkMscUJBRFEsNkJBQ1U7QUFDaEIsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FMTztBQU1SQyxlQU5RLHVCQU1JO0FBQ1YsdUJBQUtGLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFWTyxLOzs7Ozs7Ozs7OztBQWNSLCtCQUFLRSxXQUFMOzt1QkFDTSxLQUFLQyxLQUFMLEU7Ozs7dUJBQ0EsS0FBS0Msb0JBQUwsRTs7O0FBQ04sK0JBQUtDLFdBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJcUIsZUFBTUMsS0FBTixDQUFZO0FBQy9CTix1QkFBUSxlQUFNTyxTQUFkO0FBRCtCLGlCQUFaLEM7Ozs7QUFBZmpCLG9CLFNBQUFBLEk7O0FBR04sb0JBQUlBLEtBQUtrQixNQUFULEVBQWlCO0FBQ1hDLHlCQURXLEdBQ0QsZUFBS0MsY0FBTCxDQUFvQixTQUFwQixDQURDOztBQUVmLGlDQUFLQyxjQUFMLENBQW9CLFNBQXBCLGVBQW1DRixPQUFuQyxJQUE0Q0csTUFBTXRCLEtBQUtrQixNQUFMLENBQVksQ0FBWixDQUFsRDtBQUNBLHVCQUFLYixPQUFMLEdBQWVMLEtBQUtrQixNQUFMLENBQVksQ0FBWixFQUFlYixPQUE5QjtBQUNBLHVCQUFLa0IsTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJRDtBQUNBO0FBQ0Esb0JBQUksQ0FBQyxLQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0J2QixRQUE3QixFQUF1QztBQUNyQyx1QkFBS3NCLE9BQUwsQ0FBYUUsb0JBQWIsR0FBb0MsVUFBQ3hCLFFBQUQsRUFBYztBQUNoRCwyQkFBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSwyQkFBS3FCLE1BQUw7QUFDRCxtQkFIRDtBQUlELGlCQUxELE1BS087QUFDTCx1QkFBS3JCLFFBQUwsR0FBZ0IsS0FBS3NCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnZCLFFBQXhDO0FBQ0EsdUJBQUtxQixNQUFMO0FBQ0Q7O3VCQUNvQixlQUFNUCxLQUFOLENBQVk7QUFDL0JOLHVCQUFRLGVBQU1PLFNBQWQ7QUFEK0IsaUJBQVosQzs7O0FBQWpCVSx3Qjs7c0JBSUFBLFNBQVMzQixJQUFULEtBQWtCLEM7Ozs7O0FBQ3BCLHFCQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EscUJBQUtzQixNQUFMO2tEQUNPLElBQUlLLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENEO0FBQ0QsaUJBRk0sQzs7O0FBSVQscUJBQUs1QixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EscUJBQUtzQixNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbEU0QixlQUFLUSxJOztrQkFBaEJoQyxFIiwiZmlsZSI6Ik1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGNoZWNrTW9kZTogdHJ1ZSxcbiAgICAgIHVzZXJJbmZvOiBuZXcgT2JqZWN0KCksXG4gICAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgICAvLyBjYW5JVXNlOiB3ZXB5LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICAgIGJhbGFuY2U6IDAsXG4gICAgICB1bml0OiB1dGlscy51bml0XG4gICAgfTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXBDaGFyZ2VSZWNvcmQoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DaGFyZ2VSZWNvcmQnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRhcENoYXJnZSgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL0NoYXJnZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jIG9uU2hvdygpIHtcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoKTtcbiAgICAgIGF3YWl0IHRoaXMuX2luaXQoKTtcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRVc2VySW5mb0Zyb20zcmQoKTtcbiAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICB9XG5cbiAgICBhc3luYyBfbG9hZFVzZXJJbmZvRnJvbTNyZCgpIHtcbiAgICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJzYFxuICAgICAgfSk7XG4gICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgbGV0IHNlc3Npb24gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJyk7XG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nLCB7Li4uc2Vzc2lvbiwgdXNlcjogZGF0YS5yZXN1bHRbMF19KTtcbiAgICAgICAgdGhpcy5iYWxhbmNlID0gZGF0YS5yZXN1bHRbMF0uYmFsYW5jZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBfaW5pdCgpIHtcbiAgICAgIC8v5Yqg6L295b6u5L+h55So5oi355qE5Z+656GA5L+h5oGvXG4gICAgICAvL3RvZG866ICD6JmR55So5oi35rKh5pyJ5o6I5p2D55So5oi35L+h5oGv562J5oOF5Ya1XG4gICAgICBpZiAoIXRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5sb2FkVXNlckluZm9DYWxsYmFjayA9ICh1c2VySW5mbykgPT4ge1xuICAgICAgICAgIHRoaXMudXNlckluZm8gPSB1c2VySW5mbztcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgICAgbGV0IGNoZWNrUmV0ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc3lzdGVtY29uZmlncy8xYFxuICAgICAgfSk7XG4gICAgICAvL+WuoeaguOaooeW8j1xuICAgICAgaWYgKGNoZWNrUmV0LmRhdGEgPT09IDEpIHtcbiAgICAgICAgdGhpcy5jaGVja01vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrTW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbiJdfQ==