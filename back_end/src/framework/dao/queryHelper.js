/**
 * Created by kaicui on 17/9/28.
 */


module.exports.removeEmptyCondition=function (conditionObj) {
    for(var key in conditionObj){
        if(conditionObj[key]===undefined||conditionObj[key]===null){
            delete conditionObj[key];
        }
    }
}