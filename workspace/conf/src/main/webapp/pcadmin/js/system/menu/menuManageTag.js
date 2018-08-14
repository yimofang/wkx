$(document).ready(function() {
	getMenuManageInfo();
//	getMenuLevelByDict();
});

function getMenuManageInfo() {//获取菜单信息
	if(menuId != null) {
		$.ajax({
			url:contextPath+"/system/menu/getMenuById.do",
			type:"post",
			dataType:"json",
			data:{"id":menuId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
//					$("#functionManageInfo").form("setData",obj);
					$("#menuManageInfo #name").val(obj.name);					//菜单名称
					$("#menuManageInfo #url").val(obj.url);						//菜单地址
					$("#menuManageInfo #code").val(obj.code);					//菜单识别码
//					$("#menuManageInfo #menulevel").val(obj.menulevel);			//菜单等级
					$("#menuManageInfo #pid").val(obj.pid);						//上级菜单ID
					$("#menuManageInfo #pname").val(obj.pname);					//上级菜单(用作显示)
					
					$("#menuManageInfo #id").val(obj.id);						//菜单id
					$("#menuManageInfo #flag").val(obj.flag);					//菜单状态
				}
			},
			error:function(error){
				
			}
		});
	}
}

//function getMenuLevelByDict(){//从字典获取菜单等级
//	$.ajax({
//		url:contextPath+"/dict/getDictByType.do",
//		type:"post",
//		dataType:"json",
//		data:{"type":"CDDJ"},
//		success:function(data){
//			var dat = eval(data);
//			var obj = dat.data;
//			if(dat.success == true){
//				setMenuLevel(obj);
//			}
//		},
//		error:function(error){}
//	});
//}

//function setMenuLevel(obj){//将菜单等级注入页面
//	var html = '';
//	for(var i=0;i<obj.length;i++){
//		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
//		$("#menulevel").append(html);
//	}
//	getMenuManageInfo();
//}

function updateMenuManage(){//添加、修改菜单
    var name = $("#menuManageInfo #name").val();				//菜单名称
    var code = $("#menuManageInfo #code").val();				//菜单识别码
//    var menulevel = $("#menuManageInfo #menulevel").val();		//菜单等级
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('菜单名称不能为空', "#menuManageInfo #name");
		})
		return;
	}
	if (code.length == 0) {
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				layer.tips('菜单识别码不能为空', "#menuManageInfo #code");
			})
			return;
	}
//	if (menulevel.length == 0) {
//			layui.use('layer', function() {
//				var $ = layui.jquery,layer = layui.layer;
//				layer.tips('菜单等级不能为空', "#menuManageInfo #menulevel");
//			})
//			return;
//	}
	if(menuId == null){//添加菜单
		$.ajax({
			url:contextPath+"/system/menu/addMenu.do",
			type:"post",
			dataType:"json",
			data:$("#menuManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#menuManageList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){
				
			}
		});
	}else{//修改菜单
		$.ajax({
			url:contextPath+"/system/menu/updateMenu.do",
			type:"post",
			dataType:"json",
			data:$("#menuManageInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$("#menuManageList").bootstrapTable('refresh');
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

function getMenuId(){//获得菜单列表
	$.ajax({
		url:contextPath+"/system/menu/getMenuTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getMenuTree(data.data);
		},
		error:function(error){}
	});
}

function getMenuTree(data){//上级菜单下拉树
	$.myPlugin.newDownTree({
		treeId:"#menuManageInfo #menuTree",	//下拉树要放置的div的Id
		tagWrapId:"#menuManageTag",			//取消下拉树的点击范围
		inpId:"#pid",						//input的id
		text:'text',						//列表显示类型
		data:data,							//首传参数
		id:'menuId',						//查询的参数
		result:'data',						//返回参数
		href:contextPath+'/system/menu/getMenuTree.do',
		nodeSelected:function(event,node){
			$("#pid").val(node.menuId);
			$("#pname").val(node.text);
			$("#menuTree").hide();
		}
	});
}

function cleanInput(id){
	$("#"+id).val("");
}

function closeDialog(){
	layer.closeAll();
}