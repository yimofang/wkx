var beginTimeStore = '',
    endTimeStore = '',
    flowID = 0,
    guestID = 0,
    data2 = [],
    data3 = [],
    meetId = halfUrl.conid;

$(function () {
    getHeader();
    $(".nav_one li").css('padding', '0');
    getMeetInfo();
    getMiaoshu();
    getFlow();
    getGuest();
    getReport();
    getPostname();
    CTime('st_time');
    // CTime('ml_time1');//会议流程时间
    CTime('name_time');
    // $(".fbt").attr("disabled",false);//禁用非必填项
    $('input.required').blur(function () {
        var _val = $.trim($(this).val());
        if (_val == '') {
            $(this).addClass('requiredtype');
        } else {
            $(this).removeClass('requiredtype');
        }
    })
    $('.cont2').on('blur', '.required', function () {
        var _val = $.trim($(this).val());
        if (_val == '') {
            $(this).addClass('requiredtype');
        } else {
            $(this).removeClass('requiredtype');
        }
    })
    $('.cont3').on('blur', '.required', function () {
        var _val = $.trim($(this).val());
        if (_val == '') {
            $(this).addClass('requiredtype');
        } else {
            $(this).removeClass('requiredtype');
        }
    })
    //基本信息、嘉宾、流程等切换
    $(".title button").click(function () {
        var i = $(this).index() + 1;
        $(this).addClass("active").siblings().removeClass("active");
        $(".cont" + i).show().siblings().hide();
        $(".title").show();//必须在hide的下边
    });

    /****************************会议流程***************************/
    $(".cont2 input").blur(function () {
        $(this).css('border', '1px solid #eee');
    });

    //添加流程
    $(".add").click(function () {
        flowID++
        var n = flowID;
        var _num = $('.cont2 li').length + 1;
        var liBox = '<li id="flow' + n + '" data-id="' + n + '" data-Lid="">\n' +
            '<span class="circle"></span>\n' +
            '<div class="num">流程<i>' + _num + '</i></div>\n' +
            '<div class="cont">\n' +
            '<input class="slTime" id="ml_time' + n + '"  type="text" placeholder="请选择流程时间" readonly="readonly">\n' +
            '<textarea placeholder="会议流程描述" class="tarea ' + n + '  required" id="ml_txt' + n + '"></textarea>\n' +
            '</div>\n' +
            '<div class="del" style="display: none;">\n' +
            '<img src="img/mdel.png" alt="">删除\n' +
            '</div>\n' +
            '</li>';
        $(".cont2 ul").append(liBox);

        $('#ml_time' + n).daterangepicker({
            "timePicker": true,
            "timePicker24Hour": true,
            "linkedCalendars": false,
            "autoUpdateInput": false,
            "locale": {
                format: 'YYYY-MM-DD hh:mm:ss',
                separator: ' ~ ',
                applyLabel: "应用",
                cancelLabel: "取消",
                resetLabel: "重置",
            }
        }, function (start, end, label) {
            beginTimeStore = start;
            endTimeStore = end;
            console.log(this.startDate.format(this.locale.format));
            console.log(this.endDate.format(this.locale.format));
            if (!this.startDate) {
                this.element.val('');
            } else {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                $("#ml_time" + n).attr('data-sTime', this.startDate.format(this.locale.format));
                $("#ml_time" + n).attr('data-eTime', this.endDate.format(this.locale.format));
                $("#ml_time" + n).removeClass('requiredtype');
            }
        });

    });

    //显示删除会议btn
    $(".cont2").on('mouseover', 'li', function () {
        $(this).addClass('addLine').siblings().removeClass('addLine');
        $(this).children('.del').show();
    });
    $(".cont2").on('mouseleave', 'li', function () {
        $(this).removeClass('addLine');
        $(this).children('.del').hide();
    });

    //删除流程
    $(".cont2").on('click', '.del', function () {
        var id = $(this).parent('li').attr('data-lid'),
            index = $(this).parent('li').index();
        if (id == '') {
            $(this).parent('li').remove();
            var fl = $(".cont2 li").length;
            if (fl > 0) {
                for (var n = 0; n < fl; n++) {
                    $('.cont2 li:eq(' + n + ') .num i').html(n + 1);
                }
            }
        } else {
            $('.flow_shade').show();
            $('.flow_shade .yes_btn').attr('data-id', id).attr('data-index', index);
        }


    });

    /***************************************会议嘉宾***********************/
    $(".cont3 input").blur(function () {
        $(this).css('border', '1px solid #eee');
    });
    //添加嘉宾
    $(".g_add").click(function () {
        guestID++;
        var n = guestID;
        var _num = $(".cont3 li").length + 1;
        var gstr = '<li class="guest" id="guest' + n + '" data-Lid="">\n' +
            ' <span class="circle"></span>\n' +
            ' <div class="g_num">嘉宾 <i>' + _num + '</i> </div>\n' +
            ' <div id="guestImg' + n + '" class="g_img">\n' +
            ' <div id="preview' + n + '">\n' +
            ' <img id="imghead' + n + '" border="0" src="img/g_img.png" width="150" height="152">\n' +
            '<input type="file" onchange="previewImage(this,' + n + ')">' +
            ' </div>\n' +
            ' </div>\n' +
            ' <div class="g_info">\n' +
            ' <input class="g_name required" id="g_name' + n + '" type="text" placeholder="嘉宾名称">\n' +
            ' <input class="g_honer required" id="g_honer' + n + '" type="text" placeholder="嘉宾头衔">\n' +
            ' <textarea class="g_intro required" id="g_intro' + n + '" placeholder="嘉宾简介" ></textarea>\n' +
            ' </div>\n' +
            ' <div class="g_del" style="display:none;">\n' +
            ' <img src="img/mdel.png" alt="">删除\n' +
            ' </div>\n' +
            ' </li>';

        $(".cont3 ul").append(gstr);
    });

    //显示隐藏删除btn
    $(".cont3").on('mouseover', 'li', function () {
        $(this).addClass('addLine').siblings().removeClass('addLine');
        $(this).children('.g_del').show();
    });
    $(".cont3").on('mouseleave', 'li', function () {
        $(this).removeClass('addLine');
        $(this).children('.g_del').hide();
    });

    //删除嘉宾
    $(".cont3").on('click', '.g_del', function () {
        var id = $(this).parent('li').attr('data-lid'),
            index = $(this).parent('li').index();
        if (id == '') {
            $(this).parent('li').remove();
            var gl = $(".cont3 li").length;
            if (gl > 0) {
                for (var n = 0; n < gl; n++) {
                    $('.cont3 li:eq(' + n + ') .g_num i').html(n + 1);
                }
            }
        } else {
            $('.guest_shade').show();
            $('.guest_shade .yes_btn').attr('data-id', id).attr('data-index', index);
        }

    });
    /********************报名设置*****************/
    //报名信息-添加
    $(".choice").on('click', 'button', function () {
        var liTxt = $(this).parent('span').text();
        var liId = $(this).parent('span').attr('data-id');

        var listr = '<li data-id="' + liId + '">\n' +
            '<div class="inp">\n' +
            '<span class="span1">' + liTxt + '</span>\n' +
            '<input type="text" disabled>\n' +
            '<span class="span2">文本框</span>\n' +
            '</div>\n' +
            '<span class="itemDel"></span>' +
            '</li>';
        $(".itemList").append(listr);
        $(this).parent('span').remove();
    });
    //报名信息-删除
    $(".itemList").on('click', '.itemDel', function () {
        var liTxt2 = $(this).siblings('.inp').children('.span1').text();
        var liId2 = $(this).parent('li').attr('data-id');
        console.log(liTxt2);

        var listr2 = '<span class="email" data-id="' + liId2 + '">' +
            '<span>' + liTxt2 + '</span>' +
            '<button></button>\n' +
            '</span>';
        $(".choice").append(listr2);
        $(this).parent('li').remove();

    });

});

