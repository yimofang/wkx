<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
	pageContext.setAttribute("scrPath", path);
%>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>后台管理系统</title>
<meta name="keywords" content=" ">
<meta name="description" content=" ">

<link rel="shortcut icon" href="favicon.ico">

<link href="${scrPath}/hframe/css/bootstrap.min.css?v=3.3.6"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/font-awesome.css?v=4.4.0"
	rel="stylesheet">
<link
	href="${scrPath}/hframe/css/plugins/bootstrap-table/bootstrap-table.min.css"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/animate.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/style.css?v=4.1.0" rel="stylesheet">

<!-- 全局js -->

<script type="text/javascript"
	src="${scrPath}/js/TreeGrid/jquery-1.3.2.min.js"></script>

<!-- jquery.form 插件 支持ajax文件上传,普通的js ajax 无法文件上传-->
<script type="text/javascript" src="${scrPath}/js/jqueryform.js"></script>
<!--调整目录取值  -->
<input id="basePath_hid" type="hidden" value="${basePath}" />

<script src="${scrPath}/hframe/js/bootstrap.min.js?v=3.3.6"></script>


<!-- 上传控件样式 及 js -->
<link href="${scrPath}/css/ajaxFileUpload.css" rel="stylesheet">
<script src="${scrPath}/js/ajaxFileUpload/ajaxfileupload.js"></script>
<!-- 自定义上传 -->
<script src="${scrPath}/js/ajaxFileUpload/ajaxfile_init.js"></script>

<!-- 自定义日期格式化 -->
<script src="${scrPath}/js/formatDate/formatDate.js"></script>


<!-- layerDate 日期控件 javascript -->
<script src="${scrPath}/hframe/js/plugins/layer/laydate/laydate.js"></script>

<script type="text/javascript" src="${scrPath}/js/TreeGrid/TreeGrid.js"></script>
<link type="text/css" rel="stylesheet"
	href="${scrPath}/js/TreeGrid/TreeGrid.css" />

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
<body class="gray-bg">




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



					<div class="form-group">
						<label class="col-sm-3 control-label">名称：</label>
						<div class="col-sm-8">
							<input id="name" name="name" autocomplete="off" type="text"
								class="form-control" value="" required=""
								pattern="^[\u4E00-\u9FA5]+$" title="请输入中文">
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-3 control-label">图标：</label>
						<div class="col-sm-3">

							<a href="javascript:void(0)" class="tx"
								style="display: block; border: 1px solid #000"> <img
								id="tu_img" src="" alt="点击这里"> <input id="img_hid"
								type="hidden" name="img"> <input id="myBlogImage"
								name="myfiles" type="file"
								onchange="previewImage(this,'tu_img','img_hid');"
								multiple="multiple">
							</a>

						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-4 col-sm-offset-3">
							<button class="btn btn-primary" type="submit" id="comitForm">提交</button>
							<button class="btn btn-danger" type="button"
								onclick="close_div()">取消</button>
						</div>
					</div>
				</form>
			</div>
		</div>

	</div>
	<!--遮罩层 结束 -->


	<div class="wrapper wrapper-content animated fadeInRight"
		style="padding: 10px;">

		<!-- 调试开始  -->
		<div class="ibox float-e-margins" style="margin-bottom: 0;">
			<div class="ibox-title">
				<h5>基本</h5>
				<div class="ibox-tools">
					 <a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a> <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i
						class="fa fa-wrench"></i>
					</a> <a class="close-link"> <i class="fa fa-times"></i>
					</a> 
				</div>
			</div>
			<div class="ibox-content" style="padding: 15px 20px 40px 20px;">

              

				<div class="row row-lg">
                   
                       <a class="btn btn-w-m btn-success" href="${basePath}/organiz/exceldownload.do">下载上传模版</a>
					<div class="col-sm-12">
					
						<!-- Example Events -->
						<div class="example-wrap">
							<div class="example">




								<div class="" style="">




									<div style="clear: both;"></div>
								</div>

								<div id="organizlist"></div>

							</div>
						</div>
						<!-- End Example Events -->
					</div>
				</div>
			</div>
		</div>
		<!-- End Panel Basic -->
		<!-- 调试结束 -->

	</div>
<style>
.container2 {
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 3px;
	position: fixed;
	left: 20%;
	top: 30%;
	right: 20%;
	bottom: 30%;
	margin: auto;
	z-index: 10001;
	overflow: auto;
	display:none;
}
/* 隐藏遮罩层定义 结束   */
</style>
	<!--遮罩层  -->
