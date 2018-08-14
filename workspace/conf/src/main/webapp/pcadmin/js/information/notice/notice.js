//@ sourceURL=notice.js
//首页-主菜单-消息服务-通知
//封装到命名空间中,目录+js名称
var information_notice_notice = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initnoticeList();
		$('#'+this.tabId+" #noticeList").bootstrapTable('hideColumn', 'ischeck');
		$('#'+this.tabId+" #noticeList").bootstrapTable('hideColumn', 'checktime');
		$('#'+this.tabId+" #noticeList").bootstrapTable('hideColumn', 'replycontent');
		$('#'+this.tabId+" #noticeList").bootstrapTable('hideColumn', 'replytime');
	},
	initnoticeList:function(){
		var noticeWay= $("#noticeWay").val();
		var nmethod="";	
		//判断是接收还是发送通知
		if(noticeWay=="0"){
			
			nmethod="getNoticeByUserId";//发送通知接口方法			
		}
		else{
			nmethod="getRevNoticeByUserId";//接收通知接口方法
		}
		$("#noticeList").bootstrapTable('destroy');
		$('#'+this.tabId+" #noticeList").bootstrapTable({
			url: contextPath+'/system/notice/'+nmethod+'.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 700, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true			
			toolbar: "#addNoticeBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                noticetitle:$("#noticetitle").val(),
						beginTime:$("#noticeSearch #beginTime").val(),
						endTime:$("#noticeSearch #endTime").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#noticeList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#noticeList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'noticetitle',title:'标题',align:'center',valign:'middle',width:'10%'},
				{field:'noticecontent',title:'通知内容',align:'center',valign:'middle',width:'25%'},
				{field:'noticetime',title:'发布时间',align:'center',valign:'middle',width:'10%'},
				{field:'noticetypename',title:'通知类型',align:'center',valign:'middle',width:'5%'},
				{field:'noticelevelname',title:'通知级别',align:'center',valign:'middle',width:'5%'},
				{field:'isrevertiblename',title:'是否可回复',align:'center',valign:'middle',width:'5%'},
				{field:'ischeck',title:'查看状态',align:'center',valign:'middle',width:'5%'},
				{field:'checktime',title:'查看时间',align:'center',valign:'middle',width:'5%'},
				{field:'replycontent',title:'回复内容',align:'center',valign:'middle',width:'5%'},
				{field:'replytime',title:'回复时间',align:'center',valign:'middle',width:'5%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'10%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	  	if (row.flag == 0) {
	            	  		if(noticeWay=="0"){
	            	  			 return [
	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',
//	 	            	        	'<button type="button" class="updateNotice btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	 	            	            '<button type="button" class="deleteNotice btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>'
	 	            	            ].join('');
	            	  		}
	            	  		else{
	            	  			if(row.isrevertible==33){
	            	  				if(row.ischeck==1){
	            	  					if(row.isreply==1){
	            	  						 return [
	 	 	 	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>'	 	 	 	            	        	
	 	 	 	 	            	        	
	 	 	 	 	            	            ].join('');
	            	  					}
	            	  					else{
	            	  						 return [
	 	 	 	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',//	 	 	 	            	        	
	 	 	 	 	            	        	'<button type="button" class="replyNotice btn btn-primary  btn-sm">反馈</button>'
	 	 	 	 	            	            ].join('');
	            	  					}   
	            	  				}
	            	  				else{
	            	  					 return [
	 	 	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',
	 	 	 	            	        	'<button type="button" class="signNotice btn btn-primary  btn-sm" style="margin-right:10px;">标记已读</button>',
	 	 	 	            	        	'<button type="button" class="replyNotice btn btn-primary  btn-sm">反馈</button>'
	 	 	 	            	            ].join('');
	            	  				}	
	            	  				
	            	  			}
	            	  			else{
	            	  				if(row.ischeck==1){
	            	  					return [
 		 	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>'
 		 	 	            	        	
 		 	 	            	            ].join('');
 	 	            	        	}else{
 	 	            	        		return [
 		 	 	            	        	'<button type="button" class="viewNotice btn btn-primary  btn-sm" style="margin-right:10px;">查看</button>',
 		 	 	            	        	'<button type="button" class="signNotice btn btn-primary  btn-sm" style="margin-right:10px;">标记已读</button>'
 		 	 	            	            ].join('');
 	 	            	        	}
	            	  				
	            	  			}	
	            	  			
	            	  		}
	            	  			
	            	       
	            	  	}
	            	  	
	            	}
	             }
			]
		});
	}
	
}

window.operateEvents = {
		'click .viewNotice': function (e, value, row, index) {//查看通知公告      	
			$.myPlugin.modelDialog({context:'../page/information/notice/noticeTag.jsp',data:{noticeId:row.id,viewtype:0,noticeWay:$("#noticeWay").val(),index:index},title:"查看通知公告",width:'600px',height:'630px',offset:'150px',resize:false,});
		},
		'click .updateNotice': function (e, value, row, index) {//修改通知公告      	
			$.myPlugin.modelDialog({context:'../page/information/notice/noticeTag.jsp',data:{noticeId:row.id,index:index},title:"修改通知公告",width:'600px',height:'630px',offset:'150px',resize:false,});
		},
        'click .deleteNotice': function (e, value, row, index) {//删除通知公告
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.noticetitle+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/notice/deleteNotice.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			var dat = eval(data);
			        			var row = dat.data;
			        			if(dat.success == true){
			        				$('#noticeList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        },
        'click .signNotice': function (e, value, row, index) {//通知公告标记已读
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认已读:'"+row.noticetitle+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/system/notice/signNotice.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			var dat = eval(data);
			        			var row = dat.data;
			        			if(dat.success == true){
			        				$('#noticeList').bootstrapTable('refresh', {field: 'id', values: [row.id]});
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
        },
        'click .replyNotice': function (e, value, row, index) {//回复
        	$.myPlugin.modelDialog({context:'../page/information/notice/noticeTag.jsp',data:{noticeId:row.id,viewtype:1,index:index},title:"回复通知公告",width:'650px',height:'800px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	information_notice_notice.initView();
	
});

function noticeTag(title){//添加通知公告
	$.myPlugin.modelDialog({context:'../page/information/notice/noticeTag.jsp',title:title,width:'600px',height:'630px',offset:'150px',resize:false,});
}

function searchForNotice(){//通知公告搜索
	$('#noticeList').bootstrapTable('refresh');
}
$("#noticeWay").change(function () {      
	information_notice_notice.initView();
	//判断是接收还是发送通知
	if($("#noticeWay").val()==0){
		$("#addNoticeBar").show();//发送通知显示添加通知按钮		
	}
	else{
		$("#addNoticeBar").hide();//发送通知隐藏添加通知按钮
	}
});  

