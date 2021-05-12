// 用户上滑数据到底后加载下一页数据
// 找到滚动条件
//判断有无下一页数据 假如能获取总页数和页码 只要判断当前页面是否大于总页数(但是没有总页数 知道总条数和一页放多少条也行)
//假如没有数据后 弹出提示
//有的话则加载
//当前页码加加 从新发送请求 要对data中数组拼接而不是替换
import { request } from "../../request/requst";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
      
    ],
    goodsList:[]
  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  //总页数 
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
    const res =await request({url:"/goods/search",data:this.QueryParams})
    // console.log(res);
    //获取总条数 
    const total=res.total
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    // console.log(this.totalPages);
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新窗口 就算没有调用刷新窗口 直接关闭也不会报错
    wx.stopPullDownRefresh()
   
  },
  //标题点击事件 子组件传递过来的
  handletabsTtemChange(e){
   // console.log(e);
    //获取被点击的标题索引
    const {index} = e.detail.index;
    //console.log(index);
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  //页面上滑
  onReachBottom(){
    // console.log("页面触底");
    //判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页数据
      // console.log("没有下一页数据");
      wx.showToast({
        title: '没有下一页数据了',
      })
     
    }else{
      //还有下一页数据
      console.log("有下一页数据");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(){
    //重置数据
   this.setData({
     goodsList:[]
   })
   //重置页面
   this.QueryParams.pagenum=1;
   //重新发送请求
   this.getGoodsList();
  }
})