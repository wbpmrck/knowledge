const knowledgeService = require('../service/knowledge');
var map = new Map();


map.set(
    //首页，允许匿名访问
    ["GET","/knowledge/map/:subjectId","ALLOW_ANONYMOUS"],
    async function (ctx,next) {
        //根据subjectId,获取到下面的知识点列表
        const { subjectId } = ctx.params;
    
        // 调用service获取返回数据
        const result = await knowledgeService.getAllOfSubject(ctx,{subjectId});
        let data = result.success?result.data:[];
        await ctx.render('knowledge/map.html', {
            knowledgeNodes: JSON.stringify(data)
        });
        await next();
    }
);

module.exports=map;