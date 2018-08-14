$(document).ready(function() {
	getAllMenuFuncInfo();
});

function getAllMenuFuncInfo(){//获取所有菜单和功能配置(菜单绑定的功能)
	$.ajax({
		url:contextPath+"/system/menu/getRoleFunctionList.do",
		type:"post",
		dataType:"json",
		data:{'ruleId':roleId},
		success:function(data){
			var obj = eval(data);
			var dat = obj.data;
			console.info(dat.menu);
            $('#roleMenuFunctionList').treeview({
                data: dat.menu,					//数据源
                showCheckbox: true,			//是否显示复选框
                highlightSelected: true,	//是否高亮选中
                levels: 1,					//设置继承树默认展开的级别
//              nodeIcon: '',				//设置所有列表树节点上的默认图标
//              showIcon: '',				//是否显示节点图标
//              emptyIcon: '',				//没有子节点的节点图标
//              selectedBackColor: '',		//设置被选择节点的背景颜色
//              showBorder: false,				//是否在节点上显示边框
//              borderColor: '',			//设置列表树容器的边框颜色，如果不想要边框可以设置showBorder属性为false
                multiSelect: false,			//是否可以同时选择多个节点
                onNodeChecked: function (event,node) {//一个节点被checked
                    checkAllParent(node);//选中所有父
                    checkAllSon(node);//选中所有子
                },
                onNodeUnchecked: function (event,node) {//一个节点被unchecked
                	uncheckAllSon(node);
                },
                onNodeSelected: function (event,node) {//一个节点被选择
                    if(node.state.expanded){
                    	$('#roleMenuFunctionList').treeview('collapseNode',node.nodeId);
                    }else{
                    	$('#roleMenuFunctionList').treeview('expandNode',node.nodeId);
                    }
                }
            });
        },
		error:function(error){
			alert("树形结构加载失败！");
		}
	});
}

function checkAllParent(node){//选中所有父
    $('#roleMenuFunctionList').treeview('checkNode',[node.nodeId,{silent:true}]);//选择指定的节点
    var parentNode = $('#roleMenuFunctionList').treeview('getParent',node.nodeId);//返回checked节点的父节点
    if(!("nodeId" in parentNode)){
        return;
    }else{
        checkAllParent(parentNode);
    }
}
function checkAllSon(node){//选中所有子
    $('#roleMenuFunctionList').treeview('checkNode',[node.nodeId,{silent:true}]);//选择指定的节点
    if(node.nodes!=null&&node.nodes.length>0){
        for(var i in node.nodes){
            checkAllSon(node.nodes[i]);
        }
    }
}
function uncheckAllSon(node){//取消所有子
    $('#roleMenuFunctionList').treeview('uncheckNode',[node.nodeId,{silent:true}]);//取消指定的节点
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i]);  
        }  
    }  
}

function submitRoleConfig(){//提交角色配置
	var node = $('#roleMenuFunctionList').treeview(true).getChecked();
	for(var i = 0 ; i<node.length;i++){
		node[i].nodes = null;
	}
	var datas = {
		"ruleId":roleId,
		"nodes":node
	}
	$.ajax({
		url:contextPath+"/system/menu/insertRuleMenuFunction.do",
		type:"post",
		dataType:"json",
		data:datas,
		success:function(data){
			var dat = eval(data);
			var result = dat.data;
			if(dat.success == true){
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){
			
		}
	});

}

function closeDialog(){
	layer.closeAll();
}





