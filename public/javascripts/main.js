/**
 * Created by Admin on 2014/11/26.
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function(){
    var nowTime = new Date().Format('yyyy年MM月dd日');
    $("#time").text(nowTime);

    var win = $.messager.progress({
        msg:'请稍等，正在加载数据...'
    });
    setTimeout(function(){
        $.messager.progress('close');
    },1000);

    // 系统操作菜单单击事件
    $("#sysMenuTree").tree({
        onClick: function(node){
            if(node.attributes && node.attributes.url){
                setmain(node.text, node.attributes.url);
            }
        }
    });
});

function mangeUserLogout(href){
    $.messager.confirm('提示','您确定要退出系统吗?',function(result){
        if(result){
            window.location.href = href;
        }
    });
}

function setmain(title, href) {
    // 判断选项卡是否已经存在，存在则不再添加该选项卡并将该选项卡选中
    if($('#manageTabs').tabs('exists', title)){
        $('#manageTabs').tabs('select', title);
    }else{
        $('#manageTabs').tabs('add',{
            title:title,
            href : href,
            closable:true,
            cache : true,
            iconCls:'icon-mini-add'
        });
    }
}