<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>

<script type="text/javascript"
	src="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.js"></script>
<link rel="stylesheet" type="text/css"
	href="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css">
<link
	href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
	rel="stylesheet">
<script
	src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
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

				<!-- 点击ID -->
				<input type="hidden" name="id" id="hid_id">
				<!-- 点击当前索引 -->
				<input type="hidden" id="table_index">
 
				<div class="form-group">
					<label class="col-sm-3 control-label">名称：</label>
					<div class="col-sm-8">
						<input id="name" name="name" autocomplete="off" type="text"
							class="form-control" value="" required=""
							pattern="^[\u4E00-\u9FA5]+$" title="请输入中文">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">标签：</label>
					<div class="col-sm-8">
						<input id="symbol" name="symbol" autocomplete="off" type="text"
							class="form-control" value="" required=""
							pattern="^[a-z]+$" title="请输入小写字母">
					</div>
				</div>
			 
				<div class="form-group">
					<div class="col-sm-4 col-sm-offset-3">
						<button class="btn btn-primary" type="submit" id="comitForm">提交</button>
						<button class="btn btn-danger" type="button" onclick="close_div()">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>

</div>
<!--遮罩层 结束 -->



<script type="text/javascript">
	var base_path_from = $("#basePath_hid").val();
	var method_path = base_path_from + "/conduct";

	function close_div() {
		//关闭遮罩层
		$(".cancel").hide();
		$(".container").hide();
		frominit(null, 2);

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

	function add_obj() {
		//添加 按键 
		btn_control = "add";
		//设置 ajax表单提交路径 
		options.url = method_path + "/add_info.do";
		show_div();
		frominit(null, 2);
	}

	function delete_obj() {
		//删除 按钮
		btn_control = "delete";
		variable_init();
		var se = confirm("确认要删除此信息吗？");

		if (se == true){
			$.ajax({
				type : "POST", //提交方式  
				url : method_path + "/isdelete.do",//路径 
				data : {
					id : table_data_map[0].id
				},//数据，这里使用的是Json格式进行传输  
				dataType : "json",
				success : function(data) {//返回数据根据结果进行相应的处理  
		 
					if(data.error==0){

					//获取选中行信息 
					var rows = table_obj.bootstrapTable('getSelections');
					//移除 删除行
					$("#conductlist").bootstrapTable('remove', {
						field : 'id',
						values : [ table_data_map[0].id ]
					});
					//清空索引 数据 
					$("#hid_id").val(null);
					$("#table_index").val(null);
					}else{
						alert(data.msg);
					}
					
				}
			});

		}

	}

	//数据清空or初始化 
	function frominit(data, state) {

		if (state == 1) {//初始化
			$("#symbol").val(data.row.symbol);
			$("#hid_id").val(data.row.id);
			$("#name").val(data.row.name);

		}
		if (state == 2 || data == null) {//清空  
			$("#symbol").val(null);
			$("#hid_id").val(null);
			$("#name").val(null);

		}
	}

	function update_obj() {
		variable_init();
		//修改按键 
		btn_control = "update";

		console.log("table_data_map[0].id=" + table_data_map[0].id);
		//设置 ajax表单提交路径 
		options.url = method_path + "/update_info.do";

		$.ajax({
			type : "POST", //提交方式  
			url : method_path + "/get_info.do",//路径 
			data : {
				id : table_data_map[0].id
			},//数据，这里使用的是Json格式进行传输  
			dataType : "json",
			success : function(data) {//返回数据根据结果进行相应的处理  
			 
				frominit(data, 1);
				show_div();
			}
		});

	}

	//-----------ajax提交表单依赖方法 -------

	function showRequest(formData, jqForm, options) {
		//处理提交时 验证		 			
		$("#msg").html("正在提交...");

		var gar = $("#genre").val();

		if (gar == 1) {
			return checkCard("nub");
		}
		return true;
	}

	function showResponse(responseText) {
 
		//处理回调 函数 
		if (responseText.error == 0) {

			if (btn_control == "update") {
				//更新行 修改行s
				table_obj.bootstrapTable('updateRow', {
					index : table_data_index,
					row : responseText.row
				});

			}

			if (btn_control == "add") {
				//在表格头插入新数据 
				table_obj.bootstrapTable('insertRow', {
					index : 0,
					row : responseText.row
				});
			}
			close_div();
		} else {
			alert(responseText.msg);
			frominit(responseText.info, 1);
		}

	}

	//-----------ajax提交表单依赖方法 -结束------
</script>
