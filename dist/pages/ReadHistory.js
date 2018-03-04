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
        this.$parent.globalData.setRead(history.fiction.id, history.chapter.id, null);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWRIaXN0b3J5LmpzIl0sIm5hbWVzIjpbIlJlYWRIaXN0cm95IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJjaGVja01vZGUiLCJoaXN0b3JpZXMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwSGlzdG9yeSIsIml0ZW1JbmRleCIsImhpc3RvcnkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNldFJlYWQiLCJmaWN0aW9uIiwiaWQiLCJjaGFwdGVyIiwibmF2aWdhdGVUbyIsInVybCIsImV2ZW50cyIsIm9wdGlvbnMiLCJvcGVuaWQiLCJnZXRTdG9yYWdlU3luYyIsInVzZXIiLCJ0aW1lU3RhbXAiLCJEYXRlIiwibm93IiwiZm9ybWF0IiwicGF0aCIsIl9pbml0IiwiX2xvYWRIaXN0b3JpZXMiLCJmZXRjaCIsIiRhcHBseSIsInRoZW4iLCJyZXQiLCJBcnJheSIsImluZGV4IiwicmVzdWx0IiwiT2JqZWN0IiwicHVzaCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUtUQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxpQkFBVyxJQUZOO0FBR0xDLGVBQVMsQ0FISjtBQUlMQyxnQkFBVSxFQUpMO0FBS0xDLGlCQUFXLGVBQU1BO0FBTFosSyxRQVFQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLFNBREgsRUFDYztBQUNwQixZQUFNQyxVQUFVLEtBQUtQLFNBQUwsQ0FBZU0sU0FBZixDQUFoQjtBQUNBLGFBQUtFLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsT0FBeEIsQ0FBZ0NILFFBQVFJLE9BQVIsQ0FBZ0JDLEVBQWhELEVBQW9ETCxRQUFRTSxPQUFSLENBQWdCRCxFQUFwRSxFQUF3RSxJQUF4RTtBQUNBLHVCQUFLRSxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBUE8sSyxRQVVWQyxNLEdBQVMsRTs7Ozs7c0NBRVNDLE8sRUFBUztBQUN6QixVQUFNQyxTQUFTLGVBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JDLElBQS9CLENBQW9DRixNQUFuRDtBQUNBLFVBQU1HLFlBQVksc0JBQU9DLEtBQUtDLEdBQUwsRUFBUCxFQUFtQkMsTUFBbkIsQ0FBMEIseUJBQTFCLENBQWxCO0FBQ0EsYUFBTztBQUNMQywyQ0FBaUNQLE1BQWpDLG1CQUFxREc7QUFEaEQsT0FBUDtBQUdEOzs7NkJBRVE7QUFDUCxXQUFLSyxLQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozt3Q0FHb0I7QUFDbEIsV0FBS0EsS0FBTDtBQUNEOztBQUVEOzs7Ozs7b0NBR2dCO0FBQ2QsV0FBS0MsY0FBTCxDQUFvQixLQUFLMUIsT0FBTCxHQUFlLENBQW5DLEVBQXNDLEtBQUtDLFFBQTNDO0FBQ0Q7Ozs7Ozs7Ozs7O3VCQUd5QixlQUFNMEIsS0FBTixDQUFZO0FBQ2xDYix1QkFBUSxlQUFNWixTQUFkO0FBRGtDLGlCQUFaLEM7OztBQUFsQkoseUI7O3NCQUdGQSxVQUFVRCxJQUFWLEtBQW1CLEM7Ozs7Ozs7O0FBR3ZCLHFCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EscUJBQUtFLE9BQUwsR0FBZSxDQUFmO0FBQ0EscUJBQUtELFNBQUwsR0FBaUIsSUFBakI7QUFDQSxxQkFBSzZCLE1BQUw7O3VCQUNNLEtBQUtGLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsS0FBS3pCLFFBQTVCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FHT0QsTyxFQUFTQyxRLEVBQVU7QUFBQTs7QUFDaEMsYUFBTyxlQUFNMEIsS0FBTixDQUFZO0FBQ2pCYixhQUFRLGVBQU1aLFNBQWQsK0JBQWlERixPQUFqRCxrQkFBcUVDO0FBRHBELE9BQVosRUFFSjRCLElBRkksQ0FFQyxVQUFDQyxHQUFELEVBQVM7QUFDZixZQUFJL0IsWUFBWSxJQUFJZ0MsS0FBSixFQUFoQjtBQUNBLGFBQUssSUFBSUMsS0FBVCxJQUFrQkYsSUFBSWpDLElBQUosQ0FBU29DLE1BQTNCLEVBQW1DO0FBQ2pDLGNBQUkzQixVQUFVLElBQUk0QixNQUFKLEVBQWQ7QUFDQTVCLGtCQUFRSSxPQUFSLEdBQWtCb0IsSUFBSWpDLElBQUosQ0FBU29DLE1BQVQsQ0FBZ0JELEtBQWhCLEVBQXVCdEIsT0FBekM7QUFDQUosa0JBQVFNLE9BQVIsR0FBa0JrQixJQUFJakMsSUFBSixDQUFTb0MsTUFBVCxDQUFnQkQsS0FBaEIsRUFBdUJwQixPQUF6QztBQUNBYixvQkFBVW9DLElBQVYsQ0FBZTdCLE9BQWY7QUFDRDtBQUNELGVBQUtQLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxlQUFLNEIsTUFBTDtBQUNELE9BYk0sQ0FBUDtBQWNEOzs7O0VBakZzQyxlQUFLUSxJOztrQkFBekIzQyxXIiwiZmlsZSI6IlJlYWRIaXN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWRIaXN0cm95IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6ZiF6K+75Y6G5Y+yJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgY2hlY2tNb2RlOiB0cnVlLFxuICAgICAgaGlzdG9yaWVzOiBudWxsLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgIHVybFByZWZpeDogdXRpbHMudXJsUHJlZml4XG4gICAgfTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXBIaXN0b3J5KGl0ZW1JbmRleCkge1xuICAgICAgICBjb25zdCBoaXN0b3J5ID0gdGhpcy5oaXN0b3JpZXNbaXRlbUluZGV4XTtcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2V0UmVhZChoaXN0b3J5LmZpY3Rpb24uaWQsIGhpc3RvcnkuY2hhcHRlci5pZCwgbnVsbCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG5cbiAgICBvblNoYXJlQXBwTWVzc2FnZShvcHRpb25zKSB7XG4gICAgICBjb25zdCBvcGVuaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJykudXNlci5vcGVuaWQ7XG4gICAgICBjb25zdCB0aW1lU3RhbXAgPSBtb21lbnQoRGF0ZS5ub3coKSkuZm9ybWF0KCdZWVlZLU1NLUREVEhIOm1tOnNzLnNzcycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aDogYC9wYWdlcy9JbmRleD9mcm9tT3BlbmlkPSR7b3BlbmlkfSZzaGFyZURhdGU9JHt0aW1lU3RhbXB9YFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5ouJ5Yi35pawXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yiw6L6+5bqV6YOoXG4gICAgICovXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgIHRoaXMuX2xvYWRIaXN0b3JpZXModGhpcy5wYWdlTnVtICsgMSwgdGhpcy5wYWdlU2l6ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2luaXQoKSB7XG4gICAgICBjb25zdCBjaGVja01vZGUgPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zeXN0ZW1jb25maWdzLzFgXG4gICAgICB9KTtcbiAgICAgIGlmIChjaGVja01vZGUuZGF0YSA9PT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrTW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wYWdlTnVtID0gMTtcbiAgICAgIHRoaXMuaGlzdG9yaWVzID0gbnVsbDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkSGlzdG9yaWVzKDEsIHRoaXMucGFnZVNpemUpO1xuICAgIH1cblxuICAgIF9sb2FkSGlzdG9yaWVzKHBhZ2VOdW0sIHBhZ2VTaXplKSB7XG4gICAgICByZXR1cm4gdXRpbHMuZmV0Y2goe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vcmVhZGhpc3Rvcmllcz9wYWdlTnVtPSR7cGFnZU51bX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gXG4gICAgICB9KS50aGVuKChyZXQpID0+IHtcbiAgICAgICAgbGV0IGhpc3RvcmllcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiByZXQuZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICBsZXQgaGlzdG9yeSA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgICBoaXN0b3J5LmZpY3Rpb24gPSByZXQuZGF0YS5yZXN1bHRbaW5kZXhdLmZpY3Rpb247XG4gICAgICAgICAgaGlzdG9yeS5jaGFwdGVyID0gcmV0LmRhdGEucmVzdWx0W2luZGV4XS5jaGFwdGVyO1xuICAgICAgICAgIGhpc3Rvcmllcy5wdXNoKGhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlzdG9yaWVzID0gaGlzdG9yaWVzO1xuICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=