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
		
		<input id="call_no" name="CALL_NO" type="hidden" value="001">
		<button id="type1" type="button">이전 녹취 플레이</button>
		<button id="type2" type="button">실시간 녹취 플레이</button>
		<button id="type3" type="button">녹취 완료 플레이</button>
		<button id="type4" type="button">녹취 완료 6개월 이후 플레이</button>
	</div>
</body>
</html>

<script type="text/javascript">

	$("#type1, #type2, #type3, #type4").click(function(e) {
		if(e.preventDefault) e.preventDefault();
		var id = $(this).attr("id");
		var title = $(this).text();
		var callNo = $("#call_no").val();
		var w = 600;
		var h = 600;
		
		if(id == "type1") {
			h = 221;
		}
		
		var url = "loading?type=" + id + "&callNo=" + callNo;
		
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
		
		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		
		var left = ((width/2)-(w/2)) + dualScreenLeft;
		var top = ((height/2)-(h/2)) + dualScreenTop;
		
		var newWindow = window.open(url, "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
		
	 	if(window.focus) {
	    	newWindow.focus();
	    }
	});
	
</script>

