<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
  <title>主页</title> 
  <jsp:include page="../../common/includeCommon.jsp"></jsp:include>


</head>

<body>
<div title="主页" >
  <link href="${pageContext.request.contextPath}/css/jquery.gridster.min.css" rel="stylesheet" type="text/css"/>
  <link href="${pageContext.request.contextPath}/css/homePage.css" rel="stylesheet" type="text/css"/>
  <script type='text/javascript' src="${pageContext.request.contextPath}/jslib/jquery.gridster.js"></script>
  <script type='text/javascript' src="${pageContext.request.contextPath}/js/system/home/homePage.js"></script>
	<div id="gridster-scroll" style="height:880px;overflow-x:scroll">
		<div class="gridster">
			<ul class="gridster-wrap container-fluid" id ="gridster-wrap-id">
					
			</ul>
	
		
		</div>
	</div>
</div>
</body>
</html> 