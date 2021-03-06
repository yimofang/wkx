var page = 1;
$(function(){
    myself();

    //清除--旧密码
    $("#delOldPW").click(function(){
        $(".oldPWPut").val('');
    });
    //清除--新密码
    $("#delNewPW").click(function(){
        $(".newPWPut").val('');
    });
    //再次清除--新密码
    $("#delSureNP").click(function(){
        $(".sureNewPWPut").val('');
    });

    //消息中心：上拉加载更多
    $('.Content').scroll(function() {
        //当滚动条离底部60px时开始加载下一页的内容
        if (($(this)[0].scrollTop + $(this).height() + 260) >= $(this)[0].scrollHeight) {
            clearTimeout(timers);
            //这里还可以用 [ 延时执行 ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦）
            timers = setTimeout(function() {
                if(Page>=Pagetotal){
                    return;
                }else{
                    Page++;
                    console.log("第" + Page + "页");
                }
            }, 0);
        }
    });


});


//我的首页
function myself(){
    $.ajax({
        type:'post',
        url:Urlstr + 'userInfo.do',
        data:{
            token:Token
        },
        dataType:'json',
        success:function(res){
            if(res.error == 0){
                console.log(res);
                $("#showBank").html(res.row.organiz);
                
                if((res.row.headimg == '') || (res.row.headimg == null)){
                    $("#headimg").show();
                  
                }else{
                    $("#headimg img").attr('src',Urlstr+'upload/'+res.row.headimg);
                    $(".myHead").attr("data-id",res.row.usersid);
                    $("#headimg").show();
                }

                var arr = res.row.organizlist;
                var data = [];
                if(arr.length != 0){
                    for(var i=0;i<arr.length;i++){
                        var obj = {
                            id :arr[i].id,
                            value : arr[i].name
                        };
                        data.push(obj);
                    }

                    console.log(data);
                    $(".selName").append(data);

                    var showBankDom = document.querySelector('#showBank');
                    var bankIdDom = document.querySelector('#bankId');
                    showBankDom.addEventListener('click', function () {
                        var bankId = showBankDom.dataset['id'];
                        var bankName = showBankDom.dataset['value'];

                        var bankSelect = new IosSelect(1, 
                            [data],
                            {
                                container: '.container',
                                title: '请选择名称',
                                itemHeight: 50,
                                itemShowCount: 3,
                                oneLevelId: bankId,
                                callback: function (selectOneObj) {
                                    bankIdDom.value = selectOneObj.id;
                                    showBankDom.innerHTML = selectOneObj.value;
                                    showBankDom.dataset['id'] = selectOneObj.id;
                                    showBankDom.dataset['value'] = selectOneObj.value;
                                    selected(selectOneObj.value,selectOneObj.id,res.row.usersid);
                                }
                        });
                    });
                }
            }else if(res.error == 5){
                ReqToken();
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        }
    });
}


//修改名称
function selected(name,oid,id){
    $.ajax({
        type:'post',
        url:Urlstr + 'adminUsers_web/update_info.do',
        data:{
            token:Token,
            usersid:id,
            organizstr:name,
            organizid:oid
        },
        dataType:'json',
        success:function(res){
            console.log(res);
            $(".myName").css('display','block');
            $(".myName").html(name);
            $(".selName").css('display','none'); 
        }
    });
    
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login2.html",function() {
        $('#reqtoken').show();
    });
}

//修改图片
function update_img(headimg){
  var id = $(".myHead").attr("data-id"); 
  var deleteimg =  $(".myselfImg").attr("data-img");
  var nid = $("select option:selected").attr("data-nid");
  var name = $("select option:selected").val();
  $.ajax({
      type:'post',
      url:Urlstr + 'adminUsers_web/update_info.do',
      data:{
          token:Token,
          usersid:id,
          headimg:headimg,
          deleteimg:deleteimg
      },
      dataType:'json',
      success:function(res){
          console.log(res);
          $(".myselfImg").attr("data-img",res.row.headimg);

      }
  });
}

