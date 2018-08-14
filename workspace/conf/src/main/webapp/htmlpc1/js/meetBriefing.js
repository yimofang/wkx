$(function(){
    getHeader();

    $(".nav_one li").css('padding','0');
    $('.title span').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var i = $(this).index() + 1;
        $(".cont" + i).show().siblings().hide();

    });

    //创建简报弹框
    $(".creatBrief").click(function(){
        $(".creBrief").show();
    });
    //关闭弹框
    $(".top_cancel").click(function(){
        $(".creBrief").hide();
    });
});

//保存创建简报
function saveBrief(){
    var tit = $(".creTitle").val();
    var des = $(".editor").html();
    if((tit == null) || (tit == '')){
        alert('请输入简报标题！');
    }else if((des == null) || (des == '')){
        alert('请输入简报内容！');
    }else{
        $.ajax({
            type:'post',
            url:urlstr + 'confsbrief_web/addinfo.do',
            data:{
                bname:tit,
                introd:des,
                imgs:'',
                confsid:numAll.meetId,
                token:Token
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    alert(res.msg);
                    $(".creBrief").hide();
                    //获取简报列表
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken(0);
                }else{
                    alert(res.msg);
                }
            }
        });
    }
}


//页码
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