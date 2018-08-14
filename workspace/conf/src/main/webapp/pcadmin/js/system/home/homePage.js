$(document).ready(function() {
	getData();
});
function getData(){
	$.ajax({
		url:contextPath+"/system/homeConfig/getHomeConfigByUserId.do",
		type:"post",
		dataType:"json",
		success:function(data){
			for(var i = 0;i<data.data.length;i++){
				var li = $('<li style="border-radius:0;"></li>');
				li.addClass("panel");
				li.attr("idNum",data.data[i]["id"]);//id
				li.attr("data-col",data.data[i]["configacqcol"]);//x
				li.attr("data-row",data.data[i]["configacqrow"]);//y
				li.attr("data-sizex",data.data[i]["configacqsizex"]);//sizeX
				li.attr("data-sizey",data.data[i]["configacqsizey"]);//sizeY
				li.attr("id",data.data[i]["configcode"]);
				if (data.data[i]["ishiden"] == "0") {
					//li.load(contextPath+"/system/home/homeNotice.jsp");
					li.html($('<div class="panel-body" style="height:100%"></div>').load(contextPath+data.data[i]["homeurl"]));	
				} else if(data.data[i]["ishiden"] == "1"){
					var liHeading = '<div class="panel-heading" style="background-color:#A6E1EC; border:1px solid #A6E1EC; border-radius:0;">'+data.data[i]["configname"]+'</div>';
					var liBody = $('<div class="panel-body" style="height:100%;padding:0px"></div>');
					liBody.load(contextPath+data.data[i]["homeurl"]);
					li.append(liHeading);
					li.append(liBody);
				};
				$(".gridster-wrap").append(li);
			};
			gridster();
		},
		error:function(error){
			
		}
	});
}	
var gridster;
function gridster(){
	var kuai_width = (parseInt($("#gridster-wrap-id").css("width"))-10*5)/4;
	
	gridster = $(".gridster > .gridster-wrap").gridster({
		widget_selector: "li", //确定哪个元素是widget 
		widget_margins: [5, 5], //matgin
		widget_base_dimensions: [kuai_width,200], //一个最小的widget的面积
		min_cols: 1,
		max_cols:4
	}).data('gridster');
	gridster.disable();
	

};