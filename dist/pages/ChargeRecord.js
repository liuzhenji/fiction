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

var ChargeRecord = function (_wepy$page) {
  _inherits(ChargeRecord, _wepy$page);

  function ChargeRecord() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChargeRecord);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChargeRecord.__proto__ || Object.getPrototypeOf(ChargeRecord)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '充值记录'
    }, _this.data = {
      noMoreFlag: false,
      chargeRecords: new Array(),
      pageSize: 10,
      pageNum: 1
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChargeRecord, [{
    key: 'onLoad',
    value: function onLoad() {
      this._loadChargeRecords(1, this.pageSize);
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      this._loadChargeRecord(this.data.pageNum + 1, this.data.pageSize);
    }
  }, {
    key: '_loadChargeRecords',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageNum, pageSize) {
        var _ref3, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chargeproducts?pageNum=' + pageNum + '&pageSize=' + pageSize
                });

              case 2:
                _ref3 = _context.sent;
                data = _ref3.data;

                if (data.result) {
                  this.chargeRecords = data.result.map(function (value, index, array) {
                    return {
                      desc: '\u5145' + value.price + '\u5143(' + value.balance + '\u770B\u70B9)\uFF0C\u8D60' + value.bonus + '\u5143', createDate: new Date(value.createDate).toLocaleString()
                    };
                  });
                  this.pageNum = pageNum;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _loadChargeRecords(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return _loadChargeRecords;
    }()
  }]);

  return ChargeRecord;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ChargeRecord , 'pages/ChargeRecord'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJnZVJlY29yZC5qcyJdLCJuYW1lcyI6WyJDaGFyZ2VSZWNvcmQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm5vTW9yZUZsYWciLCJjaGFyZ2VSZWNvcmRzIiwiQXJyYXkiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJfbG9hZENoYXJnZVJlY29yZHMiLCJfbG9hZENoYXJnZVJlY29yZCIsImZldGNoIiwidXJsIiwidXJsUHJlZml4IiwicmVzdWx0IiwibWFwIiwidmFsdWUiLCJpbmRleCIsImFycmF5IiwiZGVzYyIsInByaWNlIiwiYmFsYW5jZSIsImJvbnVzIiwiY3JlYXRlRGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsa0JBQVksS0FEUDtBQUVMQyxxQkFBZSxJQUFJQyxLQUFKLEVBRlY7QUFHTEMsZ0JBQVUsRUFITDtBQUlMQyxlQUFTO0FBSkosSzs7Ozs7NkJBT0U7QUFDUCxXQUFLQyxrQkFBTCxDQUF3QixDQUF4QixFQUEyQixLQUFLRixRQUFoQztBQUNEOzs7b0NBRWU7QUFDZCxXQUFLRyxpQkFBTCxDQUF1QixLQUFLUCxJQUFMLENBQVVLLE9BQVYsR0FBb0IsQ0FBM0MsRUFBOEMsS0FBS0wsSUFBTCxDQUFVSSxRQUF4RDtBQUNEOzs7OzJGQUV3QkMsTyxFQUFTRCxROzs7Ozs7Ozt1QkFDWCxlQUFNSSxLQUFOLENBQVk7QUFDL0JDLHVCQUFRLGVBQU1DLFNBQWQsZ0NBQWtETCxPQUFsRCxrQkFBc0VEO0FBRHZDLGlCQUFaLEM7Ozs7QUFBZkosb0IsU0FBQUEsSTs7QUFHTixvQkFBSUEsS0FBS1csTUFBVCxFQUFpQjtBQUNmLHVCQUFLVCxhQUFMLEdBQXFCRixLQUFLVyxNQUFMLENBQVlDLEdBQVosQ0FBZ0IsVUFBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVDLEtBQWYsRUFBeUI7QUFDNUQsMkJBQU87QUFDTEMsdUNBQVVILE1BQU1JLEtBQWhCLGVBQTBCSixNQUFNSyxPQUFoQyxpQ0FBK0NMLE1BQU1NLEtBQXJELFdBREssRUFDMERDLFlBQVksSUFBSUMsSUFBSixDQUFTUixNQUFNTyxVQUFmLEVBQTJCRSxjQUEzQjtBQUR0RSxxQkFBUDtBQUdELG1CQUpvQixDQUFyQjtBQUtBLHVCQUFLakIsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsdUJBQUtrQixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFoQ3FDLGVBQUtDLEk7O2tCQUExQjNCLFkiLCJmaWxlIjoiQ2hhcmdlUmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmdlUmVjb3JkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhYXlgLzorrDlvZUnXG4gIH1cblxuICBkYXRhID0ge1xuICAgIG5vTW9yZUZsYWc6IGZhbHNlLFxuICAgIGNoYXJnZVJlY29yZHM6IG5ldyBBcnJheSgpLFxuICAgIHBhZ2VTaXplOiAxMCxcbiAgICBwYWdlTnVtOiAxXG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5fbG9hZENoYXJnZVJlY29yZHMoMSwgdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIHRoaXMuX2xvYWRDaGFyZ2VSZWNvcmQodGhpcy5kYXRhLnBhZ2VOdW0gKyAxLCB0aGlzLmRhdGEucGFnZVNpemUpO1xuICB9XG5cbiAgYXN5bmMgX2xvYWRDaGFyZ2VSZWNvcmRzKHBhZ2VOdW0sIHBhZ2VTaXplKSB7XG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L2NoYXJnZXByb2R1Y3RzP3BhZ2VOdW09JHtwYWdlTnVtfSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWBcbiAgICB9KTtcbiAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgIHRoaXMuY2hhcmdlUmVjb3JkcyA9IGRhdGEucmVzdWx0Lm1hcCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRlc2M6IGDlhYUke3ZhbHVlLnByaWNlfeWFgygke3ZhbHVlLmJhbGFuY2V955yL54K5Ke+8jOi1oCR7dmFsdWUuYm9udXN95YWDYCwgY3JlYXRlRGF0ZTogbmV3IERhdGUodmFsdWUuY3JlYXRlRGF0ZSkudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB0aGlzLnBhZ2VOdW0gPSBwYWdlTnVtO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==