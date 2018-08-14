$(function () {
    Getdescribe();
    Getguest();
    Getflow();
    Getquestion();
    mNext();
    pdbaoming();
    $('.item').click(function () {
        var urls = $(this).attr('data-url');
        window.location.href  = urls + '&confsid='+NumAll.confsid;
    })
})

function submit() {
    var state1 = $('.item0 .isok').attr('data-state'),
        state2 = $('.item1 .isok').attr('data-state');
    if(state1 == 1&&state2 == 1){
        $.ajax({
            type:'post',
            url:Urlstr + 'confs_web/saveConfsInfo.do',
            data:{
                id: NumAll.confsid,
                token:Token
            },
            dataType:'json',
            success:function (res) {
                if (res.error == 0) {
                    alert('会议发布成功！')
                    window.location.href = 'index.html';
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                } else {
                    alert(res.msg);
                }
            }
        })
    }else{
        alert('必填信息未填写完整');
    }
}

//请求会议描述
function Getdescribe() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: NumAll.confsid,
            token: Token,
            type: 1
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row == null) {
                    $('.item0 .isok').html('(未填写)').attr('data-state', 0);
                } else {
                    $('.item0 .isok').html('(已填写)').attr('data-state', 1);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}

//请求报名时间
function pdbaoming() {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confs_web/getEnlist.do',
        data: {
            id: NumAll.confsid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.shstart == ''||res.row.shend == '') {
                    $('.item1 .isok').html('(未填写)').attr('data-state', 0);
                } else {
                    $('.item1 .isok').html('(已填写)').attr('data-state', 1);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    })
}

//请求会议嘉宾
function Getguest() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confsGuest_web/listpage.do',
        data: {
            confsid: NumAll.confsid,
            token: Token,
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.length == 0) {
                    $('.item3 .isok').html('(未填写)').attr('data-state', 0);
                } else {
                    $('.item3 .isok').html('(已填写)').attr('data-state', 1);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }

        }
    });
}

//请求会议流程
function Getflow() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: NumAll.confsid,
            token: Token,
            type: 2
        },
        dataType: 'json',
        success: function (res) {

            if (res.error == 0) {
                if(res.row.length == 0){
                    $('.item2 .isok').html('(未填写)').attr('data-state',0);
                }else{
                    $('.item2 .isok').html('(已填写)').attr('data-state',1);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}

//请求下期预告
function mNext() {
    $.ajax({
            type: 'post',
            url: Urlstr + 'trailer_web/getAdvance.do',
            data: {
                confid: NumAll.confsid,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.error == 0) {
                    if (res.row == null) {
                        $('.item4 .isok').html('(未填写)').attr('data-state', 0);
                    } else {
                        $('.item4 .isok').html('(已填写)').attr('data-state', 1);
                    }
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                } else {
                    alert(res.msg);
                }
            }
        });
}

//请求问卷调查
function Getquestion() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: NumAll.confsid,
            token: Token,
            type: 4
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if(res.row == null){
                    $('.item5 .isok').html('(未填写)').attr('data-state',0);
                }else{
                    $('.item5 .isok').html('(已填写)').attr('data-state',1);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}
//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login2.html", function () {
        $('#reqtoken').show();
    });
}