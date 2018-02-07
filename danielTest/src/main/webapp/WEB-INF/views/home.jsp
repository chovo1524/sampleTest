<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>

<html>
<head>
<title>danielTest</title>
</head>
<body>
	<div style="margin: 5%;">
		<h1>Hello world!</h1>
		<P>The time on the server is ${serverTime}.</P>
		
		<input type="button" onClick="btnClick('play')" value="Play" id="playBtn">
		<input type="button" onClick="btnClick('read')" value="Read/Wirte" id="readBtn">
		<input type="button" onClick="btnClick('javaPlay')" value="JavaPlay" id="javaPlayBtn">
		
		<div id="audioPalyerDiv" style="margin-top: 20px; display: none;"><audio src="" id="audioPalyer" controls="controls"></audio></div>
	</div>
</body>
</html>

<script type="text/javascript">

	function btnClick(_url) {
		$("#audioPalyer").trigger("pause");
		$("#audioPalyerDiv").hide();
		$.ajax({
			type : "POST",
			url : _url,
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			cache : false,
			success : function(json) {
				//console.log("success : " + JSON.stringify(json));
				if(json.type == "play") {
					console.log(json.filePath);
					$("#audioPalyerDiv").show();
					$("#audioPalyer").attr("src", "${pageContext.request.contextPath}" + json.filePath);
					$("#audioPalyer").trigger("play");
				} else if(json.type == "read") {
					alert("파일 생성이 완료 되었습니다!");
				} else if(json.type == "javaPlay") {
					alert("재생이 완료 되었습니다.");
				}
			},
			error : function(error) {
				console.log("error : " + JSON.stringify(error));
			}
		});
	}

</script>

