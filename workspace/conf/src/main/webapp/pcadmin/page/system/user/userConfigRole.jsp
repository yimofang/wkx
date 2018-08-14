		<script type="text/javascript">var userId = <%=request.getParameter("userId")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/user/userConfigRole.js"></script>

		<div style="height:560px;width:100%;overflow-y:scroll;">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 35px;padding-right: 35px;padding-top: 10px;">
				<form id="configRoleInfo" >
					<input type="hidden" name="userId" id="userId" value="">
					<div id="roleList"></div>						
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="submitUserRoleConfig()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>