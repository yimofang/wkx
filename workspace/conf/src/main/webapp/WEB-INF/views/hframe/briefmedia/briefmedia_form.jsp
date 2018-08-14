<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>

<script type="text/javascript" src="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.js"></script>
 <link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css">
 <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
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
			<form class="form-horizontal m-t" id="briefMediaForm"
				enctype="multipart/form-data" accept-charset="utf-8">

				<!-- 点击ID -->
				<input type="hidden" name="id" id="hid_id">
				<!-- 点击当前索引 -->
				<input type="hidden" id="table_index">
				
				<div class="form-group">
					<label class="col-sm-3 control-label">姓名(*必填)：</label>
					<div class="col-sm-8">
						<input id="bname" name="bname" autocomplete="off"   type="text"
							class="form-control"    value="" required="" pattern="^[\u4E00-\u9FA5]+$" title="请输入中文" >
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">手机号(*必填)：</label>
					<div class="col-sm-8">
						<input id="bphone" name="bphone" autocomplete="off" minlength="2" type="text"
							class="form-control"    value=""  required=""  pattern="^[0-9]*$" title="请输入数字" >
					</div>
				</div>

				<div class="form-group">
					<label for="example-single"  class="col-sm-3 control-label">推广简报(*必选)：</label>
					<div class="col-sm-8">
					<select id="example-single"  name="briefid" class="selectpicker bla bla bli form-control m-b"  data-live-search="true">
    					<optgroup label="test" data-subtext="another test" data-icon="icon-ok" id="briefid">
       					  		
    					</optgroup>
					</select>
					</div>
				</div>
				<div class="form-group">
				<label  class="col-sm-3 control-label">推广媒体(*必选)：</label>
				<div  class="col-sm-8">
				  <div id="medialist1" >
					
				</div>  
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
	var method_path = base_path_from + "/briefmedia";

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
	$('#briefMediaForm').submit(function() {

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
 
		gomedia(null);
	 
		brief_init(null);
	 
		show_div();
	 
		frominit(null,2);
	}

	function delete_obj() {
		//删除 按钮
		btn_control = "delete";

		variable_init();

		var se = confirm("确认要删除此信息吗？");

		if (se == true)

		{

			$.ajax({
				type : "GET", //提交方式  
				url : method_path + "/delete_info.do",//路径 
				data : {
					id : table_data_map[0].id
				},//数据，这里使用的是Json格式进行传输  
				dataType : "json",
				success : function(data) {//返回数据根据结果进行相应的处理  
					//获取选中行信息 
					var rows = table_obj.bootstrapTable('getSelections');
					//移除 删除行
					table_obj.bootstrapTable('remove', {
						field : 'id',
						values : [ table_data_map[0].id ]
					});

					//清空索引 数据 
					$("#hid_id").val(null);
					$("#table_index").val(null);
				}
			});

		}

	}

	//数据清空or初始化 
	function frominit(data, state) {

		if (state == 1) {//初始化
			$("#hid_id").val(data.row.id);
			$("#bname").val(data.row.bname);
			$("#bphone").val(data.row.bphone);
			

		}
		if (state == 2 || data == null) {//清空  

			$("#hid_id").val(null);
			$("#bname").val(null);
			$("#bphone").val(null);
		 
		}
	}

	function update_obj() {
		//修改按键 
		btn_control = "update";
    
		variable_init();
		   console.log("table_data_map[0].id="+table_data_map[0].id);
		//设置 ajax表单提交路径 
		options.url = method_path + "/update_info.do";

		$.ajax({
			type : "GET", //提交方式  
			url : method_path + "/idbyinfo.do",//路径 
			data : {
				id : table_data_map[0].id
			},//数据，这里使用的是Json格式进行传输  
			dataType : "json",
			success : function(data) {//返回数据根据结果进行相应的处理  
				frominit(data, 1);		
				gomedia(data.row.mediaid);
			 
				brief_init(data.row.briefid);	
			 
				show_div();
			}
		});

	}

	//-----------ajax提交表单依赖方法 -------

	function showRequest(formData, jqForm, options) {
		//处理提交时 验证		 			
		$("#msg").html("正在提交...");
		
		return true;
	}

	function showResponse(responseText) {
		//处理回调 函数 
		if (responseText.error == 0) {
			close_div();

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
		} else {
			alert(responseText.msg);
			frominit(responseText.row, 1);
		}

	}

	//-----------ajax提交表单依赖方法 -结束------
	
	 //初始化简报信息
	 function brief_init(briefid){
		 var select_str="";
		 
		 $.ajax({
				type : "POST", //提交方式  
				url : method_path + "/" + "brief_list.do",//路径 
				dataType : "json",			 
				success : function(data) {//返回数据根据结果进行相应的处理 
					$.each(data,function(index, value) {

						if (briefid != null) {

							if (briefid == value.id) {
								select_str += "<option value='"+value.id+"' selected='selected'>"
										+ value.name
										+ "</option> ";
							} else {
								select_str += "<option value='"+value.id+"' >"
										+ value.name
										+ "</option> ";
							}
						} else {
							select_str += "<option value='"+value.id+"' >"
									+ value.name
									+ "</option> ";
						}

					});
					var html2 = '';
					for(var i =0;i<data.length;i++){
						if(i == 0){
							html2 +='<li data-original-index="'+i+'" data-optgroup="'+data[i].id+' class="selected active""><a tabindex="0" class="opt " data-normalized-text="<span class=&quot;text&quot;>asd</span>" data-tokens="null"><span class="text">'+data[i].name+'</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li>'
						}else{
							html2 +='<li data-original-index="'+i+'" data-optgroup="'+data[i].id+'"><a tabindex="0" class="opt " data-normalized-text="<span class=&quot;text&quot;>asd</span>" data-tokens="null"><span class="text">'+data[i].name+'</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li>'
						}
						
					}
				     console.log(select_str);
				     console.log($("#briefid"));
					$("#briefid").html(select_str);
					$('.filter-option').html(data[0].name);
					$('.inner').html(html2);
				}
			});
		 
	 }
	 
	//初始化媒体复选框 
		function gomedia(mediaid){
			var btn_str="";
			var htmls= method_path + "/media.do"; 

			$.ajax({
				type : "POST", //提交方式  
				url : htmls,//路径 
				data : null,//数据，这里使用的是Json格式进行传输  
				dataType : "json",
				success : function(data) {//返回数据根据结果进行相应的处理  
				
					btn_str+=" <div class='zi'>";
					console.log(data);
					//获取选中行信息 
					$.each(data, function(index, value) {
						
						if(mediaid!=null){
							var ids=mediaid.split(",");
							var i;
							for( i=0;i<ids.length;i++){
								if(value.id==ids[i]){
									 btn_str+=" <label> <input type='checkbox' name='ids' class='single' checked='checked' value='" + value.id + "' onchange='singlechange(this)'>";
									 break;
								 }
							}
							if(i==ids.length){
								 btn_str+="  <label> <input type='checkbox' name='ids' class='single'   value='" + value.id + "' onchange='singlechange(this)'> ";
							}
						  }else{
							  btn_str+="  <label> <input type='checkbox' name='ids' class='single'   value='" + value.id + "' onchange='singlechange(this)'>  "; 
						  }
						btn_str+=" <span style='font-size:18'>" + value.name + "</span> </label>&nbsp;&nbsp;";
						
					});
					btn_str+=" </div> ";
					 $("#medialist1").html(btn_str);
				}
			}); 
	}
 
</script>
