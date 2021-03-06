

/**

 
用法
	<div class="form-group">
						<label class="col-sm-3 control-label">图片上传：</label>
						<div class="col-sm-8">

	<a href="javascript:void(0)" class="tx"	style="display: block; border: 1px solid #000"> 
		<img id="tuto_img"  >  <!--用于显示图片 -->	
   <input id="imgto_hid"type="hidden" name="imgb">  <!--用于提交表单时 向后台提交数据-->
    <!--多个上传控件的ID 要不同    -->			 
 <input id="fileone" name="myfiles"	type="file" onchange="previewImage(this,'tuto_img','imgto_hid');" multiple="multiple">
		               </a>

		</div>
	</div>
					
 
 */

var bathfile=$("#basePath_hid").val();

/**
 * @author 白琨
 * @param file  input file 上传标签 this
 * @param prvid  img 标签id
 * @param hidid  隐藏表单域 id
 */
function previewImage(file, prvid, hidid) {
	
	
	/*
	 * file：file控件 prvid: 图片预览容器
	 */
	var tip = "请上传 jpg 或 png 或 gif!文件"; // 设定提示信息
	var filters = {
		"jpeg" : "/9j/4",
		"gif" : "R0lGOD",
		"png" : "iVBORw",
		"bmp" : "Qk2urQ"
	};

	var prvbox = document.getElementById(prvid);
 

	prvbox.innerHTML = "";

	if (window.FileReader) { // html5方案
		for (var i = 0, f; f = file.files[i]; i++) {
			var fr = new FileReader();
			fr.onload = function(e) {
				var src = e.target.result;
				if (!validateImg(src)) {
					alert(tip)
				} else {
					showPrvImg(src);
				}
			};
			fr.readAsDataURL(f);
		}
	} else { // 降级处理

		if (!/\.jpg$|\.png$|\.bmp$|\.gif$/i.test(file.value)) {
			alert(tip);
		} else {
			showPrvImg(file.value);
		}
	}

	function validateImg(data) {
		var pos = data.indexOf(",") + 1;
		for ( var e in filters) {
			if (data.indexOf(filters[e]) === pos) {
				return e;
			}
		}
		return null;
	}

	function showPrvImg(src) {

		prvbox.src = src;
		ajaxFileUpload($(file).attr("id"), hidid, prvid);

	}

}

function ajaxFileUpload(fileid, hidid,prvid) {
	
	console.log(bathfile);
	console.log("hidid="+hidid);
	
	// 开始上传文件时显示一个图片,文件上传完成将图片隐藏
	// $("#loading").ajaxStart(function(){$(this).show();}).ajaxComplete(function(){$(this).hide();});
	// 执行上传文件操作的函数
	$.ajaxFileUpload({
		// 处理文件上传操作的服务器端地址(可以传参数,已亲测可用)
		url : bathfile+'/uploadApk.do',
		secureuri : false, // 是否启用安全提交,默认为false
		fileElementId : fileid, // 文件选择框的id属性
		dataType : 'json', // 服务器返回的格式,可以是json或xml等
		success : function(data) { // 服务器响应成功时的处理函数
			console.log("data.filename="+data.filename);
			console.log(data);	
			$("#" + hidid).val(data.filename);
			if(data.code==2){
				$("#"+prvid).attr('src', '');
			}
 	
		},
		error : function(data, status, e) { // 服务器响应失败时的处理函数

		}
	});

}