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
      console.log(options);
      return {
        path: '/pages/Index?name=aaron&age=12',
        success: function success(res) {
          console.log('success', res);
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
                  _context2.next = 15;
                  break;
                }

                if (!(data === 1)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return');

              case 7:
                this.checkMode = false;
                this.$apply();
                _context2.next = 11;
                return this._loadClses();

              case 11:
                _context2.next = 13;
                return this._loadAds(1, this.pageSize);

              case 13:
                adRet = _context2.sent;

                if (adRet) {
                  this.advertisers = adRet;
                  this.$apply();
                }

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
        var _ref8, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/ads?pageNum=' + pageNum + '&pageSize=' + pageSize
                });

              case 2:
                _ref8 = _context4.sent;
                data = _ref8.data;

                if (!data.result) {
                  _context4.next = 9;
                  break;
                }

                this.pageNum = pageNum;
                this.pageSize = pageSize;
                this.$apply();
                return _context4.abrupt('return', data.result);

              case 9:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImNoZWNrTW9kZSIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInJhbmRvbUNvbG9yIiwiY2xhc3NpZmljYXRpb25zIiwiYWR2ZXJ0aXNlcnMiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwQWQiLCJmaWNJZCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic2VyaWFsIiwiY2hhcElkIiwibmF2aWdhdGVUbyIsInVybCIsInRhcENsYXNzaWZpY2F0aW9uIiwiY2xzSWQiLCJfaW5pdCIsIl9sb2FkQWRzIiwiYWRSZXQiLCJhZHMiLCJjb25jYXQiLCIkYXBwbHkiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsInBhdGgiLCJzdWNjZXNzIiwicmVzIiwiZmV0Y2giLCJfbG9hZENsc2VzIiwicmVzdWx0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxlQUFTLENBRko7QUFHTEMsZ0JBQVUsRUFITDtBQUlMQyxtQkFBYSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELEVBQW1FLFNBQW5FLEVBQThFLFNBQTlFLEVBQXlGLG9CQUF6RixFQUErRyxvQkFBL0csQ0FKUjtBQUtMQyx1QkFBaUIsSUFMWjtBQU1MQyxtQkFBYSxJQU5SO0FBT0xDLGlCQUFXLGVBQU1BO0FBUFosSyxRQVVQQyxPLEdBQVU7QUFDUkMsV0FEUSxpQkFDRkMsS0FERSxFQUNLO0FBQ1gsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCRixLQUF4QixHQUFnQ0EsS0FBaEM7QUFDQSxhQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLE1BQXhCLEdBQWlDLENBQWpDO0FBQ0EsYUFBS0YsT0FBTCxDQUFhQyxVQUFiLENBQXdCRSxNQUF4QixHQUFpQyxJQUFqQztBQUNBLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BUk87QUFTUkMsdUJBVFEsNkJBU1VDLEtBVFYsRUFTaUI7QUFDdkIsdUJBQUtILFVBQUwsQ0FBZ0I7QUFDZEMsb0NBQXdCRTtBQURWLFNBQWhCO0FBR0Q7QUFiTyxLOzs7Ozs2QkFnQkQ7QUFDUCxXQUFLQyxLQUFMO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsV0FBS0EsS0FBTDtBQUNEOzs7Ozs7Ozs7Ozt1QkFHbUIsS0FBS0MsUUFBTCxDQUFjLEtBQUtsQixPQUFMLEdBQWUsQ0FBN0IsRUFBZ0MsS0FBS0MsUUFBckMsQzs7O0FBQWRrQixxQjtBQUNBQyxtQixnQ0FBVSxLQUFLaEIsVzs7QUFDbkIscUJBQUtBLFdBQUwsR0FBbUJnQixJQUFJQyxNQUFKLENBQVdGLEtBQVgsQ0FBbkI7QUFDQSxxQkFBS0csTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQUdnQkMsTyxFQUFTO0FBQ3pCQyxjQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxhQUFPO0FBQ0xHLGNBQU0sZ0NBREQ7QUFFTEMsaUJBQVMsc0JBQU87QUFDZEgsa0JBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCRyxHQUF2QjtBQUNEO0FBSkksT0FBUDtBQU1EOzs7Ozs7Ozs7Ozs7dUJBR3NCLGVBQU1DLEtBQU4sQ0FBWTtBQUMvQmYsdUJBQVEsZUFBTVQsU0FBZDtBQUQrQixpQkFBWixDOzs7O0FBQWZQLG9CLFNBQUFBLEk7O3FCQUdGQSxJOzs7OztzQkFDRUEsU0FBUyxDOzs7Ozs7OztBQUdiLHFCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EscUJBQUt1QixNQUFMOzt1QkFDTSxLQUFLUSxVQUFMLEU7Ozs7dUJBQ1ksS0FBS1osUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBS2pCLFFBQXRCLEM7OztBQUFka0IscUI7O0FBQ0osb0JBQUlBLEtBQUosRUFBVztBQUNULHVCQUFLZixXQUFMLEdBQW1CZSxLQUFuQjtBQUNBLHVCQUFLRyxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFLa0IsZUFBTU8sS0FBTixDQUFZO0FBQy9CZix1QkFBUSxlQUFNVCxTQUFkO0FBRCtCLGlCQUFaLEM7Ozs7QUFBZlAsb0IsU0FBQUEsSTs7QUFHTixvQkFBSUEsS0FBS2lDLE1BQVQsRUFBaUI7QUFDZix1QkFBSzVCLGVBQUwsR0FBdUJMLEtBQUtpQyxNQUE1QjtBQUNBLHVCQUFLVCxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEZBR1l0QixPLEVBQVNDLFE7Ozs7Ozs7O3VCQUNELGVBQU00QixLQUFOLENBQVk7QUFDL0JmLHVCQUFRLGVBQU1ULFNBQWQscUJBQXVDTCxPQUF2QyxrQkFBMkRDO0FBRDVCLGlCQUFaLEM7Ozs7QUFBZkgsb0IsU0FBQUEsSTs7cUJBR0ZBLEtBQUtpQyxNOzs7OztBQUNQLHFCQUFLL0IsT0FBTCxHQUFlQSxPQUFmO0FBQ0EscUJBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EscUJBQUtxQixNQUFMO2tEQUNPeEIsS0FBS2lDLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF6RmlCLGVBQUtDLEk7O2tCQUFuQm5DLEsiLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0AvdXRpbHMvdXRpbCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgY2hlY2tNb2RlOiB0cnVlLFxuICAgIHBhZ2VOdW06IDEsXG4gICAgcGFnZVNpemU6IDEwLFxuICAgIHJhbmRvbUNvbG9yOiBbJyNmZmFkZDInLCAnI2ZmYTM5ZScsICcjZmZiYjk2JywgJyNmZmQ1OTEnLCAnI2ZmZTU4ZicsICcjMTNjMmMyJywgJyM1MmM0MWEnLCAnI2EwZDkxMScsICdyZ2IoMTE5LCAyMTgsIDIzNiknLCAncmdiKDEyMSwgMjE2LCAxNDMpJ10sXG4gICAgY2xhc3NpZmljYXRpb25zOiBudWxsLFxuICAgIGFkdmVydGlzZXJzOiBudWxsLFxuICAgIHVybFByZWZpeDogdXRpbHMudXJsUHJlZml4XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHRhcEFkKGZpY0lkKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZCA9IGZpY0lkO1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gMTtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IG51bGw7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL1JlYWQnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRhcENsYXNzaWZpY2F0aW9uKGNsc0lkKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAuL0ZpY3Rpb24/Y2xzSWQ9JHtjbHNJZH1gXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgYXN5bmMgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBsZXQgYWRSZXQgPSBhd2FpdCB0aGlzLl9sb2FkQWRzKHRoaXMucGFnZU51bSArIDEsIHRoaXMucGFnZVNpemUpO1xuICAgIGxldCBhZHMgPSBbLi4udGhpcy5hZHZlcnRpc2Vyc107XG4gICAgdGhpcy5hZHZlcnRpc2VycyA9IGFkcy5jb25jYXQoYWRSZXQpO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBvblNoYXJlQXBwTWVzc2FnZShvcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6ICcvcGFnZXMvSW5kZXg/bmFtZT1hYXJvbiZhZ2U9MTInLFxuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnLCByZXMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhc3luYyBfaW5pdCgpIHtcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc3lzdGVtY29uZmlncy8xYFxuICAgIH0pO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrTW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRDbHNlcygpO1xuICAgICAgbGV0IGFkUmV0ID0gYXdhaXQgdGhpcy5fbG9hZEFkcygxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICAgIGlmIChhZFJldCkge1xuICAgICAgICB0aGlzLmFkdmVydGlzZXJzID0gYWRSZXQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2xvYWRDbHNlcygpIHtcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY2xhc3NpZmljYXRpb25zYFxuICAgIH0pO1xuICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgdGhpcy5jbGFzc2lmaWNhdGlvbnMgPSBkYXRhLnJlc3VsdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2xvYWRBZHMocGFnZU51bSwgcGFnZVNpemUpIHtcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vYWRzP3BhZ2VOdW09JHtwYWdlTnVtfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWBcbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IHBhZ2VOdW07XG4gICAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgcmV0dXJuIGRhdGEucmVzdWx0O1xuICAgIH1cbiAgfVxufVxuIl19