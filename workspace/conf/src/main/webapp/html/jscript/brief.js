var page = 1;
var countdown=60;
$(function () {
    Getbrief(page,1);
    mediaList();


    //删除图片
    $('#nextBriImg').on('click','.addshuing',function () {
        $(this).remove();
    });

    //取消报名
    $(".mediaCel").click(function(){
        $(".postName").hide();
    });

    //跳转到编辑简报
    $(".article").on('click','.b_edit',function(){
        var id = $(this).attr('data-id');
        var title = $(this).prev().html();
        var msg = $(this).siblings('.bMsg').html();
        console.log(msg);
        console.log(title);
        $(".editUl").attr('data-id',id);
        $(".editBT").attr('value',title);
        $(".editContent").html(msg);


        $(".editBrief").show();
        $(".briefIndex").hide();
      
    });

    //删除简报
    $(".article").on('click','.b_del',function(){
        var id = $(this).attr('data-id');
        $(this).parent().parent().remove();
        $.ajax({
            type: 'post',
            url: Urlstr + 'confsbrief_web/deleteinfo.do',
            data: {
                id:id,
                token: Token
            },
            dataType: 'json',
            success:function (res) {
                if(res.error == 0){
                    alert(res.msg);
                    var l = $(".artList>div").length;
                    if(l == 0){
                        $(".unCre").show();
                    }
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken();
                }else{
                    alert(res.msg);
                }
            }
        });
        
    });


    //获取验证码
    $(".getCode").click(function(){
        var p_num = $(".phone").val();
        
        if(p_num == ''){
            alert('请输入手机号');
        }else if(!(/^1[345789]\d{9}$/.test(p_num))){
            alert('手机号有误！');
        }else{
            var obj = $(".getCode");
            settime(obj);
            $.ajax({
                type:'post',
                url:Urlstr + 'briefmedia_web/queryCode.do',
                data:{
                    phone:p_num,
                    token:Token
                },
                dataType:'json',
                success:function(res){
                    if(res.error == 0){
                        console.log(res);
                    }else if(res.error == 5){
                        alert(res.msg);
                        ReqToken();
                    }else{
                        alert(res.msg);
                    }
                }
            });
        } 
    });

    //已推广、未推广切换
    $(".tgTop span").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var i = $(this).index() + 1;
        $(".artList" + i).show().siblings().hide();
        $(".tgTop").show();
        if(i == 1){ //未推广
            Getbrief(page,1);
        }else if(i == 2){ //已推广
            Getbrief(page,2);
        }
    });


});

//倒计时
function settime(obj){
    if(countdown == 0){
        obj.attr('disabled',false);
        obj.html("发送验证码");
        countdown = 60;
        return;
    }else if(countdown > 0){
        obj.attr('disabled',true);
        obj.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function(){
        settime(obj);
    },1000);
}

