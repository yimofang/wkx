$(document).ready(function() {
	getForm();
});

function getForm() {
	//	$.ajax({
	//		url: "",
	//		type: "post",
	//		dataType: "json",
	//		success: function(data) {
	//			console.info(data);
	textInput("#formSearchReport", "name", "姓名");
	selectInput("#formSearchReport", "address", "地址", ["河北省", "河南省", "山东省"], ["hebei", "henan", "shandong"]);
	radioInput("#formSearchReport", "sex", "性别", ["男", "女"], ["nan", "nv"]);
	checkboxInput("#formSearchReport", "hobby", "爱好", ["读书", "写字"], ["dushu", "xiezi"]);
	dataInput("#formSearchReport", "data", "时间");
	monthInput("#formSearchReport", "month", "时间");
	datatimeInput("#formSearchReport", "datatime", "时间");
	subHtml("#formSearchReport");
	//		},
	//		error: function(error) {
	//
	//		}
	//	});
}

function submitBtn() {
	//	$.ajax({
	//		url: "",
	//		type: "post",
	//		data:$("#formSearchReport").serializeArray(),
	//		dataType: "json",
	//		success: function(data) {
	$("#butWrap").html("");
	$("#chartWrap").html("");
	var dataTab = '{"url":"/system/user/getUserList.do","columns":[{ "field": "loginname", "title": "登录名称" }, { "field": "username", "title": "用户名" }, { "field": "email", "title": "邮箱" }, { "field": "phone", "title": "手机号" } ]}';
	//柱状图数据

	var dataBar = '{"title":"柱状图","legendColor":["#34bfed","#287df1","#40d6bf","#f9eb55"],"legendData":[ {"name":"安全检查次数","icon":"rect"}, {"name":"隐患数","icon":"rect"}, {"name":"已整改","icon":"rect"}, {"name":"未整改","icon":"rect"} ],"xAxisData":["建投能源公司","新天公司","建投交通公司","建投水务公司","建投城镇化公司"],"series":[ { "name": "安全检查次数", "type": "bar","data": [20, 40, 30, 14, 18]},{ "name": "隐患数", "type": "bar","data": [8, 6, 6, 10, 8]},{ "name": "已整改", "type": "bar","data": [4, 2, 4, 8, 5]},{ "name": "未整改", "type": "bar","data": [4, 4, 2, 2, 3]}]}';
	//折线图数据
	var dataLine = '{"title":"折线图","legend_data":["建投能源公司","新天公司","建投交通公司","建投水务公司","建投城镇化公司"],"xAxis_data":["安全检查次数","隐患数","已整改","未整改"],"series":[{"name": "建投能源公司","type": "line","stack": "总量","data":[20,8,4,4]},{"name": "新天公司","type": "line","stack": "总量","data":[40,6,2,4]},{"name": "建投交通公司","type": "line","stack": "总量","data":[30,6,4,2]},{"name": "建投水务公司","type": "line","stack": "总量","data":[14,10,8,2]},{"name": "建投城镇化公司","type": "line","stack": "总量","data":[18,8,5,3]}]}';
	//饼状图数据
	var dataPie = '{"title":"饼状图","legend_data":[{"name": "一般隐患","icon": "square"},{"name": "重大隐患","icon": "square"},{"name": "无隐患","icon": "square"}],"series_name":"隐患类型比例","series_data":[{"value": "8","name": "一般隐患"},{"value": "4","name": "重大隐患"},{"value": "40","name": "无隐患"}]}';

	setbutton("#butWrap", "tabId", "tab", "表格", dataTab);
	setbutton("#butWrap", "chartBarId", "bar", "柱状图", dataBar);

	setbutton("#butWrap", "chartLineId", "line", "折线图", dataLine);

	setbutton("#butWrap", "chartPieId", "pie", "饼状图", dataPie);
	$("#tabId").click();

	//		},
	//		error: function(error) {
	//
	//		}
	//	});
}

//柱状，折线，饼状按钮
function setbutton(wrapId, btnId, chartType, butName, data) {
	var btn = $("<button id='" + btnId + "' chartType='" + chartType + "' onclick='clickFn(this.id)'></button>");
	btn.attr("type", "button");
	btn.attr("data", data);
	btn.addClass("btn btn-primary");
	btn.html(butName);
	btn.css({
		"margin-right": "30px"
	})
	$(wrapId).append(btn);
}
//按钮的点击事件
function clickFn(btn) {
	var data = $("#" + btn).attr("data");
	data = JSON.parse(data);
	var chartType = $("#" + btn).attr("chartType");
	$("#chartWrap").html("");
	if(chartType == "tab") {
		$("#chartWrap").attr("class","col-lg-12");
		$("#chartWrap").append('<table id="userList"></table>');
		$("#" + $.myMethod.getCurTab().id + " #userList").bootstrapTable({
			url: contextPath + data.url,
			detailView: false, //父子表
			striped: true, //是否显示行间隔色  
			pagination: true, //是否显示分页（*）  
			pageList: [10, 15, 20], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: true, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			detailView: false, //是否显示加号
			height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
			columns: data.columns,
		});
	} else if(chartType == "bar") {
		var xNum = data.xAxisData.length;
		var yNum = data.series.length;
		if((xNum*yNum)<16){
			$("#chartWrap").attr("class","col-lg-6");
		}else if((xNum*yNum)<24){
			$("#chartWrap").attr("class","col-lg-9");
		}else{
			$("#chartWrap").attr("class","col-lg-12");
		}
		$.myPlugin.chartBar({
			barId: 'chartWrap', //DOM的id
			title: data.title, //标题
			legendColor: data.legendColor, //图例颜色
			legendData: data.legendData, //图例名字
			xAxisData: data.xAxisData, //横坐标的名字
			series: data.series
		})
	} else if(chartType == "line") {
		if(data.xAxis_data.length<5){
			$("#chartWrap").attr("class","col-lg-7");
		}else if(data.xAxis_data.length<9){
			$("#chartWrap").attr("class","col-lg-9");
		}else{
			$("#chartWrap").attr("class","col-lg-12");
		}
		$.myPlugin.chartLine({
			lineId: 'chartWrap', //DOM的id
			title: data.title, //标题
			legend_data: data.legend_data,
			xAxis_data: data.xAxis_data,
			series: data.series
		})
	} else if(chartType == "pie") {
		$("#chartWrap").attr("class","col-lg-7");
		$.myPlugin.chartPie({
			pieId: 'chartWrap',
			title: data.title, //标题
			legend_data: data.legend_data,
			series_name: data.series_name,
			series_data: data.series_data
		})
	}

}

