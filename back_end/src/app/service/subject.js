/**
 * Created by kaicui on 16/11/17.
 * 负责 学科 相关的业务逻辑处理
 */
const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');
const { db, models } = require('../dao/orm');
const consts = require('../dao/const/const');
const co = require('co');
const validate = require('../../framework/onelib/OneLib.Validation').targetWrapper;
const queryHelper = require('../../framework/dao/queryHelper');

module.exports = {
    
    /**
     * 获取所有学科列表
     * @param context
     * @returns {Promise.<*>}
     */
    async getAll(context) {
        // 获取用户信息
        const subjects = await models.subject.findAll();
        return resp.success({data: subjects});
    },
    /**
     * 根据条件查询学科
     * @param context
     * @param condition
     * @returns {Promise.<*>}
     */
    async query(context,condition) {
        queryHelper.removeEmptyCondition(condition);
        
        if(condition.name!==undefined){
            condition.name = {
                $like: `%${condition.name}%`
            }
        }
        // 获取用户信息
        const subjects = await models.subject.findAll({
            where: condition
        });
        return resp.success({data: subjects});
    },
    /**
     * 修改学科信息
     * @param context
     * @param subject：id必须传，其他字段传入则修改
     * @returns {Promise.<*>}
     */
    async update(context,subject) {
        subject.update_time = new Date();
        let id = subject.id;
        delete subject['id'];
        // 获取用户信息
        const updated = await models.subject.update(subject,{
                where:{
                    id:id
                }
            });
        return resp.success({data: updated});
    },
    /**
     * 新增学科信息
     * @param context
     * @param subject
     * @returns {Promise.<*>}
     */
    async create(context,{name,desc,enable}) {
        //参数简单检查
        let validateResult = await validate(name, "name").notNull().notEmptyStr().lengthBetween(1,64)
            .and(desc, "desc").notNull().notEmptyStr().lengthBetween(1,128)
            .and(enable, "enable").notNull().isOneOf(["1","0"])
            .run();
    
        //如果验证通过
        if (validateResult.pass) {
            let created = await models.subject.create(
                {
                    name,
                    desc,
                    enable
                }
            );
    
            //重新查询对象信息
            await created.reload();
            return resp.success({data: created});
        }else {
            return resp.failed({
                code: resp.codes.PARAM_ILLEGAL,
                desc: `${validateResult.desc}${validateResult.funcDesc}`
            })
        }
    }
};