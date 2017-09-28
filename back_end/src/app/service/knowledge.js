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
const queryHelper = require('../../framework/dao/queryHelper');

module.exports = {
    
    /**
     * 根据条件查询知识点
     * @param context
     * @param condition
     * @returns {Promise.<*>}
     */
    async query(context,condition) {
        queryHelper.removeEmptyCondition(condition);
        
        if(condition.name !== undefined){
            condition.name = `%${condition.name}%`;
        }
        // 获取知识点以及父知识点信息
        const knowledges = await db.query(`
        SELECT A.*, B.name as parentName
        FROM 
        knowledge A LEFT OUTER JOIN knowledge B ON A.parent_id = B.id
        WHERE 1=1
        ${condition.id!==undefined?"AND A.id=:id ":" "}
        ${condition.name!==undefined?"AND A.name like :name ":" "}
        `,
            {
                replacements: condition,
                type: db.QueryTypes.SELECT
            }
        );
        
        // todo:获取知识点关联的学科
        const knowledgesAndSubject = await db.query(`
        SELECT A.knowledge_id,B.id as subject_id,B.name as subject_name
        FROM
        knowledge_and_subject A INNER JOIN subject B ON A.subject_id=B.id 
        
        WHERE A.knowledge_id in (:ids) `,
            {
                replacements: { ids:  knowledges.map(k=>k.id)},
                type: db.QueryTypes.SELECT
            }
        );
        knowledges.forEach(k=>{
           k.subject=knowledgesAndSubject.filter(i=>i.knowledge_id===k.id)
        });
        

        return resp.success({data: knowledges});
    },
    /**
     * 删除某个知识点（包括它和所有学科的关系）
     * @param context
     * @param knowledgeId
     * @param forceDelete:是否强制删除（而非假删除)
     * @returns {Promise.<*>}
     */
    async deleteKnowledge(context,{knowledgeId,forceDelete}) {
    
        //参数简单检查
        let validateResult = await validate(knowledgeId, "knowledgeId").notNull().isIntStr(1,30)
            .run();
    
        //如果验证通过
        if (validateResult.pass) {
    
            let disabled = 0;
            if(forceDelete==='true'){
                //真删除
                disabled = await models.knowledge.destroy({
                    where:{
                        id:knowledgeId
                    }
                });
            }else{
                //假删除知识点
                disabled = await models.knowledge.update({enable:0},{
                    where:{
                        id:knowledgeId
                    }
                });
            }
    
            if(disabled){
                //删除知识点、学科关系
                let deleted = await models.knowledge_and_subject.destroy({
                    where:{
                        knowledge_id:knowledgeId
                    }
                });
    
                return resp.success({data: deleted});
            }else {
                return resp.failed({desc: "删除【知识点】失败"});
            }
            
    
        }else {
            return resp.failed({
                code: resp.codes.PARAM_ILLEGAL,
                desc: `${validateResult.desc}${validateResult.funcDesc}`
            })
        }
    },
    /**
     * 删除某个学科里的某个知识点
     * @param context
     * @param knowledgeId
     * @param subjectId
     * @returns {Promise.<*>}
     */
    async deleteSubjectKnowledge(context,{knowledgeId,subjectId}) {
    
        //参数简单检查
        let validateResult = await validate(knowledgeId, "knowledgeId").notNull().isIntStr(1,30)
            .and(subjectId, "subjectId").notNull().isIntStr(1,30)
            .run();
    
        //如果验证通过
        if (validateResult.pass) {
    
            //删除知识点、学科关系
            let deleted = await models.knowledge_and_subject.destroy({
                where:{
                    knowledge_id:knowledgeId,
                    subject_id:subjectId
                }
            });
    
            if(deleted){
                return resp.success({data: deleted});
            }else {
                return resp.failed({desc: "删除【知识点和学科关系】失败"});
            }
    
        }else {
            return resp.failed({
                code: resp.codes.PARAM_ILLEGAL,
                desc: `${validateResult.desc}${validateResult.funcDesc}`
            })
        }
    },
    /**
     * 添加某个学科下面的知识点
     * @param context
     * @param name:知识点名称
     * @param parentId：父亲知识点
     * @param subjectIds：学科id列表，,分割
     * @returns {Promise.<*>}
     */
    async addKnowledge(context,{name,enable,parentId,subjectIds}) {
    
        //参数简单检查
        let validateObj =  validate(name, "name").notNull().notEmptyStr()
            .and(parentId, "parentId").notNull().isIntStr(1,30)
            .and(enable, "enable").notNull().isOneOf(["1","0"])
            .and(subjectIds, "subjectIds").notNull();
        
        if(subjectIds!==undefined && subjectIds.length>0){
            subjectIds= subjectIds.split(",");
            // validateObj.and(subjectIds,'subjectIds').existInTable("subject",["id",""]);
            subjectIds.forEach(it=>{
                validateObj.and(it,`subjectId:${it}`).existInTable("subject","id");
            })
            
        }
        
        let validateResult= await validateObj.run();
    
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
                // subjectIds = subjectIds.split(",");
                let relationsToCreate = subjectIds.map((subjectId)=>{
                   return {
                       knowledge_id:created.id,
                       subject_id:subjectId
                   }
                });
                //添加学科关系
                let createdRelation = await models.knowledge_and_subject.bulkCreate(relationsToCreate);
    
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