////文本框
function textInput(formId, groupId, groupName) {
	var groupHtml = '<div class="form-group" style="overflow: hidden;"> <label for="' + groupId + '" class="col-sm-1 control-label" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-3"> <input type="text" class="form-control" id="' + groupId + '" name="' + groupId + '" placeholder="请输入要搜索的内容" onblur="isNull(this.value,this.id)"> </div> </div>';
	$(formId).append(groupHtml);
}
//下拉框
function selectInput(formId, groupId, groupName, options, optionsValue) {
	var groupHtml = '<div class="form-group" style="overflow: hidden;"> <label for="' + groupId + '" class="col-sm-1 control-label" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-3"> <select name="' + groupId + '" id="' + groupId + '" class="form-control">'
	var options_length = options.length;
	for(var i = 0; i < options_length; i++) {
		var opt = '<option value="' + optionsValue[i] + '">' + options[i] + '</option>';
		groupHtml += opt;
	};
	groupHtml += '</select> </div> </div>';
	$(formId).append(groupHtml);
}

//单选
function radioInput(formId, groupId, groupName, audios, audiosValue) {
	var groupHtml = '<div class="form-group" style="overflow: hidden;"> <label for="' + groupId + '" class="col-sm-1" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-6">';
	var audios_length = audios.length;
	for(var i = 0; i < audios_length; i++) {
		var opt = '<label class="radio-inline"> <input type="radio" name="' + groupId + '"  value="' + audiosValue[i] + '">' + audios[i] + ' </label>';
		groupHtml += opt;
	}
	groupHtml += '</div> </div>';
	$(formId).append(groupHtml);
}

//多选
function checkboxInput(formId, groupId, groupName, checkboxs, checkboxsValue) {
	var groupHtml = '<div class="form-group" style="overflow: hidden;"> <label for="' + groupId + '" class="col-sm-1" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-6">';
	var checkboxs_length = checkboxs.length;
	for(var i = 0; i < checkboxs_length; i++) {
		var opt = '<label class="checkbox-inline"> <input type="checkbox" name="' + groupId + '"  value="' + checkboxsValue[i] + '">' + checkboxs[i] + ' </label>';
		groupHtml += opt;
	}
	groupHtml += '</div> </div>';
	$(formId).append(groupHtml);
}
//时间----日
function dataInput(formId, groupId, groupName) {
	var groupHtml = '<div class="form-inline" style="overflow: hidden;margin-bottom: 15px;"> <label for="' + groupId + '" class="col-sm-1 control-label" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-6"> <input type="date" name="' + groupId + '" id="startTime" class="form-control"> <span>到</span> <input type="date" name="' + groupId + '1" id="endTime" class="form-control"> </div>  </div>';
	$(formId).append(groupHtml);
}
//时间-----月

function monthInput(formId, groupId, groupName) {
	var groupHtml = '<div class="form-inline" style="overflow: hidden;margin-bottom: 15px;"> <label for="' + groupId + '" class="col-sm-1 control-label" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-6"> <input type="month" name="' + groupId + '" id="startTime" class="form-control"> <span>到</span> <input type="month" name="' + groupId + '1" id="endTime" class="form-control"> </div>  </div>';
	$(formId).append(groupHtml);
}
//时间---时分----
function datatimeInput(formId, groupId, groupName) {
	var groupHtml = '<div class="form-inline" style="overflow: hidden;margin-bottom: 15px;"> <label for="' + groupId + '" class="col-sm-1 control-label" style="line-height: 35px;font-size: 14px;">' + groupName + '</label> <div class="col-sm-6"> <input type="datetime-local" name="' + groupId + '" id="startTime" class="form-control"> <span>到</span> <input type="datetime-local" name="' + groupId + '1" id="endTime" class="form-control"> </div>  </div>'
	$(formId).append(groupHtml);
}
//提交按钮
function subHtml(formId) {
	var groupHtml = '<div class="form-group"> <div class="col-lg-1"></div> <div class="col-sm-11"> <a class="btn dribbble-btn dribbble-btn-primary btn-lg" onclick="submitBtn()"> <span class="fa fa-search dri-icon-r-md"></span>搜索</a>  </div>  </div>';
	$(formId).append(groupHtml);
}
//判断文本框是否空
function isNull(val, id) {
	if(val == "") {
		id = "#" + id
		layui.use('layer', function() {
			var $ = layui.jquery,
				layer = layui.layer;
			top.layer.open({
				type: 4,
				content: ['bukong', id], //数组第二项即吸附元素选择器或者DOM
				tipsMore: false,
				shade: false,
				closeBtn: 0,
				area: ['80px', '30px'],
				time: 2000
			});
		})
	}
}