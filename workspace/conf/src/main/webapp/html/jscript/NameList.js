var page = 1,
    select = '';
$(function () {
    namelist(page, select);
    //获取个人详情
    $(".AllListCon").on('click','li',function(){
        var myId = $(this).attr('data-id');
       
        $(".myInfo").show();
        getMyInfo(myId);
    });
    $(".QianAllList").on('click','li',function(){
        var myId = $(this).attr('data-id');
       
        $(".myInfo").show();
        getMyInfo(myId);
    });

    $(".infoBtn").click(function(){
        $(".myInfo").hide();
    });

    $("#TitTab").on('click', 'li', function () {
        $(this).children('span').addClass('active');
        $(this).siblings().children('span').removeClass('active');
        var index = $(this).index();
        if (index == 0) {
            $('.NameCon>div:eq(' + index + ')').show();
            $('.NameCon>div:eq(' + index + ')').siblings('div').hide();
            page = 1;
            namelist(page, select);
        }
        if (index == 1) {
            $('.NameCon>div:eq(' + index + ')').show();
            $('.NameCon>div:eq(' + index + ')').siblings('div').hide();
            page = 1;
            yesnamelist(page, select);
        }
        if (index == 2) {
            $('.NameCon>div:eq(' + index + ')').show();
            $('.NameCon>div:eq(' + index + ')').siblings('div').hide();
            var x = 1;
            if (x == 1) {
                $('.PCcaozuo').show();
                $('.ChuanListTit').hide();
                $('.ChuanAllList').hide();
            } else {
                $('.PCcaozuo').hide();
                $('.ChuanListTit').show();
                $('.ChuanAllList').show();
            }
        }
    });



    /*弹出添加名单*/
    $(".NameListAdd").click(function () {
        $("#addName").show();
        $("#nameList").hide();
        // $.ajax({
        //     type: 'post',
        //     url: Urlstr + 'confs_web/getEnlist.do',
        //     data: {
        //         id: NumAll.confsid,
        //         token: Token
        //     },
        //     dataType: 'json',
        //     success: function (res) {
        //         if (res.error == 0) {
        //             console.log(res);
        //             // for (var i = 0, did = 0; i < res.row.enlists.length; i++) {
        //             //     did = res.row.enlists[i].id - 1;
        //             //     $('#AddNameList>div:eq(' + did + ')').show();
        //             // }
        //         } else if (res.error == 5) {
        //             alert(res.msg);
        //             ReqToken();
        //         } else {
        //             alert(res.msg);
        //         }
        //     }
        // })
    });
    $(".Goback").click(function () {
        $("#addName").hide();
        $("#nameList").show();
        $("#mail").val('');
        $("#job").val('');
        $("#phone").val('');
        $('#name').val('');
        $('#units').val('');
        $('#checkInChoice').html('请选择');
        page = 1;
        namelist(page, select);
    });

    /*报名*/
    var signUpdata = [
        {'id': '10001', 'value': '报名'},
        {'id': '10002', 'value': '未报名'}
    ];
    var signUp = document.querySelector('#signUp');   // 绑定一个触发元素
    var showSignUp = document.querySelector('#signUpChoice');  // 绑定一个存储结果的元素
    signUp.addEventListener('click', function () {  // 添加监听事件
        var typeId = signUp.dataset['id'];          // 获取元素的data-id属性值
        var title = signUp.dataset['value'];        // 获取元素的data-value属性值
        // 实例化组件
        var example = new IosSelect(1,               // 第一个参数为级联层级，演示为1
            [signUpdata],
            {
                container: '.container',             // 容器class
                title: '请选择',                     // 标题
                itemHeight: 50,                      // 每个元素的高度
                itemShowCount: 3,                    // 每一列显示元素个数，超出将隐藏
                oneLevelId: typeId,
                showAnimate:true,                    // 第一级默认值
                callback: function (selectOneObj) {  // 用户确认选择后的回调函数
                    showSignUp.innerHTML = selectOneObj.value;
                }
            });
    });

    /*签到*/
    var checkInData = [
        {'id': '10001', 'value': '签到'},
        {'id': '10002', 'value': '未签到'}
    ];
    var checkIn = document.querySelector('#checkIn');   // 绑定一个触发元素
    var showCheckIn = document.querySelector('#checkInChoice');  // 绑定一个存储结果的元素
    checkIn.addEventListener('click', function () {  // 添加监听事件
        var typeId = checkIn.dataset['id'];          // 获取元素的data-id属性值
        var title = checkIn.dataset['value'];        // 获取元素的data-value属性值
        // 实例化组件
        var example = new IosSelect(1,               // 第一个参数为级联层级，演示为1
            [checkInData],
            {
                container: '.container',             // 容器class
                title: '请选择',                     // 标题
                itemHeight: 50,                      // 每个元素的高度
                itemShowCount: 3,                    // 每一列显示元素个数，超出将隐藏
                oneLevelId: typeId,
                showAnimate: true,                    // 第一级默认值
                callback: function (selectOneObj) {  // 用户确认选择后的回调函数
                    showCheckIn.innerHTML = selectOneObj.value;
                }
            });
    });



});

