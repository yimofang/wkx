$(document).ready(function() {
	getRoleManagementInfo();
});

function getRoleManagementInfo() {//获取角色信息
	if(roleId != null) {
		$.ajax({
			url:contextPath+"/system/role/getRoleById.do",
			type:"post",
			dataType:"json",
			data:{"id":roleId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
					console.log(data.data);
//					$("#roleManagementInfo").form("setData",obj);
					$("#roleManageInfo #name").val(obj.name);			//角色名称
					$("#roleManageInfo #remark").val(obj.remark);		//备注
					$("#roleManageInfo #departid").val(obj.departid);	//所属部门ID
					$("#roleManageInfo #orgName").val(obj.orgName);		//部门名称(用作显示)
					$("#roleManageInfo #pid").val(obj.pid);				//上级角色ID
					$("#roleManageInfo #pName").val(obj.pName);			//角色名称(用作显示)
					
					$("#roleManageInfo #id").val(obj.id);				//角色id
					$("#roleManageInfo #flag").val(obj.flag);			//角色状态
				}
			},
			error:function(error){
				
			}
		});
	}
}

function updateRoleManage(){//添加、修改角色
    var name = $("#roleManageInfo #name").val();			//角色名称
    var pName = $("#roleManageInfo #pName").val();			//上级角色
    var orgName = $("#roleManageInfo #orgName").val();		//所属部门
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('角色名称不能为空', "#roleManageInfo #name");
		})
		return;
	}
	if (pName.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('上级角色不能为空', "#roleManageInfo #pName");
		})
		return;
	}
	if (orgName.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('所属部门不能为空', "#roleManageInfo #orgName");
		})
		return;
	}
	if(roleId == null){//添加角色
		$.ajax({
			url:contextPath+"/system/role/addRole.do",
			type:"post",
			dataType:"json",
			data:$("#roleManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#roleManageList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){
				
			}
		});
	}else{//修改角色
		$.ajax({
			url:contextPath+"/system/role/updateRole.do",
			type:"post",
			dataType:"json",
			data:$("#roleManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$('#roleManageList').bootstrapTable('updateRow', {index: index, row: result});
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

}

function isNull(val,id){
	if (val == "") {
		id = "#"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}

function getOrganId(){//获得所属部门
	$.ajax({
		url:contextPath+"/system/organization/getOrgTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getOrganTree(data.data);
		},
		error:function(error){}
	});
}

function getOrganTree(data){//所属部门下拉树
	$.myPlugin.newDownTree({
		treeId:"#roleManageInfo #organTree",//下拉树要放置的div的Id
		tagWrapId:"#roleManageTag",			//取消下拉树的点击范围
		inpId:"#departid",					//input的id
		text:'text',						//列表显示类型
		data:data,							//首传参数
		id:'orgId',							//查询的参数
		result:'data',						//返回参数
		href:contextPath+'/system/organization/getOrgTree.do',
		nodeSelected:function(event,node){
			$("#departid").val(node.orgId);
			$("#orgName").val(node.text);
			$("#organTree").hide();
		}
	});
}

function getRoleId(){//获得角色列表
	$.ajax({
		url:contextPath+"/system/role/getParRoleTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getRoleTree(data.data);
		},
		error:function(error){}
	});
}

function getRoleTree(data){//获得角色下拉树
	$.myPlugin.newDownTree({
		treeId:"#roleManageInfo #roleTree",	//下拉树要放置的div的Id
		tagWrapId:"#roleManageTag",			//取消下拉树的点击范围
		inpId:"#pid",						//input的id
		text:'text',						//列表显示类型
		data:data,							//首传参数
		id:'roleId',						//查询的参数
		result:'data',						//返回参数
		href:contextPath+'/system/role/getParRoleTree.do',
		nodeSelected:function(event,node){
			$("#pid").val(node.roleId);
			$("#pName").val(node.text);
			$("#roleTree").hide();
		}
	});
}

function cleanInput(id){
	$("#"+id).val("");
}

function closeDialog(){
	layer.closeAll();
}