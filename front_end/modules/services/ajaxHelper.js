
var config = require("../../config/configs.js");
var axios = require("axios");
var qs = require("qs");

exports.get = function (url,data) {
    // var option = {
    //     dataType:'json',
    //     url: `${config.staticDomain}/${url}`,
    //     data:qs.stringify(data),
    //     contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    //     type:method,
    //     timeout:timeout||15000,
    //     cache:false,
    //     async: async,
    //     success: function(resp, textStatus){
    //         cb&&cb(resp,null)
    //     },
    //     error:function (XMLHttpRequest, textStatus, errorThrown) {
    //         cb&&cb(null,textStatus||errorThrown)
    //     }
    // };
    // return axios(option);
    
    return new Promise(function (resolve, reject) {
        axios.get(config.dynamicDomain+url, {
            params: data
        }).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            reject(error);
        });
    });
};
exports.post = function (url,data) {
    // var option = {
    //     dataType:'json',
    //     url: `${config.staticDomain}/${url}`,
    //     data:qs.stringify(data),
    //     contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    //     type:method,
    //     timeout:timeout||15000,
    //     cache:false,
    //     async: async,
    //     success: function(resp, textStatus){
    //         cb&&cb(resp,null)
    //     },
    //     error:function (XMLHttpRequest, textStatus, errorThrown) {
    //         cb&&cb(null,textStatus||errorThrown)
    //     }
    // };
    // return axios(option);
    return new Promise(function (resolve, reject) {
        axios.post(config.dynamicDomain+url,  qs.stringify(data)).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            reject(error);
        });
    });
    // return axios.post(config.staticDomain+url, qs.stringify(data));
}
