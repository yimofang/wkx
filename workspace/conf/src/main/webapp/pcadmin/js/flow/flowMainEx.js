var subNodeSave = new Array();
$(document).ready(function() {
	//初始化视图
	initPage();
});
//初始化页面
function initPage() {
	var height = $(this).height() - 127 - 50;
	$("#mainFlowForm").height(height);
	//获取页面类型
	//获取id
	//var param = $.myMethod.getCurTab().href.split('?')[1];
	var flow_id = $.myMethod.getUrlParam("flow_id");
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
				initFlowHead(flow);
				//初始化流程节点
				var flow_sts_obj = initFlowNodes(flow);
				console.log("objobjobj");
				console.log(flow_sts_obj);
				//获取流程节点功能（按钮）
				getFlowButtons(flow.id,flow_sts_obj);
				//右侧提示窗
				getRightNav(flow);
			}
		}
	});
	
}
//放置流程头
function initFlowHead(flow){
	$("#lcbh").html(flow.serial_code); //流程编号
	$("#lcmc").html(flow.name); //流程名称
	$("#lclx").html(flow.flow_type); //流程类型
	$("#lcfqr").html(flow.initiator_name); //流程发起人
	$("#fqsj").html(flow.create_time); //发起时间
	if(flow.sts == 0) { //流程状态
		$("#lczt").html("正常");
	} else if(flow.sts == 1) { //流程状态
		$("#lczt").html("完结归档");
	} else if(flow.sts == 2) { //流程状态
		$("#lczt").html("挂起");
	} else if(flow.sts == -1) { //流程状态
		$("#lczt").html("失败");
	}
	$("#dqhj").html(flow.cur_node_name); //当前环节
	$("#dqczr").html(""); //当前操作人
	$("#czsj").html("");
}
//放置流程节点
function initFlowNodes(flow){
	var cur_node_id = flow.cur_node_id;
	var flowNodes = flow.flow_nodes;
	var next_node_limit = false;
	var cur_node_i = 0;
	var isFinashFlow = false;
	for(var i = 0; i < flowNodes.length; i++) {
		var flowNode = flowNodes[i];
		var panel;
		//判断优先实例是否存在
		if(flowNode.flowNodeExampleModels.length == 0) {
			//使用定义里记录的数据
			var flowNodeDefine = flowNode.flowNodeDefineModels[0];
			//判断流程是否在当前节点
			if(flowNodeDefine.id == cur_node_id){
				cur_node_i = i + 1;
			}
			
			//判断流程是否在进行到最后一个节点
			if(cur_node_i == flowNodes.length){
				isFinashFlow = true;
			}
			
			//判断下一节点是否有时间限制
			if(cur_node_i == i){
				if(flowNodeDefine.limit_type == 1){
					next_node_limit = true;
				}
			}
			
			panel = getFlowNode(flowNodeDefine.name,flowNodeDefine.disable_page,flowNodeDefine.id,"disable",flowNodeDefine.limit_finish_time);
		} else {
			//使用实例
			var flowNodeExample = flowNode.flowNodeExampleModels[0];
			//判断流程是否在当前节点
			if(flowNodeExample.id == cur_node_id){
				cur_node_i = i + 1;
			}	
			
			//判断流程是否在进行到最后一个节点
			if(cur_node_i == flowNodes.length){
				isFinashFlow = true;
			}
			
			//判断下一节点是否有时间限制
			if(cur_node_i == i){
				if(flowNodeExample.limit_type == 1){
					next_node_limit = true;
				}
			}
			
			//判断流程状态
			if(flow.sts == 0){
				//判断节点状态
				if(flowNodeExample.sts == 0) {
					//编辑状态
					panel = getFlowNode(flowNodeExample.name,flowNodeExample.edit_page,flowNodeExample.id,"edit",flowNodeExample.limit_finish_time);
				} else if(flowNodeExample.sts == 1 || flowNodeExample.sts == 2) {
					//签收和完成状态
					panel = getFlowNode(flowNodeExample.name,flowNodeExample.read_page,flowNodeExample.id,"read",flowNodeExample.limit_finish_time);
				}
			}else if(flow.sts == 1 || flow.sts == 2){
				//流程挂起与完结状态
				panel = getFlowNode(flowNodeExample.name,flowNodeExample.disable_page,flowNodeExample.id,"read",flowNodeExample.limit_finish_time);
			}
			
		}
		
		//放置数据
		$("#mainFlowForm").append(panel);
	}
	return {next_node_limit:next_node_limit,isFinashFlow:isFinashFlow};
}

