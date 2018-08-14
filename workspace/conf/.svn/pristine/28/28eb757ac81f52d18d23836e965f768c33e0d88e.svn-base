<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>


<style>
/* 隐藏遮罩层定义  */
* {
	margin: 0;
	padding: 0
}

/* 隐藏遮罩层定义 结束   */
</style>



<!--遮罩层  -->
<div id="seed_one"
	style="position: fixed; left: 0; top: 0; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.5); display: none; z-index: 10000;"></div>
<div c id="seed_two"
	style="background: #fff; border: 1px solid #ccc; border-radius: 3px; position: fixed; left: 0; top: 0; right: 0; bottom: 0; margin: auto; display: none; z-index: 10001; overflow: auto;">
	<input type="hidden" id="ls">

	<div class="ibox float-e-margins">
		<div class="ibox-title">
			<h5>详细信息</h5>
			<div class="ibox-tools">
				<!-- 关闭 -->
				<a href="javascript:close_div_seed()"> <i class="fa fa-times"></i>
				</a>
			</div>
		</div>

		<div class="ibox-content">
			<form class="form-horizontal m-t" id="commentForm_seed"
				enctype="multipart/form-data" accept-charset="utf-8">

			 
              

				<table id="loglist" data-height="557" class="table table-bordered">
					

				</table>


				<div class="form-group">
					<div class="col-sm-4 col-sm-offset-3">
					<!-- 	<button class="btn btn-primary"  type="submit"  id="comitForm" onclick="add_obj_seed(this)" >提交</button> -->
						<button class="btn btn-danger" type="button"
							onclick="close_div_seed()">取消</button>
					</div>
				</div>
			</form>
		</div>
	</div>

</div>
<!--遮罩层 结束 -->



<script type="text/javascript">
	var base_path_from = $("#basePath_hid").val();
 

	function close_div_seed() {
		//关闭遮罩层
		$("#seed_one").hide();
		$("#seed_two").hide();
		frominit(null, 2);
	}

	function show_div_seed() {
		//打开遮罩层
		$("#seed_one").show();
		$("#seed_two").show();
	}

 

	 
</script>
