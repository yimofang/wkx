<script type="text/javascript" src="${pageContext.request.contextPath}/js/dateDemo.js"></script>
<style type="text/css">
	#riliWrap {
		width: 100%;
		height: 700px;
	}
	
	.dateWrap {
		width: 40%;
		margin: 100px auto 0;
		height:400px;
	}
	
	.closeDateBtn {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 18px;
		color: grey;
	}
	
	.closeDateBtn:hover {
		color: black;
	}
	
	.dateTabs {
		height: 70%;
		padding-top: 15px;
		border-top:1px solid grey;
		margin-bottom:15px;
		position: relative;
		border-bottom:1px solid grey;
	}
	
	.yearTab,
	.monthTab,
	.dayTab {
		position: absolute;
		width: 100%;
		height: 100%;
		font-size: 13px;
	}
	
	.check-option {
		overflow: hidden;
		margin-bottom: 15px
	}
	
	.weeks-day,
	.days-day,
	.years-year,
	.months-month {
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 1em;
	}
	
	.weeks-day span,
	.days-day span,
	.months-month span {
		float: left;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin: 2px 5px 2px;
		border-radius: 3px;
	}
	
	.weeks-day span:hover,
	.days-day span:hover,
	.months-month span:hover {
		background-color: #307dbf;
		color: white;
	}
	.runtime-title{
		font-size: 14px;
		font-weight:600;
	}
	.selected{
		color:white;
		background-color:#3682c0;
	}
</style>
<div id="riliWrap">
	<div class="dateWrap">
		<div class="panel" style="height:100%">
			<div class="panel-body" style="height:100%;position:relative;box-sizing: border-box;padding: 20px 15px;background-color:white;">
				<span class="glyphicon glyphicon-remove closeDateBtn" aria-hidden="true"></span>
				<div class="btn-group" role="group" aria-label="..." id="btns" style="margin-bottom:15px">
					<button type="button" class="btn btn-primary activeBtn" dateType="yearTab">年</button>
					<button type="button" class="btn btn-default" dateType="monthTab">月</button>
					<button type="button" class="btn btn-default" dateType="dayTab">日</button>
				</div>
				<div class="dateTabs">
					<div class="yearTab activeTab" style="display:block">
						<div class="check-option">
							<input type="checkbox" name="everyyear" id="everyyear" class="year"/>
							<label for="year">每年</label>
						</div>
						<div class="check-option">
							<input type="checkbox" name="year" id="year" class="year"/>
							<label for="year">指定年</label>
							<div class="years-year">
								<input type="text" value="2017 - 2019" class="layui-input" id="yearRange" name="startyear" onfocus="yearSwitch()" onchange="changeYear(this.value)" style="width:60%;height:30px;float:left">
							</div>
						</div>
					</div>
					<div class="monthTab" style="display:none">
						<div class="check-option">
							<input type="checkbox" name="everymonth" id="everymonth" class="month"/>
							<label for="day">每月</label>
						</div>
						<div class="check-option">
							<input type="checkbox" name="month" id="month" class="month"/>
							<label for="month">指定月</label>
							<div class="months-month">
								<span data-value="">1</span>
								<span data-value="">2</span>
								<span data-value="">3</span>
								<span data-value="">4</span>
								<span data-value="">5</span>
								<span data-value="">6</span>
								<span data-value="">7</span>
								<span data-value="">8</span>
								<span data-value="">9</span>
								<span data-value="">10</span>
								<span data-value="">11</span>
								<span data-value="">12</span>
							</div>
						</div>
					</div>
					<div class="dayTab" style="display:none">
						<div class="check-option">
							<input type="checkbox" name="day" id="everyday" class="day"/>
							<label for="day">每天</label>
						</div>
						<div class="check-option">
							<input type="checkbox" name="week" id="week" class="day"/>
							<label for="week">指定周</label>
							<div class="weeks-day">
								<span data-value="1">1</span>
								<span data-value="2">2</span>
								<span data-value="3">3</span>
								<span data-value="4">4</span>
								<span data-value="5">5</span>
								<span data-value="6">6</span>
								<span data-value="7">7</span>
							</div>
						</div>
						<div class="check-option">
							<input type="checkbox" name="day" id="day" class="day"/>
							<label for="day">指定天</label>
							<div class="days-day">
								<span data-value="1">1</span>
								<span data-value="2">2</span>
								<span data-value="3">3</span>
								<span data-value="4">4</span>
								<span data-value="5">5</span>
								<span data-value="6">6</span>
								<span data-value="7">7</span>
								<span data-value="8">8</span>
								<span data-value="9">9</span>
								<span data-value="10">10</span>
								<span data-value="11">11</span>
								<span data-value="12">12</span>
								<span data-value="13">13</span>
								<span data-value="14">14</span>
								<span data-value="15">15</span>
								<span data-value="16">16</span>
								<span data-value="17">17</span>
								<span data-value="18">18</span>
								<span data-value="19">19</span>
								<span data-value="20">20</span>
								<span data-value="21">21</span>
								<span data-value="22">22</span>
								<span data-value="23">23</span>
								<span data-value="24">24</span>
								<span data-value="25">25</span>
								<span data-value="26">26</span>
								<span data-value="27">27</span>
								<span data-value="28">28</span>
								<span data-value="29">29</span>
								<span data-value="30">30</span>
								<span data-value="31">31</span>
							</div>
						</div>
					</div>
				</div>
				<div class="runtime">
					<div class="runtime-title">运行时间</div>
					<form id="runtime">
						<input type="hidden" name="year" id="year"/>
						<input type="hidden" name="month" id="year"/>
						<input type="hidden" name="day" id="year"/>
					</form>
					<span class="runtime-year" style="margin-right:20px" value=""></span>
					<span class="runtime-month" style="margin-right:20px"  value=""></span>
					<span class="runtime-day" value=""></span>
				</div>
			</div>
		</div>
	</div>
</div>