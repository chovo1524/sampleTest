<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="http://code.jquery.com/jquery-2.2.4.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.4.0/wavesurfer.min.js"></script>

<html>
<head>
<title>danielTest!!</title>
</head>
<body>
	<div style="margin: 5%;">
		<h1>Hello world!</h1>
		<P>The time on the server is ${serverTime}.</P>
		
		<form id="listData" action="loading" method="post">
			<input name="CALL_NO" type="hidden" value="001">
			<input name="TYPE" id="type" type="hidden" value="">
		</form>

		<input type="button" onClick="btnClick('type2')" value="실시간 음성 듣기" id="readBtn">
	</div>
</body>
</html>

<script type="text/javascript">

	function btnClick(_type) {
		$("#type").val(_type);
		
		var data = $("#listData").serialize();
		console.log(data);
		
		$("#listData").submit();
	}
	
</script>