//获取会议基本信息
function getMeetInfo() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confDetails.do',
        data: {
            conftoken: meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            $('#imghead').attr('src', urlstr + 'upload/' + res.row.cimg).attr('data-src', res.row.cimg).attr("data-state", 1);
            getMeetType(res.row.tname);
            $('#mName').val(res.row.cname);
            $('#st_time').attr('data-stime', res.row.days + ' ' + res.row.statime)
                .attr('data-etime', res.row.edays + ' ' + res.row.endtime)
                .val(res.row.days + ' ' + res.row.statime + ' ~ ' + res.row.edays + ' ' + res.row.endtime);
            $('#address').attr('data-lat', res.row.latitude)
                .attr('data-lng', res.row.longitude)
                .val(res.row.addr);
            $('#hoster').val(res.row.brief);
            $('#phone').val(res.row.touch);
        }
    })
}

function getMiaoshu() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: meetId,
            type: 1,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.row != null) {
                $('#editor .w-e-text').html(res.row.introd);
            }

        }
    })
}

//获取会议流程
function getFlow() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsFlow_web/listpage.do',
        data: {
            confsid: meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            flowID = res.row.length;
            if (res.row.length > 0) {
                for (var i = 0, html = ''; i < res.row.length; i++) {
                    var st = ZHDate(new Date(res.row[i].bhstart)),
                        et = ZHDate(new Date(res.row[i].bhend)),
                        at = st + ' ~ ' + et;
                    html += '<li id="flow1" data-id="' + i + '" data-lid="' + res.row[i].id + '" class="">' +
                        '<span class="circle" style="background: red;"></span>' +
                        '<div class="num">流程<i>' + (i + 1) + '</i></div>' +
                        '<div class="cont">' +
                        '<input class="slTime" id="ml_time1" type="text" placeholder="请选择流程时间" readonly="readonly" data-stime="' + st + '" data-etime="' + et + '"  value="' + at + '">' +
                        '<textarea placeholder="会议流程描述" class="tarea 1  required" id="ml_txt1">' + res.row[i].fname + '</textarea>' +
                        '</div>' +
                        '<div class="del" style="display: none;">' +
                        '<img src="img/mdel.png" alt="">删除' +
                        '</div>' +
                        '</li>';
                }
                $('.cont2 ul').html(html);
            }
        }

    })
}

