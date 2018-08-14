$(document).ready(function() {
	initData();
	switchTab();
	initSwitchCheck();
});
//页面初始化
function initData(){
//	$.ajax({
//		url:contextPath+"",
//		type:"post",
//		dataType:"json",
//		async:false,
//		success:function(data){
			var data = {
				year:{
					type:"every",
					value:""
				},
				month:{
					type:"appoint",
					value:"2,9"
				},
				day:{
					type:"appoint",
					value:"2,5,7,15,20,21,22,25"
				}
			};
//			初始化年月日的勾选
			initTabCheck(data.year,"year");
			initTabCheck(data.month,"month");
			initTabCheck(data.day,"day");
			
//		},
//		error:function(error){
//			
//		}
//	});
	layui.use('laydate', function(){
		layui.laydate.render({
			elem: '#riliWrap #yearRange', //指定元素
			type: 'year',
			range: true,
			change: function(value, date){ //监听日期被切换
				$(".runtime-year").html(val);
			  }
		});
	});
	$(".yearTab").addClass("activeTab");
	
	$(".closeDateBtn").click(function(){
		$(".dateWrap").css("display","none")
	})
}
function initTabCheck(data,ele){
	if(data.type == "every"){
		$("#every"+ele).addClass(ele+"Act");
		$("#every"+ele).prop("checked",true);
		if(ele == "year"){
			$(".runtime-"+ele).html("每年");
		}else if(ele == "month"){
			$(".runtime-"+ele).html("每月");
		}else if(ele == "day"){
			$(".runtime-"+ele).html("每日");
		}
		return;
	}else if(data.type == "week"){
		$("#week").addClass(ele+"Act");
		$("#week").prop("checked",true);
		$(".runtime-"+ele).html("指定周"+data.value);
		appointValue("week",data);
		return;
	}else if(data.type == "appoint"){
		appointValue("week",data);
		$("#"+ele).addClass(ele+"Act");
		$("#"+ele).prop("checked",true);
		if(ele == "year"){
			$(".runtime-"+ele).html(data.value+"年");
			appointValue("year",data);
		}else if(ele == "month"){
			$(".runtime-"+ele).html(data.value+"月");
			appointValue("month",data);
		}else if(ele == "day"){
			$(".runtime-"+ele).html(data.value+"日");
			appointValue("day",data);
		}
		return;
	}
}
function initRuntime(){
	var year = data.year;
	var month = data.month;
	var day = data.day;
}
function appointValue(type,data){
	var valArr = data.value.split(",");
	if(type == "year"){
		$(".yearTab .years-year input").val(data.value);
	}else{
		var className = "";
		if(type == "week"){
			className = ".dayTab .weeks-day span:nth-of-type(";
		}else if(type == "month"){
			className = ".monthTab .months-month span:nth-of-type(";
		}else if(type == "day"){
			className = ".dayTab .days-day span:nth-of-type(";
		}
		for(var i = 0; i < valArr.length; i++){
			$(className+valArr[i]+")").addClass("selected")
		}
	}
}

//按钮卡切换
function switchTab(){
	$("#btns .btn").each(function(){
		$(this).click(function(){
//			切换按钮
			$("#btns .activeBtn").addClass("btn-default");
			$("#btns .activeBtn").removeClass("btn-primary");
			$("#btns .activeBtn").removeClass("activeBtn");
			$(this).addClass("btn-primary activeBtn");
//			切换dataTab
			$(".activeTab").css("display","none");
			$(".activeTab").removeClass("activeTab");
			var tabName = $(this).attr("dateType");
			$("."+tabName).addClass("activeTab");
			$("."+tabName).css("display","block");
		})
	})
}
//初始化年月日的选项
function initSwitchCheck(){
	switchCheck("year","yearAct");
	switchCheck("month","monthAct");
	switchCheck("day","dayAct");
}
//初始化年月日的选项的方法
function switchCheck(className,actName){
	$("."+className).each(function(){
		$(this).click(function(){
			$("."+actName).click();
			$("."+actName).removeClass(actName);
			$(this).addClass(actName);
		})
	})
}
function yearSwitch(){
	if(!$("#year").prop("checked")){
		$("#year").click();
	}
	$(".runtime-year").html($("#yearRange").val())
}
function changeYear(val){
	//$(".runtime-year").html(val)
}