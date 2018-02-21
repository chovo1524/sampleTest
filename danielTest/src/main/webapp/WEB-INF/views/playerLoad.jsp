<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<!DOCTYPE html>
<head>
    <title>녹취 플레이어</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/jquery.min.js"></script>
</head>
<style>
*{ margin: 0;}
.wrap {position:abusolte; width:100%; height:100%;}
.wrap > img {position:absolute;max-width:100%;\max-height:100%;width:auto;height:auto;margin:auto;top:0; bottom:0; left:0; right:0;}
</style>
<body>
<div class="wrap">
	<img src="${pageContext.request.contextPath}/resources/players/image/loading.gif" alt="loading" />
</div>
</body>
<script type="text/javascript">
$(document).ready(function() {
	var type = ${type};
	var data = {};
	var url;
	
	if(type == 1) {
		url = "audio/api/1";	
	} else if(type == 2) {
		url = "audio/api/2";
	} else if(type == 3) {
		url = "audio/api/3";
	} else if(type == 4) {
		url = "audio/api/4";
	} else {
		errorCB();
		return;
	}
	callAjax(url, data);
	
	function callAjax(url, data) {
		$.ajax({
			type: "POST",
			dataType : "json",
			url: url,
			data: data,
			success : function(data) {
				if(data.url) {
			 		location.replace(data.url);
			 	} else {
			 		errorCB();
			 	}
			},
			error : function(e) {
				errorCB()
			}
		});
	}
	
	function errorCB() {
		alert("다시 시도해 주세요.");
	}
});
</script>
</html>
