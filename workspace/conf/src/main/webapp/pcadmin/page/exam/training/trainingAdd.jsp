<!-- 首页-培训考试-培训资料添加 -->
	<script type="text/javascript">var organizationId = <%=request.getParameter("organizationId")%>;</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/exam/trainingAdd.js"></script>
	
	<div style="height:430px;width:100%;overflow-y:scroll;" id="organizationTag">
		<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
			<form id="trainingInfo" >
						<div class="layui-form-item">
							<label class="layui-form-label">资料标题</label>
								<div class="layui-input-block ">
									<input id="datatitle" type="text" name="datatitle" lay-verify="title" autocomplete="off" maxlength="30"
									placeholder="请输入资料名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">资料内容</label>
								<div class="layui-input-block">
									<textarea id="content" name="content" placeholder="请输入内容" class="layui-textarea form-control" maxlength="150"></textarea>
								</div>
						</div>
						是否为视频资料<input type="checkbox" id="ifvide" name="ifvide"  >
							<div id="vides" style="display:none">
				<input type="text" id="videoname" name="videoname" lay-verify="title" autocomplete="off" placeholder="视频资料名称" class="layui-input form-control">
				        <div class="layui-input-block layui-upload">
						 	  <input class="layui-upload-file" type="file" name="file">
						 	  <button type="button" class="layui-btn" id="uploadAvatar">上传视频</button>
						 	  <input type="hidden" id="address" name="address"  />
						 	  <div id="videoName2"></div>
						</div> 
				</div>
	<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">层级子资料</label>
								<div class="layui-input-block">
									<button type="button" class="btn btn-default"  onclick="addTrainingNode()" data-dismiss="modal">添加子资料</button>
								</div>
						</div>
				<div id="L"></div>
	<input type="hidden" id="array" name="array"  />
			</form>
		</div>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="TrainingSubmit()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>