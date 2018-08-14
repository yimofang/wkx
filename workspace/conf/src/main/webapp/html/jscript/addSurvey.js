var _type=NumAll.type;
$(function(){
	/*判断问题的添加、修改*/
	if(NumAll.state == 1){
		$(".addSurQue").show();
		$(".editSurQue").remove();
	}else{
		$(".addSurQue").remove();
		$(".editSurQue").show();	
		query();
	}

	/*添加单选：删除选项*/
	$(".addSinOpt").on('click','.singDel',function(){
		$(this).parent().remove();
		var num2 = $(".addSinOpt>.singleOptList").length;
		for(var i=0;i<num2;i++){
			$(".addSinOpt>.singleOptList>span").eq(i).find($(".num")).html(i+1);
		}
	});

	/*修改单选：删除选项*/
	$(".editSinOption").on('click','.singDel',function(){
		$(this).parent().remove();
		var editNum2 = $(".singleOption>.editSinOptList").length;
		for(var i=0;i<editNum2;i++){
			$(".singleOption>.editSinOptList>span").eq(i).find($(".sinNum")).html(i+1);
		}
	});

	/*添加多选：删除选项*/
	$(".addDoubOpt").on('click','.douDel',function(){
		$(this).parent().remove();
		$("#more>option").eq(-1).remove();
		$("#less>option").eq(-1).remove();

		var douNum2 = $(".addDoubOpt > .douOptList").length;
		for(var i=0;i<douNum2;i++){
			$(".addDoubOpt>.douOptList>span").eq(i).find($(".douNum")).html(i+1);
		}
	});

	/*修改多选：删除选项*/
	$(".editDoubOpt").on('click','.douDel',function(){
		$(this).parent().remove();
		$("#editMore>option").eq(-1).remove();
		$("#editLess>option").eq(-1).remove();

		var editDouNum2 = $(".editDoubOpt > .editDouOptList").length;
		for(var i=0;i<editDouNum2;i++){
			$(".editDoubOpt>.editDouOptList>span").eq(i).find($(".editDouNum")).html(i+1);
		}
	});

});

/*提交单选*/
function singleBtn(){
	var singVal = $("#singleTitle").val();
	var singOpt = $(".addSinOpt > .singleOptList");
	var singOptVal = '';
	/*选项列表*/
	$(".sOptionVal").each(function(){
		singOptVal += $(this).val() + ',';
		console.log(singOptVal);
	});	

	if(singVal == ''){
		alert('请输入题目标题！');
	}else if(singOpt.length == 0){
		alert('请添加选项信息！');
	}else{	
		$.ajax({
			type:'POST',
			url:Urlstr + 'qnrTitle_web/addTitleInfo.do',
			data:{
				confid:NumAll.confsid,
				token:Token,
				name:singVal,
				tstate:1,
				options:singOptVal,
				qnrid:NumAll.other
			},
			dataType:'json',
			success:function(res){
				if(res.error == 0){
					if(_type == 0){
                        window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
					}else{
                        window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
					}

				}else if( res.error == 5){
					alert(res.msg);
					ReqToken();
                    Token = sessionStorage.getItem('token');
				}else{
					alert(res.msg);
				}
			}
		});
	}	
}

/*单选：添加选项*/
function addSingleList(){ 
	var num = $(".addSinOpt>div").length+1;
	var txt = "<div class='singleOptList'><span>选项<span class='num'>"+num+"</span></span> <input class='sOptionVal' type='text' placeholder='请填写选项'><button class='singDel'></button></div>";
	$(".addSinOpt").append(txt);
	num++;
}

/*提交多选*/
function doubleBtn(){
	var douVal = $("#douTitle").val();
	var douOpt = $(".doubleOption>.douOptList").length;
	var lessVal = $("#less").val();
	var moreVal = $("#more").val();
	var doubOptVal = '';
	console.log(lessVal);
	console.log(moreVal);

	/*选项列表*/
	$(".dOptionVal").each(function(){
		doubOptVal += $(this).val() + ',';
	});	

	if(moreVal - lessVal < 0){
		alert('最多选择应大于最少选择！');
	}else{
		$.ajax({
			type:'POST',
			url:Urlstr+'qnrTitle_web/addTitleInfo.do',
			data:{
				confid:NumAll.confsid,
				token:Token,
				name:douVal,
				tstate:2,
				qnrmin:lessVal,
				qnrmax:moreVal,
				options:doubOptVal,
				qnrid:NumAll.other
			},
			dataType:'json',
			success:function(res){
				if(res.error == 0){
                    if(_type == 0){
                        window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }else{
                        window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }
				}else if(res.error == 5){
					alert(res.msg);
					ReqToken();
                	Token = sessionStorage.getItem('token');
				}else{
					alert(res.msg);
				}
			}
		});
	}
}

