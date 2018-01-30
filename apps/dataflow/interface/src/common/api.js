var axios = require('axios')



let env = "";

if(typeof window != "undefined"){
    let name = window.location.host.split(".")[0];
    let match = name.match(/alpha(.*)/i);
    if(match){
        env = match[1] || 'dev';
    }else{
        match = name.match(/(.*)dataflow/i);
        if (match) { env = match[1];}
    }   
}else{
    env = process.env.SERVER_TYPE   
}



//export const API_HOST = `http://${env}skes.skong.com`;
//export const API_HOST = 'http://192.168.0.75:3333'
exports.API_HOST = API_HOST = 'http://192.168.0.75:3333'
// export const API_HOST = 'http://localhost.skong.com:8681';

exports.ENUM_REST_API = '/system/develop.enumeration';
//exports.FETCH_ALL_ENUM_DATA_API = '/system/develop.enumeration/fetch';

exports.STRUCT_REST_API = '/system/develop.structure';
exports.CONST_REST_API = '/system/develop.constant';

//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Content-Type'] = 'application/json';
exports.request =  function request(params) {
    return axios({
        withCredentials: true,
        method: 'GET',
        responseType: 'json', // default,
        baseURL:API_HOST,
        // transformRequest: [function (data, headers) {
        //     // Do whatever you want to transform the data
        //     //return queryString.stringify(data)
            
        //     return data;
        //   }],
        ...params
    })
} 


// class RestAPIClient{

// }