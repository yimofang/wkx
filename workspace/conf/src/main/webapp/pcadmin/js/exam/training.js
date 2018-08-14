//首页-主菜单-培训考试-培训资料
var exam_training_training = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initTrainingList();
	},
	initTrainingList:function(){
		$("#organizationList").bootstrapTable('destroy');//销毁
		$('#'+this.tabId+" #organizationList").bootstrapTable({
			url: contextPath+'/media/table_init.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 13,15,25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addOrganizationBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的/ params.pageSize + 1
				//pageInfo.setPage(Integer.parseInt(offset) / Integer.parseInt(limit) + 1);
				var temp = {
						offset: params.pageNum,
						limit: params.pageSize,
						//name:$("#organizationSearch #organname").val(),
						//beginTime:$("#organizationSearch #beginTime").val(),
						//endTime:$("#organizationSearch #endTime").val()
						//Integer.parseInt(offset) / Integer.parseInt(limit) + 1
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
				{field:'datatitle',title:'资料标题',align:'center',valign:'middle',width:'10%'},
				{field:'content',title:'资料内容',align:'center',valign:'middle',width:'10%'},
				{field:'videoname',title:'视频名称',align:'center',valign:'middle',width:'10%'},
				{field:'address',title:'视频路径',align:'center',valign:'middle',width:'10%'},
				{field:'savetime',title:'创建时间',align:'center',valign:'middle',width:'10%'},
				{field:'ifvideo',title:'是否为视频资料',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
	             events: operateEvents,
	             formatter: function (value, row, index) {
	            	        return [
	            	        	 '<button type="button" class="configRole btn btn-primary  btn-sm" style="margin-right:10px;">详情</button>',
	            	        	'<button type="button" class="updateOrgan btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteOrgan btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>'
	            	            ].join('');
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateOrgan': function (e, value, row, index) {//修改     
			$.myPlugin.modelDialog({context:'../page/exam/training/trainingUpdate.jsp',data:{organizationId:row.id,index:index},title:"修改",width:'600px',height:'520px',offset:'150px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteOrgan': function (e, value, row, index) {//删除
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.datatitle+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/exam/training/deleteTraining.do",
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
        'click .configRole': function (e, value, row, index) {//详情展示
        	  
        	$.myPlugin.modelDialog({context:'../page/exam/training/trainingDetails.jsp',data:{organizationId:row.id},title:"详情",width:'600px',height:'650px',offset:'80px',resize:false,});
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	//alert(contextPath);
	exam_training_training.initView();
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

function organizationTag(title){//添加资料
	$.myPlugin.modelDialog({context:'../page/exam/training/trainingAdd.jsp',title:title,width:'600px',height:'520px',offset:'150px',resize:false,
							cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForOrgan(){//搜索资料
	$('#organizationList').bootstrapTable('refresh');
}
