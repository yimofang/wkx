var options = {
	// jqueryform 处理设置
	beforeSubmit : null, // 提交前处理
	success : null, // 处理完成
	resetForm : false,
	contentType : "application/x-www-form-urlencoded; charset=utf-8",
	dataType : 'json',
	type : "post", // 提交方式
	url : ""// 路径

};

function form_submit(formName, url) {
	// 提交
	$('#' + formName).submit(function() {
		options.beforeSubmit = showRequest;
		options.success = likes_succ;
		options.url = $("#basePath").val() + url;
		$(this).ajaxSubmit(options);
		// 设置 提交 时不刷新，用于显示 错误提示
		return false;
	});
}

function showRequest(formData, jqForm, options) {
	// 处理提交时 验证
	return true;
}

