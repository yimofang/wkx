/*作者:白琨   日期:2017-8-2*/

/**
 * 通用下拉列表初始化js 用法: select_init('qu','getqu',null,{'shi':this.value},'name')
 * 
 * @param tag_id     初始化控件名称
 * @param method_name      访问数据controller
 * @param data_id      对比id
 * @param parameter  json格式 提交参数(与Controller方法参数一致)
 * @param valueKey  属性名称   name 或者 title 与查询出的 字段名称一致
 * @returns
 */

function select_init(tag_id, method_name, data_id, parameter,valueKey) {

	var methodpath = $("#basePath_hid").val();
	var top_id = 0;
	var select_str = "<option value='0' >--未选择--</option>";
	$.ajax({
		type : "POST", // 提交方式
		url : methodpath + "/" + method_name,// 路径
		dataType : "json",
		data : parameter,
		success : function(data) {// 返回数据根据结果进行相应的处理
			$.each(data, function(index, value) {
				if (data_id != null) {

					if (data_id == value.id) {
						select_str += "<option value='" + value.id
								+ "' selected='selected'>" +  value[valueKey]
								+ "</option> ";
					} else {
						select_str += "<option value='" + value.id + "' >"
								+  value[valueKey] + "</option> ";
					}
				} else {
					select_str += "<option value='" + value.id + "' >"
							+  value[valueKey] + "</option> ";
				}

			});
		 
			$("#" + tag_id).html(select_str);
		}
	});
    
	

}