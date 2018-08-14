$(function(){
	showData();
});

//资料管理
function showData(){
	$.ajax({
		type:'POST',
		url:Urlstr + 'confs_web/confRim.do',
		data:{
			conftoken:NumAll.confsid,
			type:3,
			token:Token,
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){
                var fileall = res.row;
                if (fileall.length > 0) {
                    var html5 = '';
                    for (var i = 0; i < fileall.length; i++) {
                        var index1 = fileall[i].file.lastIndexOf(".");
                        var index2 = fileall[i].file.length;
                        var file_img = fileall[i].file.substring(index1 + 1, index2);
                        var file_img_src = '';
                        switch (file_img) {
                            case 'doc':
                            case 'docx':
                                file_img_src = 'word.jpg';
                                break;
                            case 'xls':
                            case 'xlsx':
                                file_img_src = 'excel.jpg';
                                break;
                            case 'ppt':
                            case 'pps':
                                file_img_src = 'ppt.jpg';
                                break;
                            case 'pdf':
                                file_img_src = 'pdf.jpg';
                                break;
                            default:
                                file_img_src = 'qita.jpg';
                                break;
                        }
                        html5 += `<li>
                                <a href="dataDetail.html?id=${fileall[i].id}">
                                    <img src="${Urlstr}upload/${file_img_src}" alt="">
                                    <div class="DataInfo">
                                        <p class="DataTitle" >${fileall[i].dname}</p>
                                        <!--<p class="DataNum Ove">-->
                                            <!--<span class="DataLook"></span>-->
                                            <!--<span>129</span>-->
                                            <!--<span class="DataShare"></span>-->
                                            <!--<span>47</span>-->
                                        <!--</p>-->
                                    </div>
                                </a>
                                <span class="dataDelBtn" onclick="deleData(${i},'${fileall[i].id}')"></span>
                            </li>`
                    }
                    $('.data ul').html(html5);
                }
			}else if(res.error == 5){
				alert(res.msg);
			}else{
				alert(res.msg);
			}
		}
	});

}



//删除资料
function deleData(a,b){


	$.ajax({
		type:'POST',
		url:Urlstr + 'confsDatum_web/delete_datum.do',
		data:{
			datumid:b,
			token:Token
		},
		dataType:'json',
		success:function(res){
			if(res.error == 0){
                $('.data ul li:eq('+a+')').remove();
			}else if(res.error == 5){
				alert(res.msg);
                ReqToken();
			}else{
				alert(res.msg);
			}
		}
	});
}