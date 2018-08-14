		<script type="text/javascript">var userId = <%=request.getParameter("userId")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/user/userManageTag.js"></script>
		
		<div style="height:610px;width:100%;overflow-y:scroll;" id="userManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="userManageInfo" >
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">用户名称</label>
								<div class="layui-input-block ">
									<input id="name" type="text" name="name" lay-verify="title" autocomplete="off" maxlength="20"
									placeholder="请输入用户名" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item" id="display">
							<label class="layui-form-label">所属部门</label>
								<div class="layui-input-block">
									<input type="hidden" name="departmentid" id="departmentid" value="">
									<input id="depName" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getOrganId()" onkeyup="cleanInput(this.id)">
									<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">登录名</label>
								<div class="layui-input-block ">
								  <input id="logincode" type="text" name="logincode" lay-verify="title" autocomplete="off"  maxlength="20"
								  placeholder="请输入登录账号" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">密码</label>
								<div class="layui-input-block ">
								  <input id="password" type="password" name="password" maxlength="18" lay-verify="title" autocomplete="off" 
								  placeholder="请输入密码" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">确认密码</label>
								<div class="layui-input-block">
								  <input id="password1" type="password" name="password1" maxlength="18" lay-verify="title" autocomplete="off" 
								  placeholder="请再次输入密码" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
	
						<div class="layui-form-item">
							<label class="layui-form-label">性别</label>
								<div class="layui-input-block">
									<select id="sex" name="sex" class="form-control"></select>
								</div>
						</div>
	
						<div class="layui-form-item">
							<label class="layui-form-label">邮箱</label>
								<div class="layui-input-block">
									<input id="email" type="text" name="email" lay-verify="title" maxlength="25"
										autocomplete="off" placeholder="请输入邮箱" value="" class="layui-input form-control">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">联系电话</label>
								<div class="layui-input-block">
								  <input id="tel" type="text" name="tel" lay-verify="title" autocomplete="off"  maxlength="13"
								  placeholder="请输入联系电话" class="layui-input form-control">
								</div>
						</div>
						
						<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">备注</label>
								<div class="layui-input-block">
								  <textarea id="remark" name="remark" placeholder="请输入内容" class="layui-textarea form-control" maxlength="150"></textarea>
								</div>
						</div>
				</form>
			</div>
		</div>
		<div class="pull-right" style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateUserManage()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
