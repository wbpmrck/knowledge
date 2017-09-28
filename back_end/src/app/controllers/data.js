const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');

const subjectService = require('../service/subject');
const knowledgeService = require('../service/knowledge');
const materialService = require('../service/material');

const map = new Map();



/*
 学习材料相关
 */
map.set(
    // 获取某个知识点关联的学习材料
    ['GET', '/material/ofKnowledge/:knowledgeId', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { knowledgeId } = ctx.params;
        
            // 调用service获取返回数据
            const result = await materialService.getAllOfKnowledge(ctx,{knowledgeId});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);


/*
 知识点相关
 */

map.set(
    // 查询学科信息
    ['GET', '/knowledge/query', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { id,name } = ctx.request.query;
            
            // 调用service获取返回数据
            const result = await knowledgeService.query(ctx,{id,name});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 删除某个一个知识点
    ['POST', '/knowledge/delete', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { knowledgeId,forceDelete} = ctx.request.body;
            
            // 调用service获取返回数据
            const result = await knowledgeService.deleteKnowledge(ctx,{ knowledgeId,forceDelete});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 删除某个学科下面的一个知识点
    ['POST', '/knowledge/deleteFromSubject', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { knowledgeId,subjectId} = ctx.request.body;
            
            // 调用service获取返回数据
            const result = await knowledgeService.deleteSubjectKnowledge(ctx,{ knowledgeId,subjectId});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 添加某个学科下面的一个知识点
    ['POST', '/knowledge/add', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { name,enable, parentId,subjectIds} = ctx.request.body;
            
            // 调用service获取返回数据
            const result = await knowledgeService.addKnowledge(ctx,{ name, enable,parentId,subjectIds});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 获取某个学科所有的子知识点
    ['GET', '/knowledge/ofSubject/:subjectId', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { subjectId } = ctx.params;
        
            // 调用service获取返回数据
            const result = await knowledgeService.getAllOfSubject(ctx,{subjectId});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 获取某个知识点的子知识点
    ['GET', '/knowledge/subOf/:knowledgeId', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { knowledgeId } = ctx.params;
        
            // 调用service获取返回数据
            const result = await knowledgeService.getSubKnowledge(ctx,{knowledgeId});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);

/*
    学科相关
 */
map.set(
    // 获取所有学科信息
    ['GET', '/subject/all', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { accountName, password, nickName, email, phoneNo } = ctx.request.body;
        
            // 调用service获取返回数据
            const result = await subjectService.getAll(ctx);
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 查询学科信息
    ['GET', '/subject/query', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { id,name } = ctx.request.query;
        
            // 调用service获取返回数据
            const result = await subjectService.query(ctx,{id,name});
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 修改 学科
    ['POST', '/subject/update', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const subject = ctx.request.body;
            // 调用service获取返回数据
            const result = await subjectService.update(ctx,subject);
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 新增 学科
    ['POST', '/subject/create', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const subject = ctx.request.body;
            // 调用service获取返回数据
            const result = await subjectService.create(ctx,subject);
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
module.exports = map;