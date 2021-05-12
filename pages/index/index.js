//引入 用来发送请求的方法
import { request } from "../../request/requst";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    imgUrls: [
      'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
      'https://aecpm.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg',
      '//img.alicdn.com/imgextra/i4/2206686532409/O1CN01AgHNp41TfMmE7ciE0_!!2206686532409-0-lubanimage.jpg'
    ],
    catesList:[],
    floorList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //页面开始加载的时候就会触发
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据
   
    this.getCateList();
    this.floorList();
  },
//获取分类导航数据
getCateList(){
  request({url:"/home/catitems"})
  .then(result=>{
    this.setData({
      catesList:result
    })
  })
},
floorList(){
  request({url:"/home/floordata"})
  .then(result=>{
    this.setData({
      floorList:result
    })
  })
},
})