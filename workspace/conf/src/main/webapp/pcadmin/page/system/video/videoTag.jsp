		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/video/videoTag.js"></script>
		<div style="height:610px;width:100%;overflow-y:scroll;" id="videoTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="videoInfo" >
					<input type="hidden" id="url" name="url">
					<div class="layui-form-item">
						<label class="layui-form-label">视频名称</label>
							<div class="layui-input-block ">
								<input id="name" type="text" name="name" lay-verify="title" autocomplete="off" maxlength="20"
								placeholder="视频名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
							</div>
					</div>
					<div class="layui-form-item" id="display">
						<label class="layui-form-label">视频类型</label>
							<div class="layui-input-block">
								<input type="hidden" name="pid" id="pid" value="">
								<input id="pname" type="text" lay-verify="title" autocomplete="off"
									placeholder="点击选择" class="layui-input form-control" onclick="getVideoId()" onkeyup="cleanInput(this.id)">
								<div id="videoTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
							</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">视频</label>
						<div class="layui-input-block layui-upload">
						 	 <button type="button" class="layui-btn" id="uploadAvatar">上传视频</button>
						 	 <input class="layui-upload-file" type="file" name="file">
						</div> 
					</div>
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="saveVideo()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
