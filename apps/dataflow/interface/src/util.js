import io from 'socket.io-client';
import axios from 'axios'
import queryString from 'query-string';


var parse = require('url-parse')

var socket = null;


export function getSocketInstance(){
    if(!socket){
        var url = getURLObj();
        socket = io(url.query.server);
    }
    return socket;
}

export function getSocketByURL(url){
   return io(url);
}

export function getURLObj(){
    return parse(location.href, true);
}

export function request(params) {
    return axios({
        withCredentials: true,
        method: 'GET',
        responseType: 'json', // default,
        baseURL:getURLObj().query.server,
        transformRequest: [function (data, headers) {
            // Do whatever you want to transform the data
            return queryString.stringify(data)
          }],
        ...params
    })
} 
