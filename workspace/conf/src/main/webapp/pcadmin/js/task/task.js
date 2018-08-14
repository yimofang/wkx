//封装到命名空间中,目录+js名称
var task_task = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initTaskList();
	},
	initTaskList:function(){
		$("#taskList").bootstrapTable('destroy');
		$('#'+this.tabId+" #taskList").bootstrapTable({
			url: contextPath+"/task/getTaskList.do", //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addTaskBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						taskname:$("#taskname").val(),
//						tasktype:$('#tasktype option:selected').val(),
//						tasktype:$('#taskcycle option:selected').val(),
						creStartTime:$("#creStartTime").val(),
						creEndTime:$("#creEndTime").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#taskList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#taskList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'taskname',title:'任务名称',align:'center',valign:'middle',width:'10%'},
				{field:'taskTypeName',title:'巡查类型',align:'center',valign:'middle',width:'5%'},
				{field:'taskCycleName',title:'巡查周期',align:'center',valign:'middle',width:'5%'},
				{field:'inspectorName',title:'巡查人',align:'center',valign:'middle',width:'5%'},
				{field:'description',title:'任务描述',align:'center',valign:'middle',width:'10%'},
				{field:'starttime',title:'任务开始时间',align:'center',valign:'middle',width:'10%'},
				{field:'endtime',title:'任务结束时间',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'10%',
	             events: operateEvents,
	             formatter:function(value, row, index) {
            	        return [
            	        	'<button type="button" class="updateTask btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
            	            '<button type="button" class="deleteTask btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
            	            '<button type="button" class="msgTask btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',
            	            ].join('');
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateTask': function (e, value, row, index) {//修改任务
			$.myPlugin.modelDialog({context:'../page/task/taskTag.jsp',data:{taskId:row.id,index:index},title:"修改任务",width:'600px',height:'700px',offset:'80px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});

		},
        'click .deleteTask': function (e, value, row, index) {//删除任务
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.taskname+"'的任务?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/task/deleteTask.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#taskList').bootstrapTable('refresh');
//			        				$('#userList').bootstrapTable('remove', {field: 'id', values: [row.id]});
			        				$.myPlugin.prompt({title:"提示",context:data.data.msg,tipType:"success",time:3000});
			        			}else{
			        				$.myPlugin.prompt({title:"提示",context:data.data.msg,tipType:"error",time:3000});
			        			}
			        		},
			        		error:function(error){}
			        	});
						layer.close(indexBtn);
					},
					btn2Fn: function(){},
				}
        	});
        },
        'click .msgTask': function (e, value, row, index) {//查看任务
        	var title = row.taskname;
        	var url = contextPath+"/page/task/taskMsg.jsp?task_id="+row.id;
			$.myMethod.addTab({title:title,url:url,id:row.serial_code,type:'iframe'});
        }
}

$(document).ready(function() {
	//初始化视图
	task_task.initView();
	laydate();
	getTaskType();
	getTaskCycle();
});

function taskTag(title){//添加任务
	$.myPlugin.modelDialog({context:'../page/task/taskTag.jsp',title:title,width:'600px',height:'700px',offset:'80px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchTable(){
	$('#taskList').bootstrapTable('refresh');
}

function laydate(){
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#creStartTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#creEndTime', //指定元素
		    type: 'datetime'
		  });
	});
}
function closeDialog(){
	layer.closeAll();
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
			var str = '<option>全部</option>';
			for (var i = 0; i < list.length; i++) {
				str+='<option value="'+list[i].id+'">'+list[i].key+'</option>';
			}
			$("#taskcycle").append(str);
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
			var str = '<option>全部</option>';
			for (var i = 0; i < list.length; i++) {
				str+='<option value="'+list[i].id+'">'+list[i].key+'</option>';
			}
			$("#tasktype").append(str);
		},
		error:function(error){}
	});
}

function checkList(title){
	$.myPlugin.modelDialog({context:'../page/flow/checklist/checklistselect.jsp',title:title,width:'1200px',height:'1400px',offset:'160px',resize:false,
		cancel:function(index, layero){layer.closeAll('tips');}});
}
