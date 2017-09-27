/**@alia vueUtil
 * Created by kaicui on 17/9/26.
 */

var replaceStr = function(str){
    var a = str;
    if(str.indexOf("&apos;")>=0){
        a = str.replace(/&apos;/g,"'");
    }
    return a;
};

exports.replaceStr = replaceStr;