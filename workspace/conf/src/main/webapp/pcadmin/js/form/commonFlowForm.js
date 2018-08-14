//初始化视图
function initForm(node_id,form_id){
	//获取表单信息
	$.myPlugin.publicForm("form"+node_id+form_id,form_id);
}
//初始化表单按钮
function initFormBtn(form_id,flow_id,node_id,type,form_type){
	matchFormData(form_id,flow_id,node_id);//获取数据并匹配
	//console.log("type5555    "+type);
	console.log(type);
	if(type == "read"){
		//只读
		$("#commonForm"+form_id+" input").each(function(){
			$(this).attr("disabled","disabled");
		});
		$("#commonForm"+form_id+" select").each(function(){
			$(this).attr("disabled","disabled");
		})
		addFormBtn("cancel");
	}else if(type == "edit"){
		//编辑
		addFormBtn("edit");
	}
}
//增加表单按钮
function addFormBtn(btn){
	//按钮外边框
	var btnHtml = '<div style="width:100%;height:50px;position:absolute;bottom:0;left:0;background-color:white;">';
	if(btn == "edit"){
		//编辑状态加保存按钮
		btnHtml += '<button style="position:absolute;bottom:10px;right:160px" type="button" class="btn btn-primary" onclick="saveForm()">'
			+'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 确定</button>';
	}
	//通用取消按钮
	btnHtml += '<button style="position:absolute;bottom:10px;right:65px" type="button" class="btn btn-primary" onclick="closeForm()">'
		+'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 取消</button>';
	//结束
	btnHtml += '</div>';
	//console.log($("#form"+node_id+form_id).parent());
	$("#form"+node_id+form_id).parent().after(btnHtml);
}
//取消关闭
function closeForm(){
	layer.closeAll();
}
//确定保存
function saveForm(){
	var data = JSON.stringify($("#commonForm"+form_id).serializeObject());
	$.myPlugin.judgementDialog({
		title: "提示",
		context: "是否确定保存？",
		height: "120px",
		btnFn:{
			btn1Fn: function(index,layero){
				$.ajax({
					url: contextPath + "/form/saveFormData.do",
					data: {"form_id":form_id,"jsonData":data},
					type: "post",
					dataType: "json",
					async: false,
					success: function(data) {
						if(data.success){
							layer.closeAll();
							$.myPlugin.prompt({title: "提示",context: data.msg,tipType: "success"});
						}else{
							$.myPlugin.prompt({title: "提示",context: data.msg,tipType: "error"});
						}
					}
				});
				layer.close(index)
			}
		}
	});
}
//获取数据并匹配
function matchFormData(form_id,flow_id,node_id){
	$.ajax({
		url: contextPath + "/form/getFlowFormData.do",
		data: {
			"form_id": form_id,
			"flow_id":flow_id,
			"node_id":node_id
		},
		type: "post",
		dataType: "json",
		async: false,
		success: function(data) {
			//console.log("-----");
			//console.log(data.data)
			if(data.data == "" || data.data == null || data.data == "null"){
				//console.log("meiyou shuu");
				$("#form"+node_id+form_id+" #commonForm"+form_id).find("#FLOW_ID").val(flow_id);
				$("#form"+node_id+form_id+" #commonForm"+form_id).find("#NODE_ID").val(node_id);
			}else{
				//console.log("pipeishuju");
				var data = JSON.parse(data.data);
				$("#form"+node_id+form_id+" #commonForm"+form_id).form("setData",data);
				
				if(data.PIC_url != null && data.PIC_url != "" && data.PIC_url !=undefined){
					var urlArr = data.PIC_url.split(",");
					var inpIdArr = data.PIC.split(",");
					$("#upload_list").html("");
					for(var i = 0; i < urlArr.length; i++){
						//$("#upload_list").append('<div class="imgItem" id="" ><img src= '+ '/'+urlArr[i] + ' alt="" class="layui-upload-img upload_img"> <div class="img_sts_bg"></div><i class="layui-icon img_sts_icon" id="img_sts_icon">&#xe605;</i></div>');
						$("#upload_list").append('<div class="imgItem" id=""><img src='+ '/'+urlArr[i] + ' alt="" class="layui-upload-img upload_img"><div class="img_sts_bg"></div><div class="imgDelete"><i class="layui-icon img_delete_icon" isHaveUpLoadFile=false hiddeninp="PIC" isupload="true" index="" inpid="'+inpIdArr[i]+'" onclick="$.myPlugin.delete_img(this);"></i></div><i class="layui-icon img_sts_icon" id="img_sts_icon"></i></div>')
					}
				}
				
			}
		}
	});
}
//初始化函数
function initPage(form_id,flow_id,node_id,type){
	initForm(node_id,form_id);
	initFormBtn(form_id,flow_id,node_id,type);
}
