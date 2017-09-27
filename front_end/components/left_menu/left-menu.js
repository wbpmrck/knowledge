/**
 * @alia cp.leftMenu
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-left-menu',{
            template:vueUtil.replaceStr(__inline("left-menu.html")),
            data:function(){
                return {
                    menus:[
                        {id:"1",title:"学科",items:[
                            {id:"1-1",title:"学科管理",routeName:"subject"}
                        ]},
                        {id:"2",title:"知识",items:[
                            {id:"2-1",title:"知识点管理",routeName:"knowledge"},
                            {id:"2-2",title:"技能图谱",routeName:"skillMap"}
                        ]},
                        {id:"3",title:"资料",items:[
                            {id:"3-1",title:"资料管理",routeName:"material"}
                        ]},
                        {id:"4",title:"学习",items:[
                            {id:"4-1",title:"训练路径",routeName:"train"},
                            {id:"4-2",title:"我要学习",routeName:"beginStudy"}
                        ]},
                        {id:"5",title:"选型",items:[
                            {id:"5-1",title:"框架&库",routeName:"framework"},
                            {id:"5-2",title:"我要选型",routeName:"beginSelect"}
                        ]}
                    ]
                }
            },
            methods:{
                handleOpen:function () {
                    console.log("open:"+arguments);
                },
                handleClose:function () {
                    console.log("close:"+arguments);
                },
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}