<!DOCTYPE html>  
<html>
<head>  
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>Hello, World</title>  
<style type="text/css">  
html{height:100%}  
body{height:100%;margin:0px;padding:0px}  
containerMap{height:100%}  
</style>  
<script type='text/javascript' src="${pageContext.request.contextPath}/jslib/jquery/jquery-1.12.3.js" ></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=EvQXrq1tUMLIu2d1tGpQIeNZSTe6LG6y"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/commonMapEx.js"></script>
</head>  
 
<body>  
<div id="containerMap" style="height:100%;"></div> 
<script type="text/javascript"> +
//加载地图

loadMap(114.534328, 38.052426,13,"containerMap");
//setMapTypeCtrl();
addMapController();

addCircle(114.534328, 38.012426);
//getBoundary();
</script>  
</body>  
</html>