//@ sourceURL=checklistTag.js
/**
 * 隐患排查清单添加、修改、查看详情页
 */
function getchecklistInfo() {//获取隐患清单信息
	if(checklistId != null) {
		$.ajax({
			url:contextPath+"/flow/checklist/getCheckListById.do",
			type:"post",
			dataType:"json",
			data:{"id":checklistId},
			success:function(data){
				var dat = eval(data);
				var obj = dat.data;
				if(dat.success == true){
					$("#checklistInfo #id").val(obj.id);				//清单id
					$("#checklistInfo #listname").val(obj.listname);				//清单名称
					$("#checklistInfo #listtype").val(obj.listtype);				//清单类型
					$("#checklistInfo #organizationid").val(obj.organizationid);	//所属部门id		
					$("#checklistInfo #organizationName").val(obj.organizationName);	//所属部门名称(用作显示)
					$("#checklistInfo #listdes").val(obj.listdes);	//清单描述		
					
				}
			},
			error:function(error){}
		});
	}
}



function getTypeByDict(){//从字典获取隐患清单类型
	$.ajax({
		url:contextPath+"/dict/getDictByType.do",
		type:"post",
		dataType:"json",
		data:{"type":"YHQDLX"},
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

function setType(obj){//将隐患清单类型注入页面
	var html = '';
	for(var i=0;i<obj.length;i++){
		html = '<option value="'+obj[i].id+'">'+obj[i].key+'</option>';
		$("#listtype").append(html);
	}
	getchecklistInfo();
	
}




function updateCheckList(){//添加、修改隐患清单
	var name = $("#checklistInfo #listname").val();//清单名称
	var organizationid = $("#checklistInfo #organizationid").val();//所属机构	
	tabletojson();//调用函数将table内容转换为json格式
	if (name.length == 0) {
		id = "#name"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('清单名称不能为空', id);
		})
		return;
	}
	if (organizationid.length == 0) {
		id = "#organizationid"
		layui.use('layer', function() {
			var $ = layui.jquery,layer = layui.layer;
			layer.tips('所属机构不能为空', id);
		})
		return;
	}
	if(checklistId == null){//添加隐患清单
		$.ajax({
			url:contextPath+"/flow/checklist/addCheckList.do",
			type:"post",
			dataType:"json",
			data:$("#checklistInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				if(dat.success == true){
					layer.closeAll();
					$("#checklistList").bootstrapTable('refresh');					
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"success",time:3000});
				}else{
					layer.closeAll();
					$.myPlugin.prompt({title:"提示",context:dat.msg,tipType:"error",time:3000});
				}
			},
			error:function(error){}
		});
	}else{//修改隐患清单
		$.ajax({
			url:contextPath+"/flow/checklist/updateCheckList.do",
			type:"post",
			dataType:"json",
			data:$("#checklistInfo").serialize(),
			success:function(data){
				var dat = eval(data);
				var result = dat.data;
				if(dat.success == true){
					layer.closeAll();
					$('#checklistList').bootstrapTable('updateRow', {index: index, row: result});
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

function getOrganId(){//获得部门列表
	$.ajax({
		url:contextPath+"/system/organization/getOrgTree.do",
		type:"post",
		dataType:"json",
		success:function(data){
			getOrganTree(data.data);
		},
		error:function(error){}
	});
}

function getOrganTree(data){//上级机构下拉树
	$.myPlugin.newDownTree({
		treeId:"#checklistInfo #organTree",	//下拉树要放置的div的Id
		inpId:"#organizationid",			//input的id
		text:'text',			//列表显示类型
		data:data,				//首传参数
		id:'orgId',				//查询的参数
		result:'data',			//返回参数
		href:contextPath+'/system/organization/getOrgTree.do',
		nodeSelected:function(event,node){
			$("#organizationid").val(node.orgId);
			$("#organizationName").val(node.text);
			$("#organTree").hide();
		}
	});
}
//以下为清单项表格绑定、添加、删除事件
function getcheckitembylistid(){//从字典获取隐患清单类型
	var cklistid=checklistId;
	$.ajax({
		url:contextPath+"/flow/checklist/getCheckListItemListByListid.do",
		type:"post",
		dataType:"json",
		data:{"listid":cklistid},
		success:function(data){
			var dat = eval(data);
			var obj = dat.data;
			if(dat.success == true){
				setCheckItem(obj);
			}
		},
		error:function(error){}
	});
}

function setCheckItem(obj){//将隐患清单类型注入页面
	var html = '';
	for(var i=0;i<obj.total;i++){
		html='<tr> <td><input type="hidden" name="" id="" value="'+obj.rows[i].id+'" /></td><td><input type="hidden" name="" id="" value="'+obj.rows[i].itemid+'" /></td> <td><input type="" name="" id="" value="'+obj.rows[i].itemname+'"  class="layui-input form-control" readonly="readonly"/></td><td><button class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" onclick="deleteItem(this)">删除</button></td></tr>';
		$("#ckItemList").append(html);
	}
	getchecklistInfo();
	
}
//function addCheckItem(row){
//	$("ckItemList").append('<tr> <td><input type="hidden" name="" id="" value="'+row.id+'" /></td> <td><input type="text" name="" id="" value="'+row.itemname+'" class="layui-input form-control" /><button onclick="deleteItem(this)">删除</button></td></tr>');
//	
//}
//----table相关----//
function deleteItem(th){
	$(th).parent().parent().remove();
}
//将table内容转换为json格式
 function tabletojson(){
	 
	 var array = new Array();
	 for(var i = 0;i<$("#ckItemList tr").length;i++){
		 var obj = new Object();
		 var id = $("#ckItemList tr:eq("+i+")").children().eq(0).find("input").val();  
		 var itemid = $("#ckItemList tr:eq("+i+")").children().eq(1).find("input").val();  
		 var itemname = $("#ckItemList tr:eq("+i+")").children().eq(2).find("input").val();  
		 obj.id=id;
		 obj.itemid=itemid;
		 obj.itemname=itemname;
		 array.push(obj);
	 }	 
	 jsonStr=JSON.stringify(array);
        $("#checklistInfo #tablejson").val(JSON.stringify(array));
       
    }  
$(document).ready(function() {
	
	getTypeByDict();
	if(checklistId!=null){
		getcheckitembylistid();	
	}
});

function selcheckitemList(title){//选择排查清单项
	$.myPlugin.modelDialog({context:contextPath+'/page/flow/checklist/checkitem.jsp',title:title,width:'700px',height:'600px',offset:'150px',resize:true,});
}

function closeDialog(){
	layer.closeAll();
}