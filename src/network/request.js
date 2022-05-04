
import axios from "axios";

export function request(config){
   // 1、创建axios实例
    const instance = axios.create({
      baseURL :'http://152.136.185.210:7878/api/hy66' ,
      timeout :5000 
    })
    // 2、axios拦截器interceptors use(参数1，参数2)
  
    //请求
    instance.interceptors.request.use(config=>{
      //  console.log('request请求成功');
      return config
    },err=>{
      //  console.log('requset请求失败');
    })
    //响应
    instance.interceptors.response.use(config=>{
      return config.data
    },err=>{
      // console.log(err);
    })

    // 3、发送真正的网络请求
    return instance(config)
    
}