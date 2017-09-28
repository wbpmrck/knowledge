const subjectService = require('../service/subject');
const knowledgeService = require('../service/knowledge');
var map = new Map();


map.set(
    //技能图片页面，展示某个学科的技能图谱
    ["GET","/knowledge/map/:subjectId","ALLOW_ANONYMOUS"],
    async function (ctx,next) {
        //根据subjectId,获取到下面的知识点列表
        const { subjectId } = ctx.params;
    
        // 调用service获取返回数据
        const result = await knowledgeService.getAllOfSubject(ctx,{subjectId});
        let knowledges = result.success?result.data:[];
        
        const result2 = await subjectService.query(ctx,{id:subjectId});
        let subject = result2.success?result2.data[0]:undefined;
        await ctx.render('knowledge/map.html', {
            subject: JSON.stringify(subject),
            knowledgeNodes: JSON.stringify(knowledges)
        });
        await next();
    }
);

module.exports=map;