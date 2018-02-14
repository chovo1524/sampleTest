/*$(function() {
	soundPlayer();
});*/

//******************************************************
//음성정보 
//작성자: 디오텍 정기영
//******************************************************
var AudioInfo = Base.extend({
    /***************************************
    생성자 : audioInfo
    설명   : 오디오정보 VO 생성자
    매개변수 : 
        audio_id
        file_id
        send_recv_flg 
        agent_id
        file_name
        eval_state
    ****************************************/
    constructor: function(audio_id,file_id,send_recv_flg,agent_id,file_name, customer_id){
        this.audio_id = audio_id;
        this.file_id = file_id;
        this.send_recv_flg = send_recv_flg;
        this.agent_id = agent_id;
        this.file_name = file_name;
        this.customer_id = customer_id;
        this.eval_state = "0"; //미평가 상태
    }
});





// ******************************************************
// 음성플레이어
// 작성자: 아이콘인터렉티브 신옥섭
// ******************************************************

function soundPlayer() {
	//미니맵 초기화
	initMiniMap();
	
	// 미니맵 이동 이벤트 처리
	$(".maphiglight_group .maphiglight").mousedown(function(e) {
			
		//DioVLOGPlayerObj.dioStop();
		var _selectBar = $(this);
		var _pointX = e.clientX - parseInt(_selectBar.css("left"));
		var _soundWidth = $(".soundmap").width()-$(this).width();
		var _select = $(this).hasClass("maphiglight");
		
		// var _layerBg = $(".mapshadow_right");
		// if (_select) _layerBg = $(".mapshadow_left");  // 무조건이거됨
		var _layerBg = $(".mapshadow_left");
		var _layerBg02 = $(".mapshadow_right");


		$("body").bind("mousemove",function(e) {
			var _clientX = e.clientX - _pointX;
			var _layerWidth = 0;
			if (_clientX <= 0) _clientX = 0;
			if (_clientX >= _soundWidth) _clientX = _soundWidth;

			var _leftLeft = parseInt($(".maphiglight").css("left"));
			if (!_select && _clientX <= _leftLeft) _clientX = _leftLeft;

			if (_select) _layerWidth = _clientX;
			var _rightWidth = _soundWidth - _layerWidth; 

			_selectBar.css("left",_clientX+"px");
			_layerBg.css("width",_layerWidth + "px");
			_layerBg02.css("width",_rightWidth + "px");
			
			var bigWaveImgSize = $(".sound_inner > img").width();  //파형 이미지 width
			var miniWaveImgSize = 936;                             //미니맵 파형 이미지 width
			
			var _moveLeft = parseInt(_leftLeft*bigWaveImgSize/miniWaveImgSize);
			
			//맵 싱크 관련
			$(".sound_inner > img").css("left",-(_moveLeft)+"px");
		});
		return false;
	});
	// 구간반복 바 이벤트
	/*$(".soundbar_group a").mousedown(function(e) {
		var _selectBar = $(this);
		var _pointX = e.clientX - parseInt(_selectBar.css("left"));
		var _soundWidth = $(".sound_inner").width();
		var _select = $(this).hasClass("leftbar");

		var _layerBg = $(".rightlayer");
		if (_select) _layerBg = $(".leftlayer");

		$("body").bind("mousemove",function(e) {
			var _clientX = e.clientX - _pointX;
			if (_clientX <= 0) _clientX = 0;
			if (_clientX >= _soundWidth) _clientX = _soundWidth;

			var _rightLeft = parseInt($(".rightbar").css("left"));
			var _leftLeft = parseInt($(".leftbar").css("left"));

			if (_select && _clientX >= _rightLeft) _clientX = _rightLeft;
			if (!_select && _clientX <= _leftLeft) _clientX = _leftLeft;

			var _layerWidth = _soundWidth - _clientX;
			if (_select) _layerWidth = _clientX;

			_selectBar.css("left",_clientX+"px");
			_layerBg.css("width",_layerWidth + "px");
			
			//kyjung 20140522
			DioVLOGPlayerObj.dragStartTime = _leftLeft/DioVLOGPlayerObj.waveWidth* DioVLOGPlayerObj.duration/2;
			DioVLOGPlayerObj.dragEndTime = _rightLeft/DioVLOGPlayerObj.waveWidth* DioVLOGPlayerObj.duration/2;
		});
		return false;
	});*/

	// 재생속도 이벤트
	$(".pointer").mousedown(function(e) {
		var _selectPointer = $(this);
		var _pointX = e.clientX - parseInt(_selectPointer.css("left"));
		var _currentWidth = $(".controlbar").width();
		var _controlProgress = $(".controlProgress");

		$("body").bind("mousemove",function(e) {

			var _clientX = e.clientX - _pointX;

			if (_clientX >= _currentWidth) _clientX = _currentWidth;
			if (_clientX <= 0) _clientX =0;
			_selectPointer.css("left",_clientX+"px");

			if (_clientX >= 48) {
				_controlProgress.css({"left":"50%", "right" : "0"});
				_controlProgress.css("width",(_clientX - (_currentWidth / 2))+"px");
			} else {
				_controlProgress.css({"right":"48px"});
				_controlProgress.css("width",((_currentWidth / 2) - _clientX) +"px");
				var _left = 48 - _controlProgress.width();
				_controlProgress.css("left", _left+ "px");
			}
			
			//kyjung 20140521 음성재성 속도 변경
			//$("#testRate").empty();
	        	//$("#testRate").append(_clientX);
			//mediaPlayer.setRate(3.0  * (_clientX - 0) / 97);
			
		});
		return false;
	}).mouseup(function() {
		$("body").unbind('mousemove');

		var _selectPointer = $(this);
		var _width = $(".controlProgress").width();
		var _block = parseInt(_width / 16);
		var _remainder = (_width % 16);

		if (_remainder >= 8) _remainder = 1;
		else _remainder = 0;

		var _prgressWidth = (_block + _remainder) * 16;
		$(".controlProgress").width(_prgressWidth);

		var right = parseInt($(".controlProgress").css("right"));

		if (right >= 48 ) {
			_selectPointer.css("left",(48 - _prgressWidth)+"px");
			$(".controlProgress").css("left",(48 - _prgressWidth)+"px");
		}
		else _selectPointer.css("left",(_prgressWidth + 48)+"px");
		
		
		//kyjung 20140521 음성재성 속도 변경
		/*$("#testRate").empty();
        $("#testRate").append(_prgressWidth +","+right);*/
        
        if(right == 0){ //1~3배속
        	if(_prgressWidth == 0){ //1배속 
            	mediaPlayer.setRate(1);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 16){
            	mediaPlayer.setRate(1.5);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 32){
            	mediaPlayer.setRate(1.7);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 48){
            	mediaPlayer.setRate(2);
            	//alert(_prgressWidth +","+right);
            }
        }else{          //1배속 미만
        	if(_prgressWidth == 16){  
            	mediaPlayer.setRate(0.7);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 32){
            	mediaPlayer.setRate(0.6);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 48){
            	mediaPlayer.setRate(0.5);
            	//alert(_prgressWidth +","+right);
            }
        }
       //mediaPlayer.setRate(3.0  * (_clientX - 0) / 97);
        return false;
	}).parents("body").mouseup(function() {
		$("body").unbind('mousemove');

		var _selectPointer = $(".pointer");
		var _width = $(".controlProgress").width();
		var _block = parseInt(_width / 16);
		var _remainder = (_width % 16);

		if (_remainder >= 8) _remainder = 1;
		else _remainder = 0;

		var _prgressWidth = (_block + _remainder) * 16;
		$(".controlProgress").width(_prgressWidth);

		var right = parseInt($(".controlProgress").css("right"));

		if (right >= 48 ) {
			_selectPointer.css("left",(48 - _prgressWidth)+"px");
			$(".controlProgress").css("left",(48 - _prgressWidth)+"px");
		}
		else _selectPointer.css("left",(_prgressWidth + 48)+"px");
	});
	
	// 재생속도 이벤트 
	$(".pointer").mousedown(function(e) {
		var _selectPointer = $(this);
		var _pointX = e.clientX - parseInt(_selectPointer.css("left"));
		var _currentWidth = $(".controlbar").width();
		var _controlProgress = $(".controlProgress");

		$("body").bind("mousemove",function(e) {

			var _clientX = e.clientX - _pointX;

			if (_clientX >= _currentWidth) _clientX = _currentWidth;
			if (_clientX <= 0) _clientX =0;
			_selectPointer.css("left",_clientX+"px");

			if (_clientX >= 48) {
				_controlProgress.css({"left":"50%", "right" : "0"});
				_controlProgress.css("width",(_clientX - (_currentWidth / 2))+"px");
			} else {
				_controlProgress.css({"right":"48px"});
				_controlProgress.css("width",((_currentWidth / 2) - _clientX) +"px");
				var _left = 48 - _controlProgress.width();
				_controlProgress.css("left", _left+ "px");
			}
			
			//kyjung 20140521 음성재성 속도 변경
			//$("#testRate").empty();
	        	//$("#testRate").append(_clientX);
			//mediaPlayer.setRate(3.0  * (_clientX - 0) / 97);
			
		});
		return false;
	}).mouseout(function() {
		$("body").unbind('mousemove');

		var _selectPointer = $(this);
		var _width = $(".controlProgress").width();
		var _block = parseInt(_width / 16);
		var _remainder = (_width % 16);

		if (_remainder >= 8) _remainder = 1;
		else _remainder = 0;

		var _prgressWidth = (_block + _remainder) * 16;
		$(".controlProgress").width(_prgressWidth);

		var right = parseInt($(".controlProgress").css("right"));

		if (right >= 48 ) {
			_selectPointer.css("left",(48 - _prgressWidth)+"px");
			$(".controlProgress").css("left",(48 - _prgressWidth)+"px");
		}
		else _selectPointer.css("left",(_prgressWidth + 48)+"px");
		
		
		//kyjung 20140521 음성재성 속도 변경
		/*$("#testRate").empty();
        $("#testRate").append(_prgressWidth +","+right);*/
        
        if(right == 0){ //1~3배속
        	if(_prgressWidth == 0){ //1배속 
            	mediaPlayer.setRate(1);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 16){
            	mediaPlayer.setRate(1.5);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 32){
            	mediaPlayer.setRate(2);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 48){
            	mediaPlayer.setRate(3);
            	//alert(_prgressWidth +","+right);
            }
        }else{          //1배속 미만
        	if(_prgressWidth == 16){  
            	mediaPlayer.setRate(0.7);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 32){
            	mediaPlayer.setRate(0.6);
            	//alert(_prgressWidth +","+right);
            }else if(_prgressWidth == 48){
            	mediaPlayer.setRate(0.5);
            	//alert(_prgressWidth +","+right);
            }
        }
       //mediaPlayer.setRate(3.0  * (_clientX - 0) / 97);
        return false;
	}).parents("body").mouseup(function() {
		$("body").unbind('mousemove');

		var _selectPointer = $(".pointer");
		var _width = $(".controlProgress").width();
		var _block = parseInt(_width / 16);
		var _remainder = (_width % 16);

		if (_remainder >= 8) _remainder = 1;
		else _remainder = 0;

		var _prgressWidth = (_block + _remainder) * 16;
		$(".controlProgress").width(_prgressWidth);

		var right = parseInt($(".controlProgress").css("right"));

		if (right >= 48 ) {
			_selectPointer.css("left",(48 - _prgressWidth)+"px");
			$(".controlProgress").css("left",(48 - _prgressWidth)+"px");
		}
		else _selectPointer.css("left",(_prgressWidth + 48)+"px");
	});

	// 볼륨크기 이벤트
	$(".volumbar_bg").mousedown(function(e) {
		var _selectPointer = $(this);
		var _pointX = parseInt(e.clientX) - parseInt(_selectPointer.offset().left);
		var _currentWidth = $(".volumbar_bg").width();
		
		//$("#testVal").empty();
	    //$("#testVal").append(_pointX);
    	
	    var _clientX = _pointX;
		if (_clientX >= _currentWidth) _clientX = _currentWidth;
		if (_clientX <= 0) _clientX = 0;
		$(".volumbar").width(_clientX);
		mediaPlayer.setVol(_clientX * 2);
		
		return false;
	});
	
	
	
	// 플레이어 재생바 이벤트
	$(".progress_pointer").mousedown(function(e) {
		var duration = mediaPlayer.getDuration();
		if(duration == -1) {
			return;
		}
		var _selectPointer = $(this);
		var _pointX = e.clientX - parseInt(_selectPointer.css("left"));
		var _currentWidth = $(".progressbar_bg").width();

		$("body").bind("mousemove",function(e) {
			var _clientX = e.clientX - _pointX;
			if (_clientX >= _currentWidth) _clientX = _currentWidth;
			if (_clientX <= 0) _clientX = 0;
			_selectPointer.css("left",_clientX+"px");
			$(".progressbar").width(_clientX);
			
			//kyjung 20140521 음성재성 위치 변경
			var duration = mediaPlayer.getDuration();
			//mediaPlayer.setPosition(duration * _clientX / 784);
			mediaPlayer.setPosition(duration * _clientX / mediaPlayer.getWaveWidth());
		});
		
		
		return false;
	});

	$(".progressbar_bg").click(function(e) {
		var _pointX = e.clientX - $(this).offset().left;
		$(".progressbar").width(_pointX);
		$(".progress_pointer").css("left",_pointX + "px");
	});

	// 공통 이벤트 제거
	$("body, .progress_pointer").mouseup(function(e) {
		$("body").unbind('mousemove');
	}); // 2014-05-13 수정 : return false 삭제

	// 2014-05-20 추가 : 음성플레이어 버튼 이벤트
	//$(".controler_btn button").click(function() {
	//	$(this).toggleClass("on").parent().siblings().find(">button").removeClass("on");
		return false;
	//});
}

/**
 * Description : 미니맵 초기화
 * @author : 디오텍
 * @date    : 2014. 8. 19.
 * @returns : void
 * 
 */
function initMiniMap(){
	mapBoxWidth = parseInt(parseInt($(".soundmap").width()) * parseInt($(".soundmap").width()) / $(".sound_inner > img").width());
	$(".sound_area .maphiglight").css("width",(mapBoxWidth)+"px");
	$(".sound_area .mapshadow_right").css("width",parseInt($(".soundmap").width() - mapBoxWidth)+"px");
}


function fn_replay(obj){
	//은성재성 정지
	mediaPlayer.dioStop();
	
	//파형 이미지 초기화
	$(".leftbar").css("left","0px");
	$(".rightbar").css("left", "100%");
	$(".leftlayer").css("width", "0px");
	$(".rightlayer").css("width", "0px");
}


/**
 * Description : 연속어 auto 스크롤 초기화
 * @author : 디오텍 정기영
 * @date    : 2014. 8. 22.
 * @returns : void
 * 
 */
function initCnResultScroll(){
	//연속어 auto 스크롤 초기화
    $("#cnResultListContent").mCustomScrollbar("scrollTo","#cnResult_1");
}
