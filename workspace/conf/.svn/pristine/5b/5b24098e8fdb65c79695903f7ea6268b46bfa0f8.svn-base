$(function(){
	QueryFlow();//查询会议流程
	//编辑会议流程
	$("#flow_list_all").on('click','.flowEdit',function(){
		        var FlowId = $(this).attr('data-id');
        var index = $(this).parents('.fInfoList').index();
        var Stime = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').html();
        var Stimeyear = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').attr('data-year');
        var Stimemonth = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').attr('data-month');
        var Stimedate = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').attr('data-date');
        var Stimehour = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').attr('data-hour');
        var Stimeminute = $('#flow_list_all .fInfoList:eq(' + index + ') .flowStartTime').attr('data-minute');
        var Etime = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').html();
        var Etimeyear = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').attr('data-year');
        var Etimemonth = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').attr('data-month');
        var Etimedate = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').attr('data-date');
        var Etimehour = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').attr('data-hour');
        var Etimeminute = $('#flow_list_all .fInfoList:eq(' + index + ') .flowEndTime').attr('data-minute');
        var FlowMs = $('#flow_list_all .fInfoList:eq(' + index + ') .flowDesP').html();
        $('#editNumber').html(index + 1);
        $('#editFlowSTime').html(Stime).attr('data-hour', Stimehour).attr('data-minute', Stimeminute).attr('data-year', Stimeyear).attr('data-month', Stimemonth).attr('data-date', Stimedate);
        $('#editFlowETime').html(Etime).attr('data-hour', Etimehour).attr('data-minute', Etimeminute).attr('data-year', Etimeyear).attr('data-month', Etimemonth).attr('data-date', Etimedate);
        $('#editFlowTxt').val(FlowMs);
        $('#editSave').attr('data-id', FlowId);
        $('.haveFlow').hide();
        $('.editFlow').show();
	});
	//编辑流程-返回
	$('#editCancel').click(function () {
        $('.editFlow').hide();
        $('.haveFlow').show();
    });
    //编辑流程-保存
    $('#editSave').click(function () {
        var EditFlowId = $(this).attr('data-id');
        if ($('#editFlowSTime').html() == '请选择' || $('#editFlowETime').html() == '请选择' || $('#editFlowTxt').val() == '') {
            alert('信息填写有误，请确认');
        } else {
            var EFlowSTime = GetMeetTime(editFlowSTime);
            var EFlowETime = GetMeetTime(editFlowETime);
            if (TimeScor(EFlowSTime, EFlowETime)) {
                $.ajax({
                    type: 'post',
                    url: Urlstr + 'confsFlow_web/updata_flow.do',
                    data: {
                        bhstart: EFlowSTime,
                        bhend: EFlowETime,
                        flowid: EditFlowId,
                        fname: $('#editFlowTxt').val(),
                        token: Token
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.error == 0) {
                            alert(res.msg);
                            QueryFlow();
                            $('.editFlow').hide();
                            $('.haveFlow').show();

                        } else if (res.error == 5) {
                            alert(res.msg);
                            ReqToken();
                            Token = sessionStorage.getItem('token');
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            } else {
                alert('信息填写有误，请确认');
            }
        }
    });

    //删除流程弹框-打开
    $('#flow_list_all').on('click', '.flowDelete', function () {
        var index = $(this).parents(".fInfoList").index();
        var id = $(this).attr('data-id');
        $(".delShade").show();
        $(".delShadeCon").attr('data-id',id);
        $(".delShadeCon").attr('data-index',index);
        
    });
    //删除流程弹框-关闭
    $("#conCel").click(function(){
        $(".delShade").hide();
        $(".delShadeCon").attr('data-id','');
        $(".delShadeCon").attr('data-index','');
    });

    //删除流程
    $("#conSure").click(function(){
        var id = $(".delShadeCon").attr('data-id');
        var index = $(".delShadeCon").attr('data-index');
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsFlow_web/delete_flow.do',
            data: {
                flowid: id,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
            	alert(res.msg);
                if (res.error == 0) {
                    $('#flow_list_all .fInfoList:eq(' + index + ')').remove();
                    if ($('#flow_list_all .fInfoList').length > 0) {
                        for (var i = 0; i < $('#flow_list_all .fInfoList').length; i++) {
                            $('#flow_list_all .fInfoList:eq(' + i + ') .num').html(i + 1);
                        }
                    } else {
                        $('.haveFlow').hide();
                        $('.unhave').show();
                        $('.flowAdd').html('添加会议流程')
                    }

                     $(".delShadeCon").attr('data-id','');
                     $(".delShadeCon").attr('data-index','');
                     $(".delShade").hide();

                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                    Token = sessionStorage.getItem('token');
                } else {
                    alert(res.msg);
                }
            }
        });
    });

    //会议流程返回
    $(".flowFin").click(function(){
        if (NumAll.states == 1) {
            window.location.href = 'meetChoice.html?confsid=' + NumAll.confsid;
        } else {
            window.location.href = 'meetChoice2.html?confsid=' + NumAll.confsid;
        }
    });


});

//会议流程
function flowAdd(){
	$(".unhave").hide();
	$(".haveFlow").hide();
    $(".flowBtn").hide();
	$(".flowAddInfo").show();
}
//添加流程
function AddFlowList() {
    if ($('#flowStartTime').html() == '请选择' && $('#flowEndTime').html() == '请选择' && $('#flowDesTxt').val() == '') {
        var l = $(".haveFlow>div").length;
        $(".flowAddInfo").hide();
        $(".flowBtn").show();
        if(l == 0){
            $(".unhave").show();
        }else if(l > 0){
            $(".haveFlow").show();
        }
    }else if($('#flowStartTime').html() == '请选择' || $('#flowEndTime').html() == '请选择' || $('#flowDesTxt').val() == ''){   
         alert('信息填写有误，请确认');     
    }else {
        var FlowSTime = GetMeetTime(flowStartTime);
        var FlowETime = GetMeetTime(flowEndTime);
        var add_flow_num = $('.havaMeetFlow .flowInfo .fInfoList').length + 1;
        if (TimeScor(FlowSTime, FlowETime)) {
            $.ajax({
                type: 'post',
                url: Urlstr + 'confsFlow_web/add_flow.do',
                data: {
                    bhstart: FlowSTime,
                    bhend: FlowETime,
                    confsid: NumAll.confsid,
                    fname: $('#flowDesTxt').val(),
                    token: Token
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        console.log(res);
                        $('.flowAddInfo').hide();
                        $(".flowBtn").show();
                        QueryFlow();

                        $('#flowStartTime').html('请选择');
                        $('#flowEndTime').html('请选择');
                        $('#flowDesTxt').val('');
                        $('.flowAdd').html('继续添加会议流程')
                    } else if (res.error == 5) {
                        alert(res.msg);
                        ReqToken();
                        Token = sessionStorage.getItem('token');
                    } else {
                        alert(res.msg);
                    }

                }
            });
        } else {
            alert('信息填写有误，请确认');
        }
    }
}

