<script type="text/javascript" src="${pageContext.request.contextPath}/js/form/system/org_select.js"></script>
<script type="text/javascript">
	var form_id = <%=request.getParameter("form_id")%>;
	var columnname = '<%=request.getParameter("columnname")%>';

	initItem(form_id,columnname);
</script>
<div>
	<input type="hidden" name="<%=request.getParameter("columnname")%>" id="<%=request.getParameter("columnname")%>" value="">
	<input id="pidName" type="text" lay-verify="title" autocomplete="off"
		placeholder="点击选择" class="layui-input" onclick="getOrganId()" onkeyup="cleanInput(this.id)">
	<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
</div>