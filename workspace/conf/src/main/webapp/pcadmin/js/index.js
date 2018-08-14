
var websocket = null;
var userId = 0;

$(document).ready(function() {
	getUserMsg();
	getMainList();
	getHomePage();
	openWebSocket();
});
function getUserMsg(){
	$.ajax({
		url:contextPath+"/system/user/getUserById.do",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			var path = contextPath.substring(0,1);
			var obj = data.data;
			userId = obj.id;
			$('#userName').text(obj.name);
			$('#enterName').append(obj.enterName);
			$('#headimage').attr("src",path+obj.headimage);
		},
		error:function(error){
			
		}
	});
}

function openWebSocket(){
	//判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
	    websocket = new WebSocket("ws://localhost:8080/IntellSecurity-web/websocket/"+userId+"/web");
	}
	else {
	    alert('当前浏览器 Not support websocket')
	}

	//连接发生错误的回调方法
	websocket.onerror = function () {
	    console.info("WebSocket连接发生错误");
	};

	//连接成功建立的回调方法
	websocket.onopen = function () {
		console.info("WebSocket连接成功");
	}

	//接收到消息的回调方法
	websocket.onmessage = function (event) {
		$("#dl").children().remove();
		var edata =  eval('(' + event.data + ')');
		var list = edata.msgs;
		var ldata = eval('(' + list + ')');
		var num = edata.redpointnum;
		var user = edata.userid;
		var str = '';
		for (var i = 0; i < ldata.length; i++) {
			var title = ldata[i].pushmsgtitle;
			var time = ldata[i].pushmsgtime;
			var id = ldata[i].id;
			str +='<dd onclick="checkMsg('+ldata[i].id+')">';
			if(ldata[i].pushmsglevel == 1){
				str +='	<label class="dribbble-btn-circle label label-turquoise" style="background-color: #00BB00;">';
			}else if (ldata[i].pushmsglevel == 2){
				str +='	<label class="dribbble-btn-circle label label-turquoise" style="background-color: #FFD306;">';
			}else if (ldata[i].pushmsglevel == 3){
				str +='	<label class="dribbble-btn-circle label label-turquoise" style="background-color: #EA0000;">';
			}
			str +='		<cite class="fa fa-safari"></cite>';
			str +='	</label>';
			str +='	<span>'+ldata[i].pushmsgcontext+'</span>';
			str +='	<tt>'+ldata[i].pushmsgtime+'</tt>';
			str +='</dd>';
		}
		$("#dl").append(str);
		$('#notCheckMessage').text(num);
		$("#newMsgNum").text(num);
		websocket.send(user);
	}

	//连接关闭的回调方法
	websocket.onclose = function () {
	}

	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function () {
	    closeWebSocket();
	}
}


//关闭WebSocket连接
function closeWebSocket() {
	websocket.close();
}

function checkMsg(messageId){
	$.myPlugin.modelDialog({context:'../page/information/message/messageTag.jsp',data:{messageId:messageId},title:'消息',width:'550px',height:'450px',offset:'150px',resize:false,});
}
function addPushMsg(){
	$.ajax({
		type: "POST",
		url: contextPath+"/system/pushMessage/addPushMessage.do",
		async:false,
		success: function(data){
			if(data.success == true){
				alert(data.msg);
			}else{
				alert(data.msg);
			}
		}
	});
}

function logout(){
	if(confirm("是否要退出系统")==true){
		$.ajax({
			url:contextPath+"/login/logout.do",
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.success == true){
					window.location.href=contextPath;
				}else{
					$.myPlugin.prompt({tipType:'notify',context:'退出失败!'});
				}
			}
		});
	}
}

