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
      navigationBarTitleText: 'Read',
      navigationBarBackgroundColor: '#cab79e',
      backgroundColor: '#cab79e'
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
        this._loadContent({
          ficId: this.data.ficId,
          serial: this.data.serial + 1
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
        this._loadContent({
          ficId: this.data.ficId,
          serial: this.data.serial - 1
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
                console.log(getCurrentPages());
                ficId = this.$parent.globalData.ficId;
                chapId = this.$parent.globalData.chapId;
                serial = this.$parent.globalData.serial;
                //发起请求获取小说内容

                _context.next = 6;
                return this._loadContent({ ficId: ficId, chapId: chapId, serial: serial });

              case 6:
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var ficId = _ref3.ficId,
            chapId = _ref3.chapId,
            serial = _ref3.serial;
        var params, contentRet, modalRet;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _wepy2.default.showNavigationBarLoading();

              case 3:
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
                _context2.next = 9;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/contents',
                  data: params
                });

              case 9:
                contentRet = _context2.sent;

                if (!(contentRet.data.head && contentRet.data.head.code === '0005')) {
                  _context2.next = 29;
                  break;
                }

                this.ficId = contentRet.data.body.chapter.ficId;
                this.title = contentRet.data.body.chapter.title;
                this.chapter = contentRet.data.body.chapter;
                this.$apply();

                if (!(this.userInfo.balance >= contentRet.data.body.chapter.costBalance)) {
                  _context2.next = 26;
                  break;
                }

                _context2.next = 18;
                return _wepy2.default.showModal({
                  content: '\u5F53\u524D\u7AE0\u8282\u9700\u652F\u4ED8' + contentRet.data.body.chapter.costBalance + '\u770B\u70B9',
                  confirmText: '支付'
                });

              case 18:
                modalRet = _context2.sent;

                if (!(modalRet && modalRet.confirm)) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 22;
                return this._purchaseChapter(contentRet.data.body.chapter.id);

              case 22:
                _context2.next = 25;
                break;

              case 24:
                console.log('用户取消购买章节');

              case 25:
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 26:
                //需要充值
                this.needToCharge = true;
                this.$apply();
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 29:
                if (!(contentRet.data.result === undefined)) {
                  _context2.next = 32;
                  break;
                }

                _wepy2.default.showToast({
                  title: '已经是最后一章'
                });
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 32:
                //刷新数据
                this.needToCharge = false;
                this.content = contentRet.data.result[0];
                this.chapter = contentRet.data.result[0].chapter;
                this.serial = contentRet.data.result[0].chapter.serial;
                this.ficId = contentRet.data.result[0].fiction.id;
                this.$apply();
                //修改barTitle
                _wepy2.default.setNavigationBarTitle({
                  title: contentRet.data.result[0].chapter.title
                });
                //同步全局章节记录
                this.$parent.globalData.ficId = contentRet.data.result[0].fiction.id;
                this.$parent.globalData.chapId = contentRet.data.result[0].chapter.id;
                this.$parent.globalData.serial = contentRet.data.result[0].chapter.serial;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 45:
                _context2.prev = 45;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);

              case 48:
                _context2.prev = 48;
                _context2.next = 51;
                return _wepy2.default.hideNavigationBarLoading();

              case 51:
                this.catalogModal = false;
                this.$apply();
                return _context2.finish(48);

              case 54:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 45, 48, 54]]);
      }));

      function _loadContent(_x) {
        return _ref4.apply(this, arguments);
      }

      return _loadContent;
    }()

    /**
    * 购买章节
    */

  }, {
    key: '_purchaseChapter',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chapId) {
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

      function _purchaseChapter(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _purchaseChapter;
    }()
  }]);

  return Read;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Read , 'pages/Read'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWQuanMiXSwibmFtZXMiOlsiUmVhZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInVuaXQiLCJ1c2VySW5mbyIsImdldFN0b3JhZ2VTeW5jIiwidXNlciIsImNoYXB0ZXIiLCJmaWNJZCIsInNlcmlhbCIsImNvbnRlbnQiLCJPYmplY3QiLCJuZWVkVG9DaGFyZ2UiLCJjYXRhbG9nTW9kYWwiLCJtZXRob2RzIiwidGFwQ2hhcmdlQnRuIiwiJGFwcGx5IiwibmF2aWdhdGVUbyIsInVybCIsInRhcENvbnRlbnQiLCJ0YXBDYXRhbG9nIiwidGFwTmV4dCIsIl9sb2FkQ29udGVudCIsInRhcExhc3QiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRDdXJyZW50UGFnZXMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNoYXBJZCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInBhcmFtcyIsImZldGNoIiwidXJsUHJlZml4IiwiY29udGVudFJldCIsImhlYWQiLCJjb2RlIiwiYm9keSIsImJhbGFuY2UiLCJjb3N0QmFsYW5jZSIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwibW9kYWxSZXQiLCJjb25maXJtIiwiX3B1cmNoYXNlQ2hhcHRlciIsImlkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJmaWN0aW9uIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwicG9zdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLHVC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QyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENEO0FBQ0QsaUJBRk0sQzs7Ozs7O0FBSVB2Qix3QkFBUUMsR0FBUjs7Ozs7dUJBRU0sZUFBSzRCLHdCQUFMLEU7OztBQUNOLHFCQUFLMUMsWUFBTCxHQUFvQixLQUFwQjtBQUNBLHFCQUFLRyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSjs7Ozs7Ozs0RkFHdUJlLE07Ozs7Ozs7dUJBRWIsZUFBTXlCLElBQU4sQ0FBVztBQUNmdEMsdUJBQVEsZUFBTWlCLFNBQWQsZ0JBRGU7QUFFZmpDLHdCQUFNO0FBQ0o2QjtBQURJO0FBRlMsaUJBQVgsQzs7Ozt1QkFNQSxlQUFLUCxTQUFMLENBQWU7QUFDbkJDLHlCQUFPO0FBRFksaUJBQWYsQzs7Ozt1QkFHQSxLQUFLSCxZQUFMLENBQWtCLEtBQUtPLE9BQUwsQ0FBYUMsVUFBYixDQUF3QnRCLEtBQTFDLEVBQWlEdUIsTUFBakQsQzs7Ozs7Ozs7OztBQUVOTCx3QkFBUUMsR0FBUixDQUFZLFVBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFwTDRCLGVBQUs4QixJOztrQkFBbEI1RCxJIiwiZmlsZSI6IlJlYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB1dGlscyBmcm9tICdAL3V0aWxzL3V0aWwnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdSZWFkJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjY2FiNzllJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNjYWI3OWUnXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICB1bml0OiB1dGlscy51bml0LFxuICAgICAgdXNlckluZm86IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLFxuICAgICAgY2hhcHRlcjogbnVsbCxcbiAgICAgIGZpY0lkOiBudWxsLFxuICAgICAgc2VyaWFsOiBudWxsLFxuICAgICAgY29udGVudDogbmV3IE9iamVjdCgpLFxuICAgICAgbmVlZFRvQ2hhcmdlOiBmYWxzZSxcbiAgICAgIGNhdGFsb2dNb2RhbDogZmFsc2VcbiAgICB9O1xuXG4gICAgbWV0aG9kcyA9IHtcblxuICAgICAgLyoqXG4gICAgICAgKiDngrnlh7vlhYXlgLzmjInplK5cbiAgICAgICAqL1xuICAgICAgdGFwQ2hhcmdlQnRuKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vQ2hhcmdlJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+Wwj+ivtOWGheWuuVxuICAgICAgICovXG4gICAgICB0YXBDb250ZW50KCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dNb2RhbCA9ICF0aGlzLmNhdGFsb2dNb2RhbDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+ebruW9leaMiemUrlxuICAgICAgICovXG4gICAgICB0YXBDYXRhbG9nKCkge1xuICAgICAgICB0aGlzLmNhdGFsb2dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vQ2F0YWxvZydcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDngrnlh7vkuIvkuIDnq6BcbiAgICAgICAqL1xuICAgICAgdGFwTmV4dCgpIHtcbiAgICAgICAgdGhpcy5fbG9hZENvbnRlbnQoe1xuICAgICAgICAgIGZpY0lkOiB0aGlzLmRhdGEuZmljSWQsXG4gICAgICAgICAgc2VyaWFsOiB0aGlzLmRhdGEuc2VyaWFsICsgMVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4iuS4gOeroFxuICAgICAgICovXG4gICAgICB0YXBMYXN0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnNlcmlhbCA9PT0gMSkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5piv56ys5LiA56ugJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2FkQ29udGVudCh7XG4gICAgICAgICAgZmljSWQ6IHRoaXMuZGF0YS5maWNJZCxcbiAgICAgICAgICBzZXJpYWw6IHRoaXMuZGF0YS5zZXJpYWwgLSAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZyhnZXRDdXJyZW50UGFnZXMoKSk7XG4gICAgICBsZXQgZmljSWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZDtcbiAgICAgIGxldCBjaGFwSWQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jaGFwSWQ7XG4gICAgICBsZXQgc2VyaWFsID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsO1xuICAgICAgLy/lj5Hotbfor7fmsYLojrflj5blsI/or7TlhoXlrrlcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRDb250ZW50KHsgZmljSWQ6IGZpY0lkLCBjaGFwSWQ6IGNoYXBJZCwgc2VyaWFsOiBzZXJpYWwgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2xvYWRDb250ZW50KHsgZmljSWQsIGNoYXBJZCwgc2VyaWFsIH0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8v5pi+56S6dGl0bGUgbG9hZGluZ1xuICAgICAgICBhd2FpdCB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IE9iamVjdCgpO1xuICAgICAgICBpZiAoZmljSWQpIHtcbiAgICAgICAgICBwYXJhbXMuZmljSWQgPSBmaWNJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhcElkKSB7XG4gICAgICAgICAgcGFyYW1zLmNoYXBJZCA9IGNoYXBJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VyaWFsKSB7XG4gICAgICAgICAgcGFyYW1zLnNlcmlhbCA9IHNlcmlhbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29udGVudFJldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY29udGVudHNgLFxuICAgICAgICAgIGRhdGE6IHBhcmFtc1xuICAgICAgICB9KTtcbiAgICAgICAgLy/nq6DoioLkuI3lj6/nnItcbiAgICAgICAgaWYgKGNvbnRlbnRSZXQuZGF0YS5oZWFkICYmIGNvbnRlbnRSZXQuZGF0YS5oZWFkLmNvZGUgPT09ICcwMDA1Jykge1xuICAgICAgICAgIHRoaXMuZmljSWQgPSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLmZpY0lkO1xuICAgICAgICAgIHRoaXMudGl0bGUgPSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLnRpdGxlO1xuICAgICAgICAgIHRoaXMuY2hhcHRlciA9IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXI7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBpZiAodGhpcy51c2VySW5mby5iYWxhbmNlID49IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuY29zdEJhbGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBtb2RhbFJldCA9IGF3YWl0IHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgY29udGVudDogYOW9k+WJjeeroOiKgumcgOaUr+S7mCR7Y29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5jb3N0QmFsYW5jZX3nnIvngrlgLFxuICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+aUr+S7mCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGFsUmV0ICYmIG1vZGFsUmV0LmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgLy/otK3kubDnq6DoioJcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHVyY2hhc2VDaGFwdGVyKGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+WPlua2iOi0reS5sOeroOiKgicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8v6ZyA6KaB5YWF5YC8XG4gICAgICAgICAgdGhpcy5uZWVkVG9DaGFyZ2UgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+WIpOaWreaYr+WQpuacgOWQjueroOiKglxuICAgICAgICBpZiAoY29udGVudFJldC5kYXRhLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mmK/mnIDlkI7kuIDnq6AnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+WIt+aWsOaVsOaNrlxuICAgICAgICB0aGlzLm5lZWRUb0NoYXJnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdO1xuICAgICAgICB0aGlzLmNoYXB0ZXIgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdLmNoYXB0ZXI7XG4gICAgICAgIHRoaXMuc2VyaWFsID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5jaGFwdGVyLnNlcmlhbDtcbiAgICAgICAgdGhpcy5maWNJZCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uZmljdGlvbi5pZDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgLy/kv67mlLliYXJUaXRsZVxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uY2hhcHRlci50aXRsZVxuICAgICAgICB9KTtcbiAgICAgICAgLy/lkIzmraXlhajlsYDnq6DoioLorrDlvZVcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdLmZpY3Rpb24uaWQ7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uY2hhcHRlci5pZDtcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5jaGFwdGVyLnNlcmlhbDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGF3YWl0IHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDotK3kubDnq6DoioJcbiAgICAqL1xuICAgIGFzeW5jIF9wdXJjaGFzZUNoYXB0ZXIoY2hhcElkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB1dGlscy5wb3N0KHtcbiAgICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vdXNlcmFzc2V0c2AsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhcElkXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6LSt5Lmw5oiQ5YqfISdcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2xvYWRDb250ZW50KHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmZpY0lkLCBjaGFwSWQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfotK3kubDnq6DoioLlj5HnlJ/lvILluLgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==