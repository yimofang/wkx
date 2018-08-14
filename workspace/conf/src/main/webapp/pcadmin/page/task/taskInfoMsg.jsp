<script type="text/javascript" src="${pageContext.request.contextPath}/js/task/taskInfoMsg.js"></script>
<div class="col-lg-12 dri-row" style="height:880px" id="taskInfoMsg">
	<input type="hidden" id="taskbatchid">
	<input type="hidden" id="taskbatchListid">
	<div class="col-lg-3" style="height:100%;width:40%" id="config-side">
		<div class="panel-body" style="padding-top: 0px;">
       		<table id="taskBatchTable">
       			
       		</table>
       	</div>
	</div>
	<div class="col-lg-9" style="height:100%;width:60%;overflow: scroll;">
		<div class="dri-panel panel-success">
			<div class="panel-heading">清单详情</div>
			<div class="panel-body" id="config-side-bottom">
				<table id="checkListTable"></table>
			</div>
		</div>
		<div class="dri-panel panel-success">
			<div class="panel-heading">清单项详情</div>
			<div class="panel-body" id="config-side-bottom">
				<table id="checkItemTable"></table>
			</div>
		</div>
	</div>
</div>

