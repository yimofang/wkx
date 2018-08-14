<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
	pageContext.setAttribute("scrPath",path);
	//{pageContext.request.contextPath}  {scrPath}
%>
  <title>登录</title> 
  <jsp:include page="common/includeCommon.jsp"></jsp:include>

  <link href="${scrPath}/pcadmin/css/login.css" rel="stylesheet" type="text/css"/>  
  <script type='text/javascript' src="${scrPath}/pcadmin/js/login.js"></script>
  <script type="text/javascript">var contextPath = "${scrPath}";</script>
</head>
<!--bodyBg dri-login-bg-->
<body class="dri-login-bg login-bg-3" onkeydown="keyDownBody(event)">
<!--CanvasBg-->
<div id="particles"></div>
	<!--登录框-->
    <div class="loginbox animated col-lg-3 col-md-4 col-sm-5 col-xs-10">
    	<h4 class="dri-title-shadow login-border">平台<strong class="dri-title-shadow">Intelligent safety platform</strong></h4>
        <section class="login-main">
        	<form id="login" class="form-group">
            	<div class="input-group">
                	<span class="input-group-btn"><label class="btn btn-default iconfont icon-user btn-lg login-input-icon"></label></span>
                	<input type="text" id="logincode" class="form-control input-md" placeholder="请输入登录名" style="height: 43px;">
                </div>
                <div class="input-group">
                	<span class="input-group-btn"><label class="btn btn-default iconfont icon-key btn-lg login-input-icon"></label></span>
                	<input type="password" id="passWord" class="form-control input-md" placeholder="请输入密码" style="height: 43px;">
                </div>
                <div class="input-group ">
	                <span class="input-group-btn"><label class="btn btn-default btn-lg login-input-icon">验</label></span>
	                <input type="text" id="reqVerifyCode" class="form-control input-md" placeholder="请输入验证码">
	                <span class="input-group-addon" style="width:100px;padding: 0px;border: 0px">
	                	<img id="verifyCode" class="img-rounded" style="width: 100%;"  src="" onclick="getVerifyCode()"></span>
                </div>
            </form>
        </section>
        <section class="row center-block">
        	<div class="col-lg-1 col-md-1 col-xs-1"></div>
            <button class="btn dri-btn-login dribbble-btn dri-blue-green-shadow col-lg-10 col-md-10 col-xs-10" onclick="onLogin()">
            	<div class="c-ripple js-ripple">
            		<span class="c-ripple__circle"></span>
       			</div>
                <div class="dri-btn-gra dri-btn-blue-green"></div>
                登&nbsp;录${pageContext.request.contextPath}
            </button>
            	<div class="col-lg-1 col-md-1 col-xs-1"></div>
                <div class="clearfix"></div>
            <div class="login-footer-top"><a href="#" class="col-lg-6 col-sm-6 col-xs-6 col-md-6 text-center" onclick="regUser()">用户注册</a><a href="#" class="col-lg-6 col-sm-6 col-xs-6 col-md-6 text-center">忘记密码</a></div>
        </section>
    </div>
    <!--底部栏-->
    <footer class="login-footer dri-title-shadow"><p></p></footer>
    <!--右下角提示弹窗-->
		<!--<div class="alert_tip" style="display: block;">
			<div class="close_butt">
					
					<span class="tip-title">&nbsp;&nbsp;</span>
					
			</div>
			<div class="tips_text" ></div>
		</div>-->
</body>
</html> 