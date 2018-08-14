
$(document).ready(function() {
	getVideoList();
});
var url ='';
function loadVideoUrl(){
	console.info(url);
	$("#config-side-top video").attr("src","/IntellSecurity-web/"+url);
}
function getVideoList(){
	$.ajax({
		url:contextPath+"/system/video/getVideoList.do",
		type:"post",
		dataType:"json",
		success:function(data){
			var datList = data.data;
			console.info(datList);
			var str = '';
			for (var i = 0; i < datList.length; i++) {
				var videoName = datList[i].name;
				var videoUrl = datList[i].url;
				var videoId = datList[i].id;
				url = videoUrl;
				if (videoUrl ==null) {
					str += '<li id="'+videoId+'">';
					str += '<a href="#"><i class="iconfont icon-bag"></i> <span class="nav-label">'+videoName+'</span><span class="fa arrow"></span></a>';
					str += '</li>';
				}else{
					str += '<li id="'+videoId+'">';
					str += '<a href="#" onclick="loadVideoUrl()"><span>'+videoName+'</span></a>';
					str += '</li>';
				}
			}
			
			$("#videoList").append(str);
		},
		error:function(error){
			
		}
	});
}
