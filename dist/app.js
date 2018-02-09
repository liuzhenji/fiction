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
    value: function onLaunch() {
      //建立会话放到show周期中
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _wepy2.default.showLoading({
                  title: '初始化信息',
                  mask: true
                });

              case 3:
                _context.next = 5;
                return _wepy2.default.checkSession();

              case 5:
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                _context.next = 11;
                return this._createSession();

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return this._loadUserInfo();

              case 14:
                _context.next = 16;
                return this._syncUserInfo();

              case 16:
                _context.next = 18;
                return _wepy2.default.hideLoading();

              case 18:
                return _context.finish(11);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7, 11, 19]]);
      }));

      function onShow() {
        return _ref.apply(this, arguments);
      }

      return onShow;
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
    value: function _loadUserInfo() {
      var _this2 = this;

      if (this.globalData.userInfo) {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      }
      return _wepy2.default.getUserInfo().then(function (res) {
        _this2.globalData.userInfo = res.userInfo;
        //防止getUserInfo返回过晚
        if (_this2.loadUserInfoCallback) {
          _this2.loadUserInfoCallback(res.userInfo);
        }
      });
    }

    /**
     * 同步微信信息到3rd server
     */

  }, {
    key: '_syncUserInfo',
    value: function _syncUserInfo() {
      var userInfo = this.globalData.userInfo;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwb3NpdGlvbiIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsImludGVyY2VwdCIsInAiLCJvbGRIZWFkZXIiLCJoZWFkZXIiLCJuZXdIZWFkZXIiLCJDb29raWUiLCJnZXRTdG9yYWdlU3luYyIsInNlc3Npb25JZCIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXNDb2RlIiwiX2NyZWF0ZVNlc3Npb24iLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImNoZWNrU2Vzc2lvbiIsIl9sb2FkVXNlckluZm8iLCJfc3luY1VzZXJJbmZvIiwiaGlkZUxvYWRpbmciLCJsb2dpbiIsInRoZW4iLCJmZXRjaCIsInVybCIsInVybFByZWZpeCIsImRhdGEiLCJjb2RlIiwidGhyZFJlcyIsInNldFN0b3JhZ2VTeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXRVc2VySW5mbyIsImxvYWRVc2VySW5mb0NhbGxiYWNrIiwicG9zdCIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwiY2l0eSIsInByb3ZpbmNlIiwiY291bnRyeSIsImxhbmd1YWdlIiwiY2F0Y2giLCJlcnIiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvREUsc0JBQWU7QUFBQTs7QUFFYjtBQUZhOztBQUFBLFVBakRmQSxNQWlEZSxHQWpETjtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLG1CQUZLLEVBR0wsVUFISyxFQUlMLFlBSkssRUFLTCxjQUxLLEVBTUwsb0JBTkssRUFPTCxlQVBLLEVBUUwsZUFSSyxDQURBO0FBV1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FYRDtBQWlCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxrQkFBVSxRQUpKO0FBS04sZ0JBQVEsQ0FDTjtBQUNFLHNCQUFZLGFBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksNEJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FETSxFQU9OO0FBQ0Usc0JBQVksbUJBRGQ7QUFFRSxrQkFBUSxJQUZWO0FBR0Usc0JBQVksMkJBSGQ7QUFJRSw4QkFBb0I7QUFKdEIsU0FQTSxFQWFOO0FBQ0Usc0JBQVksVUFEZDtBQUVFLGtCQUFRLEdBRlY7QUFHRSxzQkFBWSx5QkFIZDtBQUlFLDhCQUFvQjtBQUp0QixTQWJNO0FBTEY7QUFqQkQsS0FpRE07QUFBQSxVQUpmQyxVQUllLEdBSkY7QUFDWEMsZ0JBQVU7QUFEQyxLQUlFO0FBR2IsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQTtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBQ0E7QUFDQSxVQUFLQyxTQUFMLENBQWUsU0FBZixFQUEwQjtBQUN4QmYsWUFEd0Isa0JBQ2hCZ0IsQ0FEZ0IsRUFDYjtBQUNULFlBQUlDLFlBQVlELEVBQUVFLE1BQWxCO0FBQ0EsWUFBSUMseUJBQWdCRixTQUFoQjtBQUNGRyxrQ0FBc0IsZUFBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQkM7QUFEbkQsVUFBSjtBQUdBTixVQUFFRSxNQUFGLEdBQVdDLFNBQVg7QUFDQSxlQUFPSCxDQUFQO0FBQ0QsT0FSdUI7QUFTeEJPLGFBVHdCLG1CQVNmQyxHQVRlLEVBU1Y7QUFDWjtBQUNBLFlBQUlBLElBQUlDLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUIsZUFBS0MsY0FBTDtBQUNBO0FBQ0Q7QUFDRCxlQUFPRixHQUFQO0FBQ0Q7QUFoQnVCLEtBQTFCO0FBUGE7QUF5QmQ7Ozs7K0JBRVU7QUFDVDtBQUNEOzs7Ozs7Ozs7Ozt1QkFNUyxlQUFLRyxXQUFMLENBQWlCO0FBQ3JCQyx5QkFBTyxPQURjO0FBRXJCQyx3QkFBTTtBQUZlLGlCQUFqQixDOzs7O3VCQUtBLGVBQUtDLFlBQUwsRTs7Ozs7Ozs7Ozt1QkFHQSxLQUFLSixjQUFMLEU7Ozs7O3VCQUdBLEtBQUtLLGFBQUwsRTs7Ozt1QkFFQSxLQUFLQyxhQUFMLEU7Ozs7dUJBRUEsZUFBS0MsV0FBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBSU87QUFDZixhQUFPLGVBQUtDLEtBQUwsR0FBYUMsSUFBYixDQUFrQixVQUFDWCxHQUFELEVBQVM7QUFDaEMsZUFBTyxlQUFNWSxLQUFOLENBQVk7QUFDakJDLGVBQVEsZUFBTUMsU0FBZCxjQURpQjtBQUVqQkMsZ0JBQU07QUFDSkMsa0JBQU1oQixJQUFJZ0I7QUFETjtBQUZXLFNBQVosQ0FBUDtBQU1ELE9BUE0sRUFPSkwsSUFQSSxDQU9DLFVBQUNNLE9BQUQsRUFBYTtBQUNuQixlQUFPLGVBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JELFFBQVFGLElBQXZDLENBQVA7QUFDRCxPQVRNLENBQVA7QUFVRDs7QUFFRDs7Ozs7O29DQUdnQjtBQUFBOztBQUNkLFVBQUksS0FBSzNCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sSUFBSThCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENEO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7QUFDRCxhQUFPLGVBQUtFLFdBQUwsR0FBbUJYLElBQW5CLENBQXdCLFVBQUNYLEdBQUQsRUFBUztBQUN0QyxlQUFLWixVQUFMLENBQWdCQyxRQUFoQixHQUEyQlcsSUFBSVgsUUFBL0I7QUFDQTtBQUNBLFlBQUksT0FBS2tDLG9CQUFULEVBQStCO0FBQzdCLGlCQUFLQSxvQkFBTCxDQUEwQnZCLElBQUlYLFFBQTlCO0FBQ0Q7QUFDRixPQU5NLENBQVA7QUFPRDs7QUFFRDs7Ozs7O29DQUdnQjtBQUNkLFVBQU1BLFdBQVcsS0FBS0QsVUFBTCxDQUFnQkMsUUFBakM7QUFDQSxhQUFPLGVBQU1tQyxJQUFOLENBQVc7QUFDaEJYLGFBQVEsZUFBTUMsU0FBZCxXQURnQjtBQUVoQkMsY0FBTTtBQUNKVSxvQkFBVXBDLFNBQVNvQyxRQURmO0FBRUpDLGtCQUFRckMsU0FBU3FDLE1BRmI7QUFHSkMscUJBQVd0QyxTQUFTc0MsU0FIaEI7QUFJSkMsZ0JBQU12QyxTQUFTdUMsSUFKWDtBQUtKQyxvQkFBVXhDLFNBQVN3QyxRQUxmO0FBTUpDLG1CQUFTekMsU0FBU3lDLE9BTmQ7QUFPSkMsb0JBQVUxQyxTQUFTMEM7QUFQZjtBQUZVLE9BQVgsRUFXSkMsS0FYSSxDQVdFLFVBQUNDLEdBQUQsRUFBUztBQUNoQjtBQUNELE9BYk0sQ0FBUDtBQWNEOzs7O0VBMUowQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvSW5kZXgnLFxyXG4gICAgICAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAncGFnZXMvTWUnLFxyXG4gICAgICAncGFnZXMvUmVhZCcsXHJcbiAgICAgICdwYWdlcy9DaGFyZ2UnLFxyXG4gICAgICAncGFnZXMvQ2hhcmdlUmVjb3JkJyxcclxuICAgICAgJ3BhZ2VzL0ZpY3Rpb24nLFxyXG4gICAgICAncGFnZXMvQ2F0YWxvZydcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBjb2xvcjogJyNjZGNkY2QnLFxyXG4gICAgICBzZWxlY3RlZENvbG9yOiAnIzYzYjYzMicsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgICdsaXN0JzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9JbmRleCcsXHJcbiAgICAgICAgICAndGV4dCc6ICfpppbpobUnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9pbmRleC1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvUmVhZEhpc3RvcnknLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5Y6G5Y+yJyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdyZXNvdXJjZXMvbGlzdC1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9saXN0LXNlbGVjdGVkLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9NZScsXHJcbiAgICAgICAgICAndGV4dCc6ICfmiJEnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1ub3JtYWwucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ3Jlc291cmNlcy9tZS1zZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICAvL+S/ruWkjXd4LnJlcXVlc3TnmoTlubblj5FidWdcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XHJcbiAgICAvL+m7mOiupOWwhndlcHkueHh45pa55byP6K+35rGC5bCP56iL5bqP5Y6f55SfYXBp6YO95bCGcHJvbWlzZeWMllxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgLy/lu7rnq4vljp/nlJ9yZXF1ZXN0IEFQSeeahOaLpuaIqlxyXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XHJcbiAgICAgIGNvbmZpZyAocCkge1xyXG4gICAgICAgIGxldCBvbGRIZWFkZXIgPSBwLmhlYWRlcjtcclxuICAgICAgICBsZXQgbmV3SGVhZGVyID0gey4uLm9sZEhlYWRlcixcclxuICAgICAgICAgIENvb2tpZTogYEpTRVNTSU9OSUQ9JHt3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzZXNzaW9uJykuc2Vzc2lvbklkfWBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHAuaGVhZGVyID0gbmV3SGVhZGVyO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAvL+acquW7uuerizNyZCDkvJror53vvIzliJnph43mlrDlu7rnq4tcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDQwMSkge1xyXG4gICAgICAgICAgdGhpcy5fY3JlYXRlU2Vzc2lvbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgLy/lu7rnq4vkvJror53mlL7liLBzaG935ZGo5pyf5LitXHJcbiAgfVxyXG5cclxuICBhc3luYyBvblNob3coKSB7XHJcbiAgICAvL+ajgOafpeS8muivne+8jOWPkei1t+S8muivnVxyXG4gICAgdHJ5IHtcclxuICAgICAgLy/lvIDlkK/liJ3lp4vljJbokpnniYhcclxuICAgICAgYXdhaXQgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6ICfliJ3lp4vljJbkv6Hmga8nLFxyXG4gICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICAgIC8v5qCh6aqM5Lya6K+dXHJcbiAgICAgIGF3YWl0IHdlcHkuY2hlY2tTZXNzaW9uKCk7XHJcbiAgICAgIC8v5Lya6K+d6LaF5pe2XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuX2NyZWF0ZVNlc3Npb24oKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIC8v6I635Y+W5b6u5L+h55So5oi35L+h5oGvXHJcbiAgICAgIGF3YWl0IHRoaXMuX2xvYWRVc2VySW5mbygpO1xyXG4gICAgICAvL+WQjOatpeeUqOaIt+S/oeaBr+WIsDNyZCBzZXJ2ZXJcclxuICAgICAgYXdhaXQgdGhpcy5fc3luY1VzZXJJbmZvKCk7XHJcbiAgICAgIC8v5YWz6Zet5Yid5aeL5YyW6JKZ54mIXHJcbiAgICAgIGF3YWl0IHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jcmVhdGVTZXNzaW9uKCkge1xyXG4gICAgcmV0dXJuIHdlcHkubG9naW4oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgcmV0dXJuIHV0aWxzLmZldGNoKHtcclxuICAgICAgICB1cmw6IGAke3V0aWxzLnVybFByZWZpeH0vc2Vzc2lvbnNgLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pLnRoZW4oKHRocmRSZXMpID0+IHtcclxuICAgICAgcmV0dXJuIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb24nLCB0aHJkUmVzLmRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blvq7kv6HnlKjmiLfkv6Hmga9cclxuICAgKi9cclxuICBfbG9hZFVzZXJJbmZvKCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2VweS5nZXRVc2VySW5mbygpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgIC8v6Ziy5q2iZ2V0VXNlckluZm/ov5Tlm57ov4fmmZpcclxuICAgICAgaWYgKHRoaXMubG9hZFVzZXJJbmZvQ2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmxvYWRVc2VySW5mb0NhbGxiYWNrKHJlcy51c2VySW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCM5q2l5b6u5L+h5L+h5oGv5YiwM3JkIHNlcnZlclxyXG4gICAqL1xyXG4gIF9zeW5jVXNlckluZm8oKSB7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgIHJldHVybiB1dGlscy5wb3N0KHtcclxuICAgICAgdXJsOiBgJHt1dGlscy51cmxQcmVmaXh9L3VzZXJzYCxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG5pY2tOYW1lOiB1c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICBnZW5kZXI6IHVzZXJJbmZvLmdlbmRlcixcclxuICAgICAgICBhdmF0YXJVcmw6IHVzZXJJbmZvLmF2YXRhclVybCxcclxuICAgICAgICBjaXR5OiB1c2VySW5mby5jaXR5LFxyXG4gICAgICAgIHByb3ZpbmNlOiB1c2VySW5mby5wcm92aW5jZSxcclxuICAgICAgICBjb3VudHJ5OiB1c2VySW5mby5jb3VudHJ5LFxyXG4gICAgICAgIGxhbmd1YWdlOiB1c2VySW5mby5sYW5ndWFnZVxyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIC8vdG9kbzrovpPlh7rliLDml6Xlv5dcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=