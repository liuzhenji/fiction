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

var Catalog = function (_wepy$page) {
  _inherits(Catalog, _wepy$page);

  function Catalog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Catalog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Catalog.__proto__ || Object.getPrototypeOf(Catalog)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '目录'
    }, _this.data = {
      chapters: new Array(),
      total: 0,
      range: new Array(),
      rangeIndex: 0,
      pageSize: 100,
      pageNum: 1
    }, _this.methods = {
      tapChapter: function tapChapter(chapId) {
        this.$parent.globalData.chapId = chapId;
        this.$parent.globalData.serial = null;
        _wepy2.default.navigateBack({});
      },
      bindPickerChange: function bindPickerChange(e) {
        this.rangeIndex = e.detail.value;
        this.$apply();
        var ficId = this.$parent.globalData.ficId;
        this._loadCatalogs(ficId, parseInt(this.rangeIndex) + 1, this.pageSize);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Catalog, [{
    key: 'onLoad',
    value: function onLoad() {
      var ficId = this.$parent.globalData.ficId;
      this._loadCatalogs(ficId, this.pageNum, this.pageSize);
    }
  }, {
    key: '_loadCatalogs',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ficId, pageNum, pageSize) {
        var _ref3, data, range, loop, start, index, end;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _wepy2.default.showLoading({
                  title: '疯狂加载'
                });
                _context.next = 3;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chapters',
                  data: {
                    ficId: ficId,
                    pageNum: pageNum,
                    pageSize: pageSize
                  }
                });

              case 3:
                _ref3 = _context.sent;
                data = _ref3.data;

                if (data.result) {
                  range = new Array();
                  loop = Math.ceil(data.total / this.pageSize);
                  start = 0;

                  for (index = 0; index < loop; index++) {
                    end = start + pageSize > data.total ? data.total : start + pageSize;

                    range.push('\u7B2C ' + (start + 1) + ' - ' + end + ' \u7AE0\u8282');
                    start = end;
                  }
                  this.range = range;
                  this.total = data.total;
                  this.chapters = data.result;
                  this.$apply();
                  _wepy2.default.hideLoading();
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _loadCatalogs(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return _loadCatalogs;
    }()
  }]);

  return Catalog;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Catalog , 'pages/Catalog'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhdGFsb2cuanMiXSwibmFtZXMiOlsiQ2F0YWxvZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY2hhcHRlcnMiLCJBcnJheSIsInRvdGFsIiwicmFuZ2UiLCJyYW5nZUluZGV4IiwicGFnZVNpemUiLCJwYWdlTnVtIiwibWV0aG9kcyIsInRhcENoYXB0ZXIiLCJjaGFwSWQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlcmlhbCIsIm5hdmlnYXRlQmFjayIsImJpbmRQaWNrZXJDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJmaWNJZCIsIl9sb2FkQ2F0YWxvZ3MiLCJwYXJzZUludCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJmZXRjaCIsInVybCIsInVybFByZWZpeCIsInJlc3VsdCIsImxvb3AiLCJNYXRoIiwiY2VpbCIsInN0YXJ0IiwiaW5kZXgiLCJlbmQiLCJwdXNoIiwiaGlkZUxvYWRpbmciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBQUlDLEtBQUosRUFETDtBQUVMQyxhQUFPLENBRkY7QUFHTEMsYUFBTyxJQUFJRixLQUFKLEVBSEY7QUFJTEcsa0JBQVksQ0FKUDtBQUtMQyxnQkFBVSxHQUxMO0FBTUxDLGVBQVM7QUFOSixLLFFBU1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsTUFESCxFQUNXO0FBQ2pCLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsTUFBeEIsR0FBaUNBLE1BQWpDO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxNQUF4QixHQUFpQyxJQUFqQztBQUNBLHVCQUFLQyxZQUFMLENBQWtCLEVBQWxCO0FBQ0QsT0FMTztBQU1SQyxzQkFOUSw0QkFNU0MsQ0FOVCxFQU1ZO0FBQ2xCLGFBQUtYLFVBQUwsR0FBa0JXLEVBQUVDLE1BQUYsQ0FBU0MsS0FBM0I7QUFDQSxhQUFLQyxNQUFMO0FBQ0EsWUFBSUMsUUFBUSxLQUFLVCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JRLEtBQXBDO0FBQ0EsYUFBS0MsYUFBTCxDQUFtQkQsS0FBbkIsRUFBMEJFLFNBQVMsS0FBS2pCLFVBQWQsSUFBNEIsQ0FBdEQsRUFBeUQsS0FBS0MsUUFBOUQ7QUFDRDtBQVhPLEs7Ozs7OzZCQWNEO0FBQ1AsVUFBSWMsUUFBUSxLQUFLVCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JRLEtBQXBDO0FBQ0EsV0FBS0MsYUFBTCxDQUFtQkQsS0FBbkIsRUFBMEIsS0FBS2IsT0FBL0IsRUFBd0MsS0FBS0QsUUFBN0M7QUFDRDs7OzsyRkFFbUJjLEssRUFBT2IsTyxFQUFTRCxROzs7Ozs7O0FBQ2xDLCtCQUFLaUIsV0FBTCxDQUFpQjtBQUNmQyx5QkFBTztBQURRLGlCQUFqQjs7dUJBR3FCLGVBQU1DLEtBQU4sQ0FBWTtBQUMvQkMsdUJBQVEsZUFBTUMsU0FBZCxjQUQrQjtBQUUvQjNCLHdCQUFNO0FBQ0pvQixnQ0FESTtBQUVKYixvQ0FGSTtBQUdKRDtBQUhJO0FBRnlCLGlCQUFaLEM7Ozs7QUFBZk4sb0IsU0FBQUEsSTs7QUFRTixvQkFBSUEsS0FBSzRCLE1BQVQsRUFBaUI7QUFDWHhCLHVCQURXLEdBQ0gsSUFBSUYsS0FBSixFQURHO0FBRVgyQixzQkFGVyxHQUVKQyxLQUFLQyxJQUFMLENBQVUvQixLQUFLRyxLQUFMLEdBQWEsS0FBS0csUUFBNUIsQ0FGSTtBQUdYMEIsdUJBSFcsR0FHSCxDQUhHOztBQUlmLHVCQUFTQyxLQUFULEdBQWlCLENBQWpCLEVBQW9CQSxRQUFRSixJQUE1QixFQUFrQ0ksT0FBbEMsRUFBMkM7QUFDckNDLHVCQURxQyxHQUMvQkYsUUFBUTFCLFFBQVIsR0FBbUJOLEtBQUtHLEtBQXhCLEdBQWdDSCxLQUFLRyxLQUFyQyxHQUE2QzZCLFFBQVExQixRQUR0Qjs7QUFFekNGLDBCQUFNK0IsSUFBTixjQUFnQkgsUUFBUSxDQUF4QixZQUErQkUsR0FBL0I7QUFDQUYsNEJBQVFFLEdBQVI7QUFDRDtBQUNELHVCQUFLOUIsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsdUJBQUtELEtBQUwsR0FBYUgsS0FBS0csS0FBbEI7QUFDQSx1QkFBS0YsUUFBTCxHQUFnQkQsS0FBSzRCLE1BQXJCO0FBQ0EsdUJBQUtULE1BQUw7QUFDQSxpQ0FBS2lCLFdBQUw7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTNEZ0MsZUFBS0MsSTs7a0JBQXJCeEMsTyIsImZpbGUiOiJDYXRhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55uu5b2VJ1xuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBjaGFwdGVyczogbmV3IEFycmF5KCksXG4gICAgdG90YWw6IDAsXG4gICAgcmFuZ2U6IG5ldyBBcnJheSgpLFxuICAgIHJhbmdlSW5kZXg6IDAsXG4gICAgcGFnZVNpemU6IDEwMCxcbiAgICBwYWdlTnVtOiAxXG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHRhcENoYXB0ZXIoY2hhcElkKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaGFwSWQgPSBjaGFwSWQ7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXJpYWwgPSBudWxsO1xuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe30pO1xuICAgIH0sXG4gICAgYmluZFBpY2tlckNoYW5nZShlKSB7XG4gICAgICB0aGlzLnJhbmdlSW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICBsZXQgZmljSWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZDtcbiAgICAgIHRoaXMuX2xvYWRDYXRhbG9ncyhmaWNJZCwgcGFyc2VJbnQodGhpcy5yYW5nZUluZGV4KSArIDEsIHRoaXMucGFnZVNpemUpO1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQgZmljSWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZDtcbiAgICB0aGlzLl9sb2FkQ2F0YWxvZ3MoZmljSWQsIHRoaXMucGFnZU51bSwgdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuICBhc3luYyBfbG9hZENhdGFsb2dzKGZpY0lkLCBwYWdlTnVtLCBwYWdlU2l6ZSkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfnlq/ni4LliqDovb0nXG4gICAgfSk7XG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L2NoYXB0ZXJzYCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmljSWQsXG4gICAgICAgIHBhZ2VOdW0sXG4gICAgICAgIHBhZ2VTaXplXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICBsZXQgcmFuZ2UgPSBuZXcgQXJyYXkoKTtcbiAgICAgIGxldCBsb29wID0gTWF0aC5jZWlsKGRhdGEudG90YWwgLyB0aGlzLnBhZ2VTaXplKTtcbiAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9vcDsgaW5kZXgrKykge1xuICAgICAgICBsZXQgZW5kID0gc3RhcnQgKyBwYWdlU2l6ZSA+IGRhdGEudG90YWwgPyBkYXRhLnRvdGFsIDogc3RhcnQgKyBwYWdlU2l6ZTtcbiAgICAgICAgcmFuZ2UucHVzaChg56ysICR7c3RhcnQgKyAxfSAtICR7ZW5kfSDnq6DoioJgKTtcbiAgICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICB9XG4gICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gICAgICB0aGlzLnRvdGFsID0gZGF0YS50b3RhbDtcbiAgICAgIHRoaXMuY2hhcHRlcnMgPSBkYXRhLnJlc3VsdDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuICB9XG59XG4iXX0=