<script type="text/javascript">var taskId = <%=request.getParameter("taskId")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/task/taskTag.js"></script>
		
		<div style="height:610px;width:100%;overflow-y:scroll;" id="taskTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="taskInfo" >
					<input type="hidden" name="id" id="id" value="">
					<input type="hidden" name="flag" id="flag" value="">
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
								<button type="button" class="" onclick="checkList()" >
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
						<div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
							<input type="text" class="form-control" id="starttimeAdd" name="starttime">
				    	</div>
					</div>
					<div class="layui-form-item" id="endDiv">
						<label class="layui-form-label">任务结束时间</label>
						<div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
							<input type="text" class="form-control" id="endtimeAdd" name="endtime">
				    	</div>
					</div>
					<div class="layui-form-item" id="inspectorDiv">
						<label class="layui-form-label">巡查人</label>
							<div class="layui-input-block ">
								<select id="inspectorAdd" name="inspector" class="form-control"></select>
							</div>
					</div>
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">任务描述</label>
							<div class="layui-input-block">
							  <textarea id="descriptionAdd" name="description" placeholder="请输入内容" class="layui-textarea form-control" maxlength="150"></textarea>
							</div>
					</div>
				</form>
			</div>
		</div>
		<div class="pull-right" style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateTask()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>