var question_info = '';
$(function () {
    getMeetInfo();
    getMDesc();
    getGuest();
    getFlow();
    getReport();
    getBrief();
    getData();
    getCodeName();
    // getSingUp();
    qiandaoimg();
    pdbaoming()


    //会议四项切换
    $(".msgTop span").click(function () {
        var i = $(this).index() + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $(".cont" + i).show().siblings().hide();
        $(".msgTop").show();
    });
    //联系主办方
    $(".btnHost").click(function () {
        $(".shade").show();
    });
    $(".close").click(function () {
        $(".shade").hide();
    });

    //报名

    $(".btnCel").click(function () {
        $(".shade2").hide();
    });
    //问卷手机
    $(".breBtn").click(function () {
        question_info = getQues();
        if (question_info != false && question_info != '') {
            $(".cont3").show();
        }
    });
});

function gobacks() {
    $(".shade3").hide();
}

//获取会议基本信息
function getMeetInfo() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confDetails.do',
        data: {
            conftoken: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                $('.info1 img').attr('src', urlstr + '/upload/' + res.row.cimg);
                $(".title").html(res.row.cname);
                $(".tName").attr('data-state', res.row.typeid);
                $(".tName").html(res.row.tname);
                $(".hostVal").html(res.row.brief);
                $(".addVal").html(res.row.addr);
                $(".t_start").html(res.row.days + '  ' + res.row.statime);
                $(".t_end").html(res.row.edays + '  ' + res.row.endtime);
            } else if (res.error == 5) {
                alert(res.info);
                ReqToken(0);
            } else {
                alert(res.info);
            }
        }

    });
}

