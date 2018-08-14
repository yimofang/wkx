var surveyId = '';
$(function () {
    GetSurveyList();

    /*隐藏：题型弹框*/
    $("#cancel").click(function () {
        $(".addQuestion").hide();
    });

    /*隐藏：删除问题弹框*/
    $("#conCel").click(function () {
        $(".deleBg").hide();
    });

    /*展示：删除问题弹框*/
    $(".haveContent .conList").on('click', '.delete', function () {
        $(".deleBg").show();
        $('#conSure').attr('data-id', $(this).parents(".quesList").attr('id'));
        $('#conSure').attr('data-index', $(this).parents('.quesList').index());
    });

    /*删除问题*/
    $("#conSure").click(function () {
        var delId = $(this).attr('data-id');
        var index = $(this).attr('data-index');

        $.ajax({
            type: 'POST',
            url: Urlstr + 'qnrTitle_web/deleteTitleDetails.do',
            data: {
                titleid: delId,
                token: Token
            },
            dataType: 'json',
            success: function (res) {
                if (res.error == 0) {
                    $('.haveContent .conList li:eq(' + index + ')').remove();
                    $(".deleBg").hide();
                    if ($(".haveContent .quesList").length > 0) {
                        for (var i = 0; i < $(".haveContent .quesList").length; i++) {
                            $('.haveContent .quesList:eq(' + i + ') .queNum').html(i + 1 + '、');
                        }
                    } else {
                        $(".haveContent").hide();
                        $("#creNewQues").show();
                    }

                    // alert(res.msg);
                    // window.location.reload();//刷新当前页面
                } else if (res.error == 5) {
                    alert(res.msg);
                    ReqToken();
                    Token = sessionStorage.getItem('token');
                } else {
                    alert(res.msg);
                }
            }
        });
    });

    /*修改问题*/
    $(".haveContent .conList").on('click', '.edit', function () {
        var questionId = $(this).parents(".quesList").attr('id');
        var dataType = $(this).attr("data-type");

        if (dataType == 1) {
            window.location.href = 'surveySingle.html?confsid=' + NumAll.confsid + '&&surveyId=' + surveyId + '&&questionId=' + questionId;
        } else if (dataType == 2) {
            window.location.href = 'surveyDouble.html?confsid=' + NumAll.confsid + '&&surveyId=' + surveyId + '&&questionId=' + questionId;
        } else if (dataType == 3) {
            window.location.href = 'surveyBlank.html?confsid=' + NumAll.confsid + '&&surveyId=' + surveyId + '&&questionId=' + questionId;
        }
    });

    /*修改问卷标题&&简介*/
    $(".surEdit").click(function () {
        $(".surveyBg").show();
        var tit = $(".surTit").html();
        var cont = $(".surMsg").html();
        console.log(tit);
        console.log(cont);
        $(".surInfo input").val(tit);
        $(".surInfo textarea").val(cont);
    });


    //创建问卷
    $(".addSurvey").click(function () {
        $(".surveyBg").show();
    });
    //关闭问卷信息弹框
    $(".s_cancel").click(function () {
        $(".surveyBg").hide();
    });
    //提交问卷信息
    $(".s_sure").click(function () {
        var title = $(".surInfo input").val();
        var msg = $(".surInfo textarea").val();

        if ((title == '') || (msg == '')) {
            alert('请输入问卷信息！');
        } else {
            $.ajax({
                type: 'post',
                url: Urlstr + 'qnr_web/addQurInfo.do',
                data: {
                    fname: title,
                    qbrief: msg,
                    confid: NumAll.confsid,
                    token: Token
                },
                dataType: 'json',
                success: function (res) {
                    if (res.error == 0) {
                        console.log(res);
                        $(".addSurvey").hide();
                        $(".content").hide();
                        $(".surveyBg").hide();
                        $(".creNewQues").show();
                        $(".surMessage").show();

                        GetSurveyList();
                    } else if (res.error == 5) {
                        alert(res.msg);

                    } else {
                        alert(res.msg);
                    }
                }
            });
        }

    });

});

/*展示：题型弹框*/
function type() {
    if(surveyId == ''){
        alert('请点击创建问卷')
    }else{
        $(".addQuestion").show();
    }

}

