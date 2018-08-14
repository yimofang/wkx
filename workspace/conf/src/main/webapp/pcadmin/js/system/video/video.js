$(document).ready(function() {
	getVideoList();
});

function loadVideoUrl(th){
	var path = contextPath.substring(0,1);
	console.info(path);
	var url = $(th).attr("url");
	$("#config-side-top video").attr("src",path+url);
}

function getVideoList(){
	$.ajax({
		url:contextPath+"/system/video/getVideoList.do",
		type:"post",
		dataType:"json",
		success:function(data){
			var datList = data.data;
			console.info(datList);
			for (var i = 0; i < datList.length; i++) {
				var html = '';
				var videoName = datList[i].name;
				var videoUrl = datList[i].url;
				var videoId = datList[i].id;
				var videoPid = datList[i].pid;
				if (videoUrl ==null && videoPid ==null) {
					html += '<li id="video_item'+videoId+'">';
					html += '<a href="#"><i class="iconfont icon-bag"></i> <span class="nav-label">'+videoName+'</span><span class="fa arrow"></span></a>';
					html += '<ul class="nav">';
					html += '</ul>';
					html += '</li>';
					$("#videoList").append(html);
				}else if(videoUrl ==null && videoPid !=null){
					html += '<li id="video_item'+videoId+'">';
					html += '<a href="#"><i class="iconfont icon-bag"></i> <span class="nav-label">'+videoName+'</span><span class="fa arrow"></span></a>';
					html += '<ul class="nav nav-second-level">';
					html += '</ul>';
					html += '</li>';
					html += '<li>';
					$("#video_item"+videoPid+"> ul").append(html);
				}else if(videoUrl !=null && videoPid !=null){
					html += '<li id="'+videoId+'">';
					html += '<a href="#" url="'+videoUrl+'" onclick="loadVideoUrl(this)"><span>'+videoName+'</span></a>';
					html += '</li>';
					$("#video_item"+videoPid+"> ul").append(html);
				}else if(videoUrl !=null && videoPid ==null){
					html += '<li id="video_item'+videoId+'">';
					html += '<a href="#" url="'+videoUrl+'" onclick="loadVideoUrl(this)><i class="iconfont icon-bag"></i> <span class="nav-label">'+videoName+'</span></a>';
					html += '</li>';
					$("#videoList").append(html);
				}
			}
		},
		error:function(error){
			
		}
	});
}

function videoTag(title){//添加视频
	$.myPlugin.modelDialog({context:'../page/system/video/videoTag.jsp',title:title,width:'600px',height:'700px',offset:'80px',resize:false,});
}

function upLoadVideo(){
	
}
