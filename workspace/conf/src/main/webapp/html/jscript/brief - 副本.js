var page = 1;
$(function () {
    Getbrief(page);
    mediaList();

    //删除图片
    $('#nextBriImg').on('click','.addshuing',function () {
        $(this).remove();
    });

    //取消报名
    $(".mediaCel").click(function(){
        $(".postName").hide();
    });

    pushHistory();
    window.addEventListener("popstate", function(e) {
        //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        window.location.href = 'mmmm.html?confsid='+NumAll.confsid;
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
});

//获取简报列表
function Getbrief(p) {
    $.ajax({
        type: 'post',
        url: Urlstr + 'confsbrief_web.do',
        data: {
            display: 10,
            confsid:NumAll.confsid,
            page: p,
            token: Token
        },
        dataType: 'json',
        success:function (res) {
            if(res.error == 0){
                var briefList = $(".artList .artContent");
                var htmlstr = '';
                var briefArr = res.row;
                // var time = res.row.createtime;
                // var creTime=new Date(parseInt(res.row.createtime) * 1000).toLocaleDateString();
                // console.log(creTime);

                if(briefArr.length == 0){
                    $(".unArticle").show();
                    $(".article").hide();
                }else{
                    $(".unArticle").hide();
                    $(".article").show();

                    //获取创建简报时间
                    for(var i=0;i<briefArr.length;i++){
                        var time = briefArr[i].createtime;
                        var creTime=new Date(parseInt(time)).toLocaleDateString().replace(/\//g, "-");

                        htmlstr += `<a class="artContent" data-id="${briefArr[i].id}" href="briefDetails.html?id=${briefArr[i].id}">
                                        <span class="listLeft" style="display:none">
                                            <input type="checkbox" data-id="${briefArr[i].id}">
                                        </span>
                                        <span class="listRight">
                                            <p class="title">${briefArr[i].bname}</p>
                                            <p class="content">${briefArr[i].introd}</p>
                                            <p class="time">${creTime}</p>
                                        </span>
                                    </a>`;
                    }
                    $(".artList").html(htmlstr);
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

//创建简报
function saveBrief(){
    var title = $.trim($("#surTitle").val());//标题
    // var desc = $.trim($(".editDetail").val());//描述
    var desc = $(".article-content").html();//描述
    var i = $(".placeholader").length;
    console.log(i);


    //获取图片
    // var imgAll = $("#nextBriImg>.addshuing");
    // var imgstr = '';
    // if(imgAll.length != 0){
    //     for(var i=0;i<imgAll.length;i++){
    //         imgstr += $('#nextBriImg .addshuing img')[i].getAttribute("data-img") + ',';
    //     }  
    // }

    if(title == ''){
        alert('请输入简报标题！');
    }else if((desc == '') || (i == 1)){
        alert('请输入简报描述！');
    }else{
        $.ajax({
            type:'post',
            url:Urlstr + 'confsbrief_web/addinfo.do',
            data:{
                bname:title,
                introd:desc,
                imgs:'',
                // imgs:imgstr == '' ? '' : imgstr.slice(0, -1),
                confsid:NumAll.confsid,
                token:Token,
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
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
    $(".listLeft").show();
    $(".mediaSpread").show();
    $(".briefManage").hide();
    $(".submit").hide();
    $(".articleNext").show();
    $(".articleChoice").show();
    $(".listRight").css('width','90%');
    $('.artContent').attr('href','javascript:void(0)');
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
//选择推广文章
function artChoice(){
//     $.ajax({
//         type:'post',
//         url:Urlstr + 'media_web.do',
//         data:{
//             token:Token,
//         },
//         dataType:'json',
//         success:function(res){
//             if(res.error == 0){
                // var index = $(".artContent").index();
                var articleId = [];

                $("input[type=checkbox]:checked").each(function(i){
                    articleId[i] = $(this).attr('data-id');
                });
                if(articleId.length == 0){
                    alert("请选择推广文章！");
                }else{
                    //文章id存储到sessionStorage中
                    sessionStorage.setItem("data",articleId);
                    window.location.href = 'briefMedia.html' + '?confsid=' + NumAll.confsid ;
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

    if (postName && mobile) {
        $.ajax({ 
            type:'post',
            url:Urlstr + 'media_web.do',
            data:{
                briefs:articleArr,
                medias:mediaArr,
                name:$.trim($(".name").val()),
                phone:$.trim($(".phone").val()),
                token:Token
            },
            dataType:'json',
            success:function(res){
                if(res.error == 0){
                    sessionStorage.setItem("med",'');
                    sessionStorage.setItem("data",'');
                    window.location.href = 'brief.html' + '?confsid=' + NumAll.confsid;
                    alert(res.msg);
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

//token
function ReqToken() {
    $('#reqtoken').load("login2.html",function() {
        $('#reqtoken').show();
    });
}