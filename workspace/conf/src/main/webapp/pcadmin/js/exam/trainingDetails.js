//首页-主菜单-培训考试-培训资料详情页
$(document).ready(function() {
	getTrainingInfo();
});
//获取信息注入页面
function getTrainingInfo() {
	if(organizationId != null) {
		$.ajax({
			url:contextPath+"/exam/training/getTrainingInfo.do",
			type:"post",
			dataType:"json",
			data:{"id":organizationId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				$("#datatitle").html(obj.datatitle);		
				$("#content").html(obj.content);
				if(obj.ifvideo===1){
					$("#vides").show();
					var url='/files/upload/videos/video/';
					$("#vides video").attr("src",url+obj.address);
				}
				setTrainingNode(dat.data2);
			},
			error:function(error){}
		});
	}
}
//子资料注入页面
function setTrainingNode(obj){
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<DIV> 资料标题:'+obj[i].datatitle+' <br/>内容:'+obj[i].content+'</DIV>';
		$("#L").append(html);
	}
}

function closeDialog(){
	layer.closeAll();
}