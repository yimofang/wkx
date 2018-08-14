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
	$('#taskInfoMsg #taskBatchTable').bootstrapTable({
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
					taskname:$("#taskInfoMsg #taskname").val(),
					taskid:41,//41
			};
			return temp;
		},
		columns: [
			{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
			 formatter: function (value, row, index){
	                var pageSize=$('#taskInfoMsg #taskBatchTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskInfoMsg #taskBatchTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'taskName',title:'任务名称',align:'center',valign:'middle',width:'10%'},
			{field:'starttime',title:'任务开始时间',align:'center',valign:'middle',width:'10%'},
			{field:'endtime',title:'任务结束时间',align:'center',valign:'middle',width:'5%'},
			{field:'checkstatus',title:'执行状态',align:'center',valign:'middle',width:'5%'}
		],
		onClickRow:function(row){
			$("#taskInfoMsg #taskbatchid").val(row.id);
			refreshListTable();
		},
	});
	
}
function refreshListTable(){
	$('#taskInfoMsg #checkListTable').bootstrapTable('refresh');
}
//初始化清单表格
function initCheckListTable(){
	$('#taskInfoMsg #checkListTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchListList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 400, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var taskbatchid = $("#taskInfoMsg #taskbatchid").val();
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
	                var pageSize=$('#taskInfoMsg #checkListTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskInfoMsg #checkListTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'listName',title:'清单名称',align:'center',valign:'middle',width:'10%'},
			{field:'listTypeName',title:'清单类型',align:'center',valign:'middle',width:'10%'}
		],
		onClickRow:function(row){
			$("#taskInfoMsg #taskbatchListid").val(row.id);
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
	        				$('#taskInfoMsg #userManageList').bootstrapTable('refresh');
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
	$('#taskInfoMsg #checkItemTable').bootstrapTable('refresh');
}
//初始化清单项表格
function initCheckItemTable(){
	$('#taskInfoMsg #checkItemTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchItemList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 400, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var taskbatchListid = $("#taskInfoMsg #taskbatchListid").val();
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
	                var pageSize=$('#taskInfoMsg #checkItemTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskInfoMsg #checkItemTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'itemName',title:'清单项名称',align:'center',valign:'middle',width:'10%'},
			{field:'itemContent',title:'清单项内容',align:'center',valign:'middle',width:'10%'}
		]
	});
}

