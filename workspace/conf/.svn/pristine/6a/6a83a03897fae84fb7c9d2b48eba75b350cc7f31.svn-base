function getDateDiff(dateTimeStamp) {
	 
	// 距离时间格式化
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		return;
	}
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (monthC >= 1) {
		//result = "" + parseInt(monthC) + "月前";
		result=""+formatDate_ymd(new Date(dateTimeStamp));
	} else if (weekC >= 1) {
		//result = "" + parseInt(weekC) + "周前";
		result=""+formatDate_ymd(new Date(dateTimeStamp));
	} else if (dayC >= 1) {
		//result = "" + parseInt(dayC) + "天前";
		result=""+formatDate_ymd(new Date(dateTimeStamp));
	} else if (hourC >= 1) {
		//result = "" + parseInt(hourC) + "小时前";
		result=""+formatDate_hf(new Date(dateTimeStamp));
	} else if (minC >= 1) {
		//result = "" + parseInt(minC) + "分钟前";
		result=""+formatDate_hf(new Date(dateTimeStamp));
	} else
		//result = "刚刚";
	    result=""+formatDate_hf(new Date(dateTimeStamp));
	return result;
}

function formatDate_hf(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	h = h < 10 ? '0' + h : h;
	f = f < 10 ? '0' + f : f;
	s = s < 10 ? '0' + s : s;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return   h + ":" + f  ;
}

function formatDate_ymd(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	h = h < 10 ? '0' + h : h;
	f = f < 10 ? '0' + f : f;
	s = s < 10 ? '0' + s : s;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d  ;
}