function getMainList(){//首页左侧菜单
	$.ajax({
		url:contextPath+"/system/menu/getMenuByUserId.do",
		type:"post",
		dataType:"json",
		success:function(data){
			var obj = eval(data);
			initMenuList(obj.data);
		},
		error:function(error){
			
		}
	});
	
}
function initMenuList(menuList){//菜单注入页面
	for(var i=0;i<menuList.length;i++){
		var menu = menuList[i];
		var html = "";
		if(menu.url == undefined || menu.url == "" || menu.url == null){
			html += '<li id="menu_item'+menu.id+'">';
			html += '<a href="#"><i class="iconfont icon-bag"></i> <span class="nav-label">'+menu.name+'</span><span class="fa arrow"></span></a>';
			html += '<ul class="nav '+getMenuLvlClass(menu.menulevel)+'">';
			html += '</ul>';
			html += '</li>';
		}else{
			html += '<li>';

			html += '<a href="#" onclick="addFirstTab(\''+menu.name+'\',\''+menu.url+'\',\''+menu.code+'\')"';
			html += '><i class="iconfont icon-bag"></i> <span class="nav-label">'+menu.name+'</span></a>';
			html += '</li>';
		}
		
		if(menu.pid == undefined || menu.pid == "" || menu.pid == null){
			$('#side-menu').append(html);
		}else{
			$('#menu_item'+menu.pid+'> ul').append(html);
		}
	}
	initMenu();
}
function getMenuLvlClass(lvl){
	switch(lvl){
		case 1:
			return "nav-second-level";
		case 2:
			return "nav-third-level";
		default:
			return "";
	}
}
//首页右上角小锁
var editHome = false;
function edithome(){

	if(editHome == false){
		editHome = true;
		$("#homeEditTool").show();
		$('#edithometool').removeClass('icon-lock').addClass('icon-unlock');
		gridster.enable(); 
//		$('#myWork').draggable({   
//			handle:'#myWork-title',
//			proxy:'clone',
//			onBeforeDrag : function (e) {  
//	            $('#myWork').css("z-index",1);
//	        },
//			onStartDrag : function (e) {  
//	            $('#myWork').hide();
//	        },  
//	        onDrag : function (e) {  
//	            //alert('拖动过程触发！');  
//	        },  
//	        onStopDrag : function (e) {  
//	            $('#myWork').show();
//	            $('#myWork').css("z-index","auto");
//	            $('#myWork').css("position","relative");
//	            $('#myWork').css("left","0px");
//	            $('#myWork').css("top","0px");
//	            $('#index-container-row').append($('#myWork'));
//	        }
//		});
	}else{
		editHome = false;
		$("#homeEditTool").hide();
		$('#myWork').draggable("disable");
		$('#edithometool').removeClass('icon-unlock').addClass('icon-lock');
		gridster.disable();
		if(confirm("确定要保存当前位置")==true){
			var dataObj = [];
			$(".gridster-wrap li").each(function(){
				var idNum = $(this).attr("idNum");
				var configcode = $(this).attr("id");
				var configacqcol = $(this).attr("data-col");
				var configacqrow = $(this).attr("data-row");
				var configacqsizex = $(this).attr("data-sizex");
				var configacqsizey = $(this).attr("data-sizey");
				var msg = {
					"idNum":idNum,
					"configacqcol":configacqcol,
					"configcode":configcode,
					"configacqrow":configacqrow,
					"configacqsizex":configacqsizex,
					"configacqsizey":configacqsizey
				};
				dataObj.push(msg);
			})
			var data = {
				"data":dataObj
			}
			$.ajax({
				url:contextPath+"/system/homeConfig/updateUserConfigList.do",
				type:"post",
				data:data,
				dataType:"json",
				success:function(data){
				},
				error:function(error){
					
				}
			});
		}
	}

}

function settings(title){
	if(title=='个人资料'){
		$.myPlugin.modelDialog({context:'../page/system/user/userInfo.jsp',title:title,width:'600px',height:'650px',offset:'100px',resize:false,});	
	}else{
		$.myPlugin.modelDialog({context:'../page/system/user/password.jsp',title:title,width:'500px',height:'340px',resize:false});
	}
}

function addFirstTab(title,url,id,path){
	//alert("path="+path);
	$.myMethod.addTab({title:title,url:url,id:id,path:path});
}
//主页跳转页
function getHomePage(){
	$.myMethod.addTab({title:"主页",url:"system/home/homePage.jsp",tabType:"div",closable:false})
}
//主页-右上角消息按钮-‘全部’跳转页
function addMessageTab(){
	$.myMethod.addTab({title:'消息',url:'information/message/message.jsp',id:'NEWS'});
}
