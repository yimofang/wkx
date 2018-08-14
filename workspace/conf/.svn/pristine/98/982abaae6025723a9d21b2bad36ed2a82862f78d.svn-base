var State = 0,//状态
    Page = 1,//页数
    Pagetotal = 1,
    countTotal = 8,
    Select = '';
$(function(){
    getHeader();
    meetList(State,Page,Token,Select);
    meetType();
    $(".top>span").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".mList ul").html('');
        State = $(this).attr('data-type');
        Select = '';
        $('.h_searchinput').val('');
        meetList(State,Page,Token,Select);
    });
    $('.h_searchicon').click(function () {
        State =$(".top>span.active").attr('data-type');
        Page = 1;
        Select = $('.h_searchinput').val();
        meetList(State,Page,Token,Select);
    })





    //删除会议
    $(".mList").on('click','.del',function(){
        var mId = $(this).attr('data-id');
        var thisIndex = $(this).attr('data-index');
        $('.mask').show();
        $('.yes_btn').attr('data-id',mId).attr('data-index',thisIndex);
    });

    //分享
    $(".mList").on('click','.share',function(){
        $('.mask2').show();
        var meetId = $(this).attr('data-id');
        $.ajax({
            type:'post',
            url:urlstr + 'confs_web/confIssue.do',
            data:{
                confid:meetId,
                token:Token
            },
            dataType:'json',
            success:function (res) {
                console.log(res);
                if(res.error == 0){
                    $('.maskInfo2 img').attr('src',urlstr+'qrcode.do?link='+res.row);
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken();
                }else{
                    alert(res.msg);
                }
            }
        });
    });

    //管理
    $(".mList").on('click','.manage',function(){
        var id = $(this).parents().parents().attr('data-id');
        window.location.href = 'modifyMeet.html?id='+ id;
    });

});

//复制会议地址
function copyText(){
    var e=document.getElementById("contents");//获取textarea的id
    e.value = $('.mask2_url').val();//把标签的文本内容赋值给textarea
    e.select(); //选择textarea的文本内容
    document.execCommand("Copy"); //执行浏览器复制命令
    alert('复制成功')
}

//关闭会议分享
function goback2() {
    $('.mask2').hide();
    $('.maskInfo2 img').attr('src','');
}

// 取消删除
function goback() {
    $('.mask').hide();
    $('.yes_btn').attr('data-id','').attr('data-index','');
}
// 确认删除
function deletemeet(obj) {
    var meetId = obj.getAttribute('data-id');
    var index = obj.getAttribute('data-index');
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/deleteConfs.do',
        data:{
            confid:meetId,
            token:Token
        },
        dataType:'json',
        success:function (res) {
            if(res.error == 0){
                alert(res.msg);
                $(".mList ul li:eq("+index+")").remove();
                $('.mask').hide();
                $('.yes_btn').attr('data-id','').attr('data-index','');
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken(1);
            }else{
                alert(res.msg);
            }
        }
    });
}

//获取会议列表
function meetList(s,p,t,sel){
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/listpagePc.do',
        data:{
            display:'10',
            state:s,
            page:p,
            token:t,
            select:sel
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                var htmlstr = '',
                    arr = res.row;
                if(arr.length != 0){
                    $(".noData").hide();
                    $('#form1').show();
                    if(p==1){
                        loadData(res.count);
                    }
                    for(var i = 0;i<arr.length;i++){
                        var stime = ZHDate(new Date(arr[i].bhstart));
                        var etime = ZHDate(new Date(arr[i].bhend));
                        var _thistimer = new Date().getTime();
                        var bmState = '';
                        if(arr[i].shstart == undefined ||arr[i].shend== undefined){
                            bmState = '报名结束';
                        }else if(_thistimer>arr[i].shstart &&_thistimer< arr[i].shend){
                            bmState = '报名中';
                        }else if(_thistimer<=arr[i].shstart){
                            bmState = '未开始报名';
                        }else if(_thistimer>=arr[i].shend){
                            bmState = '报名结束';
                        }
                        console.log(arr[i].shstart);
                        console.log(arr[i]._thistimer);
                        console.log(arr[i].shend);
                        console.log(bmState);
                        htmlstr += '<li data-id='+arr[i].id+'><div class="l_img">'
                            +'<img src='+urlstr+'upload/'+arr[i].cimg+'></div>' +
                            '<div class="l_info">' +
                            '<a class="title" href="meetPreview.html?meetId='+arr[i].id+'"  target="_blank">'+arr[i].cname+'</a>' +
                            ' <p class="type">' +
                            '<img src="img/icon1.png">' +
                            '<span class="tName">'+arr[i].type+'</span>' +
                            '<span class="tPost">'+bmState+'</span>' +
                            '</p>' +
                            '<p class="host">' +
                            '<img src="img/icon2.png">' +
                            '<span>brief</span>' +
                            '</p>' +
                            '<p class="address">' +
                            '<img src="img/icon3.png">' +
                            '<span>'+arr[i].addr+'</span>' +
                            '</p>' +
                            '<p class="time">' +
                            '<img src="img/icon4.png">' +
                            '<span class="t_start">'+stime+'</span> &nbsp;— &nbsp;' +
                            '<span class="t_end">'+etime+' </span>' +
                            '</p>' +
                            '</div><div class="l_name">' +
                            '<span>总报名 <i>'+arr[i].count+'</i></span>' +
                            '<span>已签到 <i>'+arr[i].checked +'</i></span>' +
                            '<span>未签到 <i>'+arr[i].nuchecked +'</i></span>' +
                            '</div>'+'<div class="l_btn">' +
                            '<span class="share" data-id="'+arr[i].id+'">分享</span>' +
                            '<span class="del" data-id='+arr[i].id+' data-index="'+i+'">删除</span>' +
                            '<a class="manage" href="meetModify.html?conid='+arr[i].id+'">管理</a>' +
                            '</div>'+
                            '</li>';
                    }
                    $(".mList ul").html(htmlstr);
                }else{
                    $(".mList ul").html('');
                    $(".noData").show();
                    $('#form1').hide();
                }
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken(0);
            }else{
                alert(res.msg);
            }
        }

    });
}

//获取会议分类
function meetType() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsType_web/listpage.do',
        data: {
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                for(var i=0,html='';i<res.row.length;i++){
                    html+='<option value="'+res.row[i].id+'">'+res.row[i].tname+'</option>';
                }
                $('#meetType').append(html);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);

            } else {
                alert(res.msg);
            }
        }
    })
}

function exeData(num, type) {
    loadData(num);
    loadpage();
    meetList(status,num,Token,Select);
}