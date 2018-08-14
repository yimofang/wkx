$(document).ready(function() {
	//初始化周期任务表格
	initTaskBatchTable();
	//初始化清单表格
	initCheckListTable();
	//初始化清单项表格
	initCheckItemTable();
});
//初始化周期任务表格
function initTaskBatchTable() {
	var task_id = window.location.href.split('=')[1];
	$('#taskBatchTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {
					pageNum: params.pageNum / params.pageSize + 1,
	                pageSize: params.pageSize,
					taskname:$("#taskname").val(),
					taskid:task_id,
			};
			return temp;
		},
		columns: [
			{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
			 formatter: function (value, row, index){
	                var pageSize=$('#taskBatchTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskBatchTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'taskName',title:'任务名称',align:'center',valign:'middle',width:'10%'},
			{field:'starttime',title:'任务开始时间',align:'center',valign:'middle',width:'10%'},
			{field:'endtime',title:'任务结束时间',align:'center',valign:'middle',width:'5%'}
		],
		onClickRow:function(row){
			$("#taskbatchid").val(row.id);
			refreshListTable();
		},
	});
	
}
function refreshListTable(){
	$('#checkListTable').bootstrapTable('refresh');
}
//初始化清单表格
function initCheckListTable(){
	$('#checkListTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchListList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var taskbatchid = $("#taskbatchid").val();
			var temp = {
					pageNum: params.pageNum / params.pageSize + 1,
	                pageSize: params.pageSize,
	                taskbatchid:taskbatchid
			};
			return temp;
		},
		columns: [
			{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
			 formatter: function (value, row, index){
	                var pageSize=$('#checkListTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#checkListTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'listName',title:'清单名称',align:'center',valign:'middle',width:'10%'},
			{field:'listTypeName',title:'清单类型',align:'center',valign:'middle',width:'10%'},
			{field:'islimit',title:'是否受限',align:'center',valign:'middle',width:'10%',
				formatter:function(value, row, index){
					var str = '<label class="checkbox-inline checkbox-primary" style="padding-left: 5px;">';
						if(row.islimit == 1){
							str+=	'<input type="radio" name="islimit-'+row.id+'" id="islimit" checked="checked" value="1" onclick="getRadio()">受限';
						}else{
							str+=	'<input type="radio" name="islimit-'+row.id+'" id="islimit" value="1" onclick="getRadio()">受限';
						}
						str+= '</label>';
						str+= '<label class="checkbox-inline checkbox-primary" style="padding-left: 5px;">';
						if(row.islimit == 0){
							str+=	'<input type="radio" name="islimit-'+row.id+'" id="isNotlimit" checked="checked" value="0" onclick="getRadio()">不受限';
						}else{
							str+=	'<input type="radio" name="islimit-'+row.id+'" id="isNotlimit" value="0" onclick="getRadio()">不受限';
						}
						str+= '</label>';
						return str;
				}
			},
			{field:'iswillcheck',title:'是否必查',align:'center',valign:'middle',width:'10%',
				formatter:function(value, row, index){
					var str = '<label class="checkbox-inline checkbox-primary" style="padding-left: 5px;">';
						if(row.iswillcheck == 1){
							str+=	'<input type="radio" name="iswillcheck-'+row.id+'" id="ischeck" checked="checked" value="1" onclick="getRadio()">必查';
						}else{
							str+=	'<input type="radio" name="iswillcheck-'+row.id+'" id="ischeck" value="1" onclick="getRadio()">必查';
						}
						str+= '</label>';
						str+= '<label class="checkbox-inline checkbox-primary" style="padding-left: 5px;">';
						if(row.iswillcheck == 0){
							str+=	'<input type="radio" name="iswillcheck-'+row.id+'" id="isNotcheck" checked="checked" value="0" onclick="getRadio()">非必查';
						}else{
							str+=	'<input type="radio" name="iswillcheck-'+row.id+'" id="isNotcheck" value="0" onclick="getRadio()">非必查';
						}
						str+= '</label>';
						
						return str;
				}
			}
		],
		onClickRow:function(row){
			$("#taskbatchListid").val(row.id);
			refreshItemTable();
		},
	});
}
function getRadio(evt){
	var evt = evt || window.event;   
    var e = evt.srcElement || evt.target;
	var value = e.value;
	var name = e.name.split("-")[0];
	var id = e.name.split("-")[1];
	var data = null ;
	var str = '';
	if(name == "iswillcheck"){
		data ={
			"id":id,
			"iswillcheck":value
		}
		str = '是否确认修改必查类型';
	}else if(name == "islimit"){
		data ={
			"id":id,
			"islimit":value
		}
		str = '是否确认修改受限类型';
	}
	$.myPlugin.judgementDialog({title:"提示",context:str,tipType:"notice",width:"280px",height:"180px",
		btnFn: {
			btn1Fn: function(indexBtn,layero){
				$.ajax({
					url:contextPath+"/task/updateBathListMsg.do",
					type:"post",
					data:data,
					dataType:"json",
					success:function(data){
						if(data.success == true){
	        				$('#userManageList').bootstrapTable('refresh');
	        				$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"success",time:3000});
	        			}else{
	        				$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"error",time:3000});
	        			}
					},
					error:function(error){}
				});
				layer.close(indexBtn);
			},
			btn2Fn: function(){},
		}
	});
}
function refreshItemTable(){
	$('#checkItemTable').bootstrapTable('refresh');
}
//初始化清单项表格
function initCheckItemTable(){
	$('#checkItemTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchItemList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var taskbatchListid = $("#taskbatchListid").val();
			console.info(taskbatchListid);
			var temp = {
					pageNum: params.pageNum / params.pageSize + 1,
	                pageSize: params.pageSize,
	                tchid:taskbatchListid
			};
			return temp;
		},
		columns: [
			{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
			 formatter: function (value, row, index){
	                var pageSize=$('#checkItemTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#checkItemTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'itemName',title:'清单项名称',align:'center',valign:'middle',width:'10%'},
			{field:'itemContent',title:'清单项内容',align:'center',valign:'middle',width:'10%'}
		]
	});
}

