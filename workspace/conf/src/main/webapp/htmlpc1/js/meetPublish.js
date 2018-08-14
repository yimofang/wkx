var beginTimeStore = '';
var endTimeStore = '';
var data2 = [],
    data3 = [],
    obj = {},
    obj3 = {};

$(function(){
    getMeetId();
    getMeetType();
    getHeader();
    CTime('st_time');
    CTime('ml_time1');//会议流程时间
    CTime('name_time');
    // $(".fbt").attr("disabled",false);//禁用非必填项

    //基本信息、嘉宾、流程等切换
    $(".title button").click(function(){
        var i = $(this).index() + 1;
        $(this).addClass("active").siblings().removeClass("active");
        $(".cont" + i).show().siblings().hide();
        $(".title").show();//必须在hide的下边
    });

    /****************************会议流程***************************/
    $(".cont2 input").blur(function(){
        $(this).css('border','1px solid #eee');
    });

    //添加流程
    $(".add").click(function(){
        var n = $(".cont2 li").length + 1;
        console.log(n);
        var liBox ='<li id="flow'+ n+'" data-id="'+n+'">\n' +
            '<span class="circle"></span>\n' +
            '<div class="num">流程<i>'+n+'</i></div>\n' +
            '<div class="cont">\n' +
            '<input class="slTime" id="ml_time'+ n +'"  type="text" placeholder="请选择流程时间">\n' +
            '<textarea placeholder="会议流程描述" class="tarea'+n+'" id="ml_txt'+n+'"></textarea>\n' +
            '</div>\n' +
            '<div class="del" style="display: none;">\n' +
            '<img src="img/mdel.png" alt="">删除\n' +
            '</div>\n' +
            '</li>';
        $(".cont2 ul").append(liBox);

        $('#ml_time'+n).daterangepicker({
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
        }, function(start, end, label) {
            beginTimeStore = start;
            endTimeStore = end;
            console.log(this.startDate.format(this.locale.format));
            console.log(this.endDate.format(this.locale.format));
            // obj = {
            //     sTime:this.startDate.format(this.locale.format),
            //     eTime :this.endDate.format(this.locale.format)
            // };
            // time.push(obj);
            // console.log(time);
            if(!this.startDate){
                this.element.val('');
            }else{
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                $("#ml_time" + n).attr('data-sTime',this.startDate.format(this.locale.format));
                $("#ml_time" + n).attr('data-eTime',this.endDate.format(this.locale.format));
            }
        });

    });

    //显示删除会议btn
    $(".cont2").on('mouseover','li',function(){
        $(this).addClass('addLine').siblings().removeClass('addLine');
        $(this).children('.del').show();
    });
    $(".cont2").on('mouseleave','li',function(){
        $(this).removeClass('addLine');
        $(this).children('.del').hide();
    });

    //删除流程
    $(".cont2").on('click','.del',function(){
        $(this).parent('li').remove();
        var fl = $(".cont2 li").length;
        if (fl > 0) {
            for (var n = 0; n < fl; n++) {
                $('.cont2 li:eq(' + n + ') i').html(n + 1);
                $('.cont2 li:eq(' + n + ')').attr('data-id',(n+1));
                $('.cont2 li:eq(' + n + ')').attr('id',(n+1));
                $('.cont2 li:eq(' + n + ') textarea').attr('id',(n+1));
            }
        }

        // $.ajax({
        //     type:'post',
        //     url:urlstr + 'confsFlow_web/delete_flow.do',
        //     data:{
        //         id:'',
        //         token:Token
        //     },
        //     dataType:'json',
        //     success:function(res){
        //         if(res.error == 0){
        //             console.log(res);
        //             $(this).parent('li').remove();
        //             var n = $(".cont2 li").length;
        //             console.log(n);
        //         }else if(res.error == 5){
        //             alert(res.info);
        //             ReqToken(1);
        //         }else{
        //             alert(res.info);
        //         }
        //     }
        // });
    });

    /***************************************会议嘉宾***********************/
    //添加嘉宾
    $(".g_add").click(function(){
        var n = $(".cont3 li").length + 1;
        var gstr = '<li class="guest" id="guest'+n+'">\n' +
            ' <span class="circle"></span>\n' +
            ' <div class="g_num">嘉宾 <i>'+n+'</i> </div>\n' +
            ' <div id="guestImg'+n+'" class="g_img">\n' +
            ' <div id="preview'+n+'">\n' +
            ' <img id="imghead'+n+'" border="0" src="img/g_img.png" width="150" height="152">\n' +
            '<input type="file" onchange="previewImage(this,'+n+')">'+
            ' </div>\n' +
            ' </div>\n' +
            ' <div class="g_info">\n' +
            ' <input class="g_name" id="g_name'+n+'" type="text" placeholder="嘉宾名称">\n' +
            ' <input class="g_honer" id="g_honer'+n+'" type="text" placeholder="嘉宾头衔">\n' +
            ' <textarea class="g_intro" id="g_intro'+n+'" placeholder="嘉宾简介" ></textarea>\n' +
            ' </div>\n' +
            ' <div class="g_del" style="display:none;">\n' +
            ' <img src="img/mdel.png" alt="">删除\n' +
            ' </div>\n' +
            ' </li>';

        $(".cont3 ul").append(gstr);
    });

    //显示隐藏删除btn
    $(".cont3").on('mouseover','li',function(){
        $(this).addClass('addLine').siblings().removeClass('addLine');
        $(this).children('.g_del').show();
    });
    $(".cont3").on('mouseleave','li',function(){
        $(this).removeClass('addLine');
        $(this).children('.g_del').hide();
    });

    //删除嘉宾
    $(".cont3").on('click','.g_del',function(){
        $(this).parent('li').remove();
        var gl = $(".cont3 li").length;
        if (gl > 0) {
            for (var n = 0; n < gl; n++) {
                var htmlstr = '<input type="file" onchange="previewImage(this,'+(n+1)+')" style="">';
                $('.cont3 li:eq(' + n + ') i').html(n + 1);
                $('.cont3 li:eq(' + n + ') .g_img').attr('id','guestImg'+(n+1)+'');
                $('.cont3 li:eq(' + n + ')').attr('data-id',(n+1));
                $('.cont3 li:eq(' + n + ') .g_info').children('.g_name').attr('id','g_name'+(n+1)+'');
                $('.cont3 li:eq(' + n + ') .g_info').children('.g_honer').attr('id','g_honer'+(n+1)+'');
                $('.cont3 li:eq(' + n + ') .g_info').children('.g_intro').attr('id','g_intro'+(n+1)+'');
                $('.cont3 li:eq(' + n + ') .g_img>div').attr('id','preview'+(n+1)+'');
                $('.cont3 li:eq(' + n + ') .g_img>div img').attr('id','imghead'+(n+1)+'');
                $('.cont3 li:eq(' + n + ') .g_img>div input').remove();
                $('.cont3 li:eq(' + n + ') .g_img>div').append(htmlstr);

            }
        }
    });


    /********************报名设置*****************/
    //报名信息-添加
    $(".choice").on('click','button',function(){
        var liTxt = $(this).parent('span').text();
        var liId = $(this).parent('span').attr('data-id');

        var listr = '<li data-id="'+liId+'">\n' +
            '<div class="inp">\n' +
            '<span class="span1">'+liTxt+'</span>\n' +
            '<input type="text" disabled>\n' +
            '<span class="span2">文本框</span>\n' +
            '</div>\n' +
            '<span class="itemDel"></span>'+
            '</li>';
        $(".itemList").append(listr);
        $(this).parent('span').remove();
    });
    //报名信息-删除
    $(".itemList").on('click','.itemDel',function(){
        var liTxt2 = $(this).siblings('.inp').children('.span1').text();
        var liId2 = $(this).parent('li').attr('data-id');
        console.log(liTxt2);

        var listr2 = '<span class="email" data-id="'+liId2+'">' +
                    '<span>'+liTxt2+'</span>'+
                    '<button></button>\n' +
                    '</span>';
        $(".choice").append(listr2);
        $(this).parent('li').remove();

    });

});


