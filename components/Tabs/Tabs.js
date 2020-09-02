// components/Tabs.js
Component({
  /**
   * 组件的属性列表：  存放要接收父元素的数据
   */
  options:{
    addGlobalClass:true,
  },
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件
    toggle(e){
      //获取点击 的 索引 012
      const {index} =e.currentTarget.dataset;
      // console.log('index=',index)
      //触发 父组件的 自定义事件('事件名',参数)
      this.triggerEvent('tabsItemChange',{index})
    }
  }
})
