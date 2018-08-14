	var map;
	var _mapId;//地图div  的id
	var tempFeatures=new Array();//临时点对象集合
	var _clearFun=null;
	var moveFea=null;
	var moveFlag=false;
	var v_tempmapfeas;
	var xl_tempmapfeas = new Array();//线路专业_定位数据集合
	var dispalyflag=0;//地图显示精度补充显示方式0原图;1图片;2矢量;
	
	var xlxsflag=0;//线路按钮三种显示状态：0 全部显示 1 精简显示（不保留历史） 2 精简显示（保留历史）
//	var pro_code = "";//专业
	var lj_tempFeatures = new Array();//量距
	var traceArr=new Array();
	var backFlag=false;
	var breakMouse = false;//定义鼠标指针是否为接头打断状态
//	var xlSelect_tempmapfeas = null;//线路精简模式——>选择 临时数据
	var loc_geo = null;//存量——>线路定位
	//定位或选中
	var locSelect = null;
	var mul_point = new Array();//批建吊线段
	
	var batchclick=0;
	var batchSelRect;
	var batchArea=false;//是否开启勾选
	var ex1;
	var ey1;
	var createFlag=false;
	
	var inoutocableFlag=false;//进出光缆段选取标记
	//百度地图样式
	var mapJson = [ {
		"featureType" : "road",
		"elementType" : "all",
		"stylers" : {
			"lightness" : 20
		}
	}, {
		"featureType" : "highway",
		"elementType" : "geometry",
		"stylers" : {
			"color" : "#f49935",
		}
	}, {
		"featureType" : "railway",
		"elementType" : "all",
		"stylers" : { 
			"visibility" : "off"
		}
	},  {
        "featureType": "subway",
        "elementType": "all",
        "stylers": {
                  "visibility": "off"
        }
	}, {
		"featureType" : "local",
		"elementType" : "labels",
		"stylers" : {
			"visibility" : "off"
		}
	}, {
		"featureType" : "water",
		"elementType" : "all",
		"stylers" : {
			"color" : "#d1e5ff"
		}
	}, {
		"featureType" : "poi",
		"elementType" : "all",
		"stylers" : {
			"visibility" : "off"
		}
	} ];
	
	var mapJson2 = [ {
		"featureType" : "road",
		"elementType" : "all",
		"stylers" : {
			"lightness" : 20
		}
	}, {
		"featureType" : "highway",
		"elementType" : "geometry",
		"stylers" : {
			"color" : "#f49935",
			"visibility": "off"
		}
	}, {
		"featureType" : "railway",
		"elementType" : "all",
		"stylers" : { 
			"visibility" : "off"
		}
	},  {
        "featureType": "subway",
        "elementType": "all",
        "stylers": {
                  "visibility": "off"
        }
	}, {
		"featureType" : "local",
		"elementType" : "labels",
		"stylers" : {
			"visibility" : "off"
		}
	}, {
		"featureType" : "water",
		"elementType" : "all",
		"stylers" : {
			"color" : "#d1e5ff"
		}
	}, {
		"featureType" : "poi",
		"elementType" : "all",
		"stylers" : {
			"visibility" : "off"
		}
	} ];
	
	/**添加点对象
	 * 参数 ：地图
	 *      经度
	 *      纬度
	 *      图例的路径
	 *      图例宽度
	 *      图例高度
	 *      标注名称  传空字符串时 不添加标注
	 *      
	 *      return  marker
	 * */
	function addPoint(lon,lat,iconStr,iconWidth,iconHeight,name) {
		var point= new BMap.Point(lon,lat);
		var icon=new BMap.Icon(iconStr, new BMap.Size(iconWidth,iconHeight));
		var marker = new BMap.Marker(point, {
			icon : icon
		});
		map.addOverlay(marker);
		if(name == null||name==""){
			name = '';
		}
		if(name.length>0){
			var labelLen=getLabelOffset(name);
			//标注水平偏移量 
			var offsetX=(labelLen-marker.getIcon().size.width)/-2;
		    //标注垂直偏移量
		    var offsetY=marker.getIcon().size.height;
			var label = new BMap.Label(name,{offset:new BMap.Size(offsetX,offsetY)});
			label.setStyle({ color : "black", fontSize : "10px",width:labelLen+"px",display:"inline-block",overflow:"hidden",border:"0px",backgroundColor :"0.05", });
			marker.setLabel(label);
		}else{
			addEvent(marker,"mouseover",onMouseOver);
			addEvent(marker,"mouseout",onMouseOut);
			
		}
		return marker;
	}
	/**鼠标移入显示标注名称*/
	function onMouseOver(e){
		var marker= e.target;
		var value = marker.value;
		var name = value.name;
		
		var labelLen=getLabelOffset(name);
		//标注水平偏移量 
		var offsetX=15;
	    //标注垂直偏移量
	    var offsetY=0;
		var label = new BMap.Label(name,{offset:new BMap.Size(offsetX,offsetY)});
		label.setStyle({ color : "black", fontSize : "12px",width:labelLen+30+"px",display:"inline-block",overflow:"hidden",border:"0px",backgroundColor :"0.5", });
		marker.setLabel(label);
	}
	
	/**鼠标移入显示标注名称*/
	function onMouseOut(e){
		var marker= e.target;
		var value = marker.value;
		var name = value.name;
		
		map.removeOverlay(marker.getLabel());
	}
	
	function getLineColor(ordervalue){
		var lineColor="";
		switch (ordervalue) {
			case 9:
				lineColor="#cf8b20";
				break;
			case 10:
				lineColor="#b4babd";
				break;	
			case 11:
				lineColor="#ff00ff";
				break;
			case 13:
				lineColor="#411fd6";
				break;
			default:
				lineColor="red";
				break;
		}
		return lineColor;
	}
	/**
	 * 添加线对象
	 * 参数：地图
	 *     线的节点经纬度数组   lon,lat
	 * 	   线颜色
	 *     线粗细
	 *     线透明度
	 *     
	 *     return line
	 * 	*/
	function addLine(points,lineColor,lineWidth,lineOpacity) {
		if (points == null || points.length <= 1) {
			return null;
		}
		var tempPoints = new Array();
		for(var i=0;i<points.length;i++){
			var point = new BMap.Point(points[i].split(',')[0],points[i].split(',')[1]);
			tempPoints.push(point);
		}
		var line=new BMap.Polyline(tempPoints, {
			strokeColor : lineColor,//#93DB70
			strokeWeight : lineWidth,
			strokeOpacity : lineOpacity
		});
//		if(xlxsflag == 0){
//			map.addOverlay(line);
//		}
		map.addOverlay(line);
		return line;
	}
	/**
	 * 添加矩形
	 * 参数：起点经度
	 *     起点纬度
	 *     终点经度
	 *     终点纬度
	 *     
	 *     return rectangle*/
	function addRect(px,py,qx,qy,borderColor,fillColor,borderWidth,opacity){
		var rectangle = new BMap.Polygon([new BMap.Point(px,py),
          new BMap.Point(qx,py),
          new BMap.Point(qx,qy),
          new BMap.Point(px,qy)], 
          {strokeColor:borderColor,fillColor:fillColor, strokeWeight:borderWidth, strokeOpacity:opacity}
		);
		return rectangle;
	}
	/**
	 * 添加弧线对象
	 * 参数：地图
	 *     线的节点经纬度数组   lon,lat
	 * 	   线颜色
	 *     线粗细
	 *     线透明度
	 *     return curve
	 * 	*/
	function addCurveLine(points,lineColor,lineWidth,lineOpacity){
		if (points == null || points.length <= 1) {
			return;
		}
		var tempPoints=new Array();
		for(var i=0;i<points.length;i++){
			var point = new BMap.Point(points[i].split(',')[0],points[i].split(',')[1]);
			tempPoints.push(point);
		}
		var curve = new BMapLib.CurveLine(tempPoints, {strokeColor:lineColor, strokeWeight:lineWidth, strokeOpacity:lineOpacity}); //创建弧线对象
		map.addOverlay(curve); //添加到地图中
		return curve;
	}
	
	
	/**计算标注的长度 每个汉字长度为11  每个应为字符长度为6*/
	function getLabelOffset(name){
		var re=/[\u4E00-\u9FA5]/g; 
		var totalLen=name.length;
		var chineseLen=0;
		if(name.match(re)!=null){
			chineseLen=name.match(re).length;
		} 
		var englishLen=name.length-chineseLen;
		return (chineseLen*11+englishLen*6);
	}
	/**移除地图对象*/
	function removeFeature(feature){
		map.removeOverlay(feature);
	}
	/**
	 * 根据gid 获得 地图对象*/
	function getFeatureByGid(gid){
		var features=map.getOverlays();
		for(var i=0;i<features.length;i++){
			if(typeof(features[i].value)!="undefined"){
				if(gid==features[i].value.gid){
					return features[i];
					break;
				}
			}
		}
		return null;
	}
	
	/**
	 * 根据一组gid 获得 一组地图对象*/
	function getFeaturesByGids(gids){
		var features=map.getOverlays();
		var reArr=new Array();
		for(var i=0;i<features.length;i++){
			if(typeof(features[i].value)!="undefined"){
				if(gids.indexOf(features[i].value.gid)>-1){
					reArr.push(features[i]);
				}
			}
		}
		return reArr;
	}
	/**
	 * 改变点对象图例*/
	function setMarkIcon(marker){
		var icon=new BMap.Icon(iconStr, new BMap.Size(16,16));
		marker.setIcon(icon) ;
	}
	/**
	 * 加载地图
	 * 参数：经度
	 *     纬度
	 *     级别
	 *     地图div  id*/
	function loadMap(lon,lat,lvl,divId){
		_mapId=divId;
//		map = new BMap.Map(divId,{enableMapClick:false,minZoom:6,maxZoom:18}); // 创建Map实例
		map = new BMap.Map(divId,{enableMapClick:false}); // 创建Map实例
		map.centerAndZoom(new BMap.Point(lon,lat), lvl);
//	  	map.setMapStyle({
//			styleJson : mapJson
//		});
		map.disableInertialDragging(); 
		map.enableScrollWheelZoom(); //启用滚轮放大
		map.setDefaultCursor("auto");   //设置鼠标指针
	}
	
	/**
	 * 加载地图
	 * 参数：经度
	 *     纬度
	 *     级别
	 *     地图div  id*/
	function loadMapByCity(cityName,lvl,divId){
		_mapId=divId;
		map = new BMap.Map(divId,{enableMapClick:false}); // 创建Map实例
		map.centerAndZoom(cityName,lvl);
//	  	map.setMapStyle({
//			styleJson : mapJson
//		});  
		map.disableInertialDragging(); 
		map.enableScrollWheelZoom(); //启用滚轮放大
		map.setDefaultCursor("auto");   //设置鼠标指针
	}
	
	/**是否在右下角显示经纬度
	 * 参数：div的id*/
	function showLonlat(){
		var lonlatDiv=$("<div></div>");
		lonlatDiv.addClass("lonLat");
		lonlatDiv.insertAfter($("#"+_mapId));
		addEvent(map,"mousemove",mouseMoveHandler);
	}
	function mouseMoveHandler(e){
		var lvl=map.getZoom()
		var lon=e.point.lng;
		var lat=e.point.lat;
		$(".lonLat").html(lvl+"级 "+lon+";"+lat);
//		$(".lonLat").html(map.getZoom());
	}
	/**
	 * 是否在地图左上角显示地图类型切换控件*/
	function setMapTypeCtrl(){
		//加载地图类型切换控件
		var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],anchor: BMAP_ANCHOR_TOP_LEFT});
		map.addControl(mapType1);           //添加地图类型控件
		
		var top_left_navigation = new BMap.NavigationControl(
				{anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});  //左
		map.addControl(top_left_navigation);         
	}
	//初始化地图基础工具栏
	function showBasicTool(){	
		var toolDiv=$("<div id='basicTool'></div>");
		toolDiv.addClass("floatWindow");
		toolDiv.insertAfter($("#"+_mapId));
		addBasicMenu();
		addPicDiv();
		addXLDiv();
		var clear=$("<a href='#' onclick='clearOperation()' title='清除所有操作' ></a>");
		clear.linkbutton({
		    iconCls: 'icon-clearBtn',
		    plain:true
		});
		clear.appendTo(toolDiv);
		
		
//		var lj=$("<a href='#' onclick='lj()'  title='量距' ></a>");
//		lj.linkbutton({
//		    iconCls: 'icon-ljBtn',
//		    plain:true
//		});
//		lj.appendTo(toolDiv);
		
//		var location=$("<a href='#' onclick='locationByGeo()'  title='坐标定位' ></a>");
//		location.linkbutton({
//		    iconCls: 'icon-locationBtn',
//		    plain:true
//		});
//		location.appendTo(toolDiv);
		
		var pic=$("<a href='#' onclick='pic()'  title='显示方式' ></a>");
		pic.linkbutton({
		    iconCls: 'icon-switchBtn',
		    plain:true
		});
		pic.appendTo(toolDiv);
//		var dc=$("<a href='#' onclick='addBoundary()' title='导出图片'></a>");
//		dc.linkbutton({
//		    iconCls: 'icon-dcBtn',
//		    plain:true
//		});
//		dc.appendTo(toolDiv);
//		var dc=$("<a href='#' onclick='savePoint()' title='保存当前位置'></a>");
//		dc.linkbutton({
//		    iconCls: 'icon-saveBtn',
//		    plain:true
//		});
//		dc.appendTo(toolDiv);
//		var lj=$("<a href='#' onclick='getMapResources()'  title='资源种类' ></a>");
//		lj.linkbutton({
//		    iconCls: 'icon-zyzlBtn',
//		    plain:true
//		});
//		lj.appendTo(toolDiv);

		
		var plxz=$("<a href='#' onclick='showBasicMenu()'  title='基础工具菜单' ></a>");
		plxz.linkbutton({
		    iconCls: 'icon-zyzlBtn',
		    plain:true
		});
		plxz.appendTo(toolDiv);		
		var xl=$("<a href='#' name='xlxs' onclick='getXLResources()'  title='线路显示类型' ></a>");
		xl.linkbutton({
			iconCls: 'icon-xlxsBtn',
			plain:true
		});
		xl.appendTo(toolDiv);
		$.parser.parse('#basicTool');
		$(".icon-xlxsBtn").css({background:"url('/nrms/images/toolbar/xlxs"+xlxsflag+".png') no-repeat center center"});
		$("a[name='xlxs']").linkbutton('disable');
		//点击地图 弹出的菜单要收回
		addEvent(map,"click",slideUpAll);
		//刷新地图 弹出的菜单要收回
		addEvent(map,"tilesloaded",slideUpAll);
	}
	/**保存当前位置*/
	function savePoint(){
		var lng=map.getCenter().lng;
		var lat=map.getCenter().lat;
		var zoom=map.getZoom();
		$.ajax({
			type : "POST",
			dataType:"JSON",
			async : true,
			url : contextPath+"/user/updatePositon.action",
			data :{"lng":lng,"lat":lat,"level":zoom
			} ,
			success : function(data) {
				if(data.success){
					//alert("保存成功!");
					messagerAlert("提示", "保存成功！");
				}
			},
			error:function(){
			//	alert("保存失败!");
				messagerAlert("提示", "保存失败!");
			}
		});
	}
	/** 导出图片 **/
	function addBoundary(){
		if($("#"+_mapId)){
			$("#"+_mapId).printArea();
		};
	}
	/**获取地图资源**/
	function getMapResources(){
		$("<div id='modelLogList' ><div id = 'modelLogGrid' ></div></div>").dialog({
			title : "地图资源图例",
			width : 400,
			height : 500,
			modal : true,
			buttons : [ {
				text : "关闭",
				handler : function() {
					$("#modelLogList").dialog("destroy");
				}
			} ],
			onClose : function(){
				$("#modelLogList").dialog("destroy");
			},
			onOpen : function(){
				$('#modelLogGrid').datagrid({
					 url :  contextPath+"/map/getMapResources.action",
					 fit: true,
			         fitColumns: true,
			         rownumbers: true,
			         singleSelect: true,
				     columns:[[    
				        {field:'LEGENDID',hidden:true,title:'图例ID',width:100,align:'center'},
				        {field:'LAYERNAME',title:'图层名称',width:100,align:'center'},
				        {field:'LEGENDNAME',title:'图例名称',width:100,align:'center'},
				        {field:'mapicon',title:'图例样式',width:100,align:'center',
				        	formatter: function(value,row,index){
					        	    var link="<img src=" +iconPath+row.LEGENDID+".png" + ">" 
					        		return link;
							}},
				     ]],
						onLoadSuccess:function(d){
							mergeGridColCells($("#modelLogGrid"),'LAYERNAME');
						}
				});
			},
		});

		
	}
