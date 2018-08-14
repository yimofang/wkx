<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/yhpc/yhsh.js"></script>
<script type="text/javascript">
	var btn = '<%=request.getParameter("btn")%>';
	var typeStyle = '<%=request.getParameter("type")%>';
	var node_id = <%=request.getParameter("node_id")%>;
	initPage();
	
</script>

<div class="dri-row" style="margin: 0;padding:0">
	<div class="dri-panel panel-success" style="padding:0;margin:0">
		<div class="panel-body" >
			<div class="row">
				<div id="comment" class="col-lg-10">
					<form class="form-inline" id="formNodeComment">
						<div class="col-lg-6" style="margin-bottom: 0px">
							<div class="form-group">
                                <label class="label-m" style="margin-bottom: 0px">操作人：</label>
                                <label id="user_name" class="label-m" style="margin-bottom: 0px"></label>
                            </div>
						</div>
						<div class="col-lg-6" style="margin-bottom: 0px">
							<div class="form-group">
                               <label class="label-m" style="margin-bottom: 0px">操作时间：</label>
                               <label id="oper_time" class="label-m" style="margin-bottom: 0px"></label>
                            </div>
						</div>
						<div class="col-lg-12" style="padding-right:15px; padding-left:15px">
							<h6 style="margin-left: 4px">意见：</h6>
							<textarea id="comment_info" name="comment_info" class="form-control" rows="5" style="width:100%" disabled="disabled" ></textarea>	
						</div>	
					</form> 
				</div>
				<div id="btn_tool" class="col-lg-2 text-center" style="margin-top:80px;padding-left: 0px">

               </div>
			</div>
		</div>
	</div>
</div>