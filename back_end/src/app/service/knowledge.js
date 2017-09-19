/**
 * Created by kaicui on 16/11/17.
 * 负责 知识点 相关的业务逻辑处理
 */
const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');
const { db, models } = require('../dao/orm');
const consts = require('../dao/const/const');
const co = require('co');
const validate = require('../../framework/onelib/OneLib.Validation').targetWrapper;

module.exports = {
    
    /**
     * 添加某个学科下面的知识点
     * @param context
     * @param name:知识点名称
     * @param parentId：父亲知识点
     * @param subjectId：学科id
     * @returns {Promise.<*>}
     */
    async addKnowledge(context,{name, parentId,subjectId}) {
    
        //参数简单检查
        let validateResult = await validate(name, "name").notNull().notEmptyStr()
            .and(parentId, "parentId").notNull().isIntStr(1,30)
            .and(subjectId, "subjectId").notNull().isIntStr(1,30)
            .run();
    
        //如果验证通过
        if (validateResult.pass) {
            
            //首先创建知识点
            let created = await models.knowledge.create(
                {
                    name,
                    parent_id:parentId,
                    enable:true
                }
            );
    
            //重新查询对象信息
            await created.reload();
    
            if (created) {
                //添加学科关系
                let createdRelation = await models.knowledge_and_subject.create(
                    {
                        knowledge_id:created.id,
                        subject_id:subjectId
                    }
                );
    
                if(createdRelation){
                    return resp.success({data: created});
                }else {
                    return resp.failed({desc: "添加【知识点和学科关系】失败"});
                }
            } else {
                return resp.failed({desc: "添加【知识点】失败"});
            }
        }else {
            return resp.failed({
                code: resp.codes.PARAM_ILLEGAL,
                desc: `${validateResult.desc}${validateResult.funcDesc}`
            })
        }
    },
    /**
     * 获取某个学科的知识点
     * @param context
     * @returns {Promise.<*>}
     */
    async getAllOfSubject(context,{subjectId}) {
        // 获取用户信息
        const data = await db.query(`
            SELECT A.*
            FROM knowledge A INNER JOIN knowledge_and_subject B ON A.id = B.knowledge_id
            WHERE B.subject_id=:subjectId 
            AND A.enable =1
            `,
            {
                replacements: { subjectId:subjectId  },
                type: db.QueryTypes.SELECT
            }
        );
        return resp.success({data});
    },
    /**
     * 获取某个知识点下一层的子知识点
     * @param context
     * @returns {Promise.<*>}
     */
    async getSubKnowledge(context,{knowledgeId}) {
        // 获取用户信息
        const data = await models.knowledge.findAll({
            where: {
                parent_id: knowledgeId,
                enable:1
            }
        });
        return resp.success({data});
    }
};