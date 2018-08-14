
function likes(fid,tname){
	//点赞
	if($("#userid")==null){
		aleart("请重新登陆");
		return true;
	}
	$.ajax({
		type : "POST", //提交方式  
		url :  $("#basePath").val() + "/praise_move/add_praise",//路径   
		data : {
			findid : fid,
			tableName: tname ,
			userid: $("#userid").val() ,
		},//数据，这里使用的是Json格式进行传输  
		dataType : "json",
		success : likes_succ ,//返回数据根据结果进行相应的处理  
  		
	});
	
}