//首页-主菜单-权限管理-菜单管理
//封装到命名空间中,目录+js名称
var system_menu_menuManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initmenuManageList();
	},
	initmenuManageList:function(){
		$("#menuManageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #menuManageList").bootstrapTable({
			url: contextPath+'/system/menu/getMenuList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addMenuManageBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#menuname").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#menuManageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#menuManageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'name',title:'菜单名称',align:'center',valign:'middle',width:'8%'},
				{field:'pname',title:'上级菜单',align:'center',valign:'middle',width:'5%'},
				{field:'url',title:'菜单地址',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	        if(row.url != null){
		            	        return [
		            	        	'<button type="button" class="updateMenu btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
		            	            '<button type="button" class="deleteMenu btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
		            	            '<button type="button" class="funcConfig btn btn-primary  btn-sm">功能配置</button>',
		            	            ].join('');
	            	        }else{
		            	        return [
		            	        	'<button type="button" class="updateMenu btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
		            	            '<button type="button" class="deleteMenu btn btn-primary  btn-sm">删除</button>',
		            	            ].join('');
	            	        }
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateMenu': function (e, value, row, index) {//修改菜单
			$.myPlugin.modelDialog({context:'../page/system/menu/menuManageTag.jsp',data:{menuId:row.id,index:index},title:"修改菜单",width:'550px',height:'500px',offset:'200px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteMenu': function (e, value, row, index) {//删除菜单
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/menu/deleteMenu.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#menuManageList').bootstrapTable('refresh');
//			        				$('#menuManageList').bootstrapTable('remove', {field: 'id', values: [result.id]});
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
        },
        'click .funcConfig': function (e, value, row, index) {//功能配置
        	$.myPlugin.modelDialog({context:'../page/system/menu/functionConfig.jsp',data:{menuId:row.id},title:"功能配置",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_menu_menuManage.initView();
});

function addMenuManage(title){//添加菜单
	$.myPlugin.modelDialog({context:'../page/system/menu/menuManageTag.jsp',title:title,width:'550px',height:'500px',offset:'200px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForMenu(){//菜单搜索
	$('#menuManageList').bootstrapTable('refresh');
}
