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
		chartBar();
	});
	function chartBar(){
		$.myPlugin.chartBar({
			barId:'driChartBar',//DOM的id
			title:'柱状图',//标题
			legendColor:['#34bfed','#287df1','#40d6bf','#f9eb55'],//图例颜色
			legendData:[
				{name:'安全检查次数',icon:'rect'},
				{name:'隐患数',icon:'rect'},
				{name:'已整改',icon:'rect'},
				{name:'未整改',icon:'rect'}
			],//图例名字
			xAxisData: ['建投能源公司','新天公司','建投交通公司','建投水务公司','建投城镇化公司'],//横坐标的名字
			series:[
				{
					name: '安全检查次数',
					type: 'bar',
					data: [20, 40, 30, 14, 18],
				},
				{
					name: '隐患数',
					type: 'bar',
					data: [8, 6, 6, 10, 8]
				},
				{
					name: '已整改',
					type: 'bar',
					data: [4, 2, 4, 8, 5]
				},
				{
					name: '未整改',
					type: 'bar',
					data: [4, 4, 2, 2, 3]
				},
			]
			
		});
	};
</script>
</head>

<body>
	<div id="driChartBar" class="echart" style="height:256px;"></div>
</body>
</html> 