//查询会议流程
function QueryFlow() {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsFlow_web/listpage.do',
        data: {
            confsid: NumAll.confsid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                //console.log(res.row);
                if (res.row.length > 0) {
                    $('.unhave').hide();
                    $('.haveFlow').show();
                    var htmlstr = '';
                    for (var i = 0; i < res.row.length; i++) {
                        var Stime = ZHDate(new Date(res.row[i].bhstart));
                        var Etime = ZHDate(new Date(res.row[i].bhend));
                        var Stimehour = ZHhour(new Date(res.row[i].bhstart));
                        var Stimeminute = ZHminute(new Date(res.row[i].bhstart));
                        var Etimehour = ZHhour(new Date(res.row[i].bhend));
                        var Etimeminute = ZHminute(new Date(res.row[i].bhend));
                        htmlstr += `
                                 <div class="fInfoList">
                                   <ul>
                                      <li class="flow" id="flow" style="height: 0.68rem;line-height: 0.68rem;">
                                          <span>
                                              流程
                                              <span class="num">${i + 1}</span>
                                              <span class="flowEdit" data-id="${res.row[i].id}"></span>
                                              <span class="flowDelete" data-id="${res.row[i].id}"></span>
                                          </span>
                                      </li>
                                      <li class="fStartTime">
                                          <span>开始时间<b>*</b></span>
                                          <span class="flowStartTime" data-year="${ZHyear(new Date(res.row[i].bhstart))}" data-month="${ZHmonth(new Date(res.row[i].bhstart))}" data-date="${ZHdate(new Date(res.row[i].bhstart))}" data-hour="${Stimehour}" data-minute="${Stimeminute}">${Stime}</span>
                                      </li>
                                      <li class="fEndTime">
                                          <span>结束时间<b>*</b></span>
                                          <span class="flowEndTime" data-year="${ZHyear(new Date(res.row[i].bhend))}" data-month="${ZHmonth(new Date(res.row[i].bhend))}" data-date="${ZHdate(new Date(res.row[i].bhend))}" data-hour="${Etimehour}" data-minute="${Etimeminute}">${Etime}</span>
                                      </li>
                                      <li class="flowDes" style="max-height: 2.67rem;padding-bottom: 0.2rem;border: 0;">
                                          <span>流程描述<b>*</b></span>
                                          <p class="flowDesP">${res.row[i].fname}</p>
                                      </li>
                                   </ul>
                                 </div>`;
                        $('.haveFlow').html(htmlstr);
                        $('.flowAdd').html('继续添加会议流程');
                    }
                } else {
                    $('.unhave').show();
                    $(".flowBtn").show();
                    $('.haveFlow').hide();
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
            } else {
                alert(res.msg);
            }
        }
    });
}


/**********************公共函数**********************/
//获取时间
function GetMeetTime(timeid) {
    var time_y = $(timeid).attr('data-year'),
        time_m = $(timeid).attr('data-month'),
        time_d = $(timeid).attr('data-date') * 1 < 10 ? '0' + $(timeid).attr('data-date')*1 : $(timeid).attr('data-date'),
        time_h = $(timeid).attr('data-hour') * 1 < 10 ? '0' + $(timeid).attr('data-hour')*1 : $(timeid).attr('data-hour'),
        time_mi = $(timeid).attr('data-minute') * 1 < 10 ? '0' + $(timeid).attr('data-minute')*1 : $(timeid).attr('data-minute');
    var time = time_y + '-' + time_m + '-' + time_d + ' ' + time_h + ':' + time_mi;
    return time;
}

// 时间对比
function TimeScor(Stime, Etime) {
    // var time1 = Date.parse(Stime);
    var time1 = new Date(Stime.replace(/-/g, '/')).getTime();
    // var time2 = Date.parse(Etime);
    var time2 = new Date(Etime.replace(/-/g, '/')).getTime();
    if (time1 < time2) {
        return true;
    } else {
        return false;
    }
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

//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
function ZHyear(now) {
    var year = now.getYear();
    return "20" + year.toString().slice(1, 3);
}
function ZHmonth(now) {
    var month = now.getMonth() + 1;
    return month;
}
function ZHdate(now) {
    var date = now.getDate();
    return date;
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

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login3.html", function () {
        $('#reqtoken').show();
    });
}