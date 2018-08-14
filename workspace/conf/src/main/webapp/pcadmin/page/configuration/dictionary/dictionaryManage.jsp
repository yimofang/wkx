<!-- 首页-主菜单-配置管理-字典管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/configuration/dictionary/dictionaryManage.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="dictManageSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">字典名称</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="name" name="name" placeholder="请输入要搜索的名称">
					    </div>
					</div>

					<div class="form-group form-inline" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-lg-11">
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchForDict()">
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
        		<table id="dictManageList">
        			<div id="addDictManageBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addDict" onclick="dictManageTag('添加字典')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加字典
						</a>
					</div>
        		</table>
        	</div>
        </div>
	</div>