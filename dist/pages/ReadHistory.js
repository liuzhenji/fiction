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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadHistroy = function (_wepy$page) {
  _inherits(ReadHistroy, _wepy$page);

  function ReadHistroy() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReadHistroy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReadHistroy.__proto__ || Object.getPrototypeOf(ReadHistroy)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '阅读历史',
      enablePullDownRefresh: true
    }, _this.data = {
      checkMode: true,
      histories: null,
      pageNum: 1,
      pageSize: 10,
      urlPrefix: _util2.default.urlPrefix
    }, _this.methods = {
      tapHistory: function tapHistory(itemIndex) {
        var history = this.histories[itemIndex];
        this.$parent.globalData.ficId = history.fiction.id;
        this.$parent.globalData.chapId = history.chapter.id;
        this.$parent.globalData.serial = null;
        _wepy2.default.navigateTo({
          url: './Read'
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReadHistroy, [{
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
    value: function onShow() {
      this._init();
    }

    /**
     * 下拉刷新
     */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this._init();
    }

    /**
     * 到达底部
     */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      this._loadHistories(this.pageNum + 1, this.pageSize);
    }
  }, {
    key: '_init',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var checkMode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/systemconfigs/1'
                });

              case 2:
                checkMode = _context.sent;

                if (!(checkMode.data === 1)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                this.checkMode = false;
                this.pageNum = 1;
                this.histories = null;
                this.$apply();
                _context.next = 11;
                return this._loadHistories(1, this.pageSize);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _init() {
        return _ref2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: '_loadHistories',
    value: function _loadHistories(pageNum, pageSize) {
      var _this2 = this;

      return _util2.default.fetch({
        url: _util2.default.urlPrefix + '/readhistories?pageNum=' + pageNum + '&pageSize=' + pageSize
      }).then(function (ret) {
        var histories = new Array();
        for (var index in ret.data.result) {
          var history = new Object();
          history.fiction = ret.data.result[index].fiction;
          history.chapter = ret.data.result[index].chapter;
          histories.push(history);
        }
        _this2.histories = histories;
        _this2.pageNum = 1;
        _this2.$apply();
      });
    }
  }]);

  return ReadHistroy;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ReadHistroy , 'pages/ReadHistory'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWRIaXN0b3J5LmpzIl0sIm5hbWVzIjpbIlJlYWRIaXN0cm95IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJjaGVja01vZGUiLCJoaXN0b3JpZXMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwSGlzdG9yeSIsIml0ZW1JbmRleCIsImhpc3RvcnkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImZpY0lkIiwiZmljdGlvbiIsImlkIiwiY2hhcElkIiwiY2hhcHRlciIsInNlcmlhbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJldmVudHMiLCJvcHRpb25zIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwidGltZVN0YW1wIiwiRGF0ZSIsIm5vdyIsImZvcm1hdCIsInBhdGgiLCJfaW5pdCIsIl9sb2FkSGlzdG9yaWVzIiwiZmV0Y2giLCIkYXBwbHkiLCJ0aGVuIiwicmV0IiwiQXJyYXkiLCJpbmRleCIsInJlc3VsdCIsIk9iamVjdCIsInB1c2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsaUJBQVcsSUFGTjtBQUdMQyxlQUFTLENBSEo7QUFJTEMsZ0JBQVUsRUFKTDtBQUtMQyxpQkFBVyxlQUFNQTtBQUxaLEssUUFRUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxTQURILEVBQ2M7QUFDcEIsWUFBSUMsVUFBVSxLQUFLUCxTQUFMLENBQWVNLFNBQWYsQ0FBZDtBQUNBLGFBQUtFLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FBeEIsR0FBZ0NILFFBQVFJLE9BQVIsQ0FBZ0JDLEVBQWhEO0FBQ0EsYUFBS0osT0FBTCxDQUFhQyxVQUFiLENBQXdCSSxNQUF4QixHQUFpQ04sUUFBUU8sT0FBUixDQUFnQkYsRUFBakQ7QUFDQSxhQUFLSixPQUFMLENBQWFDLFVBQWIsQ0FBd0JNLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFUTyxLLFFBWVZDLE0sR0FBUyxFOzs7OztzQ0FFU0MsTyxFQUFTO0FBQ3pCLFVBQU1DLFNBQVMsZUFBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQkMsSUFBL0IsQ0FBb0NGLE1BQW5EO0FBQ0EsVUFBTUcsWUFBWSxzQkFBT0MsS0FBS0MsR0FBTCxFQUFQLEVBQW1CQyxNQUFuQixDQUEwQix5QkFBMUIsQ0FBbEI7QUFDQSxhQUFPO0FBQ0xDLDJDQUFpQ1AsTUFBakMsbUJBQXFERztBQURoRCxPQUFQO0FBR0Q7Ozs2QkFFUTtBQUNQLFdBQUtLLEtBQUw7QUFDRDs7QUFFRDs7Ozs7O3dDQUdvQjtBQUNsQixXQUFLQSxLQUFMO0FBQ0Q7O0FBRUQ7Ozs7OztvQ0FHZ0I7QUFDZCxXQUFLQyxjQUFMLENBQW9CLEtBQUs1QixPQUFMLEdBQWUsQ0FBbkMsRUFBc0MsS0FBS0MsUUFBM0M7QUFDRDs7Ozs7Ozs7Ozs7dUJBR3VCLGVBQU00QixLQUFOLENBQVk7QUFDaENiLHVCQUFRLGVBQU1kLFNBQWQ7QUFEZ0MsaUJBQVosQzs7O0FBQWxCSix5Qjs7c0JBR0FBLFVBQVVELElBQVYsS0FBbUIsQzs7Ozs7Ozs7QUFHdkIscUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxxQkFBS0UsT0FBTCxHQUFlLENBQWY7QUFDQSxxQkFBS0QsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHFCQUFLK0IsTUFBTDs7dUJBQ00sS0FBS0YsY0FBTCxDQUFvQixDQUFwQixFQUF1QixLQUFLM0IsUUFBNUIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUdPRCxPLEVBQVNDLFEsRUFBVTtBQUFBOztBQUNoQyxhQUFPLGVBQU00QixLQUFOLENBQVk7QUFDakJiLGFBQVEsZUFBTWQsU0FBZCwrQkFBaURGLE9BQWpELGtCQUFxRUM7QUFEcEQsT0FBWixFQUVKOEIsSUFGSSxDQUVDLFVBQUNDLEdBQUQsRUFBUztBQUNmLFlBQUlqQyxZQUFZLElBQUlrQyxLQUFKLEVBQWhCO0FBQ0EsYUFBSyxJQUFJQyxLQUFULElBQWtCRixJQUFJbkMsSUFBSixDQUFTc0MsTUFBM0IsRUFBbUM7QUFDakMsY0FBSTdCLFVBQVUsSUFBSThCLE1BQUosRUFBZDtBQUNBOUIsa0JBQVFJLE9BQVIsR0FBa0JzQixJQUFJbkMsSUFBSixDQUFTc0MsTUFBVCxDQUFnQkQsS0FBaEIsRUFBdUJ4QixPQUF6QztBQUNBSixrQkFBUU8sT0FBUixHQUFrQm1CLElBQUluQyxJQUFKLENBQVNzQyxNQUFULENBQWdCRCxLQUFoQixFQUF1QnJCLE9BQXpDO0FBQ0FkLG9CQUFVc0MsSUFBVixDQUFlL0IsT0FBZjtBQUNEO0FBQ0QsZUFBS1AsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGVBQUs4QixNQUFMO0FBQ0QsT0FiTSxDQUFQO0FBY0Q7Ozs7RUFuRnNDLGVBQUtRLEk7O2tCQUF6QjdDLFciLCJmaWxlIjoiUmVhZEhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhZEhpc3Ryb3kgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpmIXor7vljoblj7InLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICBjaGVja01vZGU6IHRydWUsXG4gICAgICBoaXN0b3JpZXM6IG51bGwsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgdXJsUHJlZml4OiB1dGlscy51cmxQcmVmaXhcbiAgICB9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRhcEhpc3RvcnkoaXRlbUluZGV4KSB7XG4gICAgICAgIGxldCBoaXN0b3J5ID0gdGhpcy5oaXN0b3JpZXNbaXRlbUluZGV4XTtcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQgPSBoaXN0b3J5LmZpY3Rpb24uaWQ7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IGhpc3RvcnkuY2hhcHRlci5pZDtcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gbnVsbDtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL1JlYWQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IG9wZW5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLm9wZW5pZDtcbiAgICAgIGNvbnN0IHRpbWVTdGFtcCA9IG1vbWVudChEYXRlLm5vdygpKS5mb3JtYXQoJ1lZWVktTU0tRERUSEg6bW06c3Muc3NzJyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRoOiBgL3BhZ2VzL0luZGV4P2Zyb21PcGVuaWQ9JHtvcGVuaWR9JnNoYXJlRGF0ZT0ke3RpbWVTdGFtcH1gXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIvmi4nliLfmlrBcbiAgICAgKi9cbiAgICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliLDovr7lupXpg6hcbiAgICAgKi9cbiAgICBvblJlYWNoQm90dG9tKCkge1xuICAgICAgdGhpcy5fbG9hZEhpc3Rvcmllcyh0aGlzLnBhZ2VOdW0gKyAxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB9XG5cbiAgICBhc3luYyBfaW5pdCgpIHtcbiAgICAgIGxldCBjaGVja01vZGUgPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zeXN0ZW1jb25maWdzLzFgXG4gICAgICB9KTtcbiAgICAgIGlmIChjaGVja01vZGUuZGF0YSA9PT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrTW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wYWdlTnVtID0gMTtcbiAgICAgIHRoaXMuaGlzdG9yaWVzID0gbnVsbDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkSGlzdG9yaWVzKDEsIHRoaXMucGFnZVNpemUpO1xuICAgIH1cblxuICAgIF9sb2FkSGlzdG9yaWVzKHBhZ2VOdW0sIHBhZ2VTaXplKSB7XG4gICAgICByZXR1cm4gdXRpbHMuZmV0Y2goe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vcmVhZGhpc3Rvcmllcz9wYWdlTnVtPSR7cGFnZU51bX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gXG4gICAgICB9KS50aGVuKChyZXQpID0+IHtcbiAgICAgICAgbGV0IGhpc3RvcmllcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiByZXQuZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICBsZXQgaGlzdG9yeSA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgICBoaXN0b3J5LmZpY3Rpb24gPSByZXQuZGF0YS5yZXN1bHRbaW5kZXhdLmZpY3Rpb247XG4gICAgICAgICAgaGlzdG9yeS5jaGFwdGVyID0gcmV0LmRhdGEucmVzdWx0W2luZGV4XS5jaGFwdGVyO1xuICAgICAgICAgIGhpc3Rvcmllcy5wdXNoKGhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlzdG9yaWVzID0gaGlzdG9yaWVzO1xuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=