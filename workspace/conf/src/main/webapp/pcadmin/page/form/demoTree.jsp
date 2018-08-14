﻿<script>
	layui.use('laydate', function(){
	  layui.laydate.render({
	    elem: '#creatFlowTime #create_time', //指定元素
	    type: 'datetime'
	  });
	  layui.laydate.render({
	    elem: '#creatFlowTime #end_create_time', //指定元素
	    type: 'datetime'
	  });
	});
	$("#aatable").bootstrapTable({
		
		striped: true, //是否显示行间隔色  
		pagination: true, //是否显示分页（*）  
		pageList: [10, 15,20], //可供选择的每页的行数（*）  
		showColumns: true, //是否显示所有的列  
		showRefresh: true, //是否显示刷新按钮  
		clickToSelect: true, //是否启用点击选中行  
		detailView:false,//是否显示加号
		height: 650, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  
		
		
        /* dataType: "json",
        toolbar: "#create"+this.flowCode+"Flow",
        method: 'get',
        contentType: "application/x-www-form-urlencoded",
        cache: false, */
        data: [
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        	{"name":"小老板海苔","mideaNum":"1","mideaPercent":"￥9.9","panasonicNum":"1","panasonicPercent":"￥9.9"},
        ],
        columns:[

            [
                {
                    "title": "美食",
                    "halign":"center",
                    "align":"center",
                    "colspan": 5
                }
            ],
            [
                {
                    field: 'name',
                    title: "好吃的分组",
                    valign:"middle",
                    align:"center",
                    colspan: 1,
                    rowspan: 2
                },
                {
                    title: "薯片",
                    valign:"middle",
                    align:"center",
                    colspan: 2,
                    rowspan: 1
                },
                {
                    title: "冰激凌",
                    valign:"middle",
                    align:"center",
                    colspan: 2,
                    rowspan: 1
                }
            ],
            [
                {
                    field: 'mideaNum',
                    title: '数量',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'mideaPercent',
                    title: '价格',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'panasonicNum',
                    title: '数量',
                    valign:"middle",
                    align:"center"
                },
                {
                    field: 'panasonicPercent',
                    title: '价格',
                    valign:"middle",
                    align:"center"
                }
            ]
        ]
    })
</script>
<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
	<!-- 上部分搜索区 -->
	<div class="dri-panel panel-success">
		<div class="panel-heading" onclick="$.myMethod.toggleAfterDiv(this)">搜索区
			<a class="col-md-offset-10"><span class="glyphicon glyphicon-menu-left"></span></a>
		</div>
		<div class="panel-body panel-collapse collapse">
			<!-- 搜索表单 -->
			<form id="formSearch" class="form-horizontal">
				<!-- 多行搜索项 -->
				<div class="form-group">
					<label for="serial_code" class="col-sm-2 control-label">流程编号</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="serial_code" name="serial_code" placeholder="请输入要搜索的编号">
					</div>
				</div>
				<div class="form-group">
					<label for="name" class="col-sm-2 control-label">流程名称</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="name" name="name" placeholder="请输入要搜索的名称">
					</div>
				</div>
				<div class="form-group">
					<label for="sts" class="col-sm-2 control-label">流程状态</label>
					<div class="col-sm-3">
						<select name="sts" id="sts" class="form-control">
							<option value=""></option>
							<option value="0">正常</option>
							<option value="1">完结归档</option>
							<option value="2">挂起</option>
							<option value="-1">失效</option>
						</select>
						
					<!--	<label class="checkbox-inline checkbox-primary">
							  	<input type="checkbox" id="inlineCheckbox1" value="option1">正常
							</label>
						<label class="checkbox-inline">
								<input type="checkbox" id="inlineCheckbox2" value="option2">关闭
							</label>-->
					</div> 

				</div>
				<div class="form-group" id="creatFlowTime">
					<label for="create_time" class="col-sm-2 control-label">流程创建时间</label>
					<div class="col-sm-5">
						<div class="col-sm-5" style="padding-left: 0px;">
							<input type="text" class="form-control" id="create_time" name="create_time">
						</div>
						<label class="col-sm-1 control-label" style="text-align: center;" for="tttt">到</label>
						<div class="col-sm-5" id="tttt">
							<input type="text" class="form-control" id="end_create_time" name="end_create_time">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-2"></div>
					<div class="col-sm-10">
						<a class="btn dribbble-btn dribbble-btn-primary btn-lg " onclick="searchBut()">
							<span class="fa fa-search dri-icon-r-md"></span>搜索</a>
						<!-- 一般按钮 -->
					</div>
					<!-- 带图标按钮 -->

				</div>
				<!--检索end-->
			</form>
		</div>
	</div>
	<!-- 下部分内容区 -->
	<div class="dri-panel panel-info">
		<div class="panel-heading">表单内容</div>
		<div class="panel-body" class="col-lg-12">
			<table id="aatable" style="overflow:hidden">
			</table>
		</div>
	</div>
	