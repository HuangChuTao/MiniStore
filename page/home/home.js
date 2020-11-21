
Page({
  data: {
    message: '张三'
  },
  detailPath() {
    wx.navigateTo({
      url: '/page/detail/detail?name=李四&age=19'
    })
  }
})