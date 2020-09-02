// pages/feedback/feedback.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false

      }
    ],
    selectImgs: [],
    textValue: '', //文本域内容
  },

  //不需要在页面显示 外网图片路径数组
  uploadImgs: [],

  //接收子组件Tabs.js 传递的属性tabsItemChange
  receiveTabs(e) {
    console.log('e=', e)
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    });
    //赋值到data中
    this.setData({ tabs })
  },

  //文本域的输入事件
  textInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },

  //选择上传图片  接口 
  chooseImg() {
    wx.chooseImage({
      count: 9,
      //图片格式：原图，压缩
      sizeType: ['original', 'compressed'],
      //相册，照相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log('res',res)
        this.setData({
          // selectImgs:res.tempFilePaths
          // 用户上传一次有想上传。 进行图片拼接
          selectImgs: [...this.data.selectImgs, ...res.tempFilePaths]
        })
      }
    })
  },

  //删除图片 获取索引index
  removeImg(e) {
    //获取组件索引index
    const { index } = e.currentTarget.dataset;
    console.log(index);
    let { selectImgs } = this.data;
    //点击删除
    selectImgs.splice(index, 1);
    this.setData({
      selectImgs
    })

  },

  //表单提交
  submitForm() {
    const { textValue, selectImgs } = this.data;
    //合法性验证  输入空格
    if (!textValue.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      })
      return;
    }

    //加载中
    wx.showLoading({
      title: '正在上传中',
      mask: true,

    });

    //如果 上传图片
    if (selectImgs.length != 0) {
      selectImgs.forEach((v, i) => {
        // console.log(i)
        //上传到专门的服务器  api不支持多个文件==》遍历上传
        wx.uploadFile({
          //上传到哪  使用路过图床
          url: 'https://imgchr.com/',
          //被上传的路径
          filePath: v,
          name: 'file',
          success: (res) => {
            console.log('res=', res)
          }
        })
        this.uploadImgs.push(v);
        //所有图片都上传完毕才触发
        if (i === selectImgs.length - 1) {
          //关闭加载中
          wx.hideLoading();

          console.log('已上传成功')
          this.setData({
            textValue: '',
            selectImgs: ''
          })
          wx.navigateBack({
            delta: 1
          });

        }
      })
      // console.log(this.uploadImgs)
    }else{
      wx.hideLoading();
      console.log('提交文本');
      wx.navigateBack({
        delta:1
      })
    }




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