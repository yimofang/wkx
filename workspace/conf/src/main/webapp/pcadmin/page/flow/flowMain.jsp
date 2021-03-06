﻿<script type="text/javascript" src="${pageContext.request.contextPath}/js/flow/flowMain.js"></script>
<style>
	.flowTitleItem {
		padding-top: 6px;
		border: 1px solid #101010;
		margin-bottom: 0px;
	}
	
	.centerInDev {
		top: 50%;
		left: 50%;
		position: relative;
		transform: translate(-50%, -50%);
	}
	
	.navCenter {
		margin-left: 220px;
	}
	
	.navCenterHead {
		margin-top: 90px;
	}
	.fixed-list-item{
		overflow: hidden;
		text-align: center;
	}
	.fixed-list-item-circle{
		float: left;
		width: 16px;
		height: 16px;
		border: 2px solid grey;
		border-radius: 50%;
	}
	.fixed-list-line{
		width: 20px;
		height: 40px;
		overflow: hidden;		
	}
	.fixed-list-line span{
		float: left;
		width: 0;
		height: 36px;
		border: 1px solid gray;
		margin-left: 7px;
		margin-top: 1px;
	}
	.circle-active{
		background-color: deepskyblue;
		border-color: deepskyblue;
	}
	::-webkit-scrollbar{
		display:none;
	}
</style>
<!--顶部导航-->
<nav class="navbar navbar-default navbar-fixed-top navCenter navCenterHead" style="background-color: #f2f2f2;">
	<div class="container-fluid" style="padding-top: 10px;">
		<div class="row">
			<div class="col-lg-8 col-lg-offset-2" style="padding: 0px;margin-bottom: 0px;">
				<div class="dri-panel panel-info">
					<div class="panel-body" style="padding: 0px;">
						<table class="table table-bordered table-striped" id="mainTab" style="margin: 0px;">
							<tr>
								<td>流程编号</td>
								<td id="lcbh"></td>
								<td>流程名称</td>
								<td id="lcmc"></td>
								<td>流程类型</td>
								<td id="lclx"></td>
							</tr>
							<tr>
								<td>发起人</td>
								<td id="lcfqr"></td>
								<td>发起时间</td>
								<td id="fqsj"></td>
								<td>流程状态</td>
								<td id="lczt"></td>
							</tr>
							<tr>
								<td>当前环节</td>
								<td id="dqhj"></td>
								<td>当前操作人</td>
								<td id="dqczr"></td>
								<td>操作时间</td>
								<td id="czsj"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

	</div>
</nav>
<!--底部导航-->
<nav class="navbar navbar-default navbar-fixed-bottom navCenter navCenterHead">
	<div class="container-fluid" id="butGroup" style="padding-top: 6px;padding-left: 10px;">
		<!--<a id="qianshou" class="btn dribbble-btn dribbble-btn-success btn-lg" onclick="alertWind('签收')">签收</a>
		<a id="tijiao" class="btn dribbble-btn dribbble-btn-success btn-lg" onclick="onFolwSubmit()">提交</a>
		<a id="fangqi" class="btn dribbble-btn dribbble-btn-danger btn-lg" onclick="alertWind('放弃')">放弃</a>
		<a id="zhipai" class="btn dribbble-btn dribbble-btn-warning btn-lg" onclick="alertWind('指派')">指派</a>
		<a id="guaqi" class="btn dribbble-btn dribbble-btn-warning btn-lg" onclick="alertWind('挂起')">挂起</a>
		<a id="huitui" class="btn dribbble-btn dribbble-btn-info btn-lg" onclick="alertWind('回退')">回退</a>
		<a id="chexiao" class="btn dribbble-btn dribbble-btn-danger btn-lg" onclick="alertWind('撤销')">撤销</a>
		<a id="rizhi" class="btn dribbble-btn dribbble-btn-info btn-lg" onclick="daylog('日志')">日志</a>
		<a class="btn dribbble-btn dribbble-btn-info btn-lg pull-right" onclick="daylog('附件')" style="margin-right: 10px;">附件</a>-->
	</div>
