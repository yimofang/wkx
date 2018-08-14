
//封装到命名空间中,目录+js名称
var system_flow_flowList = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	flowCode:$('#homeTabs').tabs('getSelected').panel('options').href.split('=')[1],//YHPC
	//初始化页面
	initView:function(){
		//修改添加流程按钮Id
		$("#"+this.tabId+" #createFlow").attr("id","create"+this.flowCode+"Flow");
		//修改表格Id
		$("#"+this.tabId+" #userList").attr("id","user"+this.flowCode+"List");
		//修改搜索表单的Id
		$("#"+this.tabId+" #formSearch").attr("id","form"+this.flowCode+"Search");
		//修改添加流程的弹出框
		$("#"+this.tabId+" #dlgSubmit").attr("id","dlg"+this.flowCode+"Submit");
		//各页面对应的访问地址
		var url = searchUrl(this.flowCode);
//		初始化表格
		this.initUserList(url,system_flow_flowList.flowCode,this.tabId);
//		页面隐藏创建流程按钮
		if(this.flowCode=="WAIT"||this.flowCode=="OFFICE"||this.flowCode=="DONE"||this.flowCode=="ARCHIVE"){
			$("#"+this.tabId+" #create"+this.flowCode+"Flow").css("display","none");
		}
		//搜索流程状态初始化
		if(this.flowCode == "ARCHIVE"){
			this.initFlowSts([0,2]);
		}else if(this.flowCode=="WAIT"||this.flowCode=="OFFICE"||this.flowCode=="DONE"){
			this.initFlowSts([1]);
		}
//		初始化时间控件
		this.initDataRange();
	},
//	初始化时间控件
	initDataRange:function(){
		$.myPlugin.layDataTime('#'+this.tabId+' #form'+this.flowCode+'Search #creatFlowTime #create_time','datetime');
		$.myPlugin.layDataTime('#'+this.tabId+' #form'+this.flowCode+'Search #creatFlowTime #end_create_time','datetime');
	},
	initFlowSts:function(valArr){
		for(var i = 0;i<valArr.length;i++){	
			$('#'+this.tabId+' #form'+this.flowCode+'Search #sts').find("[value="+valArr[i]+"]").css("display","none");
		}
	},
