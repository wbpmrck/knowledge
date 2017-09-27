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

module.exports = {
    
    /**
     * 获取所有学科列表
     * @param context
     * @returns {Promise.<*>}
     */
    async getAll(context) {
        // 获取用户信息
        const subjects = await models.subject.findAll({
            where: {
                enable: 1
            }
        });
        return resp.success({data: subjects});
    },
    /**
     * 根据条件查询学科
     * @param name:学科名称
     * @returns {Promise.<*>}
     */
    async query({name}) {
        // 获取用户信息
        const subjects = await models.subject.findAll({
            where: {
                enable: 1,
                name:{
                    $like: `%${name}%`
                }
            }
        });
        return resp.success({data: subjects});
    }
};