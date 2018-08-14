//初始化视图
function initPage(){
	initComment(node_id);
	initButton(btn,typeStyle);
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
				$("#node"+node_id+ " #formNodeComment").form("setData",data.data);
			}
		}
	})
}
//初始化按钮
function initButton(btn,typeStyle){
	if(btn != null && btn != "null"){
		$.each($.parseJSON(btn),function (index,data){
			var btnHtml = '<a class="btn dribbble-btn dribbble-btn-primary dri-animate-vertical hidden-xs"';
			if(typeStyle == "DISABLE"){
				btnHtml += 'disabled = "disabled;"';
			}else{
				btnHtml += 'onclick="onClickyhshForm(\''+data.text+'\','+data.form_id+',\''+typeStyle+'\')"';
			}
			btnHtml += '><span class="fa fa-plus"></span>' + data.text + '</a>';
			$("#node"+node_id+" #btn_tool").append(btnHtml);
		});
	}else{
		$("#node"+node_id+" #comment").removeClass("col-lg-10").addClass("col-lg-12");
		$("#node"+node_id+" #btn_tool").hide();
	}
	if(typeStyle == "DISABLE"){
		$("#comment_info").attr("disabled","disabled")
	}
}
function onClickyhshForm(title,form_id,typea){
	$.myPlugin.modelDialog({
		context:contextPath+'/page/form/commonFlowForm.jsp',
		data:{form_id:form_id,node_id:node_id,flow_id:flow.id,type:typea},
		title:title,
		width:'700px',
		height:'600px',
		offset:'80px',
		resize:false}
	);
}
