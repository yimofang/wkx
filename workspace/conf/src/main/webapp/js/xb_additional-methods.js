/**
 * validate自定义验证方法
 * 白琨
 * 2016-11-5
 */
///使用方法 
/// 需要验证写的 <input > 标签内  调用已经声明好的 验证关键字 如 <input  required="true"   mobile="true" >
///此自定义方法依赖于validate 验证js 需要引用对应js文件 ，并在 加载运行时运行 $("#signupForm").validate();
///

//	var icon = "<i class='fa fa-times-circle'></i> ";

	jQuery.extend(jQuery.validator.messages, { 
				//重定义提示信息 
				 required: "此项未填写信息",  
				 remote: "请修正该字段",  
				 email: "请输入正确格式的电子邮件",  
				 url: "输入的网址格式不正确，请修改",  
				 date: "输入的日期格式不正确，请修改",  
				 dateISO: "请输入合法的日期 (ISO).",  
				 number: "输入的数字不正确，请修改",  
				 digits: "输入的数字不是整数，请修改",  
				 creditcard: "请输入合法的信用卡号",  
				 equalTo: "请再次输入",  
				 accept: "请输入拥有合法后缀名的字符串",  
				 maxlength: jQuery.validator.format("输入的字符长度不超过 {0} 个，请修改"),  
				 minlength: jQuery.validator.format("输入的字符长度度最少是 {0} 个，请修改"),  
				 rangelength: jQuery.validator.format("输入的字符长度介于 {0} 和 {1}个字符之间，请修改"),  
				 range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),  
				 max: jQuery.validator.format("输入的数字不超过 {0}"),  
				 min: jQuery.validator.format("输入的数字最小为 {0} ")  
				
				
			});

    // 手机号码验证
    jQuery.validator.addMethod("mobile", function(value, element) {  
        var length = value.length;  
        var mobile =  /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/  
        return this.optional(element) || (length == 11 && mobile.test(value));  
    }, "手机号码格式错误");    
      
    // 电话号码验证
    jQuery.validator.addMethod("phone", function(value, element) {  
        var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;  
        return this.optional(element) || (tel.test(value));  
    }, "电话号码格式错误");  
      
    // 邮政编码验证
    jQuery.validator.addMethod("zipCode", function(value, element) {  
        var tel = /^[0-9]{6}$/;  
        return this.optional(element) || (tel.test(value));  
    }, "邮政编码格式错误");  
      
    // QQ号码验证
    jQuery.validator.addMethod("qq", function(value, element) {  
        var tel = /^[1-9]\d{4,9}$/;  
        return this.optional(element) || (tel.test(value));  
    }, "qq号码格式错误");  
      
    // IP地址验证
    jQuery.validator.addMethod("ip", function(value, element) {  
        var ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;  
        return this.optional(element) || (ip.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));  
    }, "Ip地址格式错误");  
      
    // 字母和数字的验证
    jQuery.validator.addMethod("chrnum", function(value, element) {  
        var chrnum = /^([a-zA-Z0-9]+)$/;  
        return this.optional(element) || (chrnum.test(value));  
    }, "只能输入数字和字母(字符A-Z, a-z, 0-9)");  
      
    // 中文的验证
    jQuery.validator.addMethod("chinese", function(value, element) {  
        var chinese = /^[\u4e00-\u9fa5]+$/;  
        return this.optional(element) || (chinese.test(value));  
    }, "只能输入中文");  
      
    // 下拉框验证
    $.validator.addMethod("selectNone", function(value, element) {  
        return value == "请选择";  
    }, "必须选择一项");  
      
    // 字节长度验证
    jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {  
        var length = value.length;  
        for (var i = 0; i < value.length; i++) {  
            if (value.charCodeAt(i) > 127) {  
                length++;  
            }  
        }  
        return this.optional(element) || (length >= param[0] && length <= param[1]);  
    }, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));  
      
   // 使用：  
      
  //  byteRangeLength[3,4]  
      
    // 整数位，小数位验证
    jQuery.validator.addMethod("decimal", function(value, element, param) {return this.optional(element) || new RegExp("^-?\\d{1," + (param.integer != null ? param.integer : "") + "}" + (param.fraction != null ? (param.fraction > 0 ? "(\\.\\d{1," + param.fraction + "})?$" : "$") : "(\\.\\d+)?$")).test(value);}, "numeric value out of bounds");  
      
 //   使用：decimal: {  
 //            integer: 12, // 整数最大位数
 //            fraction: 3  // 小数点后最多位数
 //           }  
      
    // 整数位，小数位验证
      
    jQuery.validator.addMethod("decimal2", function(value, element, param) {  
        return this.optional(element) || new RegExp("^-?\\d{1," + (param[0] != null ? param[0] : "") + "}" + (param[1] != null ? (param[1] > 0 ? "(\\.\\d{1," + param[1] + "})?$" : "$") : "(\\.\\d+)?$")).test(value);  
    }, $.validator.format("内容输入错误或者格式错误：整数位最多{0}位，小数位最多{1}位"));  
   
    //decimal2[3,4]  
    
    
    
    /* 采用不严格的方式验证电话号码。只要电话号码由数字或者数字加"-"(最多两个"-")组 *合构成，均符合。比如：400-823-823， 95555, 010-81567415, 18857107619 
     * */  
    jQuery.validator.addMethod("lenientTel", function(value, element) {  
      return this.optional(element) || (/^([0-9]{1,9}(\-)?)?([0-9]{1,9}){1}(\-[0-9]{1,9})?$/.test(value));  
    }, "电话号码格式错误!");  
    