//获取描述内容
function getMDesc() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: halfUrl.meetId,
            type: 1,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.introd != null) {
                    $(".contDes").append(res.row.introd);
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

//获取会议嘉宾
function getGuest() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsGuest_web/listpage.do',
        data: {
            confsid: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.length > 0) {
                    var htmlstr = '';
                    for (var i = 0; i < res.row.length; i++) {
                        htmlstr += '<li>' +
                            ' <div class="g_info">' +
                            ' <img src="' + urlstr+'upload/'+res.row[i].gimg + '" alt="">' +
                            ' <p class="g_name">' + res.row[i].gname + '</p>' +
                            ' <p class="p_honor">' + res.row[i].rank + '</p>' +
                            ' </div>' +
                            ' <p class="g_intro">' + res.row[i].brief + '</p>' +
                            ' </li>';
                    }
                    $('.contGuest ul').html(htmlstr);
                } else {
                    $('.contGuest').hide();
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

//获取会议流程
function getFlow() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsFlow_web/listpage.do',
        data: {
            confsid: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.length > 0) {
                    var htmlstr = '';
                    for (var i = 0; i < res.row.length; i++) {
                        var stime = ZHDate(new Date(res.row[i].bhstart));
                        var etime = ZHDate(new Date(res.row[i].bhend));
                        htmlstr += '<li>' +
                            '<span class="circle"></span>' +
                            ' <div>' +
                            ' <span class="f_num">【流程' + (i + 1) + '】</span>' +
                            ' <span class="f_time">' + stime + ' ~ ' + etime + '</span>' +
                            ' </div>' +
                            ' <p class="f_desc">' + res.row[i].fname + '</p>' +
                            ' </li>';
                        $('.contFlow ul').html(htmlstr);
                    }
                } else {
                    $('.contFlow').hide();
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

//获取会议资料
function getData() {
    $.ajax({
        type: 'POST',
        url: urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: halfUrl.meetId,
            type: 3,
            token: Token,
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                var data = res.row;
                if (data.length > 0) {
                    var htmlstr = '';
                    for (var i = 0; i < data.length; i++) {
                        $(".zl_tit").html(data[i].dname);
                        var index1 = data[i].file.lastIndexOf(".");
                        var index2 = data[i].file.length;
                        var file_img = data[i].file.substring(index1 + 1, index2);
                        var file_img_src = '';
                        switch (file_img) {
                            case 'doc':
                            case 'docx':
                                file_img_src = 'word.jpg';
                                break;
                            case 'xls':
                            case 'xlsx':
                                file_img_src = 'excel.jpg';
                                break;
                            case 'ppt':
                            case 'pps':
                                file_img_src = 'ppt.jpg';
                                break;
                            case 'pdf':
                                file_img_src = 'pdf.jpg';
                                break;
                            default:
                                file_img_src = 'qita.jpg';
                                break;
                        }
                        htmlstr += '<li data-id="' + res.row[i].id + '">' +
                            '<a href="' + urlstr + 'upload/' + res.row[i].file + '">' +
                            '<img src="img/' + file_img_src + '" alt="">' +
                            '<div class="zl_msg">' +
                            '<p class="zl_tit">' + res.row[i].dname + '</p>' +
                            '<div class="zl_p">' +
                            '<span class="eye">129</span>' +
                            ' <span class="share">47</span>' +
                            ' </div>' +
                            ' </div>' +
                            '</a>' +
                            ' </li>';
                    }
                    $('.cont2 ul').html(htmlstr);
                }
            } else if (res.error == 5) {
                alert(res.msg);
            } else {
                alert(res.msg);
            }
        }
    });
}

//获取下期预告
function getReport() {
    $.ajax({
        type: 'post',
        url: urlstr + 'trailer_web/getAdvance.do',
        data: {
            confid: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row != null) {
                    $(".cont4").html(res.row.introd);
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

//获取问卷
function getBrief() {
    $.ajax({
        type: 'POST',
        url: urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: halfUrl.meetId,
            token: Token,
            type: 4
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row != null) {
                    var brr = res.row.titles,
                        bstr = '';
                    if (brr != null) {
                        $(".cont3 ul").attr('data-id', res.row.id);
                        for (var i = 0; i < brr.length; i++) {
                            if (brr[i].tstate == 3) { //填空
                                bstr += '<li data-id="' + brr[i].id + '" data-state="3" data-must="' + brr[i].isitem + '">' +
                                    ' <p class="breTit">' +
                                    ' <span>' + (i + 1) + '</span>.' + brr[i].fname + '' +
                                    ' </p>' +
                                    ' <input type="text" class="tk">' +
                                    ' </li>';
                            }
                            if (brr[i].tstate == 2) { //多选
                                bstr += '<li data-id="' + brr[i].id + '" data-state="2" data-max="' + brr[i].qnrmax + '" data-min="' + brr[i].qnrmin + '">' +
                                    ' <p class="breTit">' +
                                    ' <span>' + (i + 1) + '</span>.' + brr[i].fname + '' +
                                    ' <span class="dx">[多选题]</span>' +
                                    ' </p>';
                                for (var j = 0; j < brr[i].options.length; j++) {
                                    bstr += '<p><input type="checkbox" class="doux" name="' + (i + 1) + '" data-id="' + brr[i].options[j].id + '">' + brr[i].options[j].fname + '</p>'
                                }
                                bstr += '</li>';
                            }
                            if (brr[i].tstate == 1) { //单选
                                bstr += '<li data-id="' + brr[i].id + '" data-state="1">' +
                                    '<p class="breTit">' +
                                    '<span>' + (i + 1) + '</span>.' + brr[i].fname + '' +
                                    '</p>';
                                for (var d = 0; d < brr[i].options.length; d++) {
                                    bstr += '<p><input type="radio" name="' + (i + 1) + '" class="dx" data-id="' + brr[i].options[d].id + '">' + brr[i].options[d].fname + '</p>';
                                }
                                bstr += '</li>';
                            }

                        }
                        $(".cont3 ul").html(bstr);

                    }else {
                        $('.cont3').html('');
                    }
                } else {
                    $('.cont3').html('');
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

//获取问卷题目
function getQues() {


    var bList = $(".cont3 ul li");
    var datas = {"rejoins": []};
    var bf = '';
    if (bList.length != 0) {
        for (var i = 0; i < bList.length; i++) {
            var state = $(".cont3 ul li:eq(" + i + ")").attr('data-state');
            if (state == 3) { //填空
                var tk = checkTK(i);
                if (tk != false) {
                    datas.rejoins.push(tk);
                } else {
                    alert('请回答第' + (i + 1) + '题！');
                    bf = false;
                    return bf;
                }
            } else if (state == 2) { //多选
                var dox = checkDOX(i);
                if (dox != false) {
                    datas.rejoins.push(dox);
                } else {
                    alert('请回答第' + (i + 1) + '题！');
                    bf = false;
                    return bf;
                }
            } else if (state == 1) { //单选
                var dx = checkDX(i);
                if (dx != false) {
                    datas.rejoins.push(dx);
                } else {
                    alert('请回答第' + (i + 1) + '题！');
                    bf = false;
                    return bf;
                }
            }
        }
        $(".shade3").show();
        return datas;

    }
}

//判断填空题
function checkTK(index) {
    var must = $(".cont3 ul li:eq(" + index + ")").attr('data-must'); //1必填 2非必填
    var qId = $(".cont3 ul li:eq(" + index + ")").attr('data-id');
    var tkVal = $(".cont3 ul li:eq(" + index + ") input").val();
    var json = {"qid": '', "answer": ''};
    if (tkVal == '' && must == 1) {
        // alert('请回答第'+(index+1)+'题！');
        return false;
    } else if (tkVal != '' && must == 1) {
        json.qid = qId;
        json.answer = tkVal;
        return json;
    } else if (tkVal != '' && must == 2) {
        json.qid = qId;
        json.answer = tkVal;
        return json;
    }
}

//判断多选
function checkDOX(index) {
    var qId = $(".cont3 ul li:eq(" + index + ")").attr('data-id');
    var max = $(".cont3 ul li:eq(" + index + ")").attr('data-max');
    var min = $(".cont3 ul li:eq(" + index + ")").attr('data-min');
    var check = $("input[name=" + (index + 1) + "]:checked");
    var json = {"qid": '', "optionid": ''};
    if (check.length == 0) {
        // alert('请回答第'+(index+1)+'题！');
        return false;
    } else if (check.length < min) {
        alert('第' + (index + 1) + '题最少选' + min + '项');
        return false;
    } else if (check.length > max) {
        alert('第' + (index + 1) + '题最多选' + max + '项');
        return false;
    } else {
        var str = '';
        for (var i = 0; i < check.length; i++) {
            str += check[i].getAttribute('data-id') + ',';
        }
        json.qid = qId;
        json.optionid = str.slice(0, -1);
        return json;
    }

}

//判断单选
function checkDX(index) {
    var qId = $(".cont3 ul li:eq(" + index + ")").attr('data-id');
    var check = $("input[name=" + (index + 1) + "]:checked");
    var json = {'qid': '', 'optionid': ''};
    if (check.length == 0) {
        // alert('请回答第'+(index+1)+'题！');
        return false;
    } else {
        var str = '';
        for (var i = 0; i < check.length; i++) {
            str += check[i].getAttribute('data-id') + ',';
        }
        json.qid = qId;
        json.optionid = str.slice(0, -1);
        return json;
    }
}

//提交问卷
function postBrief() {
    var mobile = $(".brCont input").val();
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
        alert('手机号有误！');
        return false;
    } else {
        var datas = {
            rejoins: question_info.rejoins,
            confid: halfUrl.meetId,
            qnrid: $(".cont3 ul").attr("data-id"),
            phone: mobile
        };
        question_info = getQues();
        if (question_info != false && question_info != '') {
            $.ajax({
                type: 'post',
                url: urlstr + 'rejoin_web/submitAnswers.do',
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(datas),
                success: function (res) {
                    if (res.error == 0) {
                        alert(res.msg);
                        question_info = '';

                    } else if (res.error == 5) {
                        alert(res.msg);
                        ReqToken(1);
                    } else {
                        alert(res.msg);
                    }
                }
            });
        }
    }


}

//获取报名二维码
function getCodeName() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confIssue.do',
        data: {
            confid: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                $('.postName img').attr('src', urlstr + 'qrcode.do?link=' + res.row);

            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(1);
            } else {
                alert(res.msg);
            }
        }
    });
}

//扫码签到
function qiandaoimg() {
    var CZUrl = urlstr+'/html/qiandao.html?id='+halfUrl.meetId;;
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
                $('.signUp img').attr('src', urlstr + 'qrcode.do?link=' + res.row);
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken(1);
            }else{
                alert(res.msg)
            }
        }
    })
}

