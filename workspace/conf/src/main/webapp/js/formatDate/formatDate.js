
/**
 * 时间戳格式化
 * @param date
 * @returns {String}
 */
function formatDate(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
}

/**
 * 时间戳格式化秒，毫秒
 * @param date
 * @returns {String}
 */
function formatDate_to(date) {
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
	return y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
}