<script type="text/javascript">
	var userData = <%=request.getParameter("userData")%>;
</script>
<script type="text/javascript">
	var orgData = <%=request.getParameter("orgData")%>;
</script>
<script type="text/javascript">
	var roleData = <%=request.getParameter("roleData")%>;
</script>
<script type="text/javascript">
	var isLimit = <%=request.getParameter("isLimit")%>;
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/flowSubmitTag.js"></script>
<style type="text/css">
	.tabs-header {
		width: calc(100% - 0) !important;
		top: 0;
	}
	#taskSubTabs{
		height: calc(100% - 70px) !important;
	}
	#taskSubTabs .tabs li a.tabs-inner {
		background-color: #d2d2d2;
	}
	
	#taskSubTabs .tabs .tabs-selected a.tabs-inner {
		background-color: #95c296;
		color: white;
	}
	
	#taskSubTabs .tabs-panels {
		height: calc(100% - 0px) !important;
	}
	
	#taskSubTabs .tabs-scroller-right,
	.tabs-scroller-left,
	#taskSubTabs .tabs-scroller-right,
	.tabs-scroller-right {
		background-color: #95c296;
	}
</style>
<div id="taskSubTabs" style="margin-top:30px;width:100%">
</div>
<div class="pull-right" style="position:absolute;bottom:0;right:60px">
	<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="submitAlert()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
	<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
</div>