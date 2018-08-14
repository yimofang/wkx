		<script type="text/javascript">var roleId = <%=request.getParameter("roleId")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/role/roleConfig.js"></script>

		<div style="height:560px;width:100%;overflow-y:scroll;">	
			<div class="container-fluid animated fadeInLeft" style="padding-left: 35px;padding-right: 35px;padding-top: 10px;">
				<form id="roleMenuFunctionInfo" >
					<input type="hidden" name="roleId" id="roleId" value="">
					<div id="roleMenuFunctionList"></div>
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="submitRoleConfig()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>