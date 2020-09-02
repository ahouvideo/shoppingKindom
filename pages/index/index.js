//0引入 用来发送请求的方法
import { request } from '../../request/index.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
        bannerList: [],
        categoryArr:[],
        floorList:[],
        indicatorDots: true,
        autoplay: true,
        interval: 1500,
        circular:true,
          
        
        
  },

  /**
   * 生命周期函数--监听页面加载 页面加载 就会触发
   */
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
    
    this.getBanner();
    this.getCategory();
    this.getFloor();
  },
  //获取轮播图数据
  getBanner(){
    request({url:'/home/swiperdata'})

    .then(result=>{
      console.log("result轮播图=",result)
      this.setData({
          bannerList:result
      })

    })

  },
  //获取分类数据
  getCategory(){
    request({url:'/home/catitems'})
    
    .then(result=>{
      console.log("result分类=",result)

      this.setData({
        categoryArr:result
      })

    })
  },
  //获取楼层数据
  getFloor(){
    request({url:'/home/floordata'})
    
    .then(result=>{
      console.log("result楼层=",result)

      this.setData({
        floorList:result
      })

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