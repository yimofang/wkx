
	var index = 1;
	var isLimit = isLimit;
	$('#taskSubTabs').tabs({
		fit:true,
		tools: [{
			iconCls: 'icon-add',
			handler: function() {
				index++;
				addTaskTabs(index,isLimit);
				setTaskTree(index);
				initLimittime(index)
			}
		}]
	});
	$("#taskSubTabs .icon-add").html("+");
	$("#taskSubTabs .icon-add").css({"font-size":"25px","font-weight":"bold"});
//初始化第一个
	addTaskTabs(index,isLimit);
	setTaskTree(index);
	initLimittime(index)


//确定提交
	function submitAlert(){
		$.myPlugin.judgementDialog({
			title: "提示",
			context: "是否确定提交",
			height: "150px",
			shade:0.5,
			btnFn: {
				btn1Fn: function(index, layero) {
					treeSubmit();
					layer.close(index);
				}
			}
		});
	}
//取消
	function closeDialog(){
		layer.closeAll();
	}
	function treeSubmit(){
		var nodes = new Array();
		var index = 0;
		var isCanSubmit = true;
		var isHave = false;
		$("#taskSubTabs .tab-content").each(function(){
			index++;
			var userChecked = $(this).find('#task'+index+'UserTree').treeview('getChecked');
			var orgChecked = $(this).find('#task'+index+'OrgTree').treeview('getChecked');
			var roleChecked = $(this).find('#task'+index+'RoleTree').treeview('getChecked');
			//判断是否每个任务都选择了负责人或用户或机构
			if(userChecked.length ==0 && orgChecked.length ==0 && roleChecked.length ==0 ){
				isCanSubmit = false;
			}
			var opers = new Array();
			for(var i = 0; i< userChecked.length; i++){
				opers.push({"oper_id":userChecked[i].oper_id,"type":"USER","notify_type":"EDIT"});
			}
			for(var i = 0; i< orgChecked.length; i++){
				opers.push({"oper_id":orgChecked[i].oper_id,"type":"ORG","notify_type":"EDIT"});
			}
			for(var i = 0; i< roleChecked.length; i++){
				opers.push({"oper_id":roleChecked[i].oper_id,"type":"ROLE","notify_type":"EDIT"});
			}
			if(isLimit){
				nodes.push({"opers":JSON.stringify(opers),limit_finish_time:$('#limittime'+index).val()});
			}else{
				nodes.push({"opers":JSON.stringify(opers)});
			}
			
		});
		//JSON.stringify(opers)
		if(isCanSubmit){
//			全部选择了负责人后提交
			$.ajax({
				url:contextPath+"/flow/submitFlowNode.do",
				type:"post",
				data:{
					"flow_id":flow.id,
					"node_id":flow.cur_node_id,
					"nodes":JSON.stringify(nodes)
				},
				dataType:"json",
				success:function(data){
					if(data.success){
						window.parent.$('#homeTabs').tabs("close",window.parent.$('#homeTabs').tabs("getSelected").panel('options').title);
					}else{
						buttonClickDialog(data);
					}
				},
				error:function(error){
					
				}
			});
		}else{
			$.myPlugin.judgementDialog({
				title: "提示",
				context: "请确保每一个任务都已选择负责用户或组织机构或角色",
				height: "155px",
				shade:0.5,
				btnFn: {
					btn1Fn: function(index, layero) {
						layer.close(index);
					}
				}
			});
		}
	}
//	添加一个tabs
	function addTaskTabs(cur_index,isLimit){
		var addHtml = "";
		if(isLimit){
			addHtml += '<div style="height: 50px;padding: 5px 20px 0;box-sizing: border-box;border-bottom: 2px solid #d5dce3;margin-bottom: 5px;">'
							+'<div class="layui-form-item">'
								+'<label class="layui-form-label">限期截止时间</label>'
								+'<div class="layui-input-block">'
									+'<input type="text" name="taskLimittime" id="limittime'+cur_index+'" placeholder="请输入限期截止时间" autocomplete="off" class="layui-input">'
								+'</div>'
							+'</div>'
						+'</div>'
		}
		
		addHtml += '<div class="tabs-container dribbble-tab" style="height: 90%;">'
						+'<ul class="nav nav-tabs col-lg-12 col-md-12 col-sm-12 text-center" style="padding-right:0">'
							+'<li class="active col-lg-4 col-md-4 col-sm-4" style="padding:0 0 0 0">'
								+'<a data-toggle="tab" href="#task'+cur_index+'User" aria-expanded="false" style="color: #157eca;">用户</a>'
							+'</li>'
							+'<li class="col-lg-4 col-md-4 col-sm-4" style="padding:0 0 0 0">'
								+'<a data-toggle="tab" href="#task'+cur_index+'Org" aria-expanded="true" style="color: #157eca;">机构</a>'
							+'</li>'
							+'<li class="col-lg-4 col-md-4 col-sm-4" style="padding:0 0 0 0">'
								+'<a data-toggle="tab" href="#task'+cur_index+'Role" aria-expanded="true" style="color: #157eca;">角色</a>'
							+'</li>'
						+'</ul>'
						+'<div class="tab-content" style="height: 100%;">'
							+'<div id="task'+cur_index+'User" class="tab-pane active">'
								+'<div class="panel-body">'
									+'<div id="task'+cur_index+'UserTree" class=""> </div>'
								+'</div>'
							+'</div>'
							+'<div id="task'+cur_index+'Org" class="tab-pane">'
								+'<div class="panel-body">'
									+'<div id="task'+cur_index+'OrgTree" class=""> </div>'
								+'</div>'
							+'</div>'
							+'<div id="task'+cur_index+'Role" class="tab-pane">'
								+'<div class="panel-body">'
									+'<div id="task'+cur_index+'RoleTree" class=""></div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>';
		$('#taskSubTabs').tabs('add', {
			title: 'task' + cur_index,
			content: addHtml,
			closable: false
		});
		
	}
	function initLimittime(cur_index){
		$.myPlugin.layDataTime('#limittime'+cur_index,'datetime');
	}
	function setTaskTree(cur_index){
//		用户树
		$('#task'+cur_index+'UserTree').treeview({
			data: userData,
			text:"oper_name",
			showCheckbox:true,
		});
//		组织机构树
		$('#task'+cur_index+'OrgTree').treeview({
			data: orgData,
			href:contextPath+'/system/organization/getOrgTree.do',
			text:"text",
			//queryParam:{type:"ORG"},
			id:'orgId',
			result:'data',
			showCheckbox:true,
			onNodeChecked:orgNodeChecked , 
	        onNodeUnchecked:orgNodeUnchecked  
		});
//		角色树
		$('#task'+cur_index+'RoleTree').treeview({
			data: roleData,
			href:contextPath+'/system/user/getUserByRole.do',
			text:"text",
			//queryParam:{type:"ROLE"},
			id:'roleId',
			result:'data',
			showCheckbox:true,
			onNodeChecked:roleNodeChecked , 
	        onNodeUnchecked:roleNodeUnchecked  
		});
	}