//创建会议id
function getMeetId(){
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/createConf.do',
        data:{
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                console.log(res);
                // $(".main").attr('data-id',res.row);
                sessionStorage.setItem('meetId', res.row);


            }else if(res.error == 5){
                alert(res.info);
                ReqToken(0);
            }else{
                alert(res.info);
            }
        }
    });
};

//获取会议类型
function getMeetType(){
    $.ajax({
        type:'post',
        url:urlstr + 'confsType_web/listpage.do',
        data:{
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                console.log(res);
                var arr = res.row;
                if((arr != '') && (arr != null)){
                    for(var i = 0;i<arr.length;i++){
                        $("#mType").append("<option value='"+arr[i].id+"' data-id='"+arr[i].id+"'>"+arr[i].tname+"</option>");

                    }
                }

            }else if(res.error == 5){
                alert(res.info);
                ReqToken(1);
            }else{
                alert(res.info);
            };
        }
    });
}

//发布会议
function postMeet() {
    if (JudgeInfo()) {
        var stime = $("#st_time").attr('data-stime'),
            etime = $("#st_time").attr('data-etime'),
            meetId = sessionStorage.getItem("meetId"),
            addVal = $("#address").val(),
            lat = $("#address").attr('data-lat'),
            lng = $("#address").attr('data-lng'),
            imgstr = '',
            intro = $("#editor").html();//会议描述
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
                imgs: imgstr == '' ? '' : imgstr.slice(0, -1),
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
                    alert(res.msg);
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
//基本信息的判断
//判断基本信息是否正确
    function JudgeInfo() {
        var Meimg = Mimg(),
            Metype = Mtype(),
            Mename = Mname(),
            Metime = Mtime(),
            Meaddr = Maddr(),
            Mezbf = Mzbf(),
            Mephone = PhoneCheck();
            Memap = Mmap();
        if (Meimg && Metype && Mename && Metime && Mezbf && Meaddr && Mephone && Memap) {
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
        }else if(!Meaddr){
            alert('您的地址信息有误，请确认!');
            return false;
        }else if(!Mezbf){
            alert('您的身份信息有误，请确认!');
            return false;
        } else if(!Mephone){
            alert('您的手机号有误，请确认!');
            return false;
        }
    }

//验证会议封面
    function Mimg() {
        var img_state = $('#imghead').attr('data-state');
        if (img_state == 1) {
            return true
        } else {
            return false
        }
    }

//验证会议类型
    function Mtype() {
        var meetType = $("#mType").val();
        if (meetType == 0) {
            return false
        } else {
            return true
        }
    }

//验证会议名称
    function Mname() {
        var Mname = $.trim($("#mName").val());
        if (!Mname) {
            return false;
        } else {
            return true;
        }
    }

//验证开始时间和结束时间
    function Mtime() {
        var time = $("#st_time").attr('data-stime');
        if(time == '' || time == null){
           return false;
        }else{
            return true;
        };

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
            return false;
        } else {
            return true;
        }
    }

//验证手机号
    function PhoneCheck() {
        var Mphone = $.trim($("#phone").val());
        if (!Mphone) {
            return false;
        }else if(!(/^1[345789]\d{9}$/.test(Mphone))){
            return false;
        } else {
            return true;
        }
    }
//验证地址信息
    function Mmap(){
        var Mmap = $.trim($("#address").val());
        if(!Mmap){
            return false;
        }else{
            return true;
        }
    }


//选择时间
function CTime(id) {
    $('#'+id).daterangepicker({
        "timePicker": true,
        "timePicker24Hour": true,
        "linkedCalendars": false,
        "autoUpdateInput": false,
        "drops":"down",
        "locale": {
            format: 'YYYY-MM-DD hh:mm:ss',
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        }
    }, function(start, end, label) {
        beginTimeStore = start;
        endTimeStore = end;
        console.log(this.startDate.format(this.locale.format));
        console.log(this.endDate.format(this.locale.format));


        if(!this.startDate){
            this.element.val('');
        }else{
            // this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.val(GMTToStr(beginTimeStore) + this.locale.separator + GMTToStr(endTimeStore));
            $('#'+id).attr('data-stime',GMTToStr(beginTimeStore));
            $('#'+id).attr('data-etime',GMTToStr(endTimeStore));
            $("#flow" + id).attr('data-sTime',this.startDate.format(this.locale.format));
        }
    });
}

//保存会议流程
function saveFlow(){
    $(".saveFlow").attr('disabled','true');
    // var meetId = $(".main").attr('data-id');
    var meetId = sessionStorage.getItem("meetId");
    console.log(meetId);
    var l =$(".cont2 li");
    for(var i=1;i<=l.length;i++){
        var txtVal = $("#ml_txt" + i).val();
        var sTime = $("#ml_time" + i).attr('data-sTime');
        var eTime = $("#ml_time" + i).attr('data-eTime');
        if(txtVal == ''){
            $("#ml_txt" + i).css('border','1px solid red');
            $("#ml_txt" + i).attr('placeholder','请输入会议描述！')
        }else if((eTime == undefined) && (sTime == undefined)){
            $("#ml_time" + i).css('border','1px solid red');
            $("#ml_time" + i).attr('placeholder','请输入会议时间');
        }else{
            var obj = {
                id:'',
                fname:txtVal,
                bhstart :sTime,
                bhende :eTime
            };
            data2.push(obj);
            console.log(data2);
        }
    }

    $.ajax({
        type:'get',
        url:urlstr + 'confsFlow_web/add_flowPc.do',
        data:{
            array:data2,
            confsid:meetId,
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                $(".saveFlow").attr('disabled','false');
                data2 = [];
                console.log(res);
            }else if(res.error == 5){
                alert(res.info);
                ReqToken(1);
            }else{
                alert(res.info);
            }
        }

    });
}

