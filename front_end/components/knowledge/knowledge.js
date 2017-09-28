/**
 * @alia cp.knowledge
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");
var knowledgeService = require("knowledgeService");
var validation = require("OneLib.Validation");
var urlHelper = require("urlHelper");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-knowledge',{
            template:vueUtil.replaceStr(__inline("knowledge.html")),
            data:function(){
                return {
                    condition: {
                        name: ''
                    },
                    knowledges: [
                      
                    ]
                }
            },
            created:function () {
                this.query();
            },
            methods:{
                toggleEnable:function(knowledge) {
                    var self = this;
                    
                    //提示用户
                    this.$confirm('确定进行操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function(){
                        var subjectToUpdate={
                            id:knowledge.id,
                            enable:+!knowledge.enable
                        };
                        knowledgeService.update(subjectToUpdate).then(function (resp) {
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
                    knowledgeService.query(this.condition).then(function (resp) {
                        if(resp && resp.success){
                            self.knowledges = resp.data;
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
                    this.$router.push({ name: 'knowledge-new'});
                },
                edit:function(knowledge) {
                    this.$router.push({ name: 'knowledge-edit', params: { id: knowledge.id }});
                    // alert('edit!');
                },
                viewMaterial:function(knowledge) {
                    urlHelper.redirectTo("index?knowledgeId="+knowledge.id,"material");
                }
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}