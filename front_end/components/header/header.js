/**
 * @alia cp.header
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");

var component;

var a = __inline("../home/home.html");
var a2 = __inline("../home/home.js");

exports.init = function(){
    if(!component){
        component = Vue.component('cp-header',{
            template:vueUtil.replaceStr(__inline("header.html")),
            data:function(){
                return {
                    name:"知识中心门户"
                }
            },
            methods: {
                handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                }
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}