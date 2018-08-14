$(function(){
    getHeader();
    $(".nav_one li").css('padding','0');
    //切换
    $(".title span").click(function(){
        var i = $(this).index() + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $(".cont" + i).show().siblings().hide();
        $(".title").show();
    });

    //获取报名信息
    function getName(){
        $.ajax({
            type:'post',
            url:urlstr + '',
            data:{


            }
        });
    }
});