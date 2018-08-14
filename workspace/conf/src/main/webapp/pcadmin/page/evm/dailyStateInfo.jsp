<!-- 首页-环保数据-日报表 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/evm/dailyStateInfo.js"></script>
	<div class="container-fluid animated fadeInLeft" style="padding-left: 30px;padding-right: 45px;padding-top: 10px;">
			<form id="dailyInfo">
				<div class="layui-form-item">
					<label class="layui-form-label">生活、生产废水</label>
					<div class="layui-input-block">
						<input id="fsthput" type="text" name="fsthput" lay-verify="title"
							autocomplete="off" class="layui-input form-control"  readonly>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">总成本</label>
					<div class="layui-input-block">
						<input id="fstotal" type="text" name="fstotal" lay-verify="title" readonly
							autocomplete="off" value="" class="layui-input form-control">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">备件消耗</label>
					<div class="layui-input-block">
						<input id="fsconsum"type="text" name="fsconsum" lay-verify="title" readonly
							autocomplete="off" value="" class="layui-input form-control">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电费  </label>		
					<div class="layui-input-block">
						<input id="fselecost"type="text" name="fselecost" lay-verify="title" readonly
							autocomplete="off" value="" class="layui-input form-control">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">废水池最大允许存放量(m3)</label>
					<div class="layui-input-block">
						<input id="clmaxstore" type="text" name="clmaxstore" lay-verify="title" readonly
							autocomplete="off" value="" class="layui-input form-control">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">液位(m)</label>
					<div class="layui-input-block">
						<input id="clposition" type="text" name="clposition" lay-verify="title" readonly
							autocomplete="off" value="" class="layui-input form-control">
					</div>
				</div>	
		</form>
	</div>
	<div class="pull-right"style="position:absolute;bottom:0;right:60px">
			<button style="margin-right: 5px;" type="button" class="btn btn-primary" onclick="updateUserInfo()">
				<span class="glyphicon glyphicon-ok dri-icon-r-md" aria-hidden="true"></span>修改
			</button>
			<button type="button" class="btn btn-default" onclick="closeDialog()">
				<span class="glyphicon glyphicon-remove dri-icon-r-md" aria-hidden="true"></span>取消
			</button>
	</div>