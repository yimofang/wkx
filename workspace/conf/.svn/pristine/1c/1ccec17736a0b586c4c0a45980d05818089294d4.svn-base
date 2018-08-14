$(function () {
    getHeader();
    $(".nav_one li").css('padding', '0');
    getDataList();

    $('.data_list').on('click','.item_det',function () {
        var id= $(this).attr('data-id'),
            file = $(this).attr('data-file');
        $('.yes_btn').attr('data-id',id).attr('data-file',file);
        $('.data_shade').show();
    })
})

function getDataList() {
    $.ajax({
        type: 'post',
        url: urlstr + 'confs_web/confRim.do',
        data: {
            conftoken: halfUrl.conid,
            type: 3,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.error == 0) {
                if (res.row.length > 0) {
                    for (var i = 0, html = ''; i < res.row.length; i++) {
                        html += '<li class="item"> ' +
                            '    <span class="item_tit"><b>*</b>资料标题</span> ' +
                            '    <div class="item_info"> ' +
                            '        <a href="'+urlstr+'upload/'+res.row[i].file+'">'+res.row[i].dname+'</a> ' +
                            '        <p>文档附件上传成功</p> ' +
                            '    </div> ' +
                            '    <div class="item_det" data-id="'+res.row[i].id+'" data-file="'+res.row[i].file+'">删除</div> ' +
                            '</li>';
                    }
                    $('.data_list').html(html);
                }
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        }
    })
}


function getInfo(file) {
    if (file.files && file.files[0]) {
        doUpload();
    }
}
function doUpload() {
    var formData = new FormData($("#forms")[0]);
    formData.append('token', Token);
    formData.append('confsid', halfUrl.conid);
    $.ajax({
        url: urlstr + 'confsDatum_web/fileUploadPc.do',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,  			//上传文件不需要缓存
        contentType: false,  		//已经声明了属性enctype="mutipart/form-data"，所以这里设置为false
        processData: false,
        success: function (res) {
            if (res.error == 0) {
                getDataList();
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("上传失败,重新上传");
        }
    });
}

function goback() {
    $('.yes_btn').attr('data-id','').attr('data-file','');
    $('.data_shade').hide();
}

function deletguest(obj) {
    $.ajax({
        type: 'post',
        url: urlstr + 'confsDatum_web/delete_datumPc.do',
        data: {
            datumid: obj.getAttribute('data-id'),
            file:obj.getAttribute('data-file'),
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if(res.error == 0){
                alert(res.msg);
                $('.yes_btn').attr('data-id','').attr('data-file','');
                $('.data_shade').hide();
                getDataList()
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken(0);
            } else {
                alert(res.msg);
            }

        }
    })
}