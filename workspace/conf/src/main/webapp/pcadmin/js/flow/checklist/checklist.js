//@ sourceURL=checklist.js
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
var flow_checklist_checklist = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	
	initView:function(){
		
		this.initCheckList();
		
	},
	initCheckList:function(){	
		$("#checklistList").bootstrapTable('destroy');
		$("#checklistList").bootstrapTable({
			url: contextPath+'/flow/checklist/getCheckListByDepId.do', //请求后台的URL（*）  
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                listname:$("#ltname").val(),
		                listtype:$("#ltype").val(),
						beginTime:$("#checklistSearch #beginTime").val(),
						endTime:$("#checklistSearch #endTime").val()
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
					{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
					 formatter: function (value, row, index){
			                var pageSize=$('#checklistList').bootstrapTable('getOptions').pageSize;//每页多少条
			                var pageNumber=$('#checklistList').bootstrapTable('getOptions').pageNumber;//当前第几页
			                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
							}
					},
					{field:'listname',title:'清单名称',align:'center',valign:'middle',width:'20%'},
					{field:'listtypeName',title:'清单类型',align:'center',valign:'middle',width:'10%'},
					{field:'organizationName',title:'所属部门',align:'center',valign:'middle',width:'15%'},				
					{field:'listdes',title:'清单描述',align:'center',valign:'middle',width:'25%'},
					{field:'creattime',title:'创建时间',align:'center',valign:'middle',width:'10%'},
					{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
						  events: operateEvents,
				             formatter: function (value, row, index) {
				            	  	if (row.flag == 0) {
				            	  		 return [
//				 	            	        	'<button type="button" class="viewchecklist btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',
				 	            	        	'<button type="button" class="updatechecklist btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
				 	            	            '<button type="button" class="deletechecklist btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>'
				 	            	            ].join('');
				            	  	}
				            	  	
				            	}
				             }						
					
				],
		});
	},
	
}
window.operateEvents = {
//		'click .viewchecklist': function (e, value, row, index) {//查看排查清单      	
//			$.myPlugin.modelDialog({context:'../page/flow/checklist/checklistTag.jsp',data:{checklistId:row.id,index:index},title:"查看排查清单",width:'600px',height:'630px',offset:'150px',resize:false,});
//		},
		'click .updatechecklist': function (e, value, row, index) {//修改排查清单      	
			$.myPlugin.modelDialog({context:'../page/flow/checklist/checklistTag.jsp',data:{checklistId:row.id,index:index},title:"修改排查清单",width:'600px',height:'630px',offset:'150px',resize:false,});
		},
        'click .deletechecklist': function (e, value, row, index) {//删除排查清单
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.listname+"'?",tipType:"checklist",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/flow/checklist/deleteCheckList.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			var dat = eval(data);
			        			var row = dat.data;
			        			if(dat.success == true){
			        				$('#checklistList').bootstrapTable('remove', {field: 'id', values: [row.id]});
			        				$('#checklistList').bootstrapTable('refresh');
			        				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			        			}else{
			        				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			        			}
			        		},
			        		error:function(error){
			        			
			        		}
			        	});
						layer.close(indexBtn);
					},
					btn2Fn: function(){},
				}
        	});
        }      
      
}; 
function checklistTag(title){//添加排查清单
	$.myPlugin.modelDialog({context:'../page/flow/checklist/checklistTag.jsp',title:title,width:'600px',height:'630px',offset:'150px',resize:false,});
	//$.myPlugin.modelDialog({context:'../page/flow/checklist/checklistselect.jsp',title:title,width:'600px',height:'630px',offset:'150px',resize:false,});
}

function searchForchecklist(){//排查清单搜索
	$('#checklistList').bootstrapTable('refresh');
}
//初始化函数
$(document).ready(function() {
	//初始化视图
	getListTypeByDict();
	flow_checklist_checklist.initView();
});
