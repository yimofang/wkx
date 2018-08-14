<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
  <title>登录</title> 
 <!-- 自定义控件库 -->
 <script type='text/javascript' src="${pageContext.request.contextPath}/jslib/jquery/jquery-1.12.3.js"></script>
 <script type='text/javascript' src="${pageContext.request.contextPath}/jslib/echarts.js"></script>
 <script type='text/javascript' src="${pageContext.request.contextPath}/jslib/jquery.myExtend.plugin.js"></script>
 <script type="text/javascript">
 
	$(document).ready(function() {
		chartPie();
	});
	function chartPie(){
		$.myPlugin.chartPie({
			pieId:'driChartPie',
			title:'环形图',//标题
			legend_data: [
			{//图例名字
				name: '一般隐患',
				icon: 'square'
			},
			{
				name: '重大隐患',
				icon: 'square'
			},
			{
				name: '无隐患',
				icon: 'square'
			}],
			series_name:'环形图名字',
			series_data:[{//鼠标悬停时候
				value: 8,
				name: '一般隐患'
			},
			{
				value: 4,
				name: '重大隐患'
			},
			{
				value: 40,
				name: '无隐患'
			}]
		})
	};

</script>
</head>

<body>
	<div id="driChartPie" class="echart" style="height:500px;"></div>
</body>
</html> 