<div class="cancel2"
	style="position: fixed; left: 0; top: 0; height: 100%; width: 100%; display:none;background: rgba(0, 0, 0, 0.5); z-index: 10000;"></div>
<div class="container2">
	<input type="hidden" id="ls">

	<div class="ibox float-e-margins">
		<div class="ibox-title">
			<h5>详细信息</h5>
			<div class="ibox-tools">
				<!-- 关闭 -->
				<a href="javascript:void(0)" onclick="close_div2()"> <i class="fa fa-times"></i>
				</a>
			</div>
		</div>
	
		<div class="ibox-content">
	    <form method="POST"  enctype="multipart/form-data" id="excelform" >  
        <table>  
        	<input type="hidden" id="oid" name="oid" />
         <tr>  
            <td>上传文件: </td>  
            <td> <input id="upfile" type="file" name="myfiles"></td>  
         </tr>  
        <tr>  
            <td><input type="submit" value="提交" onclick="return checkData()"></td>  
        <!--     <td><input type="button" value="ajax方式提交" id="btn" name="btn" ></td>   -->
         </tr>  
        </table>    
    </form>  
		</div>
	</div>

</div>

  <script type="text/javascript">  
 
             //JS校验form表单信息  
             function checkData(){  
                var fileDir = $("#upfile").val();  
                var suffix = fileDir.substr(fileDir.lastIndexOf("."));  
                if("" == fileDir){  
                    alert("选择需要导入的Excel文件！");  
                    return false;  
                }  
                if(".xls" != suffix && ".xlsx" != suffix ){  
                    alert("选择Excel格式的文件导入！");  
                    return false;  
                }  
                return true;  
             }  
 
     		var options_excelform = {
     			//jqueryform 处理设置 
     			beforeSubmit : null, //提交前处理 
     			success : null, //处理完成 
     			resetForm : true,
     			contentType : "application/x-www-form-urlencoded; charset=utf-8",
     			dataType : 'json',
     			type : "post", //提交方式  
     			url : "${basePath}/organiz/ajaxexcelload.do"//路径 
     		};

     		//---------ajax提交表单--------------
     		$('#excelform').submit(function() {
     			options_excelform.beforeSubmit = excelformRequest;
     			options_excelform.success = excelformResponse;
     			$(this).ajaxSubmit(options_excelform);
     			//设置 提交 时不刷新，用于显示 错误提示        
     			return false;
     		});
     		function excelformRequest(formData, jqForm, options) {
    			//处理提交时 验证		 			
    		//	console.log(formData);
    			return true;
    		}

    		function excelformResponse(responseText) {
    			//处理回调 函数 
    			if (responseText.error == 1) {
    				
    			} else {
    				alert(responseText.msg);
    			}
    			close_div2();
    			location.reload();
    		}
             
    </script>   


