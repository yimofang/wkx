$(document).ready(function() {
	getFunctionManageInfo();
});

function getFunctionManageInfo() {//获取功能信息
	if(funcId != null) {
		$.ajax({
			url:contextPath+"/system/function/getFunctionById.do",
			type:"post",
			dataType:"json",
			data:{"id":funcId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
//					$("#functionManageInfo").form("setData",obj);
					$("#functionManageInfo #name").val(obj.name);		//功能名称
					$("#functionManageInfo #code").val(obj.code);		//功能识别码
					$("#functionManageInfo #pid").val(obj.pid);			//父功能
					$("#functionManageInfo #pName").val(obj.pName);		//父功能名称(用作显示)
					
					$("#functionManageInfo #id").val(obj.id);			//功能id
					$("#functionManageInfo #flag").val(obj.flag);		//功能状态
				}
			},
			error:function(error){
				
			}
		});
	}
}

function updateFunctionManage(){//添加、修改功能
    var name = $("#functionManageInfo #name").val();//功能名称
    var code = $("#functionManageInfo #code").val();//功能识别码
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('功能名称不能为空', "#functionManageInfo #name");
		})
		return;
	}
	if (code.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('功能识别码不能为空', "#functionManageInfo #code");
		})
		return;
	}
	if(funcId == null){//添加功能
		$.ajax({
			url:contextPath+"/system/function/addFunction.do",
			type:"post",
			dataType:"json",
			data:$("#functionManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#functionManageList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){
				
			}
		});
	}else{//修改功能
		$.ajax({
			url:contextPath+"/system/function/updateFunction.do",
			type:"post",
			dataType:"json",
			data:$("#functionManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$("#functionManageList").bootstrapTable('refresh');
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

function getFunctionId(){//获得功能列表
	$.ajax({
		url:contextPath+"/system/function/getParentFunctions.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getFunctionTree(data.data);
		},
		error:function(error){}
	});
}

function getFunctionTree(data){//上级功能下拉树
	$.myPlugin.newDownTree({
		treeId:"#functionManageInfo #funcTree",	//下拉树要放置的div的Id
		tagWrapId:"#functionManageTag",			//取消下拉树的点击范围
		inpId:"#pid",							//input的id
		text:'text',							//列表显示类型
		data:data,								//首传参数
		id:'functionId',						//查询的参数
		result:'data',							//返回参数
		href:contextPath+'/system/function/getParentFunctions.do',
		nodeSelected:function(event,node){
			$("#pid").val(node.functionId);
			$("#pName").val(node.text);
			$("#funcTree").hide();
		}
	});
}

function cleanInput(id){
	$("#"+id).val("");
}

function closeDialog(){
	layer.closeAll();
}