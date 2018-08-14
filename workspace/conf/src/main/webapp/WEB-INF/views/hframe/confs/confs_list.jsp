<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePaths", basePath);
	pageContext.setAttribute("scrPaths", path);
%>
<!-- 通用表头文件  -->
<jsp:include page="publicHead.jsp" />
<jsp:include page="adminusers_iframe.jsp" />

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
				 
								<div class="" style="float:right;">
									<button class="btn btn-primary" id="refreshtable" type="button"
										onclick="refreshtableOpt('confslist','/confs/table_init.do',['select','overdate','startdate'],'0')"   
										style="float: right; margin-top: 11px;">搜索</button>

									<div class="col-sm-3" style="float: right; margin-top: -8px;">
										搜索框： <input id="select" name="wishing" type="text"
											class="form-control" placeholder="搜索标题">
									</div>
                
                               		<div class="col-sm-3" style="float: right; margin-top: -8px;">
										发布结束: <input class="laydate-icon form-control "
											placeholder="YYYY-MM-DD "
											onclick="laydate({istime: true, format: 'YYYY-MM-DD'})"
											name="overdate" id="overdate">
									</div>
									<div class="col-sm-3" style="float: right; margin-top: -8px;">
										发布开始:<input class="laydate-icon form-control "
											placeholder="YYYY-MM-DD "
											onclick="laydate({istime: true, format: 'YYYY-MM-DD'})"
											name="startdate" id="startdate">
									</div>
									<div style="clear: both;"></div>
								</div>
                                  
                                  <input type="hidden" id="" name="" value="">
                
                                 <div class="btn-group coloctab" style="margin-top: 11px;">
                                   <p style="float:left;line-height:32px;    margin-right: 10px;    font-weight: bold;">会议状态</p>	
                                   <button class="btn btn-primary" type="button" onclick="coloctab(0)">全部</button>
                                   <button class="btn btn-white" type="button" onclick="coloctab(1)">报名中</button>
                                   <button class="btn btn-white" type="button" onclick="coloctab(2)">进行中</button>
                                   <button class="btn btn-white" type="button" onclick="coloctab(3)">已结束</button>
                                 </div>
					 					
									<div style="clear: both;"></div>
								</div>

								<table id="confslist" data-height="557" class="table">
									<thead>
										<tr>
											<!-- <th data-field="check" data-radio="true" data-width="5px"></th> -->
											<th data-field="index" data-formatter="index_for">序号</th>
											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>

											<th data-field="cname" data-sortable="true">标题</th>
										    <th data-field="tname" data-sortable="true">会议分类</th>
										    <th data-field="bhstart" data-sortable="true" data-formatter="Formatter_start" >开始时间</th>
										    <th data-field="bhend" data-sortable="true" data-formatter="Formatter_start" >结束时间</th>
                                            <th data-field="createtime" data-sortable="true" data-formatter="Formatter_start" >发布时间</th>
                                            <th data-field="name" data-sortable="true">会员名称</th>
                                            <th data-field="state" data-formatter="functionstate">操作</th>
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

		var table_obj = $("#confslist"); //当前操作的 table

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
		//加载按钮 
		function functionstate(value, row, index) {
			var btn="";
			btn += "<button class='btn btn-primary btn-sm' type='button' onclick='show_div3(\""
						+ row.id + "\")' >预览</button>";

		    btn += "&nbsp;&nbsp;<button class='btn btn-info btn-sm' type='button' onclick='sc(\""
				+ row.id + "\")' >审查 </button>";
 
			btn += "&nbsp;&nbsp;<button class='btn btn-warning btn-sm' type='button' onclick='md(\""
					+ row.id + "\")' >名单 </button>";
 
			return btn;
		}
		
		function md(id){
			window.location.href=base_path+'/confssubuser.do?confsid='+id;
		}
		
		function sc(id){
			window.location.href=base_path+'/confs/censor.do?id='+id;
		}
		
		
		window.onload = function() {
			//模拟点击单选按钮 

			setTimeout(function() {
				(function() {
					$('td').eq(1).trigger('click');
				})();
			}, 500)
		}
	     function coloctab(num){
				$('.coloctab button:eq('+num+')').addClass('btn-primary').removeClass('btn-white');
				$('.coloctab button:eq('+num+')').siblings('button').addClass('btn-white').removeClass('btn-primary');
				break_table("confslist",base_path+"/confs/table_init.do?opt="+num);
				$("#refreshtable").attr("onclick","refreshtableOpt('confslist','/confs/table_init.do',['select','overdate','startdate'],'"+num+"');");
				$("#select").val("");
				$("#startdate").val("");
				$("#overdate").val("");
	     }
	</script>

	 
</body>

</html>
