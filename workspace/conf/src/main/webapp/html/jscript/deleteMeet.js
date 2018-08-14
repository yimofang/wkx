// var NumAll = GetRequest(),
//     Token = sessionStorage.getItem('token'),
//     Urlstr = 'http://192.168.2.238:8080/conf/';
$(function(){
    if(Token==null||Token == undefined){
        ReqToken();
    }
    GetPopleNum();
    //修改九宫格a的链接
	$('.MeetInfoList a').click(function () {
        // var did = $(this).attr('data-id');
        // if(did == 3){
        //     window.open($(this).attr('data-url') +'?confsid='+NumAll.confsid);
        // }else{
             window.location.href =$(this).attr('data-url') +'?confsid='+NumAll.confsid;
        // }
       
    })
	//删除会议
	$('#delete').click(function(){
        $('.bg').show();
        // $('#sure').attr('onclick','DeleteMeet()');
    });
	//取消删除会议
    $('#close').click(function () {
        $('.bg').hide();
        // $('#sure').attr('onclick','');
    })
    $('.SignStart').click(function () {
        window.location.href = 'QRCode.html?confsid='+NumAll.confsid + '&&did=2';
    })
    pushHistory();
    window.addEventListener("popstate", function(e) {
        // alert(111);
        // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        window.location.href = 'index.html';
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
});
//确定删除会议
function DeleteMeet() {
    $.ajax({
        type : 'POST',
        url : Urlstr + 'confs_web/deleteConfs.do',
        data : {
            confid:NumAll.confsid,
            token:Token,
        },
        dataType : 'json',
        success : function (res) {
            if(res.error == 0){
                alert(res.msg);
                window.location.href = 'index.html';
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    })
}
//签到确定
function SignSure() {
    $('.bg').hide();
}
//请求签到人数
function GetPopleNum() {
    $.ajax({
        type : 'POST',
        url : Urlstr+'confs_web/confStatistics.do',
        data : {
            confid:NumAll.confsid,
            type:1,
            token:Token,
        },
        dataType : 'json',
        success : function (res) {
            console.log(res);
            if(res.error == 0){
                $('#SignYes').html(res.row.checked);
                $('#SignAll').html(res.row.count);
                $('#SignNo').html(res.row.nuchecked);
            }
        }
    })
}
//签到
function Sign() {
    $.ajax({
        type : 'POST',
        url : Urlstr,
        data : {
            confsid:NumAll.confsid,
            token:Token,
        },
        dataType : 'json',
        success : function (res) {

        }
    })
}
//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login2.html",function() {
        $('#reqtoken').show();
    });
}
