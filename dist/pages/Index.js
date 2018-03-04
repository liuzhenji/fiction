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
                _wepy2.default.showLoading({
                  title: '加载中'
                });
                _context2.next = 3;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/systemconfigs/1'
                });

              case 3:
                _ref4 = _context2.sent;
                data = _ref4.data;

                if (!data) {
                  _context2.next = 14;
                  break;
                }

                //非审核模式
                if (data !== 1) {
                  this.checkMode = false;
                }
                _context2.next = 9;
                return this._loadClses();

              case 9:
                _context2.next = 11;
                return this._loadAds(1, this.pageSize);

              case 11:
                adRet = _context2.sent;

                if (adRet) {
                  this.advertisers = adRet;
                }
                this.$apply();

              case 14:
                _wepy2.default.hideLoading();

              case 15:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImNoZWNrTW9kZSIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInJhbmRvbUNvbG9yIiwiY2xhc3NpZmljYXRpb25zIiwiYWR2ZXJ0aXNlcnMiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwQWQiLCJmaWNJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2VyaWFsIiwiY2hhcElkIiwibmF2aWdhdGVUbyIsInVybCIsInRhcENsYXNzaWZpY2F0aW9uIiwiY2xzSWQiLCJfaW5pdCIsIl9sb2FkQWRzIiwiYWRSZXQiLCJhZHMiLCJjb25jYXQiLCIkYXBwbHkiLCJvcHRpb25zIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwidGltZVN0YW1wIiwiRGF0ZSIsIm5vdyIsImZvcm1hdCIsInBhdGgiLCJjb21wbGV0ZSIsIm9uU2hhcmVDYWxsYmFjayIsInJlcyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJmZXRjaCIsIl9sb2FkQ2xzZXMiLCJoaWRlTG9hZGluZyIsInJlc3VsdCIsIm1vZGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsZUFBUyxDQUZKO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMsbUJBQWEsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUE4RSxTQUE5RSxFQUF5RixvQkFBekYsRUFBK0csb0JBQS9HLENBSlI7QUFLTEMsdUJBQWlCLElBTFo7QUFNTEMsbUJBQWEsSUFOUjtBQU9MQyxpQkFBVyxlQUFNQTtBQVBaLEssUUFVUEMsTyxHQUFVO0FBQ1JDLFdBRFEsaUJBQ0ZDLEtBREUsRUFDSztBQUNY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cUIsTUFBTDtrREFDT3hCLEtBQUswQyxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBakdpQixlQUFLRSxJOztrQkFBbkI3QyxLIiwiZmlsZSI6IkluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgY2hlY2tNb2RlOiB0cnVlLFxuICAgIHBhZ2VOdW06IDEsXG4gICAgcGFnZVNpemU6IDEwLFxuICAgIHJhbmRvbUNvbG9yOiBbJyNmZmFkZDInLCAnI2ZmYTM5ZScsICcjZmZiYjk2JywgJyNmZmQ1OTEnLCAnI2ZmZTU4ZicsICcjMTNjMmMyJywgJyM1MmM0MWEnLCAnI2EwZDkxMScsICdyZ2IoMTE5LCAyMTgsIDIzNiknLCAncmdiKDEyMSwgMjE2LCAxNDMpJ10sXG4gICAgY2xhc3NpZmljYXRpb25zOiBudWxsLFxuICAgIGFkdmVydGlzZXJzOiBudWxsLFxuICAgIHVybFByZWZpeDogdXRpbHMudXJsUHJlZml4XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHRhcEFkKGZpY0lkKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZCA9IGZpY0lkO1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gMTtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IG51bGw7XG4gICAgICBpZiAodGhpcy5jaGVja01vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0YXBDbGFzc2lmaWNhdGlvbihjbHNJZCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgLi9GaWN0aW9uP2Nsc0lkPSR7Y2xzSWR9YFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgbGV0IGFkUmV0ID0gYXdhaXQgdGhpcy5fbG9hZEFkcyh0aGlzLnBhZ2VOdW0gKyAxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICBsZXQgYWRzID0gWy4uLnRoaXMuYWR2ZXJ0aXNlcnNdO1xuICAgIHRoaXMuYWR2ZXJ0aXNlcnMgPSBhZHMuY29uY2F0KGFkUmV0KTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0aW9ucykge1xuICAgIGNvbnN0IG9wZW5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLm9wZW5pZDtcbiAgICBjb25zdCB0aW1lU3RhbXAgPSBtb21lbnQoRGF0ZS5ub3coKSkuZm9ybWF0KCdZWVlZLU1NLUREVEhIOm1tOnNzLnNzcycpO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBgL3BhZ2VzL0luZGV4P2Zyb21PcGVuaWQ9JHtvcGVuaWR9JnNoYXJlRGF0ZT0ke3RpbWVTdGFtcH1gLFxuICAgICAgY29tcGxldGU6IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm9uU2hhcmVDYWxsYmFjayhyZXMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhc3luYyBfaW5pdCgpIHtcbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJ1xuICAgIH0pO1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N5c3RlbWNvbmZpZ3MvMWBcbiAgICB9KTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgLy/pnZ7lrqHmoLjmqKHlvI9cbiAgICAgIGlmIChkYXRhICE9PSAxKSB7XG4gICAgICAgIHRoaXMuY2hlY2tNb2RlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkQ2xzZXMoKTtcbiAgICAgIGNvbnN0IGFkUmV0ID0gYXdhaXQgdGhpcy5fbG9hZEFkcygxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICAgIGlmIChhZFJldCkge1xuICAgICAgICB0aGlzLmFkdmVydGlzZXJzID0gYWRSZXQ7XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gIH1cblxuICBhc3luYyBfbG9hZENsc2VzKCkge1xuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jbGFzc2lmaWNhdGlvbnNgXG4gICAgfSk7XG4gICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICB0aGlzLmNsYXNzaWZpY2F0aW9ucyA9IGRhdGEucmVzdWx0O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfbG9hZEFkcyhwYWdlTnVtLCBwYWdlU2l6ZSkge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLmNoZWNrTW9kZSA/ICdjaGVjaycgOiAnbm9ybWFsJztcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vYWRzP3BhZ2VOdW09JHtwYWdlTnVtfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfSZtb2RlPSR7bW9kZX1gXG4gICAgfSk7XG4gICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSBwYWdlTnVtO1xuICAgICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHJldHVybiBkYXRhLnJlc3VsdDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==