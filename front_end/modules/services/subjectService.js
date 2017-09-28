// @require ajaxHelper.js
// @alia subjectService
var ajaxHelper = require("./ajaxHelper.js");

/**
 * 查询subject
 * @param name
 */
exports.query=function (condition) {
    
    return ajaxHelper.get(
        `/subject/query`,
        condition
    )
};

/**
 * 更新单个subject
 * @param subject
 */
exports.update=function (subject) {
    
    return ajaxHelper.post(
        `/subject/update`,
        subject
    )
};
/**
 * 新增subject
 * @param subject
 */
exports.create=function (subject) {
    
    return ajaxHelper.post(
        `/subject/create`,
        subject
    )
};
    
