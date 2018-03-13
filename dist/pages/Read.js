'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var Read = function (_wepy$page) {
  _inherits(Read, _wepy$page);

  function Read() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Read);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Read.__proto__ || Object.getPrototypeOf(Read)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '阅读'
      // navigationBarBackgroundColor: '#cab79e',
      // backgroundColor: '#cab79e'
    }, _this.data = {
      unit: _util2.default.unit,
      userInfo: _wepy2.default.getStorageSync('session').user,
      chapter: null,
      ficId: null,
      serial: null,
      content: new Object(),
      needToCharge: false,
      catalogModal: false
    }, _this.methods = {

      /**
       * 点击充值按键
       */
      tapChargeBtn: function tapChargeBtn() {
        this.catalogModal = false;
        this.$apply();
        _wepy2.default.navigateTo({
          url: './Charge'
        });
      },

      /**
       * 点击小说内容
       */
      tapContent: function tapContent() {
        this.catalogModal = !this.catalogModal;
        this.$apply();
      },

      /**
       * 点击目录按键
       */
      tapCatalog: function tapCatalog() {
        this.catalogModal = false;
        this.$apply();
        _wepy2.default.navigateTo({
          url: './Catalog'
        });
      },

      /**
       * 点击下一章
       */
      tapNext: function tapNext() {
        this.$parent.globalData.setRead(this.ficId, null, this.serial + 1);
        _wepy2.default.redirectTo({
          url: './Read'
        });
      },

      /**
       * 点击上一章
       */
      tapLast: function tapLast() {
        if (this.data.serial === 1) {
          _wepy2.default.showToast({
            title: '已经是第一章'
          });
          return;
        }
        this.$parent.globalData.setRead(this.ficId, null, this.serial - 1);
        _wepy2.default.redirectTo({
          url: './Read'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Read, [{
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var ficId, chapId, serial;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ficId = this.$parent.globalData.ficId;
                chapId = this.$parent.globalData.chapId;
                serial = this.$parent.globalData.serial;
                //发起请求获取小说内容

                _context.next = 5;
                return this._loadContent(ficId, chapId, serial);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow() {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: '_loadContent',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ficId, chapId, serial) {
        var params, contentRet, balanceRet, balance, modalRet, newFicId, newChapter, newSerial;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                //显示loading
                _wepy2.default.showLoading({
                  title: '拼命加载'
                });
                params = new Object();

                if (ficId) {
                  params.ficId = ficId;
                }
                if (chapId) {
                  params.chapId = chapId;
                }
                if (serial) {
                  params.serial = serial;
                }
                _context2.next = 8;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/contents',
                  data: params
                });

              case 8:
                contentRet = _context2.sent;

                if (!(contentRet.data.head && contentRet.data.head.code === '0005')) {
                  _context2.next = 34;
                  break;
                }

                this.ficId = contentRet.data.body.chapter.ficId;
                this.title = contentRet.data.body.chapter.title;
                this.chapter = contentRet.data.body.chapter;
                this.$apply();
                _context2.next = 16;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/userbalances'
                });

              case 16:
                balanceRet = _context2.sent;
                balance = balanceRet.data.result[0].balance;

                if (!(balance >= contentRet.data.body.chapter.costBalance)) {
                  _context2.next = 29;
                  break;
                }

                _wepy2.default.hideLoading();
                _context2.next = 22;
                return _wepy2.default.showModal({
                  content: '\u5F53\u524D\u7AE0\u8282\u9700\u652F\u4ED8' + contentRet.data.body.chapter.costBalance + '\u770B\u70B9',
                  confirmText: '支付'
                });

              case 22:
                modalRet = _context2.sent;

                if (!(modalRet && modalRet.confirm)) {
                  _context2.next = 28;
                  break;
                }

                _context2.next = 26;
                return this._purchaseChapter(contentRet.data.body.chapter.id);

              case 26:
                _context2.next = 28;
                return this._loadContent(this.ficId, this.chapter.id, this.chapter.serial);

              case 28:
                return _context2.abrupt('return');

              case 29:
                //需要充值
                this.userInfo = _extends({}, this.userInfo, { balance: balance });
                this.needToCharge = true;
                this.$apply();
                _wepy2.default.hideLoading();
                return _context2.abrupt('return');

              case 34:
                if (!(contentRet.data.result === undefined)) {
                  _context2.next = 38;
                  break;
                }

                _wepy2.default.hideLoading();
                _wepy2.default.showToast({
                  title: '没有更新章节'
                });
                return _context2.abrupt('return');

              case 38:
                newFicId = contentRet.data.result[0].fiction.id;
                newChapter = contentRet.data.result[0].chapter;
                newSerial = newChapter.serial;
                //刷新数据

                this.needToCharge = false;
                this.content = contentRet.data.result[0];
                this.chapter = newChapter;
                this.serial = newSerial;
                this.ficId = newFicId;
                //修改barTitle
                _wepy2.default.setNavigationBarTitle({
                  title: newChapter.title
                });
                //同步全局章节记录
                this.$parent.globalData.setRead(newFicId, newChapter.id, newSerial);
                _wepy2.default.hideLoading();
                return _context2.abrupt('return');

              case 52:
                _context2.prev = 52;
                _context2.t0 = _context2['catch'](0);

                _wepy2.default.hideLoading();

              case 55:
                _context2.prev = 55;

                this.catalogModal = false;
                this.$apply();
                return _context2.finish(55);

              case 59:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 52, 55, 59]]);
      }));

      function _loadContent(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return _loadContent;
    }()

    /**
    * 购买章节
    */

  }, {
    key: '_purchaseChapter',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chapId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _util2.default.post({
                  url: _util2.default.urlPrefix + '/userassets',
                  data: {
                    chapId: chapId
                  }
                });

              case 3:
                _context3.next = 5;
                return _wepy2.default.showToast({
                  title: '购买成功!'
                });

              case 5:
                _context3.next = 7;
                return this._loadContent(this.$parent.globalData.ficId, chapId);

              case 7:
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);

                console.log('购买章节发生异常');

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function _purchaseChapter(_x4) {
        return _ref4.apply(this, arguments);
      }

      return _purchaseChapter;
    }()
  }]);

  return Read;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Read , 'pages/Read'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWQuanMiXSwibmFtZXMiOlsiUmVhZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidW5pdCIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwiY2hhcHRlciIsImZpY0lkIiwic2VyaWFsIiwiY29udGVudCIsIk9iamVjdCIsIm5lZWRUb0NoYXJnZSIsImNhdGFsb2dNb2RhbCIsIm1ldGhvZHMiLCJ0YXBDaGFyZ2VCdG4iLCIkYXBwbHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGFwQ29udGVudCIsInRhcENhdGFsb2ciLCJ0YXBOZXh0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXRSZWFkIiwicmVkaXJlY3RUbyIsInRhcExhc3QiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImNoYXBJZCIsIl9sb2FkQ29udGVudCIsInNob3dMb2FkaW5nIiwicGFyYW1zIiwiZmV0Y2giLCJ1cmxQcmVmaXgiLCJjb250ZW50UmV0IiwiaGVhZCIsImNvZGUiLCJib2R5IiwiYmFsYW5jZVJldCIsImJhbGFuY2UiLCJyZXN1bHQiLCJjb3N0QmFsYW5jZSIsImhpZGVMb2FkaW5nIiwic2hvd01vZGFsIiwiY29uZmlybVRleHQiLCJtb2RhbFJldCIsImNvbmZpcm0iLCJfcHVyY2hhc2VDaGFwdGVyIiwiaWQiLCJ1bmRlZmluZWQiLCJuZXdGaWNJZCIsImZpY3Rpb24iLCJuZXdDaGFwdGVyIiwibmV3U2VyaWFsIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwicG9zdCIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFDQTtBQUhPLEssUUFNVEMsSSxHQUFPO0FBQ0xDLFlBQU0sZUFBTUEsSUFEUDtBQUVMQyxnQkFBVSxlQUFLQyxjQUFMLENBQW9C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QUExQyxFQUFpRHFCLE1BQWpELEM7Ozs7Ozs7Ozs7QUFFTjRCLHdCQUFRQyxHQUFSLENBQVksVUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJMNEIsZUFBS0MsSTs7a0JBQWxCNUQsSSIsImZpbGUiOiJSZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6ZiF6K+7J1xuICAgICAgLy8gbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNjYWI3OWUnLFxuICAgICAgLy8gYmFja2dyb3VuZENvbG9yOiAnI2NhYjc5ZSdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgIHVuaXQ6IHV0aWxzLnVuaXQsXG4gICAgICB1c2VySW5mbzogd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnVzZXIsXG4gICAgICBjaGFwdGVyOiBudWxsLFxuICAgICAgZmljSWQ6IG51bGwsXG4gICAgICBzZXJpYWw6IG51bGwsXG4gICAgICBjb250ZW50OiBuZXcgT2JqZWN0KCksXG4gICAgICBuZWVkVG9DaGFyZ2U6IGZhbHNlLFxuICAgICAgY2F0YWxvZ01vZGFsOiBmYWxzZVxuICAgIH07XG5cbiAgICBtZXRob2RzID0ge1xuXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+WFheWAvOaMiemUrlxuICAgICAgICovXG4gICAgICB0YXBDaGFyZ2VCdG4oKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DaGFyZ2UnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye75bCP6K+05YaF5a65XG4gICAgICAgKi9cbiAgICAgIHRhcENvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gIXRoaXMuY2F0YWxvZ01vZGFsO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye755uu5b2V5oyJ6ZSuXG4gICAgICAgKi9cbiAgICAgIHRhcENhdGFsb2coKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DYXRhbG9nJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4i+S4gOeroFxuICAgICAgICovXG4gICAgICB0YXBOZXh0KCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXRSZWFkKHRoaXMuZmljSWQsIG51bGwsIHRoaXMuc2VyaWFsICsgMSk7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4iuS4gOeroFxuICAgICAgICovXG4gICAgICB0YXBMYXN0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnNlcmlhbCA9PT0gMSkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5piv56ys5LiA56ugJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXRSZWFkKHRoaXMuZmljSWQsIG51bGwsIHRoaXMuc2VyaWFsIC0gMSk7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgbGV0IGZpY0lkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQ7XG4gICAgICBsZXQgY2hhcElkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2hhcElkO1xuICAgICAgbGV0IHNlcmlhbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlcmlhbDtcbiAgICAgIC8v5Y+R6LW36K+35rGC6I635Y+W5bCP6K+05YaF5a65XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkQ29udGVudChmaWNJZCwgY2hhcElkLCBzZXJpYWwpO1xuICAgIH1cblxuICAgIGFzeW5jIF9sb2FkQ29udGVudChmaWNJZCwgY2hhcElkLCBzZXJpYWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8v5pi+56S6bG9hZGluZ1xuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+aLvOWRveWKoOi9vSdcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIGlmIChmaWNJZCkge1xuICAgICAgICAgIHBhcmFtcy5maWNJZCA9IGZpY0lkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFwSWQpIHtcbiAgICAgICAgICBwYXJhbXMuY2hhcElkID0gY2hhcElkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJpYWwpIHtcbiAgICAgICAgICBwYXJhbXMuc2VyaWFsID0gc2VyaWFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRlbnRSZXQgPSBhd2FpdCB1dGlscy5mZXRjaCh7XG4gICAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L2NvbnRlbnRzYCxcbiAgICAgICAgICBkYXRhOiBwYXJhbXNcbiAgICAgICAgfSk7XG4gICAgICAgIC8v56ug6IqC5LiN5Y+v55yLXG4gICAgICAgIGlmIChjb250ZW50UmV0LmRhdGEuaGVhZCAmJiBjb250ZW50UmV0LmRhdGEuaGVhZC5jb2RlID09PSAnMDAwNScpIHtcbiAgICAgICAgICB0aGlzLmZpY0lkID0gY29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5maWNJZDtcbiAgICAgICAgICB0aGlzLnRpdGxlID0gY29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci50aXRsZTtcbiAgICAgICAgICB0aGlzLmNoYXB0ZXIgPSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgY29uc3QgYmFsYW5jZVJldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS91c2VyYmFsYW5jZXNgXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgYmFsYW5jZSA9IGJhbGFuY2VSZXQuZGF0YS5yZXN1bHRbMF0uYmFsYW5jZTtcbiAgICAgICAgICBpZiAoYmFsYW5jZSA+PSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLmNvc3RCYWxhbmNlKSB7XG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBjb25zdCBtb2RhbFJldCA9IGF3YWl0IHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgY29udGVudDogYOW9k+WJjeeroOiKgumcgOaUr+S7mCR7Y29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5jb3N0QmFsYW5jZX3nnIvngrlgLFxuICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+aUr+S7mCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGFsUmV0ICYmIG1vZGFsUmV0LmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgLy/otK3kubDnq6DoioJcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHVyY2hhc2VDaGFwdGVyKGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuaWQpO1xuICAgICAgICAgICAgICAvL+mHjeaWsOWKoOi9veeroOiKglxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9sb2FkQ29udGVudCh0aGlzLmZpY0lkLCB0aGlzLmNoYXB0ZXIuaWQsIHRoaXMuY2hhcHRlci5zZXJpYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL+mcgOimgeWFheWAvFxuICAgICAgICAgIHRoaXMudXNlckluZm8gPSB7IC4uLnRoaXMudXNlckluZm8sIGJhbGFuY2UgfTtcbiAgICAgICAgICB0aGlzLm5lZWRUb0NoYXJnZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyA5ZCO56ug6IqCXG4gICAgICAgIGlmIChjb250ZW50UmV0LmRhdGEucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmsqHmnInmm7TmlrDnq6DoioInXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0ZpY0lkID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5maWN0aW9uLmlkO1xuICAgICAgICBjb25zdCBuZXdDaGFwdGVyID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5jaGFwdGVyO1xuICAgICAgICBjb25zdCBuZXdTZXJpYWwgPSBuZXdDaGFwdGVyLnNlcmlhbDtcbiAgICAgICAgLy/liLfmlrDmlbDmja5cbiAgICAgICAgdGhpcy5uZWVkVG9DaGFyZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXTtcbiAgICAgICAgdGhpcy5jaGFwdGVyID0gbmV3Q2hhcHRlcjtcbiAgICAgICAgdGhpcy5zZXJpYWwgPSBuZXdTZXJpYWw7XG4gICAgICAgIHRoaXMuZmljSWQgPSBuZXdGaWNJZDtcbiAgICAgICAgLy/kv67mlLliYXJUaXRsZVxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IG5ld0NoYXB0ZXIudGl0bGVcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5ZCM5q2l5YWo5bGA56ug6IqC6K6w5b2VXG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNldFJlYWQobmV3RmljSWQsIG5ld0NoYXB0ZXIuaWQsIG5ld1NlcmlhbCk7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLmNhdGFsb2dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog6LSt5Lmw56ug6IqCXG4gICAgKi9cbiAgICBhc3luYyBfcHVyY2hhc2VDaGFwdGVyKGNoYXBJZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdXRpbHMucG9zdCh7XG4gICAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJhc3NldHNgLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYXBJZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+i0reS5sOaIkOWKnyEnXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9sb2FkQ29udGVudCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZCwgY2hhcElkKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygn6LSt5Lmw56ug6IqC5Y+R55Sf5byC5bi4Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=