//获取流程节点
function getFlowNode(title,url,node_id,nodeType,limit_finish_time){
	var nType;
	if(nodeType == "edit"){//蓝色
		nType = "color:#fffcfc;background-color:#2e83f7;border-color:#a2e4de;";
	}else if(nodeType == "read"){//深灰
		nType = "color:#111;background-color:#c0bebe;border-color:#b0b1b1;";
	}else if(nodeType == "disable"){//浅灰
		nType = "color:#858383;background-color:#e7e6e6;border-color:#cecece;";
	}
	var panel = $('<div id="node'+node_id+'" class="col-lg-8 col-lg-offset-2 dri-panel" style="padding: 0;margin-bottom:0"></div>');
	if(limit_finish_time ==null || limit_finish_time == "" ||limit_finish_time ==undefined){
		panel.append('<div class="panel-heading" style="padding:3px 10px;'+nType+'"><h6>' + title + '</h6></div>');
	}else{
		panel.append('<div class="panel-heading" style="padding:3px 10px;'+nType+'"><h6>' + title + '<span style="margin-left:20px">截止完成时间：'+limit_finish_time+'</span></h6></div>');
	}
	var panelBody = $('<div class="panel-body" style="padding:0"></div>');
	//获取参数
	var params = getFlowNodeParam(url);
	//添加节点信息
	params.node_id = node_id;
	params.flow_id = flow.id;
	params.type = nodeType;
	//只取地址
	url = url.split("?")[0];
	panelBody.load(contextPath + "/page/" + url,params);
	panel.append(panelBody);
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
function getFlowButtons(flow_id,flow_sts_obj){
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
					$("#butGroup").append(getFlowButton(btns[i],flow_sts_obj));

				}
			}

		}
	});
}
function getFlowButton(btn,flow_sts_obj){
	var html = '<a class="btn dribbble-btn btn-lg';
	html += getButtonColor(btn.code);
	//附件||日志
	if(btn.code == "FLOW_EXAMPLE_ATTACHMENT" || btn.code == "FLOW_LOG"){
		html += ' pull-right dribbble-btn-info';
	}
	if(btn.code == "FLOW_NODE_EXAMPLE_SUBMIT"){
		//提交next_node_limit
		html += '" onclick="dlgSubmit('+ flow_sts_obj.next_node_limit +','+flow_sts_obj.isFinashFlow+')" style="margin-left:10px">' + btn.name + '</a>';
	}else if(btn.code == "FLOW_LOG"){
		//日志
		html += '" onclick="setRzTable()" style="margin-left:10px">' + btn.name + '</a>';
	}else if(btn.code == "FLOW_EXAMPLE_ATTACHMENT"){
		//附件
		html += '" onclick="setFjTable()" style="margin-left:10px">' + btn.name + '</a>';
	}else if(btn.code == "FLOW_NODE_EXAMPLE_SAVE"){
		//保存
		html += '" onclick="onFlowSave()" style="margin-left:10px">' + btn.name + '</a>';
	}else{
		//其他
		html += '" onclick="alertWind(this)" style="margin-left:10px">' + btn.name + '</a>';
	}
	return html;
}
//获取按钮颜色
function getButtonColor(code){
	//设置按钮颜色
	//
	if(code=="FLOW_EXAMPLE_ATTACHMENT"||code=="FLOW_LOG"||code=="FLOW_NODE_EXAMPLE_SIGN"||code=="FLOW_NODE_EXAMPLE_SUBMIT"||code=="FLOW_NODE_EXAMPLE_SAVE"){
		//附件，日志，签收，提交，保存 =蓝色
		butColor=" dribbble-btn-info";
	}else if(code=="FLOW_EXAMPLE_CANCEL"){
		//撤销=红色
		butColor=" dribbble-btn-danger";
	}else if(code=="FLOW_NODE_EXAMPLE_FALLBACK"||code=="FLOW_NODE_EXAMPLE_GIVEUP"||code=="FLOW_EXAMPLE_HANGUP"){
		//回退，放弃，挂起=黄色
		butColor=" dribbble-btn-warning";
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
		str = "是否确定签收?";
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
		url = "/flow/fallBackFlowNode.do";
		butPostData = {"flow_id":flow.id,"node_id":flow.cur_node_id};
	}else if($(th).html() == "撤销"){
		str = "是否确定撤销?";
		url = "/flow/cancelFlow.do";
		butPostData = {"flow_id":flow.id};
	}else if($(th).html() == "挂起"){
		str = "是否确定"+$(th).html()+"?";
		url = "/flow/handUpFlow.do";
		butPostData = {"flow_id":flow.id};
	}else if($(th).html() == "恢复"){
		str = "是否确定"+$(th).html()+"?";
		url = "/flow/reHandUpFlow.do";
		butPostData = {"flow_id":flow.id};
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
						confirmWind(data,th);
					},
					error:function(error){
						
					}
				});
				
				layer.close(index);
			
			}
		}
	});
}
//响应保存操作
function onFlowSave(){
	for(var i=0; i< subNodeSave.length;i++){
		subNodeSave[i]();
	}
}
//确定~~操作；
function confirmWind(data,th){
	if($(th).html() == "签收"){
		resetPage(data,$(th).html());
	}else if($(th).html() == "放弃"||$(th).html() == "回退"||$(th).html() == "撤销"){
		if(data.success){
		window.parent.$('#homeTabs').tabs("close",window.parent.$('#homeTabs').tabs("getSelected").panel('options').title);								
		}else{
			buttonClickDialog(data);
		}
	}else if($(th).html() == "日志"){
		setRzTable(data.data.rows,data.success);
	}else if($(th).html() == "挂起"||$(th).html() == "恢复"){
		resetPage(data,$(th).html());
	}
}
//签收，挂起，恢复挂起的重置方法
function resetPage(data,str){
	if(data.success){
		var dataMsg = data;
		var flow_id = $.myMethod.getUrlParam("flow_id");
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
					var newFlow = data.data;
					if(str == "挂起"){
						//改变流程状态
						$("#lczt").html("挂起");
					}else if(str == "恢复"){
						$("#lczt").html("正常");
					}
					//初始化流程节点
					$("#mainFlowForm").html("");
					var flow_sts_obj = initFlowNodes(newFlow);
					//获取流程节点功能
					$("#butGroup").html("");
					getFlowButtons(flow.id,flow_sts_obj);
					//右侧提示窗
					$("#fixedNav").html("");
					getRightNav(newFlow);
					//弹框
					buttonClickDialog(dataMsg);
				}
			}
		});
		subNodeSave = new Array();
	}else{
		buttonClickDialog(dataMsg);
	}
}

