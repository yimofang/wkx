<!-- 首页-培训考试-培训资料详情页 -->
	<script type="text/javascript">var organizationId = <%=request.getParameter("organizationId")%>;</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/exam/trainingDetails.js"></script>
	<div style="height:430px;width:100%;overflow-y:scroll;" id="organizationTag">
		<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
						<div class="layui-form-item">
							<label class="layui-form-label">资料标题</label>
								<div class="" id="datatitle" name="datatitle" ></div>
						</div>
						<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">资料内容</label>
								<div class="" id="content" name="content">
								</div>
						</div>
			<div id="vides" style="display:none">
			 <div class="layui-input-block layui-upload" id="video" name="video" ></div>
				        <div class="layui-input-block layui-upload">
						 	  <video src="" controls="controls" height="50px" width="50px"></video>
						</div> 
			</div>
	<div class="layui-form-item layui-form-text">
							<label class="layui-form-label">层级子资料</label>
								<div id="L"></div>
	</div>
		</div>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>