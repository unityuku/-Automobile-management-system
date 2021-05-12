//同时发送异步代码的cis
let ajaxTimes=0;
export const request=(params)=>{
  ajaxTimes++;
  //定义公共url
  //显示加载中·
  wx.showLoading({
    title: '加载中',
    mask:true
  })

  //url:https://api-hmugo-web.itheima.net/api/public/v1/categories
  const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){ 
          wx.hideLoading()
        }
       
      }
    })
  })
}