<%@ page import="java.io.Console"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.daniel.test.Vo.AudioVo"%>
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>
<script	src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.4.0/wavesurfer.min.js"></script>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Loading</title>
</head>
<body>
	<form id="listData" action="index/read" method="post">
		<input name="CALL_NO" type="hidden" value="${getData.CALL_NO}">
		<input name="TYPE" id="type" type="hidden" value="${getData.TYPE}">
	</form>
	<h1>로딩중</h1>
</body>
</html>

<script type="text/javascript">
	$(window).load(function() {
		var type = $("#type").val();
		if(type == "type2") {
			$.ajax({
				type : "POST",
				url : "index/write",
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType : 'json',
				success : function(json) {
					console.log("success : " + JSON.stringify(json));
				},
				error : function(error) {
					console.log("error : " + JSON.stringify(error));
				}
			});
		}
		
		var data = $("#listData").serialize();
		var _url = "index/read";
		console.log(data);
		$.ajax({
			type : "POST",
			url : _url,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType : 'json',
			data : {
				"data" : data
			},
			success : function(json) {
				console.log("success : " + JSON.stringify(json));
				location.href = "index";
			},
			error : function(error) {
				console.log("error : " + JSON.stringify(error));
			}
		});
	});
</script>