
var Vue = require("vue");
var elementUI = require("elementUI");
var urlHelper = require("urlHelper");
var vueRouter = require("vue-router");

exports.init=function (userInfo) {
    
    
    Vue.use(vueRouter);
    var bus = new Vue();
    Vue.mixin({
        data:function(){
            return {
                bus:bus,
                userInfo:userInfo
            }
        }
    });
    
    elementUI.install(Vue);
    
    
    var router = new vueRouter({
        routes: [
            { path: '/',
                redirect: '/home'
            },
            { path: '/home',
                name: 'home',
                component: require("cp.home").init(),
            },
            { path: '/subject/index',
                name: 'subject',
                component: require("cp.subject").init(),
            }
        ]
    });
    
    // 路由器需要一个根组件。
    var App = new Vue({
        created:function(){
        },
        components:{
            'cp-header': require('cp.header').init(),
            'cp-left-menu': require('cp.leftMenu').init(),
            'cp-footer': require('cp.footer').init()
        },
        data: function(){
            return {
            }
        },
        router:router,
        route:{
        },
        events:{
            //接收子组件传来的reflesh事件，并广播到其他子组件
            'reflesh':function(url){
                var self = this;
                self.$broadcast("reflesh",url);
                // console.log("root broadcast");
            }
        }
    }).$mount('#root');
    
}