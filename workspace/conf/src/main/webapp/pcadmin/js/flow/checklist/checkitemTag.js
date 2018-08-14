//@ sourceURL=checkitemTag.js
/**
 * 清单检查项添加、修改、查看详情页
 */
function getcheckitemInfo() {//获取检查项信息
	if(checkitemId != null) {
		$.ajax({
			url:contextPath+"/flow/checklist/getCheckItemById.do",
			type:"post",
			dataType:"json",
			data:{"id":checkitemId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
					$("#checkitemInfo #id").val(obj.id);				//检查项id
					$("#checkitemInfo #itemname").val(obj.itemname);				//检查项名称
					$("#checkitemInfo #itemcontent").val(obj.itemcontent);	//检查项描述		
				}
			},
			error:function(error){}
		});
	}
	if(ckparentId!= null){
		$("#checkitemInfo #pitemid").val(ckparentId);	
	}
	else{
		$("#checkitemInfo #pitemid").val(0);
	}
}

function updatecheckitem(){//添加、修改隐患检查项
	var itname = $("#checkitemInfo #itemname").val();//检查项名称
	if (itname.length == 0) {
		id = "#itname"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('检查项不能为空', id);
		})
		return;
	}
	
	if(checkitemId == null){//添加隐患检查项
		$.ajax({
			url:contextPath+"/flow/checklist/addCheckItem.do",
			type:"post",
			dataType:"json",
			data:$("#checkitemInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#checkitemList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}else{//修改隐患检查项
		$.ajax({
			url:contextPath+"/flow/checklist/updateCheckItem.do",
			type:"post",
			dataType:"json",
			data:$("#checkitemInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$('#checkitemList').bootstrapTable('updateRow', {index: index, row: result});
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

function isNull(val,id){
	if (val == "") {
		id = "#"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}

$(document).ready(function() {

	getcheckitemInfo();
});
function closeDialog(){
	layer.closeAll();
}