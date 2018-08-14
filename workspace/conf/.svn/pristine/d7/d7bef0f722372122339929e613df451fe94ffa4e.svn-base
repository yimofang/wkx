$(function(){
	mGuest();
 	//嘉宾简介字数控制
    var text=$(".guestDesTxt").val();  
    var counter=text.length;  
    $(".number").text(counter);  
    $(".guestDesTxt").on('blur keyup input',function(){  
        var text=$(".guestDesTxt").val();  
        var counter=text.length;  
        $(".number").text(counter);  
    });

    //删除嘉宾
    $('.haveGuest .guestInfo').on('click', '.guestDel', function () {
        $('.gueDelShade').show();
        $('#gueSure').attr('data-id', $(this).attr('data-id'));
        $('#gueSure').attr('data-index', $(this).parents('.gInfoList').index());
    });
    $('#gueSure').click(function () {
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsGuest_web/delete_guest.do',
            data: {
                token: Token,
                guestid: $(this).attr('data-id')
            },
            dataType: 'json',
            success: function (res) {
                var index = $('#gueSure').attr('data-index');
                if (res.error == 0) {
                    $('.haveGuest .guestInfo .gInfoList:eq(' + index + ')').remove();
                    if ($('.haveGuest .guestInfo .gInfoList').length > 0) {
                        for (var i = 0; i < $('.haveGuest .guestInfo .gInfoList').length; i++) {
                            $('.haveGuest .guestInfo .gInfoList:eq(' + i + ') .guestNum').html(i + 1);
                        }
                    } else {
                        $('.haveGuest').hide();
                        $('.unHaveGuest').show();
                        $('#addGuest').html('添加会议嘉宾');
                    }
                    $(this).attr('data-id', '');
                    $('.gueDelShade').hide();
                } else if (res.error == 5) {
                    alert(res.msg);
                    $('.gueDelShade').hide();
                    ReqToken();
                    Token = sessionStorage.getItem('token');
                } else {
                    alert(res.msg);
                    $('.gueDelShade').hide();
                }
            }
        });
    });

    $('#gueCel').click(function () {
        $('.gueDelShade').hide();
    });


    //编辑
    $('.haveGuest .guestInfo').on('click', '.guestEdit', function () {
    	var gindex = $(this).parents('.gInfoList').index();
        var EditName = $('.haveGuest .guestInfo .gInfoList:eq(' + gindex + ') .guestNameInfo').html();
        var EditHonor = $('.haveGuest .guestInfo .gInfoList:eq(' + gindex + ') .guestHonorInfo').html();
        var EditImg = $('.haveGuest .guestInfo .gInfoList:eq(' + gindex + ') .perImg img').attr('src');
        var EditImgName = $('.haveGuest .guestInfo .gInfoList:eq(' + gindex + ') .perImg img').attr('data-img');
        var EditIntroduce = $('.haveGuest .guestInfo .gInfoList:eq(' + gindex + ') .introduce p').html();
       
        $('.editGuest .guestNum').html(gindex + 1);
        $('#guestName').val(EditName);
        $('#guestHonor').val(EditHonor);
        $('.editGuest .perImgHead').attr('src', EditImg).attr('data-img', EditImgName).attr('data-state', 1);
        $('.editGuest .guestDesTxt').val(EditIntroduce);
        $('.geSave').attr('data-id', $(this).attr('data-id'));
        $('.guestList').hide();
        $('.addGuestInfo').hide();
        $(".editGuest").show();
    });

    //保存编辑
    $(".geSave").click(function(){
        var G_name = $('#guestName').val(),
            G_honor = $('#guestHonor').val(),
            G_img = $('#EperImgHead').attr('data-state'),
            G_miaoshu = $('#guestDesTxt').val();
            if (G_name != '' && G_honor != '' && G_img == 1) {
                $.ajax({
                    type: 'post',
                    url: Urlstr + 'confsGuest_web/updata_guest.do',
                    data: {
                        brief: $('.editGuest .guestDesTxt').val(),
                        gimg: $('#EperImgHead').attr('data-img'),
                        gname: $('#guestName').val(),
                        guestid: $(this).attr('data-id'),
                        rank: $('#guestHonor').val(),
                        token: Token
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.error == 0) {
                            console.log(res);
                            $('.editGuest').hide();
                            $(".guestList").show();
                            $('.haveGuest').show();

                            mGuest();
                        } else if (res.error == 5) {
                            alert(res.msg);
                            ReqToken();
                            Token = sessionStorage.getItem('token');
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            }else{
                alert('嘉宾信息填写有误，请确认');
            }
    });

});




//会议嘉宾添加
function AddGuest() {
    $('.guestList').hide();
    $('.addGuestInfo').show();
    var num = $('.haveGuest .guestInfo .gInfoList').length;
    $('#gueInfonum').html(num + 1);
}

//保存添加嘉宾
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
                    
                    $('.addGuestInfo').hide();
                    $('.guestList').show();
                    $('#addguestName').val('');
                    $('#addguestHonor').val('');
                    $('#addguestDesTxt').val('');
                    $('#addperImg').append('<p class="guePhotoUp">请上传</p>');
                    $('#addperImg img').attr('src', 'img/tm.png');
                    mGuest();

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

//会议嘉宾列表查询
function mGuest() {
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
                    $(".haveGuest").show();
                    $(".guestBtn").show();
                    $('#addGuest').html('继续添加会议嘉宾');
                } else {
                    $('.unHaveGuest').show();
                    $(".guestBtn").show();
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
    
}

//取消添加嘉宾
function guestReturn() {
    $('.addGuestInfo').hide();
    $('.guestList').show();
}

function editReturn(){
	$(".editGuest").hide(); 
	var l = $(".guestInfo ul li").length;
	if(l == 0){
		$(".unHaveGuest").show();
	}else {
        $(".guestList").show();
		$(".haveGuest").show();
	}
}

function GuestBack(){
    if (NumAll.states == 1) {
        window.location.href = 'meetChoice.html?confsid=' + NumAll.confsid;
    } else {
        window.location.href = 'meetChoice2.html?confsid=' + NumAll.confsid;
    }
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login3.html", function () {
        $('#reqtoken').show();
    });
}