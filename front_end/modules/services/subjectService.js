// @require ajaxHelper.js
// @alia subjectService
var ajaxHelper = require("./ajaxHelper.js");

exports.query=function (name) {
    
    return ajaxHelper.get(
        `/subject/query`,
        {name:name}
    )
}
    
