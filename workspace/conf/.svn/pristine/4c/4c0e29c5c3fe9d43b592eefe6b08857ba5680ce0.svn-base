$(function () {
    getHeader();
    $('.pwd_input i').click(function () {
        $(this).siblings('input').val('');
    })
    $('.submits').click(function () {
        var p1 = $('#pedJiu').val(),
            p2 = $('#pedNew').val(),
            p3 = $('#pedNews').val();
        if((p1 && p2 && p3) == ''){
            alert("密码不能为空！");
        }else if(p2 != p3){
            alert("两次输入密码不一致！");
        }else{
            $.ajax({
                type:'post',
                url:urlstr + 'updata_pass.do',
                data:{
                    newpass:p2,
                    token:Token
                },
                dataType:'json',
                success:function(res){
                    if(res.error == 0){
                        alert(res.msg);
                        ReqToken(0);
                    }else if (res.error == 5) {
                        alert(res.msg);
                        ReqToken(0);
                    }else{
                        alert(res.msg);
                    }
                }
            });
        }
    })
})