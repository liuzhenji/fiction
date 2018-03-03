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

                console.log('createSession', ret);
                _context3.next = 9;
                return _wepy2.default.setStorage({
                  key: 'session',
                  data: ret.data
                });

              case 9:
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
                  _context4.next = 22;
                  break;
                }

                _context4.prev = 6;
                _context4.next = 9;
                return _wepy2.default.authorize({
                  scope: 'scope.userInfo'
                });

              case 9:
                _context4.next = 22;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](6);
                _context4.next = 15;
                return _wepy2.default.hideLoading();

              case 15:
                _context4.next = 17;
                return _wepy2.default.showModal({
                  title: '警告',
                  content: '若不进行授权，本程序将不能正常运行。届时，您需要在微信【发现】-【小程序】-删掉该程序，重新搜索授权登录方可使用。'
                });

              case 17:
                ret = _context4.sent;

                if (!ret.cancel) {
                  _context4.next = 20;
                  break;
                }

                return _context4.abrupt('return');

              case 20:
                _context4.next = 22;
                return _wepy2.default.openSetting();

              case 22:
                _context4.next = 24;
                return _wepy2.default.getUserInfo();

              case 24:
                userInfoRet = _context4.sent;

                this.globalData.userInfo = userInfoRet.userInfo;
                //防止getUserInfo返回过晚
                if (this.loadUserInfoCallback) {
                  this.loadUserInfoCallback(userInfoRet.userInfo);
                }

              case 27:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwb3NpdGlvbiIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsIm9uU2hhcmVDYWxsYmFjayIsInJlcyIsImVyck1zZyIsInBvc3QiLCJ1cmwiLCJ1cmxQcmVmaXgiLCJkYXRhIiwiY29udmVydE8yTyIsInNoYXJlVGlja2V0cyIsImpvaW4iLCJhcnIiLCJ1c2UiLCJpbnRlcmNlcHQiLCJwIiwib2xkSGVhZGVyIiwiaGVhZGVyIiwibmV3SGVhZGVyIiwiQ29va2llIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXNzaW9uSWQiLCJzdWNjZXNzIiwic3RhdHVzQ29kZSIsIl9jcmVhdGVTZXNzaW9uIiwib3B0aW9ucyIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImNoZWNrU2Vzc2lvbiIsIl9zdGF0VXNlclNvdXJjZSIsIl9sb2FkVXNlckluZm8iLCJfc3luY1VzZXJJbmZvIiwiaGlkZUxvYWRpbmciLCJyZWZlcnJlckluZm8iLCJyZWZBcHBpZCIsInZhbCIsImFwcElkIiwicXVlcnkiLCJsb2dpbiIsImxvZ2luUmV0IiwiZmV0Y2giLCJjb2RlIiwicmV0IiwiY29uc29sZSIsImxvZyIsInNldFN0b3JhZ2UiLCJrZXkiLCJnZXRTZXR0aW5nIiwic2V0dGluZyIsImF1dGhTZXR0aW5nIiwiYXV0aG9yaXplIiwic2NvcGUiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY2FuY2VsIiwib3BlblNldHRpbmciLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvUmV0IiwibG9hZFVzZXJJbmZvQ2FsbGJhY2siLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsImNpdHkiLCJwcm92aW5jZSIsImNvdW50cnkiLCJsYW5ndWFnZSIsImNhdGNoIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRUUsc0JBQWU7QUFBQTs7QUFFYjtBQUZhOztBQUFBLFVBOURmQSxNQThEZSxHQTlETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLG1CQUZLLEVBR0wsVUFISyxFQUlMLFlBSkssRUFLTCxjQUxLLEVBTUwsb0JBTkssRUFPTCxlQVBLLEVBUUwsZUFSSyxDQURBO0FBV1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FYRDtBQWlCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxrQkFBVSxRQUpKO0FBS04sZ0JBQVEsQ0FDTjtBQUNFLHNCQUFZLGFBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksNEJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FETSxFQU9OO0FBQ0Usc0JBQVksbUJBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksMkJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FQTSxFQWFOO0FBQ0Usc0JBQVksVUFEZDtBQUVFLGtCQUFRLEdBRlY7QUFHRSxzQkFBWSx5QkFIZDtBQUlFLDhCQUFvQjtBQUp0QixTQWJNO0FBTEY7QUFqQkQsS0E4RE07QUFBQSxVQWpCZkMsVUFpQmUsR0FqQkY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyx1QkFBaUIseUJBQVNDLEdBQVQsRUFBYztBQUM3QixZQUFJQSxPQUFPQSxJQUFJQyxNQUFKLEtBQWUsb0JBQTFCLEVBQWdEO0FBQzlDLHlCQUFNQyxJQUFOLENBQVc7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Z0IsZUFBS0MsV0FBTCxFOzs7QUFBcEJDLDJCOztBQUNOLHFCQUFLNUQsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkIyRCxZQUFZM0QsUUFBdkM7QUFDQTtBQUNBLG9CQUFJLEtBQUs0RCxvQkFBVCxFQUErQjtBQUM3Qix1QkFBS0Esb0JBQUwsQ0FBMEJELFlBQVkzRCxRQUF0QztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdIOzs7Ozs7b0NBR2dCO0FBQ2QsVUFBTUEsV0FBVyxLQUFLRCxVQUFMLENBQWdCQyxRQUFqQztBQUNBLFVBQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2I7QUFDRDtBQUNELGFBQU8sZUFBTUksSUFBTixDQUFXO0FBQ2hCQyxhQUFRLGVBQU1DLFNBQWQsV0FEZ0I7QUFFaEJDLGNBQU07QUFDSnNELG9CQUFVN0QsU0FBUzZELFFBRGY7QUFFSkMsa0JBQVE5RCxTQUFTOEQsTUFGYjtBQUdKQyxxQkFBVy9ELFNBQVMrRCxTQUhoQjtBQUlKQyxnQkFBTWhFLFNBQVNnRSxJQUpYO0FBS0pDLG9CQUFVakUsU0FBU2lFLFFBTGY7QUFNSkMsbUJBQVNsRSxTQUFTa0UsT0FOZDtBQU9KQyxvQkFBVW5FLFNBQVNtRTtBQVBmO0FBRlUsT0FBWCxFQVdKQyxLQVhJLENBV0UsZUFBTztBQUNkO0FBQ0QsT0FiTSxDQUFQO0FBY0Q7Ozs7RUExTzBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy91dGlsJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9JbmRleCcsXHJcbiAgICAgICdwYWdlcy9SZWFkSGlzdG9yeScsXHJcbiAgICAgICdwYWdlcy9NZScsXHJcbiAgICAgICdwYWdlcy9SZWFkJyxcclxuICAgICAgJ3BhZ2VzL0NoYXJnZScsXHJcbiAgICAgICdwYWdlcy9DaGFyZ2VSZWNvcmQnLFxyXG4gICAgICAncGFnZXMvRmljdGlvbicsXHJcbiAgICAgICdwYWdlcy9DYXRhbG9nJ1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICB9LFxyXG4gICAgdGFiQmFyOiB7XHJcbiAgICAgIGNvbG9yOiAnI2NkY2RjZCcsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNjNiNjMyJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcclxuICAgICAgJ2xpc3QnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL0luZGV4JyxcclxuICAgICAgICAgICd0ZXh0JzogJ+mmlumhtScsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAncmVzb3VyY2VzL2luZGV4LW5vcm1hbC5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAncmVzb3VyY2VzL2luZGV4LXNlbGVjdGVkLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9SZWFkSGlzdG9yeScsXHJcbiAgICAgICAgICAndGV4dCc6ICfljoblj7InLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9saXN0LW5vcm1hbC5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAncmVzb3VyY2VzL2xpc3Qtc2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL01lJyxcclxuICAgICAgICAgICd0ZXh0JzogJ+aIkScsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAncmVzb3VyY2VzL21lLW5vcm1hbC5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAncmVzb3VyY2VzL21lLXNlbGVjdGVkLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIG9uU2hhcmVDYWxsYmFjazogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIGlmIChyZXMgJiYgcmVzLmVyck1zZyA9PT0gJ3NoYXJlQXBwTWVzc2FnZTpvaycpIHtcclxuICAgICAgICB1dGlscy5wb3N0KHtcclxuICAgICAgICAgIHVybDogYCR7dXRpbHMudXJsUHJlZml4fS9zdGF0L3VzZXJzaGFyZXNgLFxyXG4gICAgICAgICAgZGF0YTogdXRpbHMuY29udmVydE8yTyhcclxuICAgICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2hhcmVUaWNrZXRzOiBhcnIgPT4gXy5qb2luKGFycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLy/kv67lpI13eC5yZXF1ZXN055qE5bm25Y+RYnVnXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xyXG4gICAgLy/pu5jorqTlsIZ3ZXB5Lnh4eOaWueW8j+ivt+axguWwj+eoi+W6j+WOn+eUn2FwaemDveWwhnByb21pc2XljJZcclxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIC8v5bu656uL5Y6f55SfcmVxdWVzdCBBUEnnmoTmi6bmiKpcclxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG4gICAgICBjb25maWcgKHApIHtcclxuICAgICAgICBsZXQgb2xkSGVhZGVyID0gcC5oZWFkZXI7XHJcbiAgICAgICAgbGV0IG5ld0hlYWRlciA9IHsuLi5vbGRIZWFkZXIsXHJcbiAgICAgICAgICBDb29raWU6IGBKU0VTU0lPTklEPSR7d2VweS5nZXRTdG9yYWdlU3luYygnc2Vzc2lvbicpLnNlc3Npb25JZH1gXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwLmhlYWRlciA9IG5ld0hlYWRlcjtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgLy/mnKrlu7rnq4szcmQg5Lya6K+d77yM5YiZ6YeN5paw5bu656uLXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA0MDEpIHtcclxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVNlc3Npb24oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICAvL+W8gOWQr+WIhuS6q+iuvue9rlxyXG4gICAgd2VweS5zaG93U2hhcmVNZW51KHtcclxuICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAvL+W8gOWQr+WIneWni+WMluiSmeeJiFxyXG4gICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yid5aeL5YyW5L+h5oGvJyxcclxuICAgICAgbWFzazogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvL+agoemqjOS8muivnVxyXG4gICAgICBhd2FpdCB3ZXB5LmNoZWNrU2Vzc2lvbigpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvL+W7uueri+aWsOS8muivnVxyXG4gICAgICBhd2FpdCB0aGlzLl9jcmVhdGVTZXNzaW9uKCk7XHJcbiAgICAgIC8v5Y+R6LW355So5oi35p2l5rqQ5pWw5o2u57uf6K6hXHJcbiAgICAgIGF3YWl0IHRoaXMuX3N0YXRVc2VyU291cmNlKG9wdGlvbnMpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgLy/lkIzmraXnlKjmiLfkv6Hmga/liLAzcmQgc2VydmVyXHJcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRVc2VySW5mbygpO1xyXG4gICAgICBhd2FpdCB0aGlzLl9zeW5jVXNlckluZm8oKTtcclxuICAgICAgLy/lhbPpl63liJ3lp4vljJbokpnniYhcclxuICAgICAgYXdhaXQgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgX3N0YXRVc2VyU291cmNlKG9wdGlvbnMpIHtcclxuICAgIGF3YWl0IHV0aWxzLnBvc3Qoe1xyXG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc3RhdC91c2Vyc291cmNlc2AsXHJcbiAgICAgIGRhdGE6IHV0aWxzLmNvbnZlcnRPMk8oXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZWZlcnJlckluZm86IHtcclxuICAgICAgICAgICAgcmVmQXBwaWQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbC5hcHBJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLi4ub3B0aW9ucy5xdWVyeVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfY3JlYXRlU2Vzc2lvbigpIHtcclxuICAgIGNvbnN0IGxvZ2luUmV0ID0gYXdhaXQgd2VweS5sb2dpbigpO1xyXG4gICAgY29uc3QgcmV0ID0gYXdhaXQgdXRpbHMuZmV0Y2goe1xyXG4gICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc2Vzc2lvbnNgLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgY29kZTogbG9naW5SZXQuY29kZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVTZXNzaW9uJywgcmV0KTtcclxuICAgIGF3YWl0IHdlcHkuc2V0U3RvcmFnZSh7XHJcbiAgICAgIGtleTogJ3Nlc3Npb24nLFxyXG4gICAgICBkYXRhOiByZXQuZGF0YVxyXG4gICAgfSk7XHJcbiAgICAvLyByZXR1cm4gd2VweS5sb2dpbigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZygnYXBwJywgcmVzKTtcclxuICAgIC8vICAgcmV0dXJuIHV0aWxzLmZldGNoKHtcclxuICAgIC8vICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc2Vzc2lvbnNgLFxyXG4gICAgLy8gICAgIGRhdGE6IHtcclxuICAgIC8vICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9KTtcclxuICAgIC8vIH0pLnRoZW4oKHRocmRSZXMpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2coJ3NldFN0b3JhZ2UnLCB0aHJkUmVzKTtcclxuICAgIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIC8vICAgICB3ZXB5LnNldFN0b3JhZ2Uoe1xyXG4gICAgLy8gICAgICAga2V5OiAnc2Vzc2lvbicsXHJcbiAgICAvLyAgICAgICBkYXRhOiB0aHJkUmVzLmRhdGEsXHJcbiAgICAvLyAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIHJlc29sdmUoKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyB9KS5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhyZWFzb24pO1xyXG4gICAgLy8gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blvq7kv6HnlKjmiLfkv6Hmga9cclxuICAgKi9cclxuICBhc3luYyBfbG9hZFVzZXJJbmZvKCkge1xyXG4gICAgLy/lt7Lnu4/ojrflj5bov4fnlKjmiLfkv6Hmga9cclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy/nlKjmiLfmjojmnYPmg4XlhrVcclxuICAgIGNvbnN0IHNldHRpbmcgPSBhd2FpdCB3ZXB5LmdldFNldHRpbmcoKTtcclxuICAgIGlmICghc2V0dGluZy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHdlcHkuYXV0aG9yaXplKHtcclxuICAgICAgICAgIHNjb3BlOiAnc2NvcGUudXNlckluZm8nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGF3YWl0IHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXHJcbiAgICAgICAgICBjb250ZW50OiAn6Iul5LiN6L+b6KGM5o6I5p2D77yM5pys56iL5bqP5bCG5LiN6IO95q2j5bi46L+Q6KGM44CC5bGK5pe277yM5oKo6ZyA6KaB5Zyo5b6u5L+h44CQ5Y+R546w44CRLeOAkOWwj+eoi+W6j+OAkS3liKDmjonor6XnqIvluo/vvIzph43mlrDmkJzntKLmjojmnYPnmbvlvZXmlrnlj6/kvb/nlKjjgIInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJldC5jYW5jZWwpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miZPlvIDmjojmnYPmoYZcclxuICAgICAgICBhd2FpdCB3ZXB5Lm9wZW5TZXR0aW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVzZXJJbmZvUmV0ID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xyXG4gICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm9SZXQudXNlckluZm87XHJcbiAgICAvL+mYsuatomdldFVzZXJJbmZv6L+U5Zue6L+H5pmaXHJcbiAgICBpZiAodGhpcy5sb2FkVXNlckluZm9DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmxvYWRVc2VySW5mb0NhbGxiYWNrKHVzZXJJbmZvUmV0LnVzZXJJbmZvKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQjOatpeW+ruS/oeS/oeaBr+WIsDNyZCBzZXJ2ZXJcclxuICAgKi9cclxuICBfc3luY1VzZXJJbmZvKCkge1xyXG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLmdsb2JhbERhdGEudXNlckluZm87XHJcbiAgICBpZiAoIXVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB1dGlscy5wb3N0KHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJzYCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICBnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybCxcclxuICAgICAgICBjaXR5OiB1c2VySW5mby5jaXR5LFxyXG4gICAgICAgIHByb3ZpbmNlOiB1c2VySW5mby5wcm92aW5jZSxcclxuICAgICAgICBjb3VudHJ5OiB1c2VySW5mby5jb3VudHJ5LFxyXG4gICAgICAgIGxhbmd1YWdlOiB1c2VySW5mby5sYW5ndWFnZVxyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAvL3RvZG866L6T5Ye65Yiw5pel5b+XXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19