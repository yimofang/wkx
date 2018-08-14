<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
	pageContext.setAttribute("scrPath",path);
	//{pageContext.request.contextPath}  {scrPath}
	
%>

<link href="${scrPath}/pcadmin/images/favicon.ico" rel="shortcut icon">
<!-- 公共CSS部分 -->
<!--easyUI选项卡-->
<link href="${scrPath}/pcadmin/css/easyui.css" rel="stylesheet" type="text/css">
<!--layUI样式表-->
<link href="${scrPath}/pcadmin/jslib/layui/css/layui.css" rel="stylesheet" type="text/css">
<link href="${scrPath}/pcadmin/jslib/bootstrap-3.3.5-dist/css/bootstrap.css" rel="stylesheet" type="text/css">
<!--扩展字体图标-->
<link href="${scrPath}/pcadmin/css/font-awesome.css" rel="stylesheet" type="text/css">
<link href="${scrPath}/pcadmin/fonts/dribbble-font-icon/iconfont.css" rel="stylesheet" type="text/css">
<!--右侧菜单样式表-->
<link href="${scrPath}/pcadmin/css/style.css" rel="stylesheet" type="text/css">
<!--主页样式表-->
<link href="${scrPath}/pcadmin/css/index.css" rel="stylesheet" type="text/css">
<!--自定义组件样式表-->
<link href="${scrPath}/pcadmin/css/dribbbleUI.css" rel="stylesheet" type="text/css">
<!--H5动画效果-->
<link href="${scrPath}/pcadmin/css/animate.css" rel="stylesheet" type="text/css">
<!-- bootstrap表格控件 -->
<link href="${scrPath}/pcadmin/css/bootstrap-table.css" rel="stylesheet" type="text/css">
<!-- bootstrap-tree控件 -->
<link rel="stylesheet" type="text/css" href="${scrPath}/pcadmin/css/bootstrap-treeview.css"/>
<!-- 表单文件上传 -->
<link rel="stylesheet" type="text/css" href="${scrPath}/pcadmin/css/uploadImg.css"/>
<!-- 公共JS部分 -->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery/jquery-1.12.3.js" ></script>
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery/jquery-ui.min.js"></script>
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/bootstrap-3.3.5-dist/js/bootstrap.js"></script>
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/layui/layui.js"></script>
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/echarts.js"></script>
<!--easyUITab选项卡-->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.easyui.min.js"></script>
<!--左侧折叠菜单-->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.metisMenu.js"></script>

<script type='text/javascript' src="${scrPath}/pcadmin/jslib/pace.min.js"></script>

<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.particleground.js"></script>
<!-- bootstrap-tree控件 -->
<script src="${scrPath}/pcadmin/jslib/bootstrap-treeview.js"></script>
<!-- bootstrap表格控件 -->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/bootstrap-table.js"></script>
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/bootstrap-table-zh-CN.js"></script>
<!-- 自定义公共方法js -->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.myExtend.method.js"></script>
<!-- 自定义控件库 -->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.myExtend.plugin.js"></script>
<!-- 自定义jQuery控件库 -->
<script type='text/javascript' src="${scrPath}/pcadmin/jslib/jquery.myFn.plugin.js"></script>
<!-- 全局通用文件 -->
<script type='text/javascript' src="${scrPath}/pcadmin/js/common.js"></script>

<script type="text/javascript">var contextPath = "${scrPath}";</script>


