		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/enterprise/enterpriseManageTag.js"></script>

		<div style="height:310px;width:100%;overflow-y:scroll;" id="enterpriseManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="enterpriseInfo">
						<div class="layui-form-item">
							<label class="layui-form-label">企业名称</label>
								<div class="layui-input-block ">
								  <input id="ename" type="text" name="ename" lay-verify="title" autocomplete="off" maxlength="30"
								  placeholder="请输入企业名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">登录名</label>
								<div class="layui-input-block ">
								  <input id="loginCode" type="text" name="loginCode" lay-verify="title" autocomplete="off" maxlength="20"
								  placeholder="请输入登录名" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item layui-form-text"> 
							<label class="layui-form-label">上级企业</label>
								<div class="layui-input-block">
								  <select id="pEnterPrise" name="pid" class="form-control"></select>
								</div>
						</div> 
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateEnterprise()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
		
