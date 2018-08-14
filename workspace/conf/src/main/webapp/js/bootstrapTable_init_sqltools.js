/**
 * 
 * bootstrapTable 表单控件初始化设置 白琨 2016-11-3 添加了以下两个事件 onClickRow : onClickRow_obj,
 * //点击行触发 事件 nPageChange :onPageChange_obj //切换页数里 触发 事件
 */

// 声明自定义参数对象，用于异步传递 页数、排序、搜索框数据、自定义参数等
var oTableInit = new Object();



$(function() {
 
	var basepath=$("#basePath_hid").val();
	
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			display : params.limit, // 页面大小
			page : params.offset, // 页面偏移量 当前页
			sort : params.sort, // 排序列名
			sortOrder : params.order,
		// 排位命令（desc，asc）
		// 自定义的控件传递参数可以加
		// 变量 : value
		};
	 
		return temp;
	};

	// 预加载 bootstrapTable_init
	//alert("222");
	bootstrapTable_init("#powerslist", basepath+"/powers/powers_list.do");
	bootstrapTable_init("#powermenulist", basepath+"/powermenu/powermenu_list.do?powerid="+$("#powerid").val());
	bootstrapTable_init("#adminuserslist", basepath+"/adminusers/adminusers_list.do");
	// 第二个 bootstrapTable 初始化可以 向下叠加 bootstrapTable_init("#表id",
	// "../访问Controller");

});// --加载运行 结束--

/**
 * 初化bootstrapTable
 * 
 * @param table_id
 *            table 表格ID （传递时要加 #）
 * @param dataUrl
 *            异步加载的 URL路径 参考格式 "../xxx/xxxxx"
 */
function bootstrapTable_init(table_id, dataUrl) {
 
	$(table_id).bootstrapTable({
		url : dataUrl, // 请求路径
		// search : true, // 是否显示 搜索框
	    searchOnEnterKey : true, // 设置为 true时，按回车触发搜索方法
		pagination : true,
		queryParams : oTableInit.queryParams, // 与后台传递参数
		sidePagination : "server",
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 20, // 每页的记录行数（*）
		pageList : [ 10, 15, 20, 30 ],
		// showRefresh : true, // 刷新按键
		iconSize : 'outline',
		//trimOnSearch : false, // 为空不搜索
		/*icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		},*/
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true, // 设置True 将禁止多选
		onClickRow : onClickRow_obj, // 点击行触发 事件
		onPageChange : onPageChange_obj,
	// 翻页触发 事件
	// 切换页数里 触发 事件

	});

}

// ----------bootstrapTable依赖配置 ------------

function onClickRow_obj(row) {
	// 自定义 点击行方法

	if ($("#update_btn") != null && $("#delete_btn") != null) {
		// 点击 行后 按键 可以 使用
		$("#update_btn").attr("disabled", false);
		$("#delete_btn").attr("disabled", false);
	}

}

function onPageChange_obj() {

	// 自定义 当切换页数 时方法
	if ($("#update_btn") != null && $("#delete_btn") != null) {
		// 点击 行后 按键 可以 使用
		$("#update_btn").attr("disabled", true);
		$("#delete_btn").attr("disabled", true);
	}
}

// ----------bootstrapTable依赖配置 结束 ------------

 
//使用方法 
//refreshtable('demo_data','../hframe/bootstrap_table',['select','opt'])
/**
 * tableid tableID
 * dataurl 数据集
 * searchids 控件ID (注意要与controller获取参数名一致)
 */
function refreshtable(tableid,dataurl,searchids){
	var searchcont = "";
	var basepath=$("#basePath_hid").val();
	
	for(var i=0;i<searchids.length;i++){
		if($('#'+searchids[i]).val() != ""){
			searchcont += searchids[i]+'='+($('#'+searchids[i]).val())+"&";
		}
	}
	var parameters = searchcont.substr(0,searchcont.length-1);
	break_table(tableid,basepath+dataurl+"?"+parameters);	
}
//使用方法 
//refreshtable('demo_data','../hframe/bootstrap_table',['select','opt'])
/**
* tableid tableID
* dataurl 数据集
* searchids 控件ID (注意要与controller获取参数名一致)
*/
function refreshtableOpt(tableid,dataurl,searchids,opts){
	var searchcont = "";
	var basepath=$("#basePath_hid").val();
	
	for(var i=0;i<searchids.length;i++){
		if($('#'+searchids[i]).val() != ""){
			searchcont += searchids[i]+'='+($('#'+searchids[i]).val())+"&";
		}
	}
	var parameters = searchcont.substr(0,searchcont.length-1);
	var opt="";
	 if(opts==null||opts==0){}else{
		 opt="&opt="+opts;
	 }
	break_table(tableid,basepath+dataurl+"?"+parameters+opt);
}
 
// 刷新当前页面
function break_table(parenttableid,showurl) {

	$('#' + parenttableid).bootstrapTable('refresh', { url: showurl })
}

//-------------table 表格头自定义 data-formatter 实现 ---------	
function index_for(value, row, index) {
	//定义序列号
	return index + 1;
}


