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
      var openid = _wepy2.default.getStorageSync('session').user.openid;
      var timeStamp = (0, _moment2.default)(Date.now()).format('YYYY-MM-DDTHH:mm:ss.sss');
      return {
        path: '/pages/Index?fromOpenid=' + openid + '&shareDate=' + timeStamp
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImNoZWNrTW9kZSIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInJhbmRvbUNvbG9yIiwiY2xhc3NpZmljYXRpb25zIiwiYWR2ZXJ0aXNlcnMiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwQWQiLCJmaWNJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2VyaWFsIiwiY2hhcElkIiwibmF2aWdhdGVUbyIsInVybCIsInRhcENsYXNzaWZpY2F0aW9uIiwiY2xzSWQiLCJfaW5pdCIsIl9sb2FkQWRzIiwiYWRSZXQiLCJhZHMiLCJjb25jYXQiLCIkYXBwbHkiLCJvcHRpb25zIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwidGltZVN0YW1wIiwiRGF0ZSIsIm5vdyIsImZvcm1hdCIsInBhdGgiLCJmZXRjaCIsIl9sb2FkQ2xzZXMiLCJyZXN1bHQiLCJtb2RlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGVBQVMsQ0FGSjtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLG1CQUFhLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsU0FBOUUsRUFBeUYsb0JBQXpGLEVBQStHLG9CQUEvRyxDQUpSO0FBS0xDLHVCQUFpQixJQUxaO0FBTUxDLG1CQUFhLElBTlI7QUFPTEMsaUJBQVcsZUFBTUE7QUFQWixLLFFBVVBDLE8sR0FBVTtBQUNSQyxXQURRLGlCQUNGQyxLQURFLEVBQ0s7QUFDWCxhQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JGLEtBQXhCLEdBQWdDQSxLQUFoQztBQUNBLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsTUFBeEIsR0FBaUMsQ0FBakM7QUFDQSxhQUFLRixPQUFMLENBQWFDLFVBQWIsQ0FBd0JFLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsWUFBSSxLQUFLYixTQUFULEVBQW9CO0FBQ2xCO0FBQ0Q7QUFDRCx1QkFBS2MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQVhPO0FBWVJDLHVCQVpRLDZCQVlVQyxLQVpWLEVBWWlCO0FBQ3ZCLHVCQUFLSCxVQUFMLENBQWdCO0FBQ2RDLG9DQUF3QkU7QUFEVixTQUFoQjtBQUdEO0FBaEJPLEs7Ozs7OzZCQW1CRDtBQUNQLFdBQUtDLEtBQUw7QUFDRDs7O3dDQUVtQjtBQUNsQixXQUFLQSxLQUFMO0FBQ0Q7Ozs7Ozs7Ozs7O3VCQUdtQixLQUFLQyxRQUFMLENBQWMsS0FBS2xCLE9BQUwsR0FBZSxDQUE3QixFQUFnQyxLQUFLQyxRQUFyQyxDOzs7QUFBZGtCLHFCO0FBQ0FDLG1CLGdDQUFVLEtBQUtoQixXOztBQUNuQixxQkFBS0EsV0FBTCxHQUFtQmdCLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFuQjtBQUNBLHFCQUFLRyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBR2dCQyxPLEVBQVM7QUFDekIsVUFBTUMsU0FBUyxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLEVBQStCQyxJQUEvQixDQUFvQ0YsTUFBbkQ7QUFDQSxVQUFNRyxZQUFZLHNCQUFPQyxLQUFLQyxHQUFMLEVBQVAsRUFBbUJDLE1BQW5CLENBQTBCLHlCQUExQixDQUFsQjtBQUNBLGFBQU87QUFDTEMsMkNBQWlDUCxNQUFqQyxtQkFBcURHO0FBRGhELE9BQVA7QUFHRDs7Ozs7Ozs7Ozs7O3VCQUdzQixlQUFNSyxLQUFOLENBQVk7QUFDL0JsQix1QkFBUSxlQUFNVCxTQUFkO0FBRCtCLGlCQUFaLEM7Ozs7QUFBZlAsb0IsU0FBQUEsSTs7cUJBR0ZBLEk7Ozs7O0FBQ0Y7QUFDQSxvQkFBSUEsU0FBUyxDQUFiLEVBQWdCO0FBQ2QsdUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQUNELHFCQUFLdUIsTUFBTDs7dUJBQ00sS0FBS1csVUFBTCxFOzs7O3VCQUNZLEtBQUtmLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLEtBQUtqQixRQUF0QixDOzs7QUFBZGtCLHFCOztBQUNKLG9CQUFJQSxLQUFKLEVBQVc7QUFDVCx1QkFBS2YsV0FBTCxHQUFtQmUsS0FBbkI7QUFDQSx1QkFBS0csTUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBS2tCLGVBQU1VLEtBQU4sQ0FBWTtBQUMvQmxCLHVCQUFRLGVBQU1ULFNBQWQ7QUFEK0IsaUJBQVosQzs7OztBQUFmUCxvQixTQUFBQSxJOztBQUdOLG9CQUFJQSxLQUFLb0MsTUFBVCxFQUFpQjtBQUNmLHVCQUFLL0IsZUFBTCxHQUF1QkwsS0FBS29DLE1BQTVCO0FBQ0EsdUJBQUtaLE1BQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RkFHWXRCLE8sRUFBU0MsUTs7Ozs7OztBQUNoQmtDLG9CLEdBQU8sS0FBS3BDLFNBQUwsR0FBaUIsT0FBakIsR0FBMkIsUTs7dUJBQ25CLGVBQU1pQyxLQUFOLENBQVk7QUFDL0JsQix1QkFBUSxlQUFNVCxTQUFkLHFCQUF1Q0wsT0FBdkMsa0JBQTJEQyxRQUEzRCxjQUE0RWtDO0FBRDdDLGlCQUFaLEM7Ozs7QUFBZnJDLG9CLFNBQUFBLEk7O3FCQUdGQSxLQUFLb0MsTTs7Ozs7QUFDUCxxQkFBS2xDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLHFCQUFLcUIsTUFBTDtrREFDT3hCLEtBQUtvQyxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBM0ZpQixlQUFLRSxJOztrQkFBbkJ2QyxLIiwiZmlsZSI6IkluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgY2hlY2tNb2RlOiB0cnVlLFxuICAgIHBhZ2VOdW06IDEsXG4gICAgcGFnZVNpemU6IDEwLFxuICAgIHJhbmRvbUNvbG9yOiBbJyNmZmFkZDInLCAnI2ZmYTM5ZScsICcjZmZiYjk2JywgJyNmZmQ1OTEnLCAnI2ZmZTU4ZicsICcjMTNjMmMyJywgJyM1MmM0MWEnLCAnI2EwZDkxMScsICdyZ2IoMTE5LCAyMTgsIDIzNiknLCAncmdiKDEyMSwgMjE2LCAxNDMpJ10sXG4gICAgY2xhc3NpZmljYXRpb25zOiBudWxsLFxuICAgIGFkdmVydGlzZXJzOiBudWxsLFxuICAgIHVybFByZWZpeDogdXRpbHMudXJsUHJlZml4XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHRhcEFkKGZpY0lkKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZCA9IGZpY0lkO1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gMTtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IG51bGw7XG4gICAgICBpZiAodGhpcy5jaGVja01vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0YXBDbGFzc2lmaWNhdGlvbihjbHNJZCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgLi9GaWN0aW9uP2Nsc0lkPSR7Y2xzSWR9YFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIGFzeW5jIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgbGV0IGFkUmV0ID0gYXdhaXQgdGhpcy5fbG9hZEFkcyh0aGlzLnBhZ2VOdW0gKyAxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICBsZXQgYWRzID0gWy4uLnRoaXMuYWR2ZXJ0aXNlcnNdO1xuICAgIHRoaXMuYWR2ZXJ0aXNlcnMgPSBhZHMuY29uY2F0KGFkUmV0KTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgb25TaGFyZUFwcE1lc3NhZ2Uob3B0aW9ucykge1xuICAgIGNvbnN0IG9wZW5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLm9wZW5pZDtcbiAgICBjb25zdCB0aW1lU3RhbXAgPSBtb21lbnQoRGF0ZS5ub3coKSkuZm9ybWF0KCdZWVlZLU1NLUREVEhIOm1tOnNzLnNzcycpO1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBgL3BhZ2VzL0luZGV4P2Zyb21PcGVuaWQ9JHtvcGVuaWR9JnNoYXJlRGF0ZT0ke3RpbWVTdGFtcH1gXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIF9pbml0KCkge1xuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zeXN0ZW1jb25maWdzLzFgXG4gICAgfSk7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIC8v6Z2e5a6h5qC45qih5byPXG4gICAgICBpZiAoZGF0YSAhPT0gMSkge1xuICAgICAgICB0aGlzLmNoZWNrTW9kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRDbHNlcygpO1xuICAgICAgbGV0IGFkUmV0ID0gYXdhaXQgdGhpcy5fbG9hZEFkcygxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICAgIGlmIChhZFJldCkge1xuICAgICAgICB0aGlzLmFkdmVydGlzZXJzID0gYWRSZXQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2xvYWRDbHNlcygpIHtcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY2xhc3NpZmljYXRpb25zYFxuICAgIH0pO1xuICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbnMgPSBkYXRhLnJlc3VsdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2xvYWRBZHMocGFnZU51bSwgcGFnZVNpemUpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5jaGVja01vZGUgPyAnY2hlY2snIDogJ25vcm1hbCc7XG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L2Fkcz9wYWdlTnVtPSR7cGFnZU51bX0mcGFnZVNpemU9JHtwYWdlU2l6ZX0mbW9kZT0ke21vZGV9YFxuICAgIH0pO1xuICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgdGhpcy5wYWdlTnVtID0gcGFnZU51bTtcbiAgICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICByZXR1cm4gZGF0YS5yZXN1bHQ7XG4gICAgfVxuICB9XG59XG4iXX0=