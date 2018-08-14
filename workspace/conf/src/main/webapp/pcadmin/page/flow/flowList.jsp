<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/flowList.js"></script>
<script>
	/* layui.use('laydate', function(){
	  layui.laydate.render({
	    elem: '#creatFlowTime #create_time', //指定元素
	    type: 'datetime'
	  });
	  layui.laydate.render({
	    elem: '#creatFlowTime #end_create_time', //指定元素
	    type: 'datetime'
	  });
	}); */
</script>
<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
	<!-- 上部分搜索区 -->
	<div class="dri-panel panel-success">
		<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
			<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
		</div>
		<div class="panel-body panel-collapse collapse">
			<!-- 搜索表单 -->
			<form id="formSearch" class="form-horizontal">
				<!-- 多行搜索项 -->
				<div class="form-group">
					<label for="serial_code" class="col-sm-2 control-label">流程编号</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="serial_code" name="serial_code" placeholder="请输入要搜索的编号">
					</div>
				</div>
				<div class="form-group">
					<label for="name" class="col-sm-2 control-label">流程名称</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="name" name="name" placeholder="请输入要搜索的名称">
					</div>
				</div>
				<div class="form-group">
					<label for="sts" class="col-sm-2 control-label">流程状态</label>
					<div class="col-sm-3">
						<select name="sts" id="sts" class="form-control">
							<option value=""></option>
							<option value="0">正常</option>
							<option value="1">完结归档</option>
							<option value="2">挂起</option>
						</select>
						
					<!--	<label class="checkbox-inline checkbox-primary">
							  	<input type="checkbox" id="inlineCheckbox1" value="option1">正常
							</label>
						<label class="checkbox-inline">
								<input type="checkbox" id="inlineCheckbox2" value="option2">关闭
							</label>-->
					</div> 

				</div>
				<div class="form-group" id="creatFlowTime">
					<label for="create_time" class="col-sm-2 control-label">流程创建时间</label>
					<div class="col-sm-5">
						<div class="col-sm-5" style="padding-left: 0px;">
							<input type="text" class="form-control" id="create_time" name="begin_create_time">
						</div>
						<label class="col-sm-1 control-label" style="text-align: center;" for="tttt">到</label>
						<div class="col-sm-5" id="tttt">
							<input type="text" class="form-control" id="end_create_time" name="end_create_time">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-2"></div>
					<div class="col-sm-3">
						<a class="btn dribbble-btn dribbble-btn-primary btn-lg " onclick="searchBut($.myMethod.getCurTab().id,$('#homeTabs').tabs('getSelected').panel('options').href.split('=')[1])">
							<span class="fa fa-search dri-icon-r-md"></span>搜索</a>
						<!-- 重置 -->
						<button class="btn dribbble-btn dribbble-btn-primary btn-lg "  style="margin-left:20px" type="reset">
							<span class="fa fa-search dri-icon-r-md"></span>重置</button>
					</div>
					<!-- 带图标按钮 -->

				</div>
				<!--检索end-->
			</form>
		</div>
	</div>
	<!-- 下部分内容区 -->
	<div class="dri-panel panel-info">
		<div class="panel-heading">表单内容</div>
		<div class="panel-body" style="padding-top:0">
			<table id="userList">
				<div id="createFlow">
					<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-btn-block dri-animate-vertical hidden-xs pull-left" id="testtwo9" data-type="dialog9" onclick="openWind($.myMethod.getCurTab().id,$('#homeTabs').tabs('getSelected').panel('options').href.split('=')[1])">
						<span class="fa fa-plus dri-icon-r-md"></span>
						<div class="c-ripple js-ripple">
							<span class="c-ripple__circle"></span>
						</div>
						创建流程
					</a>
				</div>
			</table>
		</div>
	</div>
	<!--页面内部弹出框-->
	<div id="dlgSubmit" style="margin-top: 220px;" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">新建流程</h4>
				</div>
				<div class="modal-body col-sm-10 col-sm-offset-1" style="overflow: hidden;min-height: 200px;">
					<div id="entContainer" class="container-fluid">
						<div class="layui-form-item">
							<label class="layui-form-label">流程编号</label>
							<div class="layui-input-block">
								<input type="text" readonly="readonly" name="title" lay-verify="title" autocomplete="off" placeholder="请输入编号" class="layui-input form-control">
							</div>
						</div>
						<div class="layui-form-item">
							<label class="layui-form-label">流程名称</label>
							<div class="layui-input-block">
								<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入名称" class="layui-input form-control">
							</div>

						</div>
						<div class="layui-form-item">
							<label class="layui-form-label">流程类型</label>
							<div class="layui-input-block">
								<select name="modules" lay-verify="required" lay-search="" id="selectOption" class="form-control" disabled="disabled">
								<option>123</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" id="dlgSubmitBtn" class="btn btn-default" data-dismiss="modal">提交<tton>
		        	<button type="button" class="btn btn-default" data-dismiss="modal">返回<tton>
		      	</div>
		    </div>
		  </div>
		</div>
	</div>