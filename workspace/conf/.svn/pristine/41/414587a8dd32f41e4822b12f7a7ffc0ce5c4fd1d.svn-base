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
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<title>后台管理系统</title>
<!--     <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    -->
<!-- H+依赖 css -->
<link href="${scrPath}/hframe/css/bootstrap.min.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/font-awesome.css?v=4.4.0"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/animate.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/style.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/login.css" rel="stylesheet">
<script>
	if (window.top !== window.self) {
		window.top.location = window.location;
	}

	//禁止后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function() {
		history.pushState(null, null, document.URL);

	});
</script>
<script type="text/javascript">
	function checkform(form) {
		var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
		
		if (form.phone.value == '') {
			alert("请输入帐号!");
			return false;
		}
	/* 	if(!reg.test(form.phone.value)){
			alert("帐号不正确!");
			return false;
		} */
		if (form.pass.value == '') {
			alert("请输入密码!");
			return false;
		}
		return true;
	}
</script>
</head>

<body class="signin">
	<div class="signinpanel"
		style="margin: 0 auto; width: 720px; position: fixed; margin-left: -360px; left: 50%; _margin-left: 360px; _left: -50%; *margin-left: 360px; *left: -50%; margin-top: 200px;">
		<div class="row">
			<div class="col-sm-7"
				style="width: 400px; padding: 0px; _float: left; *float: left;">
				<div class="signin-info">
					<img alt="" src="${scrPath}/img/caozuo.gif" style="width: 400px" />
					<div class="logopanel m-b">
						<h1></h1>
					</div>
					<div class="m-b"></div>
					<h4>
						<strong>我与公司荣辱与共，公司与我共同发展</strong>
					</h4>


					<ul class="m-b">
						<!--   <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i>我与公司荣辱与共，公司与我共同发展</li> -->
						<!--  <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势二</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势三</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势四</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势五</li> -->
					</ul>
					<!--   <strong>还没有账号？ <a href="#">立即注册&raquo;</a></strong> -->
				</div>
			</div>
			<div class="col-sm-5"
				style="width: 295px; padding: 0px; float: right;">
				<form method="post" action="${basePath}/admin/adminlogin.do"
					onsubmit="return checkform(this)">
					<h3 class="no-margins">后台管理系统</h3>
					<p class="m-t-md">
						<span style="color: #b22222;"> <c:if test="${msg!=null}">
	                    ${msg}
	                    </c:if>


						</span>
					</p>
					<input type="text" class="form-control uname" placeholder="帐号"
						name="username" /> <input type="password"
						class="form-control pword m-b" placeholder="密码" name="pass" />
					<!--   <a href="">忘记密码了？</a> -->
					<button class="btn btn-success btn-block" type="submit">登录</button>
				</form>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="signup-footer">
			<div class="pull-left">
				<!--    &copy; 2015 All Rights Reserved. H+ -->
			</div>
		</div>
	</div>
</body>

</html>
