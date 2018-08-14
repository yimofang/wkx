//首页-主菜单-培训考试-添加培训资料页
$(document).ready(function() {
	
	$("#ifvide").change(function() { 
		if($("#ifvide").is(':checked')) {
			$("#vides").show();
		}else{
			
			$("#vides").hide();
		}
		
	});
});

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
	    	$("#address").val(videoName);
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
//添加层级资料输入框
function addTrainingNode(){
		i++;
		var html = "";
		html='<div>'
				+'<input type="text" id="nodeDatatitle'+i+'" lay-verify="title" autocomplete="off" placeholder="子资料标题" class="layui-input form-control">'
				+'<input type="text" id="nodeContent'+i+'" lay-verify="title" autocomplete="off" placeholder="子内容" class="layui-input form-control">'
			+'</div>';
		$('#L').append(html);
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
//添加资料
function TrainingSubmit(){
	var datatitle = $("#datatitle").val();		
	var content = $("#content").val();
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
//取消添加
function closeDialog(){
	layer.closeAll();
}