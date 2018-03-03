'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      checkMode: true,
      pageNum: 1,
      pageSize: 10,
      randomColor: ['#ffadd2', '#ffa39e', '#ffbb96', '#ffd591', '#ffe58f', '#13c2c2', '#52c41a', '#a0d911', 'rgb(119, 218, 236)', 'rgb(121, 216, 143)'],
      classifications: null,
      advertisers: null,
      urlPrefix: _util2.default.urlPrefix
    }, _this.methods = {
      tapAd: function tapAd(ficId) {
        this.$parent.globalData.ficId = ficId;
        this.$parent.globalData.serial = 1;
        this.$parent.globalData.chapId = null;
        if (this.checkMode) {
          return;
        }
        _wepy2.default.navigateTo({
          url: './Read'
        });
      },
      tapClassification: function tapClassification(clsId) {
        _wepy2.default.navigateTo({
          url: './Fiction?clsId=' + clsId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this._init();
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this._init();
    }
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var adRet, ads;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._loadAds(this.pageNum + 1, this.pageSize);

              case 2:
                adRet = _context.sent;
                ads = [].concat(_toConsumableArray(this.advertisers));

                this.advertisers = ads.concat(adRet);
                this.$apply();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onReachBottom() {
        return _ref2.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(options) {
      var _this2 = this;

      console.log(options);
      var openid = _wepy2.default.getStorageSync('session').user.openid;
      var timeStamp = (0, _moment2.default)(Date.now()).format('YYYY-MM-DDTHH:mm:ss.sss');
      return {
        path: '/pages/Index?fromOpenid=' + openid + '&shareDate=' + timeStamp,
        complete: function complete(res) {
          _this2.$parent.globalData.onShareCallback(res);
        }
      };
    }
  }, {
    key: '_init',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref4, data, adRet;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/systemconfigs/1'
                });

              case 2:
                _ref4 = _context2.sent;
                data = _ref4.data;

                if (!data) {
                  _context2.next = 13;
                  break;
                }

                //非审核模式
                if (data !== 1) {
                  this.checkMode = false;
                }
                this.$apply();
                _context2.next = 9;
                return this._loadClses();

              case 9:
                _context2.next = 11;
                return this._loadAds(1, this.pageSize);

              case 11:
                adRet = _context2.sent;

                if (adRet) {
                  this.advertisers = adRet;
                  this.$apply();
                }

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _init() {
        return _ref3.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: '_loadClses',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _ref6, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/classifications'
                });

              case 2:
                _ref6 = _context3.sent;
                data = _ref6.data;

                if (data.result) {
                  this.classifications = data.result;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _loadClses() {
        return _ref5.apply(this, arguments);
      }

      return _loadClses;
    }()
  }, {
    key: '_loadAds',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pageNum, pageSize) {
        var mode, _ref8, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mode = this.checkMode ? 'check' : 'normal';
                _context4.next = 3;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/ads?pageNum=' + pageNum + '&pageSize=' + pageSize + '&mode=' + mode
                });

              case 3:
                _ref8 = _context4.sent;
                data = _ref8.data;

                if (!data.result) {
                  _context4.next = 10;
                  break;
                }

                this.pageNum = pageNum;
                this.pageSize = pageSize;
                this.$apply();
                return _context4.abrupt('return', data.result);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadAds(_x, _x2) {
        return _ref7.apply(this, arguments);
      }

      return _loadAds;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/Index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImNoZWNrTW9kZSIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInJhbmRvbUNvbG9yIiwiY2xhc3NpZmljYXRpb25zIiwiYWR2ZXJ0aXNlcnMiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwQWQiLCJmaWNJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2VyaWFsIiwiY2hhcElkIiwibmF2aWdhdGVUbyIsInVybCIsInRhcENsYXNzaWZpY2F0aW9uIiwiY2xzSWQiLCJfaW5pdCIsIl9sb2FkQWRzIiwiYWRSZXQiLCJhZHMiLCJjb25jYXQiLCIkYXBwbHkiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwidXNlciIsInRpbWVTdGFtcCIsIkRhdGUiLCJub3ciLCJmb3JtYXQiLCJwYXRoIiwiY29tcGxldGUiLCJvblNoYXJlQ2FsbGJhY2siLCJyZXMiLCJmZXRjaCIsIl9sb2FkQ2xzZXMiLCJyZXN1bHQiLCJtb2RlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGVBQVMsQ0FGSjtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLG1CQUFhLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsU0FBOUUsRUFBeUYsb0JBQXpGLEVBQStHLG9CQUEvRyxDQUpSO0FBS0xDLHVCQUFpQixJQUxaO0FBTUxDLG1CQUFhLElBTlI7QUFPTEMsaUJBQVcsZUFBTUE7QUFQWixLLFFBVVBDLE8sR0FBVTtBQUNSQyxXQURRLGlCQUNGQyxLQURFLEVBQ0s7QUFDWCxhQUFLQyxPQUFMLENBQWFDLFVB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OztFQS9GaUIsZUFBS0UsSTs7a0JBQW5CNUMsSyIsImZpbGUiOiJJbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBkYXRhID0ge1xuICAgIGNoZWNrTW9kZTogdHJ1ZSxcbiAgICBwYWdlTnVtOiAxLFxuICAgIHBhZ2VTaXplOiAxMCxcbiAgICByYW5kb21Db2xvcjogWycjZmZhZGQyJywgJyNmZmEzOWUnLCAnI2ZmYmI5NicsICcjZmZkNTkxJywgJyNmZmU1OGYnLCAnIzEzYzJjMicsICcjNTJjNDFhJywgJyNhMGQ5MTEnLCAncmdiKDExOSwgMjE4LCAyMzYpJywgJ3JnYigxMjEsIDIxNiwgMTQzKSddLFxuICAgIGNsYXNzaWZpY2F0aW9uczogbnVsbCxcbiAgICBhZHZlcnRpc2VyczogbnVsbCxcbiAgICB1cmxQcmVmaXg6IHV0aWxzLnVybFByZWZpeFxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICB0YXBBZChmaWNJZCkge1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQgPSBmaWNJZDtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlcmlhbCA9IDE7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaGFwSWQgPSBudWxsO1xuICAgICAgaWYgKHRoaXMuY2hlY2tNb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4vUmVhZCdcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGFwQ2xhc3NpZmljYXRpb24oY2xzSWQpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC4vRmljdGlvbj9jbHNJZD0ke2Nsc0lkfWBcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICBhc3luYyBvblJlYWNoQm90dG9tKCkge1xuICAgIGxldCBhZFJldCA9IGF3YWl0IHRoaXMuX2xvYWRBZHModGhpcy5wYWdlTnVtICsgMSwgdGhpcy5wYWdlU2l6ZSk7XG4gICAgbGV0IGFkcyA9IFsuLi50aGlzLmFkdmVydGlzZXJzXTtcbiAgICB0aGlzLmFkdmVydGlzZXJzID0gYWRzLmNvbmNhdChhZFJldCk7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIG9uU2hhcmVBcHBNZXNzYWdlKG9wdGlvbnMpIHtcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcbiAgICBjb25zdCBvcGVuaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJykudXNlci5vcGVuaWQ7XG4gICAgY29uc3QgdGltZVN0YW1wID0gbW9tZW50KERhdGUubm93KCkpLmZvcm1hdCgnWVlZWS1NTS1ERFRISDptbTpzcy5zc3MnKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogYC9wYWdlcy9JbmRleD9mcm9tT3BlbmlkPSR7b3BlbmlkfSZzaGFyZURhdGU9JHt0aW1lU3RhbXB9YCxcbiAgICAgIGNvbXBsZXRlOiByZXMgPT4ge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5vblNoYXJlQ2FsbGJhY2socmVzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgX2luaXQoKSB7XG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N5c3RlbWNvbmZpZ3MvMWBcbiAgICB9KTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy/pnZ7lrqHmoLjmqKHlvI9cbiAgICAgIGlmIChkYXRhICE9PSAxKSB7XG4gICAgICAgIHRoaXMuY2hlY2tNb2RlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgYXdhaXQgdGhpcy5fbG9hZENsc2VzKCk7XG4gICAgICBsZXQgYWRSZXQgPSBhd2FpdCB0aGlzLl9sb2FkQWRzKDEsIHRoaXMucGFnZVNpemUpO1xuICAgICAgaWYgKGFkUmV0KSB7XG4gICAgICAgIHRoaXMuYWR2ZXJ0aXNlcnMgPSBhZFJldDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBfbG9hZENsc2VzKCkge1xuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jbGFzc2lmaWNhdGlvbnNgXG4gICAgfSk7XG4gICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICB0aGlzLmNsYXNzaWZpY2F0aW9ucyA9IGRhdGEucmVzdWx0O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfbG9hZEFkcyhwYWdlTnVtLCBwYWdlU2l6ZSkge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLmNoZWNrTW9kZSA/ICdjaGVjaycgOiAnbm9ybWFsJztcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vYWRzP3BhZ2VOdW09JHtwYWdlTnVtfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfSZtb2RlPSR7bW9kZX1gXG4gICAgfSk7XG4gICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSBwYWdlTnVtO1xuICAgICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHJldHVybiBkYXRhLnJlc3VsdDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==