//保存会议嘉宾
function saveGuest(){
    $(".guestBtn").attr('disabled','true');
    var arr = $(".cont3 .guest");

    for(var i=1;i<arr.length;i++){
        var name = $("#g_name" + i).val();
        var honer = $("#g_honer" + i).val();
        var desc = $("#g_intro" + i).val();
        if(name == ''){
            $("#g_name" + i).css('border','1px solid red');
            $("#g_name" + i).attr('placeholder','请输入嘉宾名称！')
        }else if(honer == ''){
            $("#g_honer" + i).css('border','1px solid red');
            $("#g_honer" + i).attr('placeholder','请输入嘉宾头衔！')
        }else if(desc == ''){
            $("#g_intro" + i).css('border','1px solid red');
            $("#g_intro" + i).attr('placeholder','请输入嘉宾简介！')
        }else{
            var obj3 = {
                id:'',
                gname:name,
                gimg :'',
                rank :honer,
                brief :desc,
            };
            data3.push(obj3);
            console.log(data3);
        }

    }

    var meetId = sessionStorage.getItem("meetId");
    $.ajax({
        type:'post',
        url:urlstr + 'confsGuest_web/add_guestPc.do',
        data:{
            array:data3 ,
            confsid:meetId,
            token:Token
        },
        dataType:'psot',
        success:function(res){
            if(res.error == 0){
                alert(res.msg);
                $(".guestBtn").attr('disabled','false');
                data3 = [];
            }else if(res.error == 5){
                alert(res.info);
                ReqToken(1);
            }else{
                alert(res.info);
            }
        }

    });
}

