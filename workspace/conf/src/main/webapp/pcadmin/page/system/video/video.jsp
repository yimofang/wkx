﻿<script type="text/javascript" src="${pageContext.request.contextPath}/js/system/video/video.js"></script>
<div class="col-lg-12 dri-row" style="height:860px;overflow:scroll">
	<!-- 左侧菜单 -->
	<div class="col-lg-3" style="height:100%" id="config-side">
		<ul class="nav" id="videoList" >
		 	<li id="mainList" class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                <span class="ng-scope">视频</span>
            </li>
		</ul>
	</div>
	<!-- 右侧播放区 -->
	<div class="col-lg-9" style="height:100%;overflow: scroll;">
		<div id="addVideoBar">			
			<a class="btn dribbble-btn dribbble-btn-primary btn-xs dri-animate-vertical hidden-xs" id="addVideo" onclick="videoTag('添加视频')">
					<span class="fa fa-plus dri-icon-r-md"></span>
				<div class="c-ripple js-ripple">
					<span class="c-ripple__circle"></span>
				</div>
				添加视频
			</a>
		</div>
		<div class="dri-panel panel-success">
			<div class="panel-body" id="config-side-top">
				<video src="" controls="controls" height="50px" width="50px"></video>
			</div>
		</div>
	</div>
</div>