/*多选：添加选项*/
function addDoubleList(){
	var douNum = $(".doubleOption > div").length;
	var douTxt = "<div class='douOptList'><span class='opt'>选项<span class='douNum'>"+douNum+"</span></span> <input class='dOptionVal' type='text' placeholder='请填写选项'><button class='douDel'></button></div>";
	$(".addOption").before(douTxt);
	$(".select").append("<option value="+douNum+">"+douNum+"</option>");
	douNum++;	
}

/*提交填空*/
function blankBtn(){
	var blankVal = $("#blankTitle").val();
	var inputVal = $("input[type='radio']:checked").attr('data-state');
	/*选项列表*/
	var labVal = '';
	var val1 = $(".blankLab1").text() + ',';
	var val2 = $(".blankLab2").text();
	labVal = val1;
	labVal += val2;

	$.ajax({
		type:'POST',
		url:Urlstr+'qnrTitle_web/addTitleInfo.do',
		data:{
			confid:NumAll.confsid,
			token:Token,
			name:blankVal,
			tstate:3,
			options:labVal,
			isitem:inputVal,
			qnrid:NumAll.other
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){
                if(_type == 0){
                    window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                }else{
                    window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                }
			}else if(res.error == 5){
				alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
			}else{
				alert(res.msg);
			}
		}
	});	
}

/*查询问题与选项信息*/
function query(){
	$.ajax({
		type:'post',
		url:Urlstr + 'qnrTitle_web/getTitleInfo.do',
		data:{
			titleid:NumAll.questionId,
			token:Token
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){
				if(res.row.tstate == 1){ //单选
					var sinOptsArr = res.row.options;
					var htmlSin = '';

					$("#editSingleTitle").val(res.row.fname);
					for(var i=0;i<sinOptsArr.length;i++){
						htmlSin += `<div class="editSinOptList">
										<span>选项<span class="sinNum">${i+1}</span></span>
										<input class="ediSOptVal" type="text" placeholder="请填写选项" value="${sinOptsArr[i].fname}">
										<button class="singDel"></button>
									</div>`;
					}
					$(".singleOption").html(htmlSin);
				}
				if(res.row.tstate == 2){ //多选
					var douOptsArr = res.row.options;
					var htmlDou = '';
					var htmlOpt = '';
					var htmlOpt2 = '';

					$("#editDouTitle").val(res.row.fname);
					for(var j=0;j<douOptsArr.length;j++){
						htmlDou += `<div class="editDouOptList">
										<span class="opt">选项<span class="editDouNum">${j+1}</span></span>
										<input class="editDOptionVal" type="text" placeholder="请填写选项" value="${douOptsArr[j].fname}">
										<button class="douDel"></button>
									</div>`;
					}
					$(".doubleOption").html(htmlDou);
					//设置select选中的text
					//最少选择
					for(var q=0;q<douOptsArr.length;q++){
						if(res.row.qnrmin == (q+1)){
							htmlOpt += `<option value="${q+1}" selected>${q+1}</option>`;
						}else{
							htmlOpt += `<option value="${q+1}">${q+1}</option>`;
						}
					}
					$("#editLess").html(htmlOpt);

					//最多选择
					for(var p=0;p<douOptsArr.length;p++){
						if(res.row.qnrmax == (p+1)){
							htmlOpt2 += `<option value="${p+1}" selected>${p+1}</option>`;
						}else{
							htmlOpt2 += `<option value="${p+1}">${p+1}</option>`;
						}
					}
					$("#editMore").html(htmlOpt2);
				}
				if(res.row.tstate == 3){ //填空
					$("#editBlankTitle").val(res.row.fname);
					var editOpts = res.row.isitem;
					if(editOpts == 1){
						$(".lab1 input").attr("checked",'checked');
					}else if(editOpts == 2){
						$(".lab2 input").attr("checked",'checked');
					}
				}
			}else if(res.error == 5){
				alert(res.msg);
				ReqToken();
                Token = sessionStorage.getItem('token');
			}else{
				alert(res.msg);
			}
		}
	});
}

