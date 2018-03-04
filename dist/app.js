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

var _lodash = require('./npm/lodash/lodash.js');

var _lodash2 = _interopRequireDefault(_lodash);

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
      setRead: function setRead(ficId, chapId, serial) {
        _this.globalData.ficId = ficId;
        _this.globalData.chapId = chapId;
        _this.globalData.serial = serial;
      },
      userInfo: null,
      onShareCallback: function onShareCallback(res) {
        if (res && res.errMsg === 'shareAppMessage:ok') {
          _util2.default.post({
            url: _util2.default.urlPrefix + '/stat/usershares',
            data: _util2.default.convertO2O(res, {
              shareTickets: function shareTickets(arr) {
                return _lodash2.default.join(arr);
              }
            })
          });
        }
      }
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
                _context.prev = 0;
                _context.next = 3;
                return _wepy2.default.checkSession();

              case 3:
                _context.next = 11;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                _context.next = 9;
                return this._createSession();

              case 9:
                _context.next = 11;
                return this._statUserSource(options);

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return this._loadUserInfo();

              case 14:
                _context.next = 16;
                return this._syncUserInfo();

              case 16:
                return _context.finish(11);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5, 11, 17]]);
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
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var loginRet, ret;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _wepy2.default.login();

              case 2:
                loginRet = _context3.sent;
                _context3.next = 5;
                return _util2.default.fetch({
                  url: _util2.default.urlPrefix + '/sessions',
                  data: {
                    code: loginRet.code
                  }
                });

              case 5:
                ret = _context3.sent;
                _context3.next = 8;
                return _wepy2.default.setStorage({
                  key: 'session',
                  data: ret.data
                });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _createSession() {
        return _ref3.apply(this, arguments);
      }

      return _createSession;
    }()

    /**
     * 获取微信用户信息
     */

  }, {
    key: '_loadUserInfo',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var setting, ret, userInfoRet;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.globalData.userInfo) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                _context4.next = 4;
                return _wepy2.default.getSetting();

              case 4:
                setting = _context4.sent;

                if (setting.authSetting['scope.userInfo']) {
                  _context4.next = 20;
                  break;
                }

                _context4.prev = 6;
                _context4.next = 9;
                return _wepy2.default.authorize({
                  scope: 'scope.userInfo'
                });

              case 9:
                _context4.next = 20;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](6);
                _context4.next = 15;
                return _wepy2.default.showModal({
                  title: '警告',
                  content: '若不进行授权，本程序将不能正常运行。届时，您需要在微信【发现】-【小程序】-删掉该程序，重新搜索授权登录方可使用。'
                });

              case 15:
                ret = _context4.sent;

                if (!ret.cancel) {
                  _context4.next = 18;
                  break;
                }

                return _context4.abrupt('return');

              case 18:
                _context4.next = 20;
                return _wepy2.default.openSetting();

              case 20:
                _context4.next = 22;
                return _wepy2.default.getUserInfo();

              case 22:
                userInfoRet = _context4.sent;

                this.globalData.userInfo = userInfoRet.userInfo;
                //防止getUserInfo返回过晚
                if (this.loadUserInfoCallback) {
                  this.loadUserInfoCallback(userInfoRet.userInfo);
                }

              case 25:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 11]]);
      }));

      function _loadUserInfo() {
        return _ref4.apply(this, arguments);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwb3NpdGlvbiIsImdsb2JhbERhdGEiLCJzZXRSZWFkIiwiZmljSWQiLCJjaGFwSWQiLCJzZXJpYWwiLCJ1c2VySW5mbyIsIm9uU2hhcmVDYWxsYmFjayIsInJlcyIsImVyck1zZyIsInBvc3QiLCJ1cmwiLCJ1cmxQcmVmaXgiLCJkYXRhIiwiY29udmVydE8yTyIsInNoYXJlVGlja2V0cyIsImpvaW4iLCJhcnIiLCJ1c2UiLCJpbnRlcmNlcHQiLCJwIiwib2xkSGVhZGVyIiwiaGVhZGVyIiwibmV3SGVhZGVyIiwiQ29va2llIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXNzaW9uSWQiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsIl9jcmVhdGVTZXNzaW9uIiwib3B0aW9ucyIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJjaGVja1Nlc3Npb24iLCJfc3RhdFVzZXJTb3VyY2UiLCJfbG9hZFVzZXJJbmZvIiwiX3N5bmNVc2VySW5mbyIsInJlZmVycmVySW5mbyIsInJlZkFwcGlkIiwidmFsIiwiYXBwSWQiLCJxdWVyeSIsImxvZ2luIiwibG9naW5SZXQiLCJmZXRjaCIsImNvZGUiLCJyZXQiLCJzZXRTdG9yYWdlIiwia2V5IiwiZ2V0U2V0dGluZyIsInNldHRpbmciLCJhdXRoU2V0dGluZyIsImF1dGhvcml6ZSIsInNjb3BlIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2FuY2VsIiwib3BlblNldHRpbmciLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvUmV0IiwibG9hZFVzZXJJbmZvQ2FsbGJhY2siLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsImNpdHkiLCJwcm92aW5jZSIsImNvdW50cnkiLCJsYW5ndWFnZSIsImNhdGNoIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRUUsc0JBQWU7QUFBQTs7QUFFYjtBQUZhOztBQUFBLFVBbkVmQSxNQW1FZSxHQW5FTjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLG1CQUZLLEVBR0wsVUFISyxFQUlMLFlBSkssRUFLTCxjQUxLLEVBTUwsb0JBTkssRUFPTCxlQVBLLEVBUUwsZUFSSyxDQURBO0FBV1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FYRDtBQWlCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxrQkFBVSxRQUpKO0FBS04sZ0JBQVEsQ0FDTjtBQUNFLHNCQUFZLGFBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksNEJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FETSxFQU9OO0FBQ0Usc0JBQVksbUJBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksMkJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FQTSxFQWFOO0FBQ0Usc0JBQVksVUFEZDtBQUVFLGtCQUFRLEdBRlY7QUFHRSxzQkFBWSx5QkFIZDtBQUlFLDhCQUFvQjtBQUp0QixTQWJNO0FBTEY7QUFqQkQsS0FtRU07QUFBQSxVQXRCZkMsVUFzQmUsR0F0QkY7QUFDWEMsZUFBUyxpQkFBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFoQixFQUEyQjtBQUNsQyxjQUFLSixVQUFMLENBQWdCRSxLQUFoQixHQUF3QkEsS0FBeEI7QUFDQSxjQUFLRixVQUFMLENBQWdCRyxNQUFoQixHQUF5QkEs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QyxXQUFMLEU7Ozs7dUJBR2dCLGVBQUtDLFdBQUwsRTs7O0FBQXBCQywyQjs7QUFDTixxQkFBSzNELFVBQUwsQ0FBZ0JLLFFBQWhCLEdBQTJCc0QsWUFBWXRELFFBQXZDO0FBQ0E7QUFDQSxvQkFBSSxLQUFLdUQsb0JBQVQsRUFBK0I7QUFDN0IsdUJBQUtBLG9CQUFMLENBQTBCRCxZQUFZdEQsUUFBdEM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSDs7Ozs7O29DQUdnQjtBQUNkLFVBQU1BLFdBQVcsS0FBS0wsVUFBTCxDQUFnQkssUUFBakM7QUFDQSxVQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNiO0FBQ0Q7QUFDRCxhQUFPLGVBQU1JLElBQU4sQ0FBVztBQUNoQkMsYUFBUSxlQUFNQyxTQUFkLFdBRGdCO0FBRWhCQyxjQUFNO0FBQ0ppRCxvQkFBVXhELFNBQVN3RCxRQURmO0FBRUpDLGtCQUFRekQsU0FBU3lELE1BRmI7QUFHSkMscUJBQVcxRCxTQUFTMEQsU0FIaEI7QUFJSkMsZ0JBQU0zRCxTQUFTMkQsSUFKWDtBQUtKQyxvQkFBVTVELFNBQVM0RCxRQUxmO0FBTUpDLG1CQUFTN0QsU0FBUzZELE9BTmQ7QUFPSkMsb0JBQVU5RCxTQUFTOEQ7QUFQZjtBQUZVLE9BQVgsRUFXSkMsS0FYSSxDQVdFLGVBQU87QUFDZDtBQUNELE9BYk0sQ0FBUDtBQWNEOzs7O0VBaE4wQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvSW5kZXgnLFxyXG4gICAgICAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAncGFnZXMvTWUnLFxyXG4gICAgICAncGFnZXMvUmVhZCcsXHJcbiAgICAgICdwYWdlcy9DaGFyZ2UnLFxyXG4gICAgICAncGFnZXMvQ2hhcmdlUmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL0ZpY3Rpb24nLFxyXG4gICAgICAncGFnZXMvQ2F0YWxvZydcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBjb2xvcjogJyNjZGNkY2QnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOiAnIzYzYjYzMicsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgICdsaXN0JzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9JbmRleCcsXHJcbiAgICAgICAgICAndGV4dCc6ICfpppbpobUnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5Y6G5Y+yJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdyZXNvdXJjZXMvbGlzdC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9saXN0LXNlbGVjdGVkLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9NZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmiJEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgc2V0UmVhZDogKGZpY0lkLCBjaGFwSWQsIHNlcmlhbCkgPT4ge1xyXG4gICAgICB0aGlzLmdsb2JhbERhdGEuZmljSWQgPSBmaWNJZDtcclxuICAgICAgdGhpcy5nbG9iYWxEYXRhLmNoYXBJZCA9IGNoYXBJZDtcclxuICAgICAgdGhpcy5nbG9iYWxEYXRhLnNlcmlhbCA9IHNlcmlhbDtcclxuICAgIH0sXHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIG9uU2hhcmVDYWxsYmFjazogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgJiYgcmVzLmVyck1zZyA9PT0gJ3NoYXJlQXBwTWVzc2FnZTpvaycpIHtcclxuICAgICAgICB1dGlscy5wb3N0KHtcclxuICAgICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zdGF0L3VzZXJzaGFyZXNgLFxyXG4gICAgICAgICAgZGF0YTogdXRpbHMuY29udmVydE8yTyhcclxuICAgICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2hhcmVUaWNrZXRzOiBhcnIgPT4gXy5qb2luKGFycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLy/kv67lpI13eC5yZXF1ZXN055qE5bm25Y+RYnVnXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xyXG4gICAgLy/pu5jorqTlsIZ3ZXB5Lnh4eOaWueW8j+ivt+axguWwj+eoi+W6j+WOn+eUn2FwaemDveWwhnByb21pc2XljJZcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIC8v5bu656uL5Y6f55SfcmVxdWVzdCBBUEnnmoTmi6bmiKpcclxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG4gICAgICBjb25maWcgKHApIHtcclxuICAgICAgICBsZXQgb2xkSGVhZGVyID0gcC5oZWFkZXI7XHJcbiAgICAgICAgbGV0IG5ld0hlYWRlciA9IHsuLi5vbGRIZWFkZXIsXHJcbiAgICAgICAgICBDb29raWU6IGBKU0VTU0lPTklEPSR7d2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnNlc3Npb25JZH1gXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwLmhlYWRlciA9IG5ld0hlYWRlcjtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgLy/mnKrlu7rnq4szcmQg5Lya6K+d77yM5YiZ6YeN5paw5bu656uLXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA0MDEpIHtcclxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVNlc3Npb24oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICAvL+W8gOWQr+WIhuS6q+iuvue9rlxyXG4gICAgd2VweS5zaG93U2hhcmVNZW51KHtcclxuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvL+agoemqjOS8muivnVxyXG4gICAgICBhd2FpdCB3ZXB5LmNoZWNrU2Vzc2lvbigpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvL+W7uueri+aWsOS8muivnVxyXG4gICAgICBhd2FpdCB0aGlzLl9jcmVhdGVTZXNzaW9uKCk7XHJcbiAgICAgIC8v5Y+R6LW355So5oi35p2l5rqQ5pWw5o2u57uf6K6hXHJcbiAgICAgIGF3YWl0IHRoaXMuX3N0YXRVc2VyU291cmNlKG9wdGlvbnMpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgLy/lkIzmraXnlKjmiLfkv6Hmga/liLAzcmQgc2VydmVyXHJcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRVc2VySW5mbygpO1xyXG4gICAgICBhd2FpdCB0aGlzLl9zeW5jVXNlckluZm8oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIF9zdGF0VXNlclNvdXJjZShvcHRpb25zKSB7XHJcbiAgICBhd2FpdCB1dGlscy5wb3N0KHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3N0YXQvdXNlcnNvdXJjZXNgLFxyXG4gICAgICBkYXRhOiB1dGlscy5jb252ZXJ0TzJPKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVmZXJyZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIHJlZkFwcGlkOiB2YWwgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB2YWwuYXBwSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC4uLm9wdGlvbnMucXVlcnlcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgX2NyZWF0ZVNlc3Npb24oKSB7XHJcbiAgICBjb25zdCBsb2dpblJldCA9IGF3YWl0IHdlcHkubG9naW4oKTtcclxuICAgIGNvbnN0IHJldCA9IGF3YWl0IHV0aWxzLmZldGNoKHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3Nlc3Npb25zYCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGNvZGU6IGxvZ2luUmV0LmNvZGVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB3ZXB5LnNldFN0b3JhZ2Uoe1xyXG4gICAgICBrZXk6ICdzZXNzaW9uJyxcclxuICAgICAgZGF0YTogcmV0LmRhdGFcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5b6u5L+h55So5oi35L+h5oGvXHJcbiAgICovXHJcbiAgYXN5bmMgX2xvYWRVc2VySW5mbygpIHtcclxuICAgIC8v5bey57uP6I635Y+W6L+H55So5oi35L+h5oGvXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8v55So5oi35o6I5p2D5oOF5Ya1XHJcbiAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgd2VweS5nZXRTZXR0aW5nKCk7XHJcbiAgICBpZiAoIXNldHRpbmcuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB3ZXB5LmF1dGhvcml6ZSh7XHJcbiAgICAgICAgICBzY29wZTogJ3Njb3BlLnVzZXJJbmZvJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXHJcbiAgICAgICAgICBjb250ZW50OiAn6Iul5LiN6L+b6KGM5o6I5p2D77yM5pys56iL5bqP5bCG5LiN6IO95q2j5bi46L+Q6KGM44CC5bGK5pe277yM5oKo6ZyA6KaB5Zyo5b6u5L+h44CQ5Y+R546w44CRLeOAkOWwj+eoi+W6j+OAkS3liKDmjonor6XnqIvluo/vvIzph43mlrDmkJzntKLmjojmnYPnmbvlvZXmlrnlj6/kvb/nlKjjgIInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJldC5jYW5jZWwpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miZPlvIDmjojmnYPmoYZcclxuICAgICAgICBhd2FpdCB3ZXB5Lm9wZW5TZXR0aW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVzZXJJbmZvUmV0ID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xyXG4gICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm9SZXQudXNlckluZm87XHJcbiAgICAvL+mYsuatomdldFVzZXJJbmZv6L+U5Zue6L+H5pmaXHJcbiAgICBpZiAodGhpcy5sb2FkVXNlckluZm9DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmxvYWRVc2VySW5mb0NhbGxiYWNrKHVzZXJJbmZvUmV0LnVzZXJJbmZvKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQjOatpeW+ruS/oeS/oeaBr+WIsDNyZCBzZXJ2ZXJcclxuICAgKi9cclxuICBfc3luY1VzZXJJbmZvKCkge1xyXG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICBpZiAoIXVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB1dGlscy5wb3N0KHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJzYCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICBnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybCxcclxuICAgICAgICBjaXR5OiB1c2VySW5mby5jaXR5LFxyXG4gICAgICAgIHByb3ZpbmNlOiB1c2VySW5mby5wcm92aW5jZSxcclxuICAgICAgICBjb3VudHJ5OiB1c2VySW5mby5jb3VudHJ5LFxyXG4gICAgICAgIGxhbmd1YWdlOiB1c2VySW5mby5sYW5ndWFnZVxyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAvL3RvZG866L6T5Ye65Yiw5pel5b+XXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19