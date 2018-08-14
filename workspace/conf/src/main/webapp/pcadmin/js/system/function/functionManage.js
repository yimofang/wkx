//首页-主菜单-权限管理-功能管理
//封装到命名空间中,目录+js名称
var system_function_functionManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initFunctionManageList();
	},
	initFunctionManageList:function(){
		$("#functionManageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #functionManageList").bootstrapTable({
			url: contextPath+'/system/function/getFunctionList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addFunctionManageBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#functionname").val(),
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#functionManageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#functionManageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'name',title:'功能名称',align:'center',valign:'middle',width:'10%'},
				{field:'code',title:'功能识别码',align:'center',valign:'middle',width:'10%'},
				{field:'pName',title:'上级功能',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'10%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	        	'<button type="button" class="updateFunc btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteFunc btn btn-primary  btn-sm">删除</button>',
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateFunc': function (e, value, row, index) {//修改功能	
			$.myPlugin.modelDialog({context:'../page/system/function/functionManageTag.jsp',data:{funcId:row.id,index:index},title:"修改功能",width:'550px',height:'400px',offset:'250px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteFunc': function (e, value, row, index) {//删除功能
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/function/deleteFunction.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#functionManageList').bootstrapTable('refresh');
//			        				$('#functionManageList').bootstrapTable('remove', {field: 'id', values: [result.id]});
			        				$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"success",time:3000});
			        			}else{
			        				$.myPlugin.prompt({title:"提示",context:data.msg,tipType:"error",time:3000});
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

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_function_functionManage.initView();
});

function addFunctionManage(title){//添加功能
	$.myPlugin.modelDialog({context:'../page/system/function/functionManageTag.jsp',title:title,width:'550px',height:'400px',offset:'250px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForFunc(){//功能搜索
	$('#functionManageList').bootstrapTable('refresh');
}
