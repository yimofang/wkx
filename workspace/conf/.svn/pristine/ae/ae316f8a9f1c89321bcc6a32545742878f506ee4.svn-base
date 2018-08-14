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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- js 引用放置在  head 标签内  -->
<script type="text/javascript" src="${scrPath}/js/jquerymin.js"></script>
<!-- jquery.form 插件 支持ajax文件上传,普通的js ajax 无法文件上传-->
<script type="text/javascript" src="${scrPath}/js/jqueryform.js"></script>

	<script type="text/javascript">
	
	var basePath="${basePath}";
	
	var options = {//jqueryform表单插件配置  
			beforeSubmit : showRequest, //提交前处理 
			success : showResponse, //处理完成 
			resetForm : true,
			dataType : 'json',
			type : "post", //提交方式  
			url :"", //请求url 

		};
	
		$(function() {
		
			
			$('#addCustomMade').submit(function() {
				//设置提交 路径 
				options.url=basePath+"/bask_move/add_bask";
				
				$(this).ajaxSubmit(options);
				//设置 提交 时不刷新，用于显示 错误提示        
				return false;
			});
			
						
		});
		
		

		function showRequest(formData, jqForm, options) {
			//处理提交时 验证
		 

			return true;

		}

		function showResponse(responseText) {
			//处理回调 函数 
 
		}
	</script>

<title>Insert title here</title>
</head>
<body>

	${msg}

<form id="addCustomMade" method="post" enctype="multipart/form-data" >
	
 
		<div class="mar-b-05 position-relative">
			<label class="width-25 mar-r-03 text-right fl mar-t-02">上传尺寸图:</label>
			<div class="position-relative fl">
				<input type="text" class="input2 fl" id="test" name="userid"><br>
				<input type="text" class="input2 fl" id="test" name="type"><br>
				<input type="text" class="input2 fl" id="test" name="content"><br>
				<input type="file" value="浏览"   name="imgi" id="f1"    />
			</div>

			<div class="clear"></div>
		</div>
<!-- onclick="sendAjaxRequest('/uploda_test2')" --> 
		<button  class="button3 margin0auto" id="sdf" type="submit"  >提交</button>
		
		
		<span id="msg"></span></p> 

	</form>
	





</body>
</html>