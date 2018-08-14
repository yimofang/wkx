<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>考试</title>
</head>
<body>
	<div id="time">考试时间</div>
	<script>
		var maxtime = 60 * 60 //一个小时，按秒计算，自己调整!
		function CountDown() {
			if (maxtime >= 0) {
				minutes = Math.floor(maxtime / 60);
				seconds = Math.floor(maxtime % 60);
				minutes = minutes >= 10 ? minutes : '0' + minutes;
				seconds = seconds >= 10 ? seconds : '0' + seconds;
				msg = "距离结束还有" + minutes + "分" + seconds + "秒";
				document.all["time"].innerHTML = msg;
				if (maxtime == 5 * 60)
					alert('注意，还有5分钟!');
				--maxtime;
			} else {
				clearInterval(timer);
				alert("时间到，结束!");
				initTrainingList();
			}
		}
		timer = setInterval("CountDown()", 1000);
	</script>


	<div>
</body>
</html>