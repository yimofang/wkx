//@ sourceURL=checklistselect.js
function getListTypeByDict(){//从字典获取隐患清单类型
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"YHQDLX"},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setListType(obj);
			}
		},
		error:function(error){}
	});
}

function setListType(obj){//将隐患清单类型注入页面
	var html = '<option value="0">请选择</option>';
	$("#ltype").append(html);
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#ltype").append(html);
	}	
}
//封装到命名空间中,目录+js名称
var flow_checklist_checklistselect = {
	//全局变量
	//tabId:$.myMethod.getCurTab().id,
	
	initView:function(){
		
		this.initchecklistselect();
		
	},
	initchecklistselect:function(){	
		console.log(contextPath);
		$("#checklistselectList").bootstrapTable('destroy');
		$("#checklistselectList").bootstrapTable({
			url: contextPath+'/flow/checklist/getCheckListByDepId.do', //请求后台的URL（*）  
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                listname:$("#checklistselectSearch #ltname").val(),
		                listtype:$("#checklistselectSearch #ltype").val(),
						beginTime:$("#checklistselectSearch #beginTime").val(),
						endTime:$("#checklistselectSearch #endTime").val()
				};
				return temp;
			},
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 15,20], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			detailView:false,//是否显示加号
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			toolbar: "#addCheckListBar",
			columns: [				
				{checkbox: true,title:'序号',align:'center',valign:'middle',width:'5%',//是否启用勾选
					formatter:function(value, row, index){
						var ids = $("#taskListIds").val();
						var idSplit = ids.split(',');
						for (var i = 0; i < idSplit.length; i++) {
							if (row.id == idSplit[i])
					        return {
					            checked : true//设置选中
					        };
						}
					}	
				},
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
					 formatter: function (value, row, index){
			                var pageSize=$('#checklistselectList').bootstrapTable('getOptions').pageSize;//每页多少条
			                var pageNumber=$('#checklistselectList').bootstrapTable('getOptions').pageNumber;//当前第几页
			                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
							}
					},
					{field:'listname',title:'清单名称',align:'center',valign:'middle',width:'20%'},
					{field:'listtypeName',title:'清单类型',align:'center',valign:'middle',width:'15%'},
					{field:'organizationName',title:'所属部门',align:'center',valign:'middle',width:'15%'},				
					{field:'listdes',title:'清单描述',align:'center',valign:'middle',width:'25%'},
					{field:'creattime',title:'创建时间',align:'center',valign:'middle',width:'15%'}
					
				],
				//点击前面的复选框进行对应的操作
				//点击全选框时触发的操作
		        onCheckAll:function(rows){
		        	//获取以选中的清单
		        	for (var i = 0; i < rows.length; i++) {
						var name = rows[i].listname;
						var id = rows[i].id;
						var ids = $("#taskListIds").val();
						var names = $("#taskListNames").val();
						var nameSplit = names.split(',');
						var idSplit = ids.split(',');
						var k = 0;
						for(y=0;y<nameSplit.length;y++){
			        		var oneName = nameSplit[y];
			        		if(oneName == name){
			        			k++;
			        		}
			        	}
			        	for(y=0;y<idSplit.length;y++){
			        		var oneId = idSplit[y];
			        		if(oneId == id){
			        			k++;
			        		}
			        	}
			        	if(k==0){
							if(ids == ''){
				        		$("#taskListIds").val(id);			         
				        	}else{
				        		$("#taskListIds").val(ids+","+id);			         
				        	}
			        		if(names == ''){
				        		$("#taskListNames").val(name);			         
				        	}else{
				        		$("#taskListNames").val(names+","+name);			         
				        	}
			        	}
					}
		        },
		        //取消全选触发事件
		        onUncheckAll:function(rows){
		        	$("#taskListIds").val('');
					$("#taskListNames").val('');
		        },
				//点击每一个单选框时触发的操作
		        onCheck:function(row){
		        	var name = row.listname;
		        	var id = row.id;
		        	var ids = $("#taskListIds").val();
		        	var names = $("#taskListNames").val();
		        	var nameSplit = names.split(',');
		        	var idSplit = ids.split(',');
		        	var k = 0;
		        	for(i=0;i<nameSplit.length;i++){
		        		var oneName = nameSplit[i];
		        		if(oneName == name){
		        			k++;
		        		}
		        	}
		        	for(i=0;i<idSplit.length;i++){
		        		var oneId = idSplit[i];
		        		if(oneId == id){
		        			k++;
		        		}
		        	}
		        	if(k==0){
		        		if(ids == ''){
			        		$("#taskListIds").val(id);			         
			        	}else{
			        		$("#taskListIds").val(ids+","+id);			         
			        	}
		        		if(names == ''){
			        		$("#taskListNames").val(name);			         
			        	}else{
			        		$("#taskListNames").val(names+","+name);			         
			        	}
		        	}
		        	
		         
		        },
				//取消每一个单选框时对应的操作；
		        onUncheck:function(row){
					var name = row.listname;
					var id = row.id;
					var ids = $("#taskListIds").val();
					var names = $("#taskListNames").val();
					var nameSplit = names.split(',');
		        	var idSplit = ids.split(',');
		        	var idsStr ='';
		        	var namesStr ='';
		        	for(i=0;i<nameSplit.length;i++){
		        		var oneName = nameSplit[i];
		        		if(oneName != name){
	        				namesStr += oneName+',';
		        		}
		        	}
		        	for(i=0;i<idSplit.length;i++){
		        		var oneId = idSplit[i];
		        		if(oneId != id){
	        				idsStr += oneId+',';
		        		}
		        	}
		        	idsStr = idsStr.substring(0,idsStr.length-1);
		        	namesStr = namesStr.substring(0,namesStr.length-1);
		        	$("#taskListIds").val(idsStr);
					$("#taskListNames").val(namesStr);
		        }
		});
	},
	
}

function searchForchecklistselect(){//排查清单搜索
	$('#checklistselectList').bootstrapTable('refresh');
}
//初始化函数
$(document).ready(function() {
	//初始化视图
	getListTypeByDict();
	flow_checklist_checklistselect.initView();
});
