<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!-- 通用表头文件  -->
<jsp:include page="publicHead.jsp" />

<style>
</style>

<body class="gray-bg">



	<div class="wrapper wrapper-content animated fadeInRight"
		style="padding: 10px;">

		<div class="row">
		
		<c:forEach items="${im}" var="im" >
		
			<div class="col-sm-4">
				<div class="contact-box">
				 
						<div class="col-sm-4">
							<div class="text-center">
							
								<img alt="image" class="img-circle m-t-xs img-responsive"
									src="${scrPath}/img/${im.headimg}" >
									
								<div class="m-t-xs font-bold">${im.oname}</div>
							</div>
						</div>
						<div class="col-sm-8">
							<h3>
								<strong>${im.realname}</strong>
							</h3>
							<p>
								<i class="fa fa-phone-square"></i>&nbsp; ${im.phone}
							</p>
							<address>
								<strong>Baidu, Inc.</strong><br> E-mail:xxx@baidu.com<br>
								Weibo:<a href="">http://weibo.com/xxx</a><br> <abbr
									title="Phone">Tel:</abbr> (123) 456-7890
							</address>
							
						</div>
						<div class="clearfix"></div>
					 
				</div>
			</div>
		
		
		</c:forEach>
		
		 
			
			
		</div>

	</div>






</body>

</html>
