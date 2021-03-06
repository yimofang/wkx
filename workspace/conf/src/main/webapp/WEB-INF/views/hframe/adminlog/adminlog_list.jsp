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
	href="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css"/>


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
							
							<div class="" style="">

									<button class="btn btn-primary" type="button"
										onclick="refreshtable('loglist','/log/table_init.do',['select','startdate','overdate'])"
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
							
								<div class="" style="">
									<div style="clear: both;"></div>
								</div>

								<table id="loglist" data-height="557" class="table">
									<thead>
										<tr>
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>
											<th data-field="title" data-sortable="true">标题</th>
											<th data-field="content" data-sortable="true">内容</th>
											<th data-field="name" data-sortable="true">操作表名</th>
											<th data-field="createtime" data-formatter="Formatter_start">操作时间</th>

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

		var table_obj = $("#loglist"); //当前操作的 table

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

		window.onload = function() {
			//模拟点击单选按钮 

			setTimeout(function() {
				(function() {
					$('td').eq(1).trigger('click');
				})();
			}, 500)
		}
	</script>

</body>

</html>
