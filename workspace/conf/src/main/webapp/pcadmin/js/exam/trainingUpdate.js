//首页-主菜单-培训考试-培训资料修改页
var arr = new Array(); 
$(document).ready(function() {
	getTrainingInfo();
	$("#ifvide").change(function() { 
		if($("#ifvide").is(':checked')) {
			$("#vides").show();
		}else{
			$("#vides").hide();
		}
	});
	
	for(var i=0;i<3;i++){
		//alert(i);
		var student = new Object(); 
		student.name = "Lanny"; 
		student.age = "2="+i; 
		student.location = "China"; 
		arr[i] = student; 
	}
});

function getTrainingInfo() {//获取信息
	if(organizationId != null) {
		$.ajax({
			url:contextPath+"/exam/training/getTrainingInfo.do",
			type:"post",
			dataType:"json",
			data:{"id":organizationId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				$("#datatitle").val(obj.datatitle);		
				$("#content").html(obj.content);
				if(obj.ifvideo===1){
					$("#vides").show();
					$("#video").val(obj.videoname);	
					$("#ifvide").attr("checked","true"); 
					$("#videoName2").html(obj.address);
				}
				setTrainingNode(dat.data2);
			},
			error:function(error){}
		});
	}
}





function setTrainingNode(obj){//辅助资料注入页面
	i=obj.length;
	for(var i=0;i<obj.length;i++){
		var html = "";
		html='<div>'
				+'<input type="text" id="nodeDatatitle'+i+'" lay-verify="title" autocomplete="off" value="'+obj[i].datatitle+'" placeholder="子资料标题" class="layui-input form-control">'
				+'<input type="text" id="nodeContent'+i+'" lay-verify="title" autocomplete="off" value="'+obj[i].content+'" placeholder="子内容" class="layui-input form-control">'
			+'</div>';
		$('#L').append(html);
	}
}







layui.use('upload', function(){
	var $ = layui.jquery
	,upload = layui.upload;
	//执行实例
	var uploadInst = upload.render({
		elem: '#uploadAvatar'	//绑定元素
		,url: contextPath + '/system/files/upLoad.do'	//上传接口
//	    ,method: 'post'		//上传接口的HTTP类型	默认值:post
//		,data: {}			//请求上传接口的额外参数
	    ,accept: 'video' 	//允许上传的文件类型	默认值:images	images(图片)、file(所有文件)、video(视频)、audio(音频)
//	    ,size: 0			//设置文件最大可允许上传的大小,单位 KB。不支持ie8/9 默认值:0 (即不限制)
//	    ,multiple: false	//是否允许多文件上传。设置 true即可开启。不支持ie8/9 默认值:false
//	    ,drag: true			//是否接受拖拽的文件上传,设置 false 可禁用。不支持ie8/9 默认值:true
		,before: function(obj){//文件提交上传前的回调
			obj.preview(function(index, file, result){//预读本地文件示例，不支持ie8
				$('#uploadReading').attr('src', result); //图片链接（base64）
			});
	    }
	    ,done: function(res,index,upload){//执行上传请求后的回调	  
	    	
	    	if(res.code > 0){//如果上传失败
	    		return layer.msg('上传失败，请重试 !');
	    	}
	    	//上传成功
	    	var ret = res.data.data[0];
	    	console.info(ret);
	    	var videoName = ret.filename;
	    	var videoUrl = ret.filepath;
	    	var videoId = ret.id;
	    	var vodeoPath = videoName;
	    	$("#videoName").val(videoName);
	    	$("#videoName2").html(videoName);
	    	return layer.msg('上传成功 !');
	    }
	    ,error: function(index,upload){//执行上传请求出现异常的回调
	    	//演示失败状态，并实现重传
	    	var uploadText = $('#uploadText');
	    	uploadText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini upload-reload">重试</a>');
	    	uploadText.find('.upload-reload').on('click', function(){
	    		uploadInst.upload();
	    	});
	    }
	});
});

var i=0;
function addTrainingNode(){
	for(var i=0;i<3;i++){
		var student = new Object(); 
		student=arr[i];
		alert(student.age);
	}
	
//		i++;
//		var html = "";
//		html='<div>'
//				+'<input type="text" id="nodeDatatitle'+i+'" lay-verify="title" autocomplete="off" placeholder="子资料标题" class="layui-input form-control">'
//				+'<input type="text" id="nodeContent'+i+'" lay-verify="title" autocomplete="off" placeholder="子内容" class="layui-input form-control">'
//			+'<a></a></div>';
//		$('#L').append(html);
}

function TrainingSubmit(){
	var datatitle = $("#datatitle").val();		
	var content = $("#content").val();//上级机构
	if (datatitle.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('资料名称不能为空', "#datatitle");
		})
		return;
	}
	if (content.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('资料内容不能为空', "#content");
		})
		return;
	}
	var mycars=new Array()
	for(var j=0;j<=i;j++){
		var title=$("#nodeDatatitle"+j).val();
		var content=$("#nodeContent"+j).val();
		mycars[(j-1)]=title+"-"+content;
	}
	$("#array").val(mycars);
	$.ajax({
		url:contextPath+"/exam/training/addTraining.do",
		type:"post",
		data:$("#trainingInfo").serialize(),
		dataType:"json",
		success:function(data){
			var dat = eval(data);
			if(dat.success == true){
				layer.closeAll();
				$("#organizationList").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){
		}
	});
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


function closeDialog(){
	layer.closeAll();
}