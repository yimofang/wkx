/**
 * 自定义扩展插件
 */

$(document).ready(function() {
	jQuery.myPlugin = {
		//自定义插件命名空间
		//右下角弹出式页面
		prompt: function prompt(option) {
			//判断是否是返回值的通用格式
			if(option.success != undefined && option.msg != undefined){
				if(option.success){
					option.tipType = "success";
				}else{
					option.tipType = "error";
				}
				option.context = option.msg;
				option.title = "提示";
			}
			//默认数据
			var defaultOpt = {
				title: "提示", //弹窗标题
				context: "", //弹窗内容
				tipType: "success", //弹窗的类型  success成功（绿色），error失败（红色），notice警告（橘黄色）
				width: "300px", //弹窗的宽度
				height: "200px", //弹窗的高度
				time: 2000, //多少秒后自动关闭
				shade:0
			}
			//映射数据
			$.extend(defaultOpt, option);
			var that = this;
			layui.use('layer', function() {
				var $ = layui.jquery,
					layer = layui.layer;
				layer.open({
					type: 1, //必填项，0信息框（默认），1页面层，2iframe层  
					title: defaultOpt.title,
					content: defaultOpt.context, //内容
					area: [defaultOpt.width, defaultOpt.height], //常态下的 [宽，高]
					shade: defaultOpt.shade, //是否要有蒙层
					offset: 'rb',
					closeBtn: 1,
					anim: 2, //0平滑放大。默认，1从上掉落，2从最底部往上滑入，3从左滑入，4从左翻滚，5渐显，6抖动
					time: defaultOpt.time, //多少秒后自动关闭
					success: function(layero) {
						//根据tipType设定标题颜色
						if(defaultOpt.tipType == "success") {
							layero.find(".layui-layer-title").css({
								"background-color": "darkseagreen",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "error") {
							layero.find(".layui-layer-title").css({
								"background-color": "#FF6347",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "notice") {
							layero.find(".layui-layer-title").css({
								"background-color": "goldenrod",
							})
						}
					}
				})
			})
		},
		//判断式对话框方法二
		judgementDialog: function judgementDialog(option) {
			//默认数据
			var defaultOpt = {
				title: "提示", //弹窗标题
				context: "", //弹窗内容
				tipType: "success", //弹窗的类型  success成功（绿色），error失败（红色），notice警告（橘黄色）
				width: "390px", //弹窗的宽度
				height: "300px", //弹窗的高度
				btns: ["确定", "取消"],
				shade:0,
				btnFn: {
					btn1Fn: function(){}, //如果想要点击后关闭的效果必须是这个格式:function(index,layero){//第一个按钮的方法layer.close(index)}
					btn2Fn: function(){},
				}
			}
			//映射数据
			$.extend(defaultOpt, option);
			var that = this;
			layui.use('layer', function() {
				var $ = layui.jquery,
					layer = layui.layer;
				layer.open({
					type: 1, //必填项，0信息框（默认），1页面层，2iframe层  
					title: defaultOpt.title,
					content: defaultOpt.context, //内容
					area: [defaultOpt.width, defaultOpt.height], //常态下的 [宽，高]
					shade: defaultOpt.shade, //是否要有蒙层
					offset: '200px',
					closeBtn: 1,
					btn: defaultOpt.btns,
					yes: defaultOpt.btnFn.btn1Fn,
					btn2: defaultOpt.btnFn.btn2Fn,
					success: function(layero) {
						//根据tipType设定标题颜色
						if(defaultOpt.tipType == "success") {
							layero.find(".layui-layer-title").css({
								"background-color": "darkseagreen",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "error") {
							layero.find(".layui-layer-title").css({
								"background-color": "#FF6347",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "notice") {
							layero.find(".layui-layer-title").css({
								"background-color": "goldenrod",
							})
						}
						//适配高度
						layero.find('.layui-layer-content').each(function(){
							var layerHeight = parseInt(defaultOpt.height) - 100 + "px";
							$(this).css("height", layerHeight);
						})
					}
				})
			})
		},

		//自定义可调节大小的对话框
		modelDialog: function(option) {
			//默认数据
			var defaultOpt = {
				title: "提示", //弹窗标题
				context: "../page/index.jsp", //弹窗内容指定文件的路径或指定文件的指定部分'文件路径 #id'
				tipType: "success", //弹窗的类型  success成功（绿色），error失败（红色），notice警告（橘黄色）
				width: "390px", //弹窗的宽度
				height: "300px", //弹窗的高度
				resize: true, //是否允许拉伸
				offset:'200px',
//				btns: [], //弹窗的按钮组
//				btnFn: { //按钮组的方法们
//					btn1Fn: function() {},
//					btn2Fn: function() {},
//					btn3Fn: function() {},
//					btn4Fn: function() {},
//				}, //默认最多五个按钮
				data:"",
				cancel:function(index, layero){},
				full: function(index){},
				restore: function(index){},
				successAdd:function(layero,index){}
			};
			//映射数据
			$.extend(defaultOpt, option);
			var that = this;
			//多窗口模式，层叠置顶
			layui.use('layer', function() {
				var $ = layui.jquery,
					layer = layui.layer;
				layer.open({
					type: 1, //必填项，0信息框（默认），1页面层，2iframe层  
					title: defaultOpt.title,
					area: [defaultOpt.width, defaultOpt.height], //常态下的 [宽，高]
					shade: 0.5, //是否要有蒙层
					shadeClose: false, //是否点击遮罩层关闭
					maxmin: true, //是否启用最大化最小化
					resize: defaultOpt.resize, //是否允许拉伸
					time: 0, //自动关闭所需毫秒
					offset:defaultOpt.offset, //相对于屏幕顶部200px,左右居中
					//						[Math.random() * ($(window).height() - 300), Math.random() * ($(window).width() - 390)],
					content: defaultOpt.context, //内容
					closeBtn: 1, //关闭按钮的样式，0无关闭按钮，1在框内的关闭按钮，2右上角的关闭按钮
//					btn: defaultOpt.btns, //按钮组
//					yes: defaultOpt.btnFn.btn1Fn,
//					btn2: defaultOpt.btnFn.btn2Fn,
//					btn3: defaultOpt.btnFn.btn3Fn,
//					btn4: defaultOpt.btnFn.btn4Fn,
//					btn5: defaultOpt.btnFn.btn5Fn,
					cancel:defaultOpt.cancel,
					full:defaultOpt.full,
					restore:defaultOpt.restore,
					success: function(layero, index) {

						//内容
						layero.find(".layui-layer-content").load(defaultOpt.context,defaultOpt.data);
						//根据tipType设定标题颜色
						if(defaultOpt.tipType == "success") {
							layero.find(".layui-layer-title").css({
								"background-color": "darkseagreen",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "error") {
							layero.find(".layui-layer-title").css({
								"background-color": "#FF6347",
								"color": "white"
							})
						} else if(defaultOpt.tipType == "notice") {
							layero.find(".layui-layer-title").css({
								"background-color": "goldenrod",
							})
						}
						layero.find('.layui-layer-min').click(function() {
							$('.layui-layer-shade').css("opacity", "0");

						})
						layero.find('.layui-layer-max').click(function() {
							$('.layui-layer-shade').css("opacity", "0.5");

						})
						//去除按钮组
						//layero.find('.layui-layer-btn').css("display","none");
						//适配高度
						layero.find('.layui-layer-content').each(function(){
							var layerHeight = parseInt(defaultOpt.height) -50 + "px";
							$(this).css("height", layerHeight);
						})
						defaultOpt.successAdd(layero,index);
					}
				});
			});

		},
		tipDialog: function(option) {

		},
		//柱状图
		chartBar: function(option) {
			//默认数据
			var defaultOpt = {
				barId: '', //DOM的id
				title: '柱状图', //标题
				legendColor: ['#34bfed', '#287df1', '#40d6bf', '#f9eb55'], //图例颜色
				toolTipTrigger: 'axis', //鼠标悬停时信息提示类型
				toolAxisPointerType: 'shadow', //坐标指示器类型，可选为：'line' | 'cross' | 'shadow' | 'none'(无)
				toolAxisPointerShadowStyleColor: 'rgba(50,50,50,0.05)', //鼠标悬停时的背景颜色
				legendTop: -5, //图例的位置
				legendItemGap: 15, //各个图例之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
				legendItemHeight: 14, //图例高
				legendItemWidth: 20, //图例宽
				legendData: [], //图例名字
				gridShow: false, //内绘网格是否显示
				gridLeft: '3%', //柱状图距离左侧距离
				gridRight: '4%', //柱状图距离右侧距离
				gridTop: '10%', //柱状图距离顶部距离
				gridBottom: '5%', //柱状图距离底部距离
				gridContainLabel: true,
				gridBorderWidth: 1, //边框线
				yAxisType: 'value', //纵轴默认为数值型'value'	值类型'category' | 'value' | 'time' | 'log'
				yAxisBoundaryGap: [0, 0.5], //间隔单位
				yAxisSplitLineShow: true, //纵轴分割线是否显示
				yAxisSplitLineLineStylecolor: '#eee', //纵轴分割线颜色
				xAxisType: 'category', //横轴分割线类型
				xAxisData: ['建投能源公司', '新天公司', '建投交通公司', '建投水务公司', '建投城镇化公司'], //横坐标的名字
				xAxisSplitLineShow: true, //分割线是否显示
				xAxisSplitLineLineStylecolor: '#eee', //分割线颜色
				series: []

			};
			//映射数据
			$.extend(defaultOpt, option);
			var driChartBar = echarts.init(document.getElementById(defaultOpt.barId));

			driChartBar.setOption({
				title: {
					text: defaultOpt.title
				},
				color: defaultOpt.legendColor,
				tooltip: { //鼠标悬浮交互时的信息提示
					trigger: defaultOpt.toolTipTrigger,
					axisPointer: {
						type: defaultOpt.toolAxisPointerType,
						shadowStyle: {
							color: defaultOpt.toolAxisPointerShadowStyleColor
						}
					}
				},
				legend: {
					top: defaultOpt.legendTop,
					itemGap: defaultOpt.legendItemGap,
					itemHeight: defaultOpt.legendItemHeight,
					itemWidth: defaultOpt.legendItemWidth,
					data: defaultOpt.legendData
				},
				grid: {
					show: defaultOpt.gridShow,
					left: defaultOpt.gridLeft, //柱状图距离左侧距离
					right: defaultOpt.gridRight, //柱状图距离右侧距离
					top: defaultOpt.gridTop, //柱状图距离顶部距离
					bottom: defaultOpt.gridBottom, //柱状图距离底部距离
					containLabel: defaultOpt.gridContainLabel,
					borderWidth: defaultOpt.gridBorderWidth //边框线
				},
				/*axisPointer:{
					show:true,
				},*/
				yAxis: {
					type: defaultOpt.yAxisType,
					boundaryGap: defaultOpt.yAxisBoundaryGap,
					splitLine: {
						show: defaultOpt.yAxisSplitLineShow,
						lineStyle: {
							color: defaultOpt.yAxisSplitLineLineStylecolor,
							//type:'dashed'

						}
					},
				},
				xAxis: {
					type: defaultOpt.xAxisType,
					data: defaultOpt.xAxisData,
					splitLine: {
						show: defaultOpt.xAxisSplitLineShow,
						lineStyle: {
							color: defaultOpt.xAxisSplitLineLineStylecolor,
							//type:'dashed'
						}
					},
				},
				series: defaultOpt.series
			});
			$(window).resize(driChartBar.resize);
		},
		//		环形图
		chartPie: function(option) {
			//默认数据
			var defaultOpt = {
				pieId: '', //DOM的id
				title: '环形图', //标题
				tooltip_trigger: 'item', //鼠标悬停时信息提示类型
				tool_formatter: "{a} <br/>{b}: {c} ({d}%)", //a（系列名称），b（数据项名称），c（数值）, d（饼图：百分比 | 雷达图：指标名称）
				legend_orient: 'vertical',
				legendX: 'right',
				legend_padding: [8, 10], //图例边距
				legend_itemHeight: 12, //图例高
				legend_itemWidth: 12, //图例宽
				legend_itemGap: 12, //图例间隔
				legend_align: 'left', //图例文本对齐方式
				legend_data: [],
				series_name: '环形图名字',
				series_type: 'pie',
				series_color: ['red', '#fcbd4e', '#4dd078'],
				series_hoverAnimation: true, //是否启用放大效果
				series_radius: ['52%', '78%'], //图形内半径&外半径
				series_center: ['40%', '50%'], //圆心左边
				series_avoidLabelOverlap: false,
				series_markPoint_symbol: 'circle',
				series_label_normal_show: false,
				series_label_normal_position: 'center',
				series_label_emphasis_show: 'true',
				series_label_emphasis_textStyle_fontSize: '15',
				series_label_emphasis_textStyle_fontWeight: 'bold',
				series_label_emphasis_textStyle_color: '#999',
				series_labelLine_normal_show: false,
				series_itemStyle_normal_borderColor: '#fff',
				series_itemStyle_normal_borderWidth: 2,
				series_data: []
			};
			//映射数据
			$.extend(defaultOpt, option);
			var driChartPie = echarts.init(document.getElementById(defaultOpt.pieId));
			driChartPie.setOption({
				title: {
					text: defaultOpt.title
				},
				tooltip: {
					trigger: defaultOpt.tooltip_trigger,
					formatter: defaultOpt.tool_formatter
				},
				legend: {
					orient: defaultOpt.legend_orient,
					x: defaultOpt.legendX,
					padding: defaultOpt.legend_padding,
					itemHeight: defaultOpt.legend_itemHeight,
					itemWidth: defaultOpt.legend_itemWidth,
					itemGap: defaultOpt.legend_itemGap,
					align: defaultOpt.legend_align,
					data: defaultOpt.legend_data
				},
				series: [{
					name: defaultOpt.series_name,
					type: defaultOpt.series_type,
					color: defaultOpt.series_color,
					hoverAnimation: defaultOpt.series_hoverAnimation,
					radius: defaultOpt.series_radius,
					center: defaultOpt.series_center,
					avoidLabelOverlap: defaultOpt.series_avoidLabelOverlap,
					markPoint: {
						symbol: defaultOpt.series_markPoint_symbol
					},
					label: {
						normal: {
							show: defaultOpt.series_label_normal_show,
							position: defaultOpt.series_label_normal_position
						},
						emphasis: {
							show: defaultOpt.series_label_emphasis_show,
							textStyle: {
								fontSize: defaultOpt.series_label_emphasis_textStyle_fontSize,
								fontWeight: defaultOpt.series_label_emphasis_textStyle_fontWeight,
								color: defaultOpt.series_label_emphasis_textStyle_color
							}
						}
					},
					labelLine: {
						normal: {
							show: defaultOpt.series_label_normal_show
						}
					},
					itemStyle: {
						normal: {
							borderColor: defaultOpt.series_itemStyle_normal_borderColor,
							borderWidth: defaultOpt.series_itemStyle_normal_borderWidth,
						}
					},
					data: defaultOpt.series_data,
				}]
			});

		},
		chartLine: function(option) {
			var defaultOpt = {
				lineId: '', //DOM的id
				title: '折线图', //标题
				tooltip_trigger: 'item', //鼠标悬停时信息提示类型
				legend_data: [],
				grid_left: '3%',
				grid_right: '4%',
				grid_bottom: '3%',
				grid_containLabel: true,
				xAxis_type: 'category',
				xAxis_boundaryGap: false,
				xAxis_data: [],
				yAxis_type: 'value',
				series: []
			}
			$.extend(defaultOpt, option);

			var driChartLine = echarts.init(document.getElementById(defaultOpt.lineId));

			driChartLine.setOption({
				title: {
					text: defaultOpt.title
				},
				tooltip: {
					trigger: defaultOpt.tooltip_trigger
				},
				legend: {
					data: defaultOpt.legend_data
				},
				grid: {
					left: defaultOpt.grid_left,
					right: defaultOpt.grid_right,
					bottom: defaultOpt.grid_bottom,
					containLabel: defaultOpt.grid_containLabel
				},
				toolbox: {
					feature: {
						saveAsImage: {
							show: false,
						}
					}
				},
				xAxis: {
					type: defaultOpt.xAxis_type,
					boundaryGap: defaultOpt.xAxis_boundaryGap,
					data: defaultOpt.xAxis_data
				},
				yAxis: {
					type: defaultOpt.yAxis_type
				},
				series: defaultOpt.series
			});
			//			$(window).resize(chartLine.resize);
		},
		newDownTree: function(option){
			var defaultOpt = {
				treeId:"",							//下拉树要放置的div的Id
				inpId:"",							//input的id
				tagWrapId:"",						//弹出层的最外层
				href:"",							//地址
				text:"",							//显示类型
				result:"",							//返回参数
				id:"",								//查询参数
				data:{},							//数据
				showCheckbox: false,        		//是否显示复选框
				highlightSelected: true,			//是否高亮选中
				multiSelect: false,					//是否可以同时选择多个节点
				nodeSelected:nodeSelected,		//节点被选择
			};
			//被选中
			function nodeSelected(event,node){
				$(defaultOpt.treeId).treeview('selectNode', [ node.nodeId, { silent: true } ]);
				$(defaultOpt.inpId).val(node.text);
				$(defaultOpt.treeId).hide();
			}
			$.extend(defaultOpt, option);
			if($(defaultOpt.treeId).html() == ""){
				$(defaultOpt.treeId).treeview({
					data:defaultOpt.data,
					href:defaultOpt.href,
					text:defaultOpt.text,
					id:defaultOpt.id,
					result:defaultOpt.result,
					showCheckbox: defaultOpt.showCheckbox,        		
					highlightSelected: defaultOpt.highlightSelected,			
					multiSelect: defaultOpt.multiSelect,				
					onNodeExpanded:defaultOpt.nodeExpanded,      
					onNodeSelected:defaultOpt.nodeSelected
				})
			}
			$(defaultOpt.treeId).click(function(e){
				e.stopPropagation();
				e.preventDefault();
			});
			$(defaultOpt.tagWrapId).click(function(e){
				$(defaultOpt.treeId).hide();
			});
			
			
			$(defaultOpt.treeId).show();
		},
		checkDownTree:function(option){
			var defaultOpt = {
					treeId:"",							//下拉树要放置的div的Id
					inpId:"",							//input的id
					hiddenInpId:"",						//隐藏的input的id
					href:"",							//地址
					text:"",							//显示类型
					result:"",							//返回参数
					id:"",								//查询参数
					data:{},							//数据
					showCheckbox: false,        		//是否显示复选框
					highlightSelected: true,			//是否高亮选中
					multiSelect: false,					//是否可以同时选择多个节点
				};
			$.extend(defaultOpt, option);
			if($(defaultOpt.treeId).html() == ""){
				$(defaultOpt.treeId).treeview({
					data:defaultOpt.data,
					href:defaultOpt.href,
					text:defaultOpt.text,
					id:defaultOpt.id,
					result:defaultOpt.result,
					showCheckbox: defaultOpt.showCheckbox,        		
					highlightSelected: defaultOpt.highlightSelected,			
					multiSelect: defaultOpt.multiSelect,				
					onNodeChecked:nodeChecked,
					onNodeUnchecked:nodeUnchecked,
				})
			}
			function nodeChecked(event,node){
				$(defaultOpt.treeId).treeview('checkNode', [ node.nodeId, { silent: true } ]);
				var val = $(defaultOpt.inpId).val();
				var valId = $(defaultOpt.hiddenInpId).val();
				if($(defaultOpt.inpId).val() == ""){
					val = node.text;
					valId = node.orgId;//node.itemId
				}else if($(defaultOpt.inpId).val().match(node.text)!=null){
					val = val;
					valId = valId;
				}else{
					val = val + "," + node.text;
					valId = valId + "," + node.orgId;//node.itemId
				}
				$(defaultOpt.inpId).val(val);
				 $(defaultOpt.hiddenInpId).val(valId)
			}
			function nodeUnchecked(event,node){
				var val = $(defaultOpt.inpId).val();
				var valId = $(defaultOpt.hiddenInpId).val();
				valArr = val.split(",");
				valIdArr = valId.split(",");
				for(var i = 0;i<valArr.length;i++){
					if(valArr[i]==node.text){
						valArr.splice(i,1);
					}
				}
				for(var i = 0;i<valIdArr.length;i++){
					if(valIdArr[i]==node.orgId){//node.itemId
						valIdArr.splice(i,1);
					}
				}
				$(defaultOpt.inpId).val(valArr.toString());
				$(defaultOpt.hiddenInpId).val(valIdArr.toString());
			}
		},
		publicForm: function(domId, formId ,callBack) {//domId是div的id，formId是要放的form的id
			var imgName =""; 
			//初始化表单
			var initForm = function(form){
				//增加表单
				$("#" + domId).append("<form class='form-inline' id='commonForm" + formId+ "'></form>");
				//起始行号
				var row_num = -1;
				//显示项目
				for(var i = 0; i < form.formItemModels.length; i++) {
					var formItem = form.formItemModels[i];
					//是否换行
					if(formItem.line != row_num){
						//开始新的一行
						row_num = formItem.line;
						$("#commonForm"+formId).append('<div id="item'+row_num+'" class="row" style="margin-bottom: 10px;"></div>');
					}
					//获取行内项目
					var colHtml = "";
					if(formItem.ds_type == "IMAGE"){
						imgName = formItem.columnname;
						colHtml += ' <input type="hidden" name="'+imgName+'" id="'+imgName+'"/>'
						+'<div class="form-group row col-lg-12"><label for="image" class="col-lg-2" style="text-align: right;padding-top: 8px;padding-right:30px">图片</label>'
						+'<div class="layui-upload col-sm-10"> <button type="button" class="layui-btn" id="upload_btn">上传图片</button></div> </div>'
						+'<div class="form-group row col-lg-12"> <div class="col-lg-2"></div>'
						+'<div id="upload_list" class="col-lg-10" style="text-align:center;min-height:100px;border:1px solid gray;border-radius:5px;padding:10px;">'
						+'<div class="upload-list-bg"><i class="layui-icon" style="font-size:60px;color:#009e91">&#xe67c;</i> <p style="color:grey">点击上传图片按钮进行图片上传</p></div></div> </div>';
					}else{
						colHtml += getFormItem(formItem);
					}
					$("#commonForm"+formId + " #item" + row_num).append(colHtml);
					//处理额外载入数据
					if(formItem.ds_type == "OTHERPAGE"){
						$("#commonForm"+formId + " #other_" + formItem.columnname).load(formItem.ds_type_exec,
							{"form_id":formId,"columnname":formItem.columnname});
					}
				}
				initPic();
			}
			//获取表单项
			var getFormItem = function(formItem){
				var html = '<div class="form-group row col-lg-' + formItem.col + '">';
				//增加前缀
				if(formItem.prefix != null){
					html += getLabel(formItem.col,formItem.prefix);
				}
				//增加控件
				if(formItem.ds_type == "SELECT"){
					//选择
					html += getSelect(formItem.columnname,formItem.dicts);
				}else if(formItem.ds_type == "HIDDEN"){
					//隐藏控件
					html += getHidden(formItem.columnname);
				}else if(formItem.ds_type == "RADIO"){
					//RADIO
					html += getRadio(formItem.columnname,formItem.dicts);
				}else if(formItem.ds_type == "TEXT"){
					//输入框
					html += getText(formItem.columnname,formItem.prefix,formItem.rules);
				}else if(formItem.ds_type == "OTHERPAGE"){
					//输入框
					html += '<div id="other_'+formItem.columnname+'" class="col-lg-10" ></div>';
				}else if(formItem.ds_type == "CHECKBOX"){
					//多选框
					html += getCheckBox(formItem.columnname,formItem.dicts);
				}
//				else if(formItem.ds_type == "IMAGE"){
//					html += getImage(formItem.columname,formItem.prefix,formItem.rules);
//				}
				//增加后缀
				if(formItem.suffix != null){
					html += getLabel(formItem.col,formItem.suffix);
				}
				html += '</div>';
				return html;
			}
			//标识
			var getLabel = function(name,text){
				return '<label for="' + name + '" class="col-lg-2" style="text-align: right;padding-top: 8px;padding-right:30px">' + text + '</label>';
			}
			//获取select控件
			var getSelect = function(name,dicts){
				var html = '<div class="col-lg-10" >';
				html += '<select name="' + name + '" id="' + name + '" class="form-control" style="width:100%">';
				//循环option
				for(var i = 0; i < dicts.length; i++) {
					html += '<option value="' + dicts[i].id + '">' + dicts[i].key + '</option>';
				};
				html += "</select></div>";
				return html;
			}
			//获取radio
			var getRadio = function(name,dicts){
				var html = "";
				//循环option
				for(var i = 0; i < dicts.length; i++) {
					html += '<label class="radio-inline">';
					html += '<input type="radio" name="' + name + '" id="' + name;
					html += '" value="' + dicts[i].id + '">' + dicts[i].key + '</label>';
				}
				return html;
			}
			//获取checkbox
			var getCheckBox = function(name,dicts){
				var html = "";
				//循环option
				for(var i = 0; i < dicts.length; i++) {
					html += '<label class="radio-inline">';
					html += '<input type="checkbox" name="' + name + '" id="' + name;
					html += '" value="' + dicts[i].id + '">' + dicts[i].key + '</label>';
				}
				return html;
			}
			//隐藏控件
			var getHidden = function(name){
				return '<input type="hidden" id="'+name+'" name="'+name+'"/>';
			}
			//输入框
			var getText = function(name,text,rules){
				var html = '<div class="col-sm-10">';
				html += '<input class="form-control" style="width:100%;" type="text" name="' + name + '" id="' + name + '" value="" placeholder="请输入' + text + '" ';
				//规则
				if(rules != null){
					for(var r = 0; r < rules.length; r++){
						if(rules[r].type == "number") {
							html += 'onkeyup="$.myMethod.onlyNumber(this.id,this.value)"';
						}else if(rules[r].type == "tel"){
							html += 'onblur="$.myMethod.onlyTel(this.id,this.value)"';
						}else if(rules[r].type == "email"){
							html += 'onblur="$.myMethod.onlyEmail(this.id,this.value)"';
						}else if(rules[r].type == "notnull"){
							html += 'onblur="$.myMethod.notEmpty(this.id,this.value)"';
						}else if(rules[r].type == "maxlength"){
							html += 'maxlength="'+rules.rule+'"';
						}else{
							html += 'onblur="$.myMethod.CustomRegular(this.id,'+rules[r].rule+',this.value)"';
						}
					}
				}
				html += '/></div>';
				return html;
			}
			//图片上传
			var initPic = function(){
				var itemId;
				var isUpLoad = false;
				layui.use('upload', function() {
					var $ = layui.jquery,
						upload = layui.upload;
					//多图片上传
					var uploadInst = upload.render({
						elem: '#upload_btn', //点击选择btn
						url: contextPath + '/system/files/upLoad.do', //上传的地址
						accept: 'file', //允许上传的文件类型
						multiple: true, //是否允许多图上传
						before: function(obj) {
							if(!isUpLoad){
								$(".upload-list-bg").css("display","none")
								isUpLoad = true;
							}
							upLoadFile = obj.pushFile();
							//预读本地文件示例，不支持ie8
							obj.preview(function(index, file, result) {
								
							})	
						},
						done: function(res, index, upload) {
							console.log("res");
							console.log(res);
							var imgItem = '<div class="imgItem" id="" >'
									+'<img src="' + '/' + res.data.data[0].url + '/'+res.data.data[0].filename+'" alt="" class="layui-upload-img upload_img">'
									+'<div class="img_sts_bg"></div>'
									+'<div class="imgDelete">';
							if(res.success){
								imgItem += '<i class="layui-icon img_delete_icon" isHaveUpLoadFile=true hiddenInp="'+imgName+'" isUpload=true index="'+index+'" inpId="'+res.data.data[0].id+'" onclick="$.myPlugin.delete_img(this);">&#xe640;</i>'
									+'</div>'
									+'<i class="layui-icon img_sts_icon" id="img_sts_icon">&#xe605;</i>'
									+'</div>';
								//input hidden追加id
								var imgVal = "";
								if($("#"+ imgName).val()==""){
									imgVal += res.data.data[0].id;
								}else{
									imgVal = $("#"+ imgName).val() + "," + res.data.data[0].id;							
								}
								$("#"+ imgName).val(imgVal);
								//清空队列
								for(key in upLoadFile){
									delete upLoadFile[key];
								}
							}else{
								imgItem += '<i class="layui-icon img_delete_icon" hiddenInp="'+imgName+'" isUpload=false index="'+index+'" inpId="'+res.data.data[0].id+'" onclick="$.myPlugin.delete_img(this);">&#xe640;</i>'
									+'</div>'
									+'<i class="layui-icon img_sts_icon" id="img_sts_icon">&#x1006;</i>'
									+'</div>';
							}
							$("#upload_list").append(imgItem);
						}
					});

				})
			}
			
			
			//请求数据
			$.ajax({
				url: contextPath + "/form/getFormAndItem.do",
				data: {
					"form_id": formId
				},
				type: "post",
				dataType: "json",
				async: false,
				success: function(data) {
					if(data.success){
						initForm(data.data);
					}else{
						$.myPlugin.prompt({title:'错误',context:'表单信息获取失败',tipType: "error",});
					}
				}
			});

		},//---publicForm-end--
		//表单图片删除方法，勿删，勿用
		delete_img:function(th){
			var objIndex = $(th).attr("index");			//当前图片的index
			var isUpload = $(th).attr("isUpload");		//当前图片是否上传成功
			var inpId = $(th).attr("inpId");			//当前图片返回的id
			var hiddenInp = $(th).attr("hiddenInp");	//隐藏的inp的id名
			var isHaveUpLoadFile = $(th).attr("isHaveUpLoadFile");
			//删除队列
			if(isHaveUpLoadFile=="true"){				//从数据库里取到的数据走这里
				console.log("进入队列循环")
				for(key in upLoadFile){
					if(key == objIndex){
						delete upLoadFile[key];
					}
				}
			}
			$(th).parent().parent().remove();
			//删除hidden的input
			if(isUpload=="true"){
				var inpIds = $("#"+ hiddenInp).val();
				$("#"+ hiddenInp).val("");
				var inpIdsArr = inpIds.split(",");
				for(var i=0;i<inpIdsArr.length;i++){
					if(inpIdsArr[i]==inpId){
						inpIdsArr.splice(i,1);
					}
				}
				$("#"+ hiddenInp).val(inpIdsArr.toString());
			}
		},
		layDataTime:function(elem,type){
			layui.use('laydate', function(){
				layui.laydate.render({
					elem: elem, //指定元素
					type: type	//指定类型
				});
			});
		}
	} //大括号
});
