// 引入
import { getSetting, chooseAddress, openSetting, showModal } from '../../utils/asyncWx.js'
//解决报错包
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    // createTime:'',
    isPay: false //是否支付
  },

  payGoods: [],

  onShow: function () {
    //获取本地存储中 地址数据
    const address = wx.getStorageSync('address')

    //获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || [];

    //过滤后的购物车数组 checked =true
    cart = cart.filter(v => v.checked);
    // 优化性能
    this.setData({ address })
    // this.setCart(checkedCart);

    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {

      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })

    //把数据 设置给data中的一个变量
    this.setData({ cart, totalNum, totalPrice, address })
    
    //console.log('this.data.cart=', this.data.cart)
    //获取已支付过的商品
    this.payGoods = wx.getStorageSync('payGoods') || [];
    console.log('payGoods已存=', this.payGoods);

  },

  //格式化时间
  fromTime(str){
    let date = new Date(str);
    let y =date.getFullYear();
    let m =date.getMonth()+1;
    let d =date.getDate();
    let hh =date.getHours()
    let mm =date.getMinutes();
    let ss =date.getMilliseconds();
    return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
  },

  //优化 设置购物车状态时，重新计算底部栏的数据
  onUnload: function () {
    // 点击返回跳转到指定页面
  
  },

  //支付paid
  async paid() {

    // 1 判断缓存中有没有token 
    const token = wx.getStorageSync("token");
    // 2 判断
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }

    wx.showModal({
      title: '请支付',
      content: '扫描二维码',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确认支付',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          this.data.cart.forEach(v => { 
            v.isPay = true ;
            v.totalNum = this.data.totalNum;
            v.totalPrice = this.data.totalPrice;
            v.createTime = this.fromTime(new Date()) 
          })
          console.log(this.data.cart)
          this.payGoods.push(this.data.cart);
          
          console.log(this.payGoods)
          wx.setStorageSync('payGoods', this.payGoods)
          wx.navigateTo({
            url: '/pages/order/order?type=1'
          })
        } else if (result.cancel) {
          this.data.cart.forEach(v => { 
            v.isPay = false ;
            v.totalNum = this.data.totalNum;
            v.totalPrice = this.data.totalPrice;
            v.createTime = this.fromTime(new Date()) 
          });
         
         
          this.payGoods.push(this.data.cart);
          
          wx.setStorageSync('payGoods', this.payGoods)
          wx.navigateTo({
            url: '/pages/order/order?type=1'
          })
        }
      },

    });

    //删除缓存中cart数据 留下未被选中的
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync('cart', newCart);


  },




})