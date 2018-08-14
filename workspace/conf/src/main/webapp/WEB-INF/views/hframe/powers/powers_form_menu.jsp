<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>


<style>
/* 隐藏遮罩层定义  */
* {
	margin: 0;
	padding: 0
}

/* 隐藏遮罩层定义 结束   */
</style>

    <style>
        *{margin: 0;padding: 0}
        li{list-style: none}
        .all{margin-right: 20px}
        .li div{line-height: 24px;height: 24px}
        .li{padding: 10px 0}
        .mar-r-20{margin-right: 20px}
        .border-b{border-bottom: 1px solid #ccc}
        .single{margin-right: 8px}
    </style>

<!--遮罩层  -->
<div id="seed_one"
	style="position: fixed; left: 0; top: 0; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.5); display: none; z-index: 10000;"></div>
<div c id="seed_two"
	style="background: #fff; border: 1px solid #ccc; border-radius: 3px; position: fixed; left: 0; top: 0; right: 0; bottom: 0; margin: auto; display: none; z-index: 10001; overflow: auto;">
	<input type="hidden" id="ls">

	<div class="ibox float-e-margins">
		<div class="ibox-title">
			<div id="powername1"></div>
			<div class="ibox-tools">
				<!-- 关闭 -->
				<a href="javascript:close_div()"> <i class="fa fa-times"></i>
				</a>
			</div>
		</div>

		<div class="ibox-content">
			<form class="form-horizontal m-t" id="commentForm_seed"
				enctype="multipart/form-data" accept-charset="utf-8">

				<!-- 点击ID -->
				<input type="hidden" name="id" id="powerid">
				<!-- 点击当前索引 -->
				<input type="hidden" id="table_index">
              
              

				<div id="menulist"  >
					

				</div>


				<div class="form-group" >
					<div class="col-sm-4 col-sm-offset-3">
						<button class="btn btn-primary"  type="submit"  id="comitForm" onclick="add_obj_seed(this)" >提交</button>
						<button class="btn btn-danger" type="button"
							onclick="close_div_seed()" >取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>

</div>
<!--遮罩层 结束 -->



<script type="text/javascript">
	var base_path_from = $("#basePath_hid").val();
	var method_path = base_path_from + "/powers";

	function close_div_seed() {
		//关闭遮罩层
		$("#seed_one").hide();
		$("#seed_two").hide();
		frominit(null, 2);
	}

	function show_div_seed() {
		//打开遮罩层
		$("#seed_one").show();
		$("#seed_two").show();
	}

	var options = {
		//jqueryform 处理设置 
		beforeSubmit : null, //提交前处理 
		success : null, //处理完成 
		resetForm : false,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : 'json',
		type : "post", //提交方式  
		url : ""//路径 

	};

	//---------ajax提交表单--------------
	$('#commentForm_seed').submit(function() {

		options.beforeSubmit = showRequest_seed;
		options.success = showResponse_seed;
		$(this).ajaxSubmit(options);
		//设置 提交 时不刷新，用于显示 错误提示        
		return false;
	});
	//---------ajax提交表单 结束--------------

	function add_obj_seed(obj) {
		//添加 按键 
		btn_control = "add";
		//设置 ajax表单提交路径 
		options.url = method_path + "/add_menu.do";

		 
	}

 
	 

	//-----------ajax提交表单依赖方法 -------

	function showRequest_seed(formData, jqForm, options) {
		//处理提交时 验证		 			
		$("#msg").html("正在提交...");
		return true;
	}

	function showResponse_seed(responseText) {
		//处理回调 函数 
	 
		location.reload();

	}

	//-----------ajax提交表单依赖方法 -结束------


	
	
	//初始化复选 框 
	function gomenu(id,powername){
		//alert("权限名称："+powername);
		$("#powername1").html("<h5>权限名称："+powername+"</h5>");
		var btn_str="";
		var htmls=base_path+"/powers/getmenu.do"; 

		$.ajax({
			type : "POST", //提交方式  
			url : htmls,//路径 
			data : {
				id : id
			},//数据，这里使用的是Json格式进行传输  
			dataType : "json",
			success : function(data) {//返回数据根据结果进行相应的处理  
				
				btn_str+="<ul>";
				console.log(data.list);
				//获取选中行信息 
				$.each(data.list, function(index, value) {
					btn_str+=" <li class='li'>";
					
					 if(value.checked){
						 
						 btn_str+=" <div class='border-b'><label> <input type='checkbox' name='ids' class='all'  checked='checked' value='" + value.id + "' onchange='allchange(this)'>  "; 
					 }else{
						 btn_str+=" <div class='border-b'><label> <input type='checkbox' name='ids' class='all'  value='" + value.id + "' onchange='allchange(this)'>  ";
					 }
					 
				
					btn_str+="<span style='font-size:18' > " + value.name + "</span> </div> ";
			 
					btn_str+=" <div class='zi'>";
				 
				 
					$.each(value.zmenu, function(index, value) {
						
						
						
						 if(value.checked){
							 
							 btn_str+=" <label> <input type='checkbox' name='ids' class='single' checked='checked' value='" + value.id + "' onchange='singlechange(this)'>  "; 
						 }else{
							 btn_str+="  <label> <input type='checkbox' name='ids' class='single'   value='" + value.id + "' onchange='singlechange(this)'>  ";
						 }
						
				 	
						btn_str+=" <span class='mar-r-20'>" + value.name + "</span> </label>";
						
					});
					btn_str+=" </div> ";
					btn_str+=" </li> </br> ";
					
				});
				
				btn_str+="</ui>";
			 
				 $("#powerid").val(id);
				 $("#menulist").html(btn_str);
			}
		});

		show_div_seed();
		
	}
</script>

<script type="text/javascript">

   function singlechange(obj){
	   
	   $(obj).parents("li").find(".all").prop("checked", $(obj).parents(".zi").find(".single:checked").length>0);
   }

   function allchange(obj){
	   $(obj).parent().parent().next().find(".single").prop("checked", $(obj).prop("checked"));
   }
   
 
     
     </script>   
