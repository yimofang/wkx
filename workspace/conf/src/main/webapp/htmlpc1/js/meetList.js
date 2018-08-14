var State = 0,//状态
    Page = 1,//页数
    Pagetotal = 1,
    countTotal = 8,
    Select = '';
$(function(){
    getHeader();
    meetList(State,Page,Token,Select);
    $(".top span").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".mList ul").html('');
        State = $(this).attr('data-type');
        meetList(State,Page,Token,Select);
    });

    //删除会议弹框-打开
    $(".mList").on('click','.del',function(){
        var meetId = $(this).attr('data-id');
        $(".delMeet").show();
        $(".delMeet .delSure").attr('data-id',meetId);


    });
    //删除会议弹框-关闭
    $(".delCancel").click(function(){
        $(".delMeet").hide();
    });

    //分享
    $(".mList").on('click','.share',function(){

    });
    //管理
    $(".mList").on('click','.manage',function(){
        var id = $(this).parents().parents().attr('data-id');
        console.log(id);
        // window.localhost.href = 'modifyMeet.html?id='+ id;
    });

});

//获取会议列表
function meetList(a,b,c,d){ //a状态 b页数 c:token d搜索
    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/listpagePc.do',
        data:{
            display:'10',
            state:a,
            page:b,
            token:c,
            select:d
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.error == 0){
                var htmlstr = '',
                    arr = res.row;
                if(arr.length != 0){
                    if(b==1){
                        loadData(res.count);
                    }
                    for(var i = 0;i<arr.length;i++){
                        var stime = ZHDate(new Date(arr[i].bhstart));
                        var etime = ZHDate(new Date(arr[i].bhend));
                        htmlstr += '<li data-id='+arr[i].id+'><div class="l_img">'
                            +'<img src='+urlstr+'/upload/'+arr[i].cimg+'></div>' +
                            '<div class="l_info">' +
                            '<p class="title">'+arr[i].cname+'</p>' +
                            ' <p class="type">' +
                            '<img src="img/icon1.png">' +
                            '<span class="tName">'+arr[i].type+'</span>' +
                            '<span class="tPost">报名中</span>' +
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
                            '<span class="share">分享</span>' +
                            '<span class="del" data-id='+arr[i].id+'>删除</span>' +
                            '<a class="manage" href="meetModify.html?meetId='+arr[i].id+'">管理</a>' +
                            '</div>'+
                            '</li>';
                    }
                    $(".mList ul").html(htmlstr);
                    $(".page .all i").html(res.pages);
                }else{

                }
            }else if(res.error == 6){
                alert(res.msg);
                ReqToken(1);
            }else{
                alert(res.msg);
            }
        }

    });
}

//删除会议
function delMeet(){
    var meetId = $(this).attr('data-id');
    console.log(meetId);

    $.ajax({
        type:'post',
        url:urlstr + 'confs_web/deleteConfs.do',
        data:{
            id:meetId,
            token:Token
        },
        dataType:'json',
        success:function (res) {
            if(res.error == 0){
                alert(res.msg);
                // window.location.reload();
                meetList(State,Page,Token,Select);
            }else if(res.error == 6){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    });
}



function loadData(num) {
    $("#PageCount").val(num);
    loadpage();
}

function exeData(num, type) {
    loadData(num);
    loadpage();
    meetList(status,num,Token,Select);
}
function loadpage() {
    var myPageCount = parseInt($("#PageCount").val());
    var myPageSize = parseInt($("#PageSize").val());
    var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
    $("#countindex").val(countindex);

    $.jqPaginator('#pagination', {
        totalPages: parseInt($("#countindex").val()),
        visiblePages: parseInt($("#visiblePages").val()),
        currentPage: 1,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if (type == "change") {
                exeData(num, type);
            }
        }
    });
}