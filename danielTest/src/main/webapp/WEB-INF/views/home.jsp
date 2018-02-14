<%@page import="java.io.Console"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>

<html>
<head>
<title>danielTest!!</title>
</head>
<body>
	<div style="margin: 5%;">
		<h1>Hello world!</h1>
		<P>The time on the server is ${serverTime}.</P>
		
		<input type="button" onClick="btnClick('play')" value="Play" id="playBtn">
		<input type="button" onClick="btnClick('readWrite')" value="Read/Wirte" id="readWriteBtn">
		<input type="button" onClick="btnClick('javaPlay')" value="JavaPlay" id="javaPlayBtn">
		<input type="button" onClick="btnClick('stream')" value="Stream" id="javaPlayBtn">
		<input type="button" onClick="btnClick('write')" value="write" id="writeBtn">
		<input type="button" onClick="btnClick('read')" value="read" id="readBtn">
		
		<div id="audioPalyerDiv" style="margin-top: 20px; display: none;"><audio src="" id="audioPalyer" controls="controls"></audio></div>
	</div>
</body>
</html>

<script type="text/javascript">

	function btnClick(_url) {
		$("#audioPalyer").trigger("pause");
		$("#audioPalyerDiv").hide();
		if(_url == "stream" || _url == "read") {
			$("#audioPalyerDiv").show();
			var oAudio = document.getElementById('audioPalyer');
            oAudio.src = _url;
            //oAudio.currentTime = ${playTime}
            console.log("${playTime}");
            oAudio.play();
			return;
		}
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
				} else if(json.type == "readWrite") {
					alert("파일 생성이 완료 되었습니다!");
				} else if(json.type == "javaPlay") {
					alert("재생이 완료 되었습니다.");
				} else if(json.type == "write") {
					alert("파일 생성이 완료 되었습니다.");
				}
			},
			error : function(error) {
				console.log("error : " + JSON.stringify(error));
			}
		});
	}

</script>

