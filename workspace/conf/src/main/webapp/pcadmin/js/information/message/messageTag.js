$(document).ready(function() {
	getMessageInfo();
});


function getMessageInfo(){//获取消息信息
	$.ajax({
		url:contextPath+"/system/pushMessage/getPushMessageById.do",
		data:{"id":messageId},
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			$("#title").text(obj.pushmsgtitle);
			$("#text").text(obj.pushmsgcontext);
			setMessageRead();
		},
		error:function(error){
			
		}
	});
}

function setMessageRead(){//标记消息已读
	$.ajax({
		url:contextPath+"/system/pushMessage/updatePushMessage.do",
		data:{"id":messageId},
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){

		},
		error:function(error){
			
		}
	});
}