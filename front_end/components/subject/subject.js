/**
 * @alia cp.subject
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");
var subjectService = require("subjectService");
var validation = require("OneLib.Validation");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-subject',{
            template:vueUtil.replaceStr(__inline("subject.html")),
            data:function(){
                return {
                    condition: {
                        name: ''
                    },
                    subjects: [
                      
                    ]
                }
            },
            created:function () {
                this.query();
            },
            methods:{
                toggleEnable:function(subject) {
                    alert('toggleEnable!');
                },
                query:function() {
                    var self = this;
                    subjectService.query(this.condition.name).then(function (resp) {
                        if(resp && resp.success){
                            self.subjects = resp.data;
                        }else{
                            alert("出现错误:"+resp.desc);
                        }
                    });
                },
                edit:function(subject) {
                    alert('edit!');
                },
                viewSkillMap:function(subject) {
                    alert(JSON.stringify(subject));
                }
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}