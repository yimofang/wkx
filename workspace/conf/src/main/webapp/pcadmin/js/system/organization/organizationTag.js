$(document).ready(function() {
	getGradeLevelByDict();
	getTypeByDict();
});

function getOrganizationInfo() {//获取组织机构信息
	if(organizationId != null) {
		$.ajax({
			url:contextPath+"/system/organization/getOrganizationById.do",
			type:"post",
			dataType:"json",
			data:{"id":organizationId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
//					$("#organizationInfo").form("setData",obj);
					$("#organizationInfo #name").val(obj.name);				//部门名称
					$("#organizationInfo #pid").val(obj.pid);				//上级部门ID
					$("#organizationInfo #pidName").val(obj.pName);			//上级部门(用作显示)
					$("#organizationInfo #type").val(obj.type);				//组织结构类型
					$("#organizationInfo #gradelevel").val(obj.gradelevel);	//部门级别
					$("#organizationInfo #deptdes").val(obj.deptdes);		//部门描述
					
					$("#organizationInfo #id").val(obj.id);					//部门id
					$("#organizationInfo #flag").val(obj.flag);				//部门状态
				}
			},
			error:function(error){}
		});
	}
}

function getGradeLevelByDict(){//从字典获取组织机构级别
		$.ajax({
			url:contextPath+"/dict/getDictByType.do",
			type:"post",
			dataType:"json",
			data:{"type":"JGJB"},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
					setGradeLevel(obj);
				}
			},
			error:function(error){}
		});
}

function setGradeLevel(obj){//将组织机构级别注入页面
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#gradelevel").append(html);
	}
}

function getTypeByDict(){//从字典获取组织机构类型
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"JGLX"},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setType(obj);
			}
		},
		error:function(error){}
	});
}

function setType(obj){//将组织机构类型注入页面
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#type").append(html);
	}
	getOrganizationInfo();
}

function updateOrganization(){//添加、修改组织机构
	var name = $("#organizationInfo #name").val();		//机构名称
	var pidName = $("#organizationInfo #pidName").val();//上级机构
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('部门名称不能为空', "#organizationInfo #name");
		})
		return;
	}
	if (pidName.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('上级机构不能为空', "#organizationInfo #pidName");
		})
		return;
	}
	if(organizationId == null){//添加组织机构
		$.ajax({
			url:contextPath+"/system/organization/addOrganization.do",
			type:"post",
			dataType:"json",
			data:$("#organizationInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#organizationList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}else{//修改组织机构
		$.ajax({
			url:contextPath+"/system/organization/updateOrganization.do",
			type:"post",
			dataType:"json",
			data:$("#organizationInfo").serialize(),
			success:function(data){
				if(data.success == true){
					layer.closeAll();
					$("#organizationList").bootstrapTable('refresh');
//					$('#organizationList').bootstrapTable('updateRow', {index: index, row: result});
					$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
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

function getOrganId(){//获得部门列表
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

function getOrganTree(data){//上级机构下拉树
	$.myPlugin.newDownTree({
		treeId:"#organizationInfo #organTree",	//下拉树要放置的div的Id
		tagWrapId:"#organizationTag",			//取消下拉树的点击范围
		inpId:"#pid",			//input的id
		text:'text',			//列表显示类型
		data:data,				//首传参数
		id:'orgId',				//查询的参数
		result:'data',			//返回参数
		href:contextPath+'/system/organization/getOrgTree.do',
		nodeSelected:function(event,node){
			$("#pid").val(node.orgId);
			$("#pidName").val(node.text);
			$("#organTree").hide();
		}
	});
}

function cleanInput(id){
	$("#"+id).val("");
}

function closeDialog(){
	layer.closeAll();
}