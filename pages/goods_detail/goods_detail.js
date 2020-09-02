
//引入request
import { request } from '../../request/index.js'

//引入es7语法 避免地狱回调
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({

  data: {
    goodObj:{},
    isCollect:false, //未收藏
    isHistory:false, //未浏览
    goods_id:'',

    user:{
      id:1,
      userImage:'../../img/girl (1).png',
      username:'小丸子',
      userMessage:'../../img/messcopy.png',
      userAddress:'广州'
    },
    goods:{
      goodsPrice:"1000",
      goodsOldPrice:"2000",
      isCollect:false,
      goodsContent:"价格超级美丽，没有用多久，想换一个了，希望有喜欢的闲友收了。",
      goodsDetail:["../../img/goods01.jpg","../../img/goods02.jpg","../../img/goods02.jpg","../../img/goods02.jpg"]
    },
    num:1

  },

//全局  商品对象. 请求成功再赋值
GoodsInfo:{},


  /**
   * 生命周期函数--监听页面加载
   */
  

  // 监听页面显示
  onShow: function () {
    // 获取页面栈 拿到options
    let pages = getCurrentPages();
    let options = pages[pages.length-1].options;
    let goods_id = options.goods_id;
    this.setData({goods_id})
    console.log('goods_id==',goods_id)
    //在回调函数 设置获取缓存的 收藏商品
    this.getDetail(goods_id);
    
  },

  //获取商品详情
  async getDetail(goods_id){
    const goodObj = await request({url:'/goods/detail',data:{goods_id}});

    this.GoodsInfo = goodObj;
    //设置 收藏商品
    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id);
    //设置 浏览过的商品
    let history = wx.getStorageSync('history')||[];
    let isHistory = history.some(v=>v.goods_id === this.GoodsInfo.goods_id);
    

    console.log('goodObj详情=',goodObj)
    this.setData({
      goodObj:{
        goods_name:goodObj.goods_name,
        goods_price:goodObj.goods_price,
        // 暂时处理webp图片格式
        goods_introduce:goodObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodObj.pics,
      },

      isCollect,
      isHistory

    })  
    this.getHistory(goods_id)  
  },

  // 点击图片预览
  previewPic(e){
    // console.log('%c'+'预览图片','color:red;font-size:50px;background-image:linear-gradient(to right,#0094ff,pink)')
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url;
    
    wx.previewImage({
      // current: current,
      // urls: []
      // urls: urls
      current,
      urls
    })
  },

  //点击 加入购物车addCart
  addCart(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id === 
    this.GoodsInfo.goods_id);
    if(index===-1){
      //第一次数量添加 数量为1
      this.GoodsInfo.num =1;
      //添加 控制购物车是否选中属性checked
      this.GoodsInfo.checked =true;

      cart.push( this.GoodsInfo );
    }else{
      cart[index].num++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);

    wx.showToast({
      title: '加入成功',
      icon: '',
      mask:true,//防抖
    
    })
  },

  //获取足迹
  getHistory(goods_id){
   
    let isHistory = false;
    let history = wx.getStorageSync('history')||[];
    let index = history.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index !==-1){
      //能在缓存数据中找到，表示已收藏过
      isHistory = false;
      // history.splice(index,1);
      console.log('已存在历史')
      return
    }else{
      //没看过
      history.push(this.GoodsInfo);
      isHistory = true;
      
    }
    //把history数组存入 缓存中
    wx.setStorageSync('history',history);
    //设置当前数据
    this.setData({isHistory})
  },

  //点击收藏
  toggleIcon(){
    let isCollect = false;
    let collect = wx.getStorageSync('collect')||[];

    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index !==-1){
      //能在缓存数据中找到，表示已收藏过
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask:true
      })
    }else{
      //没收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        mask:true
      })
    }
    //把collect数组存入 缓存中
    wx.setStorageSync('collect',collect);
    //设置当前数据
    this.setData({isCollect})

  },

  //立即购买
  goBuy(){

    console.log('goods_id=',this.data.goods_id)
    this.addCart();
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v =>v.goods_id == this.data.goods_id);
    wx.setStorageSync('cart', newCart);
    wx.navigateTo({
      url: '/pages/pay/pay',    
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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