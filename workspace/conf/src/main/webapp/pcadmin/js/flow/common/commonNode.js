//初始化函数
function initView(){
	$.ajax({
		url:contextPath+"/flow/getCustomItem.do",
		data:{"publicNodeId":custom_node_id},//data:{"publicNodeId":publicNodeId},
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.success){
				$("#domId").parent().addClass("col-lg-"+data.data.formModel.form_width);//"col-lg-"+data.data.formModel.form_width
				$.myPlugin.publicForm("domId","1");//$.myPlugin.publicForm("domId",data.data.form_id);
				//判断表单状态  编辑sts=1，查看sts=0
				if(sts == 0){
					$("#domId").append('<div class="row" style="matgin-botton:10px"><div class="col-lg-3"></div><div class="col-lg-1"><button class="btn btn-default" type="button">取消</button></div></div>')
				}else if(sts == 1){
					//如果是编辑  判断id 如果id存在则是删、改操作，如果不存在就是增加数据（不需要请求数据）
					if(id != ""){
						//获取数据
						$.ajax({
							url:contextPath+"/form/getFormData.do",
							data:{"form_id":1,"id":100000009},//data:{"form_id":data.data.form_id,"id":id},
							type:"post",
							dataType:"json",
							success:function(data){
								if(data.success){
									console.log("chenggong ")
									//获取form的id名
//									$("#domId form").form("setData",data.data)
								}
							},
							error:function(error){
								
							}
						});
					}
					$("#domId").append('<div class="row" style="matgin-botton:10px"><div class="col-lg-3"></div><div class="col-lg-1"><button type="button" class="btn btn-primary">保存</button></div><div class="col-lg-1"><button class="btn btn-default" type="button">取消</button></div></div>')
				}
				//判断右侧是否有按钮
				if(data.data.btnModel.length>0){
					$("#buttons").addClass("col-lg-"+data.data.btnModel[0].btn_width);//"col-lg-"+data.data.btnModel[0].btn_width	
					for(var i = 0;i<data.data.btnModel.length;i++){
						$("#buttons").append('<div class="col-lg-8 text-center" style="margin-top:80px;padding-left: 0px"><a class="btn dribbble-btn dribbble-btn-primary dri-animate-vertical hidden-xs" id="testtwo2" data-type="dialog12"><span class="fa fa-plus "></span><div class="c-ripple js-ripple"><span class="c-ripple__circle"></span></div>'+data.data.btnModel[i].btn_name+'</a></div>')
					}
				}
			}
		},
		error:function(error){
			
		}
	});
}
$(document).ready(function() {
	//初始化视图
	initView();
});

