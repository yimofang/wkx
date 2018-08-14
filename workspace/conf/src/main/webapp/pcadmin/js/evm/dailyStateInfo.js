//  首页-环保数据-日报表
$(document).ready(function() {
	getdailyInfo();
});

function getdailyInfo(){//获取当日数据
	$.ajax({
		url:contextPath+"/evm/evmDaily/getIdEvmDaily.do?batch=2017-12-25",
		type:"post",
		dataType:"json",
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				var dailyState = obj.daily;
				var yqlist = obj.dailyYqList;
				var fplist = obj.dailyFpList;
				$("#dailyInfo #fsthput").val(dailyState.fsthput);
				$("#dailyInfo #fstotal").val(dailyState.fstotal);
				$("#dailyInfo #fsconsum").val(dailyState.fsconsum);
				$("#dailyInfo #fselecost").val(dailyState.fselecost);
				$("#dailyInfo #clmaxstore").val(dailyState.clmaxstore);
				$("#dailyInfo #clposition").val(dailyState.clposition);
				for(var i=0; i<yqlist.length;i++){
					console.info(yqlist[i].devicename);
				}
				console.info(fplist.length);
				for(var j=0; j<fplist.length;j++){
					console.info(fplist[j].fpname);
				}
			}
		},
		error:function(error){
			
		}
	});	
}
function updatedailyInfo(){//个人资料修改
	var name = $("#dailyInfo #name").val();//用户名
	var tel = $("#dailyInfo #tel").val();//联系电话	
	var email = $("#dailyInfo #email").val();//邮箱	
	if (name.length == 0) {
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('用户名不能为空',"#dailyInfo #name");
		})
		return;
	}
	if (tel.length != 0){
		var reg = /^((\d{3,4}-\d{7,8})|(\d{7,8})|(1[0-9]\d{9}))$/;
		if (!reg.exec(tel)){
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				layer.tips('号码有误,请重新输入',"#dailyInfo #tel");
			})
			return;
		}
	}
	if(email.length != 0){
		var reg = /^\w+([-+._]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (!reg.exec(email)){
			layui.use('layer', function() {
				var $ = layui.jquery,layer = layui.layer;
				layer.tips('邮箱格式不正确',"#dailyInfo #email");
			})
			return;
		}
	}
	$.ajax({
		url:contextPath+"/system/user/updateUser.do",
		type:"post",
		dataType:"json",
		data:$("#dailyInfo").serialize(),
		success:function(data){
			if(data.success == true){
				layer.closeAll();
				layer.msg(data.msg);
			}else{
				layer.closeAll();
				layer.msg(data.msg);
			}
		},
		error:function(error){}
	});	
}

function closeDialog(){
	layer.closeAll();
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

layui.use('upload', function(){
	var $ = layui.jquery
	,upload = layui.upload;
	//执行实例
	var uploadInst = upload.render({
		elem: '#uploadAvatar'	//绑定元素
		,url: contextPath + '/system/files/upLoad.do'	//上传接口
//	    ,method: 'post'		//上传接口的HTTP类型	默认值:post
//		,data: {}			//请求上传接口的额外参数
//	    ,accept: 'images' 	//允许上传的文件类型	默认值:images	images(图片)、file(所有文件)、video(视频)、audio(音频)
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
	    	var file = res.data.data[0];
	    	var headimage = file.url+"/"+file.filename;
	    	$("#headimage").val(headimage);
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