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

var Charge = function (_wepy$page) {
  _inherits(Charge, _wepy$page);

  function Charge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Charge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Charge.__proto__ || Object.getPrototypeOf(Charge)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      chargeTypes: new Array(),
      checkedIndex: 0,
      checkedBorderColor: '#2196F3',
      uncheckedBorderColor: '#eee',
      balance: null,
      unit: _util2.default.unit
    }, _this.methods = {
      onRadioChange: function onRadioChange(e) {
        this.checkedIndex = e.detail.value;
        this.$apply();
      },
      tapChargeBtn: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var chargeType, _ref3, data, session;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  //唤起微信支付功能
                  //充值记录
                  chargeType = this.chargeTypes[this.checkedIndex];
                  _context.next = 3;
                  return _util2.default.post({
                    url: _util2.default.urlPrefix + '/chargeproducts',
                    data: {
                      chargeTypeId: chargeType.id
                    }
                  });

                case 3:
                  _ref3 = _context.sent;
                  data = _ref3.data;

                  console.log(data);
                  if (data) {
                    _wepy2.default.showToast({
                      title: '充值成功'
                    });
                    //更新本地用户余额
                    session = _wepy2.default.getStorageSync('session');

                    session.user.balance += chargeType.balance + (chargeType.bonusType ? chargeType.bonusType.price * _util2.default.ratio : 0);
                    _wepy2.default.setStorageSync('session', session);
                    this.balance = session.user.balance;
                    this.$apply();
                  }

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function tapChargeBtn() {
          return _ref2.apply(this, arguments);
        }

        return tapChargeBtn;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Charge, [{
    key: 'onLoad',
    value: function onLoad() {
      this.balance = _wepy2.default.getStorageSync('session').user.balance;
      this.$apply();
      this._loadChargeTypes();
    }

    /**
     * 加载充值产品列表
     */

  }, {
    key: '_loadChargeTypes',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref5, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/chargetypes'
                });

              case 2:
                _ref5 = _context2.sent;
                data = _ref5.data;

                if (data.result) {
                  this.chargeTypes = data.result;
                  this.$apply();
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loadChargeTypes() {
        return _ref4.apply(this, arguments);
      }

      return _loadChargeTypes;
    }()
  }]);

  return Charge;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Charge , 'pages/Charge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJnZS5qcyJdLCJuYW1lcyI6WyJDaGFyZ2UiLCJkYXRhIiwiY2hhcmdlVHlwZXMiLCJBcnJheSIsImNoZWNrZWRJbmRleCIsImNoZWNrZWRCb3JkZXJDb2xvciIsInVuY2hlY2tlZEJvcmRlckNvbG9yIiwiYmFsYW5jZSIsInVuaXQiLCJtZXRob2RzIiwib25SYWRpb0NoYW5nZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInRhcENoYXJnZUJ0biIsImNoYXJnZVR5cGUiLCJwb3N0IiwidXJsIiwidXJsUHJlZml4IiwiY2hhcmdlVHlwZUlkIiwiaWQiLCJjb25zb2xlIiwibG9nIiwic2hvd1RvYXN0IiwidGl0bGUiLCJzZXNzaW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwiYm9udXNUeXBlIiwicHJpY2UiLCJyYXRpbyIsInNldFN0b3JhZ2VTeW5jIiwiX2xvYWRDaGFyZ2VUeXBlcyIsImZldGNoIiwicmVzdWx0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSSxHQUFPO0FBQ0xDLG1CQUFhLElBQUlDLEtBQUosRUFEUjtBQUVMQyxvQkFBYyxDQUZUO0FBR0xDLDBCQUFvQixTQUhmO0FBSUxDLDRCQUFzQixNQUpqQjtBQUtMQyxlQUFTLElBTEo7QUFNTEMsWUFBTSxlQUFNQTtBQU5QLEssUUFTUEMsTyxHQUFVO0FBQ1JDLG1CQURRLHlCQUNNQyxDQUROLEVBQ1M7QUFDZixhQUFLUCxZQUFMLEdBQW9CTyxFQUFFQyxNQUFGLENBQVNDLEtBQTdCO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BSk87QUFLRkMsa0JBTEU7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU47QUFDQTtBQUNJQyw0QkFSRSxHQVFXLEtBQUtkLFdBQUwsQ0FBaUIsS0FBS0UsWUFBdEIsQ0FSWDtBQUFBO0FBQUEseUJBU2UsZUFBTWEsSUFBTixDQUFXO0FBQzlCQyx5QkFBUSxlQUFNQyxTQUFkLG9CQUQ4QjtBQUU5QmxCLDBCQUFNO0FBQ0ptQixvQ0FBY0osV0FBV0s7QUFEckI7QUFGd0IsbUJBQVgsQ0FUZjs7QUFBQTtBQUFBO0FBU0FwQixzQkFUQSxTQVNBQSxJQVRBOztBQWVOcUIsMEJBQVFDLEdBQVIsQ0FBWXRCLElBQVo7QUFDQSxzQkFBSUEsSUFBSixFQUFVO0FBQ1IsbUNBQUt1QixTQUFMLENBQWU7QUFDYkMsNkJBQU87QUFETSxxQkFBZjtBQUdBO0FBQ0lDLDJCQUxJLEdBS00sZUFBS0MsY0FBTCxDQUFvQixTQUFwQixDQUxOOztBQU1SRCw0QkFBUUUsSUFBUixDQUFhckIsT0FBYixJQUF5QlMsV0FBV1QsT0FBWCxJQUFzQlMsV0FBV2EsU0FBWCxHQUF1QmIsV0FBV2EsU0FBWCxDQUFxQkMsS0FBckIsR0FBNkIsZUFBTUMsS0FBMUQsR0FBa0UsQ0FBeEYsQ0FBekI7QUFDQSxtQ0FBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQk4sT0FBL0I7QUFDQSx5QkFBS25CLE9BQUwsR0FBZW1CLFFBQVFFLElBQVIsQ0FBYXJCLE9BQTVCO0FBQ0EseUJBQUtPLE1BQUw7QUFDRDs7QUExQks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxLOzs7Ozs2QkE4QkQ7QUFDUCxXQUFLUCxPQUFMLEdBQWUsZUFBS29CLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JDLElBQS9CLENBQW9DckIsT0FBbkQ7QUFDQSxXQUFLTyxNQUFMO0FBQ0EsV0FBS21CLGdCQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJdUIsZUFBTUMsS0FBTixDQUFZO0FBQy9CaEIsdUJBQVEsZUFBTUMsU0FBZDtBQUQrQixpQkFBWixDOzs7O0FBQWZsQixvQixTQUFBQSxJOztBQUdOLG9CQUFJQSxLQUFLa0MsTUFBVCxFQUFpQjtBQUNmLHVCQUFLakMsV0FBTCxHQUFtQkQsS0FBS2tDLE1BQXhCO0FBQ0EsdUJBQUtyQixNQUFMO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4RCtCLGVBQUtzQixJOztrQkFBcEJwQyxNIiwiZmlsZSI6IkNoYXJnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgZGF0YSA9IHtcbiAgICBjaGFyZ2VUeXBlczogbmV3IEFycmF5KCksXG4gICAgY2hlY2tlZEluZGV4OiAwLFxuICAgIGNoZWNrZWRCb3JkZXJDb2xvcjogJyMyMTk2RjMnLFxuICAgIHVuY2hlY2tlZEJvcmRlckNvbG9yOiAnI2VlZScsXG4gICAgYmFsYW5jZTogbnVsbCxcbiAgICB1bml0OiB1dGlscy51bml0XG4gIH07XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBvblJhZGlvQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuY2hlY2tlZEluZGV4ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgYXN5bmMgdGFwQ2hhcmdlQnRuKCkge1xuICAgICAgLy/llKTotbflvq7kv6HmlK/ku5jlip/og71cbiAgICAgIC8v5YWF5YC86K6w5b2VXG4gICAgICBsZXQgY2hhcmdlVHlwZSA9IHRoaXMuY2hhcmdlVHlwZXNbdGhpcy5jaGVja2VkSW5kZXhdO1xuICAgICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMucG9zdCh7XG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jaGFyZ2Vwcm9kdWN0c2AsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjaGFyZ2VUeXBlSWQ6IGNoYXJnZVR5cGUuaWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WFheWAvOaIkOWKnydcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5pu05paw5pys5Zyw55So5oi35L2Z6aKdXG4gICAgICAgIGxldCBzZXNzaW9uID0gd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpO1xuICAgICAgICBzZXNzaW9uLnVzZXIuYmFsYW5jZSArPSAoY2hhcmdlVHlwZS5iYWxhbmNlICsgKGNoYXJnZVR5cGUuYm9udXNUeXBlID8gY2hhcmdlVHlwZS5ib251c1R5cGUucHJpY2UgKiB1dGlscy5yYXRpbyA6IDApKTtcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnc2Vzc2lvbicsIHNlc3Npb24pO1xuICAgICAgICB0aGlzLmJhbGFuY2UgPSBzZXNzaW9uLnVzZXIuYmFsYW5jZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuYmFsYW5jZSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLmJhbGFuY2U7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgICB0aGlzLl9sb2FkQ2hhcmdlVHlwZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliqDovb3lhYXlgLzkuqflk4HliJfooahcbiAgICovXG4gIGFzeW5jIF9sb2FkQ2hhcmdlVHlwZXMoKSB7XG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L2NoYXJnZXR5cGVzYFxuICAgIH0pO1xuICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgdGhpcy5jaGFyZ2VUeXBlcyA9IGRhdGEucmVzdWx0O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==