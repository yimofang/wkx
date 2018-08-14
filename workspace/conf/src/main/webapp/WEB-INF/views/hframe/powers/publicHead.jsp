
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
<meta name="description"

	content=" ">

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
<script src="${scrPath}/hframe/js/jquery.min.js?v=2.1.4"></script>

<!-- jquery.form 插件 支持ajax文件上传,普通的js ajax 无法文件上传-->
<script type="text/javascript" src="${scrPath}/js/jqueryform.js"></script>
<!--调整目录取值  -->
<input id="basePath_hid" type="hidden" value="${basePath}" />

<script src="${scrPath}/hframe/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<%-- <script src="${scrPath}/hframe/js/content.js?v=1.0.0"></script> --%>

<!-- 上传控件样式 及 js -->
<link href="${scrPath}/css/ajaxFileUpload.css" rel="stylesheet">
<script src="${scrPath}/js/ajaxFileUpload/ajaxfileupload.js"></script>
<!-- 自定义上传 -->
<script src="${scrPath}/js/ajaxFileUpload/ajaxfile_init.js"></script>

<!-- 自定义日期格式化 -->
<script src="${scrPath}/js/formatDate/formatDate.js"></script>

<!-- Bootstrap table -->
<script
	src="${scrPath}/hframe/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script
	src="${scrPath}/hframe/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script
	src="${scrPath}/hframe/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>


<!-- 自定义初始化 bootstrapTable-->
<script type="text/javascript"  src="${scrPath}/js/bootstrapTable_init_sqltools.js"></script>


<!-- Peity -->
<script src="${scrPath}/hframe/js/demo/bootstrap-table-demo.js"></script>

<!-- layerDate 日期控件 javascript -->
<script src="${scrPath}/hframe/js/plugins/layer/laydate/laydate.js"></script>

 

</head>



