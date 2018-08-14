<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String headstr = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
	pageContext.setAttribute("headstr", headstr);
%>


<head>
<meta charset="utf-8" />
<title></title>
<script type="text/javascript">
 location.href="${headstr}/.do";  
</script>
</head>
<style type="text/css">
* {
	padding: 0;
	margin: 0;
}

.jz {
	width: 200px;
	height: 200px;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	margin: auto;
}

.jz img {
	width: 200px;
	height: 200px;
}
</style>
<body>
	<div class="jz">
		<img src="${headstr}/upload/emofimg.png" />
	</div>
</body>