/**
 * @alia cp.footer
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-footer',{
            template:vueUtil.replaceStr(__inline("footer.html")),
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