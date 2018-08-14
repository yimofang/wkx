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
			<form class="form-horizontal m-t" id="commentForm"
				enctype="multipart/form-data" accept-charset="utf-8">

				<!-- 点击ID -->
				<input type="hidden" name="id" id="hid_id">
				<!-- 点击当前索引 -->
				<input type="hidden" id="table_index">
				
					<div class="form-group">
					<label class="col-sm-3 control-label">登陆帐号(*必填)：</label>
					<div class="col-sm-8">
						<input id="loginname" name="loginname" autocomplete="off"   type="text"
							class="form-control"    value="" required="" pattern="[0-9a-zA-Z]+$" title="请输入字母或数字" >
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">姓名(*必填)：</label>
					<div class="col-sm-8">
						<input id="realname" name="realname" autocomplete="off"   type="text"
							class="form-control"    value="" required="" pattern="^[\u4E00-\u9FA5]+$" title="请输入中文" >
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-3 control-label">手机号(*必填)：</label>
					<div class="col-sm-8">
						<input id="phone" name="phone" autocomplete="off" minlength="2" type="text"
							class="form-control"    value=""  required=""  pattern="^[0-9]*$" title="请输入数字" >
					</div>
				</div>
				
			 
			 
				

				<div class="form-group">
					<label class="col-sm-3 control-label">照片上传：</label>
					<div class="col-sm-3">

						<a href="javascript:void(0)" class="tx" style="display: block; border: 1px solid #000"> <img
							id="tu_img" src="" alt="请点击这里"> 
							<input id="img_hid"	type="hidden" name="headimg"> 
							<input id="myBlogImage"		name="myfiles" type="file"
							onchange="previewImage(this,'tu_img','img_hid');"
							multiple="multiple">
						</a>

					</div>
				</div>
				
			 

				<div class="form-group">
					<label class="col-sm-3 control-label">操作权限(*必选)：</label>
					<div class="col-sm-8">

						<select class="form-control m-b" name="powerid" id="powerid"
							autocomplete="off"></select>
					</div>
				</div>


		 

		 
				<div class="form-group">
					<label for="example-single"  class="col-sm-3 control-label">组织角色(*必选)：</label>
					<div class="col-sm-8">
					<select id="example-single"  name="organizid" class="selectpicker bla bla bli form-control m-b"  data-live-search="true">
    					<optgroup label="test" data-subtext="another test" data-icon="icon-ok" id="organizid">
       					  		
    					</optgroup>
					</select>
					</div>
				</div>
			 

				<div class="form-group">
					<label class="col-sm-3 control-label">证件类别(*必选)：</label>
					<div class="col-sm-8">

						<select class="form-control m-b" name="genre" id="genre"
							autocomplete="off" ></select>
					</div>
				</div>


				<div class="form-group">
					<label class="col-sm-3 control-label">证件号(*必填)：</label>
					<div class="col-sm-8">
						<input id="nub" name="nub" autocomplete="off"  minlength="1" type="text"
							class="form-control" value=""  required=""  pattern="^\w+$"    >
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
	var method_path = base_path_from + "/adminusers";

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
 
		power_init(null);
	 
		organiz_init(null);
	 
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

		var path = base_path_from + "/upload/";

		if (state == 1) {//初始化
            
			$("#hid_id").val(data.id);
			$("#realname").val(data.realname);
			$("#loginname").val(data.loginname);
			$("#phone").val(data.phone);
			//图片
			$("#img_hid").val(data.headimg);
			$("#tu_img").attr('src', path + data.headimg);
		 
			select_genre(data.genre);
		 
			$("#nub").val(data.nub);
			

		}
		if (state == 2 || data == null) {//清空  

			$("#hid_id").val(null);
			$("#realname").val(null);
			$("#loginname").val(null);
			$("#phone").val(null);
			//图片
			$("#img_hid").val(null);
			$("#tu_img").attr('src', "");
		 
			select_genre(null);
			$("#nub").val(null);
		 
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
				power_init(data.powerid);
			 
				organiz_init(data.oid);	
			 
				show_div();
			}
		});

	}

	//-----------ajax提交表单依赖方法 -------

	function showRequest(formData, jqForm, options) {
		//处理提交时 验证		 			
		$("#msg").html("正在提交...");
		
		var gar=$("#genre").val();
		 	 
		if(gar==1){	 
		return checkCard("nub");
		} 	
		return true;
	}

	function showResponse(responseText) {
		//处理回调 函数 
		if (responseText.code == 1) {
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

 

	function select_onchange(value) {
 
	}

	function select_genre(data_id) {
		var select_str = "";

		if (data_id == 2 && data_id != null) {
			select_str += "<option value='1'  >身份证</option> ";
			select_str += "<option value='2' selected='selected'>工作证</option> ";
		} else {
			select_str += "<option value='1' selected='selected'>身份证</option> ";
			select_str += "<option value='2' >工作证</option> ";
		}

		$("#genre").html(select_str);
	}

 
	
	
	//加载下拉列表 
	// tag_id Web标签id ,method_name 访问加载方法名 , data_id 需要对比的id 
	function select_init(tag_id, method_name, data_id, higher) {

		var top_id = 0;
		var select_str = "";

		$.ajax({
					type : "POST", //提交方式  
					url : method_path + "/" + method_name+".do",//路径 
					dataType : "json",
					data : {
						higherid : higher
					},
					success : function(data) {//返回数据根据结果进行相应的处理 

						$.each(data,function(index, value) {

											if (data_id != null) {

												if (data_id == value.id) {
													select_str += "<option value='"+value.id+"' selected='selected'>"
															+ value.title
															+ "</option> ";
												} else {
													select_str += "<option value='"+value.id+"' >"
															+ value.title
															+ "</option> ";
												}
											} else {
												select_str += "<option value='"+value.id+"' >"
														+ value.title
														+ "</option> ";
											}

										});
						$("#" + tag_id).html(select_str);
					}
				});

	}
	
	 //初始化权限
	 function power_init(powerid){ 
	 
		 var select_str="";
		 $.ajax({
				type : "POST", //提交方式  
				url : method_path + "/" + "power_list.do",//路径 
				dataType : "json",			 
				success : function(data) {//返回数据根据结果进行相应的处理 
				
					$.each(data,function(index, value) {
					 
										if (powerid != null) {

											if (powerid == value.id) {
												select_str += "<option value='"+value.id+"' selected='selected'>"
														+ value.powername
														+ "</option> ";
											} else {
												select_str += "<option value='"+value.id+"' >"+ value.powername+ "</option> ";
											}
										} else {
											select_str += "<option value='"+value.id+"' >"
													+ value.powername
													+ "</option> ";
										}

									});
				 
					$("#powerid").html(select_str);
				}
			});

}

	 
	 
		 
	  
	 
	 //初始化组织机构
	 function organiz_init(organizid){
		 var select_str="";
		 
		 $.ajax({
				type : "POST", //提交方式  
				url : method_path + "/" + "organiz_list.do",//路径 
				dataType : "json",			 
				success : function(data) {//返回数据根据结果进行相应的处理 
					$.each(data,function(index, value) {

										if (organizid != null) {

											if (organizid == value.id) {
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
				     console.log($("#organizid"));
					$("#organizid").html(select_str);
					$('.filter-option').html(data[0].name);
					$('.inner').html(html2);
				}
			});
		 
	 }
	 
	 
	 
 
</script>
