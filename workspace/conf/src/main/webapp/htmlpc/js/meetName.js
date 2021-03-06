var State = 0,//状态
    Page = 1,//页数
    Pagetotal = 1,
    countTotal = 20,
    Select = '';

$(function () {
    getHeader();
    nameList(Page, State, Select);
    $(".nav_one li").css('padding', '0');
    //切换
    $(".title>span").click(function () {
        var i = $(this).index() + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $(".cont" + i).show().siblings().hide();
        $(".title").show();
        Page = 1;
        State = $(this).attr('data-state');
        Select = '';
        if (State == 0 || State == 1) {
            nameList(Page, State, Select);
        }
    });

    $('.name_search i').click(function () {
        Page = 1;
        State = $(".title>span.active").attr('data-state');
        if (State == 0) {
            $('.namelist').html('');
        } else if (State == 1) {
            $('.name_list2').html('');
        }
        Select = $('.name_search input').val();
        nameList(Page, State, Select);
    })

    $("#add_name").blur(function () {
        unameheck();
    });
    $("#add_tel").blur(function () {
        PhoneCheck();
    });
    $("#add_email").blur(function () {
        emailCheck();
    });
});

function hideInfo() {
    $('.show_naminfo').hide();
    $('.item_info').html('');
}

function nameList(p, s, k) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsSubuser_web/listpage.do',
        data: {
            confsid: halfUrl.conid,
            display: 20,
            page: p,
            select: k,
            state: s
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row.length > 0) {
                    if (p == 1) {
                        loadData(res.count);
                    }
                    $('#countindex').val(res.row.count);
                    for (var i = 0, html1 = ''; i < res.row.length; i++) {
                        var time = formatDate(new Date(res.row[i].createtime));
                        var id = "'"+res.row[i].id+"'";
                        if (s == 0) {
                            html1 += '<li class="item'+i+'">' +
                                '<div >' + res.row[i].realname + '</div>' +
                                '<div> ' + res.row[i].phone + '</div>' +
                                '<div> ' + time + '</div>';
                            if (res.row[i].arrive == 1) {
                                html1 += ' <div> <img src="img/yes.png" alt=""></div>';
                            } else {
                                html1 += '<div> <img src="img/no.png" alt=""></div>';
                            }
                            html1 += ' <div class="caozuo">' +
                                '<span class="see" data-id="' + res.row[i].id + '" onclick="see('+id+')">查看</span>' +
                                '<span class="del" data-id="' + res.row[i].id + '" onclick="det('+id+','+i+')">删除</span>' +
                                '</div>' +
                                '</li>';
                        } else if (s == 1) {
                            html1 += '<li class="item'+i+'">' +
                                '<div >' + res.row[i].realname + '</div>' +
                                '<div> ' + res.row[i].phone + '</div>' +
                                '<div> ' + time + '</div>' +
                                ' <div class="caozuo">' +
                                '<span class="see" data-id="' + res.row[i].id + '" onclick="see('+id+')">查看</span>' +
                                '<span class="del" data-id="' + res.row[i].id + '" onclick="det('+id+','+i+')">删除</span>' +
                                '</div>' +
                                '</li>';
                        }
                    }
                    if (s == 0) {
                        $('.namelist').html(html1);
                    } else if (s == 1) {
                        $('.name_list2').html(html1);
                    }

                    $(".noData").hide();
                    $('#form1').show();
                } else {
                    $(".noData").show();
                    $('#form1').hide();
                }

            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    });
}

function see(id) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsSubuser_web/getConfsSubuserInfo.do',
        data: {
            token: Token,
            id: id
        },
        dataType: 'json',
        success: function (res) {
            if(res.error == 0){
                $('.show_naminfo').show();
                $('.info_name').html(res.row.realname);
                $('.info_tel').html(res.row.phone);
                $('.info_email').html(res.row.email);
                $('.info_con').html(res.row.units);
                $('.info_job').html(res.row.job);
                $('.info_baoming').html(res.row.issign == 1?'已报名':'未报名');
                $('.info_qiandao').html(res.row.arrive == 1?'已签到':'未签到');
            }else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(data.msg);
            }
        }
    })

}

// 取消删除
function goback() {
    $('.mask').hide();
    $('.yes_btn').attr('data-id','').attr('data-index','');
}

function det(id,index) {
    $('.mask').show();
    $('.yes_btn').attr('data-id',id).attr('data-index',index);
}

