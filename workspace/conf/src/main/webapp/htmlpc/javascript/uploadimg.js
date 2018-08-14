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
}

function previewImage(file,n) {
    var MAXWIDTH  = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById("preview" + n);
    if (file.files && file.files[0])
    {
        div.innerHTML = '<img id="imghead'+n+'"  data-state="1"><input type="file" onchange="previewImage(this,'+n+')">';
        var reader = new FileReader();
        reader.onload = function(evt){
            var image = new Image();
            image.src =evt.target.result;
            image.onload = function(){
                var img64 = compress(image, 250, 300, 1);
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


