<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!-- 通用表头文件  -->
<jsp:include page="publicHead.jsp" />


<style>
</style>

<body class="gray-bg">

	<script type="text/javascript"
		src="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.js"></script>
	<link rel="stylesheet" type="text/css"
		href="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css">


	<div class="wrapper wrapper-content animated fadeInRight"
		style="padding: 10px;">

		<!-- 调试开始  -->
		<div class="ibox float-e-margins" style="margin-bottom: 0;">
			<div class="ibox-title">
				<h5>基本</h5>
				<div class="ibox-tools"></div>
			</div>
			<div class="ibox-content" style="padding: 15px 20px 40px 20px;">

				<div class="row row-lg">

					<div class="col-sm-12">
						<!-- Example Events -->
						<div class="example-wrap">
							<div class="example">
								<c:if test="${add!=null && add=='add'}">
									<button class="btn btn-primary" type="button"
										onclick="add_obj()">添加</button>
								</c:if>

								<c:if test="${upd!=null && upd=='upd'}">
									<button class="btn btn-info" type="button"
										onclick="update_obj()" id="update_btn" disabled="true">修改</button>
								</c:if>
                                 <c:if test="${del!=null && del=='del'}">
								<button class="btn btn-danger" type="button"
									onclick="delete_obj()" id="delete_btn" disabled="true">删除</button>
                                </c:if>
								<div class="" style="">

									<button class="btn btn-primary" type="button"
										onclick="refreshtable('medialist','/media/table_init.do',['select','startdate','overdate'])"
										style="float: right; margin-top: 11px;">搜索</button>

									<div class="col-sm-2" style="float: right; margin-top: -8px;">
										搜索框： <input id="select" name="wishing" type="text"
											class="form-control" placeholder="搜索名称">
									</div>



									<div class="col-sm-2" style="float: right; margin-top: -8px;">

										结束: <input class="laydate-icon form-control "
											placeholder="YYYY-MM-DD "
											onclick="laydate({istime: true, format: 'YYYY-MM-DD'})"
											name="over_date" id="overdate">
									</div>
									<div class="col-sm-2" style="float: right; margin-top: -8px;">
										开始:<input class="laydate-icon form-control "
											placeholder="YYYY-MM-DD "
											onclick="laydate({istime: true, format: 'YYYY-MM-DD'})"
											name="start_date" id="startdate">
									</div>
									<div style="clear: both;"></div>
								</div>

								<table id="medialist" data-height="557" class="table">
									<thead>
										<tr>
											<th data-field="check" data-radio="true" data-width="5px"></th>
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>

											<th data-field="mname" data-sortable="true">名称</th>
											<th data-field="brief" data-sortable="true">简介</th>

											<th data-field="createtime" data-formatter="Formatter_start">创建时间
											</th>
											<!--   <th data-field="state" data-formatter="functionstate_look"    >状态</th> -->

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

		var table_obj = $("#medialist"); //当前操作的 table

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
		//日期格式化
		function Formatter_start(value, row, index) {
			//操作功能列添加 按键 

			var d = new Date(row.createtime);
			return formatDate(d);
		}

		//日期格式化
		function Formatter_over(value, row, index) {
			//操作功能列添加 按键 
			var d = new Date(row.backdate);

			return formatDate(d);

		}

		window.onload = function() {
			//模拟点击单选按钮 

			setTimeout(function() {
				(function() {
					$('td').eq(1).trigger('click');
				})();
			}, 500)
		}
	</script>

	<!-- 导入from 表单页 -->
	<jsp:include page="media_form.jsp" />

</body>

</html>
