
//引入request
import { request } from '../../request/index.js'

//引入es7语法 避免地狱回调
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false

      },
      {
        id:2,
        value:'价格',
        isActive:false

      },
    ],
    goodsLists:[],//综合
    goodsHots:[],//销量
    goodsPrices:[],//价格

  },
  //接口需要的参数
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1, //页码
    pageSize:10,  //10条数据

  },
  //总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取category的cid参数
    console.log('options=',options);
    //根据cid获取数据 不存在就为 空. ti
    this.QueryParams.cid = options.cid||'';
    this.QueryParams.query = options.query||'';

    this.getGoodsList()
  },

  // sorts(arr,key){
  //   return arr.
  // },

  //获取商品数据 es7语法同步
  async getGoodsList(){
    const res = await request({url:'/goods/search',data:this.QueryParams});

    console.log('res获取商品数据=',res.goods)
    //获取总条数total .需要配合参数
    const total = res.total;
    //计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pageSize)
    console.log('this.totalPages获取总页=',this.totalPages)
    //获取按照价格低到高

    this.setData({
      // 解构旧数据  拼接新数据
      // goodsLists:res.goods
      goodsLists:[...this.data.goodsLists,...res.goods],
      goodsPrices:[...this.data.goodsPrices,...res.goods.sort((a,b)=>a.goods_price - b.goods_price)],
      goodsHots:[...this.data.goodsHots,...res.goods.sort((a,b)=>b.hot_mumber - a.hot_mumber)]
    })

    //关闭上拉刷新窗口
    wx.stopPullDownRefresh();

  },

  //接收子组件Tabs.js 传递的属性tabsItemChange
  receiveTabs(e){
    console.log('e=',e)
    //根据detail 获取被点击的索引
    const {index} = e.detail;
    //修改 源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=> {
        // console.log('i=',i)
        i = i===index?v.isActive=true:v.isActive=false;
    });
    //赋值到data中
    this.setData({tabs})

  },

  //页面上滑 滚动条触底事件
  

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
    wx.showToast({
        title: '已刷新',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: false,
    })
    // console.log('上拉刷新')
    this.setData({
      goodsLists:[]
    })
    //重置页码
    this.QueryParams.pagenum =1;
    //重新发请求
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('有下一页数据')
    // 判断还有没有 下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      // console.log('没有下一页数据了')
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        
      });
    }else{
      console.log('有下一页数据num',this.QueryParams.pagenum)
      this.QueryParams.pagenum ++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})