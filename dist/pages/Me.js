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
      alertDeving: function alertDeving() {
        _wepy2.default.showToast({
          title: '功能开发中'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiZGF0YSIsImNoZWNrTW9kZSIsInVzZXJJbmZvIiwiT2JqZWN0IiwiaGFzVXNlckluZm8iLCJiYWxhbmNlIiwidW5pdCIsIm1ldGhvZHMiLCJhbGVydERldmluZyIsInNob3dUb2FzdCIsInRpdGxlIiwidGFwQ2hhcmdlUmVjb3JkIiwibmF2aWdhdGVUbyIsInVybCIsInRhcENoYXJnZSIsInNob3dMb2FkaW5nIiwiX2luaXQiLCJfbG9hZFVzZXJJbmZvRnJvbTNyZCIsImhpZGVMb2FkaW5nIiwiZmV0Y2giLCJ1cmxQcmVmaXgiLCJyZXN1bHQiLCJzZXNzaW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRTdG9yYWdlU3luYyIsInVzZXIiLCIkYXBwbHkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImxvYWRVc2VySW5mb0NhbGxiYWNrIiwiY2hlY2tSZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsZ0JBQVUsSUFBSUMsTUFBSixFQUZMO0FBR0xDLG1CQUFhLEtBSFI7QUFJTDtBQUNBQyxlQUFTLENBTEo7QUFNTEMsWUFBTSxlQUFNQTtBQU5QLEssUUFTUEMsTyxHQUFVO0FBQ1JDLGlCQURRLHlCQUNNO0FBQ1osdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTztBQURNLFNBQWY7QUFHRCxPQUxPO0FBTVJDLHFCQU5RLDZCQU1VO0FBQ2hCLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BVk87QUFXUkMsZUFYUSx1QkFXSTtBQUNWLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBZk8sSzs7Ozs7Ozs7Ozs7QUFtQlIsK0JBQUtFLFdBQUw7O3VCQUNNLEtBQUtDLEtBQUwsRTs7Ozt1QkFDQSxLQUFLQyxvQkFBTCxFOzs7QUFDTiwrQkFBS0MsV0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUlxQixlQUFNQyxLQUFOLENBQVk7QUFDL0JOLHVCQUFRLGVBQU1PLFNBQWQ7QUFEK0IsaUJBQVosQzs7OztBQUFmcEIsb0IsU0FBQUEsSTs7QUFHTixvQkFBSUEsS0FBS3FCLE1BQVQsRUFBaUI7QUFDWEMseUJBRFcsR0FDRCxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLENBREM7O0FBRWYsaUNBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsZUFBbUNGLE9BQW5DLElBQTRDRyxNQUFNekIsS0FBS3FCLE1BQUwsQ0FBWSxDQUFaLENBQWxEO0FBQ0EsdUJBQUtoQixPQUFMLEdBQWVMLEtBQUtxQixNQUFMLENBQVksQ0FBWixFQUFlaEIsT0FBOUI7QUFDQSx1QkFBS3FCLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUQ7QUFDQTtBQUNBLG9CQUFJLENBQUMsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCMUIsUUFBN0IsRUFBdUM7QUFDckMsdUJBQUt5QixPQUFMLENBQWFFLG9CQUFiLEdBQW9DLFVBQUMzQixRQUFELEVBQWM7QUFDaEQsMkJBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsMkJBQUt3QixNQUFMO0FBQ0QsbUJBSEQ7QUFJRCxpQkFMRCxNQUtPO0FBQ0wsdUJBQUt4QixRQUFMLEdBQWdCLEtBQUt5QixPQUFMLENBQWFDLFVBQWIsQ0FBd0IxQixRQUF4QztBQUNBLHVCQUFLd0IsTUFBTDtBQUNEOzt1QkFDb0IsZUFBTVAsS0FBTixDQUFZO0FBQy9CTix1QkFBUSxlQUFNTyxTQUFkO0FBRCtCLGlCQUFaLEM7OztBQUFqQlUsd0I7O3NCQUlBQSxTQUFTOUIsSUFBVCxLQUFrQixDOzs7OztBQUNwQixxQkFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHFCQUFLeUIsTUFBTDtrREFDTyxJQUFJSyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDRDtBQUNELGlCQUZNLEM7OztBQUlULHFCQUFLL0IsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHFCQUFLeUIsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZFNEIsZUFBS1EsSTs7a0JBQWhCbkMsRSIsImZpbGUiOiJNZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHV0aWxzIGZyb20gJ0AvdXRpbHMvdXRpbCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICBjaGVja01vZGU6IHRydWUsXG4gICAgICB1c2VySW5mbzogbmV3IE9iamVjdCgpLFxuICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgICAgLy8gY2FuSVVzZTogd2VweS5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgICBiYWxhbmNlOiAwLFxuICAgICAgdW5pdDogdXRpbHMudW5pdFxuICAgIH07XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgYWxlcnREZXZpbmcoKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WKn+iDveW8gOWPkeS4rSdcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdGFwQ2hhcmdlUmVjb3JkKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vQ2hhcmdlUmVjb3JkJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0YXBDaGFyZ2UoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DaGFyZ2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKCk7XG4gICAgICBhd2FpdCB0aGlzLl9pbml0KCk7XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkVXNlckluZm9Gcm9tM3JkKCk7XG4gICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2xvYWRVc2VySW5mb0Zyb20zcmQoKSB7XG4gICAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS91c2Vyc2BcbiAgICAgIH0pO1xuICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgIGxldCBzZXNzaW9uID0gd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpO1xuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJywgey4uLnNlc3Npb24sIHVzZXI6IGRhdGEucmVzdWx0WzBdfSk7XG4gICAgICAgIHRoaXMuYmFsYW5jZSA9IGRhdGEucmVzdWx0WzBdLmJhbGFuY2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgX2luaXQoKSB7XG4gICAgICAvL+WKoOi9veW+ruS/oeeUqOaIt+eahOWfuuehgOS/oeaBr1xuICAgICAgLy90b2RvOuiAg+iZkeeUqOaIt+ayoeacieaOiOadg+eUqOaIt+S/oeaBr+etieaDheWGtVxuICAgICAgaWYgKCF0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICB0aGlzLiRwYXJlbnQubG9hZFVzZXJJbmZvQ2FsbGJhY2sgPSAodXNlckluZm8pID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gdXNlckluZm87XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICAgIGxldCBjaGVja1JldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N5c3RlbWNvbmZpZ3MvMWBcbiAgICAgIH0pO1xuICAgICAgLy/lrqHmoLjmqKHlvI9cbiAgICAgIGlmIChjaGVja1JldC5kYXRhID09PSAxKSB7XG4gICAgICAgIHRoaXMuY2hlY2tNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja01vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG4iXX0=