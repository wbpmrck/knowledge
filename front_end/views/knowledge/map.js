
var G6 = require("g6");
var G6Helper = require("g6-helper");
exports.init=function (knowledges) {
    console.log("knowledges="+JSON.stringify(knowledges));
    var nodes = G6Helper.translateArrayToTree("web前端",knowledges);
    var tree = new G6.Tree({
        id: 'map',
        height: 450,
        fitView: 'autoSize',
        behaviourFilter: ['wheelZoom', 'dragBlank', 'dragCanvas']
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