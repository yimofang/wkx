<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

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
								<button class="btn btn-primary" type="button"
									onclick="add_obj()">添加主菜单</button>
									
								<button class="btn btn-info" type="button"
									onclick="add_obj_seed()">添加子菜单</button>
                             </c:if>
                             
								<!-- <button class="btn btn-info" type="button"
									onclick="update_obj()" id="update_btn" disabled="true">修改</button>

								 <button class="btn btn-danger" type="button"
									onclick="delete_obj()" id="delete_btn" disabled="true">删除</button> -->

								<div class="" style="">

								<!-- 	<button class="btn btn-primary" type="button"
										onclick="refreshtable('sectorlist','/sector/sector_list',['select'])"
										style="float: right; margin-top: 11px;">搜索</button>

									<div class="col-sm-2" style="float: right; margin-top: -8px;">
										搜索框： <input id="select" name="wishing" type="text"
											class="form-control">
									</div> -->

 			 
									<div style="clear: both;"></div>
								</div>

								<table id="menuslist" data-height="557"  class="table" detailView="true"  data-detail-formatter="select_submenu" >
									<thead>
										<tr>
											<!-- <th data-field="check" data-radio="true" data-width="5px" ></th> -->
											<th data-field="index" data-formatter="index_for">序号</th>

											<!--隐藏 id 列   data-field="id" 定义与数据集相同字段名 -->
											<th data-field="id" data-visible="false">ID</th>
											<th data-field="name" data-sortable="true">菜单名称</th>
											<th data-field="controller" >控制器名称</th>
											<th data-field="link" >短连接</th>							
                                         <!--   <th data-field="state" data-formatter="functionstate_look"    >状态</th> -->
											<th data-field="isdelete" data-formatter="functioncontroller">操作</th> 
										 

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
		
		var base_path=$("#basePath_hid").val();

		var table_obj = $("#menuslist"); //当前操作的 table

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
			setTimeout(function(){
				(function() {
					$('td').eq(1).trigger('click');
				})();
			}, 500)
		};
		
		
		function functioncontroller(value, row, index){
			
			var upd='${upd}';
            var del='${del}';
			
			var btn = "";
             
			if(upd!=null&&upd=='upd'){
				btn += "<button class='btn btn-info btn-sm' type='button' onclick='update_obj(\""+ row.id + "\","+index+")' >修改</button>";
			}
			if(del!=null&&del=='del'){
			    btn += "&nbsp;&nbsp;<button class='btn btn-danger btn-sm' type='button' onclick='delete_obj(\""+ row.id + "\","+index+")' >删除 </button>"; 
			}
			return btn;
			
		}
		
		// -----------------------详细行测试 -------------------
		function select_submenu(index, row) {

			var btn_str = [];
			var f_index=index;
			
			var upd='${upd}';
            var del='${del}';
			btn_str.push("<div> <table class='table table-hover'><tbody>");

			$.each(row.junior, function(index, value) {
				btn_str.push(" <tr> ");
			/* 	btn_str.push(" <td></td> "); */
				btn_str.push(" <td></td> ");
				btn_str.push(" <td><span class='fa fa-hand-o-right'></span></td> ");
				btn_str.push(" <td>" + value.name + "</td> ");
				btn_str.push(" <td>" + value.controller + "</td> ");
				btn_str.push(" <td>" + value.link + "</td> ");
				btn_str.push("<td>");
				if(upd!=null&&upd=='upd'){
								
				btn_str.push(" <td><button class='btn btn-info btn-sm' type='button' onclick='update_obj_seed(this,"+value.id+","+f_index+","+row.id+")' >修改 </button> ");
				}
				if(del!=null&&del=='del'){
				btn_str.push("&nbsp; <button class='btn btn-danger btn-sm' type='button' onclick='delete_obj_seed(this,"+value.id+","+f_index+","+row.id+")' >删除 </button>  ");
				}
				btn_str.push("</td>");
				btn_str.push(" </tr> ");
			});

			btn_str.push("</tbody></table></div>");
		 
		
			return btn_str.join('');

		}
		
	 
		//修改详细行 
		 function updateRow(obj) {  
			 //更新行的信息 		     
		       var tr=obj.parentNode.parentNode;
				var tbody=tr.parentNode;
				
				var btn_str = [];
				btn_str.push(" <tr> ");
				btn_str.push(" <td>&nbsp;</td> ");
				btn_str.push(" <td>&nbsp;</td> ");
				btn_str.push(" <td>99</td> ");
				btn_str.push(" <td>xxx </td> ");
				btn_str.push(" <td>yyy </td> ");
				btn_str.push("<td>");
				
				btn_str.push("<td>");
				
				btn_str.push(" <button class='btn btn-primary btn-sm' type='button' onclick='updateRow(this)' >更新 </button> &nbsp; <button class='btn btn-primary btn-sm' type='button' onclick='deleteCurrentRow(this)' >删除 </button> ");
				
				btn_str.push("</td>");
				btn_str.push(" </tr> ");
		   	console.log("----------------------------"+obj.parentNode.parentNode.parentNode.rows[0].innerHTML);
		   	obj.parentNode.parentNode.parentNode.rows[0].innerHTML=btn_str.join('');
		   	
		   	//  uRow.className = "title"; 
		   }  
		
	</script>

	<!-- 导入from 表单页 -->
	<jsp:include page="menus_form.jsp" />
	<jsp:include page="menus_form_seed.jsp" />
</body>

</html>
