$(document).ready(function() {
	//页面初始化一次加载
//	$.ajax({
//		url:contextPath+"",
//		type:"post",
//		dataType:"json",
//		success:function(data){
			//左侧-table
			var configSideTable = "configSideTable";
			$("#config-side").append('<table id="configSideTable"></table>');
			//右上表格
			var configTableRT = "configTableRT";
			$("#config-side-top").append('<table id="configTableRT"></table>');
			//右下表格
			var configTableRB = "configTableRB";
			$("#config-side-bottom").append('<table id="configTableRB"></table>');
			
			setConfigTable({
				appendID: configSideTable,
				data: [{ "configName": "统计报表1", "url": "123.123.123" }, { "configName": "统计报表2", "url": "123.123.123" }, { "configName": "统计报表3", "url": "123.123.123" }, { "configName": "统计报表4", "url": "123.123.123" }, { "configName": "统计报表5", "url": "123.123.123" }, { "configName": "统计报表6", "url": "123.123.123" }, { "configName": "统计报表7", "url": "123.123.123" }, { "configName": "统计报表8", "url": "123.123.123" }, { "configName": "统计报表6", "url": "123.123.123" }, { "configName": "统计报表7", "url": "123.123.123" }, { "configName": "统计报表8", "url": "123.123.123" }, { "configName": "统计报表6", "url": "123.123.123" }, { "configName": "统计报表7", "url": "123.123.123" }, { "configName": "统计报表8", "url": "123.123.123" }, { "configName": "统计报表6", "url": "123.123.123" }, { "configName": "统计报表7", "url": "123.123.123" }, { "configName": "统计报表8", "url": "123.123.123" }, { "configName": "统计报表6", "url": "123.123.123" }, { "configName": "统计报表7", "url": "123.123.123" }, { "configName": "统计报表8", "url": "123.123.123" }, { "configName": "统计报表6" }, { "configName": "统计报表7" }, { "configName": "统计报表8" }],
				columns: [{
					field: 'configName',
					title: '统计配置名字'
				}],
				onClickRow: function(row, field) {
		//			$.ajax({
		//				url: row.url,
		//				type: "post",
		//				dataType: "json",
		//				success: function(data) {
							//右上表格
							$("#config-side-top").html("");
							$("#config-side-top").append('<table id="configTableRT"></table>');
							setConfigTable({ appendID:configTableRT, data: [{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  }], columns: [{ field: 'queryName', title: '查询项名字' },{ field: 'queryType', title: '查询项类型' },{ field: 'relativeName', title: '对应项名字' }] });
							
							//右下表格
							$("#config-side-bottom").html("");
							$("#config-side-bottom").append('<table id="configTableRB"></table>');
							setConfigTable({ appendID:configTableRB, data: [{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  },{ "queryName":"222", "queryType":"222", "relativeName":"222"  }], columns: [{checkbox:true},{ field: 'queryName', title: '查询项名字' },{ field: 'queryType', title: '查询项类型' },{ field: 'relativeName', title: '对应项名字' }] });
		//				},
		//				error: function(error) {
		//					console.log(error)
		//				}
		//			});//ajax---end----
		
				},//onClickRow--end
		
		});
			setConfigTable({ appendID:configTableRT, data: [{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  }], columns: [{ field: 'queryName', title: '查询项名字' },{ field: 'queryType', title: '查询项类型' },{ field: 'relativeName', title: '对应项名字' }] });
			
			
			setConfigTable({ appendID:configTableRB, data: [{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  },{ "queryName":"111", "queryType":"111", "relativeName":"111"  }], columns: [{checkbox:true},{ field: 'queryName', title: '查询项名字' },{ field: 'queryType', title: '查询项类型' },{ field: 'relativeName', title: '对应项名字' }] })
			
			
//		},//success---end-----
//		error:function(error){
//			alert("加载失败")
//		}
//	});
	

});//document-ready-end----------






//表格方法
function setConfigTable(option) {
	var defaultOpt = {
		appendID: "",
		//		url: "",
		data: [],
		detailView: false, //父子表
		striped: true, //是否显示行间隔色  
		pagination: false, //是否显示分页（*）  
		pageList: [10, 15, 20], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: false, //是否显示刷新按钮  
		showColumns: false, //是否显示 内容列下拉框
		clickToSelect: false, //是否启用点击选中行  
		detailView: false, //是否显示加号
		//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		columns: [],
		onClickRow: function(row, field) {
			console.log(row)
			console.log(field);
		},
	}
	$.extend(defaultOpt, option);
	$("#" + $.myMethod.getCurTab().id + " #" + defaultOpt.appendID).bootstrapTable({
		//		url: contextPath + data.url,
		data: defaultOpt.data,
		detailView: defaultOpt.detailView, //父子表
		striped: defaultOpt.striped, //是否显示行间隔色  
		pagination: defaultOpt.pagination, //是否显示分页（*）  
		pageList: defaultOpt.pageList, //可供选择的每页的行数（*）  
		showColumns: defaultOpt.showColumns, //是否显示所有的列  
		showRefresh: defaultOpt.showRefresh, //是否显示刷新按钮  
		clickToSelect: defaultOpt.clickToSelect, //是否启用点击选中行  
		detailView: defaultOpt.detailView, //是否显示加号
		height: defaultOpt.height, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		columns: defaultOpt.columns,
		onClickRow: defaultOpt.onClickRow

	});
}