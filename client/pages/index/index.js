import { HOST } from '../../config/index'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotList: [],
        loading: true,
        userId: '',
        page: 0,
        pageSize: 8,
        end: false,
        backTopShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

    },
    onReady: function () {

    },
    onShow: function () {
        // this.getData()
    },
    // getData: function () {
    //     var that = this
    //     wx.request({
    //         url: HOST + '/wechat/hot',
    //         data: {
    //             page: that.data.page,  // 起始页
    //             pageSize: that.data.pageSize,  // 一页数据条数
    //             userId: wx.getStorageSync("userId")  // userId  用于获取是否点赞
    //         },
    //         method: 'POST',
    //         success: res => {
    //           if (res.data.state == 1) {
    //               console.log(res.data.data)
    //               that.setData({
    //                   hotList: res.data.data,
    //                   loading: false
    //               });
    //               // console.log(res.data.data)
    //               // console.log(res.data)
    //               if (res.data.length == res.data.data.length) {
    //                   that.setData({
    //                       end: true
    //                   })
    //               }
    //           } else {
    //               console.log("数据查询错误！");
    //           }
    //           // 停止下拉刷新
    //           wx.stopPullDownRefresh();
    //         },
    //         fail: function (res) {
    //           wx.stopPullDownRefresh();
    //         }
    //     })
    // },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // this.getData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        })
        if (!this.data.end) {
            this.getData();
        }

    },

    onPageScroll: function (e) {
        if (e.scrollTop > 1500) {
            this.setData({
                backTopShow: true
            })
        } else {
            this.setData({
                backTopShow: false
            })
        }
    },
    /**
     * 返回顶部
     */
    backTop: function () {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },

    // /**
    //  * 用户点击右上角分享
    //  */
    // onShareAppMessage: function (e) {
    //     let img = e.target.dataset.img;
    //     let id = e.target.dataset.id;
    //     let share = e.target.dataset.share;
    //     let that = this;
    //     return {
    //         title: '你的好友分享给你了一个摄影作品',
    //         path: '/pages/detail/detail?id=' + id,
    //         imageUrl: img,
    //         success: function (res) {
    //             wx.request({
    //                 url: HOST + '/wechat/detailShare',
    //                 data: {
    //                     shares: share + 1,
    //                     detailId: id
    //                 },
    //                 success: res => {
    //                     that.getData();
    //                 }
    //             });

    //         },
    //         fail: function (res) {
    //             // 转发失败
    //         }
    //     }
    // },
    // /**
    //  * 预览图片
    //  */
    // viewImg: function (e) {
    //     let data = e.target.dataset;
    //     let that = this;
    //     wx.previewImage({
    //         current: data.current, // 当前显示图片的http链接
    //         urls: data.imgarr// 需要预览的图片http链接列表
    //     })

    //     // 浏览量统计 （每点一次图片）
    //     wx.request({
    //         url: HOST + '/wechat/views',
    //         data: {
    //             id: data.id,
    //             views: data.views + 1
    //         },
    //         success: (res) => {
    //             that.getData();
    //         },
    //         fail: function (res) {
    //           // 转发失败
    //         }
    //     })
    // },
    // /**
    //  * 点赞
    //  */
    // praise: function (e) {
    //     let data = e.currentTarget.dataset;
    //     console.log(data)
    //     let praises = data.state ? data.praises - 1 : data.praises + 1;
    //     let that = this;
    //     wx.request({
    //         url: HOST + '/wechat/praises',
    //         data: {
    //             id: data.id,
    //             praises: praises,
    //             userId: wx.getStorageSync("userId")
    //         },
    //         success: (res) => {
    //             that.getData();
    //         },
    //         fail: function (res) {
    //           // 转发失败
    //         }
    //     })
    // }

})