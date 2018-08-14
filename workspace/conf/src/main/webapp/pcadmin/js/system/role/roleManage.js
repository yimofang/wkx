//首页-主菜单-权限管理-角色管理
//封装到命名空间中,目录+js名称
var system_role_roleManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initRoleManageList();
	},
	initRoleManageList:function(){
		$("#roleManageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #roleManageList").bootstrapTable({
			url: contextPath+'/system/role/getRoleList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addRoleManageBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#rolename").val(),
						beginTime:$("#roleManageSearch #beginTime").val(),
						endTime:$("#roleManageSearch #endTime").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#roleManageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#roleManageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'name',title:'角色名称',align:'center',valign:'middle',width:'10%'},
				{field:'orgName',title:'所属部门',align:'center',valign:'middle',width:'10%'},
				{field:'remark',title:'角色描述',align:'center',valign:'middle',width:'10%'},
				{field:'create_time',title:'创建时间',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'10%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	        	'<button type="button" class="updateRole btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteRole btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
	            	            '<button type="button" class="roleConfig btn btn-primary  btn-sm">角色配置</button>',
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateRole': function (e, value, row, index) {//修改角色  	
			$.myPlugin.modelDialog({context:'../page/system/role/roleManageTag.jsp',data:{roleId:row.id,index:index},title:"修改角色",width:'600px',height:'460px',offset:'150px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteRole': function (e, value, row, index) {//删除角色
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/role/deleteRole.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#roleManageList').bootstrapTable('refresh');
//			        				$('#roleManageList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        },
        'click .roleConfig': function (e, value, row, index) {//角色配置
        	$.myPlugin.modelDialog({context:'../page/system/role/roleConfig.jsp',data:{roleId:row.id},title:"角色配置",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_role_roleManage.initView();
	laydate();
});

function laydate(){
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#roleManageSearch #beginTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#roleManageSearch #endTime', //指定元素
		    type: 'datetime'
		  });
	});
}

function addRoleManage(title){//添加角色
	$.myPlugin.modelDialog({context:'../page/system/role/roleManageTag.jsp',title:title,width:'600px',height:'460px',offset:'150px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForRole(){//角色搜索
	$('#roleManageList').bootstrapTable('refresh');
}
