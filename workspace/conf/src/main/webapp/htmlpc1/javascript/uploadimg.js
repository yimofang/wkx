//图片上传预览    IE是用了滤镜。
function previewImageF(file) {
    var MAXWIDTH  = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead onclick=$("#previewImg").click() data-state="1">';
        var reader = new FileReader();
        reader.onload = function(evt){
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 750, 300, 1);
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
                            $('#imghead').attr('src',urlstr+'upload/' + res.row.filename);
                            $('#imghead').attr('data-src',res.row.filename);
                        }else if(res.error == 5){
                            alert(res.msg);
                            ReqToken(1);
                            //上传图片登陆超时，判断图片的地址是否为空
                            var imgstr = $("#imghead").attr('src');
                            if(imgstr == null){
                                $("#imghead").attr('src','img/upimg.png');
                            }
                        }else{
                            alert(res.msg);
                        }
                    }
                })
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
    // else{
    //     var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    //     file.select();
    //     var src = document.selection.createRange().text;
    //     div.innerHTML = '<img id=imghead>';
    //     var img = document.getElementById('imghead');
    //     img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    //     var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    //     status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
    //     div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    // }
}

function previewImage(file,n) {
    var MAXWIDTH  = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById("preview" + n);
    if (file.files && file.files[0])
    {
        div.innerHTML = '<img id="imghead'+n+'"  data-state="1">';
        var reader = new FileReader();
        reader.onload = function(evt){
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 750, 300, 1);
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
                            $('#imghead'+n+'').attr('src',urlstr+'upload/' + res.row.filename);
                            $('#imghead'+n+'').attr('data-src',res.row.filename);
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
    // else{
    //     var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    //     file.select();
    //     var src = document.selection.createRange().text;
    //     div.innerHTML = '<img id=imghead>';
    //     var img = document.getElementById('imghead');
    //     img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    //     var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    //     status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
    //     div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    // }
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