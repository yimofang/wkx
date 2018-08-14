//首页-主菜单-消息服务-消息
//封装到命名空间中,目录+js名称
var information_message = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initMessageList();
	},
	initMessageList:function(){
		$("#messageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #messageList").bootstrapTable({
			url: contextPath+'/system/pushMessage/getPushMessageList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                pushmsgtitle:$("#msgtitle").val(),
						beginTime:$("#messageSearch #beginTime").val(),
						endTime:$("#messageSearch #endTime").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#messageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#messageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'pushmsgtitle',title:'标题',align:'center',valign:'middle',width:'10%'},
				{field:'pushmsgcontext',title:'消息内容',align:'center',valign:'middle',width:'25%'},
				{field:'pushmsgtime',title:'推送时间',align:'center',valign:'middle',width:'10%'},
				{field:'pushmsgtype',title:'消息类型',align:'center',valign:'middle',width:'5%'},
				{field:'pushmsglevel',title:'消息级别',align:'center',valign:'middle',width:'5%'},
				{field:'ischeck',title:'查看状态',align:'center',valign:'middle',width:'5%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'10%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.ischeck == -1) {
	            	        return [
	            	            '<button type="button" class="haveRead btn btn-primary  btn-sm">标记已读</button>',
	            	            ].join('');
	            	  	}else{
	            	        return [
	            	            '',
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
        'click .haveRead': function (e, value, row, index) {//标记已读 	
    		$.ajax({
    			url:contextPath+"/system/pushMessage/updatePushMessage.do",
    			type:"post",
    			dataType:"json",
    			data:row,
    			success:function(data){
    				var dat = eval(data);
    				var result = dat.data;
    				if(dat.success == true){
    					$('#messageList').bootstrapTable('updateRow', {index: index, row: result});
    					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
    				}else{
    					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
    				}
    			},
    			error:function(error){
    				
    			}
    		});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	information_message.initView();
	laydate();
});

function laydate(){
	layui.use('laydate', function(){
		  layui.laydate.render({
		    elem: '#messageSearch #beginTime', //指定元素
		    type: 'datetime'
		  });
		  layui.laydate.render({
		    elem: '#messageSearch #endTime', //指定元素
		    type: 'datetime'
		  });
	});
}

function searchForMessage(){//消息搜索
	$('#messageList').bootstrapTable('refresh');
}