<!--遮罩层 结束 -->	
	
	<script language="javascript">
		var base_path_from = $("#basePath_hid").val();
		var method_path = base_path_from + "/organiz";

		var datas = "${mdata}";
		var treeGrid;
		$(document).ready(function() {

			//初始化TreeGrid数据  
			getTreeGridDate();
		});
		function getTreeGridDate(idMerchant) {

			if (!idMerchant) {
				idMerchant = -1;
			}

			$.ajax({
				type : "POST", //提交方式  
				url : method_path + "/list.do",
				data : null,
				dataType : "json",
				success : function(data) {//后端返回json格式的字符串  
					if (data) {
						$("organizlist").empty();//清空原来的TreeGrid  
						var dataTreeGridSource = eval(data);//转成数组对象  

						var config = {
							id : "id",
							width : "800",
							renderTo : "organizlist",
							headerAlign : "left",
							headerHeight : "30",
							dataAlign : "left",
							indentation : "20",
							folderOpenIcon : base_path_from
									+ "/js/TreeGrid/images/folderOpen.gif",
							folderCloseIcon : base_path_from
									+ "/js/TreeGrid/images/folderClose.gif",
							defaultLeafIcon : base_path_from
									+ "/js/TreeGrid/images/defaultLeaf.gif",
							hoverRowBackground : "false",
							folderColumnIndex : "1",
							expandLayer : "1",
							itemClick : "itemClickEvent",
							columns : [ {
								headerText : "",
								dataField : "",
								headerAlign : "center",
								dataAlign : "center",
								width : "20",

							}, {
								headerText : "名称",
								dataField : "name",
								headerAlign : "center"
							}, {
								headerText : "标识图",
								dataField : "code",
								headerAlign : "center",
								dataAlign : "center",
								width : "100",
								handler : "Formatter_img"
							},

							{
								headerText : "操作",
								dataField : "id",
								headerAlign : "center",
								dataAlign : "center",
								width : "100",
								handler : "controllers"
							}

							],
							data : dataTreeGridSource
						};

						//创建一个组件对象  
						treeGrid = new TreeGrid(config);
						treeGrid.show();
					} else if (!data) {
						$("div1").empty();
						$("div1").append(
								"<table id=\"tg1\" ................暂无数据....");
					}
				},
				error : function() {
					alert("查询异常，请稍后再试或联系管理员。。。");
				}

			});
		}

		/*
		单击数据行后触发该事件
		id：行的id
		index：行的索引。
		data：json格式的行数据对象。
		 */
		function itemClickEvent(id, index, data) {

		}

		function controllers(row, col) {

			var btn = "";

			var add = "${add}";
			var upd = "${upd}";
			var del = "${del}";

			if (add != null && add == 'add') {
				btn += "<button type='button' class='btn  btn-primary btn-sm' onclick='add_obj("
						+ row.id + ")' >添加下级 </button>&nbsp;";
			}

			if (upd != null && upd == 'upd') {
				btn += "<button type='button' class='btn  btn-warning btn-sm' onclick='update_obj("
						+ row.id + ")'>修改</button>&nbsp;";
			}
			
			if (del != null && del == 'del') {
				if (row.pid != 0) {
					btn += "<button type='button' class='btn  btn-danger btn-sm' onclick='delete_obj("
							+ row.id + ")' >删除</button>";
				}
			}
            
			if (row.pid != 0) {
				btn += "&nbsp;<button type='button' class='btn btn-info btn-sm' onclick='show_div2("
					+ row.id + ")' >导入同级数据</button>";
			}
			
			
			return btn;

		}

		function Formatter_img(row, col) {

			var path = "${basePath}" + "/upload/";

			btn = "<img src="+path+row.img+" '   style='width: 30px;height: 30px'>";

			return btn;

		}
		
	</script>
	<script>
	function close_div2(){
		//关闭遮罩层
		$(".cancel2").hide();
		$(".container2").hide();
		 $("#oid").val("");
		 $("#upfile").val(""); 
	}

	function show_div2(id) {
		//打开遮罩层
		$(".cancel2").show();
		$(".container2").show();
        $("#oid").val(id);
	}
	</script>	

	<script type="text/javascript">
		var base_path_from = $("#basePath_hid").val();
		var method_path = base_path_from + "/organiz";

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

		function add_obj(row_id) {
 
			//添加 按键 
			btn_control = "add";
			//设置 ajax表单提交路径 
			options.url = method_path + "/add_info.do";
			$("#tu_img").attr('src', "");
			$("#hid_id").val(row_id);
			show_div();

		}

		function delete_obj(row_id) {
			//删除 按钮
			btn_control = "delete";
 
			var se = confirm("确认要删除此信息吗？");

			if (se == true) {

				$.ajax({
					type : "POST", //提交方式  
					url : method_path + "/delete_info.do",//路径 
					data : {
						id : row_id
					},//数据，这里使用的是Json格式进行传输  
					dataType : "json",
					success : function(data) {//返回数据根据结果进行相应的处理  

						$("#hid_id").val(null);

					}
				});
				location.reload();

			}

		}

		//数据清空or初始化 
		function frominit(data, state) {

			var path = base_path_from + "/upload/";

			if (state == 1) {//初始化

				$("#hid_id").val(data.id);
				$("#name").val(data.name);

			}
			if (state == 2 || data == null) {//清空  

				$("#name").val(null);

			}
		}

		function update_obj(row_id) {
			//修改按键 
			btn_control = "update";
			var path = "${basePath}" + "/upload/";

			$("#hid_id").val(row_id);
			//variable_init();
			//设置 ajax表单提交路径 
			options.url = method_path + "/update_info.do";

			$.ajax({
				type : "POST", //提交方式  
				url : method_path + "/idbyinfo.do",//路径 
				data : {
					id : row_id
				},//数据，这里使用的是Json格式进行传输  
				dataType : "json",
				success : function(data) {//返回数据根据结果进行相应的处理  

					$("#name").val(data.name);
					$("#tu_img").attr('src', path + data.img);
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
			if (responseText.code == 1) {
				close_div();

			} else {
				alert(responseText.msg);

			}

			location.reload();

		}

		//-----------ajax提交表单依赖方法 -结束------
	</script>



</body>

</html>
