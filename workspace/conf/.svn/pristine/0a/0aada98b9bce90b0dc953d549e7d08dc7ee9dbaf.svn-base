<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
	
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
	pageContext.setAttribute("scrPath", path);
%>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>后台管理系统</title>
<meta name="keywords" content=" ">
<meta name="description"	content=" ">

<link rel="shortcut icon" href="favicon.ico">

<link href="${scrPath}/hframe/css/bootstrap.min.css?v=3.3.6"
	rel="stylesheet">
<link href="${scrPath}/hframe/css/font-awesome.css?v=4.4.0"
	rel="stylesheet">
 
<link href="${scrPath}/hframe/css/animate.css" rel="stylesheet">
<link href="${scrPath}/hframe/css/style.css?v=4.1.0" rel="stylesheet">

<!-- 全局js -->
<script src="${scrPath}/hframe/js/jquery.min.js?v=2.1.4"></script>
 
 
<!-- 自定义js -->
  <script src="${scrPath}/hframe/js/content.js?v=1.0.0"></script>  
 
<link rel="stylesheet" href="${scrPath}/js/msselect/css/msdropdown/sample.css" />
<link rel="stylesheet" type="text/css" href="${scrPath}/js/msselect//css/msdropdown/dd.css" />
<script src="${scrPath}/js/msselect/js/msdropdown/jquery.dd.min.js"></script>
 
<style>
    #imglist{overflow: hidden;}
    #imglist img{float:left;width:31.33%;height:350px;margin:1%;}
</style>
</head>


 
 <body class="gray-bg">
    <div class="wrapper wrapper-content">
    
       <input type="hidden" id="confsid" value="${confsid}"> 
    
        <div class="row">
        	<div class="col-sm-3">
                <div class="ibox float-e-margins" >
                    <div class="ibox-title">
                          <span class="label label-primary" style="width: 40%;height: 23px;line-height: 18px;font-size: 14px;    background-color: #d1dade;">操作</span>
                    </div>
                 <div class="ibox-content">
                      <button type="button" class="btn btn-w-m btn-success" onclick="houtui()" >返回</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                          <span class="label label-primary" style="width: 40%;height: 23px;line-height: 18px;font-size: 14px;">报名</span>
                    </div>
                 <div class="ibox-content">
                        <h1 class="no-margins">${bm }</h1>
                      
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-info" style="width: 40%;height: 23px;line-height: 18px;font-size: 14px;">签到</span>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">${qd }</h1>
                      
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                       <span class="label label-warning" style="width: 40%;height: 23px;line-height: 18px;font-size: 14px;">未签到</span>
                     
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">${wqd }</h1>
                       
                    </div>
                </div>
            </div>
 
 
 
        </div>
 
      
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>签到表照片  </h5>
         
                    </div>
                    	
                    <div class="ibox-content" id="imglist">
                        <c:forEach items="${imgs }" var="i">               
                            <img alt="image" src="${basePath}/upload/${i}" />
                      </c:forEach>
   
                    </div>
                </div>
            </div>
        </div>
      
      
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>会议简报</h5>
                    </div>
                    
                    <div class="ibox-content">
                        <div class="panel-body">
                            <div class="panel-group" id="accordion">
                               <!--  <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0);">标题 #1</a>
                                            </h5>
                                    </div>
                                    <div id="collapseOne" class="panel-collapse collapse in">
                                        <div class="panel-body">
                                            Bootstrap相关优质项目推荐 这些项目或者是对Bootstrap进行了有益的补充，或者是基于Bootstrap开发的
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0);">标题 #2</a>
                                            </h4>
                                    </div>
                                    <div id="collapseTwo" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            Bootstrap相关优质项目推荐 这些项目或者是对Bootstrap进行了有益的补充，或者是基于Bootstrap开发的
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default"> -->
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0);">标题 #3</a>
                                            </h4>
                                    </div>
                                    <div id="collapseThree" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            Bootstrap相关优质项目推荐 这些项目或者是对Bootstrap进行了有益的补充，或者是基于Bootstrap开发的
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        </div>
   
      
      

    </div>

<script>

function houtui(){
	window.location.href='${basePath}/confs.do?';
}
	
	$(function(){
		//简报
		list();
		$('#accordion').on('click','.panel-heading',function(){
			var state = $(this).siblings('.panel-collapse').css('height');
			console.log(state);
			if(state == '0px'){
				$(this).siblings('.panel-collapse').css('height','500px');
				$(this).parent('.panel').siblings('.panel').children('.panel-collapse').css('height','0');
			}else{
				$(this).siblings('.panel-collapse').css('height','0');
				$(this).parent('.panel').siblings('.panel').children('.panel-collapse').css('height','0');
			}
			
		})
	})
	function list(){
		//简报
		var Did = $('#confsid').val();
		$.ajax({
			type:'post',
			url:'${basePath}/confs/brielist.do',
			data:{id:Did},
			dataType:'json',
			success:function(res){
				var htmlstr = '';
				for(var i =0;i<res.length;i++){
					var imglist = res[i].imgs.split(",");
					htmlstr +='<div class="panel panel-default">'+
                        			'<div class="panel-heading">'+
                    					'<h5 class="panel-title">'+
                            				'<a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0);">'+res[i].bname+'</a>'+
                        				'</h5>'+
                					'</div>'+
                					'<div class="panel-collapse collapse in" style="height:0;overflow-y: scroll;transition: height 1s;">'+
                    					'<div class="panel-body">'+
                    					'<p>'+res[i].introd+'</p>';
                    for(var j=0;j<imglist.length;j++){
                    	htmlstr +='<img src="${basePath}/upload/'+imglist[j]+'" width=100%>';
                    }					
                    htmlstr +='</div>'+
                					'</div>'+
            					'</div>';
				}
				console.log(htmlstr);
				$('#accordion').html(htmlstr);
				//$('#accordion .panel-default:eq(0) .panel-collapse').css('height','auto');
			}
		})
	}
</script>	
   

</body>
 