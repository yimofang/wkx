$(function(){
	var a = 0;
	renovate(a);
	/*会议统计三项切换*/
	$(".nav_title").on('click','li',function(){
		$(this).addClass('current').siblings().removeClass('current');
		var index = $(this).index();
		if(index == 0){
			$(".showContent>div:eq(0)").show().siblings().hide();
		}
		if(index == 1){
			$(".showContent>div:eq(1)").show().siblings().hide();
		}
		if(index == 2){
			$(".showContent>div:eq(2)").show().siblings().hide();
		}
	});
});

/*报名签到数据读取*/
function renovate(a){
	$.ajax({
		type:'POST',
		url:Urlstr + 'confs_web/confStatistics.do',
		data:{
			confid:NumAll.confsid,
			type:2,
			token:Token
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){	
				
				if(a == 0){
					$(".staShade").hide();
				}else if(a == 1){
					$(".staShade").show();
				}
				
				$(".haveNum").html(res.row.checked);//已签到
				$(".unNum").html(res.row.nuchecked);//未签到
				$(".allNum").html(res.row.count);//总报名
				$(".nameLook").html(res.row.browsenum);//报名页浏览
				$(".namePercent").html(res.row.apply_rate);//报名转化率
				$(".siPercent").html(res.row.arrive_rate);//签到转化率
			}else{
				alert(res.msg);
			}
		}
	});
}