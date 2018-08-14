<!-- 首页-主菜单-权限管理-组织机构管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/organization/organization.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="organizationSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">机构名称</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="organname" name="organname" placeholder="请输入要搜索的名称">
					    </div>
					</div>
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">创建时间</label>
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
					<div class="form-group form-inline" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-lg-11">
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchForOrgan()">
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
        		<table id="organizationList" >
        			<div id="addOrganizationBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addorgan" onclick="organizationTag('添加组织机构')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加机构
						</a>
					</div>
        		</table>
        	</div>
        </div>
	</div>