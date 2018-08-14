// var Urlstr = 'http://192.168.2.238:8080/conf/',
//     NumAll = GetRequest(),
//     Token = sessionStorage.getItem('token');       //用户token
$(function () {
    MeetTitle();

    //地图返回
    $("#light-navi-wrapper").on('click','.back',function(){
        $('#pubMeet').show();
        $("#light-navi-wrapper").hide();

    });
});


/************************* 下期预告**********************/
function mNext() {
    if (JudgeInfo()) {
        $('#pubMeet').hide();
        $('#meetNext').show();
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
                    
                    $("#content").html(res.row.introd);
                   
                    
                    // $('#nextdetail').val(res.row.introd);
                    // console.log(res.row.imgs);
                    // if(res.row.imgs != ''){
                    //     var ImgList = res.row.imgs.split(',');
                    //     console.log(ImgList);
                    //     var htmlstr = '';
                    //     Nextimgid = ImgList.length;
                    //     for (var i = 0; i < ImgList.length; i++) {
                    //         htmlstr += `<div class="nextshuing">
                    //                     <img id="nextimghead${i}" src="${Urlstr}upload/${ImgList[i]}" data-img="${ImgList[i]}">
                    //                 </div>`;
                    //     }
                    //     $('#nextaddimg').html(htmlstr);
                    // }
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                } else {
                    alert(res.msg);
                }
            }
        });
    } else {
        alert('请先填写会议基本信息的必填项');
    }
}

//下期预告返回
function meetNext_back() {
    var desD_content = $('#nextdetail').val();
    if (desD_content != '') {
        $('#meetNext').hide();
        $('#pubMeet').show();
        $('#mNext p').html('已修改 <s></s>');
    } else {
        $('#meetNext').hide();
        $('#pubMeet').show();
        $('#mNext p').html('修改 <s></s>');
    }
}

