		<script type="text/javascript">var roleId = <%=request.getParameter("roleId")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/role/roleManageTag.js"></script>
		
		<div style="height:370px;width:100%;overflow-y:scroll;" id="roleManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="roleManageInfo" >
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">角色名称</label>
								<div class="layui-input-block ">
									<input id="name" type="text" name="name" lay-verify="title" autocomplete="off" maxlength="20"
									placeholder="请输入角色名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">上级角色</label>
								<div class="layui-input-block">
									<input type="hidden" name="pid" id="pid" value="">
									<input id="pName" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getRoleId()" onkeyup="cleanInput(this.id)">
									<div id="roleTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">所属部门</label>
								<div class="layui-input-block">
									<input type="hidden" name="departid" id="departid" value="">
									<input id="orgName" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getOrganId()" onkeyup="cleanInput(this.id)">
									<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">角色描述</label>
								<div class="layui-input-block">
								  <textarea id="remark" name="remark" placeholder="请输入内容" class="layui-textarea form-control"></textarea>
								</div>
						</div>
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateRoleManage()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
