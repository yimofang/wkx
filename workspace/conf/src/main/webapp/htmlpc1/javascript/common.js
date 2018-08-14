// var urlstr = 'http://weihuiyi.ldynet.cn:89/',
// var urlstr = 'http://192.168.2.220:89/conf/', //wukexue本地
var urlstr = 'http://192.168.2.220:8080/conf/',
    halfUrl = GetRequest(),
    Token = sessionStorage.getItem('token');

//截取url数据
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 时间戳转时间
function ZHDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date);
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date) + " " + getzf(hour) + ":" + getzf(minute);

}

function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

function GMTToStr(time){
    var date = new Date(time)
    var Str=date.getFullYear() + '-' +
        getzf(date.getMonth() + 1) + '-' +
        getzf(date.getDate()) + ' ' +
        getzf(date.getHours()) + ':' +
        getzf(date.getMinutes()) + ':' +
        getzf(date.getSeconds())
    return Str
}

function getHeader() {
    $('.header').load('header.html', function() {});
    $('.footer').load('footer.html', function() {});
}

function ReqToken(num) {
    $('.shade').load('login2.html', function() {
        $('.shade').show();
        $('.shade').attr('data-isup',num);
    });
}