	<script type="text/javascript">var organizationId = <%=request.getParameter("organizationId")%>;</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/organization/organizationTag.js"></script>
	
	<div style="height:430px;width:100%;overflow-y:scroll;" id="organizationTag">
		<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
			<form id="organizationInfo" >
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">机构名称</label>
								<div class="layui-input-block ">
									<input id="name" type="text" name="name" lay-verify="title" autocomplete="off" maxlength="30"
									placeholder="请输入机构名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">上级机构</label>
								<div class="layui-input-block">
									<input type="hidden" name="pid" id="pid" value="">
									<input id="pidName" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getOrganId()" onkeyup="cleanInput(this.id)">
									<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">机构类型</label>
								<div class="layui-input-block">
									<select id="type" name="type" class="form-control"></select>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">机构级别</label>
								<div class="layui-input-block">
									<select id="gradelevel" name="gradelevel" class="form-control"></select>
								</div>
						</div>
	
						<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">机构描述</label>
								<div class="layui-input-block">
									<textarea id="deptdes" name="deptdes" placeholder="请输入内容" class="layui-textarea form-control" maxlength="150"></textarea>
								</div>
						</div>
			</form>
		</div>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateOrganization()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>

		
		
		
		
		
		
