

function initMenu(){
	// MetsiMenu
    $('#side-menu').metisMenu();

    // 打开右侧边栏
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    //固定菜单栏
/*    $(function () {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
            alwaysVisible: false
        });
    });*/
	$(window).resize(function(){
		if($('body').hasClass("mini-navbar")){
			$('.easyui-tabs').css({'width':'100%'});
			$('.tabs-panels').css({'width':'100%'});
			$('.panel-body-noborder').css({'width':'auto'})
			$('.dribbble-container').css({'width':'100%'});
			$('.tabs-wrap').css({'width':'100%'});
		}else{
			$('.tabs-panels').css({'width':'100%'});
			$('.easyui-tabs').css({'width':'auto'});
			$('.panel-body-noborder').css({'width':'100%'});
			$('.dribbble-container').css({'width':'100%'});
			$('.tabs-header').css({'width':'calc(100% - 370px)'});
		}
	})
    // 菜单切换
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
		//修改窗口尺寸
		if($('body').hasClass("mini-navbar")){
			$('.easyui-tabs').css({'width':'100%'});
			$('.tabs-panels').css({'width':'100%'});
			$('.panel-body-noborder').css({'width':'auto'})
			$('.dribbble-container').css({'width':'100%'});
			$('.tabs-wrap').css({'width':'100%'});
		}else{
			$('.tabs-panels').css({'width':'100%'});
			$('.easyui-tabs').css({'width':'auto'});
			$('.panel-body-noborder').css({'width':'100%'});
			$('.dribbble-container').css({'width':'100%'});
			$('.tabs-header').css({'width':'calc(100% - 370px)','min-width':'100px'});
		}
    });


    // 侧边栏高度
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    $(window).bind("load resize click scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    //侧边栏滚动
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });
/*
    $('.full-height-scroll').slimScroll({
        height: '100%'
    });*/

    $('#side-menu>li').click(function () {
        if ($('body').hasClass('mini-navbar')) {
            NavToggle();
        }
    });
    $('#side-menu>li li a').click(function () {
        if ($(window).width() < 769) {
            NavToggle();
        }
    });

    $('.nav-close').click(NavToggle);

    //ios浏览器兼容性处理
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $('#content-main').css('overflow-y', 'auto');
    }
}
$(document).ready(function () {

    

});

$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('mini-navbar');
		//修改窗口尺寸
        $('.navbar-static-side').fadeIn();
				if($('body').hasClass("mini-navbar")){
			$('.easyui-tabs').css({'width':'100%'});
			$('.tabs-panels').css({'width':'100%'});
			$('.panel-body-noborder').css({'width':'auto'})
			$('.dribbble-container').css({'width':'100%'})
		}else{
			$('.tabs-panels').css({'width':'100%'});
			$('.easyui-tabs').css({'width':'auto'});
			$('.dribbble-container').css({'width':'100%'})

		}
			
    }
});

function NavToggle() {
    $('.navbar-minimalize').trigger('click');
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        $('#side-menu').removeAttr('style');
    }
}