/*单选:保存修改*/
function saveEditSing(){
	var singVal = $("#editSingleTitle").val();
	var singOpt = $(".singleOption .editSinOptList").length;
	var editSinOptVal = '';
	/*选项列表*/
	$(".ediSOptVal").each(function(){
		editSinOptVal += $(this).val() + ',';
	});	

	if(singVal == ''){
		alert('请输入题目标题！');
	}else if(singOpt == 0){
		alert('请添加选项信息！');
	}else{	
		$.ajax({
			type:'POST',
			url:Urlstr + 'qnrTitle_web/alterTitleInfo.do',
			data:{
				name:singVal,
				options:editSinOptVal,
				titleid:NumAll.questionId,
				tstate:1,
				token:Token
			},
			dataType:'json',
			success:function(res){
				if(res.error == 0){
                    if(_type == 0){
                        window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }else{
                        window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }
				}else if( res.error == 5){
					alert(res.msg);
					ReqToken();
                    Token = sessionStorage.getItem('token');
				}else{
					alert(res.msg);
				}
			}
		});
	}	
}

/*单选：修改添加选项*/
function editAddSinList(){
	var editNum = $(".singleOption>.editSinOptList").length+1;
	var txt = "<div class='editSinOptList'><span>选项<span class='sinNum'>"+editNum+"</span></span> <input class='ediSOptVal' type='text' placeholder='请填写选项'> <button class='singDel'></button></div>";
	$(".singleOption").append(txt);
	editNum++;
}

/*多选:保存修改*/
function editDoubleBtn(){
	var douVal = $("#editDouTitle").val();
	var douOpt = $(".editDoubOpt>.editDouOptList").length;
	var intArr = $(".editDOptionVal");
	var editLVal = $("#editLess").val();
	var editMVal = $("#editMore").val();
	var doubOptVal = '';

	/*选项列表*/
	$(".editDOptionVal").each(function(){
		doubOptVal += $(this).val() + ',';
	});	
	
	if(editMVal - editLVal < 0){
		alert('最多选择应大于最少选择！');
	}else{
		/*判断选项是否为空*/
		for(var int=0;int<douOpt;int++){
			if(intArr[int].value == null || intArr[int].value == ''){
				alert('请输入选项'+(int+1)+'的内容信息！');
			}
		}

		$.ajax({
			type:'POST',
			url:Urlstr+'qnrTitle_web/alterTitleInfo.do',
			data:{
				name:douVal,
				options:doubOptVal,
				qnrmax:editMVal,
				qnrmin:editLVal,
				titleid:NumAll.questionId,
				tstate:2,
				token:Token
			},
			dataType:'json',
			success:function(res){
				if(res.error == 0){
                    if(_type == 0){
                        window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }else{
                        window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                    }
				}else if(res.error == 5){
					alert(res.msg);
					ReqToken();
                	Token = sessionStorage.getItem('token');
				}else{
					alert(res.msg);
				}
			}
		});
	}
	
}

/*多选:修改添加选项*/
function editAddDouList(){
	var editDouNum = $(".editDoubOpt > .editDouOptList").length+1;
	var douTxt = "<div class='editDouOptList'><span class='opt'>选项<span class='editDouNum'>"+editDouNum+"</span></span> <input class='editDOptionVal' type='text' placeholder='请填写选项'><button class='douDel'></button></div>";
	$(".editDoubOpt").append(douTxt);
	$(".select").append("<option value="+editDouNum+">"+editDouNum+"</option>");
	editDouNum++;
}

/*填空:保存修改*/
function editBlankBtn(){
	var blankVal = $("#editBlankTitle").val();
	var inputVal = $("input[type='radio']:checked").attr('data-state');

	/*选项列表*/
	var labVal = '';
	var val1 = $(".blankLab1").text() + ',';
	var val2 = $(".blankLab2").text();
	labVal = val1;
	labVal += val2;

	$.ajax({
		type:'POST',
		url:Urlstr+'qnrTitle_web/alterTitleInfo.do',
		data:{
			name:blankVal,
			options:labVal,
			titleid:NumAll.questionId,
			tstate:3,
			isitem:inputVal,
			token:Token
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){
                if(_type == 0){
                    window.location.href = 'survey.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                }else{
                    window.location.href = 'survey2.html'+ '?confsid=' + NumAll.confsid +'&&qnrid=' + NumAll.other+'&states='+NumAll.states;
                }
			}else if(res.error == 5){
				alert(res.msg);
                ReqToken();
                Token = sessionStorage.getItem('token');
			}else{
				alert(res.msg);
			}
		}
	});	
}

//Token 过期 重新请求
function ReqToken() {
    $('#reqtoken').load("login3.html", function () {
        $('#reqtoken').show();
    });
}
