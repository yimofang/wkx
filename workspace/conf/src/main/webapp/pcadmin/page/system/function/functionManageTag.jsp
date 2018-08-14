		<script type="text/javascript">var funcId = <%=request.getParameter("funcId")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/function/functionManageTag.js"></script>
		
		<div style="height:310px;width:100%;overflow-y:scroll;" id="functionManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="functionManageInfo" >
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">功能名称</label>
								<div class="layui-input-block ">
								  <input id="name" type="text" name="name" lay-verify="title" autocomplete="off" maxlength="20" 
								  placeholder="请输入功能名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">上级功能</label>
								<div class="layui-input-block">
									<input type="hidden" name="pid" id="pid" value="">
									<input id="pName" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getFunctionId()" onkeyup="cleanInput(this.id)">
									<div id="funcTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">功能识别码</label>
								<div class="layui-input-block ">
								  <input id="code" type="text" name="code" lay-verify="title" autocomplete="off"  maxlength="30" 
								  placeholder="请输入功能识别码" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateFunctionManage()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
