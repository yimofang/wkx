<script type="text/javascript" src="${pageContext.request.contextPath}/js/form/commonFlowForm.js"></script>
<script type="text/javascript">
	var form_id = <%=request.getParameter("form_id")%>;
	var flow_id = <%=request.getParameter("flow_id")%>;
	var node_id = <%=request.getParameter("node_id")%>;
	var type = '<%=request.getParameter("type")%>';
	
	initPage(form_id,flow_id,node_id,type);
	//console.log("form_id"+form_id);console.log("flow_id"+flow_id);console.log("node_id"+node_id);
</script>

<div style="width:100%;height:500px;overflow:scroll">
	<div id="form<%=request.getParameter("node_id")%><%=request.getParameter("form_id")%>" class="container-fluid" style="padding-left: 25px;padding-right: 56px;padding-top: 10px;position：relative;height:100%;margin-bottom:20px">
	</div>
</div>