// promise 形式getting
export const getSetting = () => {
    //
    return new Promise((resolve, reject) => {
        //
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

// promise 形式chooseAddress
export const chooseAddress = () => {
    //
    return new Promise((resolve, reject) => {
        //
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

// promise 形式openSetting
export const openSetting = () => {
    //
    return new Promise((resolve, reject) => {
        //
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

// promise封装 showModal确认弹出框 @params {object} param0参数
export const showModal = ({content}) => {
    //
    return new Promise((resolve, reject) => {
        //
        wx.showModal({
            title: '提示',
            // content: '您是否要删除？',
            content: content,
            succes: (res) => {
              resolve(res)
            },
            fail:(err)=>{
                reject(err);
            }
        })

    })
}



// promise形式封装 login登录 
export const login = () => {
    //
    return new Promise((resolve, reject) => {
        //
        wx.login({
            timeout:10000,
            success: (result) =>{
            //   console.log('res登录=',result);
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
          })  

    })
}
