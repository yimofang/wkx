//首页-主菜单-权限管理-用户管理
//封装到命名空间中,目录+js名称
var system_user_userManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initUserList();
	},
	initUserList:function(){
		$("#userManageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #userManageList").bootstrapTable({
			url: contextPath+'/system/user/getUserList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addUserManageBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#username").val(),
						flag:$('input:radio[name="flag"]:checked').val(),
						beginTime:$("#userManageSearch #beginTime").val(),
						endTime:$("#userManageSearch #endTime").val(),
						orgName:$("#userManageSearch #orgName").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#userManageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#userManageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'logincode',title:'登录名称',align:'center',valign:'middle',width:'10%'},
				{field:'name',title:'用户名',align:'center',valign:'middle',width:'10%'},
				{field:'email',title:'邮箱',align:'center',valign:'middle',width:'10%'},
				{field:'tel',title:'联系电话',align:'center',valign:'middle',width:'10%'},
				{field:'orgName',title:'所属部门',align:'center',valign:'middle',width:'10%'},
				{field:'flagName',title:'用户状态',align:'center',valign:'middle',width:'5%'},
				{field:'register',title:'注册日期',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
	             events: operateEvents,
	             formatter:function(value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	        	'<button type="button" class="updateUser btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteUser btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
	            	            '<button type="button" class="flagChange btn btn-primary  btn-sm" style="margin-right:10px;">冻结</button>',
	            	            '<button type="button" class="configRole btn btn-primary  btn-sm">配置角色</button>',
	            	            ].join('');
	            	  	} else if (row.flag == 1) {
	            	        return [
	            	        	'<button type="button" class="updateUser btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteUser btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>',
	            	            '<button type="button" class="flagChange btn btn-primary  btn-sm" style="margin-right:10px;">激活</button>',
	            	            '<button type="button" class="configRole btn btn-primary  btn-sm">配置角色</button>',
	            	            ].join('');
	            	  	} else if (row.flag == 2){
	            	        return [
	            	            '<button type="button" class="audit btn btn-primary  btn-sm">审核</button>',
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateUser': function (e, value, row, index) {//修改用户
			$.myPlugin.modelDialog({context:'../page/system/user/userManageTag.jsp',data:{userId:row.id,index:index},title:"修改用户",width:'600px',height:'700px',offset:'80px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});

		},
        'click .deleteUser': function (e, value, row, index) {//删除用户
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'的账户?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/user/deleteUser.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#userManageList').bootstrapTable('refresh');
//			        				$('#userList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        'click .flagChange': function (e, value, row, index) {//激活、冻结用户
        	if(row.flag == 0){//冻结用户
            	$.ajax({
            		url:contextPath+"/system/user/freezeUser.do",
            		type:"post",
            		dataType:"json",
            		data:row,
            		success:function(data){
            			var dat = eval(data);
            			var result = dat.data;
            			if(dat.success == true){
            				$('#userManageList').bootstrapTable('updateRow', {index: index, row: result});
            				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
            			}else{
            				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
            			}
            		},
            		error:function(error){}
            	});
        	}else if(row.flag == 1){//激活用户
            	$.ajax({
            		url:contextPath+"/system/user/activateUser.do",
            		type:"post",
            		dataType:"json",
            		data:row,
            		success:function(data){
            			var dat = eval(data);
            			var result = dat.data;
            			if(dat.success == true){
            				$('#userManageList').bootstrapTable('updateRow', {index: index, row: result});
            				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
            			}else{
            				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
            			}
            		},
            		error:function(error){}
            	});
        	}
        },
        'click .audit': function (e, value, row, index) {//审核用户
        	$.ajax({
        		url:contextPath+"/system/user/auditUser.do",
        		type:"post",
        		dataType:"json",
        		data:row,
        		success:function(data){
        			var dat = eval(data);
        			var result = dat.data;
        			if(dat.success == true){
        				$('#userManageList').bootstrapTable('updateRow', {index: index, row: result});
        				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
        			}else{
        				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
        			}
        		},
        		error:function(error){}
        	});
        },
        'click .configRole': function (e, value, row, index) {//配置角色
        	$.myPlugin.modelDialog({context:'../page/system/user/userConfigRole.jsp',data:{userId:row.id},title:"配置角色",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_user_userManage.initView();
	laydate();
});

function laydate(){
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#userManageSearch #beginTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#userManageSearch #endTime', //指定元素
		    type: 'datetime'
		  });
	});
}

function userManageTag(title){//添加用户
		$.myPlugin.modelDialog({context:'../page/system/user/userManageTag.jsp',title:title,width:'600px',height:'700px',offset:'80px',resize:false,
								cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForUser(){//用户搜索
	$('#userManageList').bootstrapTable('refresh');
}

function getOrgIdForSearch(){//获得部门列表
	$.ajax({
		url:contextPath+"/system/organization/getOrgTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getOrgTreeForSearch(data.data);
		},
		error:function(error){}
	});
}

function getOrgTreeForSearch(data){//所属部门下拉树
	$.myPlugin.newDownTree({
		treeId:"#userManageSearch #organTree",	//下拉树要放置的div的Id
		tagWrapId:"#userManage",			//取消下拉树的点击范围
		inpId:"#userManageSearch #orgName",		//input的id
		text:'text',							//列表显示类型
		data:data,								//首传参数
		id:'orgId',								//查询的参数
		result:'data',							//返回参数
		href:contextPath+'/system/organization/getOrgTree.do',
		nodeSelected:function(event,node){
//			$("#userManageSearch #departmentid").val(node.orgId);
			$("#userManageSearch #orgName").val(node.text);
			$("#userManageSearch #organTree").hide();
		}
	});
}

function cleanInput(id){//禁止键盘输入
	$("#"+id).val("");
}