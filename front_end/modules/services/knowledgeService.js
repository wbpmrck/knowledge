// @require ajaxHelper.js
// @alia knowledgeService
var ajaxHelper = require("./ajaxHelper.js");

/**
 * 查询 knowledge
 * @param name
 */
exports.query=function (condition) {
    
    return ajaxHelper.get(
        `/knowledge/query`,
        condition
    )
};

/**
 * 更新单个 knowledge
 * @param knowledge
 */
exports.update=function (knowledge) {
    
    return ajaxHelper.post(
        `/knowledge/update`,
        knowledge
    )
};
/**
 * 新增 knowledge
 * @param knowledge
 */
exports.create=function (knowledge) {
    
    return ajaxHelper.post(
        `/knowledge/create`,
        knowledge
    )
};
    
