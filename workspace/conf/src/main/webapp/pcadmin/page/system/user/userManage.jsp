<!-- 首页-主菜单-权限管理-用户管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/user/userManage.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll" id="userManage">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="userManageSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 0px;">
					    <label for="flowname" class="col-sm-1 control-label">用户名称</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="username" name="username" placeholder="请输入要搜索的名称">
					    </div>
					</div>
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">用户状态</label>
					    <div class="col-sm-6">
					    	<label class="checkbox-inline checkbox-primary" style="padding-left: 5px;">
							  	<input type="radio" name="flag" id="normal" value="0">正常
							</label>
							<label class="checkbox-inline" style="padding-left: 10px;margin-left: 0px;">
								<input type="radio" name="flag" id="freeze" value="1">冻结
							</label>
							<label class="checkbox-inline" style="padding-left: 10px;margin-left: 0px;">
								<input type="radio" name="flag" id="audit" value="2">待审核
							</label>
					    </div>

					</div>
					<div class="form-group" style="margin-bottom: 0px;">
					    <label for="flowname" class="col-sm-1 control-label">注册日期</label>
					    <div class="col-sm-4">
						    <div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
								<input type="text" class="form-control" id="beginTime">
						    </div>
						    <label class="col-sm-1 control-label" style="text-align: center;" for="tttt">到</label>
						    <div class="col-sm-5" style="padding-left: 0px;padding-right: 0px;">
								<input type="text" class="form-control" id="endTime">
						    </div>
					    </div>
					</div>					
					<div class="form-group" style="margin-bottom: 5px;">
						<label for="flowname" class="col-sm-1 control-label">所属部门</label>
							<div class="col-sm-3">
								<input id="orgName" name="orgName" type="text" lay-verify="title" autocomplete="off"
									placeholder="点击选择" class="layui-input form-control" onclick="getOrgIdForSearch()" onkeyup="cleanInput(this.id)">
								<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
							</div>
					</div>				
					<div class="form-group form-inline" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-lg-11">
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchForUser()">
					    		<span class="fa fa-search dri-icon-r-md"></span>搜索</button>
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="reset">
					    		<span class="glyphicon glyphicon-repeat dri-icon-r-md"></span>重置</button>
					    </div>
					</div>
                    <!--检索end-->
                </form>
			</div>
		</div>
        <!-- 下部分内容区 -->
        <div class="dri-panel panel-info">
        	<div class="panel-heading">表单内容</div>
        	<div class="panel-body" style="padding-top: 0px;">
        		<table id="userManageList">
        			<div id="addUserManageBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="adduser" onclick="userManageTag('添加用户')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加用户
						</a>
					</div>
        		</table>
        	</div>
        </div>
	</div>