//保存编辑简报
function saveEdit(){
    var id = $(".editUl").attr('data-id');
    var title = $(".editBT").val();
    var content = $(".editContent").html();
   alert(id);
   alert(title);
   alert(content);
   alert(NumAll.confsid);
   alert(Token);
    $.ajax({
        type:'post',
        url:Urlstr + 'confsbrief_web/addinfo.do',
        data:{
            id:id,
            bname:title,
            introd:content,
            imgs:'',
            confsid:NumAll.confsid,
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                alert(res.msg);
                $(".editBrief").hide();
                $(".briefIndex").show();
                Getbrief(page,t);
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    });
}


//获取简报列表
function Getbrief(p,t) {
    
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsbrief_web.do',
        data: {
            display: 10,
            confsid:NumAll.confsid,
            page: p,
            type:t,
            token: Token
        },
        dataType: 'json',
        success:function (res) {
            if(res.error == 0){
                console.log(res);
                // var briefList = $(".artList .artContent");
                var htmlstr = '';
                var briefArr = res.row;
                $(".tgTop").show();
                

                if(briefArr.length == 0){
                    if(t == 1){
                        $(".unCre").show();
                        $(".unTG").hide();
                    }else if(t == 2){
                        $(".unTG").show();
                        $(".unCre").hide();
                    }
                    
                    // $(".article").hide();
                }else{
                    $(".unArticle").hide();
                    $(".article").show();

                    //获取创建简报时间
                    for(var i=0;i<briefArr.length;i++){
                        var time = briefArr[i].createtime;
                        var creTime=new Date(parseInt(time)).toLocaleDateString().replace(/\//g, "-");

                        htmlstr +=  `<div class="listBrief">
                                        <span class="listLeft" style="display:none">
                                            <input type="checkbox" data-id="${briefArr[i].id}">
                                        </span>
                                        <a class="artContent" data-id="${briefArr[i].id}" href="briefDetails.html?id=${briefArr[i].id}">
                                            <span class="listRight" style='width:70%'>
                                                <p class="title">${briefArr[i].bname}</p>
                                                <p class="time">${creTime}</p>
                                            </span>
                                            
                                        </a>
                                        <span class='br_btn'>
                                            <span class="bMsg" style="display:none">${briefArr[i].introd}</span>
                                            <span class="bTit" style="display:none">${briefArr[i].bname}</span>
                                            <span class='b_edit' data-id='${briefArr[i].id}'></span>
                                            <span class='b_del' data-id='${briefArr[i].id}'></span>
                                        </span>
                                    </div>`;
                    }
                    $(".artList"+t).show().siblings().hide();
                    $(".artList"+t).html(htmlstr);
                    if(t == 3){
                        $(".tgTop").hide();
                        $(".artList .listLeft").show();
                        $(".listRight").css('width','70%');
                        $(".article .artContent").css('width','70%');
                        $(".tuiguang").css('margin-top','0');
                    }else{
                        $(".tgTop").show();
                    }

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

//跳转到创建简报
function createBrief(){
    $.ajax({
        type:'post',
        url:Urlstr + 'confsbrief_web.do',
        data:{
            token:Token,
            confsid:NumAll.confsid
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                console.log(res);
                window.location.href='briefCreate.html' + '?confsid=' + NumAll.confsid;
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    });
}
function tgBrief(){

}

//创建简报
function saveBrief(){
    var title = $.trim($("#surTitle").val());//标题
    // var desc = $.trim($(".editDetail").val());//描述
    var desc = $(".article-content").html();//描述
    var i = $(".placeholader").length;
    console.log(i);



    //获取图片
    // var imgAll = $("#content5");
    // var imgstr = '';
    // if(imgAll.length != 0){
    //     for(var i=0;i<imgAll.length;i++){
    //         imgstr += $('#content5 img')[i].getAttribute("data-img") + ',';
    //     }  
    // }

    if(title == ''){
        alert('请输入简报标题！');
    }else if((desc == '') || (i == 1)){
        alert('请输入简报描述！');
    }else{
    	   alert(title);
    	   alert(desc);
    	   alert(NumAll.confsid);
    	   alert(Token);
        $.ajax({
            type:'post',
            url:Urlstr + 'confsbrief_web/addinfo.do',
            data:{
                bname:title,
                introd:desc.toString(),
                imgs:'',
                // imgs:imgstr == '' ? '' : imgstr.slice(0, -1),
                confsid:NumAll.confsid,
                token:Token,
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    console.log(res);
                    window.location.href = 'brief.html' + '?confsid=' + NumAll.confsid ;
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken();
                }else{
                    alert(res.msg);
                }
            }
        });
    }
}

//媒体推广
function mediaBro(){
    // $(".listLeft").show();
    // $(".mediaSpread").show();
    // $(".briefManage").hide();
    // $(".submit").hide();
    // $(".articleNext").show();
    // $(".articleChoice").show();
    // $(".br_btn").hide();
    // $(".listRight").css('width','70%');
    // $('.artContent').attr('href','javascript:void(0)');
    // $(".article .artContent").css('width','70%');
    //   Getbrief(page,3);

    window.location.href = 'briefList.html?confsid=' + NumAll.confsid;

}

function back() {
    $(".listLeft").hide();
    $(".mediaSpread").hide();
    $(".briefManage").show();
    $(".submit").show();
    $(".articleNext").hide();
    $(".articleChoice").hide();
    $(".listRight").css('width','100%');
    var arr = $('.artContent');
    for(var i = 0,arrid='';i<arr.length;i++){
        arrid =  $('.artContent:eq('+i+')').attr('data-id');
        $('.artContent:eq('+i+')').attr('href','briefDetails.html?id='+arrid);
    }
}


//媒体列表展示
function mediaList(){
    var htmlMedia = '';

    $.ajax({
        type:'post',
        url:Urlstr + 'media_web.do',
        data:{
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                var mediaArr = res.row;
                for(var m=0;m<mediaArr.length;m++){
                    htmlMedia += `<li id="${mediaArr[m].id}">
                                    <div class="mediaName">
                                        <span class="listLeft">
                                            <input type="checkbox" class="inputCheck" data-id="${mediaArr[m].id}">
                                        </span>
                                        <span>${mediaArr[m].mname}</span>
                                    </div>
                                    <div class="mediaPlay">[${mediaArr[m].brief}]</div>
                                </li>`;
                }
                $(".mediaHot>ul").html(htmlMedia);
            }else if(res.error == 5){
                alert(res.msg);
                ReqToken();
            }else{
                alert(res.msg);
            }
        }
    });
}

//选择媒体
function mediaCho(){
    // $.ajax({
    //     type:'post',
    //     url:Urlstr + 'media_web.do',
    //     data:{
    //         token:Token,
    //     },
    //     dataType:'json',
    //     success:function(res){
    //         if(res.error == 0){
                var mediaId = [];

                $("input[type=checkbox]:checked").each(function(i){
                    mediaId[i] = $(this).attr('data-id');
                });
                if(mediaId.length == 0){
                    alert("请选择推广媒体！");
                }else{
                    //媒体id存储到sessionStorage中
                    sessionStorage.setItem("med",mediaId);
                    $(".postName").show();
                }
    //         }else if(res.error == 5){
    //             alert(res.msg);
    //             ReqToken();
    //         }else{
    //             alert(res.msg);
    //         }
    //     }
    // });
}

//报名验证
$(".name").blur(NameCheck);
$(".phone").blur(PhoneCheck);

//提交报名信息
function briefSubmit(){
    var articleArr = sessionStorage.getItem("data");
    var mediaArr = sessionStorage.getItem("med");
    var postName = NameCheck(),
        mobile = PhoneCheck();

    if (mobile) {
        $.ajax({ 
            type:'post',
            url:Urlstr + 'briefmedia_web.do',
            data:{
                briefs:articleArr,
                medias:mediaArr,
                phone:$.trim($(".phone").val()),
                phoneCode:$.trim($("#codeVal").val()),
                token:Token
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    sessionStorage.setItem("med",'');
                    sessionStorage.setItem("data",'');
                    window.location.href = 'brief.html' + '?confsid=' + NumAll.confsid;
                   
                }else if(res.error == 5){
                    alert(res.msg);
                    ReqToken();
                }else{
                    alert(res.msg);
                }
            }
        }); 
    }else{
        alert('个人信息填写错误，请确认！');
    }
}

// 验证姓名
function NameCheck(){
    var postName =$.trim($(".name").val());
   
    if(!postName){
        return false;
    }else{
        return true;
    }
}

// 验证电话
function PhoneCheck(){
    var mobile = $.trim($(".phone").val());

    if(!mobile){
        return false;
    }else if(!(/^1[345789]\d{9}$/.test(mobile))){
        return false;
    }else{
        return true;
    }
}

//添加图片公共属性
function compress(img, width, height, ratio) {
    var canvas, ctx, img64;
    var orient = getPhotoOrientation(img);
    //alert("orient2:"+orient);
    var canvas, ctx, img64;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");
    if(orient == 6) {
        ctx.save();//保存状态
        ctx.translate(canvas.width/ 2, canvas.height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
        // 执行Canvas的drawImage语句
        ctx.drawImage(img, 0 - canvas.height / 2, 0 - canvas.width / 2, height, width);//把图片绘制在画布translate之前的中心点，
        ctx.restore();//恢复状态
    } else {
        // 执行Canvas的drawImage语句
        ctx.drawImage(img, 0, 0, width, height);
    }

    img64 = canvas.toDataURL("image/jpeg", ratio);

    return img64;
}

function getPhotoOrientation(img){
    var orient;
    EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
    });
    return orient;
}

//添加简报图片
var addImgId = 0;
function addImage(file){
    var imgBox = document.getElementById('nextBriImg'); 
    if (file.files && file.files[0]){
        imgBox.innerHTML +=('<div class="addshuing"><img id="addimghead'+addImgId+'"></div>');
        var imgid = 'addimghead'+addImgId;
        var img = document.getElementById(imgid);
        var reader = new FileReader();
        reader.onload = function(evt){
            //img.src = evt.target.result;
            var image = new Image();
            image.src =evt.target.result;

            image.onload = function(){
                var img64 = compress(image, 750, 300, 1);
                //document.getElementById(imgid).src = img64;
                $.ajax({
                    type : 'post',
                    url : Urlstr + 'imgbase.do',
                    data : {
                        imgStr :  img64,
                        token : Token
                    },
                    dataType : 'json',
                    success : function (res) {
                        if(res.error == 0){
                            $('#nextAddImg').value += res.row.filename+',';
                            document.getElementById(imgid).src =  Urlstr+'upload/' + res.row.filename;
                            $('#'+imgid).attr('data-img',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
    addImgId++;
}
function bfBack(){
    $(".editBrief").hide();
    $(".briefIndex").show();
}

//token
function ReqToken() {
    $('#reqtoken').load("login2.html",function() {
        $('#reqtoken').show();
    });
}