//判断报名
function pdbaoming() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/getEnlist.do',
        data: {
            id: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            var timestamp=new Date().getTime();
            // console.log(timestamp);
            // console.log(res);
            if(timestamp>res.row.shend){
                $('.tPost').html('报名结束');
                $('.btnName').html('报名结束');
                $('.btnName').attr('onclick','');
            }else if(timestamp<res.row.shstart){
                $('.tPost').html('未开始报名');
                $('.btnName').html('未开始报名');
                $('.btnName').attr('onclick','');
            }else{
                $('.tPost').html('在线报名');
                $('.btnName').html('在线报名');
                $('.btnName').attr('onclick','baoming()');
            }
        }
    })
}

function baoming() {
    $(".shade2").show();
}
//提交报名信息
function postNamed() {
    var nameVal = $(".name").val();
    var mobileVal = $(".mobile").val();
    var mailVal = $(".mail").val();
    var reg = new RegExp("^\\s*$|^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (nameVal == '') {
        alert('请输入姓名！');
    } else if (mobileVal == '') {
        alert("请输入电话！");
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobileVal))) {
        alert("电话有误！");
    } else if (!reg.test(mailVal)) {
        alert("邮箱有误！");
    } else {
        $.ajax({
            type: 'POST',
            url: urlstr + 'confsSubuser_web/addinfo.do',
            data: {
                confsid: halfUrl.meetId,
                token: Token,
                phone: mobileVal,
                realname: nameVal,
                email: mailVal,
                job: '',
                units: '',
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert(res.msg);
                    $(".shade2").hide();
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(1);
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}
