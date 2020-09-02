// pages/my/my.js
Page({
  
  data: {
    userInfo: {},
    collectNum:0, //收藏商品
    historyNum:0,
    phone:'400-611-9000',
  },

  onLoad: function () {
    
  },
  goPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
  },
  //授权登入
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo,
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addressManage: function () {
    wx.navigateTo({ url: '../address/addressList/addressList' });
  },
  mycollect:function(){
    wx.navigateTo({ url: '../collect/collect' });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从缓存 获取用户信息 和收藏商品数组 
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect');
    const history = wx.getStorageSync('history');
    this.setData({
      userInfo,
      collectNum:collect.length,
      historyNum:history.length,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})