//@ sourceURL=checkitem.js
/**
 * 清单检查项列表
 */
//封装到命名空间中,目录+js名称
var flow_checklist_checkitem = {
	//全局变量
	tabId:$.myMethod.getCurTab().id,
	
	initView:function(){
		
		this.initcheckitem();
		
	},
	initcheckitem:function(){	
		$("#checkitemList").bootstrapTable('destroy');
		$("#checkitemList").bootstrapTable({
			url: contextPath+'/flow/checklist/getCheckItemList.do', //请求后台的URL（*）  
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {
						pageNum: params.pageNum / params.pageSize + 1,
		                pageSize: params.pageSize,
		                itemname:$("#itemnameserch").val(),	
		                pitemid:0,	
						beginTime:$("#checkitemSearch #beginTime").val(),
						endTime:$("#checkitemSearch #endTime").val()
				};
				return temp;
			},
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 15,20], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			detailView:false,//是否显示加号
			height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			detailView:true,//是否显示加号
			toolbar: "#addcheckitemBar",
			columns: [
					{checkbox: true,title:'序号',align:'center',valign:'middle',width:'5%'},//是否启用勾选
					{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
					 formatter: function (value, row, index){
			                var pageSize=$('#checkitemList').bootstrapTable('getOptions').pageSize;//每页多少条
			                var pageNumber=$('#checkitemList').bootstrapTable('getOptions').pageNumber;//当前第几页
			                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
							}
					},
					{field:'itemname',title:'检查项名称',align:'center',valign:'middle',width:'30%'},
//					{field:'itemcontent',title:'检查项描述',align:'center',valign:'middle',width:'25%'},
//					{field:'organizationid',title:'所属部门',align:'center',valign:'middle',width:'25%'},	
					{field:'creattime',title:'创建时间',align:'center',valign:'middle',width:'15%'},
					{field: 'operate',title: '操作',align:'center',valign:'middle',width:'38%',
						  events: operateEvents,
				             formatter: function (value, row, index) {
				            	  	if (row.flag == 0) {
				            	  		 return [				 	            	        	
				 	            	        	'<button type="button" class="updatecheckitem btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
				 	            	        	'<button type="button" class="addcheckitemson btn btn-primary  btn-sm" style="margin-right:10px;">添加子项</button>',
				 	            	            '<button type="button" class="deletecheckitem btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>'
				 	            	            ].join('');
				            	  	}
				            	  	
				            	}
				             }						
					
				],				
			onExpandRow:function(index,row,$detail){
				flow_checklist_checkitem.initSubTable(index,row,$detail);
			},
			//点击前面的复选框进行对应的操作
			//点击全选框时触发的操作
			        onCheckAll:function(rows){
			          //console.log(rows);
			          for(var i=0;i<rows.length;i++){
			        	  flow_checklist_checkitem.addItem(rows[i]);
			          }
			        },
			//点击每一个单选框时触发的操作
			        onCheck:function(row){
			          //console.log(row);			         
			          flow_checklist_checkitem.addItem(row);
			        },
			//取消每一个单选框时对应的操作；
			        onUncheck:function(row){
			          console.log(row);
			        }
			
		});
	},
	initSubTable:function(index,row,$detail){
        var cur_table = $detail.html('<table></table>').find('table');      
        $(cur_table).bootstrapTable({
        	url: contextPath+'/flow/checklist/getCheckItemList.do', //请求后台的URL（*）  
			queryParams: function (params) {//得到查询的参数
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {						
		                pitemid:row.id
				};
				return temp;
			},
        	showHeader:false,
            detailView: true,//父子表
            columns: [
				{checkbox: true,title:'序号',align:'center',valign:'middle',width:'5%'},//是否启用勾选
				{field:'SerialNumber',title:'序号',align:'center',valign:'middle',width:'5%',
				 formatter: function (value, row, index){
		                var pageSize=$('#checkitemList').bootstrapTable('getOptions').pageSize;//每页多少条
		                var pageNumber=$('#checkitemList').bootstrapTable('getOptions').pageNumber;//当前第几页
		                return pageSize * (pageNumber - 1) + index + 1;    //每页条数 *(当前页-1)+序号
						}
				},
				{field:'itemname',title:'检查项名称',align:'center',valign:'middle',width:'30%'},
//				{field:'itemcontent',title:'检查项描述',align:'center',valign:'middle',width:'25%'},
//				{field:'organizationid',title:'所属部门',align:'center',valign:'middle',width:'25%'},	
				{field:'creattime',title:'创建时间',align:'center',valign:'middle',width:'15%'},
				{field: 'operate',title: '操作',align:'center',valign:'middle',width:'38%',
					  events: operateEvents,
			             formatter: function (value, row, index) {
			            	  	if (row.flag == 0) {
			            	  		 return [				 	            	        	
			 	            	        	'<button type="button" class="updatecheckitem btn btn-primary  btn-sm" style="margin-right:10px;">修改</button>',
			 	            	        	'<button type="button" class="addcheckitemson btn btn-primary  btn-sm" style="margin-right:10px;">添加子项</button>',
			 	            	            '<button type="button" class="deletecheckitem btn btn-primary  btn-sm" style="margin-right:10px;">删除</button>'
			 	            	            ].join('');
			            	  	}
			            	  	
			            	}
			             }						
				
			],
            //无线循环取子表，直到子表里面没有记录
            onExpandRow: function (index, row, $Subdetail) {
            	flow_checklist_checkitem.initSubTable(index,row,$Subdetail);
            }
        });
	},
	 addItem:function(row){		 
		var parenttable = window.parent.document.getElementById("ckItemList");
		$(parenttable).append('<tr><td><input type="hidden" name="" id="" value="" /></td> <td><input type="hidden" name="" id="" value="'+row.id+'" /></td> <td><input type="text" name="" id="" value="'+row.itemname+'" class="layui-input form-control" readonly="readonly"/></td><td><button class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" onclick="deleteItem(this)">删除</button></td></tr>');
		
	}
}

