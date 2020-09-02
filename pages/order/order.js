const { request } = require("../../request/index");
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false

      },
      {
        id:2,
        value:'待发货',
        isActive:false

      },
      {
        id:3,
        value:'退货/退款',
        isActive:false

      },
    ],
    orderList:[],
    totalPrice: 0, //总价
    totalNum: 0,  //总数量
  },

  //激活页面选择标题type
  changeTitleIndex(index){
    //根据detail 获取被点击的索引
    //const {index} = e.detail;
    //修改 源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=> {
         i===index?v.isActive=true : v.isActive=false;
    });
    //赋值到data中
    this.setData({tabs})
  },

  //接收子组件Tabs.js 传递的属性tabsItemChange
  receiveTabs(e){
    console.log('e=',e)
    const {index} = e.detail;
    this.changeTitleIndex(index);
    //重新发送请求 index=0.type=1
    this.getOderList(index+1)
  },
  

  //获取订单数组 
  async getOderList(type){
    let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';
    const num = parseInt(type)
    const res = await request({
      url:'/my/orders/all',
      header:{Authorization: token},
      data:{type:num}
    });
    console.log('res订单=',res)
    const payGoods = wx.getStorageSync('payGoods') || [];
    console.log('payGoods=',payGoods)
     this.setData({orderList:payGoods
      // 添加新属性create_time_cn 。解构v==>...v
      //orderList: payGoods.map(v=>
         //({...v, create_time_cn:(new Date(v.add_time*1000).toLocaleString())
          // console.log('v=',v)
        //})
        // ({...v, create_time_cn:(new Date())
        
        // }))
        
      


    })
    console.log('orderList订单=',this.data.orderList)

    let totalPrice = 0;
    let totalNum = 0;
    this.data.orderList.forEach((v,i)=>{
      // console.log('v=',v,'i',i)
        // v[i].forEach(item=>{
          // console.log('vvv1=',v[0])
          // console.log('vvv=',v[1])

          // totalPrice += item.num * item.goods_price;
          // totalNum += item.num;
          // console.log('totalNum=',totalNum,totalPrice)

        // })
        // totalPrice += v.num * v.goods_price;
        // totalNum += v.num;
      //v.forEach(item=>{
        
        // totalPrice += item.num * item.goods_price;
        // totalNum += item.num;

      //})
     }
    )
    // this.setData({totalNum, totalPrice,})
    // console.log('totalNum=',totalNum,totalPrice)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // type=1
    console.log('options订单onLoad=',options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //undefined
    // console.log('options订单onShow=',options)
    // 获取当前小程序的页面栈
    let pages =  getCurrentPages();
    console.log('pages订单onShow=',pages)
    //
    let currentPage = pages[pages.length-1];
    console.log('currentPage订单onShow=',currentPage.options)

    const {type} = currentPage.options;
    console.log('type订单onShow=',type)

    // 获取订单。根据type激活选择页面标题. type=1 index=0
    this.changeTitleIndex(parseInt(type)-1);

    this.getOderList(type)
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
    // 点击返回跳转到指定页面
    wx.reLaunch({
      url: '/pages/my/my',
    });
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