//获取会议嘉宾
function getGuest() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsGuest_web/listpage.do',
        data: {
            confsid: meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            guestID = res.row.length;
            if (res.row.length > 0) {
                for (var i = 0, html = ''; i < res.row.length; i++) {
                    var imgName = res.row[i].gimg.split("/");
                    thisImg = imgName[imgName.length - 1];
                    html += '<li class="guest" id="guest' + i + '" data-lid="' + res.row[i].id + '">\n' +
                        ' <span class="circle" style="background: red;"></span>\n' +
                        ' <div class="g_num">嘉宾 <i>' + (i + 1) + '</i> </div>\n' +
                        ' <div id="guestImg' + i + '" class="g_img">\n' +
                        ' <div id="preview' + i + '"><img id="imghead' + i + '" data-state="1" src="' +urlstr+'upload/'+ res.row[i].gimg + '" data-src="' + thisImg + '"><input type="file" onchange="previewImage(this,' + i + ')"></div>\n' +
                        ' </div>\n' +
                        ' <div class="g_info">\n' +
                        ' <input class="g_name required" id="g_name' + i + '" type="text" placeholder="嘉宾名称" value="' + res.row[i].gname + '">\n' +
                        ' <input class="g_honer required" id="g_honer' + i + '" type="text" placeholder="嘉宾头衔" value="' + res.row[i].rank + '">\n' +
                        ' <textarea class="g_intro required" id="g_intro' + i + '" placeholder="嘉宾简介">' + res.row[i].brief + '</textarea>' +
                        ' </div>\n' +
                        ' <div class="g_del" style="display: none;">\n' +
                        ' <img src="img/mdel.png" alt="">删除\n' +
                        ' </div>\n' +
                        ' </li>';
                }
                $('.cont3 ul').html(html);
            }
        }

    })
}

//获取下期预告
function getReport() {
    $.ajax({
        type: 'post',
        url: urlstr + 'trailer_web/getAdvance.do',
        data: {
            confid: meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.row != null) {
                $('#editor2 .w-e-text').html(res.row.introd);
            }
        }

    })
}

