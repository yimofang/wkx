//首页-个人中心-修改密码
$(document).ready(function() {

});

  

function isNull(val,id){
	if (val == "") {
		id = "#"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}

function updatePassWord(){
    var oldPwd = document.getElementById('oldPwd').value.trim();
    var newPwd = document.getElementById('newPwd').value.trim();
    var newPwd1 = document.getElementById('newPwd1').value.trim();
	if (oldPwd.length == 0) {
		id = "#oldPwd"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('原密码不能为空', id);
		})
		return;
	}
	if(newPwd.length == 0){
		id = "#newPwd"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('新密码不能为空', id);
		})
		return;
	}else{
			var reg = /^.{6,18}$/;
			if (!reg.exec(newPwd)){
				id = "#newPwd"
				layui.use('layer', function() {
					var $ = layui.jquery,layer = layui.layer;
					layer.tips('密码不能少于6位', id);
				})
				return;
			}else{
				if(newPwd == oldPwd){
					id = "#newPwd"
					layui.use('layer', function() {
						var $ = layui.jquery,layer = layui.layer;
						parent.layer.tips('不能与原密码相同', id);
						})
						return;
				}
			}
		}		
	if(newPwd1.length == 0){
		id = "#newPwd1"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('确认密码不能为空', id);
		})
		return;
	}else{
		if(newPwd1 != newPwd){
			id = "#newPwd1"
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				parent.layer.tips('两次输入不一致', id);
			})
			return;
		}
	}	
	$.ajax({
		url:contextPath+"/system/user/changePwd.do",
		type:"post",
		dataType:"json",
		data:$("#userPassWord").serialize(),
		success:function(data){
			var dat = eval(data);
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
