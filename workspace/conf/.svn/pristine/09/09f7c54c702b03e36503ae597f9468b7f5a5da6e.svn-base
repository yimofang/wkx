var page = 1,
    state = 1,
    countdown = 60,
    listArr = [],
    mediaArr = [];
$(function () {
    getHeader();
    $(".nav_one li").css('padding', '0');
    getBriefList(page, state); //1未推广 2已推广 3全部
    getMedia();
    $('.title span').click(function () {
        $('.mediaChoice').hide();
        $('.haveMedia').hide();
        $('.contList').show();
        $(this).addClass('active').siblings().removeClass('active');
        page = 1,
            state = $(this).attr('data-state');
        getBriefList(page, state);
        listArr = [];
        mediaArr = [];
    });
    //创建简报-打开 关闭
    $(".creatBrief").click(function () {
        $("#brCreate").show();
    });
    $("#brCreate .top_cancel").click(function () {
        $("#brCreate").hide();
        $(".creTitle").val('');
        $("#editor .w-e-text").html('');
    });
    //删除简报
    $(".contList").on('click', '.br_del', function () {
        var id = $(this).attr('data-id');
        var thisIndex = $(this).parents('li').attr('data-index');
        $('.mask').show();
        $('.mask .yes_btn').attr('data-id', id).attr('data-index', thisIndex);
    });
    //预览简报-打开 关闭
    $(".contList").on('click', '.br_preview', function () {
        var id = $(this).attr('data-id');
        $(".preBrief").show();
        getPreBrief(id);
    });
    $(".pre_del").click(function () {
        $(".preBrief").hide();
    });
    //编辑简报-打开 关闭
    $(".contList").on('click', '.br_edit', function () {
        var id = $(this).attr('data-id');
        $("#brEdit").show();
        getEditBrief(id);
        $('.top_save').attr('data-id', id);
    });
    $("#brEdit .top_cancel").click(function () {
        $("#brEdit").hide();
        $('.top_save').attr('data-id', '');
    });
    //选择简报
    $(".contList").on('click', '.ischoice', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            var id = $(this).attr('data-id');
            for (var i = 0; i < listArr.length; i++) {
                if (listArr[i].id == id) {
                    listArr.splice(i, 1);
                    console.log(listArr);
                    return
                }
            }

        } else {
            $(this).addClass('on');
            var obj = {
                'name': $(this).children('.tgTie').html(),
                'content': $(this).children('.tgCont').html(),
                'id': $(this).attr('data-id')
            };
            listArr.push(obj);
            console.log(listArr);
        }
    });
    //选择媒体
    $(".medList").on('click', 'span', function () {
        if ($(this).hasClass('active')) {
            return
        } else {
            $(this).addClass('active');
            var obj = {"name": $(this).html(), "id": $(this).attr('data-id'), "index": $(this).index()};
            mediaArr.push(obj);
            haveMediaList();
        }

    });
    //删除媒体
    $('.haveList').on('click', 'i', function () {
        var Iid = $(this).attr('data-id'),
            Iindex = $(this).attr('data-index');
        $('.medList span:eq(' + Iindex + ')').removeClass('active');
        for (var i = 0; i < mediaArr.length; i++) {
            if (mediaArr[i].id == Iid) {
                mediaArr.splice(i, 1);
                haveMediaList();
                return
            }
        }
    })
    //获取验证码
    $('#getCode').click(function () {
        var p_num = $(".media_tel input").val();

        if (p_num == '') {
            alert('请输入手机号');
        } else if (!(/^1[345789]\d{9}$/.test(p_num))) {
            alert('手机号有误！');
        } else {
            var obj = $("#getCode");
            settime(obj);
            $.ajax({
                type: 'post',
                url: urlstr + 'briefmedia_web/queryCode.do',
                data: {
                    phone: p_num,
                    token: Token
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        console.log(res);
                    } else if (res.error == 5) {
                        alert(res.msg);
                        ReqToken();
                    } else {
                        alert(res.msg);
                    }
                }
            });
        }
    })
});

//倒计时
function settime(obj) {
    if (countdown == 0) {
        obj.attr('disabled', false);
        obj.html("发送验证码");
        countdown = 60;
        return;
    } else if (countdown > 0) {
        obj.attr('disabled', true);
        obj.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(obj);
    }, 1000);
}

// 取消删除
function goback() {
    $('.mask').hide();
    $('.mask .yes_btn').attr('data-id', '').attr('data-index', '');
}

function goback2() {
    $('.mask2').hide();
}

// 确认删除
function deletemeet(obj) {
    var Id = obj.getAttribute('data-id');
    var index = obj.getAttribute('data-index');
    $.ajax({
        type: 'post',
        url: urlstr + 'confsbrief_web/deleteinfo.do',
        data: {
            id: Id,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                alert('成功删除该简报！');
                $('.mask').hide();
                $('.mask .yes_btn').attr('data-id', '').attr('data-index', '');
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    });
}


/********************** 简报 **********************/
//创建-保存
function saveBrief() {
    var tit = $(".creTitle").val();
    var des = $("#editor .w-e-text").html();
    if ((tit == null) || (tit == '')) {
        alert('请输入简报标题！');
    } else if (des == '<p><br></p>') {
        alert('请输入简报内容！');
    } else {
        $.ajax({
            type: 'post',
            url: urlstr + 'confsbrief_web/addinfo.do',
            data: {
                bname: tit,
                introd: des,
                imgs: '',
                confsid: halfUrl.conid,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert(res.msg);

                    $(".creTitle").val('');
                    $("#editor .w-e-text").html('');
                    $("#brCreate").hide();
                    //获取简报列表
                    getBriefList(1, 1);
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(0);
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}

//简报列表-获取
function getBriefList(p, t) { //p:页码 t:状态
    if (t == 3) {
        $('.tgTop').show();
        $('.next').show();
    } else {
        $('.tgTop').hide();
        $('.next').hide();
    }
    $('.haveList').html('');
    $('.medList span').removeClass('active');
    $.ajax({
        type: 'post',
        url: urlstr + 'confsbrief_web.do',
        data: {
            display: 10,
            confsid: halfUrl.conid,
            page: p,
            type: t,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                var htmlstr = '';
                var arr = res.row;
                if (arr.length > 0) {
                    $(".noData").hide();
                    $('#form1').show();
                    if (p == 1) {
                        loadData(res.total);
                    }
                    for (var i = 0; i < arr.length; i++) {
                        var time = arr[i].createtime;
                        var creTime = new Date(parseInt(time)).toLocaleDateString().replace(/\//g, "-");

                        if (t == 3) {
                            var ison = listArr.indexOf(arr[i].id) == -1 ? '' : 'on'
                            htmlstr += '<li  data-id="' + arr[i].id + '" class="ischoice ' + ison + '">' +
                                '<p class="tgTie">' + arr[i].bname + '</p>' +
                                '<div class="tgCont">' + arr[i].introd + '</div>' +
                                '</li>';
                        } else {
                            htmlstr += '<li data-id="' + arr[i].id + '">' +
                                ' <div class="cont_left">' +
                                ' <p class="cont_tit">' + arr[i].bname + '</p>' +
                                ' <div class="cont_art">' + arr[i].introd + '</div>' +
                                ' </div>' +
                                ' <div class="cont_right">' +
                                ' <p class="cont_time">' + creTime + '</p>' +
                                ' <p class="cont_caozuo">' +
                                ' <span class="br_preview" data-id="' + arr[i].id + '">预览</span>' +
                                ' <span class="br_del" data-id="' + arr[i].id + '">删除</span>' +
                                ' <span class="br_edit" data-id="' + arr[i].id + '">编辑</span>' +
                                ' </p>' +
                                ' </div>' +
                                ' </li>';
                        }

                    }

                    $('.contList>ul').html(htmlstr);
                    if (t == 3) {
                        $('.tgTop').show();
                        $('.next').show();
                    }
                } else {
                    $('.contList>ul').html('');
                    $(".noData").show();
                    $('#form1').hide();
                }

            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    });
}

//预览
function getPreBrief(briefId) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsbrief_web/getinfoPc.do',
        data: {
            id: briefId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                var time = res.row.createtime;
                var creTime = new Date(parseInt(time)).toLocaleDateString().replace(/\//g, "-");
                $(".b_tit").html(res.row.bname);
                $(".b_time").html(creTime);
                $(".b_list").html(res.row.introd);
                if(res.list.length>0){
                    $('.media_listtit').show();
                    for(var i=0,html='';i<res.list.length;i++){
                        html+='<li>'+res.list[i].mname+'</li>'
                    }
                    $('.media_list').html(html);
                }
            } else if (res.error == 5) {

            } else {
                alert(res.info);
            }
            ;
        }

    });
}

//编辑-获取
function getEditBrief(briefId) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsbrief_web/getinfo.do',
        data: {
            id: briefId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                $("#brEdit .creTitle").val(res.row.bname);
                $("#editor2 .w-e-text").html(res.row.introd);
            } else if (res.error == 5) {

            } else {
                alert(res.info);
            }
            ;
        }

    });
}

//编辑-保存
function saveEditBrief() {
    var id = $('.top_save').attr('data-id');
    var tit = $("#brEdit .creTitle").val();
    var des = $("#brEdit #editor2 .w-e-text").html();
    if ((tit == null) || (tit == '')) {
        alert('请输入简报标题！');
    } else if (des == '<p><br></p>') {
        alert('请输入简报内容！');
    } else {
        $.ajax({
            type: 'post',
            url: urlstr + 'confsbrief_web/addinfo.do',
            data: {
                id: id,
                bname: tit,
                introd: des,
                imgs: '',
                confsid: halfUrl.conid,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert(res.msg);

                    $(".creTitle").val('');
                    $("#editor2 .w-e-text").html('');
                    $("#brEdit").hide();
                    //获取简报列表
                    getBriefList(1, 1);
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(0);
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}


/********************** 媒体 **********************/
//跳转到媒体列表
function articleNext() {
    var _length = listArr.length;
    if (_length > 0) {
        $(".contList").hide();
        $(".mediaChoice").show();

    } else {
        alert('请选择推广的文章');
    }

}

// 媒体列表-获取
function getMedia() {
    $.ajax({
        type: 'post',
        url: urlstr + 'media_web.do',
        data: {
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                var htmlstr = '';
                console.log(res);
                for (var i = 0; i < res.row.length; i++) {
                    htmlstr += '<span data-id="' + res.row[i].id + '">' + res.row[i].mname + '</span>';
                }
                $(".medList").append(htmlstr);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(1);
            } else {
                alert(res.msg);
            }

        }
    });
}

// 返回到媒体列表
function mediaBack() {
    $(".mediaChoice").hide();
    $(".contList").show();
    $('.haveMedia').hide();
}

// 立即推广
function mediaNext() {
    if (mediaArr.length > 0) {
        for (var i = 0, html1 = ''; i < listArr.length; i++) {
            html1 += '<li>' +
                '    <p class="tits">' + listArr[i].name + '</p>' +
                '    <div class="contents">' + listArr[i].content + '</div>' +
                '</li>'
        }
        for (var j = 0, html2 = ''; j < mediaArr.length; j++) {
            html2 += ' <li>' + mediaArr[j].name + '</li>'
        }
        $('.sure_act').html(html1);
        $('.sure_media').html(html2);
        $(".mediaChoice").hide();
        $('.haveMedia').show();
    } else {
        alert('请选择推广的媒体')
    }

}

//确认推广
function haveNext() {
    $('.mask2').show();
}

function haveBack() {
    $('.mediaChoice').show();
    $('.haveMedia').hide();
}

//获取已选媒体
function haveMediaList() {
    for (var i = 0, htmlstr = ''; i < mediaArr.length; i++) {
        htmlstr += '<span>' + mediaArr[i].name + '<i data-id="' + mediaArr[i].id + '" data-index="' + mediaArr[i].index + '"></i></span>';
    }
    $('.haveList').html(htmlstr);
}


function submits() {
    var tel = $('.media_tel input').val(),
        yzm = $('.media_yzm input').val();
    if (tel == '' && yzm == '') {
        alert('请输入手机号和验证码');
    } else if (!(/^1[345789]\d{9}$/.test(tel))) {
        alert('手机号有误！');
    } else {
        for (var i = 0, str1 = ''; i < mediaArr.length; i++) {
            str1 += mediaArr[i].id + ',';
        }
        for (var j = 0, str2 = ''; j < listArr.length; j++) {
            str2 += listArr[j].id + ',';
        }
        $.ajax({
            type: 'post',
            url: urlstr + 'briefmedia_web.do',
            data: {
                briefs: str2.slice(0, -1),
                medias: str1.slice(0, -1),
                phone: tel,
                phoneCode: yzm,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    $('.mask2').hide();
                    $('.title span').removeClass('active');
                    $('.title span.span2').addClass('active');
                    page = 1;
                    state = 2
                    getBriefList(page, state);
                    $('.contList').show();
                    $('.haveMedia').hide();
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}

/********************* 页码 ***********************/

function exeData(num, type) {
    loadData(num);
    loadpage();
    getBriefList(num, state);
}