<%@ page import="java.io.Console"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.daniel.test.Vo.AudioVo"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>
<script	src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.4.0/wavesurfer.min.js"></script>
<style>
	*{ margin: 0;}
	.wrap {position:abusolte; width:100%; height:100%;}
	.wrap > img {position:absolute;max-width:100%;\max-height:100%;width:auto;height:auto;margin:auto;top:0; bottom:0; left:0; right:0;}
</style>
<title>Loading</title>
</head>
<body>
	<form id="listData" action="index/read" method="post">
		<input name="CALL_NO" id="callNo" type="hidden" value="${getData.CALL_NO}">
		<input name="TYPE" id="type" type="hidden" value="${getData.TYPE}">
	</form>
	
	<div class="wrap">
		<img src="${pageContext.request.contextPath}/resources/players/image/loading.gif" alt="loading" />
	</div>
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
		
		var _url = "index/read";
		$.ajax({
			type : "POST",
			url : _url,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data : {
				"CALL_NO" : $("#callNo").val(),
				"TYPE" : type
			},
			success : function(json) {
				console.log("success : " + JSON.stringify(json));
				location.href = json.url + "?callNo=" + json.callNo;
			},
			error : function(error) {
				console.log("error : " + JSON.stringify(error));
			}
		});
	});
</script>