<!-- 首页-个人中心-修改密码 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/user/password.js"></script>
	<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
		<form id="userPassWord" >           
		         <div class="layui-form-item">
		    		<label class="layui-form-label">原密码</label>
		                <div class="layui-input-block">
		                    <input type="password" id="oldPwd" name="oldPwd" lay-verify="title" onblur="isNull(this.value,this.id)" maxlength="18" autocomplete="off" placeholder="请输入原密码" class="layui-input form-control">
		                </div>
		         </div>
		            
		         <div class="layui-form-item">
		    		<label class="layui-form-label">新密码</label>
		                <div class="layui-input-block">
		                    <input type="password" id="newPwd" name="newPwd" lay-verify="title" onblur="isNull(this.value,this.id)" maxlength="18" autocomplete="off" placeholder="请输入新密码" class="layui-input form-control">
		                </div>
		         </div>
		             
		         <div class="layui-form-item">
		    		<label class="layui-form-label">确认新密码</label>
		                <div class="layui-input-block">
		                    <input type="password" id="newPwd1" name="newPwd1" lay-verify="title" onblur="isNull(this.value,this.id)" maxlength="18" autocomplete="off" placeholder="请确认新密码" class="layui-input form-control">
		                </div>
		         </div>
		</form>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updatePassWord()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>
