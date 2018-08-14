//@ sourceURL=noticeTag.js
$(document).ready(function() {
	getGradeLevelByDict();
	getTypeByDict();
	getIsRevertibleByDict();
	getNoticeInfo();
});

function getNoticeInfo() {//获取通知公告信息
	var isrevertible="";	
	if(noticeId != null) {		
		var sendurl="getNoticeById";
		if(noticeWay==1){//判断是否是接收通知的查看
			sendurl="getNoticeByIdAndReceiver";
		}
		var objdata=null;
		$.ajax({
//			url:contextPath+"/system/notice/getNoticeById.do",
//			url:contextPath+"/system/notice/getNoticeByIdAndReceiver.do",
			url:contextPath+"/system/notice/"+sendurl+".do",
			type:"post",
			dataType:"json",
			data:{"id":noticeId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				objdata=dat.data;
				if(dat.success == true){
					
					$("#noticetitle1").val(obj.noticetitle);
					$("#noticetype").val(obj.noticetype);
					$("#noticelevel").val(obj.noticelevel);
					$("#isrevertible").val(obj.isrevertible);
					$("#pidName").val(obj.organreceive);
					$("#noticecontent").val(obj.noticecontent);
					$("#noticeaffix").val(obj.noticeaffix);
					$("#id").val(obj.id);									
					$("#nuid").val(obj.nuid);				
					$("#replycontent").val(obj.replycontent);	
						
					if(viewtype!=null){
						
						$("#noticetitle1").attr("readOnly","true");
						$("#noticetype").prop("disabled", true);
						$("#noticelevel").prop("disabled", true);
						$("#isrevertible").prop("disabled", true);
						$("#pidName").prop("disabled", "true");
						$("#noticecontent").attr("readOnly","true");
						$("#noticeaffix").attr("readOnly","true");					
						
						if(viewtype==0){
							if(obj.isrevertible==33){
								$("#replycontent").attr("readOnly","true");	
								$(".rcontent").show();
							}
							else{
								$(".rcontent").hide();
							}
							$(".submit").hide();
							$(".cancel").hide();
						}
						else{
							$(".submit").show();
							$(".cancel").show();
						}
					}
					else{
						$("#replycontent").hide();
					}
					if($("#noticeList").length >0) {
						$("#noticeList").bootstrapTable('refresh');//刷新通知列表更改查看状态
					}
					
				}
			},
			error:function(error){}			
		});
		
	}
	else{
		$(".rcontent").hide();
	}
		
		
}

function getGradeLevelByDict(){//从字典获取通知公告级别
		$.ajax({
			url:contextPath+"/dict/getDictByType.do",
			type:"post",
			dataType:"json",
			data:{"type":"TZJB"},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
					setGradeLevel(obj);
				}
			},
			error:function(error){}
		});
}

function setGradeLevel(obj){//将通知公告级别注入页面
	
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#noticelevel").append(html);
	}

}

function getTypeByDict(){//从字典获取通知公告类型
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"TZLX"},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setType(obj);
			}
		},
		error:function(error){}
	});
}

function setType(obj){//将通知公告类型注入页面
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#noticetype").append(html);
	}
	
}

function getIsRevertibleByDict(){//从字典获取通知公告是否可回复
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"TZHF"},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setIsRevertible(obj);
			}
		},
		error:function(error){}
	});
}

function setIsRevertible(obj){//将通知公告是否可回复级别注入页面

var html = '';
for(var i=0;i<obj.length;i++){
	html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
	$("#isrevertible").append(html);
}

}

function updateNotice(){//  通知公告
	var noticetitle =  $("#noticetitle1").val();//通知标题	
	
	var organizationid = $("#pid").val();//所属部门id
	var organizationName = $("#pidName").val();//所属部门名称
	console.log(noticetitle);
	if (noticetitle.length == 0) {
		id = "#noticetitle"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('通知标题不能为空', id);
		})
		return;
	}			
	if(noticeId == null){//添加通知内容
	$.ajax({
		url:contextPath+"/system/notice/addNotice.do",
		type:"post",
		dataType:"json",
		data:$("#noticeInfo").serialize(),
		success:function(data){			
			var dat = eval(data);
			if(dat.success == true){
				layer.closeAll();
				$("#noticeList").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){}
	});
}else{//回复通知内容
	if (replycontent.length == 0) {
		id = "#replycontent"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('回复内容不能为空', id);
		})
		return;
	}
	
	$.ajax({
		url:contextPath+"/system/notice/replyNotice.do",
		type:"post",
		dataType:"json",
		data:$("#noticeInfo").serialize(),
		success:function(data){			
			var dat = eval(data);
			if(dat.success == true){
				layer.closeAll();
				$("#noticeList").bootstrapTable('refresh');
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
				layer.closeAll();
				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){}
	});
	
}
	

}

function isNull(val,id){
	if (val == "") {
		id = "#"+id
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			parent.layer.tips('输入框不能为空', id);
		})
	}
}
function getOrganId(th){//获得部门列表
	var isOpenTree = $(th).attr("isOpenTree")
	if(isOpenTree == "false"){
		getOrganTree();
		$("#organTree").show();
		$(th).attr("isOpenTree","true");
	}else{
		$("#organTree").hide();
		$(th).attr("isOpenTree","false");
	}
}

function getOrganTree(){//上级机构下拉树
	$.ajax({
		url:contextPath+"/system/organization/getOrgTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			$.myPlugin.checkDownTree({
				treeId:"#noticeInfo #organTree",			//下拉树要放置的div的Id
				inpId:"#pidName",							//input的id
				hiddenInpId:"#pid",						//隐藏的input的id
				text:'text',			//列表显示类型
				data:data.data,				//首传参数
				id:'orgId',				//查询的参数
				result:'data',			//返回参数
				href:contextPath+'/system/organization/getOrgTree.do',
				showCheckbox: true,        		//是否显示复选框
				multiSelect: false,
			});
		},
		error:function(error){}
	});
}
function signNotice(objdata){
	$.ajax({
		url:contextPath+"/system/notice/signNotice.do",
		type:"post",
		dataType:"json",
		data:JSON.stringify(objdata),
		success:function(data){
			var dat = eval(data);
			var row = dat.data;
			if(dat.success == true){
				$('#noticeList').bootstrapTable('refresh', {field: 'id', values: [row.id]});
//				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
			}else{
//				$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
			}
		},
		error:function(error){
			
		}
	});
}
function checkAllParent(node){//选中所有父
    $('#noticeInfo #organTree').treeview('checkNode',[node.nodeId,{silent:true}]);//选择指定的节点
    var parentNode = $('#noticeInfo #organTree').treeview('getParent',node.nodeId);//返回checked节点的父节点
    if(!("nodeId" in parentNode)){
        return;
    }else{
        checkAllParent(parentNode);
    }
}
function checkAllSon(node){//选中所有子
    $('#noticeInfo #organTree').treeview('checkNode',[node.nodeId,{silent:true}]);//选择指定的节点
    if(node.nodes!=null&&node.nodes.length>0){
        for(var i in node.nodes){
            checkAllSon(node.nodes[i]);
        }
    }
}
function uncheckAllSon(node){//取消所有子
    $('#noticeInfo #organTree').treeview('uncheckNode',[node.nodeId,{silent:true}]);//取消指定的节点
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i]);  
        }  
    }  
}

function closeDialog(){
	//signNotice(objdata);
	layer.closeAll();
}