window.operateEvents = {
		'click .updatecheckitem': function (e, value, row, index) {//修改检查项      	
			$.myPlugin.modelDialog({context:'../page/flow/checklist/checkitemTag.jsp',data:{checkitemId:row.id,index:index},title:"修改检查项",width:'600px',height:'630px',offset:'150px',resize:false,});
		},
		'click .addcheckitemson': function (e, value, row, index) {//添加子检查项      	
			$.myPlugin.modelDialog({context:'../page/flow/checklist/checkitemTag.jsp',data:{ckparentId:row.id,index:index},title:"添加子检查项",width:'600px',height:'630px',offset:'150px',resize:false,});
		},
        'click .deletecheckitem': function (e, value, row, index) {//删除检查项
        	$.myPlugin.judgementDialog({title:"提示",context:"是否确认删除:'"+row.itemname+"'?",tipType:"checkitem",width:"280px",height:"180px",
        		btnFn: {
					btn1Fn: function(indexBtn,layero){
				        	$.ajax({
			        		url:contextPath+"/flow/checklist/deleteCheckItem.do",
			        		type:"post",
			        		dataType:"json",
			        		data:row,
			        		success:function(data){
			        			var dat = eval(data);
			        			var row = dat.data;
			        			if(dat.success == true){
			        				$('#checkitemList').bootstrapTable('remove', {field: 'id', values: [row.id]});
			        				$('#checkitemList').bootstrapTable('refresh');
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
        }      
      
}; 

function checkitemTag(title){//添加检查项
	$.myPlugin.modelDialog({context:'../page/flow/checklist/checkitemTag.jsp',title:title,width:'600px',height:'630px',offset:'150px',resize:false,});
}

function searchForCheckitem(){//检查项搜索
	$('#checkitemList').bootstrapTable('refresh');
}
//初始化函数
$(document).ready(function() {
	//初始化视图	
	flow_checklist_checkitem.initView();
});
