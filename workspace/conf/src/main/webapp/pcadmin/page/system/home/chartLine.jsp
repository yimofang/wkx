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
				chartLine();
			});

			function chartLine() {
				$.myPlugin.chartLine({
					lineId: 'driChartLine', //DOM的id
						legend_data:['建投能源公司', '新天公司', '建投交通公司', '建投水务公司', '建投城镇化公司'],
						xAxis_data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07'],
						series: [{
							name: '建投能源公司',
							type: 'line',
							stack: '总量',
							data: [120, 132, 801, 134, 950, 230, 210]
						},
						{
							name: '新天公司',
							type: 'line',
							stack: '总量',
							data: [220, 182, 591, 234, 290, 30, 310]
						},
						{
							name: '建投交通公司',
							type: 'line',
							stack: '总量',
							data: [150, 232, 281, 154, 190, 330, 410]
						},
						{
							name: '建投水务公司',
							type: 'line',
							stack: '总量',
							data: [720, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '建投城镇化公司',
							type: 'line',
							stack: '总量',
							data: [820, 932, 901, 934, 190, 230, 120]
						}]
					
				})
			};
		</script>
	</head>

	<body>
		<div id="driChartLine" class="echart" style="height:500px;"></div>
	</body>

</html>