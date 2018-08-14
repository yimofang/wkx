<!-- 首页-个人中心-个人资料修改 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/user/userInfo.js"></script>
	<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
			<form id="userInfo">
			<input id="id" name = "id" type="hidden">
			<input id="headimage" name = "headimage" type="hidden">
							<div class="layui-form-item">
								<label class="layui-form-label">登录名</label>
								<div class="layui-input-block">
									<input id="logincode" type="text" name="logincode" lay-verify="title"
										autocomplete="off" class="layui-input form-control"  readonly>
								</div>
							</div>
							<div class="layui-form-item">
								<label class="layui-form-label">用户名</label>
								<div class="layui-input-block">
									<input id="name" type="text" name="name" lay-verify="title" maxlength="20" onblur="isNull(this.value,this.id)"
										autocomplete="off" placeholder="请输入用户名" value="" class="layui-input form-control">
								</div>
							</div>
							<div class="layui-form-item">
								<label class="layui-form-label">联系电话</label>
								<div class="layui-input-block">
									<input id="tel"type="text" name="tel" lay-verify="title" maxlength="13"
										autocomplete="off" placeholder="请输入固定电话或手机号" value="" class="layui-input form-control">
								</div>
							</div>
							<div class="layui-form-item">
								<label class="layui-form-label">性别  </label>		
								<div class="radio" style="margin-left: 132px;padding-top: 10px;">	
									<span style="margin-top:20px">
										<input type="radio" name="sex" id="male" value="4">
										<label for="male" style="padding-left: 0;" > 男 </label>
									</span>
									<span style="margin-left: 24px;">
										<input type="radio" name="sex" id="Female" value="5">
										<label for="Female" style="padding-left: 0;" > 女 </label>
									</span>
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
								<label class="layui-form-label">备注</label>
								<div class="layui-input-block">
									<input id="remark" type="text" name="remark" lay-verify="title" maxlength="30"
										autocomplete="off" placeholder="请输入备注" value="" class="layui-input form-control">
								</div>
							</div>	
							<div class="layui-form-item">
								<label class="layui-form-label">头像</label>
								<div class="layui-input-block layui-upload">
								 	 <button type="button" class="layui-btn" id="uploadAvatar">上传头像</button>
								 	 <input class="layui-upload-file" type="file" name="file">
								 	 <div class="layui-upload-list">
								    	<img id="uploadReading" style="width:92px; height:92px; margin:0 10px 10px 0;">
								    	<p id="uploadText"></p>
								 	 </div>
								</div> 
							</div>
		</form>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateUserInfo()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>修改
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>