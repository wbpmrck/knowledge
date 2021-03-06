/**
 * @alia cp.subject
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");
var subjectService = require("subjectService");
var validation = require("OneLib.Validation");
var urlHelper = require("urlHelper");

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
                    var self = this;
                    
                    //提示用户
                    this.$confirm('确定进行操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function(){
                        var subjectToUpdate={
                            id:subject.id,
                            enable:+!subject.enable
                        };
                        subjectService.update(subjectToUpdate).then(function (resp) {
                            if(resp && resp.success){
                                self.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success',
                                    duration:1500
                                });
                                
                                self.query();
                            }else{
                                self.$notify.error({
                                    title: '错误',
                                    message: resp.desc
                                });
                            }
                        }).catch(function(err){
                            self.$notify.error({
                                title: '错误',
                                message: err.message
                            });
                        });
                    }).catch(function(){
                        self.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                    
                    
                },
                query:function() {
                    var self = this;
                    subjectService.query(this.condition).then(function (resp) {
                        if(resp && resp.success){
                            self.subjects = resp.data;
                        }else{
                            self.$notify.error({
                                title: '错误',
                                message: resp.desc
                            });
                        }
                    }).catch(function(err){
                        self.$notify.error({
                            title: '错误',
                            message: err.message
                        });
                    });
                },
                createSubject:function() {
                    this.$router.push({ name: 'subject-new'});
                },
                edit:function(subject) {
                    this.$router.push({ name: 'subject-edit', params: { id: subject.id }});
                    // alert('edit!');
                },
                viewSkillMap:function(subject) {
                    urlHelper.redirectTo("map/"+subject.id,"knowledge");
                }
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}