//下期预告保存
function meetNextSave() {
    var imgstr = '';
    var desD_content = $("#content").html();
    console.log(desD_content);
    var l = $("#meetNext #content>div").length;

    if (l == 1){
        $("#meetNext").hide();
        $("#pubMeet").show();
    }else {
        $.ajax({
            type: 'post',
            url: Urlstr + 'trailer_web/addAdvance.do',
            data: {
                confid: NumAll.confsid,
                introd: desD_content,
                imgs: imgstr == '' ? '' : imgstr.slice(0, -1),
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert('保存成功');
                    $('#meetNext').hide();
                    $('#pubMeet').show();
                    $('#mNext p').html('已修改 <s></s>');
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

/************************* 报名设置 start**********************/
function mAddName() {
    // $('#pubMeet').hide();
    // $('#addName').show();
    if (JudgeInfo()) {
        $('#pubMeet').hide();
        $('#addName').show();
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
                    console.log(res);
                    if(res.row.shstart!=''&&res.row.shend!=''){
                        var Stime = ZHDate2(new Date(res.row.shstart));
                        var Etime = ZHDate2(new Date(res.row.shend));
                        $('#nameStartTime').html(Stime.time).attr('data-year', Stime.year).attr('data-month', Stime.month).attr('data-date', Stime.date).attr('data-hour', Stime.hour).attr('data-minute', Stime.minute);
                        $('#nameEndTime').html(Etime.time).attr('data-year', Etime.year).attr('data-month', Etime.month).attr('data-date', Etime.date).attr('data-hour', Etime.hour).attr('data-minute', Etime.minute);
                        // $('#nStartTime').css('pointer-events','none');
                    } 
                     var enlist = '1,2,';
                    if (res.row.enlists.length > 2) {
                        var htmlstr = '';
                        for (var i = 0; i < res.row.enlists.length; i++) {
                            htmlstr += `<li>
                                            <span data-id="${res.row.enlists[i].id}">${res.row.enlists[i].ename}</span>
                                            <button></button>
                                        </li>`;
                            enlist += `${res.row.enlists[i].id},`;
                        }
                        $('.infoContent ul').html(htmlstr);
                        $('.infoContent ul li:eq(0) button').hide();
                        $('.infoContent ul li:eq(1) button').hide();
                        enlists(enlist);
                    } else {
                        enlists(enlist);
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
    } else {
        alert('请先填写会议基本信息的必填项');
    }
}

function BMsave() {
    if ($('#nameStartTime').html() == '请选择' && $('#nameEndTime').html() == '请选择'){
        $("#addName").hide();
        $("#pubMeet").show();
    }else if ($('#nameStartTime').html() == '请选择' || $('#nameEndTime').html() == '请选择') {
        alert('时间填写有误，请确认');
    } else {
        var BMSTime = GetMeetTime(nameStartTime);
        var BMETime = GetMeetTime(nameEndTime);
        //console.log(BMSTime,BMSTime);
        if (TimeScor(BMSTime, BMETime)) {
            var list = $('.infoContent li');
            for (var i = 0, enlist = ''; i < list.length; i++) {
                enlist += $('.infoContent ul li:eq(' + i + ') span').attr('data-id') + ',';
            }
            $.ajax({
                type: 'post',
                url: Urlstr + 'confs_web/confsSystem.do',
                data: {
                    enlist: enlist.slice(0, -1),
                    id: NumAll.confsid,
                    shend: BMETime,
                    shstart: BMSTime
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        alert('已保存');
                        $('#pubMeet').show();
                        $('#addName').hide();
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
            alert('时间填写有误，请确认');
        }
    }
}

function enlists(str) {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confs_web/selectEnlist.do',
        data: {
            enlist: str.slice(0, -1),
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var htmlstr = '';
            for (var i = 0; i < res.row.length; i++) {
                htmlstr += `<li>
                             <span data-id="${res.row[i].id}">${res.row[i].ename}</span>
                              <button></button>
                           </li>`;
            }
            $('.defind ul').html(htmlstr);
        }
    });
}

//报名设置返回
function BMCancel(){
    $('#pubMeet').show();
    $('#addName').hide();
}

/************************* 会议嘉宾增删改 start**********************/
//会议嘉宾列表查询
function mGuest() {
    if (JudgeInfo()) {
        $('#pubMeet').hide();
        $('#meetGuest').show();
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsGuest_web/listpage.do',
            data: {
                confsid: NumAll.confsid,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    console.log(res);
                    if (res.row.length > 0) {
                        $('.haveGuest').show();
                        $('.unHaveGuest').hide();
                        var htmlstr = '';
                        for (var i = 0; i < res.row.length; i++) {
                            htmlstr += `<div class="gInfoList">
                                    <ul>
                                     <li class="guest">
                                        <span class="gueInfo">
                                            嘉宾
                                            <span class="guestNum">${i + 1}</span>
                                            <span class="guestEdit" data-id="${res.row[i].id}"></span>
                                            <span class="guestDel" data-id="${res.row[i].id}"></span>
                                        </span>
                                     </li>
                                     <li class="guestName">
                                         <span>嘉宾名称<b>*</b></span>
                                         <span class="guestNameInfo">${res.row[i].gname}</span>
                                     </li>
                                     <li class="guestHonor">
                                         <span>嘉宾头衔<b>*</b></span>
                                         <span class="guestHonorInfo">${res.row[i].rank}</span>
                                     </li>
                                     <li id="personImg" class="guePhoto">
                                         <span>嘉宾照片<b>*</b></span>
                                         <div id="perImg" class="perImg G_img">
                                             <img src="${Urlstr}upload/${res.row[i].gimg}" class="perImgHead" data-img="${res.row[i].gimg}">
                                         </div>
                                     </li>
                                     <li class="introduce">
                                         <span>嘉宾简介</span>
                                         <p>${res.row[i].brief}</p>
                                     </li>
                                   </ul>
                                  </div>`;
                        }
                        $('.haveGuest .guestInfo').html(htmlstr);
                    } else {
                        $('.unHaveGuest').show();
                        $('.haveGuest').hide();
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
    } else {
        alert('请先填写会议基本信息的必填项');
    }
}

//会议嘉宾列表返回
function GuestBack() {
    $('#meetGuest').hide();
    $('#pubMeet').show();
    if ($('.haveGuest .guestInfo .gInfoList').length > 0) {
        $('#mGuest p').html('已填写 <s></s>');
    } else {
        $('#mGuest p').html('请填写会议嘉宾  <s></s>');
    }
}

//会议嘉宾添加
function AddGuest() {
    $('.guestList').hide();
    $('.addGuestInfo').show();
    var num = $('.haveGuest .guestInfo .gInfoList').length;
    $('#gueInfonum').html(num + 1);
}

//会议嘉宾添加取消
function guestReturn() {
    $('.addGuestInfo').hide();
    $('.guestList').show();
}

//会议嘉宾添加保存
function AddGuestSave() {
    var G_name = $('#addguestName').val(),
        G_honor = $('#addguestHonor').val(),
        G_img = $('#perImgHead').attr('data-state'),
        G_miaoshu = $('#addguestDesTxt').val();
    if (G_name != '' && G_honor != '' && G_img == 1) {
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsGuest_web/add_guest.do',
            data: {
                brief: G_miaoshu,
                confsid: NumAll.confsid,
                gimg: $('#perImgHead').attr('data-img'),
                gname: G_name,
                rank: G_honor,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    // console.log(res);
                    mGuest();
                    $('.addGuestInfo').hide();
                    $('.guestList').show();
                    $('#addguestName').val('');
                    $('#addguestHonor').val('');
                    $('#addguestDesTxt').val('');
                    $('#addperImg').append('<p class="guePhotoUp">请上传</p>');
                    $('#addperImg img').attr('src', 'img/tm.png');

                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                    Token = sessionStorage.getItem('token');
                } else {
                    alert(res.msg);
                }
            }
        });
    }else if(G_name == '' && G_honor == '' && G_img != 1){
        $(".addGuestInfo").hide();
        $(".guestList").show();
    }else {
        alert('嘉宾信息填写有误，请确认');
    }
}

// 会议嘉宾修改返回
function editReturn() {
    $('.editGuest').hide();
    $('.haveGuest').show();
}




/************************* 会议流程增删改 start**********************/
//会议流程添加
function mFlow() {
    // $('#meetFlow').show();
    // $('#pubMeet').hide();
    QueryFlow();
    if (JudgeInfo()) {
        $('#meetFlow').show();
        $('#pubMeet').hide();
    } else {
        alert('请先填写会议基本信息的必填项');
    }
}

// 会议流程返回
function addflow_back() {
    $('#meetFlow').hide();
    $('#pubMeet').show();
    if ($('.havaMeetFlow .flowInfo .fInfoList').length > 0) {
        $('#mFlow p').html('已填写<s></s>');
    } else {
        $('#mFlow p').html('请填写会议流程 <s></s>');
    }
}

// 添加会议流程中的返回
function clearFlow() {
    $('.addFlowInfo').hide();
    if ($('.havaMeetFlow .flowInfo .fInfoList').length > 0) {
        $('.havaMeetFlow').show();
    } else {
        $('.unHave').show();
    }

}

//添加会议流程
function AddFlow() {
    $('.unHave').hide();
    $('.havaMeetFlow').hide();
    var flow_num = $('.havaMeetFlow .flowInfo .fInfoList').length;
    $('#Addflowlist span').html('流程' + (flow_num + 1));
    $('.addFlowInfo').show();
}

//保存会议流程
function AddFlowList() {
    if ($('#flowStartTime').html() == '请选择' && $('#flowEndTime').html() == '请选择' && $('#flowDesTxt').val() == '') {
        $('.addFlowInfo').hide();
        $(".havaMeetFlow").show();
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
                        $('.unHave').hide();
                        $('.havaMeetFlow').show();
                        $('.addFlowInfo').hide();
                        QueryFlow();
                        // var htmlstr = `
                        //         <div class="fInfoList">
                        //           <ul>
                        //              <li class="flow" id="flow" style="height: 0.68rem;line-height: 0.68rem;">
                        //                  <span>
                        //                      流程
                        //                      <span class="num">${add_flow_num}</span>
                        //                      <span class="flowEdit" data-id="${res.row}"></span>
                        //                      <span class="flowDelete" data-id="${res.row}"></span>
                        //                  </span>
                        //              </li>
                        //              <li class="fStartTime">
                        //                  <span>开始时间<b>*</b></span>
                        //                  <span class="flowStartTime">${$('#flowStartTime').html()}</span>
                        //              </li>
                        //              <li class="fEndTime">
                        //                  <span>结束时间<b>*</b></span>
                        //                  <span class="flowEndTime">${$('#flowEndTime').html()}</span>
                        //              </li>
                        //              <li class="flowDes" style="height: 2.67rem">
                        //                  <span>流程描述<b>*</b></span>
                        //                  <p class="flowDesP">${$('#flowDesTxt').val()}</p>
                        //              </li>
                        //           </ul>
                        //         </div>`;
                        // $('#flow_list_all').append(htmlstr);
                        $('#flowStartTime').html('请选择');
                        $('#flowEndTime').html('请选择');
                        $('#flowDesTxt').val('');
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
                    $('.unHave').hide();
                    $('.havaMeetFlow').show();
                    var htmlstr = '';
                    for (var i = 0; i < res.row.length; i++) {
                        var Stime = ZHDate(new Date(res.row[i].bhstart));
                        var Etime = ZHDate(new Date(res.row[i].bhend));
                        var Stimehour = ZHhour(new Date(res.row[i].bhstart));
                        var Stimeminute = ZHminute(new Date(res.row[i].bhstart));
                        var Etimehour = ZHhour(new Date(res.row[i].bhend));
                        var Etimeminute = ZHminute(new Date(res.row[i].bhend));
                        //console.log(Stime,Etime);
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
                        $('#flow_list_all').html(htmlstr);
                    }
                } else {
                    $('.unHave').show();
                    $('.havaMeetFlow').hide();
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

/************************* 会议描述增删改 start**********************/
//会议描述添加
function mdes() {
    // $('#meetDes').show();
    // $('#pubMeet').hide();
    if (JudgeInfo()) {
        $('#meetDes').show();
        $('#pubMeet').hide();
        $.ajax({
            type: 'post',
            url: Urlstr + 'confs_web/confRim.do',
            data: {
                conftoken: NumAll.confsid,
                type: 1,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.error == 0) {
                    if(res.row.introd != null){
                        $("#content2").html(res.row.introd);
                    }
                    

                    // $('#detail').val(res.row.introd);
                    // var ImgList = res.row.imgs.split(',');
                    // console.log(ImgList);
                    // var htmlstr = '';
                    // Desimgid = ImgList.length;
                    // for (var i = 0; i < ImgList.length; i++) {
                    //     htmlstr += `<div class="miaoshuing">
                    //                     <img id="Desimghead${i}" src="${Urlstr}upload/${ImgList[i]}" data-img="${ImgList[i]}">
                    //                 </div>`;
                    // }
                    // $('#addimg').html(htmlstr);





                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                } else {
                    // alert(res.msg);
                }
            }
        });
    } else {
        alert('请先填写会议基本信息的必填项');
    }
}

//保存会议描述
function meetDes() {
    var imgstr = '';
    var inpVal = $(".descript #target").val();

    var desD_content = $('#content2').html();
    
    if(inpVal == ''){
        $("#meetDes").hide();
        $("#pubMeet").show();
    }else{
       $.ajax({
            type: 'post',
            url: Urlstr + 'confs_web/addIntrod.do',
            data: {
                id: NumAll.confsid,
                introd: desD_content,
                imgs: imgstr == '' ? '' : imgstr.slice(0, -1),
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert('保存成功');
                    $('#meetDes').hide();
                    $('#pubMeet').show();
                    $('#mDes p').html('已填写<s></s>');
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

//会议描述返回
function meetDes_back() {
    var desD_content = $('#detail').val();
    if (desD_content != '') {
        $('#meetDes').hide();
        $('#pubMeet').show();
        $('#mDes p').html('已填写 <s></s>');
    } else {
        $('#meetDes').hide();
        $('#pubMeet').show();
        $('#mDes p').html('请填写会议描述 <s></s>');
    }

}

/************************* 会议基本信息 验证及提交**********************/

// 提交会议基本信息
function PostMeet() {
    alert(111);
    var val = $("iframe").attr('data-loca').split(",");
    var lat = val[0];
    var lng = val[1];

    if (JudgeInfo()) {
        $.ajax({
            type: 'POST',
            url: Urlstr + 'confs_web/addConfsInfo.do',
            data: {
                addr: $.trim($("#Maddr").val()),
                bhend: GetMeetTime('#mEndTime'),
                bhstart: GetMeetTime('#mStartTime'),
                brief: $.trim($("#Mzbf").val()),
                cimg: $('#headimg').attr('data-src'),
                cname: $.trim($("#Mname").val()),
                id: NumAll.confsid,
                latitude:lat,
                longitude:lng,
                position:$.trim($("#mapShow").val()),
                touch: $.trim($("#Mphone").val()),
                type: $('#typeId').attr('data-id'),
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    console.log(res);
                    alert(res.msg);
                    $(".bt").hide();
                    window.location.href = 'meetChoice2.html?confsid=' + res.row;
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
        Memap = Mmap(),
        Mephone = PhoneCheck();
    if (Meimg && Metype && Mename && Metime && Meaddr && Mezbf && Mephone && Memap) {
        return true;
    } else if(!Meimg){
        alert('您的图片有误，请确认!');
        return false;
    } else if(!Metype){
        alert('您的会议类型有误，请确认!');
        return false;
    } else if(!Mename){
        alert('您的名称有误，请确认!');
        return false;
    } else if(!Metime){
        alert('您的时间有误，请确认!');
        return false;
    } else if(!Memap) {
        alert('您的地图信息有误，请确认!');
        return false;
    } else if(!Meaddr) {
        alert('您的地址信息有误，请确认!');
        return false;
    }else if(!Mezbf){
        alert('您的身份证信息有误，请确认!');
        return false;
    } else if(!Mephone){
        alert('您的手机号有误，请确认!');
        return false;
    }
}

//验证地图
function Mmap(){
    var mapName = $("iframe").attr('data-name');
    var mapPos = $("iframe").attr('data-loca');
    if(!mapName && !mapPos){
        return  false;
    }else{
        return true;
    }
}

//验证会议封面
function Mimg() {
    var img_state = $("#headimg").attr('data-src');
    if (img_state != '') {
        return true;
    } else {
        return false;
    }
}

//验证会议类型
function Mtype() {
    var meetType = $('.typeId').html();
    if (meetType == '请选择') {
        return false;
    } else {
        return true;
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
        return false;
    }
    var Stime = GetMeetTime('#mStartTime');
    var Etime = GetMeetTime('#mEndTime');
    var Scor = TimeScor(Stime, Etime);
    return Scor;
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
    }else if(!(/^1[345789]\d{9}$/.test(Mphone))){
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
    });
}

/************************* 公共函数**********************/

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

// 时间戳转时间
function ZHDate2(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    //var second = now.getSeconds();
    return {
        year: "20" + year.toString().slice(1, 3),
        month: month,
        date: date,
        hour: hour,
        minute: minute,
        time: "20" + year.toString().slice(1, 3) + "年" + month + "月" + date + "日 " + hour + "时" + minute + "分"
    };
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