//获取报名设置
function getPostname() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/getEnlist.do',
        data: {
            id: meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.row.shstart != '' && res.row.shend != '') {
                var st = ZHDate(new Date(res.row.shstart)),
                    et = ZHDate(new Date(res.row.shend)),
                    at = st + ' ~ ' + et;
                $('#name_time').attr('data-stime', st).attr('data-etime', et).val(at);
            }
            if (res.row.enlists.length > 2) {
                for (var i = 2, html = '', str = '1,2,'; i < res.row.enlists.length; i++) {
                    html += '<li data-id="' + res.row.enlists[i].id + '">' +
                        '<div class="inp">' +
                        '<span class="span1">' + res.row.enlists[i].ename + '</span>' +
                        '<input type="text" disabled="">' +
                        '<span class="span2">文本框</span>' +
                        '</div>\n' +
                        '<span class="itemDel"></span></li>'
                    str += res.row.enlists[i].id + ','
                }
                $('.itemList').append(html);
                getNameList(str);
            } else {
                getNameList('1,2,');
            }

        }

    })
}

function getNameList(str) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/selectEnlist.do',
        data: {
            enlist: str.slice(0, -1),
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res.row);
            for (var i = 0, html = ''; i < res.row.length; i++) {
                html += '<span class="email" data-id="' + res.row[i].id + '">' +
                    '    <span>' + res.row[i].ename + '</span>' +
                    '    <button></button>' +
                    '</span>'
            }
            $('.choice').html(html);
        }
    })
}


//获取会议类型
function getMeetType(str) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsType_web/listpage.do',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                var arr = res.row;
                if ((arr != '') && (arr != null)) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].tname == str) {
                            $("#mType").append("<option value='" + arr[i].id + "' data-id='" + arr[i].id + "' selected>" + arr[i].tname + "</option>");
                        } else {
                            $("#mType").append("<option value='" + arr[i].id + "' data-id='" + arr[i].id + "'>" + arr[i].tname + "</option>");
                        }


                    }
                }
            } else {
                alert(res.info);
            }
        }
    });
}

