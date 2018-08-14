<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html><head>
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

<title>主页</title>

<jsp:include page="common/includeCommon.jsp"></jsp:include>
<script type="text/JavaScript" src="${scrPath}/pcadmin/js/index.js"></script>
<script type="text/javascript" src="${scrPath}/pcadmin/jslib/dri-menu.js"></script>
<script type="text/javascript">var contextPath = "${scrPath}";</script>
</head>

<body class="dribbble-height">
 	<!--导航Start-->
    <header class="row">
    	<nav class="navbar navbar-fixed-top dribbble-nav">
        	<div class="container-fluid">
            	<div class="navbar-header">
                	<!--logo-->
                	<div class="navbar-brand hidden-xs">
                    	<div id="enterName" class="dribbble-logo"  style="font-size: 24px;"><span class="fa fa-dribbble dri-icon-r-lg"></span></div>
                    </div>
                    <div class="navbar-brand visible-xs dri-phone-logo">
                    	<div class="dribbble-logo"><span class="fa fa-dribbble dri-icon-r-lg"></span>BribbbleUI</div>
                    </div>
                    <!--折叠-->
                    <div class="navbar-toggle dri-navbar-toggle" data-toggle="collapse" data-target="dribbbleNav" id="phoneMenu">
                    	<div class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v"></span></div>
                        <ul class="dropdown-menu animated fadeInUp">
                            <li><a href="#">消息提醒</a></li>
                            <li><a href="#">下载APP</a></li>
                            <li><a href="#">帮助</a></li>
                            <li><a href="#">退出</a></li>
                        </ul>
                    </div>
                </div>
                <!-- 顶部滚动条 -->
                <div style="position: absolute;width: 50%;top: 10px;left: 20%;font-size: 15px;">
                	<marquee direction="left" behavior="scroll" scrolldelay="50">${scrPath}我是旺仔牛仔我是旺仔牛奶我是旺仔牛奶</marquee>
                </div>
                <!--顶部功能菜单-->
                <div class="collapse navbar-collapse" id="dribbbleNav">                    
                    <ul class="nav navbar-nav navbar-right dri-top-nav-list">
                    	<!--  <li>
                    	 	<input type="button" value="新建推送" class="dropdown-toggle dri-top-nav-icon iconfont icon-leaf" data-toggle="dropdown" onclick="addPushMsg()">
                        </li> -->
                    	<li>
                        	<a class="dropdown-toggle dri-top-nav-icon iconfont icon-leaf" data-toggle="dropdown" id="driCloth"></a>
                            <ul class="dropdown-menu animated fadeInUp">
                            	<li><strong></strong><span href="#">默认</span></li>
                                <li><strong></strong><span href="#">White</span></li>
                            </ul>
                        </li>
                        <li>
                        	<a class="dropdown-toggle dri-top-nav-icon iconfont icon-bell" data-toggle="dropdown"><small id="notCheckMessage" class="dri-top-nav-message"></small></a>
                            <div class="dropdown-menu animated fadeInUp dri-message-boxlist">
								<div class="message-title"><span>共有<abbr id="newMsgNum" class="text-danger"></abbr>条新消息</span><a onclick="addMessageTab()">全部</a></div>
								<dl id="dl">

								</dl>
                            </div>
                        </li>
                        <li>
                        	<a class=" dropdown-toggle dri-top-nav-icon iconfont icon-qrcode" data-toggle="dropdown" id="driQrcode"></a>
                            <div class="dropdown-menu animated fadeInUp">
                            	<div class="dri-qrcode-box"><img src="images/code.jpg"></div>
                                <div class="text-center">
                                	<button class="btn dribbble-btn dribbble-btn-primary btn-lg dri-animate-vertical">
                                        <span class="iconfont icon-phone-1 dri-icon-r-lg"></span>
                                        企业端下载
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                        	<a id="edithometool" class="dri-top-nav-icon iconfont icon-lock" onclick="edithome()"></a>
                        </li>
                        <li>
                        	<a class="dri-top-nav-icon fa fa-question-circle"></a>
                        </li>
                        <li>
                        	<a class="dri-top-nav-icon iconfont icon-exit" onclick="logout()"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <!--导航End-->
    <!--主界面Start-->
    <div class="dribbble-main">
    	<!--左侧导航Start-->
        <nav class="navbar-static-side" role="navigation">
            <div class="nav-close">
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element" style="position:relative;">
                            	 <span class="fa fa-bars fa-inverse navbar-minimalize minimalize-styl-2"></span>
                                 <div class="dri-avatar-box">
                                 	<div class="dri-avatar"><img src="" class="img-circle" id="headimage"></div>
                                    <div class="dri-user">
                                    	
                                    	<div class="dri-username" ><a id="userName">用户名</a></div>
                                        <div class="dri-organ-box">
                                        	<div class="btn-group btn-block dri-dropdown" >
                                              <button class="dropdown-toggle btn dribbble-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <em>个人中心</em>
                                                <span class="caret"></span>
                                              </button>
                                              <ul class="dropdown-menu mydribbble-dropdown animated fadeInUp">
	                                                <li><a onclick="settings('个人资料')"><span class="glyphicon glyphicon-user dri-icon-r-lg"></span>个人资料</a></li>
	                                                <li><a onclick="settings('修改密码')"><span class="glyphicon glyphicon-lock dri-icon-r-lg"></span>修改密码</a></li>
                                              </ul>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            	<div class="clearfix"></div>
                        </div>
                        <div class="logo-element">
                        	<span class="fa fa-bars fa-inverse navbar-minimalize minimalize-styl-2"></span>
                        </div>
                    </li>
                    <li class="line dk"></li>
                    <li id="mainList" class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">菜单</span>
                    </li>
                    
			        <li>
						<a href="#" onclick="addFirstTab('菜单','${scrPath}/pcadmin/page/exam/training/training.jsp','333','${scrPath}')">
						<i class="iconfont icon-bag"></i> <span class="nav-label">菜单</span></a>
					</li>
					<li>
						<a href="#" onclick="addFirstTab('菜单2','${scrPath}/pcadmin/page/exam/examination/examination.jsp','44','${scrPath}')">
						<i class="iconfont icon-bag"></i> <span class="nav-label">菜单2</span></a>
					</li>
                </ul>
            </div>
        </nav>
        <!--左侧导航End-->
        <!--右侧主界面Start-->
        <section class="tabs-containers"  id="page-wrapper">
			<section style=" height:100%; overflow:visible;">
            	<div id="homeTabs" class="easyui-tabs">
                    
                </div>
                <!--dribbbleTabs End-->
            </section>
        </section>
        <!--右侧主界面End-->
    </div>
	<!--主界面End-->
</body>
</html>
