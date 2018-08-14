// 改变jQuery的AJAX默认属性和方法
$.ajaxSetup({
	type: "post",
	dataType: "json",
	complete:function(XMLHttpRequest,textStatus){     
		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
		if(sessionstatus=="timeout"){
			window.top.onbeforeunload = null;
			window.top.location.replace(contextPath + "/page/error/noSession.jsp");     
		}else if(sessionstatus=="noLogin"){
			window.top.onbeforeunload = null;
			var clientIp=XMLHttpRequest.getResponseHeader("clientIp");
			window.top.location.replace(contextPath + "/page/error/noLogin.jsp?ip=" + clientIp);   
		}
	}
});