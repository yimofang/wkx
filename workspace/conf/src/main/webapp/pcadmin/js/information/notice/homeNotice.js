//@ sourceURL=homeNotice.js
/**
 * 首页面板通知公告显示
 */
$(document).ready(function() {
	getNoticeList();
});
function getNoticeList(){
	$.ajax({
		url:contextPath+'/system/notice/getRevNoticeByUserId.do',
		type:"post",
		dataType:"json",
		success:function(data){
			var li = "";
			var dat = eval(data);
			var obj = dat.data;
			var ldata=obj.rows;
			for(var i = 0;i<ldata.length;i++){
				
				li+='<a id="a'+ldata[i].id+'" href="#" class="list-group-item" onclick="checkNotice('+ldata[i].id+')">'+ldata[i].noticetitle;
				if(ldata[i].ischeck == 0){
					li+="<span class='title_nocheck'>未读</span></a>";
				}
				else{
					li+="<span class='title_check'>已读</span></a>";
				}
				
			};
			$("#div-notice").append(li);
		},
		error:function(error){
			
		}
	});
}	

function checkNotice(noticeId){
	$('#div-notice #a'+noticeId+' span').remove();
	var aa="<span class='title_check'>已读</span>";
	$('#div-notice #a'+noticeId).append(aa);
	$.myPlugin.modelDialog({context:'../page/information/notice/noticeTag.jsp',data:{noticeId:noticeId,viewtype:0,noticeWay:1},title:"查看通知公告",width:'600px',height:'630px',offset:'150px',resize:false,});
	
}