//创建日志表格
function setRzTable(){
	
	$("#daylogTable").bootstrapTable({
		url: contextPath+"/flow/getFlowLog.do", //请求后台的URL（*） 
		queryParams:function(params){
			params.pageNum = params.pageNum / params.pageSize + 1;
			params.flow_id = flow.id;
			return params;
		},//传递参数（*） 
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 15,20], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: false, //是否启用点击选中行  
		showColumns: false, //是否显示 内容列下拉框
		detailView:false,//是否显示加号
		columns: [
//			{checkbox:true},//是否启用勾选
			{field:'flow_name',title:'流程名字'},
			{field:'node_name',title:'节点名称'},
			{field:'oper_name',title:'操作类型'},
			{field:'user_name',title:'用户名字'},
			{field:'create_time',title:'操作时间'},
			],
	});
	//$("#daylogTable").parent().attr('style','height: 430px');
	$("#daylogSubmit").modal('show');
}
//创建附件
function setFjTable(){}
//提交按钮
function dlgSubmit(next_node_limit,isFinashFlow){
	//是否可以提交
	$.ajax({
		url:contextPath+"/flow/isCanSubmitFlowNode.do",
		type:"post",
		dataType:"json",
		data:{
			"flow_id":flow.id,
			"node_id":flow.cur_node_id
		},
		async:false,
		success:function(data){
			var datas = data.data;
			if(data.success){
//				可以提交-start
				if(isFinashFlow){
//					最后一个节点
					$.myPlugin.judgementDialog({
						title: "提示",
						context: "是否结束流程",
						height: "150px",
						shade:0.5,
						btnFn: {
							btn1Fn: function(index, layero) {
								$.ajax({
									url:contextPath+"/flow/submitFlowNode.do",
									type:"post",
									dataType:"json",
									data:{
										"flow_id":flow.id,
										"node_id":flow.cur_node_id
									},
									async:false,
									success:function(data){
										if(data.success){
											window.parent.$('#homeTabs').tabs("close",window.parent.$('#homeTabs').tabs("getSelected").panel('options').title);
										}else{
											buttonClickDialog(data);
										}

									}
								})
							}
						}
					});
				}else{
//					提交弹出用户 组织 机构 等
					var userData = [];
					var roleData = [];
					var orgData = [];
					$.ajax({
						url:contextPath+"/flow/getFlowNodeOpers.do",
						type:"post",
						dataType:"json",
						data:{"node_id":flow.cur_node_id},//processData.data.cur_node_id
						async:false,
						success:function(data){
							var datas = data.data;
							if(data.success){
								for(var i = 0; i< datas.length; i++){
									if(datas[i].type == "USER"){
										userData.push({oper_name:datas[i].oper_name,type:datas[i].type,oper_id:datas[i].oper_id,notify_type:datas[i].notify_type,node_id:datas[i].node_id,id:datas[i].id,flag:datas[i].flag,create_time:datas[i].create_time});//type:data.data[i].type
									}else if(datas[i].type == "ORG"){
										orgData.push({text:datas[i].oper_name,type:datas[i].type,notify_type:datas[i].notify_type,orgId:datas[i].node_id});//type:data.data[i].type
									}else if(datas[i].type == "ROLE"){
										roleData.push({text:datas[i].oper_name,type:datas[i].type,orgId:datas[i].oper_id,notify_type:datas[i].notify_type,roleId:datas[i].node_id,userId:datas[i].node_id});//type:data.data[i].type
									}
								}
								userData = JSON.stringify(userData);
								orgData = JSON.stringify(orgData);
								roleData = JSON.stringify(roleData);
							}
						}
					});
					$.myPlugin.modelDialog({
						title: "提交", //弹窗标题
						context: contextPath+"/page/flow/flowSubmitTag.jsp", //弹窗内容指定文件的路径或指定文件的指定部分'文件路径 #id'
						tipType: "success", //弹窗的类型  success成功（绿色），error失败（红色），notice警告（橘黄色）
						width: "700px", //弹窗的宽度
						height: "600px", //弹窗的高度
						resize: false, //是否允许拉伸
						offset:'50px',
						data:{userData:userData,orgData:orgData,roleData:roleData,isLimit:next_node_limit},
						full:function(index){
							$(window).resize();
							$("#taskSubTabs").parent().parent().css("top","0");
						},
						restore:function(index){
							$(window).resize();
							$("#taskSubTabs").parent().parent().css("top","50px");
						},
						
					})
				}
//				可以提交-end
			}else{
				$.myPlugin.prompt(data);
			}
		}
	})
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
function getRightNav(flow){
	var flowNodes = flow.flow_nodes;
	for(var i = 0; i < flowNodes.length; i++) {
		var flowNode = flowNodes[i];
		var navItem = '';
		var lineItem = '';
		if(i == (flowNodes.length-1)){
			lineItem = '';
		}else{
			lineItem = '<div class="fixed-list-line"><span></span></div>'
		}
		//判断优先实例是否存在
		var flowNodeExample = flowNode.flowNodeExampleModels[0];
		var flowNodeDefine = flowNode.flowNodeDefineModels[0];
		if(flowNode.flowNodeExampleModels.length == 0) {
			//不存在
			navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle"> </a><span class="fixed-list-item-name">'+flowNodeDefine.name+'</span></div>';
		} else {
			//判断流程状态
			if(flow.sts == 0){
				//判断节点状态
				if(flowNodeExample.sts == 0) {
					//编辑状态
					navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle" style="background-color:#287df1;border-color:#287df1"> </a><span class="fixed-list-item-name">'+flowNodeExample.name+'</span></div>'
				} else if(flowNodeExample.sts == 1 || flowNodeExample.sts == 2) {
					//签收和完成状态
					navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle" style="background-color:grey"> </a><span class="fixed-list-item-name">'+flowNodeExample.name+'</span></div>';
				}
			}else if(flow.sts == 1 || flow.sts == 2){
				navItem = '<div class="fixed-list-item"><a class="fixed-list-item-circle"> </a><span class="fixed-list-item-name">'+flowNodeDefine.name+'</span></div>';
			}
		}
		$("#fixedNav").append(navItem);
		$("#fixedNav").append(lineItem);
	}
}
//子节点使用的方法
function addBtnSaveFunc(func){
	subNodeSave.push(func);
}
//级联操作方法们--start
function orgNodeChecked (event, node){ 
    checkAllParent(node,'#orgTree');  
    checkAllSon(node,'#orgTree');   
}   
function orgNodeUnchecked  (event, node){
    uncheckAllParent(node,'#orgTree');  
    uncheckAllSon(node,'#orgTree');   
}  
function roleNodeChecked (event, node){ 
    checkAllParent(node,'#roleTree');  
    checkAllSon(node,'#roleTree');   
}   
function roleNodeUnchecked  (event, node){
    uncheckAllParent(node,'#roleTree');  
    uncheckAllSon(node,'#roleTree');   
} 
  
//选中全部父节点  
function checkAllParent(node,treeName){
    $(treeName).treeview('checkNode',[node.nodeId,{silent:true}]);  
    var parentNode = $(treeName).treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)){  
        return;  
    }else{  
        checkAllParent(parentNode,treeName);  
    }  
}  
//取消全部父节点  
function uncheckAllParent(node,treeName){
    $(treeName).treeview('uncheckNode',[node.nodeId,{silent:true}]);  
    var siblings = $(treeName).treeview('getSiblings', node.nodeId);  
    var parentNode = $(treeName).treeview('getParent',node.nodeId);  
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
        uncheckAllParent(parentNode,treeName);  
    }  
  
}  
  
//级联选中所有子节点  
function checkAllSon(node,treeName){
    $(treeName).treeview('checkNode',[node.nodeId,{silent:true}]);  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            checkAllSon(node.nodes[i],treeName);  
        }  
    }  
}  
//级联取消所有子节点  
function uncheckAllSon(node,treeName){
    $(treeName).treeview('uncheckNode',[node.nodeId,{silent:true}]);  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i],treeName);  
        }  
    }  
}
//级联操作方法们--end

