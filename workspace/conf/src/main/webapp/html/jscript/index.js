var State = 0, //状态
    Page = 1, //页码
    Pagetotal = 1, //总页码
    Select = '', //模糊查询
    isscroll = 0,
    isappend = 0;

var listWrapper = document.querySelector('.IndexContent'),
    listContent = document.querySelector('.MeetingList'),
    bottomTip = document.querySelector('.loading');

var scroll = new window.BScroll(listWrapper, {
    probeType: 1,
    click: true
});

$(function() {
    Getliust(State, Page, Token, Select, isappend);

    //禁止后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);

    });
});
//获取会议列表
function Getliust(a, b, c, d, isa) { //a:状态  b:页数  c：token  d:模糊查询 isa:isa=0清空/1插入
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/listpage.do',
        data: {
            display: '10',
            page: b,
            state: a,
            token: c,
            select: d
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.error == 0) {
                var meetlist = res.row;
                if (meetlist.length == 0) {
                    $(".unContent").show();
                } else {
                    $(".unContent").hide();
                    Pagetotal = res.pages;
                    var htmlstr = '';
                    for (var i = 0; i < meetlist.length; i++) {
                        var stime = ZHDate(new Date(meetlist[i].bhstart));
                        htmlstr += `<li>
                                        <a href="mmmm.html?confsid=${meetlist[i].id}">
                                            <img src="${Urlstr}upload/${meetlist[i].cimg}" alt="">
                                            <div class="MeetingAddress">
                                                <h2>${meetlist[i].cname}</h2>
                                                <p class="Address">${meetlist[i].addr}</p>
                                                <p class="Time">${stime}</p>
                                            </div>
                                        </a>
                                    </li>`;
                    }
                    if (isa == 0) {
                        $('.MeetingList').html(htmlstr);
                    } else {
                        $('.MeetingList').append(htmlstr);
                    }
                    scroll.refresh();
                    initScroll();
                    isscroll = 0;
                    if (res.pages == 0) {
                        bottomTip.innerText = '暂无数据';
                    } else if (res.pages == 1) {
                        bottomTip.innerText = '以上为全部数据';
                    } else {
                        bottomTip.innerText = '上拉加载更多';
                    }


                }
            } else if (res.error == 5 ||res.error == 6) {
                alert('数据加载失败，请重新登陆');
                window.location.href = 'login.html';
            } else {
                alert(res.msg);
            }
        }
    })
}
//添加会议 获取会议id
function GetMeetid() {
    $.ajax({
        type: 'POST',
        url: Urlstr + 'confs_web/createConf.do',
        data: {
            tolen: Token
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.error == 0) {
                window.location.href = 'publishMeet.html?id=' + res.row;
            } else if (res.error == 5) {
                alert(res.msg);
                window.location.href = 'login.html';
            } else {
                alert(res.msg);
            }
        }
    })
}
//全部/进行中切换
function tabList(a, index) {
    $('.NavList li span').removeClass('active');
    $('.NavList li:eq(' + index + ') span').addClass('active');
    Page = 1;
    State = a;
    isappend = 0;
    Select = '';
    bottomTip.innerText = '加载中....';
    $('.MeetingList').html('');
    scroll.refresh();
    Getliust(State, Page, Token, Select, isappend);
}

//滚动
function initScroll() {
    // 滑动结束
    scroll.on('touchend', function(position) {
        if (position.y < (this.maxScrollY - 30)) {
            bottomTip.innerText = '加载中...';
            if (Page < Pagetotal) {
                setTimeout(function() {
                    if (isscroll != 1) {
                        Page++;
                        // 向列表添加数据
                        isappend = 1;
                        Getliust(State, Page, Token, Select, isappend);
                        isscroll = 1;
                    }
                }, 0);
            } else {
                bottomTip.innerText = '以上为全部数据';
            }

        }
    });
}

function Getinfo() {
    window.location.href = 'my.html';
}
// 时间戳转时间
function ZHDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return "20" + year.toString().slice(1, 3) + "-" + getzf(month) + "-" + getzf(date) + " " + getzf(hour) + ":" + getzf(minute);
}

function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}