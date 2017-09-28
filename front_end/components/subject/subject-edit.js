/**
 * @alia cp.subject.edit
 */
var Vue = require("vue");
var vueUtil = require("vueUtil");
var subjectService = require("subjectService");
var validation = require("OneLib.Validation");
var urlHelper = require("urlHelper");

var component;

exports.init = function(){
    if(!component){
        component = Vue.component('cp-subject-edit',{
            template:vueUtil.replaceStr(__inline("subject-edit.html")),
            data:function(){
                return {
                    meta: undefined,
                    rules: {
                        name: [
                            {required: true, message: '请输入名称', trigger: 'blur'},
                            {required: true, max: 64, message: '最多64个字符', trigger: 'blur'}
                        ],
                        desc: [
                            {required: true, message: '请输入描述', trigger: 'blur'},
                            {required: true, max: 128, message: '最多128个字符', trigger: 'blur'}
                        ]
                    },
                    subject: {
                        id:undefined,
                        name:"",
                        desc:"",
                        enable:1,
                    }//里面存储subject对象
                }
            },
            created:function () {
                this.meta = this.$route.meta;
                if(this.meta.mode=='update'){
                    this.query();
                }
            },
            methods:{
                /**
                 * 编辑之前，先刷新、展示要编辑的数据
                 */
                query:function() {
                    var self = this;
                    var subjectId = self.$route.params.id;
                    subjectService.query({id:subjectId}).then(function (resp) {
                        if(resp && resp.success){
                            self.subject = resp.data[0];
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
                submit:function() {
                    var self = this;
                    this.$refs["subject"].validate(function(valid){
                        if (valid) {
                            //根据当前模式，判断提交类型
                            subjectService[self.meta.mode](self.subject).then(function (resp) {
                                if(resp && resp.success){
                                    
                                    self.$notify({
                                        title: '成功',
                                        message: '操作成功',
                                        type: 'success',
                                        duration:1500
                                    });
                                    self.$refs["subject"].resetFields();
                                    
                                    //如果是编辑模式，则自动退回上一页
                                    if(self.meta.mode==='update'){
                                        self.$router.go(-1);
                                    }
                                    
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
                        } else {
                           
                            return false;
                        }
                    });
                },
                cancel:function () {
                    this.$router.go(-1);
                }
            },
            mounted:function(){
                
            }
        })
    }
    return component;
}