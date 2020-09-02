// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false

      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false

      },
      {
        id:3,
        value:'浏览足迹',
        isActive:false

      },
    ],
    //收藏列表
    collects:[],
    //历史足迹
    history:[],

    
  },

  //接收子组件Tabs.js 传递的属性tabsItemChange
  receiveTabs(e){
    console.log('e=',e)
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=> {
         i===index?v.isActive=true : v.isActive=false;
    });
    //赋值到data中
    this.setData({tabs})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取收藏列表collect
    const collects = wx.getStorageSync('collect')||[];
    const history = wx.getStorageSync('history')||[];
    this.setData({
      collects:collects,
      history:history,
    })
    console.log('collects',collects,history);
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