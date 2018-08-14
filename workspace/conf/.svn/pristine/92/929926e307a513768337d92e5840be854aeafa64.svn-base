$(function () {
    MeetTitle();
    getInfo();

})

// 获取会议基本信息
function getInfo() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/confDetails.do',
        data: {
            conftoken: NumAll.id,
            token: Token,
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.tname == undefined) {
                    return
                } else {
                    $('#typeId').attr('data-id', res.row.typeid);
                    $('#typeId').html(res.row.tname);
                    $('#Mname').val(res.row.cname);
                    $('#Maddr').val(res.row.addr);
                    $('#Mzbf').val(res.row.brief);
                    $('#Mphone').val(res.row.touch);
                    $("#mapShow").val(res.row.position);
                    $('#headimg img').attr('src', Urlstr + 'upload/' + res.row.cimg);
                    $('#headimg').attr('data-src', res.row.cimg);
                    $('#map').attr('data-name', res.row.position).attr('data-loca', res.row.latitude + ',' + res.row.longitude);
                    $('iframe').attr('data-name', res.row.position).attr('data-loca', res.row.latitude + ',' + res.row.longitude);
                    // 开始时间
                    var syear = res.row.days.slice(0, 4),
                        smonth = res.row.days.slice(5, 7),
                        sdate = res.row.days.slice(8, 10),
                        shour = res.row.statime.slice(0, 2),
                        sminute = res.row.statime.slice(3, 5);
                    var stime = syear + '年' + smonth + '月' + sdate + '日 ' + shour + '时' + sminute + '分';
                    $('#mStartTime').html(stime);
                    $('#mStartTime').attr('data-year', syear).attr('data-month', smonth).attr('data-date', sdate).attr('data-hour', shour).attr('data-minute', sminute);
                    // 结束时间
                    var eyear = res.row.edays.slice(0, 4),
                        emonth = res.row.edays.slice(5, 7),
                        edate = res.row.edays.slice(8, 10),
                        ehour = res.row.endtime.slice(0, 2),
                        eminute = res.row.endtime.slice(3, 5);
                    var etime = eyear + '年' + emonth + '月' + edate + '日 ' + ehour + '时' + eminute + '分';
                    $('#mEndTime').html(etime);
                    $('#mEndTime').attr('data-year', eyear).attr('data-month', emonth).attr('data-date', edate).attr('data-hour', ehour).attr('data-minute', eminute);
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


/************************* 会议基本信息 验证及提交**********************/

// 提交会议基本信息
function PostMeet() {
    var val = $("iframe").attr('data-loca').split(",");
    var lat = val[0];
    var lng = val[1];

    if (JudgeInfo()) {
        $.ajax({
            type: 'POST',
            url: Urlstr + 'confs_web/storageConfsInfo.do',
            data: {
                addr: $.trim($("#Maddr").val()),
                bhend: GetMeetTime('#mEndTime'),
                bhstart: GetMeetTime('#mStartTime'),
                brief: $.trim($("#Mzbf").val()),
                cimg: $('#headimg').attr('data-src'),
                cname: $.trim($("#Mname").val()),
                id: NumAll.id,
                latitude: lat,
                longitude: lng,
                position: $("iframe").attr('data-name'),
                touch: $.trim($("#Mphone").val()),
                type: $('#typeId').attr('data-id'),
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    console.log(res);
                    alert(res.msg);
                    window.location.href = 'meetChoice.html?confsid=' + res.row;
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
        Memap = Mmap(),
        Mezbf = Mzbf(),
        Mephone = PhoneCheck();
    if (Meimg && Metype && Mename && Metime && Mezbf && Meaddr && Mephone && Memap) {
        return true;
    } else if (!Meimg) {
        alert('您的图片有误，请确认!');
        return false;
    } else if (!Metype) {
        alert('您的会议类型有误，请确认!');
        return false;
    } else if (!Mename) {
        alert('您的名称有误，请确认!');
        return false;
    } else if (!Metime) {
        alert('您的时间有误，请确认!');
        return false;
    } else if (!Memap) {
        alert('您的地图信息有误，请确认!');
        return false;
    } else if (!Meaddr) {
        alert('您的地址信息有误，请确认!');
        return false;
    } else if (!Mezbf) {
        alert('您的身份证信息有误，请确认!');
        return false;
    } else if (!Mephone) {
        alert('您的手机号有误，请确认!');
        return false;
    }
}

//验证地图
function Mmap() {
    var mapName = $("iframe").attr('data-name');
    var mapPos = $("iframe").attr('data-loca');
    if (!mapName && !mapPos) {
        return false;
    } else {
        return true;
    }
}

//验证会议封面
function Mimg() {
    var img_state = $('#headimg').attr('data-state');
    if (img_state != '') {
        return true
    } else {
        return false
    }
}

//验证会议类型
function Mtype() {
    var meetType = $('.typeId').html();
    if (meetType == '请选择') {
        return false
    } else {
        return true
    }
}

//验证会议名称
function Mname() {
    var Mname = $.trim($("#Mname").val());
    if (!Mname) {
        return false;
    } else {
        return true;
    }
}

//验证开始时间和结束时间
function Mtime() {
    //console.log($('#mStartTime').html(), $('#mEndTime').html());
    if ($('#mStartTime').html() == '请选择' || $('#mEndTime').html() == '请选择') {
        return false
    }
    var Stime = GetMeetTime('#mStartTime');
    var Etime = GetMeetTime('#mEndTime');
    var Scor = TimeScor(Stime, Etime);
    return Scor
}

//验证会议地点
function Maddr() {
    var Maddr = $.trim($("#Maddr").val());
    if (!Maddr) {
        return false;
    } else {
        return true;
    }
}

//验证主办方
function Mzbf() {
    var Mzbf = $.trim($("#Mzbf").val());
    if (!Mzbf) {
        return false;
    } else {
        return true;
    }
}

//验证手机号
function PhoneCheck() {
    var Mphone = $.trim($("#Mphone").val());
    if (!Mphone) {
        return false;
    } else if (!(/^1[345789]\d{9}$/.test(Mphone))) {
        return false;
    } else {
        return true;
    }
}


// 会议类型选择
function MeetTitle() {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsType_web/listpage.do',
        data: {
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            //console.log(res);
            if (res.error == 0) {
                var data = [];
                for (var i = 0; i < res.row.length; i++) {
                    var obj = {'id': res.row[i].id, 'value': res.row[i].tname};
                    data.push(obj);
                }
                //console.log(data);
                var meetType = document.querySelector('#meetType');
                var meetTypeId = document.querySelector('#typeId');
                meetType.addEventListener('click', function () {
                    var bankId = meetType.dataset['id'];
                    var bankName = meetType.dataset['value'];

                    var bankSelect = new IosSelect(1,
                        [data],
                        {
                            container: '.container',
                            title: '会议类型',
                            itemHeight: 50,
                            itemShowCount: 3,
                            oneLevelId: bankId,
                            callback: function (selectOneObj) {
                                meetTypeId.innerHTML = selectOneObj.value;
                                $('#typeId').attr('data-id', selectOneObj.id);
                                $('#typeId').addClass('heise');
                            }
                        });
                });
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();

            } else {
                alert(res.msg);
            }
        }
    })
    // var data = [
    //     {'id': '10001', 'value': '年会'},
    //     {'id': '10002', 'value': '论坛'},
    //     {'id': '10003', 'value': '峰会'},
    //     {'id': '10004', 'value': '培训会'},
    //     {'id': '10005', 'value': '行业会'},
    //     {'id': '10006', 'value': '发布会'},
    //     {'id': '10007', 'value': '品牌会议'},
    //     {'id': '10008', 'value': '经销商会'},
    //     {'id': '10009', 'value': '其他'}
    // ];
    //
    // var meetType = document.querySelector('#meetType');
    // var meetTypeId = document.querySelector('#typeId');
    // meetType.addEventListener('click', function () {
    //     var bankId = meetType.dataset['id'];
    //     var bankName = meetType.dataset['value'];
    //
    //     var bankSelect = new IosSelect(1,
    //         [data],
    //         {
    //             container: '.container',
    //             title: '请选择',
    //             itemHeight: 50,
    //             itemShowCount: 3,
    //             oneLevelId: bankId,
    //             callback: function (selectOneObj) {
    //                 meetTypeId.innerHTML = selectOneObj.value;
    //             }
    //         });
    // });
}

/************************* 公共函数**********************/

//获取时间
function GetMeetTime(timeid) {
    var time_y = $(timeid).attr('data-year'),
        time_m = $(timeid).attr('data-month'),
        time_d = $(timeid).attr('data-date'),
        time_h = $(timeid).attr('data-hour') < 10 ? '0' + $(timeid).attr('data-hour') : $(timeid).attr('data-hour'),
        time_mi = $(timeid).attr('data-minute') < 10 ? '0' + $(timeid).attr('data-minute') : $(timeid).attr('data-minute');
    var time = time_y + '-' + time_m + '-' + time_d + ' ' + time_h + ':' + time_mi;
    return time;
}

// 时间对比
function TimeScor(Stime, Etime) {
    // var time1 = Date.parse(Stime)/1000;
    var time1 = new Date(Stime.replace(/-/g, '/')).getTime();
    // var time2 = Date.parse(Etime)/1000;
    var time2 = new Date(Etime.replace(/-/g, '/')).getTime();
    if (time1 < time2) {
        return true;
    } else {
        return false;
    }
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login3.html", function () {
        $('#reqtoken').show();
    });
}

// 时间戳转时间
function ZHDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return "20" + year.toString().slice(1, 3) + "年" + month + "月" + date + "日 " + hour + "时" + minute + "分";
}

// 获取小时
function ZHhour(now) {
    var hour = now.getHours();
    return hour;
}

// 获取分钟
function ZHminute(now) {
    var minute = now.getMinutes();
    return minute;
}