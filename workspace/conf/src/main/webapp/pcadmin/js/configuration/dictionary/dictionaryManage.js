//首页-主菜单-配置管理-字典管理
//封装到命名空间中,目录+js名称
var configuration_dictionary_dictionaryManage = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	//方法
	initView:function(){
		this.initDictList();
	},
	initDictList:function(){
		$("#dictManageList").bootstrapTable('destroy');
		$('#'+this.tabId+" #dictManageList").bootstrapTable({
			url: contextPath+'/dict/getDictList.do', //请求后台的URL（*） 
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 25], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			cache:false,//是否使用缓存，默认为true
			toolbar: "#addDictManageBar",
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
						name:$("#name").val()
				};
				return temp;
			},
			columns: [
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#dictManageList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#dictManageList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'name',title:'字典名称',align:'center',valign:'middle',width:'10%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'15%',
	             events: operateEvents,
	             formatter:function(value, row, index) {
	            	  	if (row.flag == 0) {
	            	        return [
	            	        	'<button type="button" class="updateDict btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
	            	            '<button type="button" class="deleteDict btn btn-primary  btn-sm">删除</button>',
	            	            ].join('');
	            	  	}
	            	}
	             }
			]
		});
	}
}

window.operateEvents = {
		'click .updateDict': function (e, value, row, index) {//修改字典
			$.myPlugin.modelDialog({context:'../page/configuration/dictionary/dictionaryManageTag.jsp',data:{dictType:row.type,index:index},title:"修改字典",width:'600px',height:'550px',offset:'80px',resize:false,
									cancel:function(index, layero){layer.closeAll('tips');}});
		},
        'click .deleteDict': function (e, value, row, index) {//删除字典
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.name+"'?",tipType:"notice",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/dict/deleteDict.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			if(data.success == true){
			        				$('#dictManageList').bootstrapTable('refresh');
//			        				$('#dictManageList').bootstrapTable('remove', {field: 'id', values: [row.id]});
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
        }
}; 

//初始化函数
$(document).ready(function() {
	//初始化视图
	configuration_dictionary_dictionaryManage.initView();
});

function dictManageTag(title){//添加字典
		$.myPlugin.modelDialog({context:'../page/configuration/dictionary/dictionaryManageTag.jsp',title:title,width:'600px',height:'550px',offset:'80px',resize:false,
								cancel:function(index, layero){layer.closeAll('tips');}});
}

function searchForDict(){//字典搜索
	$('#dictManageList').bootstrapTable('refresh');
}







