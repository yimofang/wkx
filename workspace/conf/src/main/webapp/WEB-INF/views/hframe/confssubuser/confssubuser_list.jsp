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
							<div class="example" style="margin-bottom: 20px;">
				                
				                <button class="btn btn-success" type="button" onclick="houtui()"
										style="float: left; margin-top: 11px;margin-bottom: 20px;">后退</button>
								<div class="" style="float:right;">
							 
							    <button class="btn btn-primary" type="button" onclick="dc()"
										style="float: right; margin-top: 11px;">导出名单</button>
								<div class="" style="float:right;">
									<!-- <button class="btn btn-primary" type="button"
										onclick="refreshtable('confssubuserlist','/confssubuser/table_init.do',['select'])"
										style="float: right; margin-top: 11px;">搜索</button>

									<div class="col-sm-3" style="float: right; margin-top: -8px;">
										搜索框： <input id="select" name="wishing" type="text"
											class="form-control" placeholder="搜索标题">
									</div> -->
                
                         
									<div style="clear: both;"></div>
								</div>
                                  
                                  <input type="hidden" id="confsid" name="" value="${confsid }">
                
                          
					 					
									<div style="clear: both;"></div>
								</div>

								<table id="confssubuserlist" data-height="557" class="table">
									<thead>
										<tr>
											<th data-field="check" data-radio="true" data-width="5px"></th>
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>
 
										   <th data-field="realname" data-sortable="true">姓名</th>
										    <th data-field="phone" data-sortable="true">手机号</th>
										    <th data-field="arrive" data-sortable="true"  data-formatter="isarrive" >签到状态</th>
										    <th data-field="qnr" data-sortable="true"  data-formatter="isqnr" >回答状态</th>
                                            <th data-field="createtime" data-sortable="true" data-formatter="Formatter_start" >报名时间</th>
                                            
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

		var table_obj = $("#confssubuserlist"); //当前操作的 table

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
		//日期格式化 			//日期格式化
		function Formatter_start(value, row, index) {
			//操作功能列添加 按键 
 
			var d = new Date(value);
			return formatDate(d);
		}

	 
		function isarrive(value, row, index){
			var btn="";
			if(value==1){
				btn+="签到";
			}else{
				btn="未签到";
			}
			return btn;
		}
		
		function isqnr(value, row, index){
			var btn="";
			if(value==1){
				btn+="已答";
			}else{
				btn="未答";
			}
			return btn;
		}
		
		
		
		function houtui(){
			window.location.href=base_path+'/confs.do?';
		}
		function dc(){
			window.location.href=base_path+'/confssubuser/exportExcel.do?confsid='+$("#confsid").val();
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
