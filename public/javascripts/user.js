/**
 * Created by Admin on 2014/11/26.
 */
var user = new baseManage("user");

user.resetPassword = function(){
    var rows = $("#userTable").datagrid('getSelections');
    if(rows.length==0){
        $.messager.alert('提示',"请先选择至少一个用户再进行重置密码操作！",'info');
        return;
    }
    $.messager.confirm('提示','您确定要重置选中的用户密码吗?',function(result){
        if (result){
            var rows = $("#userTable").datagrid('getSelections');
            var ids = new Array();
            $.each(rows,function(i,n){
                ids.push(n._id);
            });
            $.post('/manage/user/resetpwd', {ids: ids},function(result){
                if(result && result.showDialog){
                    if(result.status == RESULT.ERROR){
                        $.messager.alert('错误',result.msg, 'error');
                    } else{
                        $.messager.alert('提示',result.msg, 'info');
                    }
                }
                $("#userTable").datagrid("reload");
            });
        }
    });
};
