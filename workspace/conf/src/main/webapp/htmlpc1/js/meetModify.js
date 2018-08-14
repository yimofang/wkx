
$(function(){
    getHeader();
    getMeetType();//会议类型
    getMessage();//会议基本信息
    getFlow();//会议流程
    getGuest();
    getMRepoet();
    getNamed();
    CTime('name_time');
    $(".nav_one li").css('padding','0');

    $(".title span").click(function(){
        var i = $(this).index() + 1;
        $(this).addClass("active").siblings().removeClass("active");
        $(".cont" + i).show().siblings().hide();
        $(".title").show();//必须在hide的下边
    });


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

    //显示隐藏 删除btn
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
                        $("#mType").append("<option value='"+arr[i].id+"'>"+arr[i].tname+"</option>");

                    }
                }

            }else if(res.error == 5){
                alert(res.info);
                ReqToken(0);//0不刷新，1刷新
            }else{
                alert(res.info);
            };
        }
    });
}

//获取会议基本信息
function getMessage(){
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/confDetails.do',
        data:{
            conftoken:halfUrl.meetId,
            token:Token
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.error == 0){
                $("#imghead").attr('src',urlstr + 'upload/' +res.row.cimg);
                $("#mType").val(res.row.typeid);
                $("#mType").attr('data-id',res.row.typeid);
                $("#mName").val(res.row.cname);
                $("#st_time").val((res.row.days +'  '+res.row.statime +' -- '+  res.row.edays +'  '+ res.row.endtime));
                $("#address").val(res.row.position);
                $("#hoster").val(res.row.brief);
                $("#phone").val(res.row.touch);

            }else if(res.error == 5){
                alert(res.info);
                ReqToken(0);
            }else{
                alert(res.info);
            }
        }
    });
}

//获取会议流程
function getFlow(){
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/confDetails.do',
        data:{
            conftoken:halfUrl.meetId,
            token:Token
        },
        dataType:'json',
    });
}

//保存会议流程
function saveFlow(){
    $(".saveFlow").attr('disabled','true');

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
        type:'json',
        url:urlstr + 'confsFlow_web/add_flowPc.do',
        data:{
            array:data2,
            confsid:halfUrl.meetId,
            token:Token
        },
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

//获取下期预告
function getMRepoet(){
    $.ajax({
        type: 'post',
        url: urlstr + 'trailer_web/getAdvance.do',
        data: {
            confid: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success:function(res){
            console.log(res);
            if (res.error == 0) {
                if(res.row.introid != null){
                    $("#editor2").html(res.row.introd);
                }

            }else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}

//保存下期预告
function saveYG(){
    var imgstr = '';
    var portVal = $("#editor2 .w-e-text-container p").html();
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

//获取会议嘉宾
function getGuest(){

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
        type:'json',
        url:urlstr + 'confsGuest_web/add_guestPc.do',
        data:{
            array:data3 ,
            confsid:meetId,
            token:Token
        },
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

//获取报名信息
function getNamed(){
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/getEnlist.do',
        data: {
            id: halfUrl.meetId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                if(res.row.shstart!=''&&res.row.shend!=''){

                }
                var enlist = '1,2,';
                if (res.row.enlists.length > 2) {
                    var htmlstr = '';
                    for (var i = 0; i < res.row.enlists.length; i++) {
                        htmlstr += ``;
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
}

function enlists(str) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/selectEnlist.do',
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

//保存报名信息
function saveName(){
    $(".nameBtn").attr('disabled',true);
    var nsTime = $("#name_time").attr('data-stime');
    var neTime = $("#name_time").attr('data-etime');

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
                id:halfUrl.meetId,
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

