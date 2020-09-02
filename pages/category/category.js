//引入request
import { request } from '../../request/index.js'

//引入es7语法 避免地狱回调
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu: [], //左侧菜单
    rightList: [], //右侧菜单
    currentIndex: 0, //被点击的左侧菜单
    scrollTop:0 //右侧滚动置顶位置

  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getCates();
    //本地存储
    const Cates = wx.getStorageSync('cates');
    if (!Cates) { //不存在 就 获取数据
      this.getCates();
    } else {
      // 有旧数据 定义过期时间
      if (Date.now() - Cates.time > 2000) {
        //重新发送请求
        this.getCates()
      } else {
        // console.log('可以使用旧数据')
        //提前定义的接口数据Cates:[],  获取本地存储数据，渲染 左右两侧的数据
        this.Cates = Cates.data;
        let leftMenu = this.Cates.map(v => v.cat_name);
        //构造右边数据
        let rightList = this.Cates[0].children;

        this.setData({
          leftMenu,
          rightList
        })
      }
    }
  },
  //获取分类数据
  async getCates() {
    

      //使用es7的async await发送异步请求 优化设置res
      const res = await request({url: '/categories'});
      // this.Cates = res.data.message;
      this.Cates = res;
        //把接口数据存入到本地存储中(key,data)
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

        //构造左侧大菜单数据
        let leftMenu = this.Cates.map(v => v.cat_name);
        //构造右边数据
        let rightList = this.Cates[0].children;

        this.setData({
          leftMenu,
          rightList
        })
  },
  //左侧菜单 点击事件
  leftClick(e) {
    console.log('e=', e);
    const { index } = e.currentTarget.dataset;
    let rightList = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightList,
      //重新设置 右侧内容 距离顶部 滚动位置
      scrollTop:0
    })
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