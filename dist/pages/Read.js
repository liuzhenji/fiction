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
        var params, contentRet, modalRet;
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

                _wepy2.default.hideLoading();
                this.catalogModal = false;
                this.$apply();
                return _context2.finish(48);

              case 53:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 45, 48, 53]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlYWQuanMiXSwibmFtZXMiOlsiUmVhZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidW5pdCIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwiY2hhcHRlciIsImZpY0lkIiwic2VyaWFsIiwiY29udGVudCIsIk9iamVjdCIsIm5lZWRUb0NoYXJnZSIsImNhdGFsb2dNb2RhbCIsIm1ldGhvZHMiLCJ0YXBDaGFyZ2VCdG4iLCIkYXBwbHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGFwQ29udGVudCIsInRhcENhdGFsb2ciLCJ0YXBOZXh0IiwiX2xvYWRDb250ZW50IiwidGFwTGFzdCIsInNob3dUb2FzdCIsInRpdGxlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjaGFwSWQiLCJzaG93TG9hZGluZyIsInBhcmFtcyIsImZldGNoIiwidXJsUHJlZml4IiwiY29udGVudFJldCIsImhlYWQiLCJjb2RlIiwiYm9keSIsImJhbGFuY2UiLCJjb3N0QmFsYW5jZSIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwibW9kYWxSZXQiLCJjb25maXJtIiwiX3B1cmNoYXNlQ2hhcHRlciIsImlkIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwidW5kZWZpbmVkIiwiZmljdGlvbiIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImhpZGVMb2FkaW5nIiwicG9zdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFDQTtBQUhPLEssUUFNVEMsSSxHQUFPO0FBQ0xDLFlBQU0sZUFBTUEsSUFEUDtBQUVMQyxnQkFBVSxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLEVBQStCQyxJQUZwQztBQUdMQyxlQUFTLElBSEo7QUFJTEMsYUFB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QUtHLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlKOzs7Ozs7OzRGQUd1QlksTTs7Ozs7Ozt1QkFFYixlQUFNMkIsSUFBTixDQUFXO0FBQ2ZyQyx1QkFBUSxlQUFNYyxTQUFkLGdCQURlO0FBRWY5Qix3QkFBTTtBQUNKMEI7QUFESTtBQUZTLGlCQUFYLEM7Ozs7dUJBTUEsZUFBS0osU0FBTCxDQUFlO0FBQ25CQyx5QkFBTztBQURZLGlCQUFmLEM7Ozs7dUJBR0EsS0FBS0gsWUFBTCxDQUFrQixLQUFLSSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JuQixLQUExQyxFQUFpRG9CLE1BQWpELEM7Ozs7Ozs7Ozs7QUFFTmlCLHdCQUFRQyxHQUFSLENBQVksVUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJMNEIsZUFBS1UsSTs7a0JBQWxCekQsSSIsImZpbGUiOiJSZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXRpbHMgZnJvbSAnQC91dGlscy91dGlsJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6ZiF6K+7J1xuICAgICAgLy8gbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNjYWI3OWUnLFxuICAgICAgLy8gYmFja2dyb3VuZENvbG9yOiAnI2NhYjc5ZSdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgIHVuaXQ6IHV0aWxzLnVuaXQsXG4gICAgICB1c2VySW5mbzogd2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnVzZXIsXG4gICAgICBjaGFwdGVyOiBudWxsLFxuICAgICAgZmljSWQ6IG51bGwsXG4gICAgICBzZXJpYWw6IG51bGwsXG4gICAgICBjb250ZW50OiBuZXcgT2JqZWN0KCksXG4gICAgICBuZWVkVG9DaGFyZ2U6IGZhbHNlLFxuICAgICAgY2F0YWxvZ01vZGFsOiBmYWxzZVxuICAgIH07XG5cbiAgICBtZXRob2RzID0ge1xuXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+WFheWAvOaMiemUrlxuICAgICAgICovXG4gICAgICB0YXBDaGFyZ2VCdG4oKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DaGFyZ2UnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye75bCP6K+05YaF5a65XG4gICAgICAgKi9cbiAgICAgIHRhcENvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gIXRoaXMuY2F0YWxvZ01vZGFsO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye755uu5b2V5oyJ6ZSuXG4gICAgICAgKi9cbiAgICAgIHRhcENhdGFsb2coKSB7XG4gICAgICAgIHRoaXMuY2F0YWxvZ01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9DYXRhbG9nJ1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOeCueWHu+S4i+S4gOeroFxuICAgICAgICovXG4gICAgICB0YXBOZXh0KCkge1xuICAgICAgICB0aGlzLl9sb2FkQ29udGVudCh7XG4gICAgICAgICAgZmljSWQ6IHRoaXMuZGF0YS5maWNJZCxcbiAgICAgICAgICBzZXJpYWw6IHRoaXMuZGF0YS5zZXJpYWwgKyAxXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog54K55Ye75LiK5LiA56ugXG4gICAgICAgKi9cbiAgICAgIHRhcExhc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc2VyaWFsID09PSAxKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mmK/nrKzkuIDnq6AnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvYWRDb250ZW50KHtcbiAgICAgICAgICBmaWNJZDogdGhpcy5kYXRhLmZpY0lkLFxuICAgICAgICAgIHNlcmlhbDogdGhpcy5kYXRhLnNlcmlhbCAtIDFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jIG9uU2hvdygpIHtcbiAgICAgIGxldCBmaWNJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmZpY0lkO1xuICAgICAgbGV0IGNoYXBJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZDtcbiAgICAgIGxldCBzZXJpYWwgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5zZXJpYWw7XG4gICAgICAvL+WPkei1t+ivt+axguiOt+WPluWwj+ivtOWGheWuuVxuICAgICAgYXdhaXQgdGhpcy5fbG9hZENvbnRlbnQoeyBmaWNJZDogZmljSWQsIGNoYXBJZDogY2hhcElkLCBzZXJpYWw6IHNlcmlhbCB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBfbG9hZENvbnRlbnQoeyBmaWNJZCwgY2hhcElkLCBzZXJpYWwgfSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy/mmL7npLpsb2FkaW5nXG4gICAgICAgIGF3YWl0IHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5ou85ZG95Yqg6L29J1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgaWYgKGZpY0lkKSB7XG4gICAgICAgICAgcGFyYW1zLmZpY0lkID0gZmljSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXBJZCkge1xuICAgICAgICAgIHBhcmFtcy5jaGFwSWQgPSBjaGFwSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcmlhbCkge1xuICAgICAgICAgIHBhcmFtcy5zZXJpYWwgPSBzZXJpYWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGVudFJldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcbiAgICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vY29udGVudHNgLFxuICAgICAgICAgIGRhdGE6IHBhcmFtc1xuICAgICAgICB9KTtcbiAgICAgICAgLy/nq6DoioLkuI3lj6/nnItcbiAgICAgICAgaWYgKGNvbnRlbnRSZXQuZGF0YS5oZWFkICYmIGNvbnRlbnRSZXQuZGF0YS5oZWFkLmNvZGUgPT09ICcwMDA1Jykge1xuICAgICAgICAgIHRoaXMuZmljSWQgPSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLmZpY0lkO1xuICAgICAgICAgIHRoaXMudGl0bGUgPSBjb250ZW50UmV0LmRhdGEuYm9keS5jaGFwdGVyLnRpdGxlO1xuICAgICAgICAgIHRoaXMuY2hhcHRlciA9IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXI7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBpZiAodGhpcy51c2VySW5mby5iYWxhbmNlID49IGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuY29zdEJhbGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBtb2RhbFJldCA9IGF3YWl0IHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgY29udGVudDogYOW9k+WJjeeroOiKgumcgOaUr+S7mCR7Y29udGVudFJldC5kYXRhLmJvZHkuY2hhcHRlci5jb3N0QmFsYW5jZX3nnIvngrlgLFxuICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+aUr+S7mCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGFsUmV0ICYmIG1vZGFsUmV0LmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgLy/otK3kubDnq6DoioJcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHVyY2hhc2VDaGFwdGVyKGNvbnRlbnRSZXQuZGF0YS5ib2R5LmNoYXB0ZXIuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+WPlua2iOi0reS5sOeroOiKgicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8v6ZyA6KaB5YWF5YC8XG4gICAgICAgICAgdGhpcy5uZWVkVG9DaGFyZ2UgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+WIpOaWreaYr+WQpuacgOWQjueroOiKglxuICAgICAgICBpZiAoY29udGVudFJldC5kYXRhLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mmK/mnIDlkI7kuIDnq6AnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+WIt+aWsOaVsOaNrlxuICAgICAgICB0aGlzLm5lZWRUb0NoYXJnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdO1xuICAgICAgICB0aGlzLmNoYXB0ZXIgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdLmNoYXB0ZXI7XG4gICAgICAgIHRoaXMuc2VyaWFsID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5jaGFwdGVyLnNlcmlhbDtcbiAgICAgICAgdGhpcy5maWNJZCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uZmljdGlvbi5pZDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgLy/kv67mlLliYXJUaXRsZVxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uY2hhcHRlci50aXRsZVxuICAgICAgICB9KTtcbiAgICAgICAgLy/lkIzmraXlhajlsYDnq6DoioLorrDlvZVcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQgPSBjb250ZW50UmV0LmRhdGEucmVzdWx0WzBdLmZpY3Rpb24uaWQ7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNoYXBJZCA9IGNvbnRlbnRSZXQuZGF0YS5yZXN1bHRbMF0uY2hhcHRlci5pZDtcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuc2VyaWFsID0gY29udGVudFJldC5kYXRhLnJlc3VsdFswXS5jaGFwdGVyLnNlcmlhbDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOi0reS5sOeroOiKglxuICAgICovXG4gICAgYXN5bmMgX3B1cmNoYXNlQ2hhcHRlcihjaGFwSWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHV0aWxzLnBvc3Qoe1xuICAgICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS91c2VyYXNzZXRzYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFwSWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfotK3kubDmiJDlip8hJ1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fbG9hZENvbnRlbnQodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZmljSWQsIGNoYXBJZCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+i0reS5sOeroOiKguWPkeeUn+W8guW4uCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuIl19