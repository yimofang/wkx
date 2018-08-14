$(document).ready(function() {
	//初始化视图
	initPage();
});
//初始化页面
function initPage() {
	//获取页面类型
	//获取id
	var flow_id = $.myMethod.getCurTab().href.split('=')[1];
	var table_id = $.myMethod.getCurTab().id;
	$.ajax({
		url: contextPath + "/flow/getFlowAndNodeExample.do",
		data: {
			"flow_id": flow_id
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			if(data.success){
				//获取数据成功,记录流程数据
				flow = data.data;
				//初始化流程头
				initFlowHead(table_id,flow);
				//初始化流程节点
				initFlowNodes(table_id,flow);
				//获取流程节点功能
				getFlowButtons(table_id,flow.id);
				//右侧提示窗
				getRightNav(table_id,flow);
			}
		}
	});
	
}
//放置流程头
function initFlowHead(tableId,flow){
	$("#"+tableId+" #lcbh").html(flow.serial_code); //流程编号
	$("#"+tableId+" #lcmc").html(flow.name); //流程名称
	$("#"+tableId+" #lclx").html(flow.flow_type); //流程类型
	$("#"+tableId+" #lcfqr").html(flow.initiator_name); //流程发起人
	$("#"+tableId+" #fqsj").html(flow.create_time); //发起时间
	if(flow.sts == 0) { //流程状态
		$("#"+tableId+" #lczt").html("正常");
	} else if(flow.sts == 1) { //流程状态
		$("#"+tableId+" #lczt").html("完结归档");
	} else if(flow.sts == 2) { //流程状态
		$("#"+tableId+" #lczt").html("挂起");
	} else if(flow.sts == -1) { //流程状态
		$("#"+tableId+" #lczt").html("失败");
	}
	$("#"+tableId+" #dqhj").html(flow.cur_node_name); //当前环节
	$("#"+tableId+" #dqczr").html(""); //当前操作人
	$("#"+tableId+" #czsj").html("");
}
//放置流程节点
function initFlowNodes(tableId,flow){
	var flowNodes = flow.flow_nodes;
	for(var i = 0; i < flowNodes.length; i++) {
		var flowNode = flowNodes[i];
		var panel;
		//判断优先实例是否存在
		if(flowNode.flowNodeExampleModels.length == 0) {
			//使用定义里记录的数据
			var flowNodeDefine = flowNode.flowNodeDefineModels[0];
			panel = getFlowNode(flowNodeDefine.name,flowNodeDefine.disable_page,flowNodeDefine.id);
		} else {
			//使用实例
			var flowNodeExample = flowNode.flowNodeExampleModels[0];
			//判断流程状态
			if(flow.sts == 0){
				//判断节点状态
				if(flowNodeExample.sts == 0) {
					//编辑状态
					panel = getFlowNode(flowNodeExample.name,flowNodeExample.edit_page,flowNodeExample.id);
				} else if(flowNodeExample.sts == 1 || flowNodeExample.sts == 2) {
					//签收和完成状态
					panel = getFlowNode(flowNodeExample.name,flowNodeExample.read_page,flowNodeExample.id);
				}
			}else if(flow.sts == 1 || flow.sts == 2){
				//流程挂起与完结状态
				panel = getFlowNode(flowNodeExample.name,flowNodeExample.disable_page,flowNodeExample.id);
			}
		}
		
		//放置数据
		$("#"+tableId+" #mainFlowForm").append(panel);
	}
}

//获取流程节点
function getFlowNode(title,url,node_id){
	var panel = $('<div id="node'+node_id+'" class="col-lg-8 col-lg-offset-2 dri-panel panel-info" style="padding: 0;margin-bottom:0"></div>');
	panel.append('<div class="panel-heading" style="padding:3px 10px"><h6>' + title + '</h6></div>');
	var panelBody = $('<div class="panel-body" style="padding:0"></div>');
	//获取参数
	var params = getFlowNodeParam(url);
	//添加节点信息
	params.node_id = node_id;
	//只取地址
	url = url.split("?")[0];
	panelBody.load(contextPath + "/page/" + url,params);
	panel.append(panelBody);
	console.log(panelBody);
	return panel;
}
//获取参数
function getFlowNodeParam(url){
	var reParams = new Object();
	if(url.indexOf("?") >= 0){
		var params = url.split("?")[1].split("&");
		for(var i=0;i < params.length;i++){
			var param = params[i].split("=");
			reParams[param[0]] = param[1];
		}
	}
	return reParams;
}
//获取按钮
function getFlowButtons(tableId,flow_id){
	$.ajax({
		url: contextPath + "/flow/getFlowFunc.do",
		data: {
			"flow_id":flow_id,
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			if(data.success){
				var btns = data.data;
				//展示所有按钮
				for(var i = 0; i < btns.length; i++) {
					$("#"+tableId+" #butGroup").append(getFlowButton(btns[i]));
					if(btns[i].name == "附件"){
						$("#"+tableId+" #butGroup").append('<a class="btn dribbble-btn dribbble-btn-info btn-lg pull-right" onclick="daylog(this)" style="margin-left:10px">'+butData.data[i].name+'</a>');
					}else if (butData.data[i].name == "提交"){
						$("#"+tableId+" #butGroup").append('<a class="btn dribbble-btn '+butColor+' btn-lg" onclick="dlgSubmit()" style="margin-left:10px">'+butData.data[i].name+'</a>');
					}else{
						$("#"+tableId+" #butGroup").append('<a class="btn dribbble-btn '+butColor+' btn-lg" onclick="alertWind(this)" style="margin-left:10px">'+butData.data[i].name+'</a>');	
					}
				}
			}

		}
	});
}
function getFlowButton(btn){
	var html = '<a class="btn dribbble-btn btn-lg';
	html += getButtonColor(1);
	if(btn.code == "FLOW_EXAMPLE_ATTACHMENT" || btn.code == "FLOW_LOG"){
		html += ' pull-right';
	}
	html += '" onclick="sdfsdf()" style="margin-left:10px">' + btn.name + '</a>';
}
//获取按钮颜色
function getButtonColor(i){
	var butColor = 0;
	//设置按钮颜色
	if(i%4==0){
		butColor="dribbble-btn-success";
	}else if(i%4==1){
		butColor="dribbble-btn-danger";
	}else if(i%4==2){
		butColor="dribbble-btn-warning";
	}else if(i%4==3){
		butColor="dribbble-btn-info";
	}
	return butColor;
}
//询问是否确定
function alertWind(th) {
	var str = "";
	var url = "";
	var butPostData = {};
	//判断是否签收
	if($(th).html() == "签收"){
		str = "是否确定" + $(th).html() + "?";
		url = "/flow/signFlowNode.do";
		butPostData = {
			"flow_id":flow.id,
			"node_id":flow.cur_node_id
		}
	}else if($(th).html() == "放弃"){
		str = "是否确定放弃?";
		url = "/flow/giveUpFlowNode.do";
		butPostData = {
			"flow_id":flow.id,
			"node_id":flow.cur_node_id
		}
	}else if($(th).html() == "回退"){
		str = "是否确定回退?";
		url = "/flow/getFlowLog.do";
		butPostData = {
			"flow_id":flow.id
		}
	}else if($(th).html() == "撤销"){
		str = "是否确定撤销?";
		url = "/flow/cancelFlow.do";
		butPostData = {
			"flow_id":flow.id
		}
	}else if($(th).html() == "日志"){
		str = "是否确定生成日志?";
		url = "/flow/getFlowLog.do";
		butPostData = {
			"flow_id":flow.id
		}
	}else if($(th).html() == "挂起"||$(th).html() == "恢复挂起"){
		str = "是否确定挂起?";
		url = "/flow/reHandUpFlow.do";
		butPostData = {
			"flow_id":flow.id
		}
	}
	//对话弹出框
	$.myPlugin.judgementDialog({
		title: "提示",
		context: str,
		height: "150px",
		btnFn: {
			btn1Fn: function(index, layero) {
				$.ajax({
					url:contextPath+url,
					data:butPostData,
					type:"post",
					dataType:"json",
					async:false,
					success:function(data){
						if($(th).html() == "签收"){
							qsResetPage(data);
						}else if($(th).html() == "放弃"||$(th).html() == "回退"||$(th).html() == "撤销"){
							if(data.success){
								$(".tabs-selected .tabs-close").click();
							}else{
								buttonClickDialog(data);
							}
						}else if($(th).html() == "日志"){
							setRzTable(data.data.rows,data.success);
						}else if($(th).html() == "挂起"){
							gqResetPage(data);
						}
					},
					error:function(error){
						
					}
				});
				layer.close(index);
			
			}
		}
	});

}
//签收重置方法
function qsResetPage(data){
	if(data.success){
		for(var i = 0; i < flow.flow_nodes.length; i++) {
			if(flow.flow_nodes[i].flowNodeExampleModels.length != 0) {
				//优先实例
				if(flow.cur_node_id == flow.flow_nodes[i].flowNodeExampleModels[0].id){
					$("#mainFlowForm .dri-panel").eq(i).find(".panel-heading").html("");
					$("#mainFlowForm .dri-panel").eq(i).find(".panel-heading").html('<h6>' + flow.flow_nodes[i].flowNodeExampleModels[0].name + '</h6>');
					$("#mainFlowForm .dri-panel").eq(i).find(".panel-body").html("");
					$("#mainFlowForm .dri-panel").eq(i).find(".panel-body").load("../page/" + flow.flow_nodes[i].flowNodeExampleModels[0].edit_page);
				}				
			}
		}
//		重新获取按钮
		$("#butGroup").html("");
		getButton();
	}
	buttonClickDialog(data);//弹框
}
//挂起重置方法
function gqResetPage(data){
	if(data.success){
		$("#mainFlowForm").html("");
		for(var i = 0; i < flow.flow_nodes.length; i++) {
			var panel = $('<div class="col-lg-8 col-lg-offset-2 dri-panel panel-info" style="padding: 0;margin-bottom:0"></div>');
			if(flow.flow_nodes[i].flowNodeExampleModels.length == 0) {
				//不存在
				panel.append('<div class="panel-heading" style="padding:3px 10px"><h6>' + flow.flow_nodes[i].flowNodeDefineModels[0].name + '</h6></div>');
				var panelBody = $('<div class="panel-body" style="padding:0"></div>');
				panelBody.load("../page/" + flow.flow_nodes[i].flowNodeDefineModels[0].disable_page);
				panel.append(panelBody);
			} else {
				//优先实例
				panel.append('<div class="panel-heading" style="padding:3px 10px"><h6>' + flow.flow_nodes[i].flowNodeExampleModels[0].name + '</h6></div>');
				var panelBody = $('<div class="panel-body" style="padding:0"></div>');
				panelBody.load("../page/" + flow.flow_nodes[i].flowNodeExampleModels[0].disable_page);
				panel.append(panelBody);
			}
			$("#mainFlowForm").append(panel);
		}
	}
	buttonClickDialog(data);//弹框
}
//创建日志表格
function setRzTable(data,success){
	if(success){
		var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
		$("#" + tabId + " #daylogTable").children().remove();
		//表格
		console.log("------55---")
		$('#'+tabId+" #daylogTable").bootstrapTable({
			data: data,
			striped: true, //是否显示行间隔色  
			pagination: false, //是否显示分页（*）  
			pageList: [10, 15,20], //可供选择的每页的行数（*）  
			showColumns: true, //是否显示所有的列  
			showRefresh: false, //是否显示刷新按钮  
			clickToSelect: true, //是否启用点击选中行  
			showColumns: false, //是否显示 内容列下拉框
			detailView:false,//是否显示加号
			columns: [
//				{checkbox:true},//是否启用勾选
				{field:'user_name',title:'用户名字'},
				{field:'flow_name',title:'流程名字'},
				{field:'oper_name',title:'操作类型'},
				{field:'node_name',title:'当前节点'},
				{field:'create_time',title:'操作时间'},
				],
		});
		$("#" + tabId + " #daylogTable").parent().attr('style','height: 430px');
		$("#" + tabId + " #daylogSubmit").modal('show');
	}else{
		buttonClickDialog(data);//弹框
	}
}

//提交按钮
function dlgSubmit(){
	var data1 = [];
	$.ajax({
		url:contextPath+"/flow/getFlowNodeOpers.do",
		type:"post",
		dataType:"json",
		data:{"node_id":1},//processData.data.cur_node_id
		async:false,
		success:function(data){
			if(data.success){
				for(var i = 0; i< data.data.length; i++){
					data1.push({text:data.data[i].oper_name,type:data.data[i].type,oper_id:data.data[i].oper_id,notify_type:data.data[i].notify_type});//type:data.data[i].type
				}
				return data1;
			}
		},
		error:function(error){
			
		}
	});
	var data2 = [{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "管理员1" }, { text: "管理员2"}, { text: "管理员3" }, { text: "管理员4" }, { text: "管理员5" } ] },{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "建投能源公司" }, { text: "新天公司" }, { text: "建投交通公司" }, { text: "建投水务公司" }, { text: "建投城镇化公司" } ] },{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "建投能源公司管理员" }, { text: "新天公司管理员" }, { text: "建投交通公司管理员" }, { text: "建投水务公司管理员" }, { text: "建投城镇化公司管理员" } ] }];

	var data3 = [{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "管理员1" }, { text: "管理员2" }, { text: "管理员3" }, { text: "管理员4" }, { text: "管理员5" } ] },{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "建投能源公司" }, { text: "新天公司" }, { text: "建投交通公司" }, { text: "建投水务公司" }, { text: "建投城镇化公司" } ] },{ text: "河北建设投资集团有限责任公司",state: {expanded: false}, nodes: [ { text: "建投能源公司管理员" }, { text: "新天公司管理员" }, { text: "建投交通公司管理员" }, { text: "建投水务公司管理员" }, { text: "建投城镇化公司管理员" } ] }];
	
	getTree(data1,data2,data3);
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
	$("#" + tabId + " #dlgSubmit").modal('show');
}
//获取tree
function getTree(data1,data2,data3) {
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
	$('#'+tabId+' #userTree').treeview({
		data: data1,
		showCheckbox:true,
	});
	$('#'+tabId+' #mechanismTree').treeview({
		data: data2,
		showCheckbox:true,
		onNodeChecked:nodeChecked ,  
        onNodeUnchecked:nodeUnchecked  
	});
	$('#'+tabId+' #roleTree').treeview({
		data: data3,
		showCheckbox:true,
	});
}
//确定提交
function submitAlert(){
	$.myPlugin.judgementDialog({
		title: "提示",
		context: "是否确定提交",
		height: "150px",
		btnFn: {
			btn1Fn: function(index, layero) {
				treeSubmit();
				layer.close(index);
			}
		}
	});
}

//treeview  的 提交按钮  暂时未筛选 机构和角色的勾选
function treeSubmit(){
	console.log("tijiao")
	var checked = $('#userTree').treeview('getChecked');
	var userSubData = {
			"flow_id":flow.id,
			"node_id":flow.cur_node_id,
			"opers":""
	}
	userSubData.opers += "[";
	for(var i = 0; i< checked.length; i++){
		console.log("--------------   "+i)
		userSubData.opers += '{"oper_id":checked[i].oper_id,"type":checked[i].type,"notify_type":checked[i].notify_type}';
	}
	userSubData.opers += "]";
	$.ajax({
		url:contextPath+"/flow/submitFlowNode.do",
		type:"post",
		data:userSubData,
		dataType:"json",
		success:function(data){
			if(data.success){
				$(".tabs-selected .tabs-close").click();
			}else{
				buttonClickDialog(data);
			}
		},
		error:function(error){
			
		}
	});
}
//按钮点击后返回提示框
function buttonClickDialog(data){
	var tipType =  "";
	if(data.success){
		tipType = "success";
	}else{
		tipType = "error";
	}
	$.myPlugin.prompt({
		title: "提示",
		context: data.msg,
		tipType: tipType,
	});
}

//右侧导航
function getRightNav(tableId,flow){
	for(var i = 0; i < flow.flow_nodes.length; i++) {
		var navItem = '';
		var lineItem = '';
		if(i == (flow.flow_nodes.length-1)){
			lineItem = '';
		}else{
			lineItem = '<div class="fixed-list-line"><span></span></div>'
		}
		//判断优先实例是否存在
		if(flow.flow_nodes[i].flowNodeExampleModels.length == 0) {
			//不存在
			navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle"> </a><span class="fixed-list-item-name">'+flow.flow_nodes[i].flowNodeDefineModels[0].name+'</span></div>';
		} else {
			//优先实例
			if(flow.flow_nodes[i].flowNodeExampleModels[0].sts == 0 || flow.flow_nodes[i].flowNodeExampleModels[0].sts == 1) {
				navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle" style="background-color:#287df1;border-color:#287df1"> </a><span class="fixed-list-item-name">'+flow.flow_nodes[i].flowNodeExampleModels[0].name+'</span></div>'
			} else if(flow.flow_nodes[i].flowNodeExampleModels[0].sts == 2) {
				navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle" style="background-color:grey"> </a><span class="fixed-list-item-name">'+flow.flow_nodes[i].flowNodeExampleModels[0].name+'</span></div>'
			};
		}
		$("#"+ tableId+" #fixedNav").append(navItem);
		$("#"+ tableId+" #fixedNav").append(lineItem);
	}
}

