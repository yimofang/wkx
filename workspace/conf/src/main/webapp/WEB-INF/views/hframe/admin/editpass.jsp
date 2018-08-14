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

<title>修改密码</title>
<meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
<meta name="description"
	content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">

<link rel="shortcut icon" href="favicon.ico">
<link href="${scrPath}/hframe/css/bootstrap.min.css?v=3.3.6"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/font-awesome.css?v=4.4.0"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/plugins/iCheck/custom.css"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/animate.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/style.css?v=4.1.0" rel="stylesheet">

<!-- 全局js -->
<script src="${scrPath}/hframe/js/jquery.min.js?v=2.1.4"></script>

<!-- 自定义js -->
<script src="${scrPath}/hframe/js/content.js?v=1.0.0"></script>

<!-- iCheck -->
<script src="${scrPath}/hframe/js/plugins/iCheck/icheck.min.js"></script>

<!-- jQuery Validation 验证控件-->
<script
	src="${scrPath}/hframe/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${scrPath}/hframe/js/plugins/validate/messages_zh.min.js"></script>
<!-- 自定义 验证 -->
<script src="${scrPath}/js/xb_additional-methods.js"></script>

</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-sm-12">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>修改密码</h5>
						<div class="ibox-tools"></div>
					</div>

					<div class="ibox-content">
						<form class="form-horizontal" id="signupForm"
							action="${basePath }/admin/editpass.do"
							enctype="application/x-www-form-urlencoded" method="post">
							<input type="hidden" name="id" value="${ids}">
							<!-- 分割线 -->
							<div class="hr-line-dashed"></div>

							<div class="form-group">
								<div class="col-sm-8">${errorMsg}</div>
							</div>

							<div class="form-group">
								<label class="col-sm-2 control-label">旧密码：</label>
								<div class="col-sm-8">
									<!-- 验证信息 直接 写在 控件内 required="true" rangelength="2,10"  -->
									<input id="pass_j" name="pass_j" class="form-control"
										type="password" required="true" rangelength="2,10" value="" placeholder="当前登录密码"/>
								</div>
							</div>
							<!-- 分割线 -->
							<div class="hr-line-dashed"></div>

							<div class="form-group">
								<label class="col-sm-2 control-label">新密码：</label>
								<div class="col-sm-8">
									<input id="pass_new" name="pass_new" class="form-control"
										type="password" value="" placeholder="位数至少6位"/>
								</div>
							</div>
							<!-- 分割线 -->
							<div class="hr-line-dashed"></div>

							<div class="form-group">
								<label class="col-sm-2 control-label">再次输入：</label>
								<div class="col-sm-8">
									<input id="pass_to" name="pass_to" class="form-control"
										type="password" placeholder="与新密码保持一致"/>
								</div>
							</div>
							<div class="hr-line-dashed"></div>

							<div class="form-group">
								<div class="col-sm-4 col-sm-offset-2">
									<input type="submit" class="btn btn-primary" value="提交 ">
									<button class="btn btn-white" type="submit"
										onclick="history.go(-1)">取消</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
