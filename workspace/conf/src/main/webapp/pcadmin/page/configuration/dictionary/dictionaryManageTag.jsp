	<script type="text/javascript">var dictType = "<%=request.getParameter("dictType")%>";</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/configuration/dictionary/dictionaryManageTag.js"></script>

		<div style="height:460px;width:100%;overflow-y:scroll;" id="dictionaryManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="dictManageInfo" >
				<input type="hidden" name="type" id="type" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">字典名称</label>
								<div class="layui-input-block ">
									<input id="name" type="text" name="name" lay-verify="title" autocomplete="off" 
										placeholder="请输入字典名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
	
						<div class="layui-form-item">
							<label class="layui-form-label">主类型</label>
								<div class="layui-input-block">
									<select id="maintype" name="maintype" class="form-control" onchange="mainTypeFunc()"></select>
								</div>
						</div>
						<div class="layui-form-item">
							<label class="layui-form-label">子类型</label>
								<div class="layui-input-block">
									<select id="subtype" name="subtype" class="form-control"></select>
								</div>
						</div>
	
						<div class="layui-form-item" id="dictOptions">
							<label class="layui-form-label">选项</label>
								<div class="layui-input-block" >
									<input class="layui-input-inline form-control" type="text" name="key" placeholder="请输入KEY" onblur="isNull(this.value,this.id)">
								</div>
						</div>
				
<!-- 						<div class="layui-form-item pull-right"style="margin-top: 20px;margin-bottom: 0px;"> -->
<!-- 							<button type="button" class="btn btn-primary" onclick="updatedictManage()"> -->
<!-- 	  							<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交 -->
<!-- 							</button> -->
<!-- 							<button type="button" class="btn btn-default" onclick="closeDialog()"> -->
<!-- 		  						<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消 -->
<!-- 							</button> -->
<!-- 						</div> -->
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updatedictManage()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>
