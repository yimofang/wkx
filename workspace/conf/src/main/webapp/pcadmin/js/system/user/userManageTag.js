$(document).ready(function() {
	getUserSexByDict();
});

function getUserInfo() {//获取用户信息
	if(userId != null) {
		$.ajax({
			url:contextPath+"/system/user/getUserById.do",
			type:"post",
			dataType:"json",
			data:{"userId":userId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
//					$("#organizationInfo").form("setData",obj);	
					$("#userManageInfo #logincode").val(obj.logincode);			//登录名称
					$("#userManageInfo #name").val(obj.name);					//用户名称
					$("#userManageInfo #tel").val(obj.tel);						//固定电话
					$("#userManageInfo #email").val(obj.email);					//电子邮箱
					$("#userManageInfo #password").val(obj.password);			//登录密码
					$("#userManageInfo #password1").val(obj.password);
					$("#userManageInfo #remark").val(obj.remark);				//个人说明
					$("#userManageInfo #sex").val(obj.sex);						//性别
					$("#userManageInfo #depName").attr("disabled",true);		//所属部门disabled
					$("#userManageInfo #departmentid").remove();				//移除隐藏域departmentid
					$("#userManageInfo #depName").val(obj.orgName);				//所属部门(用作显示)
					
					$("#userManageInfo #id").val(obj.id);						//用户id
					$("#userManageInfo #flag").val(obj.flag);					//用户状态
				}
			},
			error:function(error){}
		});
	}
}

function getUserSexByDict(){//从字典获取用户性别
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"YHXB"},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setUserSex(obj);
			}
		},
		error:function(error){}
	});
}

function setUserSex(obj){//将用户性别注入页面
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#sex").append(html);
	}
	getUserInfo();
}
function checkRequired(){//检查必填项
    var name = $("#userManageInfo #name").val();				//用户名称
    var depName = $("#userManageInfo #depName").val();			//所属部门
    var logincode = $("#userManageInfo #logincode").val();		//登录名
    var password = $("#userManageInfo #password").val();		//密码
    var password1 = $("#userManageInfo #password1").val();		//确认密码
    var email = $("#userManageInfo #email").val();				//邮箱	
    var tel = $("#userManageInfo #tel").val();					//联系电话	
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('用户名不能为空', "#userManageInfo #name");
		})
		return false;
	}
	if(userId == null){
		if (depName.length == 0) {
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				layer.tips('所属部门不能为空', "#userManageInfo #depName");
			})
			return false;
		}
	}
	if (logincode.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('登录名不能为空', "#userManageInfo #logincode");
		})
		return false;
	}
	if(password.length == 0){
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('密码不能为空', "#userManageInfo #password");
		})
		return false;
	}else{
			var reg = /^.{6,18}$/;
			if (!reg.exec(password)){
				layui.use('layer', function() {
					var $ = layui.jquery,layer = layui.layer;
					layer.tips('密码不能少于6位', "#userManageInfo #password");
				})
				return false;
			}
		}
	if(password1.length == 0){
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('确认密码不能为空', "#userManageInfo #password1");
		})
		return false;
	}else{
		if(password1 != password){
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				parent.layer.tips('两次输入不一致', "#userManageInfo #password1");
			})
			return false;
		}
	}

	if(email.length != 0){
		var reg = /^\w+([-+._]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (!reg.exec(email)){
				layui.use('layer', function() {
					var $ = layui.jquery,layer = layui.layer;
					layer.tips('邮箱格式不正确', "#userManageInfo #email");
				})
				return false;
		}
	}
	if (tel.length != 0){
		var reg = /^((\d{3,4}-\d{7,8})|(\d{7,8})|(1[0-9]\d{9}))$/;
		if (!reg.exec(tel)){
				layui.use('layer', function() {
					var $ = layui.jquery,layer = layui.layer;
					layer.tips('号码有误,请重新输入', "#userManageInfo #tel");
				})
				return false;
		}
	}
	return true;
}

function updateUserManage(){//添加、修改用户
	if(checkRequired()){//检查必填项
		if(userId == null){//添加用户
			$.ajax({
				url:contextPath+"/system/user/addUserManage.do",
				type:"post",
				dataType:"json",
				data:$("#userManageInfo").serialize(),
				success:function(data){
					var dat = eval(data);
					if(dat.success == true){
						layer.closeAll();
						$("#userList").bootstrapTable('refresh');
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
					}else{
						layer.closeAll();
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
					}
				},
				error:function(error){}
			});
		}else{//修改用户
			$.ajax({
				url:contextPath+"/system/user/updateUser.do",
				type:"post",
				dataType:"json",
				data:$("#userManageInfo").serialize(),
				success:function(data){
					var dat = eval(data);
					var result = dat.data;
					if(dat.success == true){
						layer.closeAll();
						$('#userList').bootstrapTable('updateRow', {index: index, row: result});
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
					}else{
						layer.closeAll();
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
					}
				},
				error:function(error){}
			});
		}
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

function getOrganTree(data){//所属部门下拉树
	$.myPlugin.newDownTree({
		treeId:"#userManageInfo #organTree",	//下拉树要放置的div的Id
		tagWrapId:"#userManageTag",				//取消下拉树的点击范围
		inpId:"#userManageInfo #depName",		//input的id
		text:'text',							//列表显示类型
		data:data,								//首传参数
		id:'orgId',								//查询的参数
		result:'data',							//返回参数
		href:contextPath+'/system/organization/getOrgTree.do',
		nodeSelected:function(event,node){
			$("#userManageInfo #departmentid").val(node.orgId);
			$("#userManageInfo #depName").val(node.text);
			$("#userManageInfo #organTree").hide();
		}
	});
}

function cleanInput(id){//禁止键盘输入
	$("#"+id).val("");
}

function closeDialog(){
	layer.closeAll();
}