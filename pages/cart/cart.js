// 引入
import { getSetting, chooseAddress, openSetting,showModal} from '../../utils/asyncWx.js'
//解决报错包
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  //获取收货地址 try()catch(错误处理)
  async getAddress() {

    try {
      // 获取 权限状态 调用asyncwx文件
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      //判断 权限状态
      // if (scopeAddress === true || scopeAddress === undefined) {
      // const res2 = await chooseAddress();
      // console.log('res2=', res2);

      // 引导用户 打开授权
      // }else {await openSetting();const res2 = await chooseAddress();}


      if (scopeAddress === false) {
        await openSetting();
      }
      //调用收货地址api 因为使用 多次
      const address = await chooseAddress();
      // console.log('res2=', res2);
      // 详细地址拼接
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // address信息都丢到缓存中
      wx.setStorageSync('address', address)

    } catch (err) {
      console.log(err)
    }
  },

  //商品选中
  goodChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;

    // this.setData({ cart });
    // wx.setStorageSync('cart', cart);

    // 修改价格
    this.setCart(cart);
  },

  //优化 设置购物车状态时，重新计算底部栏的数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;

    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    //判断数组cart是否为空

    //把数据 设置给data中的一个变量
    this.setData({ cart, allChecked, totalNum, totalPrice })

    wx.setStorageSync('cart', cart);

  },


  onShow: function () {
    //获取本地存储中 地址数据
    const address = wx.getStorageSync('address')

    //获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || [];

    // const allChecked = cart.length? cart.every(v=>v.checked):false;
    // 优化性能
    this.setData({ address })
    this.setCart(cart);
    // let allChecked = true;
    // let totalPrice = 0;
    // let totalNum = 0;

    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price;
    //     totalNum += v.num;
    //   } else {
    //     allChecked = false;
    //   }
    // })
    //allChecked = cart.length != 0 ? allChecked : false;
    //判断数组cart是否为空

    //把数据 设置给data中的一个变量
    //this.setData({ address, cart, allChecked, totalNum, totalPrice })
  },

  //商品全选-反选
  allChange() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },

  // 增加删减商品数量num
  async AddOrDecrease(e) {

    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断num<1时 且是 -减少
    if (cart[index].num === 1 && operation === -1) {
      
      wx.showModal({
        title: '提示',
        content: '您是否要删除？',
        success: (res)=> {
          if (res.confirm) {
            console.log('用户点击确定')
            cart.splice(index,1);
            this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消删除')
          }
        }
      })
      
      // const res = await showModal({content:'您是否要删除？'});
      // if (res.confirm) {
      //   console.log('用户点击确定')
      //   cart.splice(index,1);
      //   this.setCart(cart);
      // }
    // } else {
    //   // cart[index].num +=1 / -1; 
    //   
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  //结算
  goPay(){
    //获取收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有填写收货地址哟~',
  
      });
      return;
    }
    if(totalNum ===0){
      wx.showToast({
        title: '您还没有添加商品哟~',

      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }

})