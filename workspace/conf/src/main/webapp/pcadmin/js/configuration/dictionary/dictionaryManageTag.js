$(document).ready(function() {
getMainType();//获得主类型列表
buttonControl();//按钮控制
setInputID();//给input id赋值
getDictInfo();//获取字典信息
});

function getDictInfo() {//获取字典信息
	if(dictType != 'null') {
		$.ajax({
			url:contextPath+"/dict/getUpdateDictMsg.do",
			type:"post",
			dataType:"json",
			data:{"type":dictType},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
//					$("#dictManageInfo").form("setData",obj);
					console.log(data);
					console.log(data.data);
					
//					$("#dictManageInfo #id").val(obj.type);							
				}
			},
			error:function(error){}
		});
	}
}

function getMainType(){//获得主类型列表
	$.ajax({
		url:contextPath+"/dict/getDictMainType.do",
		type:"post",
		dataType:"json",
		success:function(data){
			setMainType(data.data);
		},
		error:function(error){}
	});
}

function setMainType(obj){//将主类型注入页面
	var html = '<option id="maindefault" value="-1">请选择主类型</option>';
	for(var i=0;i<obj.length;i++){
		html += '<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
	}
	$("#maintype").append(html);
}

function mainTypeFunc(){//主类型改变时调用
	var id = $("#maintype  option:selected").val();
	$("#subtype option").remove();
	if(id != -1){
		getSubType(id);
	}
}

function getSubType(id){//获得子类型列表
	$.ajax({
		url:contextPath+"/dict/getDictSubType.do",
		type:"post",
		dataType:"json",
		data:{"pid":id},
		success:function(data){
			setSubType(data.data);
		},
		error:function(error){}
	});
}

function setSubType(obj){//将子类型注入页面
	var html = '<option id="subdefault" value="-1">请选择子类型</option>';
	for(var i=0;i<obj.length;i++){
		html += '<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
	}
	$("#subtype").append(html);
}

//function subTypeFunc(){//子类型改变时调用
//	var id = $("#subtype  option:selected").val();
//}

function buttonControl(){//按钮控制
	var quantity = $("#dictOptions div>input").length;//获取数量
	var html = '';
	var html2 = '';
	var html3 = '';
	if(quantity == 1){
		$("#dictOptions input:first").nextAll().remove();
		html = '<button type="button" id="add" class="btn btn-default" onclick="addOptions(this.id)"><span class="glyphicon glyphicon-plus"></span></button>';
		$("#dictOptions input:first").parent().append(html);
	}else if(quantity == 2){
		$("#dictOptions input:first").nextAll().remove();
		$("#dictOptions input:last").nextAll().remove();
		html = '<button type="button" id="del1" class="btn btn-default" onclick="delOptions(this.id)"><span class="glyphicon glyphicon-minus"></span></button>';
		html2 = '<button type="button" id="del2" class="btn btn-default" onclick="delOptions(this.id)"><span class="glyphicon glyphicon-minus"></span></button>';
		html2 += '<button type="button" id="up1" class="btn btn-default" onclick="upOptions(this.id)"><span class="glyphicon glyphicon-arrow-up"></span></button>';
		html2 += '<button type="button" id="add" class="btn btn-default" onclick="addOptions(this.id)"><span class="glyphicon glyphicon-plus"></span></button>';
		$("#dictOptions input:first").parent().append(html);
		$("#dictOptions input:last").parent().append(html2);
	}else if(quantity > 2){
		$("#dictOptions input:first").nextAll().remove();
		$("#dictOptions input:last").nextAll().remove();
		html = '<button type="button" id="del1" class="btn btn-default" onclick="delOptions(this.id)"><span class="glyphicon glyphicon-minus"></span></button>';
		$("#dictOptions input:first").parent().append(html);
		for(var i=2;i<quantity;i++){
			$('#dictOptions input').eq(i-1).nextAll().remove();
			html3 = '<button type="button" id="del'+i+'" class="btn btn-default" onclick="delOptions(this.id)"><span class="glyphicon glyphicon-minus"></span></button>';
			html3 += '<button type="button" id="up'+(i-1)+'" class="btn btn-default" onclick="upOptions(this.id)"><span class="glyphicon glyphicon-arrow-up"></span></button>';
			$('#dictOptions input').eq(i-1).parent().append(html3);
		}
		html2 = '<button type="button" id="del'+quantity+'" class="btn btn-default" onclick="delOptions(this.id)"><span class="glyphicon glyphicon-minus"></span></button>';
		html2 += '<button type="button" id="up'+(quantity-1)+'" class="btn btn-default" onclick="upOptions(this.id)"><span class="glyphicon glyphicon-arrow-up"></span></button>';
		html2 += '<button type="button" id="add" class="btn btn-default" onclick="addOptions(this.id)"><span class="glyphicon glyphicon-plus"></span></button>';
		$("#dictOptions input:last").parent().append(html2);
	}
}

