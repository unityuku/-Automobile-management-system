// pages/category/index.js
import { request } from "../../request/requst";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    // 被点击的左侧菜单
    currentIndex:0,
    scrolltop:0
    //右侧内容的滚动条顶部的距离
  },
  //接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //web中的本地存储和小程序的本地存储的区别
    // 写代码的方式不一样  web:loaclStorage.setItem("key","vaule") localStorage.getItem("key")
    //小程序中 wx.setstoragesync"key","value") wx.getStorage("key")
    //以前存的时候有没有做类型转化   web:不管存入的是什么类型的数控 会变成string再进入 二小程序不是 该是什么类型就是什么
    
    
    
    // 判断本地存储是否有旧数据
    //1.获取本地存储的数据(小程序也有本地存储的技术)
    const Cates = wx.getStorageSync("cates")
    //做判断
    if(!Cates){
      //不存在 请求发送数据
      this.getCates();
    }
    else{
      //由久的数据 定义一个过期时间 先10s 在改5分钟
      if(Date.now()-Cates.time>1000*300){
        this.getCates();
      }
      else{
        //用旧的数据
        console.log("可以用旧的数据")
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
          
        })
      }
    }
  },
  listtap(e){
    console.log(e);
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrolltop:0
    })
    //从新设置 右侧内容scroll-view便签距离顶部的距离
  },
  //获取分类数据
  async getCates(){
  //   request({url:"/categories"})
  // .then(res=>{
  //  this.Cates=res.data.message;
  //  //把接口的数据存入到本地存储中
  //  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
  //  //构造左侧大菜单数据
  //  let leftMenuList = this.Cates.map(v=>v.cat_name)
  //  let rightContent = this.Cates[0].children;
  //  this.setData({
  //    leftMenuList,
  //    rightContent
  //  })
  //  //构造商品数据
  

  // })


  //1.使用es7的async await 发送异步请求
  const res =await request({url:"/categories"});
      // this.Cates=res.data.message;
      this.Cates=res;
      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
   //构造商品数据
  }
})