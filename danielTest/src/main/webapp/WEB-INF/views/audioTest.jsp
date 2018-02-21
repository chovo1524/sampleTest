<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<!DOCTYPE html>
<head>
    <title>Audio Button</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/jquery.min.js"></script>
</head>
<body>
	<button id="type1" type="button">이전 녹취 플레이</button>
	<button id="type2" type="button">실시간 녹취 플레이</button>
	<button id="type3" type="button">녹취 완료 플레이</button>
	<button id="type4" type="button">녹취 완료 6개월 이후 플레이</button>
</body>
<script type="text/javascript">
$(document).ready(function() {
	$("#type1, #type2, #type3, #type4").click(function(e) {
		if(e.preventDefault) e.preventDefault();
		var id = $(this).attr("id");
		var title = $(this).text();
		var w = 600;
		var h = 600;
		
		if(id == "type1") {
			type = '1';
			h = 221;
		} else if(id == "type2") {
			type = '2';
		} else if(id == "type3") {
			type = '3';
		} else if(id == "type4") {
			type = '4';
		}
		
		var url = "playerLoad?type=" + type;
		
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
});
</script>
</html>
