<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
	pageContext.setAttribute("scrPath", path);
%>

<!-- 通用表头文件  -->
<jsp:include page="publicHead.jsp" />

<style>
</style>

<body class="gray-bg">



	<div class="wrapper wrapper-content animated fadeInRight"
		style="padding: 10px;">

		<!-- 调试开始  -->
		<div class="ibox float-e-margins" style="margin-bottom: 0;">
			<div class="ibox-title">
				<h5>权限名称： ${info.powername}</h5>
				<div class="ibox-tools">
					<!-- <a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a> <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i
						class="fa fa-wrench"></i>
					</a> <a class="close-link"> <i class="fa fa-times"></i>
					</a> -->
				</div>
			</div>
			<div class="ibox-content" style="padding: 15px 20px 40px 20px;">

				<div class="row row-lg">

					<div class="col-sm-12">
						<!-- Example Events -->
						<div class="example-wrap">
							<div class="example">

								<input type="hidden" id="powerid" value="${info.id}">
								 <a	class="btn btn-success" href="${basePath}/powers.do">返回</a>

								<!-- <button class="btn btn-primary" type="button"
									onclick="add_obj()">添加</button> -->

								<!-- <button class="btn btn-info" type="button"
									onclick="update_obj()" id="update_btn" disabled="true">修改</button>

								 <button class="btn btn-danger" type="button"
									onclick="delete_obj()" id="delete_btn" disabled="true">删除</button> -->

								<div class="" style="">

								 
 
									<div style="clear: both;"></div>
								</div>

								<table id="powermenulist" data-height="557" class="table">
									<thead>
										<tr>
											<th data-field="check" data-radio="true" data-width="5px"></th>
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>
											<th data-field="name" data-sortable="true">菜单名称</th>
											
										 	<th data-field="" data-sortable="true" data-formatter="conduct_list">操作权限</th>

											<th data-field="name" data-formatter="del_btn">操作</th>

										</tr>
									</thead>

								</table>

							</div>
						</div>
						<!-- End Example Events -->
					</div>
				</div>
			</div>
		</div>
		<!-- End Panel Basic -->
		<!-- 调试结束 -->

	</div>



	<script type="text/javascript">
		var btn_control = null;//点击btn操作区分 

		var table_data_map = null;//以数组保存当前选中行数据 test_data_map[0].id

		var table_data_index = null;//保存当前选 中行索引 test_data_index

		var base_path = $("#basePath_hid").val();

		var table_obj = $("#powermenulist"); //当前操作的 table

		//索引 和数据 ID赋值 
		function variable_init() {
			//返回所选的行，当没有选择任何行的时候返回一个空数组。
			table_data_map = table_obj.bootstrapTable('getSelections');
			//当前选中行索引 
			table_data_index = $("input[name=btSelectItem]:checked").attr(
					"data-index");
			if (table_data_map == null || table_data_index == null) {
				alert("未选择信息");
			}
		}
		//------table 表格头自定义 data-formatter 实现  结束---------

		window.onload = function() {
			//模拟点击单选按钮 
			console.log($('td'));
			setTimeout(function() {
				(function() {
					$('td').eq(1).trigger('click');
				})();
			}, 500)
		};

		function del_btn(value, row, index) {

			var btn = "";
			btn += "<button class='btn btn-info btn-sm' type='button' onclick='add_obj("
					+ row.powerid + ",\""+row.menuid+"\")' >分配</button>";

			return btn;
		}
 
		
		function conduct_list(value, row, index){			
			var pid= ${info.id};
			
			var btn = "";
	
				$.each(row.conductlist, function(index, value) {
							
					btn += "<span class='badge badge-primary'>"+value.name+"</span>&nbsp;";
					 
				});
			 
			return btn;
		
		}
		
		
		
	</script>

	<!-- 导入from 表单页 -->
	<jsp:include page="powermenu_form.jsp" />
</body>

</html>
