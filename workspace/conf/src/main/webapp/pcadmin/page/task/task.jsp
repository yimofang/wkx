<!-- 首页-主菜单-权限管理-用户管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/task/task.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll" id="userManage">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="userManageSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 0px;">
					    <label for="flowname" class="col-sm-1 control-label">任务名称</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="taskname" name="taskname" placeholder="请输入要搜索的名称">
					    </div>
					</div>
					<!-- <div class="form-group" style="margin-bottom: 5px;">
						<label for="flowname" class="col-sm-1 control-label">任务类型</label>
					    <div class="col-sm-3">
					     	 <select id="tasktype" name="tasktype" class="form-control">
					     	 </select>
					    </div>
					</div>
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">任务周期</label>
					    <div class="col-sm-3">
					     	 <select id="taskcycle" name="taskcycle" class="form-control">
					     	 </select>
					    </div>
					</div> -->
					<div class="form-group" style="margin-bottom: 0px;">
					    <label for="flowname" class="col-sm-1 control-label">任务开始时间</label>
					    <div class="col-sm-4">
						    <div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
								<input type="text" class="form-control" id="creStartTime">
						    </div>
						    <label class="col-sm-1 control-label" style="text-align: center;" for="tttt">到</label>
						    <div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
								<input type="text" class="form-control" id="creEndTime">
						    </div>
					    </div>
					</div>					
					<div class="form-group form-inline" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-lg-11">
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchTable()">
					    		<span class="fa fa-search dri-icon-r-md"></span>搜索</button>
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="reset">
					    		<span class="glyphicon glyphicon-repeat dri-icon-r-md"></span>重置</button>
					    </div>
					</div>
                    <!--检索end-->
                </form>
			</div>
		</div>
        <!-- 下部分内容区 -->
        <div class="dri-panel panel-info">
        	<div class="panel-heading">表单内容</div>
        	<div class="panel-body" style="padding-top: 0px;">
        		<table id="taskList">
        			<div id="addTaskBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addtask" onclick="taskTag('添加任务')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加任务
						</a>
					</div>
        		</table>
        	</div>
        </div>
	</div>