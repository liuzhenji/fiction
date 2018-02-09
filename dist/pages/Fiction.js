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

var Fiction = function (_wepy$page) {
  _inherits(Fiction, _wepy$page);

  function Fiction() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Fiction);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Fiction.__proto__ || Object.getPrototypeOf(Fiction)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      fictions: null,
      pageNum: 1,
      pageSize: 10,
      titleLike: null,
      clsId: null,
      urlPrefix: _util2.default.urlPrefix
    }, _this.config = {
      navigationBatTitlleText: '小说列表'
    }, _this.methods = {
      tapFiction: function tapFiction(ficId) {
        this.$parent.globalData.ficId = ficId;
        this.$parent.globalData.chapId = null;
        this.$parent.globalData.serial = 1;
        _wepy2.default.navigateTo({
          url: './Read'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Fiction, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var ret;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.titleLike = options.titleLike || null;
                this.clsId = options.clsId || null;
                _context.next = 4;
                return this._loadFictions(this.clsId, this.titleLike, 1, this.pageSize);

              case 4:
                ret = _context.sent;

                this.fictions = ret;
                this.$apply();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onPullDownRefresh',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var ret;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._loadFictions(this.clsId, this.titleLike, 1, this.pageSize);

              case 2:
                ret = _context2.sent;

                this.fictions = ret;
                this.$apply();

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onPullDownRefresh() {
        return _ref3.apply(this, arguments);
      }

      return onPullDownRefresh;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var ret, fictions;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._loadFictions(this.clsId, this.titleLike, this.pageNum + 1, this.pageSize);

              case 2:
                ret = _context3.sent;
                fictions = [].concat(_toConsumableArray(this.fictions), _toConsumableArray(ret));

                this.fictions = fictions;
                this.$apply();

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onReachBottom() {
        return _ref4.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }, {
    key: '_loadFictions',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(clsId, titleLike, pageNum, pageSize) {
        var params, _ref6, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = new Object();

                params.pageSize = pageSize;
                params.pageNum = pageNum;
                if (clsId) {
                  params.clsId = clsId;
                }
                if (titleLike) {
                  params.titleLike = titleLike;
                }
                _context4.next = 7;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/fictions',
                  data: params
                });

              case 7:
                _ref6 = _context4.sent;
                data = _ref6.data;

                if (!data.result) {
                  _context4.next = 15;
                  break;
                }

                this.pageNum = pageNum;
                this.$apply();
                return _context4.abrupt('return', data.result);

              case 15:
                return _context4.abrupt('return', new Array());

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadFictions(_x2, _x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return _loadFictions;
    }()
  }]);

  return Fiction;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Fiction , 'pages/Fiction'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpY3Rpb24uanMiXSwibmFtZXMiOlsiRmljdGlvbiIsImRhdGEiLCJmaWN0aW9ucyIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInRpdGxlTGlrZSIsImNsc0lkIiwidXJsUHJlZml4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhdFRpdGxsZVRleHQiLCJtZXRob2RzIiwidGFwRmljdGlvbiIsImZpY0lkIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjaGFwSWQiLCJzZXJpYWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3B0aW9ucyIsIl9sb2FkRmljdGlvbnMiLCJyZXQiLCIkYXBwbHkiLCJwYXJhbXMiLCJPYmplY3QiLCJmZXRjaCIsInJlc3VsdCIsIkFycmF5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtBQUVMQyxlQUFTLENBRko7QUFHTEMsZ0JBQVUsRUFITDtBQUlMQyxpQkFBVyxJQUpOO0FBS0xDLGFBQU8sSUFMRjtBQU1MQyxpQkFBVyxlQUFNQTtBQU5aLEssUUFTUEMsTSxHQUFTO0FBQ1BDLCtCQUF5QjtBQURsQixLLFFBSVRDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsS0FESCxFQUNVO0FBQ2hCLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsS0FBeEIsR0FBZ0NBLEtBQWhDO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxNQUF4QixHQUFpQyxJQUFqQztBQUNBLGFBQUtGLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkUsTUFBeEIsR0FBaUMsQ0FBakM7QUFDQSx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRDtBQVJPLEs7Ozs7OzsyRkFXR0MsTzs7Ozs7O0FBQ1gscUJBQUtkLFNBQUwsR0FBaUJjLFFBQVFkLFNBQVIsSUFBcUIsSUFBdEM7QUFDQSxxQkFBS0MsS0FBTCxHQUFhYSxRQUFRYixLQUFSLElBQWlCLElBQTlCOzt1QkFDZ0IsS0FBS2MsYUFBTCxDQUFtQixLQUFLZCxLQUF4QixFQUErQixLQUFLRCxTQUFwQyxFQUErQyxDQUEvQyxFQUFrRCxLQUFLRCxRQUF2RCxDOzs7QUFBWmlCLG1COztBQUNKLHFCQUFLbkIsUUFBTCxHQUFnQm1CLEdBQWhCO0FBQ0EscUJBQUtDLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUlnQixLQUFLRixhQUFMLENBQW1CLEtBQUtkLEtBQXhCLEVBQStCLEtBQUtELFNBQXBDLEVBQStDLENBQS9DLEVBQWtELEtBQUtELFFBQXZELEM7OztBQUFaaUIsbUI7O0FBQ0oscUJBQUtuQixRQUFMLEdBQWdCbUIsR0FBaEI7QUFDQSxxQkFBS0MsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSWdCLEtBQUtGLGFBQUwsQ0FBbUIsS0FBS2QsS0FBeEIsRUFBK0IsS0FBS0QsU0FBcEMsRUFBK0MsS0FBS0YsT0FBTCxHQUFlLENBQTlELEVBQWlFLEtBQUtDLFFBQXRFLEM7OztBQUFaaUIsbUI7QUFDQW5CLHdCLGdDQUFlLEtBQUtBLFEsc0JBQWFtQixHOztBQUNyQyxxQkFBS25CLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EscUJBQUtvQixNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQUdrQmhCLEssRUFBT0QsUyxFQUFXRixPLEVBQVNDLFE7Ozs7Ozs7QUFDekNtQixzQixHQUFTLElBQUlDLE1BQUosRTs7QUFDYkQsdUJBQU9uQixRQUFQLEdBQWtCQSxRQUFsQjtBQUNBbUIsdUJBQU9wQixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBLG9CQUFJRyxLQUFKLEVBQVc7QUFDVGlCLHlCQUFPakIsS0FBUCxHQUFlQSxLQUFmO0FBQ0Q7QUFDRCxvQkFBSUQsU0FBSixFQUFlO0FBQ2JrQix5QkFBT2xCLFNBQVAsR0FBbUJBLFNBQW5CO0FBQ0Q7O3VCQUNvQixlQUFNb0IsS0FBTixDQUFZO0FBQy9CUCx1QkFBUSxlQUFNWCxTQUFkLGNBRCtCO0FBRS9CTix3QkFBTXNCO0FBRnlCLGlCQUFaLEM7Ozs7QUFBZnRCLG9CLFNBQUFBLEk7O3FCQUlGQSxLQUFLeUIsTTs7Ozs7QUFDUCxxQkFBS3ZCLE9BQUwsR0FBZUEsT0FBZjtBQUNBLHFCQUFLbUIsTUFBTDtrREFDT3JCLEtBQUt5QixNOzs7a0RBRUwsSUFBSUMsS0FBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBakV3QixlQUFLQyxJOztrQkFBckI1QixPIiwiZmlsZSI6IkZpY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0AvdXRpbHMvdXRpbCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWN0aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgZGF0YSA9IHtcbiAgICBmaWN0aW9uczogbnVsbCxcbiAgICBwYWdlTnVtOiAxLFxuICAgIHBhZ2VTaXplOiAxMCxcbiAgICB0aXRsZUxpa2U6IG51bGwsXG4gICAgY2xzSWQ6IG51bGwsXG4gICAgdXJsUHJlZml4OiB1dGlscy51cmxQcmVmaXhcbiAgfVxuXG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmF0VGl0bGxlVGV4dDogJ+Wwj+ivtOWIl+ihqCdcbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgdGFwRmljdGlvbihmaWNJZCkge1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQgPSBmaWNJZDtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IG51bGw7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXJpYWwgPSAxO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRpdGxlTGlrZSA9IG9wdGlvbnMudGl0bGVMaWtlIHx8IG51bGw7XG4gICAgdGhpcy5jbHNJZCA9IG9wdGlvbnMuY2xzSWQgfHwgbnVsbDtcbiAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5fbG9hZEZpY3Rpb25zKHRoaXMuY2xzSWQsIHRoaXMudGl0bGVMaWtlLCAxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmZpY3Rpb25zID0gcmV0O1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5fbG9hZEZpY3Rpb25zKHRoaXMuY2xzSWQsIHRoaXMudGl0bGVMaWtlLCAxLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmZpY3Rpb25zID0gcmV0O1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBhc3luYyBvblJlYWNoQm90dG9tKCkge1xuICAgIGxldCByZXQgPSBhd2FpdCB0aGlzLl9sb2FkRmljdGlvbnModGhpcy5jbHNJZCwgdGhpcy50aXRsZUxpa2UsIHRoaXMucGFnZU51bSArIDEsIHRoaXMucGFnZVNpemUpO1xuICAgIGxldCBmaWN0aW9ucyA9IFsuLi50aGlzLmZpY3Rpb25zLCAuLi5yZXRdO1xuICAgIHRoaXMuZmljdGlvbnMgPSBmaWN0aW9ucztcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgYXN5bmMgX2xvYWRGaWN0aW9ucyhjbHNJZCwgdGl0bGVMaWtlLCBwYWdlTnVtLCBwYWdlU2l6ZSkge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgT2JqZWN0KCk7XG4gICAgcGFyYW1zLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgcGFyYW1zLnBhZ2VOdW0gPSBwYWdlTnVtO1xuICAgIGlmIChjbHNJZCkge1xuICAgICAgcGFyYW1zLmNsc0lkID0gY2xzSWQ7XG4gICAgfVxuICAgIGlmICh0aXRsZUxpa2UpIHtcbiAgICAgIHBhcmFtcy50aXRsZUxpa2UgPSB0aXRsZUxpa2U7XG4gICAgfVxuICAgIGxldCB7IGRhdGEgfSA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9maWN0aW9uc2AsXG4gICAgICBkYXRhOiBwYXJhbXNcbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIHRoaXMucGFnZU51bSA9IHBhZ2VOdW07XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgcmV0dXJuIGRhdGEucmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=