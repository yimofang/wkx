<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script type="text/javascript">
getQueryString = function(name) {
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	 var r = window.location.search.substr(1).match(reg);
	 if (r != null){
		 return unescape(r[2]); 
	 }
	 return null;
};
$(function() {
	var ip = getQueryString("ip");
	$("#ip").text(ip);
});
</script>
<div style="text-align: center; padding-top: 200px;">
	<span style="font-size: 16px; font-family: 微软雅黑; font-weight:bold; ">此用户已在[<span id="ip" style="color: red;"></span>]登录&nbsp;<a href="../../">返回</a>&nbsp;登录页</span>
</div>