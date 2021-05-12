import { request } from "../../request/requst";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const {goods_id}=options;
   this.getGoodsDetai(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetai(goods_id){
    const res =await request({url:"/goods/detail",data:{goods_id}})
    // console.log(res);
    this.setData({
      goodsObj:res
    })
  }

})