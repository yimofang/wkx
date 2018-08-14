<!-- 首页-主菜单-权限管理-菜单管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/menu/menuManage.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="menuManageSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">菜单名称</label>
					    <div class="col-sm-3">
					      <input type="text" class="form-control" id="menuname" name="menuname" placeholder="请输入要搜索的名称">
					    </div>
					</div>

					<div class="form-group form-inline" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-lg-11">
							<button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchForMenu()">
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
        		<table id="menuManageList">
        			<div id="addMenuManageBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addmenu" onclick="addMenuManage('添加菜单')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加菜单
						</a>
					</div>
        		</table>
        	</div>
        </div>
	</div>