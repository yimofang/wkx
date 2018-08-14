/*会议封面*/
function previewImage(file)
{
    var MAXWIDTH  = 90; 
    var MAXHEIGHT = 90;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead onclick=$("#previewImg").click() data-state="1">';
        //var img = document.getElementById('imghead');
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
                        console.log(res);
                        if(res.error == 0){
                           $('#imghead').attr('src',Urlstr+'upload/' + res.row.filename);
                           $('#imghead').attr('data-src',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
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

/*嘉宾头像添加*/
function guestImage(file)
{
    var MAXWIDTH  = 40; 
    var MAXHEIGHT = 40;
    var div = document.getElementById('addperImg');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=perImgHead onclick=$("#prePersonImg").click() data-state="1">';
        var img = document.getElementById('perImgHead');
        var reader = new FileReader();
        reader.onload = function(evt){
            //img.src = evt.target.result;
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 170, 200, 1);
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
                        console.log(res);
                        if(res.error == 0){
                            $('#perImgHead').attr('src',Urlstr+'upload/'+ res.row.filename).attr('data-img',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
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

/*嘉宾头像修改*/
function EguestImage(file)
{
    var MAXWIDTH  = 40;
    var MAXHEIGHT = 40;
    var div = document.getElementById('EaddperImg');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=EperImgHead onclick=$("#EprePersonImg").click() data-state="1">';
        var img = document.getElementById('EperImgHead');
        var reader = new FileReader();
        reader.onload = function(evt){
            //img.src = evt.target.result;
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 170, 200, 1);
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
                        console.log(res);
                        if(res.error == 0){
                            $('#EperImgHead').attr('src',Urlstr+'upload/'+ res.row.filename).attr('data-img',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
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

function modifyPic(file)
{
    var MAXWIDTH  = 90; 
    var MAXHEIGHT = 90;
    var div = document.getElementById('myPic');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id="myhead" class="myselfImg" src="" width="90" height="90" onclick=$("#myPictor").click();>';
        //var img = document.getElementById('imghead');
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
                        console.log(res);
                        if(res.error == 0){
                           $('#myhead').attr('src',Urlstr+'upload/' + res.row.filename);
                           $('#myhead').attr('data-src',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
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

// function clacImgZoomParam( maxWidth, maxHeight, width, height )
// {
//     var param = {top:0, left:0, width:width, height:height};
//     if( width>maxWidth || height>maxHeight ){
//         rateWidth = width / maxWidth;
//         rateHeight = height / maxHeight;
//         if( rateWidth > rateHeight ){
//             param.width =  maxWidth;
//             param.height = Math.round(height / rateWidth);
//         }else{
//             param.width = Math.round(width / rateHeight);
//             param.height = maxHeight;
//         }
//     }
//     param.left = Math.round((maxWidth - param.width) / 2);
//     param.top = Math.round((maxHeight - param.height) / 2);
//     return param;
// }

var Desimgid = 0;

function DesImage(file) {
    var div = document.getElementById('addimg');
    if (file.files && file.files[0]){
        div.innerHTML +=('<div class="miaoshuing"><img id="Desimghead'+Desimgid+'"></div>');
        var imgid = 'Desimghead'+Desimgid;
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
                            $('#desimgall').value += res.row.filename+',';
                            document.getElementById(imgid).src =  Urlstr+'upload/' + res.row.filename;
                            $('#'+imgid).attr('data-img',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
                        }else{
                            alert(res.msg);
                        }
                    }
                })
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
    Desimgid++;
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

$(function () {
    $('#addimg').on('click','.miaoshuing',function () {
        $(this).remove();
    })
    $('#nextaddimg').on('click','.nextshuing',function () {
        $(this).remove();
    })
})

// 下期预告
var Nextimgid = 0;

function NextImage(file) {

    var div = document.getElementById('nextaddimg');
    if (file.files && file.files[0]){
        div.innerHTML +=('<div class="nextshuing"><img id="nextimghead'+Nextimgid+'"></div>');
        var imgid = 'nextimghead'+Nextimgid;
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
                            $('#nextdesimgall').value += res.row.filename+',';
                            document.getElementById(imgid).src =  Urlstr+'upload/' + res.row.filename;
                            $('#'+imgid).attr('data-img',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken();
                        }else{
                            alert(res.msg);
                        }
                    }
                })
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
    Nextimgid++;
}