</nav>
<!--主要工作区域-->
<div id="mainFlowForm" class="container-fluid" style="margin-top: 127px;height: 707px;padding:0;padding-bottom: 30px;font-size: 20px;overflow: scroll;"></div>
<!--页面内部弹出框（提交）-->
<div id="dlgSubmit" style="margin-top: 8%;" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content" style="height: 425px;background-color: #fff;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top: -13px;font-size: 30px;">
			        		<span aria-hidden="true">&times;</span>
			        	</button>
				<h3 style="margin-top: -10px;margin-bottom: -8px;" id="modelH3">提交</h3>
			</div>
			<div class="modal-body " style="background-color:#e2e2e2;overflow: hidden;padding:0 0 0 0">
				<div id="entContainer" class="container-fluid" style="padding:0 0 0 0;margin:0 0 0 0;">
					<div class="tabs-container dribbble-tab" style="height: 320px;">
						<ul class="nav nav-tabs col-sm-12 text-center">
							<li class="active col-sm-4" style="padding:0 0 0 0">
								<a data-toggle="tab" href="#tab-1" aria-expanded="false" style="color: #157eca;">用户</a>
							</li>
							<li class="col-sm-4" style="padding:0 0 0 0">
								<a data-toggle="tab" href="#tab-2" aria-expanded="true" style="color: #157eca;">机构</a>
							</li>
							<li class="col-sm-4" style="padding:0 0 0 0">
								<a data-toggle="tab" href="#tab-3" aria-expanded="true" style="color: #157eca;">角色</a>
							</li>
						</ul>
						<div class="tab-content" style="height: 320px;">
							<div id="tab-1" class="tab-pane active">
								<div class="panel-body">
									<div id="userTree" class="">
									</div>
								</div>
							</div>
							<div id="tab-2" class="tab-pane">
								<div class="panel-body">
									<div id="mechanismTree" class="">
									</div>
								</div>
							</div>
							<div id="tab-3" class="tab-pane">
								<div class="panel-body">
									<div id="roleTree" class="">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal" onclick = "submitAlert()">提交</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
			</div>
		</div>
	</div>
</div>
<!--页面内部弹出框（日志/附件）-->
<div id="daylogSubmit" style="margin-top: 8%;" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content" style="height: 436px;background-color: #fff;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top: -13px;font-size: 30px;">
			        		<span aria-hidden="true">&times;</span>
			        	</button>
				<h3 style="margin-top: -10px;margin-bottom: -8px;">日志</h3>
			</div>
			<div class="modal-body " style="background-color:#e2e2e2;overflow: hidden;padding:0 0 0 0">
				<div id="entContainer2" class="container-fluid" style="padding:0 0 0 0;margin:0 0 0 0;">
					<div class="tabs-container dribbble-tab" style="height: 380px;">
						<table class="table table-bordered table-striped" id="daylogTable">
						</table>
					</div>
				</div>
			</div>
			<!--<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal">提交</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
			</div> -->
		</div>
	</div>
</div>
</nav>
<!-- 信息删除确认 -->
<div class="modal fade" id="delcfmModel" style="padding-top: 280px;">
	<div class="modal-dialog">
		<div class="modal-content message_align">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">提示信息</h4>
			</div>
			<div class="modal-body">
				<p id="text"></p>
			</div>
			<div class="modal-footer">
				<input type="hidden" id="url" />
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<a onclick="urlSubmit()" class="btn btn-success" data-dismiss="modal">确定</a>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- 固定在屏幕右侧的目录 -->
<div class="fixedNav" id ="fixedNav" style="position: fixed;top: 350px;right: 50px;width: 100px;height: 500px;">
	<!--<div class="fixed-list-item">
		<a class="fixed-list-item-circle circle-active" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
	<div class="fixed-list-line">
		<span></span>
	</div>
	<div class="fixed-list-item">
		<a class="fixed-list-item-circle" href="#div1"> </a><span class="fixed-list-item-name">111111</span>
	</div>
-->
</div>