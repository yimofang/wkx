//初始化视图
function initItem(form_id,columnname){
	//获取表单信息
	//getOrganId(form_id);
}
function getOrganId(form_id){//获得部门列表
	$.ajax({
		url:contextPath+"/system/organization/getOrgTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getOrganTree(data.data,form_id);
		},
		error:function(error){}
	});
}
function getOrganTree(data){//上级机构下拉树
	$.myPlugin.newDownTree({
		treeId:"#organTree",	//下拉树要放置的div的Id
		tagWrapId:"#"+form_id,			//取消下拉树的点击范围
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