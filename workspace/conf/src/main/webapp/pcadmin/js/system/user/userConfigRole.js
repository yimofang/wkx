$(document).ready(function() {
	getAllRoleInfo();
	$("#userId").val(userId);
});

function getAllRoleInfo(){//获取全部角色
	$.ajax({
		url:contextPath+"/system/role/getAllRoleList.do",
		type:"post",
		dataType:"json",
		data:{'userId':userId},
		success:function(data){
			var obj = eval(data);
			var data = obj.data;
            $('#roleList').treeview({
                data: data,					//数据源
                showCheckbox: true,			//是否显示复选框
                highlightSelected: true,	//是否高亮选中
                levels: 1,					//设置继承树默认展开的级别
//              nodeIcon: '',				//设置所有列表树节点上的默认图标
//              showIcon: '',				//是否显示节点图标
//              emptyIcon: '',				//没有子节点的节点图标
//              selectedBackColor: '',		//设置被选择节点的背景颜色
//              showBorder: false,				//是否在节点上显示边框
//              borderColor: '',			//设置列表树容器的边框颜色，如果不想要边框可以设置showBorder属性为false
                multiSelect: false			//是否可以同时选择多个节点
            });
		},
		error:function(error){
			alert("树形结构加载失败！");
		}
	});
}

function submitUserRoleConfig(){//提交用户角色
	var node = $('#roleList').treeview(true).getChecked();
	var datas = {
		"userId":userId,
		"node":node
	}
	$.ajax({
		url:contextPath+"/system/role/insertUserRoleList.do",
		type:"post",
		dataType:"json",
		data:datas,
		success:function(data){
			var dat = eval(data);
			var result = dat.data;
			if(dat.success == true){
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:result.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:result.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){
			
		}
	});
}

function closeDialog(){
	layer.closeAll();
}











