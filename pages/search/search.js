//解决报错包
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isShow:false,//取消显示隐藏
    iptValue:'',
  },


  timeId:-1,

  //获取输入框 关键字value
  changeInput(e){
   
    const {value} = e.detail;
    if(!value.trim()){
      //去除空格
      this.setData({
        goods:[],
        isShow:false
      })
      return;
    }

    //防抖：1.先清除定时器 2.
    clearTimeout(this.timeId);

    this.timeId=setTimeout(()=>{
      this.qsearch(value);
    },1000)

    //得到请求的搜索数据
    // this.qsearch(value);
    this.setData({isShow:true,})
  },

  //点击 取消按钮
  cancel(){
    this.setData({
      goods:[],
      iptValue:'',
      isShow:false
    })
  },

  //发送搜索请求的数据 query关键字
  async qsearch(query){
    const res = await request({
      url:'/goods/qsearch',
      method:'GET',
      data:{query}
    })
    // console.log('res搜索=',res)
    this.setData({
      goods:res
    })
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