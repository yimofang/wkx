$(document).ready(function() {
	laydate();
	getTaskType();
	getTaskCycle();
	getTaskInfo();
	getInspector();
});

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
			$("#taskcycleAdd").append(str);
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
			$("#tasktypeAdd").append(str);
		},
		error:function(error){}
	});
}
//选择巡查任务类型触发事件
function selectChange(){
	var val = $("#tasktypeAdd option:selected").val();
	if(val ==122){
		$("#taskcycleDiv").hide();
	}else{
		$("#taskcycleDiv").show();
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
			$("#inspectorAdd").append(str);
		},
		error:function(error){}
	});
}
//获取任务基本信息
function getTaskInfo() {
	if(taskId != null) {
		$.ajax({
			url:contextPath+"/task/getTaskById.do",
			type:"post",
			dataType:"json",
			data:{"taskId":taskId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data.data;
				if(dat.success == true){
					$("#taskInfo #id").val(obj.id);			
					$("#taskInfo #flag").val(obj.flag);			
					$("#taskInfo #tasknameAdd").val(obj.taskname);			
					$("#taskInfo #tasktypeAdd").val(obj.tasktype);			
					$("#taskInfo #inspectorAdd").val(obj.inspector);			
					$("#taskInfo #taskcycleAdd").val(obj.taskcycle);			
					$("#taskInfo #starttimeAdd").val(obj.starttime);			
					$("#taskInfo #endtimeAdd").val(obj.endtime);			
					$("#taskInfo #descriptionAdd").val(obj.description);			
					$("#taskInfo #taskTypeDiv").hide();
					$("#taskInfo #inspectorDiv").hide();
					$("#taskInfo #taskcycleDiv").hide();
					$("#taskInfo #startDiv").hide();
					$("#taskInfo #endDiv").hide();
					$("#taskInfo #taskListDiv").hide();
				}
			},
			error:function(error){}
		});
	}
}
//校验非空
function isNull(val,id){
	if (val == "") {
		id = "#"+id
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
		    elem: '#starttimeAdd', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#endtimeAdd', //指定元素
		    type: 'datetime'
		  });
	});
}

function updateTask(){
	var id = $("#id").val();
	if(id == null || id == ""){//添加任务
		$.ajax({
			url:contextPath+"/task/insertTask.do",
			type:"post",
			dataType:"json",
			data:$("#taskInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#taskList").bootstrapTable('refresh');
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}else{//修改任务
		$.ajax({
			url:contextPath+"/task/updateTask.do",
			type:"post",
			dataType:"json",
			data:$("#taskInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$('#taskList').bootstrapTable('updateRow', {index: index, row: result});
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}
}
function closeDialog(){
	layer.closeAll();
}
