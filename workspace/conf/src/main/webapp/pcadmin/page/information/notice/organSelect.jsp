	<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>	  
	<script type="text/javascript">var noticeId = <%=request.getParameter("noticeId")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/information/notice/organSelect.js"></script>
			
		<div class="container-fluid animated fadeInLeft" style="padding-left: 35px;padding-right: 35px;padding-top: 10px;">
			<form id="functionInfo" >
				<input type="hidden" name="noticeId" id="noticeId" value="">
				<div id="functionList"></div>						
				<div class="layui-form-item pull-right"style="margin-top: 20px;margin-bottom: 0px;">
					<button type="button" class="btn btn-primary" onclick="submitFunConfig()">
	  					<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>选择
					</button>
					<button type="button" class="btn btn-default" onclick="closeDialog()">
		  				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
					</button>
				</div>				
			</form>
		</div>