function addOptions(id){//添加选项
	var quantity = $("#dictOptions div>input").length;//获取数量
	if(quantity<10){//数量控制
		var html = '<div class="layui-input-block">';
		html += '<input class="layui-input-inline form-control" type="text" name="key" placeholder="请输入KEY" onblur="isNull(this.value,this.id)">';
		html += '</div>';
		$("#dictOptions").append(html);
		setInputID();//给input id赋值
		buttonControl();//按钮控制
	}else{
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('已达上限', "#"+id);
		})
	}
}

function delOptions(id){//删除选项
	$("#"+id).parent().remove();
	buttonControl();//按钮控制
}

function upOptions(id){//上移选项
	var upval = $("#"+id).prevAll('input').val();//下面的input
	var downval = $("#"+id).parent().prev().children('input').val();//上面的input
	if(upval != ''){
		$("#"+id).prevAll('input').val(downval);
		$("#"+id).parent().prev().children('input').val(upval);
	}else{
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', "#dictOptions #"+id);
		})
	}
}

function setInputID(){//给input id赋值
	var quantity = $("#dictOptions div>input").length;//获取数量
	for(var i=0;i<quantity;i++){
		$('#dictOptions input').eq(i).attr("id",i+1);
	}
}

function checkRequired(){//检查必填项
	var name = $("#dictManageInfo #name").val();//字典名称
	var maintype = $("#maintype  option:selected").val();//主类型
	var subtype = $("#subtype  option:selected").val();//子类型
	var quantity = $("#dictOptions div>input").length;//获取选项数量
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('字典名称不能为空',"#dictManageInfo #name");
		})
		return false;
	}
	if (maintype == -1) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('请选择主类型',"#dictManageInfo #maintype");
		})
		return false;
	}
	if (subtype == -1) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('请选择子类型',"#dictManageInfo #subtype");
		})
		return false;
	}
	for(var i=0;i<quantity;i++){
		var val = $('#dictOptions input').eq(i).val();
		var id = $('#dictOptions input').eq(i).attr("id");
		if(val.length == 0){
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				layer.tips('选项不能为空', "#dictOptions #"+id);
			})
			return false;
		}
	}
	return true;
}

function updatedictManage(){//提交添加字典
	if(checkRequired()){//检查必填项
		if(dictType == null){//添加字典
			$.ajax({
				url:contextPath+"/dict/addDictList.do",
				type:"post",
				dataType:"json",
				data:$("#dictManageInfo").serialize(),
				success:function(data){
					var dat = eval(data);
					if(dat.success == true){
						layer.closeAll();
						$("#dictManageList").bootstrapTable('refresh');
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
					}else{
						layer.closeAll();
						$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
					}
				},
				error:function(error){}
			});
		}
//		}else{//修改字典
//		$.ajax({
//			url:contextPath+"/dict/updateDict.do",
//			type:"post",
//			dataType:"json",
//			data:$("#dictManageInfo").serialize(),
//			success:function(data){
//				var dat = eval(data);
//				var result = dat.data;
//				if(dat.success == true){
//					layer.closeAll();
//					$('#dictManageList').bootstrapTable('updateRow', {index: index, row: result});
//					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
//				}else{
//					layer.closeAll();
//					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
//				}
//			},
//			error:function(error){}
//		});
//	}
	}
}

function isNull(val,id){
	if (val == "") {
		id = "#dictManageInfo #"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}

function closeDialog(){
	layer.closeAll();
}