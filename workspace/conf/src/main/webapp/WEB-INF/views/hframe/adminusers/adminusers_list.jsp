<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
 
<!-- 通用表头文件  -->
<jsp:include page="publicHead.jsp" />


<style>
</style>

<body class="gray-bg">

 <script type="text/javascript" src="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.js"></script>
    <link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css">
 

	<div class="wrapper wrapper-content animated fadeInRight"
		style="padding: 10px;">

		<!-- 调试开始  -->
		<div class="ibox float-e-margins" style="margin-bottom: 0;">
			<div class="ibox-title">
				<h5>基本</h5>
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
								<c:if test="${add!=null && add=='add'}">
									<button class="btn btn-primary" type="button" onclick="add_obj()">添加</button>
								</c:if>

								<c:if test="${upd!=null && upd=='upd'}">
									<button class="btn btn-info" type="button"
										onclick="update_obj()" id="update_btn" disabled="true">修改</button>
								</c:if>

								<button class="btn btn-danger" type="button"
									onclick="delete_obj()" id="delete_btn" disabled="true">删除</button>

								<div class="" style="">

									<button class="btn btn-primary" type="button"
										onclick="refreshtable('adminuserslist','/adminusers/adminusers_list.do',['select','opt','startdate','overdate'])"
										style="float: right; margin-top: 11px;">搜索</button>

									<div class="col-sm-2" style="float: right; margin-top: -8px;">
										搜索框： <input id="select" name="wishing" type="text"
											class="form-control" placeholder="搜索姓名">
									</div>

									<div class="col-sm-2" style="float: right; margin-top: -8px;">
										搜索状态： <select class="form-control m-b" name="activeType"
											id="opt">
											<option value="n">--无--</option>
											<option value="1">正常</option>
											<option value="2">禁用</option>

										</select>
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

								<table id="adminuserslist" data-height="557" class="table">
									<thead>
										<tr>
											<th data-field="check" data-radio="true" data-width="5px"></th>
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>

											<th data-field="realname" data-sortable="true" data-formatter="Formatter_realname" >姓名</th>
                                            <th data-field="phone" data-sortable="true">手机号</th>
											<th data-field="name" data-sortable="true">组织角色</th>
											<th data-field="loginname" data-sortable="true">登陆帐号</th>
											<th data-field="power" data-sortable="true">权限</th>
										 
											<th data-field="createtime" data-formatter="Formatter_start">创建时间
											</th>

											<!--   <th data-field="state" data-formatter="functionstate_look"    >状态</th> -->

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

		var table_obj = $("#adminuserslist"); //当前操作的 table

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

		//已删除 标识
		function Formatter_realname(value, row, index){	
			var btn=value;
			var ht='${ht}';
			
			if(row.isdelete==2 ){			
				if(ht!=null&&ht=='ht'){
					btn+="<span style='color: red;'>(<a href='JavaScript:log_look("+row.id+")' >已删除</a>)</span>";
					
				}else{
					btn+="<span style='color: red;'>(已删除)</span>";
					
				}
	
			}
			return btn;
		}
 
		//婚否
		function Formatter_marry(value, row, index) {

			var btn = "";
			if (value == 2) {
				btn = "是";
			}

			if (value == 1) {
				btn = "否";

			}
			return btn;
		}
            
		//加载按钮 
		function functionstate(value, row, index) {

			var btn = "";
	       var jq='${jq}';
		 
		
			if(row.isdelete==1){
 
			if(jq!=null&&jq=='jq'){
				
			
			if (value == 1) {

				btn += "<button class='btn btn-danger btn-sm' type='button' onclick='update_state($(this),\""
						+ row.id + "\",2)' >禁用</button>";

				btn += "<button class='btn btn-default btn-sm' type='button'  >启用 </button>";
			}

			if (value == 2) {
				btn += "<button class='btn btn-default btn-sm' type='button'  >禁用</button>";

				btn += "<button class='btn btn-primary btn-sm' type='button' onclick='update_state($(this),\""
						+ row.id + "\",1)' >启用 </button>";

			}
			}
          
	
			var cs='${cs}';
			if(cs!=null&&cs=='cs'){
				
			
			btn += "&nbsp;&nbsp;<button class='btn btn-warning btn-sm' type='button' onclick='update_pass(\""
					+ row.id + "\")' >重置密码 </button>";
			}
  
			}
 	
			return btn;
		}

		 //查询被删除行的 日志 
		function log_look(id){
			
			show_div_seed();
			var table_str="";
		   
			$.ajax({
				type : "POST", //提交方式  
				url : base_path + "/adminlog/get_log.do",//路径  
				data : {
					findid : id,
					tablename:'users',
					conduct_symbol:'del',
				},//数据，这里使用的是Json格式进行传输  
				dataType : "json",
				success : function(data) {//返回数据根据结果进行相应的处理  
					console.log(data);
					table_str+="<tr><td>标题</td><td>"+data.title+"</td></tr>";
					table_str+="<tr><td>描述</td><td>"+data.content+"</td></tr>";
					table_str+="<tr><td>日志时间</td><td>"+formatDate(new Date(data.createtime))+"</td></tr>";
					 $("#loglist").html(table_str);
				}			
			});
		}
		
		
		
		function update_pass(obj_id) {
			if (confirm("此操作不可撤消？是否确认执行 ")) {
				$.ajax({
					type : "POST", //提交方式  
					url : base_path + "/adminusers/update_pass.do",//路径  
					data : {
						id : obj_id,
					},//数据，这里使用的是Json格式进行传输  
					dataType : "json",
					success : function(data) {//返回数据根据结果进行相应的处理  
						alert(data.msg);
					}
				});
			}
		}

		//修改状态 
		function update_state(obj_this, obj_id, state) {
			var number = obj_this.parent().siblings().eq(1).text();
			if (confirm("此操作不可撤消？是否确认执行 ")) {


				$.ajax({
					type : "POST", //提交方式  
					url : base_path + "/adminusers/update_state.do",//路径  
					data : {
						id : obj_id,
						stateid : state,
					},//数据，这里使用的是Json格式进行传输  
					dataType : "json",
					success : function(data) {//返回数据根据结果进行相应的处理  

						if (data.code == 1) {
							$("#adminuserslist").bootstrapTable('updateRow', {
								index : (number - 1),
								row : data.row
							});
						} else {

							alert(data.msg);

						}

					}
				});

			}
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
	<jsp:include page="adminusers_form.jsp" />
	 
</body>

</html>
