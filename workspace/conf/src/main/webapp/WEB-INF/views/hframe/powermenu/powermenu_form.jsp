<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>


<style>
/* 隐藏遮罩层定义  */
* {
	margin: 0;
	padding: 0
}

.container {
	/* width: 800px;
	height: 750px; */
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 3px;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	display: none;
	z-index: 10001;
	overflow: auto;
}
/* 隐藏遮罩层定义 结束   */
</style>



<!--遮罩层  -->
<div class="cancel"
	style="position: fixed; left: 0; top: 0; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.5); display: none; z-index: 10000;"></div>
<div class="container">
	<input type="hidden" id="ls">

	<div class="ibox float-e-margins">
		<div class="ibox-title">
			<h5>详细信息</h5>
			<div class="ibox-tools">
				<!-- 关闭 -->
				<a href="javascript:close_div()"> <i class="fa fa-times"></i>
				</a>
			</div>
		</div>

		<div class="ibox-content">
			<form class="form-horizontal m-t" id="commentForm"
				enctype="multipart/form-data" accept-charset="utf-8">

	 
				<input type="hidden" name="powerid" id="power_id">
				<input type="hidden" name="menuid" id="menuid">
				

				<table id="pmenulist" data-height="557" class="table table-bordered">
					

				</table>
					<div class="form-group">
					<div class="col-sm-4 col-sm-offset-3">
						<button class="btn btn-primary"  type="submit"  id="comitForm"  >提交</button>
						<button class="btn btn-danger" type="button"
							onclick="close_div()">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>

</div>
<!--遮罩层 结束 -->



<script type="text/javascript">
	var base_path_from = $("#basePath_hid").val();
	var method_path = base_path_from + "/powermenu";

	function close_div() {
		//关闭遮罩层
		$(".cancel").hide();
		$(".container").hide();
	 
	}

	function show_div() {
		//打开遮罩层
		$(".cancel").show();
		$(".container").show();

	}

	var options = {
		//jqueryform 处理设置 
		beforeSubmit : null, //提交前处理 
		success : null, //处理完成 
		resetForm : true,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : 'json',
		type : "post", //提交方式  
		url : ""//路径 

	};

	//---------ajax提交表单--------------
	$('#commentForm').submit(function() {

		options.beforeSubmit = showRequest;
		options.success = showResponse;
		$(this).ajaxSubmit(options);
		//设置 提交 时不刷新，用于显示 错误提示        
		return false;
	});
	//---------ajax提交表单 结束--------------

	function add_obj(powerid,menuid) {
		//添加 按键 
		btn_control = "add";
		//设置 ajax表单提交路径 
		options.url = method_path + "/add_info.do";
 
		var btn_str="";
		
		$.ajax({
			type : "POST", //提交方式  
			url :  method_path + "/conduct_list.do",//路径 			
			data : {
				id : powerid,
				menuid:menuid
			},//数据，这里使用的是Json格式进行传输  
			dataType : "json",
			success : function(data) {//返回数据根据结果进行相应的处理  
				
				btn_str+="<tbody>";
			
				//获取选中行信息 
				$.each(data.list, function(index, value) {
					btn_str+=" <tr> ";
 	 
						if(value.checked){
							 btn_str+=" <td> <input type='checkbox' name='ids'  checked='checked' value='" + value.id + "'></td> "; 
							 btn_str+=" <td> " + value.name + "</td> "; 
						}else{
							 btn_str+=" <td> <input type='checkbox' name='ids'    value='" + value.id + "'></td> "; 
							 btn_str+=" <td> " + value.name + "</td> "; 
						}
					
				 
 	 
					btn_str+=" </tr> ";
 		
				});
				btn_str+="</tbody>";
			
				 $("#power_id").val(powerid);
				 console.log("powerid="+$("#power_id").val());
				 $("#menuid").val(menuid);
				 $("#pmenulist").html(btn_str);
			}
		});
		
		show_div();
	}

 
     
 

	//-----------ajax提交表单依赖方法 -------

	function showRequest(formData, jqForm, options) {
		//处理提交时 验证		 			
		$("#msg").html("正在提交...");
		return true;
	}

	function showResponse(responseText) {
		//处理回调 函数 
		location.reload();

	}

	//-----------ajax提交表单依赖方法 -结束------
 
</script>
