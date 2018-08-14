//首页-主菜单-权限管理-组织机构管理
//封装到命名空间中,目录+js名称
var system_organization_organization = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initOrganizationList();
	},
	initOrganizationList:function(){
		$("#organizationList").bootstrapTable('destroy');
		$('#'+this.tabId+" #organizationList").bootstrapTable({
			url: contextPath+'/system/organization/getOrganizationList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addOrganizationBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#organizationSearch #organname").val(),
						beginTime:$("#organizationSearch #beginTime").val(),
						endTime:$("#organizationSearch #endTime").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#organizationList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#organizationList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'name',title:'机构名称',align:'center',valign:'middle',width:'10%'},
				{field:'pName',title:'上级机构',align:'center',valign:'middle',width:'10%'},
				{field:'level',title:'机构级别',align:'center',valign:'middle',width:'10%'},
				{field:'contantName',title:'机构负责人',align:'center',valign:'middle',width:'10%'},
				{field:'contactName',title:'机构联系人',align:'center',valign:'middle',width:'10%'},
				{field:'create_time',title:'创建时间',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	        	'<button type="button" class="updateOrgan btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteOrgan btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
	            	            '<button type="button" class="configRole btn btn-primary  btn-sm">配置角色</button>'
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateOrgan': function (e, value, row, index) {//修改组织机构      	
			$.myPlugin.modelDialog({context:'../page/system/organization/organizationTag.jsp',data:{organizationId:row.id,index:index},title:"修改组织机构",width:'600px',height:'520px',offset:'150px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteOrgan': function (e, value, row, index) {//删除组织机构
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/organization/deleteOrganization.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#organizationList').bootstrapTable('refresh');
//			        				$('#organizationList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        'click .configRole': function (e, value, row, index) {//配置角色
        	$.myPlugin.modelDialog({context:'../page/system/organization/organConfigRole.jsp',data:{organizationId:row.id},title:"配置角色",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_organization_organization.initView();
	laydate();
});

function laydate(){//搜索区日期控件
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#organizationSearch #beginTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#organizationSearch #endTime', //指定元素
		    type: 'datetime'
		  });
	});
}

function organizationTag(title){//添加组织机构
	$.myPlugin.modelDialog({context:'../page/system/organization/organizationTag.jsp',title:title,width:'600px',height:'520px',offset:'150px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForOrgan(){//组织机构搜索
	$('#organizationList').bootstrapTable('refresh');
}
