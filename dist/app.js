'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _util = require('./utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    //修复wx.request的并发bug
    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/Index', 'pages/ReadHistory', 'pages/Me', 'pages/Read', 'pages/Charge', 'pages/ChargeRecord', 'pages/Fiction', 'pages/Catalog'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#cdcdcd',
        selectedColor: '#63b632',
        backgroundColor: '#ffffff',
        position: 'bottom',
        'list': [{
          'pagePath': 'pages/Index',
          'text': '首页',
          'iconPath': 'resources/index-normal.png',
          'selectedIconPath': 'resources/index-selected.png'
        }, {
          'pagePath': 'pages/ReadHistory',
          'text': '历史',
          'iconPath': 'resources/list-normal.png',
          'selectedIconPath': 'resources/list-selected.png'
        }, {
          'pagePath': 'pages/Me',
          'text': '我',
          'iconPath': 'resources/me-normal.png',
          'selectedIconPath': 'resources/me-selected.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };
    _this.use('requestfix');
    //默认将wepy.xxx方式请求小程序原生api都将promise化
    _this.use('promisify');
    //建立原生request API的拦截
    _this.intercept('request', {
      config: function config(p) {
        var oldHeader = p.header;
        var newHeader = _extends({}, oldHeader, {
          Cookie: 'JSESSIONID=' + _wepy2.default.getStorageSync('session').sessionId
        });
        p.header = newHeader;
        return p;
      },
      success: function success(res) {
        //未建立3rd 会话，则重新建立
        if (res.statusCode === 401) {
          this._createSession();
          return;
        }
        return res;
      }
    });
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch(options) {
      //开启分享设置
      _wepy2.default.showShareMenu({
        withShareTicket: true
      });
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //开启初始化蒙版
                _wepy2.default.showLoading({
                  title: '初始化信息',
                  mask: true
                });
                _context.prev = 1;
                _context.next = 4;
                return _wepy2.default.checkSession();

              case 4:
                _context.next = 12;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);
                _context.next = 10;
                return this._createSession();

              case 10:
                _context.next = 12;
                return this._statUserSource(options);

              case 12:
                _context.prev = 12;
                _context.next = 15;
                return this._loadUserInfo();

              case 15:
                _context.next = 17;
                return this._syncUserInfo();

              case 17:
                _context.next = 19;
                return _wepy2.default.hideLoading();

              case 19:
                return _context.finish(12);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6, 12, 20]]);
      }));

      function onShow(_x) {
        return _ref.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: '_statUserSource',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _util2.default.post({
                  url: _util2.default.urlPrefix + '/stat/usersources',
                  data: _util2.default.convertO2O(options, {
                    referrerInfo: {
                      refAppid: function refAppid(val) {
                        return val.appId;
                      }
                    }
                  }, _extends({}, options.query))
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _statUserSource(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _statUserSource;
    }()
  }, {
    key: '_createSession',
    value: function _createSession() {
      return _wepy2.default.login().then(function (res) {
        return _util2.default.fetch({
          url: _util2.default.urlPrefix + '/sessions',
          data: {
            code: res.code
          }
        });
      }).then(function (thrdRes) {
        return _wepy2.default.setStorageSync('session', thrdRes.data);
      });
    }

    /**
     * 获取微信用户信息
     */

  }, {
    key: '_loadUserInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var setting, ret, userInfoRet;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.globalData.userInfo) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                _context3.next = 4;
                return _wepy2.default.getSetting();

              case 4:
                setting = _context3.sent;

                if (setting.authSetting['scope.userInfo']) {
                  _context3.next = 22;
                  break;
                }

                _context3.prev = 6;
                _context3.next = 9;
                return _wepy2.default.authorize({
                  scope: 'scope.userInfo'
                });

              case 9:
                _context3.next = 22;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](6);
                _context3.next = 15;
                return _wepy2.default.hideLoading();

              case 15:
                _context3.next = 17;
                return _wepy2.default.showModal({
                  title: '警告',
                  content: '若不进行授权，本程序将不能正常运行。届时，您需要在微信【发现】-【小程序】-删掉该程序，重新搜索授权登录方可使用。'
                });

              case 17:
                ret = _context3.sent;

                if (!ret.cancel) {
                  _context3.next = 20;
                  break;
                }

                return _context3.abrupt('return');

              case 20:
                _context3.next = 22;
                return _wepy2.default.openSetting();

              case 22:
                _context3.next = 24;
                return _wepy2.default.getUserInfo();

              case 24:
                userInfoRet = _context3.sent;

                this.globalData.userInfo = userInfoRet.userInfo;
                //防止getUserInfo返回过晚
                if (this.loadUserInfoCallback) {
                  this.loadUserInfoCallback(userInfoRet.userInfo);
                }

              case 27:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 11]]);
      }));

      function _loadUserInfo() {
        return _ref3.apply(this, arguments);
      }

      return _loadUserInfo;
    }()

    /**
     * 同步微信信息到3rd server
     */

  }, {
    key: '_syncUserInfo',
    value: function _syncUserInfo() {
      var userInfo = this.globalData.userInfo;
      if (!userInfo) {
        return;
      }
      return _util2.default.post({
        url: _util2.default.urlPrefix + '/users',
        data: {
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          avatarUrl: userInfo.avatarUrl,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country,
          language: userInfo.language
        }
      }).catch(function (err) {
        //todo:输出到日志
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwb3NpdGlvbiIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsImludGVyY2VwdCIsInAiLCJvbGRIZWFkZXIiLCJoZWFkZXIiLCJuZXdIZWFkZXIiLCJDb29raWUiLCJnZXRTdG9yYWdlU3luYyIsInNlc3Npb25JZCIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXNDb2RlIiwiX2NyZWF0ZVNlc3Npb24iLCJvcHRpb25zIiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiY2hlY2tTZXNzaW9uIiwiX3N0YXRVc2VyU291cmNlIiwiX2xvYWRVc2VySW5mbyIsIl9zeW5jVXNlckluZm8iLCJoaWRlTG9hZGluZyIsInBvc3QiLCJ1cmwiLCJ1cmxQcmVmaXgiLCJkYXRhIiwiY29udmVydE8yTyIsInJlZmVycmVySW5mbyIsInJlZkFwcGlkIiwidmFsIiwiYXBwSWQiLCJxdWVyeSIsImxvZ2luIiwidGhlbiIsImZldGNoIiwiY29kZSIsInRocmRSZXMiLCJzZXRTdG9yYWdlU3luYyIsImdldFNldHRpbmciLCJzZXR0aW5nIiwiYXV0aFNldHRpbmciLCJhdXRob3JpemUiLCJzY29wZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJyZXQiLCJjYW5jZWwiLCJvcGVuU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm9SZXQiLCJsb2FkVXNlckluZm9DYWxsYmFjayIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwiY2l0eSIsInBy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b0JBQVV0RCxTQUFTc0QsUUFEZjtBQUVKQyxrQkFBUXZELFNBQVN1RCxNQUZiO0FBR0pDLHFCQUFXeEQsU0FBU3dELFNBSGhCO0FBSUpDLGdCQUFNekQsU0FBU3lELElBSlg7QUFLSkMsb0JBQVUxRCxTQUFTMEQsUUFMZjtBQU1KQyxtQkFBUzNELFNBQVMyRCxPQU5kO0FBT0pDLG9CQUFVNUQsU0FBUzREO0FBUGY7QUFGVSxPQUFYLEVBV0pDLEtBWEksQ0FXRSxlQUFPO0FBQ2Q7QUFDRCxPQWJNLENBQVA7QUFjRDs7OztFQXJNMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL0luZGV4JyxcclxuICAgICAgJ3BhZ2VzL1JlYWRIaXN0b3J5JyxcclxuICAgICAgJ3BhZ2VzL01lJyxcclxuICAgICAgJ3BhZ2VzL1JlYWQnLFxyXG4gICAgICAncGFnZXMvQ2hhcmdlJyxcclxuICAgICAgJ3BhZ2VzL0NoYXJnZVJlY29yZCcsXHJcbiAgICAgICdwYWdlcy9GaWN0aW9uJyxcclxuICAgICAgJ3BhZ2VzL0NhdGFsb2cnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgY29sb3I6ICcjY2RjZGNkJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyM2M2I2MzInLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgcG9zaXRpb246ICdib3R0b20nLFxyXG4gICAgICAnbGlzdCc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvSW5kZXgnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn6aaW6aG1JyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdyZXNvdXJjZXMvaW5kZXgtbm9ybWFsLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdyZXNvdXJjZXMvaW5kZXgtc2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL1JlYWRIaXN0b3J5JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+WOhuWPsicsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAncmVzb3VyY2VzL2xpc3Qtbm9ybWFsLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdyZXNvdXJjZXMvbGlzdC1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvTWUnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5oiRJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdyZXNvdXJjZXMvbWUtbm9ybWFsLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdyZXNvdXJjZXMvbWUtc2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLy/kv67lpI13eC5yZXF1ZXN055qE5bm25Y+RYnVnXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xyXG4gICAgLy/pu5jorqTlsIZ3ZXB5Lnh4eOaWueW8j+ivt+axguWwj+eoi+W6j+WOn+eUn2FwaemDveWwhnByb21pc2XljJZcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIC8v5bu656uL5Y6f55SfcmVxdWVzdCBBUEnnmoTmi6bmiKpcclxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG4gICAgICBjb25maWcgKHApIHtcclxuICAgICAgICBsZXQgb2xkSGVhZGVyID0gcC5oZWFkZXI7XHJcbiAgICAgICAgbGV0IG5ld0hlYWRlciA9IHsuLi5vbGRIZWFkZXIsXHJcbiAgICAgICAgICBDb29raWU6IGBKU0VTU0lPTklEPSR7d2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnNlc3Npb25JZH1gXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwLmhlYWRlciA9IG5ld0hlYWRlcjtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgLy/mnKrlu7rnq4szcmQg5Lya6K+d77yM5YiZ6YeN5paw5bu656uLXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA0MDEpIHtcclxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVNlc3Npb24oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICAvL+W8gOWQr+WIhuS6q+iuvue9rlxyXG4gICAgd2VweS5zaG93U2hhcmVNZW51KHtcclxuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAvL+W8gOWQr+WIneWni+WMluiSmeeJiFxyXG4gICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yid5aeL5YyW5L+h5oGvJyxcclxuICAgICAgbWFzazogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvL+agoemqjOS8muivnVxyXG4gICAgICBhd2FpdCB3ZXB5LmNoZWNrU2Vzc2lvbigpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvL+W7uueri+aWsOS8muivnVxyXG4gICAgICBhd2FpdCB0aGlzLl9jcmVhdGVTZXNzaW9uKCk7XHJcbiAgICAgIC8v5Y+R6LW355So5oi35p2l5rqQ5pWw5o2u57uf6K6hXHJcbiAgICAgIGF3YWl0IHRoaXMuX3N0YXRVc2VyU291cmNlKG9wdGlvbnMpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgLy/lkIzmraXnlKjmiLfkv6Hmga/liLAzcmQgc2VydmVyXHJcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRVc2VySW5mbygpO1xyXG4gICAgICBhd2FpdCB0aGlzLl9zeW5jVXNlckluZm8oKTtcclxuICAgICAgLy/lhbPpl63liJ3lp4vljJbokpnniYhcclxuICAgICAgYXdhaXQgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgX3N0YXRVc2VyU291cmNlKG9wdGlvbnMpIHtcclxuICAgIGF3YWl0IHV0aWxzLnBvc3Qoe1xyXG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc3RhdC91c2Vyc291cmNlc2AsXHJcbiAgICAgIGRhdGE6IHV0aWxzLmNvbnZlcnRPMk8oXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZWZlcnJlckluZm86IHtcclxuICAgICAgICAgICAgcmVmQXBwaWQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbC5hcHBJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLi4ub3B0aW9ucy5xdWVyeVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfY3JlYXRlU2Vzc2lvbigpIHtcclxuICAgIHJldHVybiB3ZXB5LmxvZ2luKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIHJldHVybiB1dGlscy5mZXRjaCh7XHJcbiAgICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3Nlc3Npb25zYCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KS50aGVuKCh0aHJkUmVzKSA9PiB7XHJcbiAgICAgIHJldHVybiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJywgdGhyZFJlcy5kYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5b6u5L+h55So5oi35L+h5oGvXHJcbiAgICovXHJcbiAgYXN5bmMgX2xvYWRVc2VySW5mbygpIHtcclxuICAgIC8v5bey57uP6I635Y+W6L+H55So5oi35L+h5oGvXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8v55So5oi35o6I5p2D5oOF5Ya1XHJcbiAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgd2VweS5nZXRTZXR0aW5nKCk7XHJcbiAgICBpZiAoIXNldHRpbmcuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB3ZXB5LmF1dGhvcml6ZSh7XHJcbiAgICAgICAgICBzY29wZTogJ3Njb3BlLnVzZXJJbmZvJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBhd2FpdCB3ZXB5LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICforablkYonLFxyXG4gICAgICAgICAgY29udGVudDogJ+iLpeS4jei/m+ihjOaOiOadg++8jOacrOeoi+W6j+WwhuS4jeiDveato+W4uOi/kOihjOOAguWxiuaXtu+8jOaCqOmcgOimgeWcqOW+ruS/oeOAkOWPkeeOsOOAkS3jgJDlsI/nqIvluo/jgJEt5Yig5o6J6K+l56iL5bqP77yM6YeN5paw5pCc57Si5o6I5p2D55m75b2V5pa55Y+v5L2/55So44CCJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXQuY2FuY2VsKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5omT5byA5o6I5p2D5qGGXHJcbiAgICAgICAgYXdhaXQgd2VweS5vcGVuU2V0dGluZygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB1c2VySW5mb1JldCA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oKTtcclxuICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvUmV0LnVzZXJJbmZvO1xyXG4gICAgLy/pmLLmraJnZXRVc2VySW5mb+i/lOWbnui/h+aZmlxyXG4gICAgaWYgKHRoaXMubG9hZFVzZXJJbmZvQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5sb2FkVXNlckluZm9DYWxsYmFjayh1c2VySW5mb1JldC51c2VySW5mbyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkIzmraXlvq7kv6Hkv6Hmga/liLAzcmQgc2VydmVyXHJcbiAgICovXHJcbiAgX3N5bmNVc2VySW5mbygpIHtcclxuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgaWYgKCF1c2VySW5mbykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXRpbHMucG9zdCh7XHJcbiAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS91c2Vyc2AsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBuaWNrTmFtZTogdXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgZ2VuZGVyOiB1c2VySW5mby5nZW5kZXIsXHJcbiAgICAgICAgYXZhdGFyVXJsOiB1c2VySW5mby5hdmF0YXJVcmwsXHJcbiAgICAgICAgY2l0eTogdXNlckluZm8uY2l0eSxcclxuICAgICAgICBwcm92aW5jZTogdXNlckluZm8ucHJvdmluY2UsXHJcbiAgICAgICAgY291bnRyeTogdXNlckluZm8uY291bnRyeSxcclxuICAgICAgICBsYW5ndWFnZTogdXNlckluZm8ubGFuZ3VhZ2VcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgLy90b2RvOui+k+WHuuWIsOaXpeW/l1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==