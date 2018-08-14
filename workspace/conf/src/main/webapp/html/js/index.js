$(function () {
    "use strict";
    //修改-下期预告
    $('#content').artEditor({
        imgTar: '#imageUpload',
        limitSize: 100,   // 兆
        showServer: true,
        uploadUrl: Urlstr + 'imgbase.do',
        data: {token: Token},
        uploadField: 'imgStr',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {
            if (res.error == '0') {
                console.log(res);
                return Urlstr +'upload/' + res.row.filename;
            } else if (res.error == 5) {
                alert(res.info);
                ReqToken();
            } else {
                alert('图片太大');
            }
            return false;
        },
        uploadError: function (status, error) {
            alert('网络异常' + status)
        }
    });

    //修改-会议描述
    $('#content2').artEditor({
        imgTar: '#imageUpload2',
        limitSize: 100,   // 兆
        showServer: true,
        uploadUrl: Urlstr + 'imgbase.do',
        data: {token: Token},
        uploadField: 'imgStr',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {

            if (res.error == '0') {
                console.log(res);
                return Urlstr +'upload/' + res.row.filename;
            } else if (res.error == 5) {
                alert(res.info);
                ReqToken();
            } else {
                alert('图片太大');
            }
            return false;
        },
        uploadError: function (status, error) {
            alert('网络异常' + status)
        }
    });

    //发布-会议描述
    $('#content3').artEditor({
        imgTar: '#imageUpload3',
        limitSize: 100,   // 兆
        showServer: true,
        uploadUrl: Urlstr + 'imgbase.do',
        data: {token: Token},
        uploadField: 'imgStr',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {

            if (res.error == '0') {
                return Urlstr +'upload/' + res.row.filename;
            } else if (res.error == 5) {
                alert(res.info);
                ReqToken();
            } else {
                alert('图片太大');
            }
            return false;

        },
        uploadError: function (status, error) {

            alert('网络异常' + status)
        }
    });

    //发布-下期预告
    $('#content4').artEditor({
        imgTar: '#imageUpload4',
        limitSize: 100,   // 兆
        showServer: true,
        uploadUrl: Urlstr + 'imgbase.do',
        data: {token: Token},
        uploadField: 'imgStr',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {

            if (res.error == '0') {
                return Urlstr +'upload/' + res.row.filename;
            } else if (res.error == 5) {
                alert(res.info);
                ReqToken();
            } else {
                alert('图片太大');
            }
            return false;

        },
        uploadError: function (status, error) {
            //这里做上传失败的操作
            //也就是http返回码非200的时候
            alert('网络异常' + status)
        }
    });

    //简报
    $('#content5').artEditor({
    	imgTar: '#imageUpload5',
        limitSize: 5,   // 兆
        showServer: false,
        uploadUrl: '',
        data: {},
        uploadField: 'image',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {
            // 这里是处理返回数据业务逻辑的地方
            // `res`为服务器返回`status==200`的`response`
            // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
            // 如果发现`res`不符合业务逻辑
            // 比如后台告诉你这张图片不对劲
            // 麻烦返回 `false`
            // 当然如果`showServer==false`
            // 无所谓咯
            //var result = JSON.parse(res)
        	var result = res;
			console.log(result);
            if (result.error == '0') {
                return Urlstr +'upload/' +result.row.filename;
            } else {
                switch (result.error) {
                    case '101': {
                        alert('图片太大之类的')
                    }
                }
            }
            return false;
        },
        uploadError: function (status, error) {
            //这里做上传失败的操作
            //也就是http返回码非200的时候
            alert('网络异常' + status)
        }
    });
});
