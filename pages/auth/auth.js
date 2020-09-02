
//解决报错包
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx.js'

//0引入 用来发送请求接口的方法
import { request } from '../../request/index.js'
Page({

  data:{
 
  },
// 获取用户信息
async handleGetUserInfo(e) {
  try {
    
  // 1 获取用户信息
  const { encryptedData, rawData, iv, signature } = e.detail;
  // 2 获取小程序登录成功后的code
   // const { code } = await login();
  //  const loginParams={ encryptedData, rawData, iv, signature ,code};
  const  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';

  wx.login({
    success (res) {
      console.log('res授权=',res)
      let code = res.code;
      // wx.setStorageSync("token", code);
      if (code) {
        //发起网络请求 
        wx.request({
          method:'POST',
          url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
          data: {
            encryptedData, 
            rawData, 
            iv, 
            signature ,
            code,
          }
            
        })
        console.log('登录成功！')

      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })

  //  3 发送请求 获取用户的token ,{token}解构token const {code} =result; result存入code
   // const res =await request({url:"/users/wxlogin",data:loginParams,method:"post"});
  //  const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
  // 4 把token存入缓存中 同时跳转回上一个页面
  wx.setStorageSync("token", token);

  wx.navigateBack({
    delta: 1
  });

  } catch (error) {
    console.log(error);
  }
}

  
})