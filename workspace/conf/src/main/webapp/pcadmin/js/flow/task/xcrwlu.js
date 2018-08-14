//@ sourceURL=xcrwlu.js
//初始化视图
function initPage(btn,typeStyle,node_id){
	initComment(node_id);
	initButton(btn,typeStyle,node_id);
	if(node_id == flow.cur_node_id){
		//调用父窗口方法
		addBtnSaveFunc(saveComment);
	}
}
//审核信息
function initComment(node_id){
	$.ajax({
		url:contextPath+"/flow/getFlowNodeComment.do",
		data:{"node_id":node_id},
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.success){
				console.log(data.data);
				if(data.data == null || data.data == ""){
					$("#node"+node_id+ " #formNodeComment #node_id").val(node_id);
				}else{
					$("#node"+node_id+ " #formNodeComment").form("setData",data.data);
				}
			}
		}
	})
}
function saveComment(){
	if($("#node"+flow.cur_node_id+ " #formNodeComment #comment_info").val().length > 500){
		$.myPlugin.prompt({				
			context: "意见字数不能超过500个字符",
			tipType: "notice"
		});
		return ;
	}
	$.ajax({
		url:contextPath+"/flow/saveFlowNodeComment.do",
		data:$("#node"+flow.cur_node_id+ " #formNodeComment").serializeObject(),
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.success == true){
				initComment(flow.cur_node_id);
			}
			$.myPlugin.prompt(data);
		}
	})
}
//初始化按钮
function initButton(btn,typeStyle,node_id){
	if(btn != null && btn != "null"){
		$.each($.parseJSON(btn),function (index,data){
			var btnHtml = '<a class="btn dribbble-btn dribbble-btn-primary dri-animate-vertical hidden-xs"';
			if(typeStyle == "disable"){
				btnHtml += 'disabled = "disabled;"';
			}else{
				var n_id = node_id;
				if(data.form_type == "FLOW"){
					n_id = -1;
				}
				btnHtml += 'onclick="onClickXcrwZDForm(\''+data.text+'\',\''+typeStyle+'\','+n_id+','+flow.id+')"';
			}
			btnHtml += '><span class="fa fa-plus"></span>' + data.text + '</a>';
			$("#node"+node_id+" #btn_tool").append(btnHtml);
		});
	}else{
		$("#node"+node_id+" #comment").removeClass("col-lg-10").addClass("col-lg-12");
		$("#node"+node_id+" #btn_tool").hide();
	}
	if(typeStyle == "disable" || typeStyle == "read"){
		console.log($("#node"+node_id+ " #formNodeComment #comment_info"));
		$("#node"+node_id+ " #formNodeComment #comment_info").attr("disabled","disabled");
	}
}
function onClickXcrwZDForm(title,typea,node_id,flow_id){
		$.myPlugin.modelDialog({
			context:contextPath+'/page/task/taskInsert.jsp',
			data:{node_id:node_id,flow_id:flow_id,type:typea},
			title:title,
			width:'1200px',
			height:'800px',
			offset:'80px',
			resize:false});
}
