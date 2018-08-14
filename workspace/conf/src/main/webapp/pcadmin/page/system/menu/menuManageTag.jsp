		<script type="text/javascript">var menuId = <%=request.getParameter("menuId")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/menu/menuManageTag.js"></script>
		
		<div style="height:410px;width:100%;overflow-y:scroll;" id="menuManageTag">
			<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
				<form id="menuManageInfo" >
				<input type="hidden" name="id" id="id" value="">
				<input type="hidden" name="flag" id="flag" value="">
						<div class="layui-form-item">
							<label class="layui-form-label">菜单名称</label>
								<div class="layui-input-block ">
								  <input id="name" type="text" name="name" lay-verify="title" autocomplete="off" 
								  placeholder="请输入菜单名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">上级菜单</label>
								<div class="layui-input-block">
									<input type="hidden" name="pid" id="pid" value="">
									<input id="pname" type="text" lay-verify="title" autocomplete="off"
										placeholder="点击选择" class="layui-input form-control" onclick="getMenuId()" onkeyup="cleanInput(this.id)">
									<div id="menuTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">菜单地址</label>
								<div class="layui-input-block ">
								  <input id="url" type="text" name="url" lay-verify="title" autocomplete="off" 
								  placeholder="请输入菜单地址" class="layui-input form-control">
								</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">菜单识别码</label>
								<div class="layui-input-block ">
								  <input id="code" type="text" name="code" lay-verify="title" autocomplete="off" 
								  placeholder="请输入菜单识别码" class="layui-input form-control" onblur="isNull(this.value,this.id)">
								</div>
						</div>
	
<!-- 						<div class="layui-form-item"> -->
<!-- 							<label class="layui-form-label">菜单等级</label> -->
<!-- 								<div class="layui-input-block"> -->
<!-- 									<select id="menulevel" name="menulevel" class="form-control"></select> -->
<!-- 								</div> -->
<!-- 						</div> -->
				</form>
			</div>
		</div>
		<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateMenuManage()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
		</div>