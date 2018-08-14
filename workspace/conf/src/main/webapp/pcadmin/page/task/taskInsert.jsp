﻿<script type="text/javascript" src="${pageContext.request.contextPath}/js/task/taskInsert.js"></script>
<script type="text/javascript">
	var flow_id = <%=request.getParameter("flow_id")%>;
	var node_id = <%=request.getParameter("node_id")%>;
	var type = '<%=request.getParameter("type")%>';	
	//console.log("form_id"+form_id);console.log("flow_id"+flow_id);console.log("node_id"+node_id);
</script>
<div class="col-lg-12 dri-row" style="height:880px" id="taskInsert">
	<div class="col-lg-3" style="height:100%;width:40%" id="config-side">
		<div class="panel-body" style="padding-top: 0px;">
			<div style="height:610px;width:100%;overflow-y:scroll;" id="taskTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="taskInfo" >
					<input type="hidden" id="id" name="id">
					<input type="hidden" id="taskId" name="taskid" ><!-- value="41" -->
					<input type="hidden" id="taskbatchid">
					<div class="layui-form-item">
						<label class="layui-form-label">任务名称</label>
							<div class="layui-input-block ">
								<input id="tasknameAdd" type="text" name="taskname" lay-verify="title" autocomplete="off" maxlength="20"
								placeholder="请输入任务名" class="layui-input form-control" onblur="isNull(this.value,this.id)">
							</div>
					</div>
					<div class="layui-form-item" id="taskTypeDiv">
						<label class="layui-form-label">任务类型</label>
							<div class="layui-input-block">
								<select id="tasktypeAdd" name="tasktype" class="form-control" onchange="selectChange()"></select>
							</div>
					</div>
					<input type="hidden" id="taskListIds" name="checkListId">
					<div class="layui-form-item" id="taskListDiv">
						<label class="layui-form-label">巡查清单</label>
						<div class="layui-input-block">
							<!-- <table id="checkListTable"></table> -->
							<!-- <select id="taskListAdd" name="taskList" class="form-control"></select> -->
							<span>
								<input id="taskListNames" name="taskListName" readonly="readonly" style="width:80%;height:34px;padding:6px 12px">
								<button type="button" class="" onclick="checkList('选择清单')" >
									选择清单
								</button>
							</span>
						</div>
					</div>
					<div class="layui-form-item" id="taskcycleDiv">
						<label class="layui-form-label">巡查周期</label>
							<div class="layui-input-block">
								<select id="taskcycleAdd" name="taskcycle" class="form-control"></select>
							</div>
					</div>
					<div class="layui-form-item" id="startDiv">
						<label class="layui-form-label">任务开始时间</label>
						<div class="col-sm-5" >
							<input type="text" class="layui-input form-control" id="starttimeAdd" name="starttime">
				    	</div>
					</div>
					<div class="layui-form-item" id="endDiv">
						<label class="layui-form-label">任务结束时间</label>
						<div class="col-sm-5" >
							<input type="text" class="layui-input form-control" id="endtimeAdd" name="endtime">
				    	</div>
					</div>
					<div class="layui-form-item" id="inspectorDiv">
						<label class="layui-form-label">巡查人</label>
							<div class="layui-input-block ">
								<select id="inspectorAdd" name="inspector" class="form-control"></select>
							</div>
					</div>
					<div class="layui-form-item layui-form-text" id="descriptionDiv">
						<label class="layui-form-label">任务描述</label>
							<div class="layui-input-block">
							  <textarea id="descriptionAdd" name="description" placeholder="请输入内容" class="layui-textarea form-control" maxlength="150"></textarea>
							</div>
					</div>
				</form>
			</div>
		</div>
		<div class="pull-right" style="bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateTask()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
       	</div>
	</div>
	<div class="col-lg-9" style="height:100%;width:60%;overflow: scroll;">
		<div class="dri-panel panel-success">
			<div class="panel-heading">任务详情</div>
			<div class="panel-body" id="config-side-bottom">
				<table id="taskBatchTable"></table>
			</div>
		</div>
		<div class="dri-panel panel-success">
			<div class="panel-heading">清单项详情</div>
			<div class="panel-body" id="config-side-bottom">
				<table id="checkListTable"></table>
			</div>
		</div>
	</div>
</div>

