<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <title>
    </title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/players/css/player.css" />
    
    <!-- UI 생성을 위한 js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/jquery.selectbox-0.6.1.js"></script>
    
    <!-- Audio 기능을  위한 js -->
    <%
		String ua = request.getHeader( "User-Agent" );
		boolean isMSIE = ( ua != null && (ua.indexOf( "MSIE" ) != -1 || ua.indexOf("Trident") != -1));
	%>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/Base.js"></script>
	<% if( isMSIE ){ %>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/kr.co.diotek.media.player.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/kr.co.diotek.vlog.player.js"></script>	
	<% } else { %>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/kr.co.diotek.media.player_chrome.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/kr.co.diotek.vlog.player_chrome.js"></script>
    <% } %>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/players/js/player.js"></script>
</head>
<body>
	<div class="player_wrap">
		<div class="soundplayer">
			<div class="sort">
				<ul class="floatR marginR10">
					<li>
						<span class="list first">
						<span class="designRadio"><span class="radio checked"></span></span>
						<input type="radio" class="radiobtn" name="select" value="전체" id="" checked="">
						<label for="select" class="select_label">전체</label>
						</span>
					</li>
					<li>
						<span class="list">
						<span class="designRadio"><span class="radio"></span></span>
						<input type="radio" class="radiobtn" name="select" value="개별" id="">
						<label for="select" class="select_label">송신</label>
					</span>
					</li>
					<li>
						<span class="list">
						<span class="designRadio"><span class="radio"></span></span>
						<input type="radio" class="radiobtn" name="select" value="수" id=""><label for="select" class="select_label">수신</label>
						</span>
					</li>
				</ul>
			</div>
			<div class="sound_area">
				<div class="soundmap">
					<img src="${pageContext.request.contextPath}/resources/players/image/wav.png" alt="" id="mapping">
					<div class="maphiglight_group">
					<div class="maphiglight"></div>
					<div class="mapshadow_left"></div>
					<div class="mapshadow_right"></div>
					</div>
				</div>
				<div class="sound">
					<div class="sound_inner">
						<div class="bg_recoding"></div>
						<img src="${pageContext.request.contextPath}/resources/players/image/wav.png" alt="" style="position: relative; left: 0px;"><!-- 파장으로 변경될 이미지 -->
					</div>
					<!--
					<div class="soundbar_group">
						<a class="leftbar">왼쪽조정바</a>
						<a class="rightbar">오른쪽조정바</a>
						<div class="leftlayer"></div>
						<div class="rightlayer"></div> 
					 </div> 
					 -->
				</div>
			</div>
			<!-- //sound_area -->
			<div class="progressbar_area">
				<div class="progressbar_bg">
					<div id="progressbar" class="progressbar"></div>
					<button id="progress_pointer" class="progress_pointer">포인터</button>
				</div><!-- //progressbar_bg -->
			</div><!-- //progressbar_area -->
			<div class="playermenu_area">
				<div class="playertime">
					<p id="playTime">00:00:00</p><!-- 현재 재생시간 -->
					<p id="totalTime">00:00:00</p><!-- 총 재생시간  -->
				</div><!-- //playertime -->
				<div class="time_controler">
					<div class="controlbar">
						<div class="controlProgress"></div>
						<span class="pointer"></span>
						<ul class="speed">
							<li>-3</li>
							<li>-2</li>
							<li>-1.5</li>
							<li>1</li>
							<li>1.5</li>
							<li>2</li>
							<li>3</li>
						</ul>
					</div>
				</div><!-- //time_controler -->
				<div class="controler">
				    <select name="val_value" id="val_value" class="select_g67 player_select">
						<option value="5">5 sec</option>
						<option value="10">10 sec</option>
						<option value="15">15 sec</option>
						<option value="30">30 sec</option>
						<option value="60">1 min</option>
						<option value="180">3 min</option>
						<option value="300">5 min</option>
					</select>
					<div class="controler_btn"> <!-- 버튼 클릭시 해당 버튼 클래스 on 추가 -->
						<ul>
							<li><input type="button" class="control_prev_btn on" title="이전으로" onclick="mediaPlayer.setDioBack($('#val_value').val())"></li>
							<li><input type="button" class="control_next_btn on" title="건너뛰기" onclick="mediaPlayer.setDioForware($('#val_value').val())"></li>
							<li><input type="button" class="control_play_btn" id="play_btn" title="재생/일시정지" onclick="mediaPlayer.dioPlay(this);"></li>
							<!-- <li><button type="button" class="control_play_btn" id="play_btn" title="재생/일시정지" onclick="mediaPlayer.dioPlaySetCurrentTime(this,'30');" >재생/일시정지</button></li> -->
							<li><input type="button" class="control_stop_btn on" title="정지" onclick="mediaPlayer.dioStop(); initCnResultScroll();"></li>
							<li><span><input type="button" class="control_allreplay_btn" title="전체반복" onclick="mediaPlayer.playLoop();"></span></li>
							<!-- <li><span><button type="button" class="control_playloof_btn"  title="구간반복">구간반복</button></span></li> -->
						</ul>
					</div>
				</div><!-- //controler -->
				<div class="volumebox">
					<input type="button" class="volume_btn" title="음소거" onclick="mediaPlayer.setDioMute(this)"><!-- 음소거시 class=off 추가  -->
					<div class="volumbar_bg">
					<div class="volumbar"></div>
					</div>
				</div>
			</div><!-- //playermenu_area -->
		</div>
		<% if( isMSIE ){ %> 
	    <object id="audioPlayObj" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="0px" height="0px"><param name="buffer" value="4"></object>
		<script for='audioPlayObj' event='PlayStateChange(NewState)'>
			if(mediaPlayer) mediaPlayer.playStateChange(NewState);
		</script>
	    <% } else { %>
		<audio  id='audioPlayObj'></audio>
		<% } %>
	</div>
