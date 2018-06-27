//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({

    /**
     * 缓存用户信息
     */
    data: {
      userInfo: {},
      logged: false
    },

    /**
     * 用户登录微信
     */
    login: function () {
      if (this.data.logged) return

      console.log("login start")
      var that = this
      qcloud.login({
        success(result) {
          if (result) {
            that.setData({
              userInfo: result,
              logged: true
            })
            console.log("login: " + result)
          } else {
            console.log("login: " + config.service.requestUrl)
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                that.setData({
                  userInfo: result.data.data,
                  logged: true
                })
                console.log("login qcloud: " + result.data.data)
              },
              fail(error) {
                console.log('request fail', error)
              }
            })
          }
        },
        fail(error) {
          console.log('登录失败', error)
        }
      })
    },

    /**
     * 注册用户信息
     */
    registerUser: function () {
      var that = this;
      wx.login({
        success: function (res) {
          var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
          wx.getUserInfo({
            success: function (res) {
              var iv = res.iv;
              var encryptedData = res.encryptedData;
              // 下面开始调用注册接口
              wx.request({
                url: that.data.host + that.data.subDomain + '/user/wxapp/register/complex',
                data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
                success: (res) => {
                  wx.hideLoading();
                  that.login();
                }
              })
            }
          })
        }
      })
    },

    /**
     * 获取微信用户信息
     */
    getUserInfo: function (cb) {
      var that = this
      if (this.data.userInfo) {
        typeof cb == "function" && cb(this.data.userInfo)
      } else {
        //调用登陆接口
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.data.userInfo = res.userInfo
                typeof cb == "function" && cb(that.data.userInfo)
              }
            })
          }
        })
      }
    },

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl)
      this.login()
    },
    
    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
      
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {
        
    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    }
})