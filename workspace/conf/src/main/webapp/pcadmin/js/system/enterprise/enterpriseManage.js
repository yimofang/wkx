//首页-主菜单-权限管理-企业管理
//封装到命名空间中,目录+js名称
var system_enterprise_enterpriseManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initEnterpriseList();
	},
	initEnterpriseList:function(){
		$("#enterpriseList").bootstrapTable('destroy');
		$('#'+this.tabId+" #enterpriseList").bootstrapTable({
			url: contextPath+'/system/enterPrise/getEnterPriseList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addEnterpriseBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                ename:$("#entername").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'3%',
				 formatter: function (value, row, index){
		                var pageSize=$('#enterpriseList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#enterpriseList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'ename',title:'企业名称',align:'center',valign:'middle',width:'10%'},
				{field:'legalperson',title:'企业法人',align:'center',valign:'middle',width:'5%'},
				{field:'tel',title:'联系电话',align:'center',valign:'middle',width:'5%'},
				{field:'email',title:'电子邮箱',align:'center',valign:'middle',width:'5%'},
				{field:'regaddress',title:'注册地址',align:'center',valign:'middle',width:'10%'},
				{field:'runscope',title:'经营范围',align:'center',valign:'middle',width:'10%'},
				{field:'fondedate',title:'成立日期',align:'center',valign:'middle',width:'7%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'12%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	            '<button type="button" class="deleteEnter btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
	            	            '<button type="button" class="roleConfig btn btn-primary  btn-sm">角色配置</button>'
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
        'click .deleteEnter': function (e, value, row, index) {//删除企业
        	var caveat = "此操作将删除企业及企业下所有信息。包括“组织机构”,“角色”,“用户”等。请慎重选择！<br />是否确认删除:“"+row.ename+"”?";
        	$.myPlugin.judgementDialog({title:"警告",context:caveat,tipType:"error",width:"300px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/enterPrise/deleteEnterPrise.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#enterpriseList').bootstrapTable('refresh');
//			        				$('#enterpriseList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        'click .roleConfig': function (e, value, row, index) {//企业角色配置
        	$.myPlugin.modelDialog({context:'../page/system/enterprise/enterRoleConfig.jsp',data:{roleId:row.roleId},title:"角色配置",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_enterprise_enterpriseManage.initView();
});

function enterpriseManageTag(title){//添加企业
	$.myPlugin.modelDialog({context:'../page/system/enterprise/enterpriseManageTag.jsp',title:title,width:'550px',height:'400px',offset:'150px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForEnter(){//企业搜索
	$('#enterpriseList').bootstrapTable('refresh');
}

