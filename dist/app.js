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

var _moment = require('./npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

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
    key: 'onShareAppMessage',
    value: function onShareAppMessage(options) {
      var openid = _wepy2.default.getStorageSync('session').user.openid;
      var timeStamp = (0, _moment2.default)(Date.now()).format('YYYY-MM-DDTHH:mm:ss.sss');
      return {
        path: '/pages/Index?fromOpenid=' + openid + '&shareDate=' + timeStamp
      };
    }
  }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwb3NpdGlvbiIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsImludGVyY2VwdCIsInAiLCJvbGRIZWFkZXIiLCJoZWFkZXIiLCJuZXdIZWFkZXIiLCJDb29raWUiLCJnZXRTdG9yYWdlU3luYyIsInNlc3Npb25JZCIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXNDb2RlIiwiX2NyZWF0ZVNlc3Npb24iLCJvcHRpb25zIiwib3BlbmlkIiwidXNlciIsInRpbWVTdGFtcCIsIkRhdGUiLCJub3ciLCJmb3JtYXQiLCJwYXRoIiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiY2hlY2tTZXNzaW9uIiwiX3N0YXRVc2VyU291cmNlIiwiX2xvYWRVc2VySW5mbyIsIl9zeW5jVXNlckluZm8iLCJoaWRlTG9hZGluZyIsInBvc3QiLCJ1cmwiLCJ1cmxQcmVmaXgiLCJkYXRhIiwiY29udmVydE8yTyIsInJlZmVycmVySW5mbyIsInJlZkFwcGlkIiwidmFsIiwiYXBwSWQiLCJxdWVyeSIsImxvZ2luIiwidGhlbiIsImZldGNoIiwiY29kZSIsInRocmRSZXMiLCJzZXRTdG9yYWdlU3luYyIsImdldFNldHRpbmciLCJzZXR0aW5nIiwiYXV0aFNldHRpbmciLCJhdXRob3JpemUiLCJzY29wZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJyZXQiLCJjYW5jZWwiLCJvcGVuU2V0dGluZyIsImdldFVzZXJJbmZvIiwidXNlckluZm9SZXQiLCJsb2FkVXNlckluZm9DYWxsYmFjayIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwiY2l0eSIsInByb3ZpbmNlIiwiY291bnRyeSIsImxhbmd1YWdlIiwiY2F0Y2giLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9ERSxzQkFBZTtBQUFBOztBQUViO0FBRmE7O0FBQUEsVUFqRGZBLE1BaURlLEdBakROO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsbUJBRkssRUFHTCxVQUhLLEVBSUwsWUFKSyxFQUtMLGNBTEssRUFNTCxvQkFOSyxFQU9MLGVBUEssRUFRTCxlQVJLLENBREE7QUFXUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVhEO0FBaUJQQyxjQUFRO0FBQ05DLGVBQU8sU0FERDtBQUVOQyx1QkFBZSxTQUZUO0FBR05DLHlCQUFpQixTQUhYO0FBSU5DLGtCQUFVLFFBSko7QUFLTixnQkFBUSxDQUNOO0FBQ0Usc0JBQVksYUFEZDtBQUVFLGtCQUFRLElBRlY7QUFHRSxzQkFBWSw0QkFIZDtBQUlFLDhCQUFvQjtBQUp0QixTQURNLEVBT047QUFDRSxzQkFBWSxtQkFEZDtBQUVFLGtCQUFRLElBRlY7QUFHRSxzQkFBWSwyQkFIZDtBQUlFLDhCQUFvQjtBQUp0QixTQVBNLEVBYU47QUFDRSxzQkFBWSxVQURkO0FBRUUsa0JBQVEsR0FGVjtBQUdFLHNCQUFZLHlCQUhkO0FBSUUsOEJBQW9CO0FBSnRCLFNBYk07QUFMRjtBQWpCRCxLQWlETTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7QUFHYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFDQTtBQUNBLFVBQUtDLFNBQUwsQ0FBZSxTQUFmLEVBQTBCO0FBQ3hCZixZQUR3Qixr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WUFBWTNELFFBQXZDO0FBQ0E7QUFDQSxvQkFBSSxLQUFLNEQsb0JBQVQsRUFBK0I7QUFDN0IsdUJBQUtBLG9CQUFMLENBQTBCRCxZQUFZM0QsUUFBdEM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSDs7Ozs7O29DQUdnQjtBQUNkLFVBQU1BLFdBQVcsS0FBS0QsVUFBTCxDQUFnQkMsUUFBakM7QUFDQSxVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiO0FBQ0Q7QUFDRCxhQUFPLGVBQU1nQyxJQUFOLENBQVc7QUFDaEJDLGFBQVEsZUFBTUMsU0FBZCxXQURnQjtBQUVoQkMsY0FBTTtBQUNKMEIsb0JBQVU3RCxTQUFTNkQsUUFEZjtBQUVKQyxrQkFBUTlELFNBQVM4RCxNQUZiO0FBR0pDLHFCQUFXL0QsU0FBUytELFNBSGhCO0FBSUpDLGdCQUFNaEUsU0FBU2dFLElBSlg7QUFLSkMsb0JBQVVqRSxTQUFTaUUsUUFMZjtBQU1KQyxtQkFBU2xFLFNBQVNrRSxPQU5kO0FBT0pDLG9CQUFVbkUsU0FBU21FO0FBUGY7QUFGVSxPQUFYLEVBV0pDLEtBWEksQ0FXRSxlQUFPO0FBQ2Q7QUFDRCxPQWJNLENBQVA7QUFjRDs7OztFQTdNMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWwnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvSW5kZXgnLFxyXG4gICAgICAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAncGFnZXMvTWUnLFxyXG4gICAgICAncGFnZXMvUmVhZCcsXHJcbiAgICAgICdwYWdlcy9DaGFyZ2UnLFxyXG4gICAgICAncGFnZXMvQ2hhcmdlUmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL0ZpY3Rpb24nLFxyXG4gICAgICAncGFnZXMvQ2F0YWxvZydcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBjb2xvcjogJyNjZGNkY2QnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOiAnIzYzYjYzMicsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgICdsaXN0JzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9JbmRleCcsXHJcbiAgICAgICAgICAndGV4dCc6ICfpppbpobUnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5Y6G5Y+yJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdyZXNvdXJjZXMvbGlzdC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9saXN0LXNlbGVjdGVkLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9NZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmiJEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICAvL+S/ruWkjXd4LnJlcXVlc3TnmoTlubblj5FidWdcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XHJcbiAgICAvL+m7mOiupOWwhndlcHkueHh45pa55byP6K+35rGC5bCP56iL5bqP5Y6f55SfYXBp6YO95bCGcHJvbWlzZeWMllxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgLy/lu7rnq4vljp/nlJ9yZXF1ZXN0IEFQSeeahOaLpuaIqlxyXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XHJcbiAgICAgIGNvbmZpZyAocCkge1xyXG4gICAgICAgIGxldCBvbGRIZWFkZXIgPSBwLmhlYWRlcjtcclxuICAgICAgICBsZXQgbmV3SGVhZGVyID0gey4uLm9sZEhlYWRlcixcclxuICAgICAgICAgIENvb2tpZTogYEpTRVNTSU9OSUQ9JHt3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJykuc2Vzc2lvbklkfWBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHAuaGVhZGVyID0gbmV3SGVhZGVyO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAvL+acquW7uuerizNyZCDkvJror53vvIzliJnph43mlrDlu7rnq4tcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDQwMSkge1xyXG4gICAgICAgICAgdGhpcy5fY3JlYXRlU2Vzc2lvbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG9wZW5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nKS51c2VyLm9wZW5pZDtcclxuICAgIGNvbnN0IHRpbWVTdGFtcCA9IG1vbWVudChEYXRlLm5vdygpKS5mb3JtYXQoJ1lZWVktTU0tRERUSEg6bW06c3Muc3NzJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYXRoOiBgL3BhZ2VzL0luZGV4P2Zyb21PcGVuaWQ9JHtvcGVuaWR9JnNoYXJlRGF0ZT0ke3RpbWVTdGFtcH1gXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25MYXVuY2gob3B0aW9ucykge1xyXG4gICAgLy/lvIDlkK/liIbkuqvorr7nva5cclxuICAgIHdlcHkuc2hvd1NoYXJlTWVudSh7XHJcbiAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvblNob3cob3B0aW9ucykge1xyXG4gICAgLy/lvIDlkK/liJ3lp4vljJbokpnniYhcclxuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WIneWni+WMluS/oeaBrycsXHJcbiAgICAgIG1hc2s6IHRydWVcclxuICAgIH0pO1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy/moKHpqozkvJror51cclxuICAgICAgYXdhaXQgd2VweS5jaGVja1Nlc3Npb24oKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy/lu7rnq4vmlrDkvJror51cclxuICAgICAgYXdhaXQgdGhpcy5fY3JlYXRlU2Vzc2lvbigpO1xyXG4gICAgICAvL+WPkei1t+eUqOaIt+adpea6kOaVsOaNrue7n+iuoVxyXG4gICAgICBhd2FpdCB0aGlzLl9zdGF0VXNlclNvdXJjZShvcHRpb25zKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIC8v5ZCM5q2l55So5oi35L+h5oGv5YiwM3JkIHNlcnZlclxyXG4gICAgICBhd2FpdCB0aGlzLl9sb2FkVXNlckluZm8oKTtcclxuICAgICAgYXdhaXQgdGhpcy5fc3luY1VzZXJJbmZvKCk7XHJcbiAgICAgIC8v5YWz6Zet5Yid5aeL5YyW6JKZ54mIXHJcbiAgICAgIGF3YWl0IHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIF9zdGF0VXNlclNvdXJjZShvcHRpb25zKSB7XHJcbiAgICBhd2FpdCB1dGlscy5wb3N0KHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N0YXQvdXNlcnNvdXJjZXNgLFxyXG4gICAgICBkYXRhOiB1dGlscy5jb252ZXJ0TzJPKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVmZXJyZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIHJlZkFwcGlkOiB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB2YWwuYXBwSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC4uLm9wdGlvbnMucXVlcnlcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2NyZWF0ZVNlc3Npb24oKSB7XHJcbiAgICByZXR1cm4gd2VweS5sb2dpbigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICByZXR1cm4gdXRpbHMuZmV0Y2goe1xyXG4gICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zZXNzaW9uc2AsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSkudGhlbigodGhyZFJlcykgPT4ge1xyXG4gICAgICByZXR1cm4gd2VweS5zZXRTdG9yYWdlU3luYygnc2Vzc2lvbicsIHRocmRSZXMuZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluW+ruS/oeeUqOaIt+S/oeaBr1xyXG4gICAqL1xyXG4gIGFzeW5jIF9sb2FkVXNlckluZm8oKSB7XHJcbiAgICAvL+W3sue7j+iOt+WPlui/h+eUqOaIt+S/oeaBr1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvL+eUqOaIt+aOiOadg+aDheWGtVxyXG4gICAgY29uc3Qgc2V0dGluZyA9IGF3YWl0IHdlcHkuZ2V0U2V0dGluZygpO1xyXG4gICAgaWYgKCFzZXR0aW5nLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgd2VweS5hdXRob3JpemUoe1xyXG4gICAgICAgICAgc2NvcGU6ICdzY29wZS51c2VySW5mbydcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgYXdhaXQgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICfoi6XkuI3ov5vooYzmjojmnYPvvIzmnKznqIvluo/lsIbkuI3og73mraPluLjov5DooYzjgILlsYrml7bvvIzmgqjpnIDopoHlnKjlvq7kv6HjgJDlj5HnjrDjgJEt44CQ5bCP56iL5bqP44CRLeWIoOaOieivpeeoi+W6j++8jOmHjeaWsOaQnOe0ouaOiOadg+eZu+W9leaWueWPr+S9v+eUqOOAgidcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmV0LmNhbmNlbCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aJk+W8gOaOiOadg+ahhlxyXG4gICAgICAgIGF3YWl0IHdlcHkub3BlblNldHRpbmcoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdXNlckluZm9SZXQgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XHJcbiAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSB1c2VySW5mb1JldC51c2VySW5mbztcclxuICAgIC8v6Ziy5q2iZ2V0VXNlckluZm/ov5Tlm57ov4fmmZpcclxuICAgIGlmICh0aGlzLmxvYWRVc2VySW5mb0NhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubG9hZFVzZXJJbmZvQ2FsbGJhY2sodXNlckluZm9SZXQudXNlckluZm8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCM5q2l5b6u5L+h5L+h5oGv5YiwM3JkIHNlcnZlclxyXG4gICAqL1xyXG4gIF9zeW5jVXNlckluZm8oKSB7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHV0aWxzLnBvc3Qoe1xyXG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vdXNlcnNgLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmlja05hbWU6IHVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgIGdlbmRlcjogdXNlckluZm8uZ2VuZGVyLFxyXG4gICAgICAgIGF2YXRhclVybDogdXNlckluZm8uYXZhdGFyVXJsLFxyXG4gICAgICAgIGNpdHk6IHVzZXJJbmZvLmNpdHksXHJcbiAgICAgICAgcHJvdmluY2U6IHVzZXJJbmZvLnByb3ZpbmNlLFxyXG4gICAgICAgIGNvdW50cnk6IHVzZXJJbmZvLmNvdW50cnksXHJcbiAgICAgICAgbGFuZ3VhZ2U6IHVzZXJJbmZvLmxhbmd1YWdlXHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIC8vdG9kbzrovpPlh7rliLDml6Xlv5dcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=