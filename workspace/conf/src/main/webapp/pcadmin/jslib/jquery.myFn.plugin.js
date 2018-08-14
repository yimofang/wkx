/**
 * 自定义jQuery插件
 */

$(document).ready(function() {
	jQuery.fn.form = function(action,data){
		var form = $(this);
		var setData = function(data){
			//设置值
			var setVal = function(ele,value){
				ele.val(value);
			}
			//设置下拉
			var setSelector = function(ele,value){
				ele.val(value);
			}
			//设置选择框
			var setRadio = function(ele,value){
				ele.find("[value="+value+"]").attr("checked",true);
			}
			//设置多选框
			var setCheckBox = function(ele,value){
				ele.each(function(){
					if(value.indexOf(",") >= 0){
						var arr= new Array(); 
						arr=value.split(","); //字符分割 
						for(var i=0;i<arr.length ;i++){
							if($(this).is("input[value="+arr[i]+"]")){
								$(this).prop("checked",true);
							}
						}
					}else{
						if($(this).is("[value="+value+"]")){
							$(this).prop("checked",true);
						}
					}
				})
				
			}
			//设置标签
			var setLabel = function(ele,value){
				ele.html(value);
			}
			//遍历数据
			$.each(data,function (name,value){
				var ele = form.find("[name="+name+"]");
				if(ele.is("select")){
					setSelector(ele,value);
				}else if(ele.is("input[type=checkbox]")){
					setCheckBox(ele,value);
				}else if(ele.is("input[type=radio]")){
					setRadio(ele,value);
				}else{
					ele = form.find("#"+name);
					if(ele.is("label")){
						setLabel(ele,value);
					}else if(ele.length > 0){
						setVal(ele,value);
					}else{
						//console.log("无效表单元素:"+name);
					}
				}
			})
		}
		//只处理表单控件里的的数据
		if(form.is("form")){
			if(action == "setData"){
				//设置数据
				setData(data);
			}
		}
	}
	//表单序列化成json对象
	jQuery.fn.serializeObject = function(){
		 var obj = {};  
	     var arr = this.serializeArray();  
	     $.each(arr, function() {  
	         if (obj[this.name]) {  
	             if (!obj[this.name].push) {  
	            	 obj[this.name] = obj[this.name];  
	             }
	             obj[this.name] = (obj[this.name]+","+this.value) || '';  
	         } else {  
	        	 obj[this.name] = this.value || '';  
	         }  
	     });  
	     return obj;  
	}
});
