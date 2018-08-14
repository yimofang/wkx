$(function () {
    $(".nav_one li").css('padding', '0');
    getHeader();
    GetImgList();
    $('.upimg_list').on('click', '.img_look', function () {
        var urls = $(this).attr('data-url');
        $('.img_lookbig img').attr('src', urls);
        $('.img_lookbig').show();
    })
    $('.upimg_list').on('click', '.img_det', function () {
        var name = $(this).attr('data-name');
        var that = $(this);
        $.ajax({
            type: 'get',
            url: urlstr + 'back_web/delete_backPc.do',
            data: {
                imgs: name,
                confid: halfUrl.conid,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                that.parents('li').remove();
            }
        })
    })
    $('.guanbi').click(function () {
        $('.img_lookbig img').attr('src', '');
        $('.img_lookbig').hide();
    })
})

function DesImage(file) {

    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var image = new Image();
            image.src = evt.target.result;
            image.onload = function () {
                $.ajax({
                    type: 'post',
                    url: urlstr + 'imgbasePc.do',
                    data: {
                        imgStr: image.src,
                        confid: halfUrl.conid,
                        token: Token
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.error == 0) {
                            console.log(res);
                            var html =  '<li>' +
                                '<img src="' + urlstr + 'upload/' + res.row.filename + '" alt="">' +
                                '<div class="img_caozuo">' +
                                '    <span class="img_look" data-url="' + urlstr + 'upload/' + res.row.filename + '">预览</span>' +
                                '    <span class="img_det" data-name="' + res.row.filename + '">删除</span>' +
                                '</div>' +
                                '</li>';
                            $('.upimg_list').append(html);
                        } else if (res.error == 5) {
                            alert(res.msg);
                            ReqToken(0);
                        } else {
                            alert(res.msg);
                        }
                    }
                })
            }
        }
        reader.readAsDataURL(file.files[0]);
    }
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
    if (orient == 6) {
        ctx.save();//保存状态
        ctx.translate(canvas.width / 2, canvas.height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
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

function getPhotoOrientation(img) {
    var orient;
    EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
    });
    return orient;
}


function GetImgList() {
    $.ajax({
        type: 'post',
        url: urlstr + 'back_web/getBackInfo.do',
        data: {
            confid: halfUrl.conid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if (res.row != null) {
                    var imglist = res.row.imgs.split(',');
                    Desimgid = imglist.length;
                    var htmlstr = '';
                    for (var i = 0; i < imglist.length; i++) {
                        htmlstr += '<li>' +
                            '<img src="' + urlstr + 'upload/' + imglist[i] + '" alt="">' +
                            '<div class="img_caozuo">' +
                            '    <span class="img_look" data-url="' + urlstr + 'upload/' + imglist[i] + '">预览</span>' +
                            '    <span class="img_det" data-name="' + imglist[i] + '">删除</span>' +
                            '</div>' +
                            '</li>';
                    }
                    $('.upimg_list').html(htmlstr);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
            } else {
                alert(res.msg);
            }
        }
    })
}
