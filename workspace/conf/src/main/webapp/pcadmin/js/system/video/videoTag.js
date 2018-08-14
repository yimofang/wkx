$(document).ready(function() {
	
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
	    	var videoUrl = ret.url;
	    	var videoId = ret.id;
	    	var vodeoPath = videoUrl+"/"+videoName;
	    	$("#url").val(vodeoPath);
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

function getVideoId(){//获得video列表
	$.ajax({
		url:contextPath+"/system/video/getParVideoTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			console.info(data);
			getVideoTree(data.data);
		},
		error:function(error){}
	});
}

function getVideoTree(data){//所属video下拉树
	$.myPlugin.newDownTree({
		treeId:"#videoInfo #videoTree",	//下拉树要放置的div的Id
		tagWrapId:"#videoTag",				//取消下拉树的点击范围
		inpId:"#pname",						//input的id
		text:'text',							//列表显示类型
		data:data,								//首传参数
		id:'videoId',							//查询的参数
		result:'data',							//返回参数
		href:contextPath+'/system/video/getParVideoTree.do',
		nodeSelected:function(event,node){
			$("#pid").val(node.videoId);
			$("#pname").val(node.text);
			$("#videoInfo #videoTree").hide();
		}
	});
}

function cleanInput(id){
	$("#"+id).val("");
}


function saveVideo(){//添加视频
	$.ajax({
		url:contextPath+"/system/video/addVideo.do",
		type:"post",
		dataType:"json",
		data:$("#videoInfo").serialize(),
		success:function(data){
			console.info(data);
			var dat = eval(data);
			if(dat.success == true){
				layer.closeAll();
				$("#userList").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){
			console.info(error);
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