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
                _context.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chapters',
                  data: {
                    ficId: ficId,
                    pageNum: pageNum,
                    pageSize: pageSize
                  }
                });

              case 2:
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
                }

              case 5:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhdGFsb2cuanMiXSwibmFtZXMiOlsiQ2F0YWxvZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY2hhcHRlcnMiLCJBcnJheSIsInRvdGFsIiwicmFuZ2UiLCJyYW5nZUluZGV4IiwicGFnZVNpemUiLCJwYWdlTnVtIiwibWV0aG9kcyIsInRhcENoYXB0ZXIiLCJjaGFwSWQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInNlcmlhbCIsIm5hdmlnYXRlQmFjayIsImZpY0lkIiwiX2xvYWRDYXRhbG9ncyIsImZldGNoIiwidXJsIiwidXJsUHJlZml4IiwicmVzdWx0IiwibG9vcCIsIk1hdGgiLCJjZWlsIiwic3RhcnQiLCJpbmRleCIsImVuZCIsInB1c2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBQUlDLEtBQUosRUFETDtBQUVMQyxhQUFPLENBRkY7QUFHTEMsYUFBTyxJQUFJRixLQUFKLEVBSEY7QUFJTEcsa0JBQVksQ0FKUDtBQUtMQyxnQkFBVSxHQUxMO0FBTUxDLGVBQVM7QUFOSixLLFFBU1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsTUFESCxFQUNXO0FBQ2pCLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsTUFBeEIsR0FBaUNBLE1BQWpDO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxNQUF4QixHQUFpQyxJQUFqQztBQUNBLHVCQUFLQyxZQUFMLENBQWtCLEVBQWxCO0FBQ0Q7QUFMTyxLOzs7Ozs2QkFRRDtBQUNQLFVBQUlDLFFBQVEsS0FBS0osT0FBTCxDQUFhQyxVQUFiLENBQXdCRyxLQUFwQztBQUNBLFdBQUtDLGFBQUwsQ0FBbUJELEtBQW5CLEVBQTBCLEtBQUtSLE9BQS9CLEVBQXdDLEtBQUtELFFBQTdDO0FBQ0Q7Ozs7MkZBRW1CUyxLLEVBQU9SLE8sRUFBU0QsUTs7Ozs7Ozs7dUJBQ2IsZUFBTVcsS0FBTixDQUFZO0FBQy9CQyx1QkFBUSxlQUFNQyxTQUFkLGNBRCtCO0FBRS9CbkIsd0JBQU07QUFDSmUsZ0NBREk7QUFFSlIsb0NBRkk7QUFHSkQ7QUFISTtBQUZ5QixpQkFBWixDOzs7O0FBQWZOLG9CLFNBQUFBLEk7O0FBUU4sb0JBQUlBLEtBQUtvQixNQUFULEVBQWlCO0FBQ1hoQix1QkFEVyxHQUNILElBQUlGLEtBQUosRUFERztBQUVYbUIsc0JBRlcsR0FFSkMsS0FBS0MsSUFBTCxDQUFVdkIsS0FBS0csS0FBTCxHQUFhLEtBQUtHLFFBQTVCLENBRkk7QUFHWGtCLHVCQUhXLEdBR0gsQ0FIRzs7QUFJZix1QkFBU0MsS0FBVCxHQUFpQixDQUFqQixFQUFvQkEsUUFBUUosSUFBNUIsRUFBa0NJLE9BQWxDLEVBQTJDO0FBQ3JDQyx1QkFEcUMsR0FDL0JGLFFBQVFsQixRQUFSLEdBQW1CTixLQUFLRyxLQUF4QixHQUFnQ0gsS0FBS0csS0FBckMsR0FBNkNxQixRQUFRbEIsUUFEdEI7O0FBRXpDRiwwQkFBTXVCLElBQU4sY0FBZ0JILFFBQVEsQ0FBeEIsWUFBK0JFLEdBQS9CO0FBQ0FGLDRCQUFRRSxHQUFSO0FBQ0Q7QUFDRCx1QkFBS3RCLEtBQUwsR0FBYUEsS0FBYjtBQUNBLHVCQUFLRCxLQUFMLEdBQWFILEtBQUtHLEtBQWxCO0FBQ0EsdUJBQUtGLFFBQUwsR0FBZ0JELEtBQUtvQixNQUFyQjtBQUNBLHVCQUFLUSxNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFqRGdDLGVBQUtDLEk7O2tCQUFyQmhDLE8iLCJmaWxlIjoiQ2F0YWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebruW9lSdcbiAgfVxuXG4gIGRhdGEgPSB7XG4gICAgY2hhcHRlcnM6IG5ldyBBcnJheSgpLFxuICAgIHRvdGFsOiAwLFxuICAgIHJhbmdlOiBuZXcgQXJyYXkoKSxcbiAgICByYW5nZUluZGV4OiAwLFxuICAgIHBhZ2VTaXplOiAxMDAsXG4gICAgcGFnZU51bTogMVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICB0YXBDaGFwdGVyKGNoYXBJZCkge1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2hhcElkID0gY2hhcElkO1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gbnVsbDtcbiAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHt9KTtcbiAgICB9XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgbGV0IGZpY0lkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQ7XG4gICAgdGhpcy5fbG9hZENhdGFsb2dzKGZpY0lkLCB0aGlzLnBhZ2VOdW0sIHRoaXMucGFnZVNpemUpO1xuICB9XG5cbiAgYXN5bmMgX2xvYWRDYXRhbG9ncyhmaWNJZCwgcGFnZU51bSwgcGFnZVNpemUpIHtcbiAgICBsZXQgeyBkYXRhIH0gPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY2hhcHRlcnNgLFxuICAgICAgZGF0YToge1xuICAgICAgICBmaWNJZCxcbiAgICAgICAgcGFnZU51bSxcbiAgICAgICAgcGFnZVNpemVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIGxldCByYW5nZSA9IG5ldyBBcnJheSgpO1xuICAgICAgbGV0IGxvb3AgPSBNYXRoLmNlaWwoZGF0YS50b3RhbCAvIHRoaXMucGFnZVNpemUpO1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsb29wOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBlbmQgPSBzdGFydCArIHBhZ2VTaXplID4gZGF0YS50b3RhbCA/IGRhdGEudG90YWwgOiBzdGFydCArIHBhZ2VTaXplO1xuICAgICAgICByYW5nZS5wdXNoKGDnrKwgJHtzdGFydCArIDF9IC0gJHtlbmR9IOeroOiKgmApO1xuICAgICAgICBzdGFydCA9IGVuZDtcbiAgICAgIH1cbiAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcbiAgICAgIHRoaXMudG90YWwgPSBkYXRhLnRvdGFsO1xuICAgICAgdGhpcy5jaGFwdGVycyA9IGRhdGEucmVzdWx0O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==