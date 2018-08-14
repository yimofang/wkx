$(function(){
    getHeader();
    shareimg();
    qiandaoimg();
    $(".nav_one li").css('padding','0');
    //切换
    $(".title span").click(function(){
        var i = $(this).index() + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $(".cont" + i).show().siblings().hide();
        $(".title").show();
    });
});

function shareimg() {
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/confIssue.do',
        data:{
            confid:halfUrl.conid,
            token:Token
        },
        dataType:'json',
        success:function (res) {
            console.log(res);
            if(res.error == 0){
                var bhstart = ZHDate(new Date(res.bhstart));
                $('#shareImg').attr('src',urlstr+'qrcode.do?link='+res.row);
                $(".n_tit").html(res.cname);
                $(".n_host").html(res.brief);
                $(".n_add").html(res.addr);
                $(".n_time").html(bhstart);
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken(0);
            }else{
                alert(res.msg);
            }
        }
    });
}

//扫码签到
function qiandaoimg() {
    var CZUrl = '';
    var NowUrl = window.window.location.href;
    var host = window.window.location.host;
    console.log(NowUrl.indexOf('/conf/'));
    if(NowUrl.indexOf('/conf/')==-1){
        CZUrl = 'http://'+host+'/html/qiandao.html?id='+halfUrl.conid;
    }else{
        CZUrl = 'http://'+host+'/conf/html/qiandao.html?id='+halfUrl.conid;
    }
    $.ajax({
        type:'post',
        url:urlstr + 'login_web/http.do',
        data:{
            url:CZUrl,
            token:Token
        },
        dataType:'json',
        success:function (res) {
            if(res.error == 0){
                $('#baomingImg').attr('src',urlstr+'qrcode.do?link='+res.row);
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg)
            }
        }
    })
}