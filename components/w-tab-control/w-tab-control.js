// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabControlClick(event) {
      // 1.取出index
      const index = event.currentTarget.dataset.index;
 
      //2.动态绑定current
      this.setData({
        current: this.data.current = index
      })

      //3.将点击事件传出
      this.triggerEvent('itemClick', {index}, {})
    }
  }
})
