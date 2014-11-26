$(function(){
	if($.trim($.cookie("_uname")) != ""){
		$("#username").val($.trim($.cookie("_uname")));
	}
	
	$("#but_login").click(function(){
		if($.trim($("#username").val()) == ""){
			$("#errorImage").show();
			$("#errorMsg").text("用户名不能为空或空格，请您重新输入！");
			return;
		}
		if($.trim($("#password").val()) == ""){
			$("#errorImage").show();
			$("#errorMsg").text("密码不能为空或空格，请您重新输入！");
			return;
		} else{
			$("#preload").show();
			setTimeout(function(){
				if($("#rememberAccount:checked").size() > 0){
					$.cookie('_uname',$("#username").val(),{expires : 7});
				}
				$('#formLogin').ajaxSubmit(function(result){
					if(result.status == -1){
						$("#errorImage").show();
						$("#errorMsg").text(result.msg);
						$("#preload").hide();
					} else if(result.status == 1){
						window.location.href = "/manage/main";
					} else{
						$("#errorImage").show();
						$("#errorMsg").text("系统错误，请稍后重试！");
						$("#preload").hide();
					}
				});
			}, 500);
		}
	});
	$("body, #username, #password").keypress(function(event){
		if (event.keyCode == 13){
			$("#but_login").trigger("click");
		}
	});
	$("#username").blur(function(){
		if($.trim($("#username").val()) == ""){
			$("#errorImage").show();
			$("#errorMsg").text("用户名不能为空或空格，请您重新输入！");
			return;
		} else{
			$("#errorImage").hide();
			$("#errorMsg").text("");
		}
	});
	$("#password").blur(function(){
		if($.trim($("#password").val()) == ""){
			$("#errorImage").show();
			$("#errorMsg").text("密码不能为空或空格，请您重新输入！");
			return;
		} else{
			$("#errorImage").hide();
			$("#errorMsg").text("");
		}
	});
	$("#resetForm").click(function(){
		$("#username").val("").focus();
		$("#password").val("");
	});

	$("#ligin").center();
	$("#preload").center();
});