//级联操作方法们--start
var nodeCheckedSilent = false;  
function nodeChecked (event, node){  
    if(nodeCheckedSilent){  
        return;  
    }  
    nodeCheckedSilent = true;  
    checkAllParent(node);  
    checkAllSon(node);  
    nodeCheckedSilent = false;  
}  
  
var nodeUncheckedSilent = false;  
function nodeUnchecked  (event, node){  
    if(nodeUncheckedSilent)  
        return;  
    nodeUncheckedSilent = true;  
    uncheckAllParent(node);  
    uncheckAllSon(node);  
    nodeUncheckedSilent = false;  
}  
  
//选中全部父节点  
function checkAllParent(node){  
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
    $('#'+tabId+' #agencyTree').treeview('checkNode',node.nodeId,{silent:true});  
    var parentNode = $('#'+tabId+' #agencyTree').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)){  
        return;  
    }else{  
        checkAllParent(parentNode);  
    }  
}  
//取消全部父节点  
function uncheckAllParent(node){  
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
    $('#'+tabId+' #agencyTree').treeview('uncheckNode',node.nodeId,{silent:true});  
    var siblings = $('#'+tabId+' #agencyTree').treeview('getSiblings', node.nodeId);  
    var parentNode = $('#'+tabId+' #agencyTree').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)) {  
        return;  
    }  
    var isAllUnchecked = true;  //是否全部没选中  
    for(var i in siblings){  
        if(siblings[i].state.checked){  
            isAllUnchecked=false;  
            break;  
        }  
    }  
    if(isAllUnchecked){  
        uncheckAllParent(parentNode);  
    }  
  
}  
  
//级联选中所有子节点  
function checkAllSon(node){  
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
    $('#'+tabId+' #agencyTree').treeview('checkNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            checkAllSon(node.nodes[i]);  
        }  
    }  
}  
//级联取消所有子节点  
function uncheckAllSon(node){  
	var tabId = $('#homeTabs').tabs('getSelected').panel('options').id;
    $('#'+tabId+' #agencyTree').treeview('uncheckNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i]);  
        }  
    }  
}  
//级联操作方法们--end
//滚动监听
//function ScrollMnitor() {
//	$("#mainFlowForm").scroll(function() {
//		$(".fixed-list-item").find(".fixed-list-item-circle").removeClass("circle-active");
//		var scrollTop = $("#mainFlowForm").scrollTop();
//		if(scrollTop <= 100) {
//			$(".fixed-list-item").eq(0).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop < 400) {
//			$(".fixed-list-item").eq(1).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop < 700) {
//			$(".fixed-list-item").eq(2).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop < 1000) {
//			$(".fixed-list-item").eq(3).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop < 1300) {
//			$(".fixed-list-item").eq(4).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop < 1400) {
//			$(".fixed-list-item").eq(5).find(".fixed-list-item-circle").addClass("circle-active");
//		} else if(scrollTop <= 1500) {
//			$(".fixed-list-item").eq(6).find(".fixed-list-item-circle").addClass("circle-active");
//		}
//
//	})
//}
