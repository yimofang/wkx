		<script type="text/javascript">var menuId = <%=request.getParameter("menuId")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/menu/functionConfig.js"></script>
		
		<div style="height:560px;width:100%;overflow-y:scroll;">	
			<div class="container-fluid animated fadeInLeft" style="padding-left: 35px;padding-right: 35px;padding-top: 10px;">
				<form id="functionInfo" >
					<input type="hidden" name="menuId" id="menuId" value="">
					<div id="functionList"></div>						
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="submitFunConfig()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>