$(document).ready(function() {
	getParEnterPriseList();
});
//查询上机企业下拉选
function getParEnterPriseList(){
	$.ajax({
		url:contextPath+"/system/enterPrise/getParEnterPriseList.do",
		type:"post",
		dataType:"json",
		success:function(data){
			var dat = eval(data);
			var list = dat.data;
			var str = '';
			for (var i = 0; i < list.length; i++) {
				var name = list[i].ename;
				var id = list[i].id;
				str += '<option value="'+id+'">'+name+'</option>';
			}
			$("#pEnterPrise").append(str);
		},
		error:function(error){}
	});
}

function updateEnterprise(){//添加企业
	var ename = $("#enterpriseInfo #ename").val();//企业名称
	var loginCode = $("#loginCode").val();//登录名
	if (ename.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('企业名称不能为空', "#enterpriseInfo #ename");
		})
		return;
	}
	if (loginCode.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('登录名不能为空', "#enterpriseInfo #loginCode");
		})
		return;
	}
	$.ajax({
		url:contextPath+"/system/enterPrise/addEnterPrise.do",
		type:"post",
		dataType:"json",
		data:$("#enterpriseInfo").serialize(),
		success:function(data){
			var dat = eval(data);
			if(dat.success == true){
				layer.closeAll();
				$("#enterpriseList").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){}
	});
}

function closeDialog(){
	layer.closeAll();
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