$(document).ready(function() {
	//日期控件
	laydate();
	//查询任务类型字典
	getTaskType();
	//查询巡查周期字典
	getTaskCycle();
	//查询巡查人
	getInspector();
	//初始化周期任务表格
	initTaskBatchTable();
	//初始化清单表格
	initCheckListTable();
});

//初始化周期任务表格
function initTaskBatchTable() {
	$('#taskInsert #taskBatchTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchList.do", //请求后台的URL（*） 
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
			var taskId = $("#taskInsert #taskId").val();
			var temp = {
					pageNum: params.pageNum / params.pageSize + 1,
	                pageSize: params.pageSize,
	                taskid:taskId
			};
			return temp;
		},
		columns: [
			{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
			 formatter: function (value, row, index){
	                var pageSize=$('#taskInsert #taskBatchTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskInsert #taskBatchTable').bootstrapTable('getOptions').pageNumber;//当前第几页
	                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
					}
			},
			{field:'taskName',title:'任务名称',align:'center',valign:'middle',width:'10%'},
			{field:'starttime',title:'任务开始时间',align:'center',valign:'middle',width:'10%'},
			{field:'endtime',title:'任务结束时间',align:'center',valign:'middle',width:'5%'},
			{field:'checkstatus',title:'执行状态',align:'center',valign:'middle',width:'5%'},
			{field:'',title:'操作',align:'center',valign:'middle',width:'5%',
				formatter:function(value, row, index){
					if(row.checkstatus != "未执行"){
						return '';
					}else{
						return '<input type="button" value="删除" class="btn btn-primary  btn-sm" style="margin-right:10px;" onclick="deleteBatch('+row.id+')">';
					}
				}
			}
		],
		onClickRow:function(row){
			console.info(row);
			$("#taskInsert #taskbatchid").val(row.id);
			$("#taskInsert #starttimeAdd").val(row.starttime);
			$("#taskInsert #endtimeAdd").val(row.endtime);
			$("#taskInsert #id").val(row.id);
			$("#taskInsert #tasknameAdd").val(row.taskName);
			$("#taskInsert #descriptionDiv").hide();
			$("#taskInsert #inspectorAdd option[value="+row.userid+"]").attr("selected",true);
			$("#taskInsert #tasktypeAdd option[value="+row.tasktype+"]").attr("selected",true);
			$("#taskInsert #tasknameAdd").attr("disabled","disabled");
			$("#taskInsert #tasktypeAdd").attr("disabled","disabled");
			$("#taskInsert #taskcycleAdd").attr("disabled","disabled");
			$("#taskInsert #inspectorAdd").attr("disabled","disabled");
			$("#taskInsert #checkListTable").bootstrapTable('refresh');
		},
	});
	
}

//初始化清单表格
function initCheckListTable(){
	$('#taskInsert #checkListTable').bootstrapTable({
		url: contextPath+"/task/getTaskBatchListList.do", //请求后台的URL（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 25], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		height: 400, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		cache:false,//是否使用缓存，默认为true
		onLoadSuccess:function(data){
			var rows = data.rows;
			var listIds = '';
			var listNames = '';
			for (var i = 0; i < rows.length; i++) {
				var listId = rows[i].listid;
				var listName = rows[i].listName;
				listIds+=listId+',';
				listNames+=listName+',';
			}
			listIds = listIds.substring(0,listIds.lastIndexOf(','));
			listNames = listNames.substring(0,listNames.lastIndexOf(','));
			$("#taskInsert #taskListIds").val(listIds);
			$("#taskInsert #taskListNames").val(listNames);
		},
		queryParams: function (params) {//得到查询的参数
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var taskbatchid = $("#taskInsert #taskbatchid").val();
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
	                var pageSize=$('#taskInsert #checkListTable').bootstrapTable('getOptions').pageSize;//每页多少条
	                var pageNumber=$('#taskInsert #checkListTable').bootstrapTable('getOptions').pageNumber;//当前第几页
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
		]
	});
}
//查询巡查周期字典
function getTaskCycle(){
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		data:{"type":"XCZQ"},
		dataType:"json",
		success:function(data){
			var dat = eval(data);
			var list = dat.data;
			var str = '';
			for (var i = 0; i < list.length; i++) {
				str+='<option value="'+list[i].id+'">'+list[i].key+'</option>';
			}
			$("#taskInsert #taskcycleAdd").append(str);
		},
		error:function(error){}
	});
}
//查询任务类型字典
function getTaskType(){
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		data:{"type":"XCRWLX"},
		dataType:"json",
		success:function(data){
			var dat = eval(data);
			var list = dat.data;
			var str = '';
			for (var i = 0; i < list.length; i++) {
				str+='<option value="'+list[i].id+'">'+list[i].key+'</option>';
			}
			$("#taskInsert #tasktypeAdd").append(str);
		},
		error:function(error){}
	});
}
//选择巡查任务类型触发事件
function selectChange(){
	var val = $("#taskInsert #tasktypeAdd option:selected").val();
	if(val ==122){
		$("#taskInsert #taskcycleDiv").hide();
	}else{
		$("#taskInsert #taskcycleDiv").show();
	}
}
//查询巡查人
function getInspector(){
	$.ajax({
		url:contextPath+"/task/getInspector.do",
		type:"post",
		dataType:"json",
		success:function(data){
			var list = data.data;
			var str = '';
			for (var i = 0; i < list.length; i++) {
				var name = list[i].name;
				var id = list[i].id;
				str += '<option value="'+id+'">'+name+'</option>';
			}
			$("#taskInsert #inspectorAdd").append(str);
		},
		error:function(error){}
	});
}
//校验非空
function isNull(val,id){
	if (val == "") {
		id = "#taskInsert #"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}
//日期控件
function laydate(){
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#taskInsert #starttimeAdd', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#taskInsert #endtimeAdd', //指定元素
		    type: 'datetime'
		  });
	});
}
//提交按钮 触发事件
function updateTask(){
	var id = $("#taskInsert #id").val();
	if(id == null || id == ""){//添加任务
		$.ajax({
			url:contextPath+"/task/insertTask.do",
			type:"post",
			dataType:"json",
			data:$("#taskInsert #taskInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					$("#taskInsert #taskId").val(dat.data.id);
					$("#taskInsert #taskBatchTable").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}else{//修改任务
		$.ajax({
			url:contextPath+"/task/updateTaskBatch.do",
			type:"post",
			dataType:"json",
			data:$("#taskInsert #taskInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					$('#taskInsert #taskBatchTable').bootstrapTable('refresh');
					$('#taskInsert #checkListTable').bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}
}
//关闭弹框
function closeDialog(){
	layer.closeAll();
}
//点击选择清单按钮触发事件
function checkList(title){
	$.myPlugin.modelDialog({context:contextPath+'/page/flow/checklist/checklistselect.jsp',title:title,width:'1200px',height:'1400px',offset:'160px',resize:false,
		cancel:function(index, layero){layer.closeAll('tips');}});
}
//删除按钮触发事件
function deleteBatch(batchId){
	console.info(batchId);
	$.ajax({
		url:contextPath+"/task/deleteTaskBatch.do",
		type:"post",
		dataType:"json",
		data:{"batchId":batchId},
		success:function(data){
			var dat = eval(data);
			if(dat.success == true){
				$("#taskInsert #taskBatchTable").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){}
	});
}
