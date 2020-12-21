//引入轮播图网络请求文件
// import request from '../../service/network.js'
import {getMultiData, getGoodsData} from '../../service/home'

Page({
  tabClick(event) {
    // 1.取出index
    const index = event.detail.index;

    // 2.随着index发生变化改变type的值
    this.setData({
      defaultType: this.data.currentType[index]
    })
  },

  imgLoad() {
    //获取组件到顶部的距离
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.contorlTop = rect.top
    }).exec()
  },

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommend: [],
    title: ['流行', '新款', '精选'],
    goods: {
      pop: {page: 0, list: []},
      new: {page: 0, list: []},
      sell: {page: 0, list: []},
    },
    defaultType: 'pop',
    currentType: ['pop', 'new', 'sell'],
    backIf: false,
    controlFixed: false,
    contorlTop: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 一、调用轮播图数据请求
    this._getMultidata()

    //2.请求首页商品数据
    this._getGoodsData('pop'),
    this._getGoodsData('new'),
    this._getGoodsData('sell')
  },

  // --------------网络请求---------------
  _getMultidata() {
    // 一、调用轮播图数据请求
    getMultiData().then(res => {
      console.log(res);
      // 1.取出轮播图数据
      const banner = res.data.data.banner.list;
      const recommend = res.data.data.recommend.list
      //保存轮播图数据到data中
      this.setData({
        banner: banner,
        recommend: recommend
      })
    })
  },
  
  _getGoodsData(type) {
    // 一、请求首页商品数据
    // 1.获取页码
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      //2.获取数据
      const list = res.data.data.list
      // 3.将数据保存到对应的类型中
      // 方法一：
      // for(let item of list) {
      //   this.data.goods[type].list.push(item)
      // }
      // 方法二：
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      //4.响应式保存数据
      const oldData = `goods.${type}.list`;
      const oldPage = `goods.${type}.page`;
      this.setData({
        [oldData]: oldList,
        [oldPage]: page
      })
    })
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
    this._getGoodsData(this.data.defaultType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //监听页面滚动
  onPageScroll(options) {
    const scrollNum = 1000;
    // 1.取出scrollTop页面滚动距离
    const scrollTop = options.scrollTop;
    //2.滚动到某位置进行隐藏
    const flat = scrollTop > scrollNum
    if (this.data.backIf != flat) {
      this.setData({
        backIf: flat
      })
    }
    const flat2 = scrollTop >= this.data.contorlTop
    if (this.data.controlFixed != flat2) {
      this.setData({
        controlFixed: flat2
      })
    }
  }
})