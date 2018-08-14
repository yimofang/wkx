$(function(){
	$("#search").bind("input propertychange",function(){
        var value=$(this).val();
        if(value){
            $(".SSNameList").show();
        }else{
            $(".SSNameList").hide();
        }
    });
});