//	初始化表格
	initUserList:function(url,flowCode,cur_id){		
		$('#'+this.tabId+' #user'+this.flowCode+'List').bootstrapTable({
			url: url, //请求后台的URL（*） 
			queryParams:function(params){
				var searchData = $('#'+cur_id+' #form'+flowCode+'Search').serializeObject();
				params.pageNum = params.pageNum / params.pageSize + 1;
				params.flow_code=flowCode;
				params.serial_code=searchData.serial_code;
				params.name=searchData.name;
				params.sts=searchData.sts;
				params.begin_create_time=searchData.begin_create_time;
				params.end_create_time=searchData.end_create_time;
				
				return params;
			},//传递参数（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 15,20], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			detailView:false,//是否显示加号
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			toolbar: "#create"+this.flowCode+"Flow",
			columns: [
//				{checkbox:true},//是否启用勾选
				{field:'serial_code',title:'流程编号'},
				{field:'name',title:'流程名字'},
				{field:'cur_node_name',title:'当前节点'},
				{field:'create_time',title:'流程创建日期'},
				{field:'sts',title:'流程状态',formatter:function(value,row,index){
					if(row.sts==0){
						return "正常";
					}else if(row.sts==1){
						return "完结归档";
					}else if(row.sts==2){
						return "挂起";
					}
				}}
				],
				onClickRow:function(row){
					var title = row.name;
					var radom = Math.random()*10000;
					var url = contextPath+"/page/flow/flowMainEx.jsp?flow_id="+row.id+"&code="+radom;
					$.myMethod.addTab({title:title,url:url,id:row.serial_code,type:'iframe'});
				},
//			onExpandRow:function(index,row,$detail){
//				system_flow_flowList.initSubTable(index,row,$detail);
//			}
		});
	},
	initSubTable:function(index,row,$detail){
        var cur_table = $detail.html('<table></table>').find('table');
        $(cur_table).bootstrapTable({
        	data:[
        		{"id":"1","name":"111","price":"12345","num":"11111"},
        		{"id":"2","name":"111","price":"12345","num":"11111"},
        		{"id":"3","name":"111","price":"12345","num":"11111"},
        		{"id":"4","name":"111","price":"12345","num":"11111"},
        		],
        	showHeader:false,
            detailView: true,//父子表
            columns: [
            	{field: 'id',title: 'id'},
            	{ field: 'name',title: '姓名'},
            	{field: 'price',title: '价格'},
            	{field: 'num',title: '数量'}],
            //无线循环取子表，直到子表里面没有记录
            onExpandRow: function (index, row, $Subdetail) {
            	system_flow_flowList.initSubTable(index,row,$Subdetail);
            }
        });
	},
	isHiddenAddNewUser:function(){//是否隐藏添加新用户
		$("#testtwo9").parent().css("display","none");
	}
}
function searchUrl(flowCode){
	var url = "";
	if(flowCode=="WAIT"){
		url = contextPath+'/flow/getWaitExampleList.do';//待办页面
	}else if(flowCode=="OFFICE"){
		url = contextPath+'/flow/getOfficeExampleList.do';//在办页面
	}else if(flowCode=="DONE"){
		url = contextPath+'/flow/getDoneExampleList.do';//已办页面
	}else if(flowCode=="ARCHIVE"){
		url = contextPath+'/flow/getFileExampleList.do';//归档页面
	}else{
		url = contextPath+'/flow/getInitialeExampleList.do';//发起人列表
	}
	return url;
}
//搜索按钮
function searchBut(cur_id,flowCode){
	//表单的搜索条件
	var searchData = $('#'+cur_id+' #form'+flowCode+'Search').serializeObject();
	//表格携带数据
	 var opt = {
		url: searchUrl(flowCode),

	    query:{
	    	serial_code:searchData.serial_code,
	    	name:searchData.name,
	    	sts:searchData.sts,
	    	begin_create_time:searchData.begin_create_time,
	    	end_create_time:searchData.end_create_time,
	    }
	    
	};

	//刷新表格
	$('#'+cur_id+' #user'+flowCode+'List').bootstrapTable('refresh');
}

//创建流程打开弹框
function openWind(tabId,flowCode){
	$.ajax({
		url:contextPath+"/flow/getFlowExampleAddInfo.do",
		type:"post",
		dataType:"json",
		data:{flowCode:flowCode},
		success:function(data){
			console.log(data)
			if(data.success){
				$("#"+tabId+" #dlg"+flowCode+"Submit").modal('show');
				data = data.data;
				//填充弹窗数据
				$("#"+tabId+" #dlg"+flowCode+"Submit .layui-form-item:nth-of-type(1)").find("input").val(data.serial_code);
				$("#"+tabId+" #dlg"+flowCode+"Submit .layui-form-item:nth-of-type(2)").find("input").val(data.name);
				$("#"+tabId+" #dlg"+flowCode+"Submit .layui-form-item:nth-of-type(3)").find("select").html("<option>"+$('#homeTabs').tabs('getSelected').panel('options').title+"</option>");
				$("#"+tabId+" #dlg"+flowCode+"Submit .modal-footer button:nth-of-type(1)").unbind("click")
				$("#"+tabId+" #dlg"+flowCode+"Submit .modal-footer button:nth-of-type(1)").bind("click",function(){
					var processName = $("#"+$('#homeTabs').tabs('getSelected').panel('options').id+" #dlg"+flowCode+"Submit .layui-form-item:nth-of-type(2)").find("input").val();
					$.ajax({
						url:contextPath+"/flow/createFlowExample.do",
						type:"post",
						dataType:"json",
						data:{
							define_code:data.define_code,
							serial_code:data.serial_code,
							name:processName,
							define_id:data.define_id
						},
						success:function(data){
							if(data.success){
								$('#'+tabId+' #user'+flowCode+'List').bootstrapTable('refresh');
							}
						}
					});
				})
			}else{
				$.myPlugin.judgementDialog({
					title: "提示",
					context: data.msg,
					height: "150px",
					shade:0.5,
					btnFn: {
						btn1Fn: function(index, layero) {
							layer.close(index);
						}
					}
				});
			}
		}
	});
}

//初始化函数
$(document).ready(function() {
	//初始化视图
	system_flow_flowList.initView();
});
