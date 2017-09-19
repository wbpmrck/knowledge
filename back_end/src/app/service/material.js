/**
 * Created by kaicui on 16/11/17.
 * 负责 学习材料 相关的业务逻辑处理
 */
const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');
const { db, models } = require('../dao/orm');
const consts = require('../dao/const/const');
const co = require('co');
const validate = require('../../framework/onelib/OneLib.Validation').targetWrapper;

module.exports = {
    
    /**
     * 获取某个知识点的学习材料
     * @param context
     * @returns {Promise.<*>}
     */
    async getAllOfKnowledge(context,{knowledgeId}) {
        // 获取用户信息
        const data = await db.query(`
            SELECT A.*
            FROM material A INNER JOIN knowledge_and_material B ON A.id = B.material_id
            WHERE B.knowledge_id=:knowledgeId 
            AND A.enable =1`,
            {
                replacements: { knowledgeId:knowledgeId  },
                type: db.QueryTypes.SELECT
            }
        );
        return resp.success({data});
    }
};