/*查询问卷*/
function GetSurveyList() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'qnr_web/getQnrDetails.do',
        data: {
            confid: NumAll.confsid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                if(res.row!= null){
                    surveyId = res.row.id;
                    $(".addSurvey").hide();
                    $(".unhave").hide();
                    $(".surMessage").show();
                    $(".creNewQues").show();
                    $(".surTit").html(res.row.fname);
                    $(".surMsg").html(res.row.qbrief);
                    /*查看是否有问卷*/
                    /*有问卷：获取问卷id+问题；无问卷，获取问卷id,创建问题*/
                    var surList = res.row;
                    var quesArray = res.row.titles;//问题集合
                    $(".haveContent").attr('data-id', res.row.id);


                    if (quesArray.length == 0) {
                        $("#haveContent").hide();
                    } else {
                        /*展示问题*/
                        $("#content").hide();
                        $("#haveContent").show();
                        $(".addSurvey").hide();
                        $(".surMessage").show();
                        var htmlstr = '';
                        var pubHtmlstr = '';

                        for (var i = 0; i < quesArray.length; i++) {
                            /*单选*/
                            if (quesArray[i].tstate == 1) {
                                htmlstr += `<li class="singleCon quesList" id="${quesArray[i].id}">
											<div class="sinTop">
												<span class="sinTitle"><span class="queNum">${(i + 1) + '、'}</span><span class="questionName">${quesArray[i].fname}</span></span>
												<span class="sinEdit edit" data-type="1"></span>
												<span class="sinDel delete"></span>
											</div>`;
                                for (var j = 0; j < quesArray[i].options.length; j++) {
                                    htmlstr += `<div class="sinOption">
												<input type="radio" name="${(i + 1)}"><span class="singOptName">${quesArray[i].options[j].fname}<span>
											</div>`;
                                }
                                htmlstr += `</li>`;
                            }
                            /*多选*/
                            if (quesArray[i].tstate == 2) {
                                htmlstr += `<li class="doubleCon quesList" id="${quesArray[i].id}">
											<div class="douTop">
												<span class="douTitle"><span class="queNum">${(i + 1) + '、'}</span><span class="questionName">${quesArray[i].fname}</span><i>【多选】</i></span>
												<span class="douEdit edit" data-type="2"></span>
												<span class="douDel delete"></span>
											</div>`;
                                for (var j = 0; j < quesArray[i].options.length; j++) {
                                    htmlstr += `<div class="douOption">
												<input type="checkbox"><span class="doubOptName">${quesArray[i].options[j].fname}</span>
											</div>`;
                                }
                                htmlstr += `</li>`;
                            }
                            /*填空*/
                            if (quesArray[i].tstate == 3) {
                                htmlstr += `<li class="blankCon quesList" id="${quesArray[i].id}">
											<div class="blkTop">
												<span class="blkTitle"><span class="queNum">${(i + 1) + '、'}</span><span class="questionName">${quesArray[i].fname}</span></span>
												<span class="blkEdit edit" data-type="3"></span>
												<span class="blkDel delete"></span>
											</div>
											<input class="blkAnswer" type="text" placeholder="请输入答案">
										</li>`;
                            }
                            $(".conList").html(htmlstr);

                            /*判断是否发布*/
                            if (res.row.rls == 1) { //已发布
                                $(".edit").hide();
                                $(".blkDel").hide();
                                $(".delete").hide();
                                $(".surEdit").hide();
                                $(".bottomBtn").hide();
                                $(".creNewQues").hide();
                                $(".haveContent .conList").css('height', 'auto');
                            } else if (res.row.rls == 2) { //未发布
                                $(".edit").show();
                                $(".delete").show();
                                $(".bottomBtn").show();
                            }
                        }
                    }
                }


            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
            } else {
                alert(res.msg);
            }
        }
    });
}


function subbg() {
    $('.subbg').show();
}
function subhide() {
    $('.subbg').hide();
}
/*发布状态*/
function pubSurvey() {
    var surId = $("#haveContent").attr('data-id');
    var isCheck = $("#onlyCheck").is(':checked');
    var pubState = '';
    if (isCheck == true) {
        pubState = 1; //只能作答一次
    } else if (isCheck == false) {
        pubState = 2; //作答多次
    }

    $.ajax({
        type: 'post',
        url: Urlstr + 'qnr_web/qnrIssue.do',
        data: {
            isphone: pubState,
            qnrid: surId,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                $(".edit").hide();
                $(".delete").hide();
                $(".surEdit").hide();
                $(".bottomBtn").hide();
                $(".creNewQues").hide();
                $(".haveContent .conList").css('height', 'auto');
                $(".sinOption>input[type=radio]").hide();
                $(".douOption>input[type=checkbox]").hide();
                alert(res.msg);
                gommm();
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
            } else {
                alert(res.msg);
            }
        }
    });
}

/*选择题型*/
function other(page) {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'qnr_web/getQnrDetails.do',
        data: {
            confid: NumAll.confsid,
            token: Token
        },
        dataType: 'json',
        success: function (res) {
            if (res.error == 0) {
                window.location.href = $(page).attr('data-url') + '&confsid=' + NumAll.confsid + '&other=' + res.row.id + '&state=1&states='+NumAll.states;
            } else if (res.error == 5) {
                alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
            } else {
                alert(res.row);
            }
        }
    });
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login2.html", function () {
        $('#reqtoken').show();
    });
}

function gommm() {
    window.location.href = 'mmmm.html?confsid=' + NumAll.confsid;
}


function _save() {
    if (NumAll.states == 1) {
        window.location.href = 'meetChoice.html?confsid=' + NumAll.confsid;
    } else {
        window.location.href = 'meetChoice2.html?confsid=' + NumAll.confsid;
    }
}






