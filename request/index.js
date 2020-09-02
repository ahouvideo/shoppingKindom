
// 请求次数
let ajaxTime = 0;
export const request =(params)=>{
    //定义公共url
    //url:'https://api-hmugo-web.itheima.net/api/public/v1/home'
    //显示加载中wx.showLoading
    wx.showLoading({
        title: '加载中',
        mask: true,
    
    });
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';

    return new Promise((resolve,reject)=>{
        ajaxTime++;

        wx.request({
            
            ...params,
            
            //拼接url
            url:baseUrl+params.url,
            
            success:(result)=>{
                // resolve(result);
                resolve(result.data.message);
            },
            fail:(err)=>{reject(err);},
            // 不管成功或失败 都会触发. 关闭加载中
            complete: ()=>{
                //所有请求完成之后
                 ajaxTime--;

                 if(ajaxTime===0){
                    //关闭等待加载的图标
                     wx.hideLoading(); 
                 }
            }
            
        })
    })
}