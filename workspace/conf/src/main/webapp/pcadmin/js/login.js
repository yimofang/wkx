//初始化函数
$(document).ready(function() {
	//初始化视图
	initView();
	//获取验证码
	getVerifyCode();

});
//初始化视图
function initView(){
	$('#particles').particleground({
	    dotColor: 'rgba(255,255,255,0.2)',
	    lineColor: 'rgba(255,255,255,0.05)'
	  });
	  $('.intro').css({
	    'margin-top': -($('.intro').height() / 2)
	  });
	  
	  	/*随机弹窗动画*/
	  	var numAnimate = parseInt(Math.random()*(10-0+1)+0);
		if(numAnimate==0){
			$('.loginbox').addClass('rubberBand');
		}else if(numAnimate==1){
			$('.loginbox').addClass('bounceIn');
		}else if(numAnimate==2){
			$('.loginbox').addClass('bounceInDown');
		}else if(numAnimate==3){
			$('.loginbox').addClass('bounceInLeft');
		}else if(numAnimate==4){
			$('.loginbox').addClass('bounceInRight');
		}else if(numAnimate==5){
			$('.loginbox').addClass('fadeInDown');
		}else if(numAnimate==6){
			$('.loginbox').addClass('flipInX');
		}else if(numAnimate==7){
			$('.loginbox').addClass('flipInY');
		}else if(numAnimate==8){
			$('.loginbox').addClass('fadeInUp');
		}else if(numAnimate==9){
			$('.loginbox').addClass('swing');
		}else{
			$('.loginbox').addClass('rollIn');
		}
		/*渐变按钮动画*/
		$('.dri-btn-login').hover(function(){
			$(this).children().eq(1).addClass('dri-btn-gra-ani')
		},function(){
			$(this).children().eq(1).removeClass('dri-btn-gra-ani')
		})
		/*登录框居中*/
		$('.loginbox').css({'left':($('body').width()-($('.loginbox').width()+10))/2})
		$(window).resize(function(){
			$('.loginbox').css({'left':($('body').width()-($('.loginbox').width()+10))/2})
		});
		
		
}
//登录
function onLogin(){
	var logincode = $('#logincode').val();
	var password = $('#passWord').val();
	var verifyCode = $('#reqVerifyCode').val();
	if(logincode == ''){
		$.myPlugin.prompt({tipType:'error',context:'用户名不能为空!'});
		return;
	}else if(password == ''){
		$.myPlugin.prompt({tipType:'error',context:'密码不能为空!'});
		return;
	}else if(verifyCode == ''){
		$.myPlugin.prompt({tipType:'error',context:'验证码不能为空!'});
		return;
	}
	$.ajax({
		type: "POST",
		url: contextPath+"/login/login.do",
		data: {'logincode':logincode,'password':password,'verifyCode':verifyCode},
		success: function(data){
			if(data.success == true){
				//登录成功跳转
				window.location.href=contextPath+"/page/index.jsp";
			}else{
				//登录失败,刷新验证码,重置密码及验证码输入框
				$('#passWord').val("");
				$('#reqVerifyCode').val("");
				getVerifyCode();
				$.myPlugin.prompt({tipType:'error',context:data.msg});
			}
			
		}
	});
}
//获取验证码
function getVerifyCode(){
	$.ajax({
		type: "POST",
		url: contextPath+"/login/getVerifyCode.do",
		data: "",
		success: function(msg){
			if(msg.success == true){
				$("#verifyCode").attr("src","data:image/png;base64,"+msg.data);
			}
		}
	});
}
//界面键盘事件
function keyDownBody(event){
	if(event.keyCode==13){
		onLogin();
	}
}
//右下角弹窗
function regUser(){
	$.myPlugin.prompt({title:'我的弹出',context:'我的内容'});
}