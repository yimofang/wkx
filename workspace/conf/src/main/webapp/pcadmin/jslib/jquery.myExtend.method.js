/**
 * 自定义扩展插件
 */

$(document).ready(function() {
	jQuery.myMethod = {
		//自定义插件命名空间
		//增加一个首页面TAB,如果标题存在，则展示当前页
		addTab:function(option){
			var defaultOpt = {
				tabId:"homeTabs",      //tab控件ID
				id:"",                 //tabID
				title:"页面",           //标题
				context:"",            //tab内容
				url:"",                //tab页面
				tabType:"div",          //tab形式:div载入方式,iframe载入方式
				closable:true,
				path:""
			};
			//映射数据
			$.extend(defaultOpt,option);
			//如果有了，则显示
			if ($('#'+defaultOpt.tabId).tabs('exists', defaultOpt.title)){
				$('#'+defaultOpt.tabId).tabs('select', defaultOpt.title);
			} else {
				//iframe载入方式
				if(defaultOpt.type == "iframe"){
					var height = window.innerHeight -90;
					var content = '<iframe style="height:'+height+'px;" scrolling="auto" frameborder="0" src="'+defaultOpt.url+'" class="dribbble-container"></iframe>';
					$('#'+defaultOpt.tabId).tabs('add',{
						id:defaultOpt.id,
						title:defaultOpt.title,
						content:content,
						path:defaultOpt.path,
						closable:defaultOpt.closable
					});
				}else{
					//jquery.load载入方式
					$('#'+defaultOpt.tabId).tabs('add',{
						id:defaultOpt.id,
						title:defaultOpt.title,
						href:defaultOpt.url,
						content:defaultOpt.content,
						path:defaultOpt.path,
						closable:defaultOpt.closable
					});
				}
			}
		},
		getCurTab:function(option){
			var defaultOpt = {
				tabId:"homeTabs",      //tab控件ID
			};
			//映射数据
			$.extend(defaultOpt,option);
			return $('#'+defaultOpt.tabId).tabs('getSelected').panel('options');
		},
		toggleAfterDiv:function(ele){
			//判断状态
			if($(ele).find("span").hasClass('glyphicon-menu-left')){
				//展开
				$(ele).parent().children("div.panel-body").addClass('in');
				$(ele).find("span").removeClass("glyphicon-menu-left").addClass("glyphicon-menu-down");
			}else{
				//收起
				$(ele).parent().children("div.panel-body").removeClass('in');
				$(ele).find("span").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-left");
			}
		},
		msgLayer:function(word,id){
			layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.open({
					  type:4,
					  content: [word, '#'+id],
					  area:"150px"
				  })
			});  
		},
		notEmpty:function(id, val) {
			//不能为空或不能全部是空格
			if(val.trim() == "") { //trim去除字符串两端的空格
				$.myMethod.msgLayer("输入框不能为空或全是空格",id);
				$("#" + id).val("");
			}
		},
		onlyNumber:function(id, val) {
			//只是数字
			$("#" + id).val(val.replace(/\D/g, ''))
		},
		onlyTel:function(id, val) {
			//手机号
			var telReg = /^1[3|4|5|7|8]\d{9}$/;
			if(!telReg.test(val)) {
				$.myMethod.msgLayer("请输入正确的手机号码",id);
				$("#" + id).val("");
			}
		},
		onlyEmail:function(id, val) {
			/** 
		      验证邮箱是否输入合法 
		      验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样 
		      第一部分：由字母、数字、下划线、短线“-”、点号“.”组成， 
		      第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成， 
		      而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位 
		   */
			var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if(!emailReg.test(val)) {
				$.myMethod.msgLayer("请输入正确格式的email",id);
				$("#" + id).val("");
			}
		},
		//自定义正则
		CustomRegular:function(id, reg, val) {
			reg = eval(reg);
			if(!reg.test(val)) {
				$.myMethod.msgLayer("输入错误，请重新输入",id)
				$("#" + id).val("");
			}
		},
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		}
		
	}
});
