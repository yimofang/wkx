<!-- 首页-主菜单-信息服务-消息页 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/information/message/message.js"></script>

	<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
		<!-- 上部分搜索区 -->
		<div class="dri-panel panel-success">
				<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
					<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
				</div>
			<div class="panel-body panel-collapse collapse">
				<!-- 搜索表单 -->
				<form id="messageSearch"  class="form-horizontal">
					<!-- 多行搜索项 -->					
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">标题</label>
					    <div class="col-sm-3">
					     	 <input type="text" class="form-control" id="msgtitle" name="msgtitle" placeholder="请输入要搜索的标题">
					    </div>
					</div>
					
					<div class="form-group" style="margin-bottom: 5px;">
					    <label for="flowname" class="col-sm-1 control-label">推送时间</label>
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
		                     <button class="btn dribbble-btn dribbble-btn-primary btn-lg" type="button" onclick="searchForMessage()">
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
        		<table id="messageList"></table>
        	</div>
        </div>
	</div>