//获取个人详情
function getMyInfo(id){
    $.ajax({
        type:'post',
        url:Urlstr + 'confsSubuser_web/getConfsSubuserInfo.do',
        data:{
            id:id,
            token:Token,
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.error == 0){
               $(".sName .show").html(res.row.realname);
               $(".sPhone .show").html(res.row.phone);
                
                if((res.row.email != '') || (res.row.email != null)){ //邮箱
                    $(".sMail .show").html(res.row.email);
                }else{
                    $(".sMail .show").html('您没有填写此项信息');
                }
                // if(res.row.email == null){
                //     $(".sMail .show").html('您没有填写此项信息');
                // }else{
                //     $(".sMail .show").html(res.row.email);
                // }


                if((res.row.units != '') || (res.row.units != null)){ //公司
                    $(".sCompany .show").html(res.row.units);
                }else{
                    $(".sCompany .show").html('您没有填写此项信息');
                }
                if((res.row.job != '') || (res.row.job != null)){ //职位
                    $(".sJob .show").html(res.row.job);
                }else{
                    $(".sJob .show").html('您没有填写此项信息');
                }

                if(res.row.issign == 1){
                    $(".sPName .show").html('已报名');
                }else if(res.row.issign == 2) {
                    $(".sPName .show").html('未报名');
                }
                

                if(res.row.arrive == 1){
                    $(".sSignIn .show").html('已签到');
                }else if(res.row.arrive == 2){
                    $(".sSignIn .show").html('未签到');
                }

                
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    });
}


function BtnSlimt() {
    
    if (!unameheck()) {
        alert('请确认姓名填写');
    } else if (!PhoneCheck()) {
        alert('请确认手机号填写');
    } else if (!emailCheck()) {
        alert('请确认邮箱填写');
    }else if (!baomingCheck()){
        alert('请确认报名信息选择');
    }else if (!qiandaoCheck()) {
        alert('请确认签到信息选择');
    } else {
        var mailVal = $.trim($("#mail").val());
        var comVal = $.trim($('#units').val());
        var jobVal = $.trim($("#job").val());
        var phoVl = $.trim($("#phone").val());
        var nameVal = $.trim($('#name').val());
        console.log(mailVal);
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsSubuser_web/manualApply.do',
            data: {
                confsid: NumAll.confsid,
                email: mailVal,
                job: jobVal,
                phone:phoVl,
                realname: nameVal,
                units: comVal,
                issign:$("#signUpChoice").html() == '报名' ? 1 : 2,
                isarrive: $('#checkInChoice').html() == '签到' ? 1 : 2
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    $("#mail").val('');
                    $("#job").val('');
                    $("#phone").val('');
                    $('#name').val('');
                    $('#units').val('');
                    $("#signUpChoice").html('请选择');
                    $('#checkInChoice').html('请选择');

                    $("#addName").hide();
                    $("#nameList").show();
                    namelist(page, select);
                    // window.location.href = 'nameList.html'+ '?confsid=' + NumAll.confsid;
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

// 验证姓名 公司 职位
function unameheck() {
    var info = $.trim($('#name').val());
    if (!info) {
        return false;
    } else {
        return true;
    }
}

//验证手机号
function PhoneCheck() {
    var mobile = $.trim($("#phone").val());

    if (!mobile) {
        return false;
    } else if (!(/^1[345789]\d{9}$/.test(mobile))) {
        return false;
    } else {
        return true;
    }
}

//验证邮箱
function emailCheck() {
    var email = $.trim($("#mail").val());

    if (!email) {
        return true;
    } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])/.test(email))) {
        return false;
    } else {
        return true;
    }
}

//确认是否报名
function baomingCheck() {
    var baoming = $('#signUpChoice').html();
    if (baoming == '请选择') {
        return false;
    } else {
        return true;
    }

}

//确认是否签到
function qiandaoCheck() {
    var qiandao = $('#checkInChoice').html();
    if (qiandao == '请选择') {
        return false;
    } else {
        return true;
    }

}

//请求全部名单
function namelist(a, b) {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsSubuser_web/listpage.do',
        data: {
            confsid: NumAll.confsid,
            display: 20,
            page: a,
            select: b,
            state: 0
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                $('#totalnum').html('(' + res.row.length + ')');
                var html1 = '';
                for (var i = 0; i < res.row.length; i++) {
                    var time = formatDate(new Date(res.row[i].createtime));
                    html1 += `<li data-id='${res.row[i].id}'>
                        <span>${res.row[i].realname}</span>
                        <span>${res.row[i].phone}</span>
                        <span>${time}</span>
                        <span><img src="img/${res.row[i].arrive == 1 ? 'yes.png' : 'no.png'}" alt=""></span>
                    </li>`;
                }
                $('.AllListCon').html(html1);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}

//请求已签到
function yesnamelist(a, b) {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsSubuser_web/listpage.do',
        data: {
            confsid: NumAll.confsid,
            display: 20,
            page: a,
            select: b,
            state: 1
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                console.log(res);
                var html1 = '';
                for (var i = 0; i < res.row.length; i++) {
                    var time = formatDate(new Date(res.row[i].createtime));
                    html1 += `<li data-id='${res.row[i].id}'>
                        <span>${res.row[i].realname}</span>
                        <span>${res.row[i].phone}</span>
                        <span>${time}</span>
                    </li>`;
                }
                $('.QianAllList').html(html1);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    });
}

// 时间戳转时间
function formatDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    // var hour = now.getHours();
    // var minute = now.getMinutes();
    // var second = now.getSeconds();
    return "20" + year.toString().slice(1,3) + "-" + month + "-" + date;
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login2.html", function () {
        $('#reqtoken').show();
    });
}

