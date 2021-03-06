//var urlstr = 'http://weihuiyi.zcgljg.com/',
 var urlstr = 'http://localhost:8080/conf/',
    halfUrl = GetRequest(),
    Token = sessionStorage.getItem('token');

$(function () {
    $('.nav_two li a').click(function () {
        window.location.href = $(this).attr('data-url')+'?conid=' + halfUrl.conid;
    })
})

//截取url数据
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 时间戳转时间
function ZHDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date);
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date) + " " + getzf(hour) + ":" + getzf(minute);

}
// 时间戳转时间
function formatDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date);

}
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

function GMTToStr(time){
    var date = new Date(time)
    var Str=date.getFullYear() + '-' +
        getzf(date.getMonth() + 1) + '-' +
        getzf(date.getDate()) + ' ' +
        getzf(date.getHours()) + ':' +
        getzf(date.getMinutes()) + ':' +
        getzf(date.getSeconds())
    return Str
}

function getHeader() {
    $('.header').load('header.html', function() {});
    $('.footer').load('footer.html', function() {});
}

function ReqToken(num) {
    $('.shade').load('login2.html', function() {
        $('.shade').show();
        $('.shade').attr('data-isup',num);
    });
}


//分页处理
function loadData(num) {
    $("#PageCount").val(num);
    loadpage();
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


function userImage(file) {
    var MAXWIDTH  = 90;
    var MAXHEIGHT = 90;
    if (file.files && file.files[0]){
        var reader = new FileReader();
        reader.onload = function(evt){
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 300, 300, 1);
                $.ajax({
                    type : 'post',
                    url : urlstr + 'imgbase.do',
                    data : {
                        imgStr :  img64,
                        token : Token
                    },
                    dataType : 'json',
                    success : function (res) {
                        console.log(res);
                        if(res.error == 0){
                            var oldimg = $('.h_userimg').attr('data-src');
                            $('.h_userimg').attr('src',urlstr+'upload/' + res.row.filename);
                            $('.h_userimg').attr('data-src',res.row.filename);
                            update_img(oldimg,res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken(0);
                        }else{
                            alert(res.msg);
                        }
                    }
                })
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
}

function update_img(old,news){
    var id = $(".h_user").attr("data-id");
    $.ajax({
        type:'post',
        url:urlstr + 'adminUsers_web/update_info.do',
        data:{
            token:Token,
            usersid:id,
            headimg:news,
            deleteimg:old
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                alert('修改成功')
            }else if (res.error == 5) {
                alert(res.msg);
                ReqToken(1);
            } else {
                alert(res.msg);
            }

        }
    });
}

function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

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