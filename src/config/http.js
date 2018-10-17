import Axios from 'axios';

// var baseUrl = 'http://localhost:8080';
// var baseUrl = 'http://39.108.97.182:8080';
// var baseUrl = 'http://192.168.0.105:8080';
var baseUrl = 'https://rongmingye.xin:443';

var axios = Axios.create({
    　baseURL: baseUrl,
    　timeout: '15000',  //请求超时时间
    　headers: {'X-Custom-Header': 'foobar'}     //header传值，例如：Authorization
})

axios.interceptors.request.use(function(config){
    //在发送请求之前做某事
    return config;
  },function(error){
    //请求错误时做些事
    return Promise.reject(error);
  });
 
//添加响应拦截器
axios.interceptors.response.use(function(response){
    // console.log(response);
    //对响应数据做些事
    if(response.data.code === 0) {
        return response.data;
    }else if(response.data.code === 1) {
        return response.data;
    }else{
        return response.data;
    }
  },function(error){
    //请求错误时做些事
    return Promise.reject(error);
})

export default axios;