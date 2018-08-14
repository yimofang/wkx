<!-- 首页-主菜单-配置管理-隐患排查清单管理页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/checklist/checklistselect.js"></script>
	<script>
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#checklistselectSearch #beginTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#checklistselectSearch #endTime', //指定元素
		    type: 'datetime'
		  });
		});
	</script>
	<div class="col-lg-12 dri-row" style="height:860px">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="checklistselectSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">清单名称</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="ltname" name="ltname" placeholder="请输入要搜索的名称">
					    </div>
					</div>
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">清单类型</label>
					    <div class="col-sm-3">
					     	<select id="ltype" name="ltype" class="form-control"></select>
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
					<div class="form-group" style="margin-bottom: 5px;">
						<div class="col-lg-1"></div>
					    <div class="col-sm-11">
	                        <a class="btn dribbble-btn dribbble-btn-primary btn-lg" onclick="searchForchecklistselect()">
	                        	<span class="fa fa-search dri-icon-r-md"></span>搜索</a>
	                                                    <!-- 一般按钮 -->
					    </div>
                        <!-- 带图标按钮 -->

					</div>
                    <!--检索end-->
                </form>
			</div>
		</div>
        <!-- 下部分内容区 -->
        <div class="dri-panel panel-info">
        	<div class="panel-heading">表单内容</div>
        	<div class="panel-body" style="padding-top: 0px;">
        		<table id="checklistselectList" >
        			<!-- <div id="addCheckListBar">			
						<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addCheckListBar" onclick="checklistTag('添加排查清单')">
								<span class="fa fa-plus dri-icon-r-md"></span>
							<div class="c-ripple js-ripple">
								<span class="c-ripple__circle"></span>
							</div>
							添加排查清单
						</a>
					</div> -->
        		</table>
        	</div>
        </div>
	</div>