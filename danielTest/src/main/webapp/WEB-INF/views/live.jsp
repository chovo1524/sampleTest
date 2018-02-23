<%@ page import="java.util.List"%>
<%@ page import="java.io.Console"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html>
<head>
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.4.0/wavesurfer.min.js"></script>
<title>danielTest!!</title>
</head>

<style>
	*{ margin: 0;}
	.rx {float: right; background-color: yellow; line-height: 30px; padding: 10px;}
	.tx {float: left; background-color: aqua; line-height: 30px; padding: 10px;}
</style>

<body>
	<div style="margin: 5%;">
		<h3>콜 넘버 : ${callNo}</h3><br>
		<hr><br>
		<h5>총 묵음 시간 : ${callSilenceDurationTotal} 초</h5>
		<h5>총 말 겹침 시간 : ${callLappingDurationTotal} 초</h5>
		<h5>묵음 구간 : ${callSilenceDuration}</h5>
		<h5>말 겹침 구간 : ${callLappingDuration}</h5>
		<div id="audioPalyerDiv" style="margin-top: 20px;"><audio src="" id="audioPalyer" controls="controls"></audio></div>
		
		<table style="margin-top: 20px; width: 100%;">
			<c:forEach items="${chatList}" var="list" varStatus="status">
				<tr>
				    <td ${list.TYPE == "T" ? "class='tx'" : "class='rx'"}>${list.TEXT}</td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<div>
	</div>
</body>
</html>

<script type="text/javascript">
	$(window).load(function() {
		reading();
	});
	
	function reading() {
		var oAudio = document.getElementById('audioPalyer');
		oAudio.src = "reading";
		oAudio.play();
	}
</script>