//保存下期预告
function saveYG(){
    var imgstr = '';
    var portVal = $("#editor2 .w-e-text-container p").html();
    var meetId = sessionStorage.getItem("meetId");
    if(portVal == '<br>'){
        alert('请输入下期预告内容！');
    }else{
        $.ajax({
            type:'post',
            url:urlstr + 'trailer_web/addAdvance.do',
            data:{
                confid:meetId,
                introd:portVal,
                imgs:imgstr == '' ? '' : imgstr.slice(0, -1),
                token: Token
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    alert(res.msg);
                    $(".cont1").show();
                    $(".cont4").hide();
                    $(".mInfo").addClass('active').siblings().removeClass('active');
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
function saveName(){
    $(".nameBtn").attr('disabled',true);
    var nsTime = $("#name_time").attr('data-stime');
    var neTime = $("#name_time").attr('data-etime');
    var meetId = sessionStorage.getItem("meetId");

    var l = $('.itemList li').length;
    for(var i=0,enlist='';i<l;i++){
        enlist += $(".itemList li:eq(" + i + ")").attr("data-id") + ',';
    }
    var nameTime = $("#name_time").attr('data-stime');
    if((nameTime == '') || (nameTime == null)){
        alert('请选择报名时间！');
    }else{
        $.ajax({
            type:'post',
            url:urlstr + 'confs_web/confsSystem.do',
            data:{
                enlist:enlist.slice(0,-1),
                id:meetId,
                shend:nsTime,
                shstart:neTime,
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    alert(res.msg);
                    $(".cont1").show();
                    $(".cont5").hide();
                    $(".mInfo").addClass('active').siblings().removeClass('active');
                    $(".nameBtn").attr('disabled',false);
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken(1);//不刷新
                }else{
                    alert(res.msg);
                }
            }
        })
    }

}