//发布会议
function postMeet() {
    if (JudgeInfo()) {
        var stime = $("#st_time").attr('data-stime'),
            etime = $("#st_time").attr('data-etime'),
            addVal = $("#address").val(),
            lat = $("#address").attr('data-lat'),
            lng = $("#address").attr('data-lng'),
            imgstr = '',
            intro = $("#editor .w-e-text").html();//会议描述
        var typeId = $('#mType option:selected').attr('data-id');
        console.log(typeId);

        $.ajax({
            type: 'post',
            url: urlstr + 'confs_web/addConfsInfoPc.do',
            data: {
                cimg: $('#imghead').attr('data-src'),
                type: typeId,
                cname: $.trim($("#mName").val()),
                bhend: etime,
                bhstart: stime,
                addr: $.trim($("#address").val()),
                brief: $.trim($("#hoster").val()),
                touch: $.trim($("#phone").val()),
                introd: intro,
                imgs: '',
                id: meetId,
                latitude: lat,
                longitude: lng,
                position: addVal,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    console.log(res);
                    alert('会议信息修改完成');
                    $(".cont1").hide();
                    $(".cont2").show();
                    $(".mFlow").addClass('active').siblings().removeClass('active');
                    //清空会议基本信息
                    $('#imghead').attr('data-src', 'img/upimg.png');

                    $("#mName").val('');
                    $("#address").val('');
                    $("#hoster").val('');
                    $("#phone").val('');
                    $("#editor").val('');

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

//判断基本信息是否正确
function JudgeInfo() {
    var Meimg = Mimg(),
        Metype = Mtype(),
        Mename = Mname(),
        Metime = Mtime(),
        Meaddr = Maddr(),
        Mezbf = Mzbf(),
        Mephone = PhoneCheck(),
        Memap = Mmap();
    if (Meimg && Metype && Mename && Metime && Mezbf && Meaddr && Mephone && Memap) {
        return true;
    } else if (!Meimg || !Metype || !Mename || !Metime || !Mezbf || !Meaddr || !Mephone || !Memap) {
        alert('您的会议信息填写有误，请确认!');
        return false;
    }
    // else if (!Metype) {
    //     alert('您的会议类型有误，请确认!');
    //     return false;
    // } else if (!Mename) {
    //     alert('您的名称有误，请确认!');
    //     return false;
    // } else if (!Metime) {
    //     alert('您的时间有误，请确认!');
    //     return false;
    // } else if (!Meaddr) {
    //     alert('您的地址信息有误，请确认!');
    //     return false;
    // } else if (!Mezbf) {
    //     alert('您的身份信息有误，请确认!');
    //     return false;
    // } else if (!Mephone) {
    //     alert('您的手机号有误，请确认!');
    //     return false;
    // }
}

//验证会议封面
function Mimg() {
    var img_state = $('#imghead').attr('data-state');
    if (img_state == 1) {
        $("#imghead").removeClass('requiredtype');
        return true
    } else {
        $("#imghead").addClass('requiredtype');
        return false
    }
}

//验证会议类型
function Mtype() {
    var meetType = $("#mType").val();
    if (meetType == 0) {
        $("#mType").addClass('requiredtype');
        return false
    } else {
        $("#mType").removeClass('requiredtype');
        return true
    }
}

function chiose(num) {
    if (num != 0) {
        $("#mType").removeClass('requiredtype');
    }
}

//验证会议名称
function Mname() {
    var Mname = $.trim($("#mName").val());
    if (!Mname) {
        $("#mName").addClass('requiredtype');
        return false;
    } else {
        $("#mName").removeClass('requiredtype');
        return true;
    }
}

//验证开始时间和结束时间
function Mtime() {
    var time = $("#st_time").attr('data-stime');
    if (time == '' || time == null) {
        $("#st_time").addClass('requiredtype');
        return false;

    } else {
        $("#st_time").removeClass('requiredtype');
        return true;
    }
}

//验证会议地点
function Maddr() {
    var Maddr = $.trim($("#address").val());
    if (!Maddr) {
        return false;
    } else {
        return true;
    }
}

//验证主办方
function Mzbf() {
    var Mzbf = $.trim($("#hoster").val());
    if (!Mzbf) {
        $("#hoster").addClass('requiredtype');
        return false;
    } else {
        $("#hoster").removeClass('requiredtype');
        return true;
    }
}

//验证手机号
function PhoneCheck() {
    var Mphone = $.trim($("#phone").val());
    if (!Mphone) {
        $("#phone").addClass('requiredtype');
        return false;
    } else if (!(/^1[3456789]\d{9}$/.test(Mphone))) {
        $("#phone").addClass('requiredtype');
        return false;
    } else {
        $("#phone").removeClass('requiredtype');
        return true;
    }
}

//验证地址信息
function Mmap() {
    var Mmap = $.trim($("#address").val());
    if (!Mmap) {
        $("#address").addClass('requiredtype');
        return false;
    } else {
        $("#address").removeClass('requiredtype');
        return true;
    }
}

//选择时间
function CTime(id) {
    $('#' + id).daterangepicker({
        "timePicker": true,
        "timePicker24Hour": true,
        "linkedCalendars": false,
        "autoUpdateInput": false,
        "drops": "down",
        "locale": {
            format: 'YYYY-MM-DD hh:mm:ss',
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        }
    }, function (start, end, label) {
        beginTimeStore = start;
        endTimeStore = end;
        console.log(this.startDate.format(this.locale.format));
        console.log(this.endDate.format(this.locale.format));


        if (!this.startDate) {
            this.element.val('');
        } else {
            // this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.val(GMTToStr(beginTimeStore) + this.locale.separator + GMTToStr(endTimeStore));
            $('#' + id).attr('data-stime', GMTToStr(beginTimeStore));
            $('#' + id).attr('data-etime', GMTToStr(endTimeStore));
            $("#flow" + id).attr('data-sTime', this.startDate.format(this.locale.format));
            $('#' + id).removeClass('requiredtype');
        }
    });
}

//保存下期预告
function saveYG() {
    var imgstr = '';
    var portVal = $("#editor2 .w-e-text").html();
    if (portVal == '<p><br></p>') {
        alert('请输入下期预告内容！');
    } else {
        $.ajax({
            type: 'post',
            url: urlstr + 'trailer_web/addAdvance.do',
            data: {
                confid: meetId,
                introd: portVal,
                imgs: imgstr == '' ? '' : imgstr.slice(0, -1),
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert(res.msg);
                    $(".cont5").show();
                    $(".cont4").hide();
                    $(".mNamed").addClass('active').siblings().removeClass('active');
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

//保存报名信息
function saveName() {
    $(".nameBtn").attr('disabled', true);
    var nsTime = $("#name_time").attr('data-stime');
    var neTime = $("#name_time").attr('data-etime');

    var l = $('.itemList li').length;
    for (var i = 0, enlist = ''; i < l; i++) {
        enlist += $(".itemList li:eq(" + i + ")").attr("data-id") + ',';
    }
    var nameTime = $("#name_time").attr('data-stime');
    if ((nameTime == '') || (nameTime == null)) {
        $("#name_time").addClass('requiredtype');
        alert('请选择报名时间！');
        $(".nameBtn").attr('disabled', false);
    } else {
        $("#name_time").removeClass('requiredtype');
        $.ajax({
            type: 'post',
            url: urlstr + 'confs_web/confsSystem.do',
            data: {
                enlist: enlist.slice(0, -1),
                id: meetId,
                shend: neTime,
                shstart: nsTime,
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert(res.msg);
                    $(".nameBtn").attr('disabled', false);
                } else if (res.error == 5) {
                    alert(res.msg);
                    $(".nameBtn").attr('disabled', false);
                    ReqToken(1);//不刷新
                } else {
                    alert(res.msg);
                }
            }
        })
    }

}


//保存会议流程
function saveFlow() {
    $(".saveFlow").attr('disabled', true);
    if (checkFlow()) {
        if (data2.length > 0) {
            $.ajax({
                type: 'post',
                url: urlstr + 'confsFlow_web/add_flowPc.do',
                data: {
                    array: JSON.stringify(data2),
                    confsid: meetId,
                    token: Token
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        alert(res.msg);
                        $(".saveFlow").attr('disabled', false);
                        for (var i = 0; i < res.row.length; i++) {
                            $(".cont2 li:eq(" + i + ")").attr('data-Lid', res.row[i].row);
                            $(".cont2 li:eq(" + i + ") .circle").css('background', 'red')
                        }
                        data2 = [];
                        $('.cont2 .required').removeClass('requiredtype');
                        $(".cont2").hide();
                        $(".cont3").show();
                        $(".mGuest").addClass('active').siblings().removeClass('active');
                    } else if (res.error == 5) {
                        alert(res.msg);
                        $(".saveFlow").attr('disabled', false);
                        ReqToken(1);
                    } else {
                        alert(res.msg);
                        $(".saveFlow").attr('disabled', false);
                    }
                }

            });
        } else {
            $(".saveFlow").attr('disabled', false);
            alert('请添加会议流程')
        }

    } else {
        $(".saveFlow").attr('disabled', false);
        alert('信息填写错误');
    }
}

//验证会议流程
function checkFlow() {
    var l = $(".cont2 li");
    for (var i = 0, isok = true; i < l.length; i++) {
        var txtVal = $(".cont2 li:eq(" + i + ") textarea").val();
        var sTime = $(".cont2 li:eq(" + i + ") input").attr('data-sTime');
        var eTime = $(".cont2 li:eq(" + i + ") input").attr('data-eTime');
        if (sTime == undefined || sTime == '') {
            $(".cont2 li:eq(" + i + ") input").addClass('requiredtype');
            isok = false;
        }
        if (txtVal == '') {
            $(".cont2 li:eq(" + i + ") textarea").addClass('requiredtype');
            isok = false;
        }
        var obj = {
            id: $(".cont2 li:eq(" + i + ")").attr('data-Lid'),
            fname: txtVal,
            bhstart: sTime,
            bhend: eTime
        };
        data2.push(obj);
    }
    if (isok) {
        return true
    } else {
        data2 = [];
        return false
    }

}

// 确定删除会议流程
function deletflow(obj) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsFlow_web/delete_flow.do',
        data: {
            flowid: obj.getAttribute('data-id'),
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var index = obj.getAttribute('data-index');
            $('.cont2 li:eq(' + index + ')').remove();
            $('.flow_shade').hide();
            $('.flow_shade .yes_btn').attr('data-id', '').attr('data-index', '');
            var fl = $(".cont2 li").length;
            if (fl > 0) {
                for (var n = 0; n < fl; n++) {
                    $('.cont2 li:eq(' + n + ') i').html(n + 1);
                }
            }
        }
    })
}

function goback() {
    $('.flow_shade').hide();
    $('.guest_shade').hide();
}

//保存会议嘉宾
function saveGuest() {
    $(".guestBtn").attr('disabled', true);
    // var meetId = sessionStorage.getItem("meetId");
    if (checkGuest()) {
        if (data3.length > 0) {
            $.ajax({
                type: 'post',
                url: urlstr + 'confsGuest_web/add_guestPc.do',
                data: {
                    array: JSON.stringify(data3),
                    confsid: meetId,
                    token: Token
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        alert(res.msg);
                        $(".guestBtn").attr('disabled', false);
                        for (var i = 0; i < res.row.length; i++) {
                            $(".cont3 li:eq(" + i + ")").attr('data-Lid', res.row[i].row);
                            $(".cont3 li:eq(" + i + ") .circle").css('background', 'red')
                        }
                        $('.cont3 .required').removeClass('requiredtype');
                        data3 = [];
                        $(".cont3").hide();
                        $(".cont4").show();
                        $(".mNext").addClass('active').siblings().removeClass('active');
                    } else if (res.error == 5) {
                        alert(res.info);
                        $(".guestBtn").attr('disabled', false);
                        ReqToken(1);
                    } else {
                        $(".guestBtn").attr('disabled', false);
                        alert(res.info);
                    }
                }

            });
        } else {
            $(".guestBtn").attr('disabled', false);
            alert('请添加会议嘉宾信息')
        }
    } else {
        alert('嘉宾信息填写不完整');
        $(".guestBtn").attr('disabled', false);
    }


}

//验证嘉宾
function checkGuest() {
    var arr = $(".cont3 li");
    for (var i = 0, isok = true; i < arr.length; i++) {
        var img = $(".cont3 li:eq(" + i + ") .g_img img").attr('data-state'),
            name = $(".cont3 li:eq(" + i + ") .g_name").val(),
            honer = $(".cont3 li:eq(" + i + ") .g_honer").val(),
            desc = $(".cont3 li:eq(" + i + ") .g_intro").val();
        if (img != 1) {
            $(".cont3 li:eq(" + i + ") .g_img img").addClass('requiredtype');
            isok = false;
        }
        if (name == '') {
            $(".cont3 li:eq(" + i + ") .g_name").addClass('requiredtype');
            isok = false;
        }
        if (honer == '') {
            $(".cont3 li:eq(" + i + ") .g_honer").addClass('requiredtype');
            isok = false;
        }
        if (desc == '') {
            $(".cont3 li:eq(" + i + ") .g_intro").addClass('requiredtype');
            isok = false;
        }
        var obj3 = {
            id: $(".cont3 li:eq(" + i + ")").attr("data-Lid"),
            gname: name,
            gimg: $(".cont3 li:eq(" + i + ") .g_img img").attr('data-src'),
            rank: honer,
            brief: desc
        };
        data3.push(obj3);
    }
    if (isok) {
        return true
    } else {
        data3 = [];
        return false
    }
}

// 确定删除会议嘉宾
function deletguest(obj) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsGuest_web/delete_guest.do',
        data: {
            guestid: obj.getAttribute('data-id'),
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var index = obj.getAttribute('data-index');
            $('.cont3 li:eq(' + index + ')').remove();
            $('.guest_shade').hide();
            $('.guest_shade .yes_btn').attr('data-id', '').attr('data-index', '');
            var gl = $(".cont3 li").length;
            if (gl > 0) {
                for (var n = 0; n < gl; n++) {
                    $('.cont3 li:eq(' + n + ') .g_num i').html(n + 1);
                }
            }
        }
    })
}


