</body>

<script type="text/javascript">
function init() {
	radio(); // 라디오버튼 디자인 효과
	resetBtn(); // 섹렉트박스 초기화 이벤트

	$(".player_select").selectbox();
	
	var html2 = '<div class="slider_bg2"></div>';
	if ($(".select_g67").size() > 0) $(".select_g67").prev().prev().before(html2);
	
	//TEST
	$(".marginR10").hide();
	$(".soundmap").hide();
}


function radio(){
   var radio_design = $(".designRadio");
   var radio_label = $(".select_label");

   radio_design.unbind("click");
   radio_label.unbind("click");

   radio_design.bind("click",function(){
   	  if($(this).parents("ul").hasClass("userSelect02")) return false;

      $(this).children(".radio").addClass("checked").parents("li").siblings("li").find(".radio").removeClass("checked");
      $(this).next("input").attr("checked","checked").parents("li").siblings("li").find("input").removeAttr("checked");
	  if ($(".hottoopic_order").size() == 1) radoiCheck();
   });

   radio_label.bind("click",function(){
   	  if($(this).parents("ul").hasClass("userSelect02")) return false;
   	  
      $(this).parents("li").find(".radio").addClass("checked").parents("li").find("input").attr("checked","checked");
      $(this).parents("li").siblings("li").find(".radio").removeClass("checked").parents("li").find("input").removeAttr("checked");
	  if ($(".hottoopic_order").size() == 1) radoiCheck();
   }); 

   function radoiCheck() {
		if ($(".radiobtn").eq(0).attr("checked")) {selectGraph("total"); return;}
		if ($(".hottoopic_order .current").size() == 0) $(".hottoopic_order li a").eq(0).click();
   }  
}

function resetBtn() {
	$("input[type=reset]").unbind("click");
	$("input[type=reset]").bind("click", function() {
		var _form = $(this).parents("form");
		var _select_box = $(".jquery-selectbox",_form);

		_select_box.each(function(i) {
			var _select = $(this).find("select");
			var _settingsSelect = $(this).find(".jquery-selectbox-currentItem");
			var _settiongOption = $(this).find(".jquery-selectbox-list .jquery-selectbox-item").eq(0);
			var _text = _settiongOption.text();
			
			var _val = _settiongOption.attr("class").split(' ');
			for( k1 in _val ) {
				if(/^value-.+$/.test(_val[k1])) {
					_val = _val[k1].replace('value-','');
					break;
				}
			};
			_settingsSelect.text(_text).attr("class","jquery-selectbox-currentItem item-0");
			_select.val(_val).triggerHandler('change');
		});
	});
}

$(document).ready(function(){
	init();
	
	 var playObj = 'audioPlayObj';
     // mediaPlayer = new DioVLOGPlayer(playObj, '${audioPath}',1,'${duration}', 936); //오디오 재생 객체 생성
     mediaPlayer = new DioVLOGPlayer(playObj, 'read',1,'12000', 625); //오디오 재생 객체 생성
     // audioInfo = new AudioInfo("${audio_id}","${file_id}", "${send_recv_flg}","${audioInfo.agentSeq}", "${fileInfo.callFileName}", "${audioInfo.customerSeq}"); 
     audioInfo = new AudioInfo("1","2", "3","4", "5", "6");     //오디오 정보 객체 생성
     soundPlayer();
	
     
    /* setTimeout(function(){
    	 mediaPlayer.dioPlay();
     },1000);*/
});
</script>
</html>
