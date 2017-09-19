/** @alia g6-helper
 * Created by kaicui on 17/9/19.
 */

function makeNode(
    id,          // 唯一标识
    children,    // 子元素集
    isCollapsed, // 是否折叠 Boolean
    size,        // 尺寸
    style,       // 样式
    color,       // 颜色
    shape,       // 形状
    layer,       // 层号
    label        // 标注
) {
    return{
        id:id,          // 唯一标识
        children:children,    // 子元素集
        isCollapsed:isCollapsed, // 是否折叠 Boolean
        size:size,        // 尺寸
        style:style,       // 样式
        color:color,       // 颜色
        shape:shape,       // 形状
        layer:layer,       // 层号
        label:label        // 标注
    }
};

/**
 *
 * 把数据库的知识点数据转化成树形结构
 * @param subjectName:领域名称
 * @param ar:[
 * {"id":1,"name":"浏览器","parent_id":-1,"enable":1,"create_time":"2017-09-15T16:41:29.000Z","update_time":"2017-09-15T16:41:29.000Z"},
 * {"id":2,"name":"浏览器渲染机制","parent_id":1,"enable":1,"create_time":"2017-09-15T16:42:08.000Z","update_time":"2017-09-15T16:42:08.000Z"}]
 *
 * @param options:{
 *    collapseLayer:Number 表示折叠到第几层节点。如果是0，代表都不折叠
 * }
 */
 function translateArrayToTree(subjectName,ar,options) {
    var opt = options||{
            collapseLayer:0
        };
    /**
     * 把node的子节点构建出来,放到node下面
     * @param ar
     * @param node
     */
    function buildSubTreeOf(ar,node){
        var childrenData = ar.filter(function (item) {
            return item.parent_id === node.id
        });
        if(childrenData && childrenData.length>0){
            
            for(var i=0,j=childrenData.length;i<j;i++){
                var item = childrenData[i];
                var subNode = makeNode(item.id,[],opt.collapseLayer>=node.layer+1,null,null,null,null,node.layer+1,item.name);
                //把子节点加入到父亲的children
                node.children.push(subNode);
                //补充子节点的子节点(递归)
                buildSubTreeOf(ar,subNode);
            }
        }
    }
    //构造根节点
    var root = makeNode(-1,[],opt.collapseLayer>=1,null,null,null,null,1,subjectName);
    
    //构造子节点
    buildSubTreeOf(ar,root);
    
    return root;
};
module.exports={
    makeNode:makeNode,
    translateArrayToTree:translateArrayToTree
};
