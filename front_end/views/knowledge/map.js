
var G6 = require("g6");
var G6Helper = require("g6-helper");
exports.init=function (subject,knowledges) {
    // console.log("knowledges="+JSON.stringify(knowledges));
    var nodes = G6Helper.translateArrayToTree(subject.name,knowledges);

    // 准备布局配置
    var layoutCfg = {
        "direction": "H"
    };
    layoutCfg.getHGap = function(d) {
        return 10;
    };
    layoutCfg.getVGap = function(d) {
        return 10;
    };
    
    
    var tree = new G6.Tree({
        id: 'map',
        layoutCfg:layoutCfg,           // 布局配置
        fitView: 'autoZoom', // 自动缩放
        showButton: true,
        forceFit: true,      // 宽度自适应
        height: 900,     // 画布高
        layoutFn: G6.Layout.CompactBoxTree
        // fitView: 'autoSize',
        // behaviourFilter: ['wheelZoom', 'dragBlank', 'dragCanvas']
    });
    tree.source(
        nodes
    //     {
    //     label: 'G6',
    //     children: [{
    //         label: '图类',
    //         children: [
    //             {
    //                 label: 'Graph'
    //             },
    //             {
    //                 label: 'Net'
    //             },
    //             {
    //                 label: 'Tree'
    //             },
    //             {
    //                 label: '……'
    //             }
    //         ]
    //     },
    //         {
    //             label: '基础类',
    //             isCollapsed: true,
    //             children: [
    //                 {
    //                     label: 'Canvas'
    //                 },
    //                 {
    //                     label: 'Handler'
    //                 },
    //                 {
    //                     label: 'Layout'
    //                 },
    //                 {
    //                     label: 'Global'
    //                 }
    //             ]
    //         },
    //         {
    //             label: '工具类',
    //             children: [
    //                 {
    //                     label: 'Matrix',
    //                     color: 'red'
    //                 },
    //                 {
    //                     label: 'Color'
    //                 },
    //                 {
    //                     label: 'Util',
    //                     size: 30
    //                 }
    //             ]
    //         }]
    // }
    );
    tree.edge().shape('smooth');
    tree.render();
    
    tree.on('itemclick', function(ev){
        // console.log("击中" + ev.item.get('model').id + "!");
        console.log(ev.item);
    });
    
}