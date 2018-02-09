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
    key: 'onLoad',
    value: function onLoad() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWRIaXN0b3J5LmpzIl0sIm5hbWVzIjpbIlJlYWRIaXN0cm95IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJjaGVja01vZGUiLCJoaXN0b3JpZXMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJ1cmxQcmVmaXgiLCJtZXRob2RzIiwidGFwSGlzdG9yeSIsIml0ZW1JbmRleCIsImhpc3RvcnkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImZpY0lkIiwiZmljdGlvbiIsImlkIiwiY2hhcElkIiwiY2hhcHRlciIsInNlcmlhbCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJldmVudHMiLCJfaW5pdCIsIl9sb2FkSGlzdG9yaWVzIiwiZmV0Y2giLCIkYXBwbHkiLCJ0aGVuIiwicmV0IiwiQXJyYXkiLCJpbmRleCIsInJlc3VsdCIsIk9iamVjdCIsInB1c2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFFBS1RDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGlCQUFXLElBRk47QUFHTEMsZUFBUyxDQUhKO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsaUJBQVcsZUFBTUE7QUFMWixLLFFBUVBDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsU0FESCxFQUNjO0FBQ3BCLFlBQUlDLFVBQVUsS0FBS1AsU0FBTCxDQUFlTSxTQUFmLENBQWQ7QUFDQSxhQUFLRSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLEtBQXhCLEdBQWdDSCxRQUFRSSxPQUFSLENBQWdCQyxFQUFoRDtBQUNBLGFBQUtKLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksTUFBeEIsR0FBaUNOLFFBQVFPLE9BQVIsQ0FBZ0JGLEVBQWpEO0FBQ0EsYUFBS0osT0FBTCxDQUFhQyxVQUFiLENBQXdCTSxNQUF4QixHQUFpQyxJQUFqQztBQUNBLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBVE8sSyxRQVlWQyxNLEdBQVMsRTs7Ozs7NkJBRUE7QUFDUCxXQUFLQyxLQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozt3Q0FHb0I7QUFDbEIsV0FBS0EsS0FBTDtBQUNEOztBQUVEOzs7Ozs7b0NBR2dCO0FBQ2QsV0FBS0MsY0FBTCxDQUFvQixLQUFLbkIsT0FBTCxHQUFlLENBQW5DLEVBQXNDLEtBQUtDLFFBQTNDO0FBQ0Q7Ozs7Ozs7Ozs7O3VCQUd1QixlQUFNbUIsS0FBTixDQUFZO0FBQ2hDSix1QkFBUSxlQUFNZCxTQUFkO0FBRGdDLGlCQUFaLEM7OztBQUFsQkoseUI7O3NCQUdBQSxVQUFVRCxJQUFWLEtBQW1CLEM7Ozs7Ozs7O0FBR3ZCLHFCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EscUJBQUtFLE9BQUwsR0FBZSxDQUFmO0FBQ0EscUJBQUtELFNBQUwsR0FBaUIsSUFBakI7QUFDQSxxQkFBS3NCLE1BQUw7O3VCQUNNLEtBQUtGLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsS0FBS2xCLFFBQTVCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FHT0QsTyxFQUFTQyxRLEVBQVU7QUFBQTs7QUFDaEMsYUFBTyxlQUFNbUIsS0FBTixDQUFZO0FBQ2pCSixhQUFRLGVBQU1kLFNBQWQsK0JBQWlERixPQUFqRCxrQkFBcUVDO0FBRHBELE9BQVosRUFFSnFCLElBRkksQ0FFQyxVQUFDQyxHQUFELEVBQVM7QUFDZixZQUFJeEIsWUFBWSxJQUFJeUIsS0FBSixFQUFoQjtBQUNBLGFBQUssSUFBSUMsS0FBVCxJQUFrQkYsSUFBSTFCLElBQUosQ0FBUzZCLE1BQTNCLEVBQW1DO0FBQ2pDLGNBQUlwQixVQUFVLElBQUlxQixNQUFKLEVBQWQ7QUFDQXJCLGtCQUFRSSxPQUFSLEdBQWtCYSxJQUFJMUIsSUFBSixDQUFTNkIsTUFBVCxDQUFnQkQsS0FBaEIsRUFBdUJmLE9BQXpDO0FBQ0FKLGtCQUFRTyxPQUFSLEdBQWtCVSxJQUFJMUIsSUFBSixDQUFTNkIsTUFBVCxDQUFnQkQsS0FBaEIsRUFBdUJaLE9BQXpDO0FBQ0FkLG9CQUFVNkIsSUFBVixDQUFldEIsT0FBZjtBQUNEO0FBQ0QsZUFBS1AsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGVBQUtxQixNQUFMO0FBQ0QsT0FiTSxDQUFQO0FBY0Q7Ozs7RUEzRXNDLGVBQUtRLEk7O2tCQUF6QnBDLFciLCJmaWxlIjoiUmVhZEhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWRIaXN0cm95IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6ZiF6K+75Y6G5Y+yJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgY2hlY2tNb2RlOiB0cnVlLFxuICAgICAgaGlzdG9yaWVzOiBudWxsLFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgIHVybFByZWZpeDogdXRpbHMudXJsUHJlZml4XG4gICAgfTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXBIaXN0b3J5KGl0ZW1JbmRleCkge1xuICAgICAgICBsZXQgaGlzdG9yeSA9IHRoaXMuaGlzdG9yaWVzW2l0ZW1JbmRleF07XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmZpY0lkID0gaGlzdG9yeS5maWN0aW9uLmlkO1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaGFwSWQgPSBoaXN0b3J5LmNoYXB0ZXIuaWQ7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlcmlhbCA9IG51bGw7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL5ouJ5Yi35pawXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yiw6L6+5bqV6YOoXG4gICAgICovXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgIHRoaXMuX2xvYWRIaXN0b3JpZXModGhpcy5wYWdlTnVtICsgMSwgdGhpcy5wYWdlU2l6ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2luaXQoKSB7XG4gICAgICBsZXQgY2hlY2tNb2RlID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc3lzdGVtY29uZmlncy8xYFxuICAgICAgfSk7XG4gICAgICBpZiAoY2hlY2tNb2RlLmRhdGEgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja01vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFnZU51bSA9IDE7XG4gICAgICB0aGlzLmhpc3RvcmllcyA9IG51bGw7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgYXdhaXQgdGhpcy5fbG9hZEhpc3RvcmllcygxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB9XG5cbiAgICBfbG9hZEhpc3RvcmllcyhwYWdlTnVtLCBwYWdlU2l6ZSkge1xuICAgICAgcmV0dXJuIHV0aWxzLmZldGNoKHtcbiAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3JlYWRoaXN0b3JpZXM/cGFnZU51bT0ke3BhZ2VOdW19JnBhZ2VTaXplPSR7cGFnZVNpemV9YFxuICAgICAgfSkudGhlbigocmV0KSA9PiB7XG4gICAgICAgIGxldCBoaXN0b3JpZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gcmV0LmRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgbGV0IGhpc3RvcnkgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgaGlzdG9yeS5maWN0aW9uID0gcmV0LmRhdGEucmVzdWx0W2luZGV4XS5maWN0aW9uO1xuICAgICAgICAgIGhpc3RvcnkuY2hhcHRlciA9IHJldC5kYXRhLnJlc3VsdFtpbmRleF0uY2hhcHRlcjtcbiAgICAgICAgICBoaXN0b3JpZXMucHVzaChoaXN0b3J5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpc3RvcmllcyA9IGhpc3RvcmllcztcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gMTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuIl19