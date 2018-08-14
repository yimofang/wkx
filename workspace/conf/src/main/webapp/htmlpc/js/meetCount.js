var page = 1,
    pagetotal = 1;
$(function () {
    getHeader();
    getTab0();
    getTab1();
    getTab2(page);
    $(".nav_one li").css('padding', '0');

    $('.count_tab span').click(function () {
        $(this).siblings('span').removeClass('on');
        $(this).addClass('on');
        var index = $(this).index();
        $('.tabs').hide();
        $('.tab' + index).show();
    })
})

function getTab0() {
    $.ajax({
        type: 'POST',
        url: urlstr + 'confs_web/confStatistics.do',
        data: {
            confid: halfUrl.conid,
            type: 2,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                $("#haveNum").html(res.row.checked);//已签到
                $("#unNum").html(res.row.nuchecked);//未签到
                $("#allNum").html(res.row.count);//总报名
                $("#nameLook").html(res.row.browsenum);//报名页浏览
                $("#namePercent").html(res.row.apply_rate);//报名转化率
                $("#siPercent").html(res.row.arrive_rate);//签到转化率
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    });
}

function getTab1() {
    $.ajax({
        tyoe: 'post',
        url: urlstr + 'rejoin_web/qnrStatistics.do',
        data: {
            confid: halfUrl.conid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                $('#browsenum').html(res.row.browsenum);
                $('#answernum').html(res.row.answernum);
                $('#validnum').html(res.row.validnum);
                var list = res.row.titlelist;
                if (list.length <= 0) {
                    $('.problem_all').hide();
                }
                for (var i = 0, html = '', state = ''; i < list.length; i++) {
                    if (list[i].tstate == 1) {
                        state = '单选题'
                    } else if (list[i].tstate == 2) {
                        state = '多选题'
                    } else {
                        state = '填空题'
                    }
                    var conid = "'" + list[i].id + "'";
                    var conname = "'" + list[i].fname + "'";
                    html += ' <li onclick="thisinfo(' + conid + ',' + list[i].tstate + ',' + conname + ')"><span>' + list[i].fname + '</span><span class="num3">' + state + '</span></li>';
                }
                $('.tab1>ul').append(html);
                thisinfo(list[0].id, list[0].tstate, list[0].fname);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    })
}

function thisinfo(id, type, name) {
    $('.problem_tit').html(name);
    if (type == 3) {
        $.ajax({
            tyoe: 'post',
            url: urlstr + 'rejoin_web/getAnswerStatistics.do',
            data: {
                display: 50,
                page: 1,
                state: 3,
                titleid: id
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    for (var j = 0, html2 = ''; j < res.row.length; j++) {
                        html2 += '<li class="problem_tiankong">' +
                            '     <p class="pro_name">用户：' + res.row[j].answer + '</p>' +
                            '     <p>' + res.row[j].realname + '</p>' +
                            ' </li>'
                    }
                    $('.problem_list').html(html2);
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(0);
                } else {
                    alert(res.msg);
                }
            }
        })
    } else {
        $.ajax({
            tyoe: 'post',
            url: urlstr + 'rejoin_web/getAnswerStatistics.do',
            data: {
                state: type,
                titleid: id,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    for (var i = 0, html = ''; i < res.row.length; i++) {
                        html += '<li class="problem_xuanze">' +
                            '    <p class="pro_name">选项' + (i + 1) + '：' + res.row[i].fname + '</p>' +
                            '    <p>选取率：<span>' + res.row[i].proportion + '</span></p>' +
                            '</li>'
                    }
                    $('.problem_list').html(html);
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(0);
                } else {
                    alert(res.msg);
                }
            }
        })
    }

}

function getTab2(p) {
    $.ajax({
        tyoe: 'post',
        url: urlstr + 'confsbrief_web.do',
        data: {
            display: 10,
            confsid: halfUrl.conid,
            page: p,
            type: 2,
            token: Token,
        },
        dataType: 'json',
        success: function (res) {
            pagetotal = res.pages;
            if (res.pages == 1) {
                $('.mores').hide();
            }
            for (var i = 0, html = ''; i < res.row.length; i++) {
                var _id = "'"+res.row[i].id+"'";
                html += '<li class="item_act" onclick="thisList('+_id+')">' +
                    '     <p class="act_tit">' + res.row[i].bname + '</p>' +
                    '     <p><span></span> <span class="rigth_num">媒体推广次数：' + res.row[i].push + '</span></p>' +
                    ' </li>';
            }
            $('.jb_list ul').append(html);
            thisList(res.row[0].id);
            page++;
            if (page >= pagetotal) {
                $('.mores').hide();
            }
        }
    })
}

function more() {
    getTab2(page)
}

function thisList(id) {
    $('.media_list').html('加载中...');
    $.ajax({
        type: 'post',
        url: urlstr + 'confsbrief_web/getinfoPc.do',
        data: {
            id: id,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                for (var i = 0, html = ''; i < res.list.length; i++) {
                    html += '<li>' + res.list[i].mname + '</li>'
                }
                $('.media_list').html(html);
            } else if (res.error == 5) {

            } else {
                alert(res.info);
            }
            ;
        }

    });
}