// 确认删除
function deletemeet(obj) {
    var id = obj.getAttribute('data-id');
    var index = obj.getAttribute('data-index');
    $.ajax({
        type:'post',
        url:urlstr + 'confsSubuser_web/deleteConfsSubuser.do',
        data:{
            id: id,
            token:Token
        },
        dataType:'json',
        success:function (res) {
            if(res.error == 0){
                alert(res.msg);
                $(".item"+index).remove();
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

function exeData(num, type) {
    loadData(num);
    loadpage();
    nameList(num, State, Select);
}

function getInfo(file) {
    if (file.files && file.files[0]) {
        console.log(file.files[0]);
        var info = file.files[0];
        var houzuiindex = info.name.lastIndexOf(".");
        var ext = info.name.substr(houzuiindex + 1);
        if (ext == 'xlsx' || ext == 'xls') {
            $('.exl_up span').html(info.name);
            $('.exl_sup').show();
        } else {
            alert('文件格式有误，请上传EXCEL文件')
        }

    }
}

function doUpload() {
    $('.exl_sup').attr('disabled', 'disabled');
    $('.exl_sup').html('上传中...');
    var formData = new FormData($("#forms")[0]);
    formData.append('confsid', halfUrl.conid);
    $.ajax({
        url: urlstr + 'confsSubuser_web/ajaxexcelload.do',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,  			//上传文件不需要缓存
        contentType: false,  		//已经声明了属性enctype="mutipart/form-data"，所以这里设置为false
        processData: false,
        success: function (data) {
            if (data.error == 0) {
                $('.jd3').show();
                $('.jd1').hide();
                $('.exl_sup').hide();
                $('.exl_sup').attr('disabled', false);
                $('.exl_sup').html('确认上传');
                $('.exl_up span').html('批量上传');
                var time = 5;
                var t = setInterval(function () {
                    time--;
                    $(".exl_ok span").html('(' + time + "s)");
                    if (time == 0) {
                        clearInterval(t);
                        $('.jd1').show();
                        $('.jd3').hide();
                    }
                }, 1000);
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(data.msg);
            }
        },
        error: function (returndata) {
            alert("上传失败");
            $('.exl_sup').attr('disabled', false);
            $('.exl_sup').html('重新上传');
        }
    });
}

function downPC() {
    window.location.href = urlstr + 'confsSubuser_web/exportExcel.do?confsid=' + halfUrl.conid + '&select=&state=0 '
}

function showAdd() {
    $('.add_thisname').show();
}

function hideAdd() {
    $('.add_thisname').hide();
    $('.add_list input').val('');
}

function submitAddName() {
    var t1 = unameheck(),
        t2 = PhoneCheck(),
        t3 = emailCheck();
    if (t1 && t2 && t3) {
        $.ajax({
            type: 'post',
            url: urlstr + 'confsSubuser_web/manualApply.do',
            data: {
                confsid: halfUrl.conid,
                realname: $.trim($('#add_name').val()),
                phone: $.trim($("#add_tel").val()),
                email: $.trim($("#add_email").val()),
                units: $.trim($('#add_con').val()),
                job: $.trim($("#add_zhi").val()),
                issign: $("input[name='baoming']:checked").attr('data-val'),
                isarrive: $("input[name='qiandao']:checked").attr('data-val'),
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    alert('添加成功');
                    $('.add_list input').val('');
                    Page = 1;
                    State = $(".title>span.active").attr('data-state');
                    Select = '';
                    if (State == 0 || State == 1) {
                        nameList(Page, State, Select);
                    }
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken(1);
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}

// 验证姓名 公司 职位
function unameheck() {
    var info = $.trim($('#add_name').val());
    if (!info) {
        $('#add_name').addClass('on');
        return false;
    } else {
        $('#add_name').removeClass('on');
        return true;
    }
}

//验证手机号
function PhoneCheck() {
    var mobile = $.trim($("#add_tel").val());

    if (!mobile) {
        $('#add_tel').addClass('on');
        return false;
    } else if (!(/^1[345789]\d{9}$/.test(mobile))) {
        $('#add_tel').addClass('on');
        return false;
    } else {
        $('#add_tel').removeClass('on');
        return true;
    }
}

//验证邮箱
function emailCheck() {
    var email = $.trim($("#add_email").val());

    if (!email) {
        $('#add_email').removeClass('on');
        return true;
    } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])/.test(email))) {
        $('#add_email').addClass('on');
        return false;
    } else {
        $('#add_email').removeClass('on');
        return true;
    }
}