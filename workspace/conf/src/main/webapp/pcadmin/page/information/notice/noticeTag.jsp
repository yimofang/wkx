	<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>	   
		<script type="text/javascript">var noticeId = <%=request.getParameter("noticeId")%>;</script>
		<script type="text/javascript">var viewtype = <%=request.getParameter("viewtype")%>;</script>
		<script type="text/javascript">var noticeWay = <%=request.getParameter("noticeWay")%>;</script>
		<script type="text/javascript">var index = <%=request.getParameter("index")%>;</script>		 
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/information/notice/noticeTag.js"></script>
		
		<div class="container-fluid animated fadeInLeft" style="padding-left: 25px;padding-right: 56px;padding-top: 10px;overflow-y:scroll">
			<form id="noticeInfo" >
	  		   <input type="hidden" name="id" id="id" value="">  
			   <input type="hidden" name="nuid" id="nuid" value=""> 			  
				    <div class="layui-form-item">
						<label class="layui-form-label">通知标题</label>
							<div class="layui-input-block">
								<input id="noticetitle1" type="text" name="noticetitle" lay-verify="title" autocomplete="off" 
							  placeholder="请输入通知标题"  class="layui-input form-control" onblur="isNull(this.value,this.id)">
							
							</div>
					</div> 
					<div class="layui-form-item">
						<label class="layui-form-label">通知类型</label>
							<div class="layui-input-block ">
							 <select id="noticetype" name="noticetype" class="form-control"></select>
							</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">通知级别</label>
							<div class="layui-input-block ">
							 <select id="noticelevel" name="noticelevel" class="form-control"></select>
							</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">是否可回复</label>
							<div class="layui-input-block">
								<select id="isrevertible" name="isrevertible" class="form-control">								
								</select>
							</div>
					</div>
					
					<!-- <div class="layui-form-item">
						<label class="layui-form-label">选择部门</label>
							<div class="layui-input-block">
								<input id="organizationid" type="text" name="organizationid"  lay-verify="title" autocomplete="off" 
							  placeholder="请选择部门" class="layui-input form-control" onblur="isNull(this.value,this.id)" onclick="organclick()">
							</div>
					</div> -->
					<div class="layui-form-item">
						<label class="layui-form-label">选择部门</label>
							<div class="layui-input-block">
								<input type="hidden" name="pid" id="pid" value="">
								<input id="pidName" name="pidName" type="text" lay-verify="title" autocomplete="off"
									isOpenTree="false" placeholder="点击选择" class="layui-input form-control" onclick="getOrganId(this)" style="ime-mode: disabled">
								<div id="organTree" style="display: none;position:absolute;z-index:222;width:100%"></div>
							</div>
					</div>
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">通知内容</label>
							<div class="layui-input-block">
							  <textarea id="noticecontent" name="noticecontent" placeholder="请输入内容" class="layui-textarea form-control"></textarea>
							</div>
					</div>					
					<div class="layui-form-item">
						<label class="layui-form-label">附件</label>
							<div class="layui-input-block">
								<input id="noticeaffix" type="text" name="noticeaffix" lay-verify="title" autocomplete="off" 
							  placeholder="请输入附件" class="layui-input form-control" onblur="isNull(this.value,this.id)">
							</div>
					</div>
					<div class="rcontent layui-form-item layui-form-text">
						<label class="layui-form-label">回复内容</label>
							<div class="layui-input-block">
							  <textarea id="replycontent" name="replycontent" placeholder="请输入内容" class="layui-textarea form-control"></textarea>
							</div>
					</div>
					<div class="layui-form-item pull-right"style="margin-top: 20px;margin-bottom: 0px;">
						<button type="button" class="submit btn btn-primary" onclick="updateNotice()">
  							<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>提交
						</button>
						<button type="button" class="cancel btn btn-default" onclick="closeDialog()">
	  						<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
						</button>
					</div>				
			</form>
		</div>
		
