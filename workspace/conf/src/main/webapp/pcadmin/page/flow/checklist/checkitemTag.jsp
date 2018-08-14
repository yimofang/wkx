<script type="text/javascript">var checkitemId = <%=request.getParameter("checkitemId")%>;</script>
<script type="text/javascript">var ckparentId = <%=request.getParameter("ckparentId")%>;</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/checklist/checkitemTag.js"></script>

	<div class="container-fluid animated fadeInLeft" style="padding-left: 25px;padding-right: 56px;padding-top: 10px;">
		<form id="checkitemInfo" >
			<input type="hidden" name="id" id="id" value="">
			<input type="hidden" name="pitemid" id="pitemid" value="">
			<input type="hidden" name="flag" id="flag" value="">
					<div class="layui-form-item">
						<label class="layui-form-label">检查项名称</label>
							<div class="layui-input-block ">
								<input id="itemname" type="text" name="itemname" lay-verify="title" autocomplete="off"  maxlength="100"
									placeholder="请输入检查项名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
							</div>
					</div>				
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">检查项描述</label>
							<div class="layui-input-block">
								<textarea id="itemcontent" name="itemcontent" placeholder="请输入描述内容" class="layui-textarea form-control"  maxlength="500"></textarea>
							</div>
					</div>
					
					<div class="layui-form-item pull-right"style="margin-top: 20px;margin-bottom: 0px;">
						<button type="button" class="btn btn-primary" onclick="updatecheckitem()">
  							<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
						</button>
						<button type="button" class="btn btn-default" onclick="closeDialog()">
	  						<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
						</button>
					</div>				
		</form>
	</div>
		
