/**
 * @alia cp.home
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-home',{
            template:vueUtil.replaceStr(__inline("home.html")),
            data:function(){
                return {
                }
            },
            methods:{
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}