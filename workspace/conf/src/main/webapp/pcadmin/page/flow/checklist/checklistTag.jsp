<script type="text/javascript">var checklistId = <%=request.getParameter("checklistId")%>;</script>
	<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/checklist/checklistTag.js"></script>

	<div class="container-fluid animated fadeInLeft" style="padding-left: 25px;padding-right: 56px;padding-top: 10px;">
		<form id="checklistInfo" >
			<input type="hidden" name="id" id="id" value="">
			<!-- <input type="hidden" name="flag" id="flag" value=""> -->
			<input type="hidden" name="tablejson" id="tablejson" value="">
					<div class="layui-form-item">
						<label class="layui-form-label">清单名称</label>
							<div class="layui-input-block ">
								<input id="listname" type="text" name="listname" lay-verify="title" autocomplete="off"  maxlength="50"
									placeholder="请输入清单名称" class="layui-input form-control" onblur="isNull(this.value,this.id)">
							</div>
					</div>
					
					<div class="layui-form-item">
						<label class="layui-form-label">清单类型</label>
							<div class="layui-input-block">
								<select id="listtype" name="listtype" class="form-control"></select>
							</div>
					</div>
					
					<div class="layui-form-item">
						<label class="layui-form-label">所属机构</label>
							<div class="layui-input-block">
								<input type="hidden" name="organizationid" id="organizationid" value="">
								<input id="organizationName" type="text" lay-verify="title" autocomplete="off"
									placeholder="点击选择" class="layui-input form-control" onclick="getOrganId()" style="ime-mode: disabled">
								<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
							</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">清单项</label>
							<div class="layui-input-block">
			<!-- 				 <div id="addchecklistitemBar">			
									<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addchecklistitemBar" onclick="addItem()">
											<span class="fa fa-plus dri-icon-r-md"></span>
										<div class="c-ripple js-ripple">
											<span class="c-ripple__circle"></span>
										</div>
										添加
									</a>
								</div>  -->
								 <div>
									<button type="button" class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" onclick="selcheckitemList()">
			  							<span class="fa fa-plus dri-icon-r-md" aria-hidden="true"></span>选择检查项
									</button></div>	
								<table id="ckItemList" >
								
								</table>
							</div>
					</div>								
					<!--  <div id="toolbar" class="btn-group">
					    <button id="add" class="btn btn-default" title="添加">
					        <i class="glyphicon glyphicon-plus"></i> 添加
					    </button>					   
					</div>
					<table id="checklistitemList" data-toolbar="#toolbar">
					    <thead>
					    <tr>
					        <th data-field="checkbox" data-checkbox="true"></th>
					        <th data-field="wareName">清单项内容</th>
					    </tr>
					    </thead>
					</table> -->
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">清单描述</label>
							<div class="layui-input-block">
								<textarea id="listdes" name="listdes" placeholder="请输入描述内容" class="layui-textarea form-control"  maxlength="500"></textarea>
							</div>
					</div>
					
					<div class="layui-form-item pull-right"style="margin-top: 20px;margin-bottom: 0px;">
						<button type="button" class="btn btn-primary" onclick="updateCheckList()">
  							<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
						</button>
						<button type="button" class="btn btn-default" onclick="closeDialog()">
	  						<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
						</button>
					</div>				
		</form>
	</div>
		
