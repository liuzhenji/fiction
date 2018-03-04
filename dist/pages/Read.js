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
                return this._loadContent({ ficId: ficId, chapId: chapId, serial: serial });

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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var ficId = _ref3.ficId,
            chapId = _ref3.chapId,
            serial = _ref3.serial;
        var params, contentRet, modalRet, newFicId, newChapter, newSerial;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _wepy2.default.showLoading({
                  title: '拼命加载'
                });

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
                  _context2.next = 27;
                  break;
                }

                this.ficId = contentRet.data.body.chapter.ficId;
                this.title = contentRet.data.body.chapter.title;
                this.chapter = contentRet.data.body.chapter;
                //不用充值

                if (!(this.userInfo.balance >= contentRet.data.body.chapter.costBalance)) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 17;
                return _wepy2.default.showModal({
                  content: '\u5F53\u524D\u7AE0\u8282\u9700\u652F\u4ED8' + contentRet.data.body.chapter.costBalance + '\u770B\u70B9',
                  confirmText: '支付'
                });

              case 17:
                modalRet = _context2.sent;

                if (!(modalRet && modalRet.confirm)) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 21;
                return this._purchaseChapter(contentRet.data.body.chapter.id);

              case 21:
                _context2.next = 24;
                break;

              case 23:
                console.log('用户取消购买章节');

              case 24:
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 25:
                //需要充值
                this.needToCharge = true;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 27:
                if (!(contentRet.data.result === undefined)) {
                  _context2.next = 30;
                  break;
                }

                _wepy2.default.showToast({
                  title: '已经是最后一章'
                });
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 30:
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
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  resolve();
                }));

              case 43:
                _context2.prev = 43;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);

              case 46:
                _context2.prev = 46;

                _wepy2.default.hideLoading();
                this.catalogModal = false;
                this.$apply();
                return _context2.finish(46);

              case 51:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 43, 46, 51]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWQuanMiXSwibmFtZXMiOlsiUmVhZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidW5pdCIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwiY2hhcHRlciIsImZpY0lkIiwic2VyaWFsIiwiY29udGVudCIsIk9iamVjdCIsIm5lZWRUb0NoYXJnZSIsImNhdGFsb2dNb2RhbCIsIm1ldGhvZHMiLCJ0YXBDaGFyZ2VCdG4iLCIkYXBwbHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGFwQ29udGVudCIsInRhcENhdGFsb2ciLCJ0YXBOZXh0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzZXRSZWFkIiwicmVkaXJlY3RUbyIsInRhcExhc3QiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImNoYXBJZCIsIl9sb2FkQ29udGVudCIsInNob3dMb2FkaW5nIiwicGFyYW1zIiwiZmV0Y2giLCJ1cmxQcmVmaXgiLCJjb250ZW50UmV0IiwiaGVhZCIsImNvZGUiLCJib2R5IiwiYmFsYW5jZSIsImNvc3RCYWxhbmNlIiwic2hvd01vZGFsIiwiY29uZmlybVRleHQiLCJtb2RhbFJldCIsImNvbmZpcm0iLCJfcHVyY2hhc2VDaGFwdGVyIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJuZXdGaWNJZCIsImZpY3Rpb24iLCJuZXdDaGFwdGVyIiwibmV3U2VyaWFsIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaGlkZUxvYWRpbmciLCJwb3N0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUN4QjtBQUNBO0FBSE8sSyxRQU1UQyxJLEdBQU87QUFDTEMsWUFBTSxlQUFNQSxJQURQO0FBRUxDLGdCQUFVLGVB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S1IsT0FBTCxDQUFhQyxVQUFiLENBQXdCZixLQUExQyxFQUFpRHFCLE1BQWpELEM7Ozs7Ozs7Ozs7QUFFTmtCLHdCQUFRQyxHQUFSLENBQVksVUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXBMNEIsZUFBS2EsSTs7a0JBQWxCOUQsSSIsImZpbGUiOiJSZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6ZiF6K+7J1xuICAgICAgLy8gbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNjYWI3OWUnLFxuICAgICAgLy8gYmFja2dyb3VuZENvbG9yOiAnI2NhYjc5ZSdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgIHVuaXQ6IHV0aWxzLnVuaXQsXG4gICAgICB1c2VySW5mbzogd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnVzZXIsXG4gICAgICBjaGFwdGVyOiBudWxsLFxuICAgICAgZmljSWQ6IG51bGwsXG4gICAgICBzZXJpYWw6IG51bGwsXG4gICAgICBjb250ZW50OiBuZXcgT2JqZWN0KCksXG4gICAgICBuZWVkVG9DaGFyZ2U6IGZhbHNlLFxuICAgICAgY2F0YWxvZ01vZGFsOiBmYWxzZVxuICAgIH07XG5cbiAgICBtZXRob2RzID0ge1xuXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+WFheWAvOaMiemUrlxuICAgICAgICovXG4gICAgICB0YXBDaGFyZ2VCdG4oKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DaGFyZ2UnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye75bCP6K+05YaF5a65XG4gICAgICAgKi9cbiAgICAgIHRhcENvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gIXRoaXMuY2F0YWxvZ01vZGFsO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye755uu5b2V5oyJ6ZSuXG4gICAgICAgKi9cbiAgICAgIHRhcENhdGFsb2coKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DYXRhbG9nJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4i+S4gOeroFxuICAgICAgICovXG4gICAgICB0YXBOZXh0KCkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXRSZWFkKHRoaXMuZmljSWQsIG51bGwsIHRoaXMuc2VyaWFsICsgMSk7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4iuS4gOeroFxuICAgICAgICovXG4gICAgICB0YXBMYXN0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnNlcmlhbCA9PT0gMSkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5piv56ys5LiA56ugJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXRSZWFkKHRoaXMuZmljSWQsIG51bGwsIHRoaXMuc2VyaWFsIC0gMSk7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnLi9SZWFkJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgbGV0IGZpY0lkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQ7XG4gICAgICBsZXQgY2hhcElkID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2hhcElkO1xuICAgICAgbGV0IHNlcmlhbCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnNlcmlhbDtcbiAgICAgIC8v5Y+R6LW36K+35rGC6I635Y+W5bCP6K+05YaF5a65XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkQ29udGVudCh7IGZpY0lkOiBmaWNJZCwgY2hhcElkOiBjaGFwSWQsIHNlcmlhbDogc2VyaWFsIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIF9sb2FkQ29udGVudCh7IGZpY0lkLCBjaGFwSWQsIHNlcmlhbCB9KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvL+aYvuekumxvYWRpbmdcbiAgICAgICAgYXdhaXQgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfmi7zlkb3liqDovb0nXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IE9iamVjdCgpO1xuICAgICAgICBpZiAoZmljSWQpIHtcbiAgICAgICAgICBwYXJhbXMuZmljSWQgPSBmaWNJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhcElkKSB7XG4gICAgICAgICAgcGFyYW1zLmNoYXBJZCA9IGNoYXBJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VyaWFsKSB7XG4gICAgICAgICAgcGFyYW1zLnNlcmlhbCA9IHNlcmlhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250ZW50UmV0ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xuICAgICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9jb250ZW50c2AsXG4gICAgICAgICAgZGF0YTogcGFyYW1zXG4gICAgICAgIH0pO1xuICAgICAgICAvL+eroOiKguS4jeWPr+eci1xuICAgICAgICBpZiAoY29udGVudFJldC5kYXRhLmhlYWQgJiYgY29udGVudFJldC5kYXRhLmhlYWQuY29kZSA9PT0gJzAwMDUnKSB7XG4gICAgICAgICAgdGhpcy5maWNJZCA9IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuZmljSWQ7XG4gICAgICAgICAgdGhpcy50aXRsZSA9IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIudGl0bGU7XG4gICAgICAgICAgdGhpcy5jaGFwdGVyID0gY29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlcjtcbiAgICAgICAgICAvL+S4jeeUqOWFheWAvFxuICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvLmJhbGFuY2UgPj0gY29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5jb3N0QmFsYW5jZSkge1xuICAgICAgICAgICAgbGV0IG1vZGFsUmV0ID0gYXdhaXQgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICBjb250ZW50OiBg5b2T5YmN56ug6IqC6ZyA5pSv5LuYJHtjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLmNvc3RCYWxhbmNlfeeci+eCuWAsXG4gICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5pSv5LuYJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobW9kYWxSZXQgJiYgbW9kYWxSZXQuY29uZmlybSkge1xuICAgICAgICAgICAgICAvL+i0reS5sOeroOiKglxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9wdXJjaGFzZUNoYXB0ZXIoY29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5pZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi35Y+W5raI6LSt5Lmw56ug6IqCJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy/pnIDopoHlhYXlgLxcbiAgICAgICAgICB0aGlzLm5lZWRUb0NoYXJnZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+WIpOaWreaYr+WQpuacgOWQjueroOiKglxuICAgICAgICBpZiAoY29udGVudFJldC5kYXRhLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mmK/mnIDlkI7kuIDnq6AnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdGaWNJZCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uZmljdGlvbi5pZDtcbiAgICAgICAgY29uc3QgbmV3Q2hhcHRlciA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uY2hhcHRlcjtcbiAgICAgICAgY29uc3QgbmV3U2VyaWFsID0gbmV3Q2hhcHRlci5zZXJpYWw7XG4gICAgICAgIC8v5Yi35paw5pWw5o2uXG4gICAgICAgIHRoaXMubmVlZFRvQ2hhcmdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF07XG4gICAgICAgIHRoaXMuY2hhcHRlciA9IG5ld0NoYXB0ZXI7XG4gICAgICAgIHRoaXMuc2VyaWFsID0gbmV3U2VyaWFsO1xuICAgICAgICB0aGlzLmZpY0lkID0gbmV3RmljSWQ7XG4gICAgICAgIC8v5L+u5pS5YmFyVGl0bGVcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICAgIHRpdGxlOiBuZXdDaGFwdGVyLnRpdGxlXG4gICAgICAgIH0pO1xuICAgICAgICAvL+WQjOatpeWFqOWxgOeroOiKguiusOW9lVxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXRSZWFkKG5ld0ZpY0lkLCBuZXdDaGFwdGVyLmlkLCBuZXdTZXJpYWwpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICB0aGlzLmNhdGFsb2dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog6LSt5Lmw56ug6IqCXG4gICAgKi9cbiAgICBhc3luYyBfcHVyY2hhc2VDaGFwdGVyKGNoYXBJZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdXRpbHMucG9zdCh7XG4gICAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJhc3NldHNgLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYXBJZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+i0reS5sOaIkOWKnyEnXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9sb2FkQ29udGVudCh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5maWNJZCwgY2hhcElkKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygn6LSt5Lmw56ug6IqC5Y+R55Sf5byC5bi4Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=