/**合并单元格**/
    function mergeGridColCells(grid,rowFildName)  
    {  
           var rows=grid.datagrid('getRows' );  
           var startIndex=0;  
           var endIndex=0;  
           if(rows.length< 1)  
          {  
                 return;  
          }  
          $.each(rows, function(i,row){
                 if(row[rowFildName]==rows[startIndex][rowFildName])  
                {  
                      endIndex=i;  
                }  
                 else  
                {  
                      grid.datagrid( 'mergeCells',{  
                            index: startIndex,  
                            field: rowFildName,  
                            rowspan: endIndex -startIndex+1  
                      });  
                      startIndex=i;  
                      endIndex=i;  
                }  
          });  
     grid.datagrid( 'mergeCells',{  
                      index: startIndex,  
                      field: rowFildName,  
                      rowspan: endIndex -startIndex+1  
          });  
    }  
	
	/**设置地图中心点*/
	function setCenter(lon,lat){
		var point=new BMap.Point(lon,lat);
		map.setCenter(point); 
	}
	
	/**
	 * 设置地图级别*/
	function setLvl(lvl){
		map.setZoom(lvl);
	}
	/**
	 * 设置 清除地图操作按钮的事件*/
	function setClearFunc(func){
		_clearFun=func;
	};
	/**
	 * 在屏幕内显示
	 * 参数：点击的经纬度坐标字符串  lon1,lat1;lon2,lat2;......*/
	function showInScreen(geos,legend){
		var geoArr=geos.split(";");
		var points=new Array();
//		for(var i=0;i<geoArr.length;i++){
//			var geo=geoArr[i].split(",");
//			var point=new BMap.Point(geo[0], geo[1]);
//			points.push(point);
//		}
		var geo=geoArr[0].split(",");
		var point=new BMap.Point(geo[0], geo[1]);
		//points.push(point);
		if(xlxsflag == 0){
			if(legend=="0"){
				feature=addLine(geoArr,"red",10,1);
				var data=new Object();
				data.type="HIGHLINE";
				data.geo=geos;
				feature.vlaue=data;
				feature.disableMassClear() ;
				twinkleLine(feature,"LINE");
			}else{
				feature=addPoint(geoArr[0].split(",")[0],geoArr[0].split(",")[1],iconPath+legend+".png",16,16,"");
				var data=new Object();
				data.type="HIGHPOINT";
				data.geo=geos;
				feature.vlaue=data;
				feature.disableMassClear();
				twinkleLine(feature,"POINT");
			}
		}
		map.panTo(point);
	}
	/**高亮闪烁*/
	function twinkleLine(feature,type){
		setTimeout(function(){
			map.removeOverlay(feature);
		},3000);
		if(type=="POINT"){
			feature.setAnimation(BMAP_ANIMATION_BOUNCE);
		}
	}
	
	/**添加监听*/
	function addEvent(object,eventStr,eventFunc){
		object.addEventListener(eventStr, eventFunc);
	}
	/**取消监听*/
	function cancelEvent(object,eventStr,eventFunc){
		object.removeEventListener(eventStr, eventFunc);
	}
	function addPicDiv(){
		var str="<ul>";
		str+="<li style='background-color:#FFFFFF;'><span > 图片</span>" +
				"<input type='hidden'  name='flag' value='1'></li>" +	 	
	 	"<li style='background-color:#FFFFFF;'><span > 矢量</span>" +
	 	"<input type='hidden'  name='flag' value='2'></li>"+
		"<li style='background-color:#FFFFFF;'><span > 原图</span>" +
		"<input type='hidden'  name='flag' value='0'></li>" +
		"</ul>";
		var div = document.createElement("div");
		div.id = "picDiv";
		div.className="slideMenu";
		div.style="display:none;";
		div.innerHTML = str;
//		document.body.appendChild(div);
		$('#basicTool').append(div);
		//jquery 版本
		//$("#picDiv").html("你要填入的html代码");
		  var oldColorValue;
			 $("#picDiv>ul>li").hover(function(){
				 
				 oldColorValue= $(this).css('background-color');
				 $(this).css("background-color","#E0ECFF");
				 $(this).css({cursor:"pointer"});
			  },function(){
				  $(this).css("background-color",oldColorValue);
			  });
		

		
		
		 $("#picDiv>ul>li").click(function(){
			 $("#picDiv").slideUp("speed");
			 var flag=$(this).find("input[name='flag']").val();
			 dispalyflag=flag;
			 getMapData(mapRefresh);
		 });
	}
	
	
	/**
	 * 地图17级后精度补充显示方式
	 */
	function pic(){
		$(".slideMenu:not(#picDiv)").slideUp("speed");
		$("#picDiv").slideDown("speed");
	}
	function addXLDiv(){
		var str="<ul>" +
					"<li style='background-color:#FFFFFF;'><span> 全部显示</span>" +
					"<input type='hidden'  name='flag' value='0'></li>" +	 	
				 	"<li style='background-color:#FFFFFF;'><span ><a href='#' title='不保留历史'> 精简显示（当前）</a></span>" +
				 	"<input type='hidden'  name='flag' value='1'></li>"+
				"</ul>";
		var div = document.createElement("div");
		div.id = "xlxsDiv";
		div.className = "slideMenu";
		div.style="display:none;";
		div.innerHTML = str;
		$('#basicTool').append(div);
		$("#xlxsDiv>ul>li").click(function(){
			 $("#xlxsDiv").slideUp("speed");
			 xlxsflag = $(this).find("input[name='flag']").val();
			 getMapData(mapRefresh,"#xlxsDiv");
			 if(xlxsflag == 1){
				 map.clearOverlays();
				 $('#resList_dg').datagrid('loadData',{total:0,rows:[]});
			 }
			 xl_tempmapfeas = [];
			 xl_tempmapfeas.length = 0;
			 $('#myRes_layout').layout('collapse','east');
		 });
	}
	/**线路显示*/
	function getXLResources(){
		dispalyflag = 0;
		$(".slideMenu:not(#xlxsDiv)").slideUp("speed");
		$("#xlxsDiv").slideDown("speed");
	}
		/**
	 * 加载基础菜单
	 */
	function addBasicMenu(){
		var str="<ul>";
		str+="<li style='background-color:#FFFFFF;' onclick='lj()'><span>量距</span></li>" +	 	
	 	"<li title='输入经纬度定位坐标' class='easyui-tooltip' data-options='deltaX:-10,deltaY:-10' style='background-color:#FFFFFF;' onclick='locationByGeo()'><span > 坐标定位</span></li>"+
		"<li style='background-color:#FFFFFF;' onclick='addBoundary()'><span > 导出图片</span></li>" +
		"<li style='background-color:#FFFFFF;' onclick='getMapResources()'><span > 图例说明</span></li>" +
		"<li title='保存当前地图位置，下次自动定位到此位置' class='easyui-tooltip' data-options='deltaX:-10,deltaY:-10' style='background-color:#FFFFFF;' onclick='savePoint()'><span > 保存位置</span></li>" +
		"<li title='选取此按钮后，在地图上点选待查看进出光缆段的资源' class='easyui-tooltip' data-options='deltaX:-10,deltaY:-10' style='background-color:#FFFFFF;' onclick='showInoutOcableDia()'><span > 进出光缆段</span></li>" +
		"<li title='地图上框选一定区域，查看此区域内的所有地图资源' class='easyui-tooltip' data-options='deltaX:-10,deltaY:-10' style='background-color:#FFFFFF;' onclick='getMapBatchSelect()'><span > 批量选取</span></li>" +
		"<li title='返回上一地图位置' class='easyui-tooltip' data-options='deltaX:-10,deltaY:-10' style='background-color:#FFFFFF;' onclick='goBack()'><span > 上一视图</span></li>" +
		"</ul>";
		var div = document.createElement("div");
		div.id = "basicMenu";
		div.className="slideMenu";
		div.style="display:none;";
		div.innerHTML = str;
//		document.body.appendChild(div);
		$('#basicTool').append(div);
		var oldColorValue;
		$("#basicMenu>ul>li").hover(function(){
			oldColorValue= $(this).css('background-color');
			$(this).css("background-color","#E0ECFF");
			$(this).css({cursor:"pointer"});
		 },function(){
			 $(this).css("background-color",oldColorValue);
		 });
		 $("#basicMenu>ul>li").click(function(){
			 $("#basicMenu").slideUp("speed");
		 });
	}
	
	function showBasicMenu(){
		$(".slideMenu:not(#basicMenu)").slideUp("speed");
		$("#basicMenu").slideDown("speed");
	}
	/**清除操作按钮事件*/
	function clearOperation(){
		clearOper();
		//线路精简——还原选中数据
		if(window.top.currProfession == 'XL' && (xlxsflag == 1)){
			if(xl_tempmapfeas.length>0 && xlSelect_tempmapfeas != null){
				for(var i=0;i<xl_tempmapfeas.length;i++){
					if(xl_tempmapfeas[i].value != undefined){
						if(xl_tempmapfeas[i].value.type == "LINE"){
							if(xl_tempmapfeas[i].value.flag){
								map.removeOverlay(xl_tempmapfeas[i]);
								xl_tempmapfeas[i].setStrokeWeight(3);
								xl_tempmapfeas[i].setStrokeColor(xlSelect_tempmapfeas);
								xl_tempmapfeas[i].value.flag = false;
								map.addOverlay(xl_tempmapfeas[i]);
							}
						}else if(xl_tempmapfeas[i].value.type == "POINT"){
							if(xl_tempmapfeas[i].value.flag){
								map.removeOverlay(xl_tempmapfeas[i]);
								xl_tempmapfeas[i].setIcon(xlSelect_tempmapfeas);
								xl_tempmapfeas[i].value.flag = false;
								map.addOverlay(xl_tempmapfeas[i]);
							}
						}
					}
				}
			}
			xlSelect_tempmapfeas = null;
		}
		if(locSelect!=null){
			map.removeOverlay(locSelect);
			locSelect=null;
		}
		//清除批量选中状态--wz
		if(batchArea){
			batchArea=false;
			cancelEvent(map,"click",mapClick4AreaSelect);
			cancelEvent(map,"mousemove",mouseMove2);
		}
		revertLines();
		pointRevert();
	}
	function clearOper(){
		//收起所有下拉菜单
		slideUpAll();
		if(distance!=null){//如果地图在正在量具   则关闭量具 
			distance.close();
		}
		//清除临时数据
		if(tempFeatures.length>0){
			for(var i=0;i<tempFeatures.length;i++){
				map.removeOverlay(tempFeatures[i]);
			}
			tempFeatures = [];
		}
		if(moveFlag){
			moveFlag=false;
			moveFea=null;
		}
		if(null!=_clearFun){
			_clearFun();
		}
		//清除量距临时数据
		if(lj_tempFeatures.length>0){
			for(var i=0;i<lj_tempFeatures.length;i++){
				map.removeOverlay(lj_tempFeatures[i]);
			}
			lj_tempFeatures = [];
			lj_tempFeatures.length = 0;
		}
		
		inoutocableFlag=false;
		map.setDefaultCursor("auto"); 
	}
	/**量距事件*/
	var distance=null;//量距
	function lj(){
		clearOper();
		if(featureClickFlag){
			featureClickFlag = false;
		}
		distance = new BMapLib.DistanceTool(map);
		distance.open();  //开启鼠标测距
	}
	/**
	 * 地图加载后情况原地图上的资源
	 * @param overLays
	 */
	function removeOldOverLay(){
		if(typeof(v_tempmapfeas)=="undefined" ||v_tempmapfeas==null){
			return;
		}
		for(var i=0;i<v_tempmapfeas.length;i++){
			if(v_tempmapfeas[i].value.type != "MAINLINE"){
				map.removeOverlay(v_tempmapfeas[i]);
			}
		}
		v_tempmapfeas=null;
	}
	
	/**
	 * 地址解析
	 */
	var geoc = new BMap.Geocoder(); 
	function addrParse(pt){
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
		});
	}	
	
	//改变搜索框前下拉框下拉内容
	function changeResList(){
		$("#res_list").combobox("clear");
		$('#res_list').combobox({
            url: contextPath + '/map/getResType.action',
		    valueField:'CLASSCODE',    
		    textField:'CLASSNAME',
		    editable:true,
			onLoadSuccess: function (data) {
	            if (data) {
	                $('#res_list').combobox('setValue',data[0].CLASSCODE);
	            }
	           
	        },
		});
	}
	
	/**
	 * 添加行政区划  
	 */ 
	function addCityBoundary(city) {
		$.ajax({
			type : "POST",
			dataType : "JSON",
			async : false,
			url : contextPath + "/map/addAreaBoundary.action",
			data : {"city":city,
			},
			success : function(data) {
				var points = new Array();
				var points2 = new Array();
				for (var i=0;i<data.length ;i++){
					var geo = data[i].GEO;
					var count = data[i].GROUPVAL;
					var point = geo.trim();
					if(count == 0){
						points.push(point);
					}
					if(count == 1){
						points2.push(point);
					}	
				}
				var zuobiao = points.join(";");
				var ply = new BMap.Polygon(zuobiao, {
					strokeWeight : 2,
					strokeColor : "#ff0000",
					fillOpacity: 0.0000000001,
				}); //建立多边形覆盖物
				map.addOverlay(ply); //添加覆盖物
				ply.disableMassClear();
				var zuobiao2 = points2.join(";");
				var ply2 = new BMap.Polygon(zuobiao2, {
					strokeWeight : 2,
					strokeColor : "#ff0000",
					fillOpacity: 0.0000000001,
				}); //建立多边形覆盖物
				map.addOverlay(ply2); //添加覆盖物
				ply2.disableMassClear();
			}
			
		});
	}


	function saveBoundaryInfo() {
		var bdary = new BMap.Boundary();
		bdary.get("沧州市孟村回族自治县", function(rs) { //获取行政区域
			var count = rs.boundaries.length; //行政区域的点有多少个  String city,String zuobiao,String citycode,String areacode,int count
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return;
			}
			for ( var i = 0; i < count; i++) {
				alert();
				var boundary = rs.boundaries[i];
				alert(boundary);
					$.ajax({
						type : "POST",
						dataType : "JSON",
						async : false,
						url : contextPath + "/map/saveBoundaryInfo.action",
						data : {"city":"孟村回族自治县",
							"zuobiao" : boundary,
							"count" : i,
							"citycode": 1309,
							"areacode" : 130930
						},
					});
		 		}
		});
		}
	
	function showCity(){
		var cityArr = [130703,130702,130734];
		for (var i=0;i<cityArr.length;i++){
			addCityBoundary(cityArr[i]);
		}
	}
	function beginMove(gid){
		var marker=getFeatureByGid(gid);
		moveFea=marker;
//		marker.enableDragging();
//		marker.addEventListener('dragend',move);
		moveFlag=true;
		//map.setDefaultCursor("url('"+contextPath+"/images/cur/move.cur'),auto");
		map.setDefaultCursor("move");
	}
	
	//地图上点的移动
	function move(e){
		var marker=moveFea;
		var lng=e.point.lng;//移动后的点的经纬度
		var lat=e.point.lat;
		var newGeo = lng + "," + lat;
		var oldGeo=marker.value.geo;
		var obj=new Object();
		var legend = marker.value.legend;
		obj.GID=marker.value.gid;
		obj.NEWGEO=newGeo;
		obj.OLDGEO=oldGeo;
		pointMove(obj);
	}
	
	function pointMove(obj){
		if(locSelect!=null){
			map.removeOverlay(locSelect);
			locSelect = null;
		}
		$.ajax({
			type : "POST",
	    	dataType :"JSON",
	    	async : false,
	    	url : contextPath + "/map/move.action",
			data: {
				data: JSON.stringify(obj),
			},
			success : function(data) {
				if(data.success=="true"){
					moveFlag=false;
					moveFea.removeEventListener('dragend',move);
					moveFea=null;
					getMapData_local();
					map.setDefaultCursor("auto");   //设置鼠标指针
				}
				else{
					messagerAlert(data.message);
//					var lon=data.GEO.split(",")[0];
//					var lat=data.GEO.split(",")[1];
//					var point= new BMap.Point(lon,lat);
//					moveFea.setPoint(point);
					getMapData_local();
				}
			},error:function(){
				messagerAlert("移动出错");
			}
		});
	}
	
	
	function setEquInStation(satSid,staGeo,sid,oldGeo){
		$.ajax({
			type : "POST",
	    	dataType :"JSON",
	    	async : false,
	    	url : contextPath + "/map/setEquInStation.action",
			data: {
				"satSid" :satSid,
				"staGeo" :staGeo,
				"sid":sid,
				"oldGeo":oldGeo
			},
			success : function(data) {	
				if(data.success=="true"){
					moveFlag=false;
					moveFea.removeEventListener('dragend',move);
					moveFea=null;
					getMapData_local();
					map.setDefaultCursor("auto");
				}
				else{
					messagerAlert(data.message);
					getMapData_local();
				}
			}
		});
	}
	
	
	function showType(){		
		var showTypeDiv=$("<div></div>");
		showTypeDiv.addClass("showType");
		showTypeDiv.insertAfter($("#"+_mapId));
		switchDT(dispalyflag);
	}
	function switchDT( dispalyflag){
		
		if(dispalyflag==1){
			$(".showType").html("显示图片");
			//map.centerAndZoom(new BMap.Point(114.610972,37.052628), 19);
		}else if(dispalyflag==2){
			$(".showType").html("显示矢量");
			//map.centerAndZoom(new BMap.Point(114.69532160,37.96836096), 19);
		}else{
			$(".showType").html("显示原图");
		}
		
	}
	function getMapData(succfun,str){
		saveTrace();
		 $(str).slideUp("speed");
//		 map.clearOverlays() ;
		 v_tempmapfeas=map.getOverlays();
		 if(xlxsflag == 1){
			 if (null != succfun) {
				 succfun.call(this);
			 }
		 }
		 switchDT(dispalyflag);
		if(dispalyflag==1){
			getMapImg(succfun);
			setGroudOverlayDiv();
		}else if(dispalyflag==2){
			getMapShi(succfun);
		}else{
			if (null != succfun) {
				succfun.call(this);
				
			}
		}
	}
	//var groundOverlay;
	//var m=Math.pow(10,8);
	groundOverlayOptions = {
			opacity: 1,
			displayOnMinLevel: 17,
			displayOnMaxLevel: 19
		}
	function setGroudOverlayDiv()
	{
		var divs=document.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++)
		{
			if(divs[i].style.zIndex==500)
				divs[i].style.zIndex=10;
			
		}
	}
	//根据显示范围获得地图图片
	function getMapImg(succfun){
		//var m=Math.pow(10, 8); 
		//根据地图可视经纬度为区域查询
		var bs = map.getBounds(); //获取可视区域
		var bssw = bs.getSouthWest(); //可视区域左下角
		var bsne = bs.getNorthEast(); //可视区域右上角
		var maxLng=bsne.lng;//最大经度bssw
		var minLng=bssw.lng;//最小经度bsne
		var maxLat=bsne.lat;//最大纬度
		var minLat=bssw.lat;//最大纬度		
		if(map.getZoom()<17){
			if (null != succfun) {				
				succfun.call(this);
			}
			return;
		}
		var data=new Object();
		data.MAXLNG= accMul(maxLng,Math.pow(10,8));
		data.MINLNG=accMul(minLng ,Math.pow(10,8));
		data.MAXLAT=accMul(maxLat ,Math.pow(10,8));
		data.MINLAT= accMul(minLat,Math.pow(10,8));
		data.LVL=map.getZoom();	
		data.EXAMPLEID=exampleInfo.EXAMPLEID;	
		$.ajax({
			type : "POST",
			dataType:"text",
			async : false,
			//ByArea
			url : contextPath+"/mp/getMapImage.action",
			data :{
				data:JSON.stringify(data)
				
			} ,
			success : function(data) {			
				if(data!=''){
					$.each(eval(data), function(index, c) {
						//显示地图图片					
						//alert(c.ID);
						
						var llng=accDiv(c.L_LNG,Math.pow(10, 8));
						var rlng=accDiv(c.R_LNG,Math.pow(10, 8));
						var blat=accDiv(c.B_LAT,Math.pow(10, 8));
						var tlat=accDiv(c.T_LAT,Math.pow(10, 8));
						
						var lng=accAdd(accDiv(accSub(rlng,llng),2),llng);					
						var lat=accAdd(accDiv(accSub(tlat,blat),2),blat);
						
						var NE = new BMap.Point(llng,blat);
						var SW = new BMap.Point(rlng,tlat);					
										 
						var groundOverlay= new BMap.GroundOverlay(new BMap.Bounds(NE, SW), groundOverlayOptions);
						groundOverlay.setImageURL('\\image\\'+c.CITY_CODE+'\\'+c.ID+".jpg");
						groundOverlay.ID=c.ID;													
						map.addOverlay(groundOverlay);
						
					});
				}
			}
		});
		
		
		if (null != succfun) {
			succfun.call(this);
		}
	}
	//根据显示范围获得地图图片
	function getMapShi(succfun){		
		//根据地图可视经纬度为区域查询
		var bs = map.getBounds(); //获取可视区域
		var bssw = bs.getSouthWest(); //可视区域左下角
		var bsne = bs.getNorthEast(); //可视区域右上角
		var maxLng=bsne.lng;//最大经度bssw
		var minLng=bssw.lng;//最小经度bsne
		var maxLat=bsne.lat;//最大纬度
		var minLat=bssw.lat;//最大纬度		
		if(map.getZoom()<17){
			if (null != succfun) {				
				succfun.call(this);
			}
			return;
		}
		var data=new Object();
		data.MAXLNG= accMul(maxLng,Math.pow(10,8));
		data.MINLNG=accMul(minLng ,Math.pow(10,8));
		data.MAXLAT=accMul(maxLat ,Math.pow(10,8));
		data.MINLAT= accMul(minLat,Math.pow(10,8));
		data.LVL=map.getZoom();	
		data.EXAMPLEID=exampleInfo.EXAMPLEID;	
		$.ajax({
			type : "POST",
			dataType:"text",
			async : false,
			//ByArea
			url : contextPath+"/mp/getMapShi.action",
			data :{
				data:JSON.stringify(data)
				
			} ,
			success : function(data) {		
				
				if(data!=''){
					$.each(eval(data), function(index, c) {						
						//显示地图矢量					
						var pointArrdata=[];
						var geo=c.GEO;
						var pointArr=geo.split(";");
						for(var i=0;i<pointArr.length;i++){
							var point=pointArr[i].split(",");						
							pointArrdata.push(new BMap.Point(point[0],point[1]));					
							
						}
						
						var polygon = new BMap.Polygon(pointArrdata,{strokeColor:"#696969", strokeWeight:2, strokeOpacity:1,fillOpacity:0.5});
						polygon.ID=c.ID;
						
						map.addOverlay(polygon);
					});
				}
			}
		});
		if (null != succfun) {
			succfun.call(this);
		}
	}
	
	//两个浮点数求和
	function accAdd(num1,num2){
	var r1,r2,m;
	try{
	    r1 = num1.toString().split('.')[1].length;
	}catch(e){
	    r1 = 0;
	}
	try{
	    r2=num2.toString().split(".")[1].length;
	}catch(e){
	    r2=0;
	}
	m=Math.pow(10,Math.max(r1,r2));
	// return (num1*m+num2*m)/m;
	return Math.round(num1*m+num2*m)/m;
	}

	//两个浮点数相减
	function accSub(num1,num2){
	var r1,r2,m;
	try{
	    r1 = num1.toString().split('.')[1].length;
	}catch(e){
	    r1 = 0;
	}
	try{
	    r2=num2.toString().split(".")[1].length;
	}catch(e){
	    r2=0;
	}
	m=Math.pow(10,Math.max(r1,r2));
	n=(r1>=r2)?r1:r2;
	return (Math.round(num1*m-num2*m)/m).toFixed(n);
	}
	//两数相除
	function accDiv(num1,num2){
	var t1,t2,r1,r2;
	try{
	    t1 = num1.toString().split('.')[1].length;
	}catch(e){
	    t1 = 0;
	}
	try{
	    t2=num2.toString().split(".")[1].length;
	}catch(e){
	    t2=0;
	}
	r1=Number(num1.toString().replace(".",""));
	r2=Number(num2.toString().replace(".",""));
	return (r1/r2)*Math.pow(10,t2-t1);
	}

	function accMul(num1,num2){
	var m=0,s1=num1.toString(),s2=num2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){};
	try{m+=s2.split(".")[1].length}catch(e){};
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	}
	
	function getDistence(p1,p2){
		var point1= new BMap.Point(p1.split(",")[0],p1.split(",")[1]);
		var point2= new BMap.Point(p2.split(",")[0],p2.split(",")[1]);
		var dis=map.getDistance(point1,point2);
		return dis
	}
	function getDistenceByArr(geoArr){
		var dis=0;
		for(var i=1;i<geoArr.length;i++){
			var tempDis=getDistence(geoArr[i-1],geoArr[i]);
			dis=dis+tempDis;
		}
		return dis.toFixed(2);;
	}
	
	function addTempFeatures(){
		//如果刷新地图时，地图上有临时数据，则需要 重新添加上。
		if(tempFeatures.length>0 ){
			for(var i=0;i<tempFeatures.length;i++){
				map.addOverlay(tempFeatures[i]);
				if(tempFeatures[i].value!=null && tempFeatures[i].value!="undefined"){
					if(tempFeatures[i].value.type=="FINISH"){
						//标注水平偏移量 
						var offsetX=15;
					    //标注垂直偏移量
					    var offsetY=0;
						var label = new BMap.Label(tempFeatures[i].value.name,{offset:new BMap.Size(offsetX,offsetY)});
						label.setStyle({ color : "#fc051c", fontSize : "12px" ,fontWeight:"bold",width:"15px",display:"inline-block",overflow:"hidden",border:"0px",backgroundColor :"1", });
						tempFeatures[i].setLabel(label);
					}
				}
			}
		}
		if(lj_tempFeatures.length>0){
			for(var i=0;i<lj_tempFeatures.length;i++){
				map.addOverlay(lj_tempFeatures[i]);
			}
		}
	}
	function removeXLtemps(){
		if(xl_tempmapfeas.length>0){
			for(var i=0; i<xl_tempmapfeas.length;i++){
				map.removeOverlay(xl_tempmapfeas[i]);
			}
		}
	}
	//添加线路专业临时数据
	function addXLtemps(){
		if(xl_tempmapfeas.length>0){
			var xl_temp_flag = new Array();
			for(var i=0; i<xl_tempmapfeas.length;i++){
				if(xl_tempmapfeas[i].value != undefined && (!xl_tempmapfeas[i].value.flag)){
					map.addOverlay(xl_tempmapfeas[i]);
				}else{
					xl_temp_flag.push(xl_tempmapfeas[i]);
				}
			}
			for(var i=0;i<xl_temp_flag.length;i++){
				map.addOverlay(xl_temp_flag[i]);
			}
		}
	}
		/*
	 * 鼠标批量框选事件
	 */
	function getMapBatchSelect(){
		batchclick=0;
		if(!batchArea){
			batchArea=true;
			addEvent(map,"click",mapClick4AreaSelect);
		}else{
		    batchArea=false;
		    cancelEvent(map,"click",mapClick4AreaSelect);
		    cancelEvent(map,"mousemove",mouseMove2);
		}
	}
	
	function mapClick4AreaSelect(e){
		batchclick++;
		//如果是在地图上批量选择资源的话
		if(batchArea){
			if(batchclick==1){//起点
				ex1=e.clientX;
				ey1=e.clientY;
				pStart=e.point;
				addEvent(map,"mousemove",mouseMove2);
				
			}else if(batchclick==2){//终点 
				pEnd=e.point;
				cancelEvent(map,"mousemove",mouseMove2);
			    map.setDefaultCursor("auto");
			    clearOper();
			    batchclick=0;
			    showAreaList(e,pStart,pEnd,lvlids,"MAINT");
			}	
		}
	}
	
	//鼠标在地图上移动事件
	function mouseMove2(e){
		map.removeOverlay(batchSelRect);
		pEnd=e.point;
		batchSelRect=addRect(pStart.lng,pStart.lat,pEnd.lng,pEnd.lat,"#f6f4c6","#f5f299",2,0.5);
		map.addOverlay(batchSelRect);
		batchSelRect.disableMassClear();//防止map.clearOverlays()清除掉
		tempFeatures.push(batchSelRect);
	}
	function slideUpAll(){
		$(".slideMenu").slideUp("speed");
	}
	
	/**
	 * 保存轨迹 数组
	 */
	function saveTrace(){
		if(!backFlag){
			var obj = new Object();
			obj.lvl = map.getZoom();
			obj.center =  map.getCenter();
			//从原数组中未找到
			if (traceArr.length ==10) {// 满了
				// 移除第0个 将最新的放在数组最后
				traceArr.splice(0, 1);
			}
			traceArr.push(obj);
		}else{
			backFlag=false;
		}
	}
	
	function goBack(){
		backFlag=true;
		if(traceArr.length>1){
			var point= new BMap.Point(traceArr[traceArr.length-2].center.lng,
					traceArr[traceArr.length-2].center.lat);
			map.centerAndZoom(point,traceArr[traceArr.length-2].lvl);
			traceArr.splice(traceArr.length-1, 1);
		}else{
			backFlag=false;
			messagerShow("提示", "轨迹步骤已走完！");
		}
	}
	function setXLData(legend,sid,exampleId){
		$.ajax({
			type : "POST",
			dataType:"JSON",
			async : true,
			url : contextPath+"/map/getXLReslist.action",
			data :{
				legend : legend,
				csid : sid,
				exampleId : exampleId
			} ,
			success : function(data) {
				$('#resList_dg').datagrid({
					data:data,
					columns: [[
						{ field: 'CLASSNAME', title: '类型', align:'center',width: 100 },
						{ field: 'SNAME', title: '名称', align:'center',width: 200},
						{ field: 'SID', title: 'ID', align:'center',width: 200,hidden:true}
					]],
					onDblClickRow : function(index,row){
						selSid = row.SID;
						loaction(selSid);
					},
					onLoadSuccess: function(data){
						if(selSid!=""){
							setSelect(selSid);
						}
					}
				});
			}
		});
		$('#myRes_tabs').tabs({    
		    border:false,    
		    onSelect:function(title){
		    	if(window.top.currProfession == 'XL'){
		    		showXLResTree();
		    	}else{
		    		showResTree();
		    	}
		    }    
		});	
	}