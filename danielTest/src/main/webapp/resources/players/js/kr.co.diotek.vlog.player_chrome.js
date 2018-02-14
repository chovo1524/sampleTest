/*
 * 작성일자 : 2014-05-30
 * 작성자    : 디오텍 선행개발팀 정기영
 * 버전       : 1.0
 * DioVLOG 플레이어 오디오 자바스크립트 객체
 * 기본 기능 메소드는 mediaPlayer.js의 MediaPlayer 클래스 에서 상속
 *  + 상속 메소드
 *  -> MediaPlayer(생성자)
 *  -> play(재생)/stop(정지)/pause(일시정지)
 *  -> setVol(볼륨조정) 및 getVol(설정정보 반환)
 *  -> setRate(재생속도조정) 및 getRate(재생속도 반환)
 *  -> setLoop(반복설정) 및 getLoop(설정정보 반환)
 *  -> setMute(음소거설정) 및 setMute(설정정보 반환)
 *  -> setPosition(재생위치설정) 및 getPosition(설정정보 반환)
 *
 *  + 확장기능
 *  -> 생성자
 *  -> dioPlay(재생)/dioStop(정지)/dioPause(일시정지)
 *  -> getDuration(재생길이출력)/getWaveWidth(파형크기)
 *  -> setDioForware(앞으로 건너뛰기)/setDioBack(뒤로 건너뛰기)
 *  -> setDioMute(음소거)
 *  -> setDioVol(볼륨조정)
 *
 *  + 추가기능
 *
 *  사전조건: kr.co.diotek.media.player_chrome.js 필요
 */

/***************************************
* default set info
* defaultTerm값이 true 일경우
* default 값을 사용
****************************************/
var defaultTerm = false;
var defaultTermPlay = 30;
var defaultTermVol  = 10;
var defaultTermRate = 10;

/*var _isIE = (navigator.userAgent.match(/Gecko/))?false:true;
if (_isIE) {
    srcPath = document.all.handle.src;
} else {
    srcPath = document.getElementById("handle").src;
}
var apikey = srcPath.split("=")[1];*/

/***************************************
* alert info
****************************************/
var alertErrMSG1               = "매개변수 +/-/0 과 일치 하지 않습니다.";
var alertInputErrTypeofNumber  = "숫자형태가 아닌 입력값 입니다.";
var alertInputErrMinNumber     = "입력값이 유효범위 값에 미달 하였습니다.";
var alertInputErrMaxNumber     = "입력값이 유효범위 값에 초과 하였습니다.";
var alertInputErrTypeofBoolean = "boolean형태가 아닌 입력값 입니다.";
var alertCurrentTimeMax        = "현재 건너뛰기 값이 음원재생길이를 초과합니다. ";


/***************************************
class : DioVLOGPlayerObj
설명   : 미디어 플레이어내 기능을 위한 오디오 객체 변수
****************************************/
var DioVLOGPlayerObj = null;

/***************************************
class : DioVLOGPlayer
설명   : 미디어 플레이어 객체 생성자를 상속한 DioVLog 오디오 객체
****************************************/
var DioVLOGPlayer = MediaPlayer.extend({
    _this: this,
    /***************************************
    생성자 : DioVLOGPlayer
    설명   : 미디어 플레이어 객체 생성자를 상속한 DioVLog 오디오 객체
    매개변수 :
        playerId(object 태그내 id 정보)
        url(음성파일 경로)
        rate(재생속도)
        duration (재생길이 sec)
        waveWidth (파형길이)
        tempBplayerInterval
        sectionStartTime(구간재생 시작시간)
        sectionEndTime(구간재생 종료시간)
        dragStartTime (드레그 시작시간)
        dragEndTime (드레그 종료시간)
        dragPlayMode (드레그 모드)
    ****************************************/
    constructor: function(playerId, url, rate, duration, waveWidth){
        this.url = url;
        this.rate = rate;
        this.playerId = playerId;
        this.duration = duration / 1000;
        this.waveWidth = waveWidth;
        
        $('#' + playerId).attr("src", url);
        $('#' + playerId).load();
        this.player = $('#' + playerId).get(0);

        this.tempBplayerInterval = null;
        this.sectionStartTime = 0;
        this.sectionEndTime = 0;

        this.dragStartTime = 0;
        this.dragEndTime = this.duration - 0;
        this.dragPlayMode = false;
        
        this.recoding = false;
        if(url.lastIndexOf(".wav")) {
        	this.recoding = true;
        }
        if(this.recoding) {
        	this.duration = -1;
        	this.dragEndTime = -1;
        	this.dragPlayMode = false;
        }
        DioVLOGPlayerObj = this;
        DioVLOGPlayer.prototype.setDisplayInfo.call(this);
        
        DioVLOGPlayer.prototype.setBindEvent.call(this);
    },
    
    setBindEvent : function() {
    	 this.player.addEventListener('ended', function(){
         	if(DioVLOGPlayerObj.tempBplayerInterval != null){
                 clearInterval(DioVLOGPlayerObj.tempBplayerInterval);
                 DioVLOGPlayerObj.tempBplayerInterval = null;
             }
             $(".control_play_btn").attr("onclick", "mediaPlayer.dioPlay(this); return false;");
             $(".control_play_btn").attr("class","control_play_btn");
             DioVLOGPlayer.prototype.dioStop.call(DioVLOGPlayerObj);
         }, false);

         this.player.addEventListener('pause', function(){
         	if(DioVLOGPlayerObj.tempBplayerInterval != null){
                 clearInterval(DioVLOGPlayerObj.tempBplayerInterval);
                 DioVLOGPlayerObj.tempBplayerInterval = null;
             }
             $(".control_play_btn").attr("onclick", "mediaPlayer.dioPlay(this); return false;");
             $(".control_play_btn").attr("class","control_play_btn");
         }, false);

         this.player.addEventListener('play', function(){
         	 $(".control_play_btn").attr("class","control_play_btn on");
         }, false);
         
         this.player.addEventListener("durationchange", function () {
             if (this.duration!=Infinity && DioVLOGPlayerObj.duration != this.duration) {
             	DioVLOGPlayerObj.duration = this.duration;
             	DioVLOGPlayerObj.dragEndTime = this.duration - 0;
             	DioVLOGPlayer.prototype.setDisplayInfo.call(DioVLOGPlayerObj);
             };
         }, false);    
    },
    
    /***************************************
    함수명 : setDisplayInfo()
    설명   : 미디어 플레이어 정보표시
    ****************************************/
    setDisplayInfo: function(){
    	var time;
    	if(this.duration == -1) {
    		time = "";
    	} else {
    		time = DioVLOGPlayer.prototype.calcTimestamp.call(this,this.duration);
    	}
        $("#totalTime").empty();
        $("#totalTime").append(time)
    },

    /***************************************
    함수명 : setCnResultCount()
    설명   : 연속어 음성인식 결과 개수 세팅
    ****************************************/
    setCnResultCount: function(cnResultCount){
    	this.cnResultCount = cnResultCount;
    },
    /***************************************
    함수명 : addzero()
    설명   : 미디어 플레이어 정보표시 유틸
    ****************************************/
    addzero: function (n) {
        if(typeof n != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.addzero");
            return 0;
        }
        n -= 0;
        if(10 > n){
            return "0"+n;
        }
        return n;
    },

    /***************************************
    함수명 : calcTimestamp()
    설명   : 미디어 플레이어 정보표시 유틸
    ****************************************/
    calcTimestamp: function (val) {
        var vals = val - 0;
        if(typeof vals != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.calcTimestamp" );
            return 0;
        }
        var hh =  parseInt(vals/3600);
        var min = parseInt(vals/60);
        var sec = parseInt(vals%60);

        var returnVal = '';
        returnVal = DioVLOGPlayer.prototype.addzero.call(this, hh)
        +':'+DioVLOGPlayer.prototype.addzero.call(this, min)
        +':'+DioVLOGPlayer.prototype.addzero.call(this, sec);
        return returnVal;
    },

    /***************************************
    함수명 : calcTimestampPart()
    설명   : 미디어 플레이어 정보표시 유틸(시분초)
    ****************************************/
    calcTimestampPart: function (val, type) {
        var vals = val - 0;
        if(typeof vals != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.calcTimestampPart" );
            return 0;
        }
        var min = parseInt(vals/60);
        var sec = parseInt(vals%60);

        var returnVal = '';

        if(type == 'min'){
        	returnVal = DioVLOGPlayer.prototype.addzero.call(this, min);

        }else if(type == 'sec'){
        	returnVal = DioVLOGPlayer.prototype.addzero.call(this, sec);

        }
        return returnVal;
    },


    /***************************************
    함수명 : getDuration()
    설명   : 미디어 플레이어 재생길이 출력 메소드
    ****************************************/
    getDuration: function(){
        return this.duration;
    },

    /***************************************
    함수명 : getWaveWidth
    설명   : 미디어 플레이어 파형Size 출력 메소드
    ****************************************/
    getWaveWidth: function(){
        return this.waveWidth;
    },

    /***************************************
    함수명 : dioPlay
    설명   : DioVLog 플레이어 재생기능 메소드
    ****************************************/
    dioPlay: function(obj) {
        if(DioVLOGPlayerObj.dragPlayMode){
            MediaPlayer.prototype.setPosition.call(DioVLOGPlayerObj, DioVLOGPlayerObj.dragStartTime - 0);
        }
        MediaPlayer.prototype.play.call(this);

        this.tempBplayerInterval = setInterval(
           function(){
                DioVLOGPlayer.prototype.playerInterVal.call(DioVLOGPlayerObj);
           }
        ,100);

        $(".control_play_btn").attr("onclick", "mediaPlayer.dioPause(this)");
        $(".control_play_btn").attr("class","control_play_btn on");

    },

    /***************************************
    함수명 : dioPause
    설명   : DioVLog 플레이어 일시중지기능 메소드
    ****************************************/
    dioPause: function(obj){
        MediaPlayer.prototype.pause.call(this);
        if(this.tempBplayerInterval != null){
            clearInterval(this.tempBplayerInterval);
            this.tempBplayerInterval = null;
        }

        $("#kwResult_table").find("tr").removeClass("on_t");

        $(".control_play_btn").attr("onclick", "mediaPlayer.dioPlay(this)");
        $(".control_play_btn").attr("class","control_play_btn");
    },

    /***************************************
    함수명 : dioStop
    설명   : DioVLog 플레이어 정지기능 메소드
    ****************************************/
    dioStop: function(){
        MediaPlayer.prototype.stop.call(this);
        MediaPlayer.prototype.setRate.call(this,1);
        DioVLOGPlayer.prototype.playerInterVal.call(this);
        if(this.tempBplayerInterval != null){
            clearInterval(this.tempBplayerInterval);
            this.tempBplayerInterval = null;
        }
        $(".control_play_btn").attr("onclick", "mediaPlayer.dioPlay(this)");
        $(".control_play_btn").attr("class","control_play_btn");

    },

    /***************************************
    함수명 : setDioForware
    설명   : DioVLog 플레이어 앞으로 건너뛰기기능 메소드
    매개변수 : 건너뛰기 시간(SEC)
    ****************************************/
    setDioForware: function(sec){
    	if(DioVLOGPlayerObj.duration == -1) {
        	return false;
        } 
    	var currentTime = MediaPlayer.prototype.getPosition.call(this);
        var maxTermTime = DioVLOGPlayerObj.duration;
        sec = sec -0;

        if(defaultTerm){
            sec = defaultTermPlay; /*defaultTerm값이 true 일경우 지정값을 사용*/
        }
        if(typeof sec != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.setDioForware");
            return false;
        }else if(sec <= 0){
            alert(alertInputErrMinNumber  +": DioVLOGPlayer.setDioForware");
            return false;
        }else if(sec >= maxTermTime){
            alert(alertInputErrMaxNumber  +": DioVLOGPlayer.setDioForware");
            return false;
        }else if(currentTime+sec >= maxTermTime){
        	alert(alertCurrentTimeMax);
            return false;
        }
       
        currentTime += (sec - 0);
        
        MediaPlayer.prototype.setPosition.call(this, currentTime - 0);
    },

    /***************************************
    함수명 : setDioBack
    설명   : DioVLog 플레이어 뒤로 건너뛰기기능 메소드
    매개변수 : 건너뛰기 시간(SEC)
    ****************************************/
    setDioBack: function(sec){
    	if(DioVLOGPlayerObj.duration == -1) {
    		return false;
        }
    	var currentTime = MediaPlayer.prototype.getPosition.call(this);
        var maxTermTime = DioVLOGPlayerObj.duration;
        sec = sec -0;
        if(defaultTerm){
            sec = defaultTermPlay; /*defaultTerm값이 true 일경우 지정값을 사용*/
        }
        
        if(typeof sec != 'number'){
            alert(alertInputErrTypeofNumber  +": DioVLOGPlayer.setDioBack");
            return false;
        }else if(sec <= 0){
            alert(alertInputErrMinNumber  +": DioVLOGPlayer.setDioBack");
            return false;
        }else if(sec >= maxTermTime){
            alert(alertInputErrMaxNumber  +": DioVLOGPlayer.setDioBack");
            return false;
        }
        
        currentTime -= (sec - 0);
        if(currentTime < 0) {
        	currentTime = 0;
        }
        MediaPlayer.prototype.setPosition.call(this, currentTime - 0);
    },



    /***************************************
    함수명 : setDioMute
    설명   : DioVLog 음소거
    ****************************************/
    setDioMute: function(obj){
        var muteFlag = MediaPlayer.prototype.getMute.call(this);
        if(muteFlag){
            MediaPlayer.prototype.setMute.call(this, false);
            $(obj).attr("class","volume_btn");
        }else{
            MediaPlayer.prototype.setMute.call(this, true);
            $(obj).attr("class","volume_btn off");
        }
    },

    /***************************************
    함수명 : setDioVol
    설명   : DioVLog 볼륨조정
    매개변수 :
        volFlag '+' : volSize 만큼 증가
        volFlag '-' : volSize 만큼 감소
        volFlag '0' : volSize 로 적용
    ****************************************/
    setDioVol: function(volFlag, volSize){
        var currentVolSize = MediaPlayer.prototype.getVol.call(DioVLOGPlayerObj);
        if(volFlag == "+"){
            if(!defaultTerm){
                currentVolSize += (volSize - 0);
            }else{
                currentVolSize += defaultTermVol;  /*defaultTerm값이 true 일경우 지정값을 사용*/
            }
        }else if(volFlag == "-"){
            if(!defaultTerm){
                currentVolSize -= (volSize - 0);
            }else{
                currentVolSize -= defaultTermVol;  /*defaultTerm값이 true 일경우 지정값을 사용*/
            }
        }else if(volFlag == "0"){
            currentVolSize = (volSize - 0);
        }else{
            alert(alertErrMSG1);
            return;
        }

        MediaPlayer.prototype.setVol.call(DioVLOGPlayerObj, currentVolSize);
    },

    /***************************************
    함수명 : sectionPlay
    설명   : 구간재생
    매개변수 :
        startPoint : 재생 시작 지점
        endPoint   : 재생 종료 지점
    ****************************************/
    dioSectionPlay: function(obj, startTime, endTime){
    	var maxTermTime = DioVLOGPlayerObj.duration;
        if(typeof startTime != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }else if(startTime <= 0){
            alert(alertInputErrMinNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }else if(startTime >= maxTermTime){
            alert(alertInputErrMaxNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }

        if(typeof endTime != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }else if(endTime <= 0){
            alert(alertInputErrMinNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }else if(endTime >= maxTermTime){
            alert(alertInputErrMaxNumber +": DioVLOGPlayer.dioSectionPlay");
            return false;
        }

        //구간설정
        /*var leftbar = (startTime - 0) / DioVLOGPlayerObj.duration * 100;
        var rightbar = (endTime - 0) / DioVLOGPlayerObj.duration * 100;
        $(".leftbar").css("left",leftbar+"%");
        $(".rightbar").css("left",rightbar+"%");
        $(".leftlayer").css("width",leftbar+"%");
        $(".rightlayer").css("width",(100 - rightbar)+"%");
		*/

        DioVLOGPlayerObj.sectionStartTime = startTime - 0;
        DioVLOGPlayerObj.sectionEndTime = endTime - 0;

        //startPoint 이동
        MediaPlayer.prototype.setPosition.call(DioVLOGPlayerObj, startTime - 0);
        //재생 시작
        DioVLOGPlayer.prototype.dioPlay.call(DioVLOGPlayerObj, obj);
    },

    /***************************************
    함수명 : dioKeywordPlay
    설명   : 구간재생
    매개변수 :
        startPoint : 재생 시작 지점
        endPoint   : 재생 종료 지점
    ****************************************/
    dioKeywordPlay: function(obj, startTime, endTime){
    	var maxTermTime = DioVLOGPlayerObj.duration;
        if(typeof startTime != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }else if(startTime <= 0){
            alert(alertInputErrMinNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }else if(startTime >= maxTermTime){
            alert(alertInputErrMaxNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }

        if(typeof endTime != 'number'){
            alert(alertInputErrTypeofNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }else if(endTime <= 0){
            alert(alertInputErrMinNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }else if(endTime >= maxTermTime){
            alert(alertInputErrMaxNumber +": DioVLOGPlayer.dioKeywordPlay");
            return false;
        }

        /*if(DioVLOGPlayerObj.sectionStartTime == startTime) {
        	alert("현재 재생중인 항목입니다.");
        	return false;
        }*/

        DioVLOGPlayerObj.sectionStartTime = startTime - 0;
        DioVLOGPlayerObj.sectionEndTime = endTime - 0;

        //startPoint 이동
        MediaPlayer.prototype.setPosition.call(DioVLOGPlayerObj, startTime - 0);
        //재생 시작
        DioVLOGPlayer.prototype.dioPlay.call(DioVLOGPlayerObj, obj);
    },

    /***************************************
    함수명 : drawProgress
    설명   : 재생시점 그리기
    ****************************************/

    drawProgress: function(){
    	var cp = DioVLOGPlayerObj.player.currentTime;
    	if(DioVLOGPlayerObj.duration == -1) {
    		document.getElementById("progress_pointer").style.left= 100+'%';
            document.getElementById("progressbar").style.width= 100+'%';
    	} else {
    		document.getElementById("progress_pointer").style.left=(cp/DioVLOGPlayerObj.duration*100)+'%';
            document.getElementById("progressbar").style.width=(cp/DioVLOGPlayerObj.duration*100)+'%';

    	}
        
        //미니맵 싱크 관련
    	if(this.recoding) {
    		var speed = 5;
    		var containerWidth = $(".sound_inner").width();
    		var bgWidth = parseInt($(".sound_inner > .bg_recoding").css("left"));
    		if(containerWidth > bgWidth) {
    			$(".sound_inner > .bg_recoding").css("left", (bgWidth + speed) + "px");	
    		} else {
    			var bigWaveImg = $(".sound_inner > img"); 
    			var bigWaveImgSize = bigWaveImg.width(); 
    			var _moveLeft = parseInt(bigWaveImg.css("left")) - speed;
    			
    			if(-1 * _moveLeft > bigWaveImgSize - containerWidth) _moveLeft = 0;
    			$(".sound_inner > img").css("left", (_moveLeft)+"px");
    		}
    	} else {
            var mapBoxWidth = parseInt(parseInt($(".soundmap").width()) * parseInt($(".soundmap").width()) / $(".sound_inner > img").width()); //미니맵 box width 정보
            var _soundWidth = parseInt($(".soundmap").width() - mapBoxWidth); //미니맵 오른쪽 그림자  max width 정보
    		var _layerBg = $(".mapshadow_left");                   //미니맵 왼쪽 그림자
    		var _layerBg02 = $(".mapshadow_right");                //미니맵 오른쪽 그림자
    		var _map = $(".maphiglight");                          //미니맵 박스
    		var bigWaveImg = $(".sound_inner > img");              //파형 이미지
    		var bigWaveImgSize = bigWaveImg.width();               //파형 이미지 width
    		var miniWaveImgSize = 936;                             //미니맵 파형 이미지 width

    		var _leftLeft = parseInt(_map.css("left")); //미니맵 박스 왼쪽 위치값

    		var _width_temp = parseInt(cp/DioVLOGPlayerObj.duration*DioVLOGPlayerObj.waveWidth); //현재 위치정보
    		var _width = _width_temp - mapBoxWidth/2;

    		//현재 위치가 0 보다 작을경우 처리 -- 왼쪽 미니맵 그림자 처리
    		if(_width < 0) _width = 0;

    		//현재 위치가 미니맵 오른쪽 그림자  max width 값을 넘을경우 처리 -- 오른쪽 미니맵 그림자 처리
    		if(_width > _soundWidth) _width = _soundWidth;

    		var _rightWidth = _soundWidth - _width;                             //현재 미니맵 오른쪽 그림자 width 계산
    		var _moveLeft = parseInt(_leftLeft*bigWaveImgSize/miniWaveImgSize); //현재 음성파형 왼쪽 위치값 계산

    		//미니맵 파형 이동 처리
    		_layerBg.css("width",_width + "px");
    		_layerBg02.css("width",_rightWidth + "px");
    		_map.css("left",_width + "px");

    		//음성파형 이동처리
    		$(".sound_inner > img").css("left",-(_moveLeft)+"px");
    		//맵 싱크 관련
        }
    	$("#playTime").empty();
        $("#playTime").append(DioVLOGPlayer.prototype.calcTimestamp(''+cp+''));

        if(0) {
        	//연속어 음성인식 결과 autoscroll
            var resultTime1 = 0;
            var resultTime2 = 0;
            var positionID;
            var resultCount = this.cnResultCount - 0;
           
            function setCurrentToObj(obj) {
            	if(!obj.hasClass("current")) {
            		obj.addClass("current");
            	}
            }

            $('#cnResultListContent p').removeClass("current");

            for(var indexI = 1; indexI <= resultCount; indexI++){
            	if(resultTime1 == 1){
            		console.log("1111", indexI, resultTime1, resultTime2, positionID, resultCount);
            		setCurrentToObj($("#cnResult_"+indexI));
            		break;
            	}
            	resultTime1 = $("#cnResult_"+indexI).attr('title') - 0;
            	resultTime2 = $("#cnResult_"+(indexI+1)).attr('title') - 0;
            	if(resultTime1 <= cp && indexI == resultCount){
            		console.log("2222",indexI, resultTime1, resultTime2, positionID, resultCount);
            		setCurrentToObj($("#cnResult_"+indexI));
            		break;
            	}
            	console.log("3333", indexI, resultTime1, resultTime2, positionID, resultCount);
            	if(resultTime1 < cp && resultTime2 < cp) continue;
            	if(resultTime1 <= cp && resultTime2 > cp){
            		console.log("4444",indexI, resultTime1, resultTime2, positionID, resultCount);
            		setCurrentToObj($("#cnResult_"+indexI));
            		positionID = indexI - 3;
            		console.log("5555", indexI, resultTime1, resultTime2, positionID, resultCount);
            		if(positionID > 0) $("#cnResultListContent").mCustomScrollbar("scrollTo","#cnResult_"+positionID);
            		else               $("#cnResultListContent").mCustomScrollbar("scrollTo","#cnResult_1");

            		break;
            		//오토스크롤 참고 URL :  http://manos.malihu.gr/tuts/custom-scrollbar-plugin/complete_examples.html
            		//                 http://manos.malihu.gr/jquery-custom-content-scroller/
            	}
            }
        }
    },
    /***************************************
    함수명 : playLoop
    설명   : 미디어 플레이어 반복정보출력기능  메소드
    ****************************************/
    playLoop: function(){
    	var loop = this.player.loop;
        if(loop){
        	this.player.loop = false;
        	$(".control_allreplay_btn").attr("class","control_allreplay_btn");
        }else{
        	this.player.loop = true;
        	$(".control_allreplay_btn").attr("class","control_allreplay_btn on");
        }
    },


    /***************************************
    함수명 : playChange
    설명   : 현 재생 정보 표시(음성재생 상태값을 받아 UI상태 변경)
    ****************************************/
    playChange: function(){
        //현재 재생 시간
        var cp = DioVLOGPlayerObj.player.currentTime - 0;
        //구간 종료 시간
        var endTime = DioVLOGPlayerObj.sectionEndTime - 0;
        //구간 재생여부 확인후 재생범위를 넘을 경우 재생중지
        if(cp >= endTime && endTime != 0){
            DioVLOGPlayerObj.sectionEndTime = 0;
            DioVLOGPlayer.prototype.dioPause.call(DioVLOGPlayerObj);
        }

        var dragEndTime = DioVLOGPlayerObj.dragEndTime - 0;
        var loopState =  DioVLOGPlayer.prototype.getLoop.call(DioVLOGPlayerObj);
        if(cp >= dragEndTime && DioVLOGPlayerObj.dragPlayMode){
            DioVLOGPlayerObj.player.currentTime = DioVLOGPlayerObj.dragStartTime - 0;

            //반복설정이 아닐경우
            if(!loopState)    DioVLOGPlayer.prototype.dioPause.call(DioVLOGPlayerObj);
        }  
    },

    /***************************************
    함수명 : playerInterVal
    설명   : 재생 정보 표시 함수 호출
    ****************************************/
    playerInterVal: function(){
        DioVLOGPlayer.prototype.drawProgress.call(this);
        DioVLOGPlayer.prototype.playChange.call(this);
    },

    /***************************************
    함수명 : getDragStartTime
    설명   : 드레그 시작 재생정보 반환
    ****************************************/
    getDragStartTime: function(){
        return DioVLOGPlayerObj.dragStartTime;
    },

    /***************************************
    함수명 : getDragEndTime
    설명   : 드레그 종료 재생정보 반환
    ****************************************/
    getDragEndTime: function(){
        return DioVLOGPlayerObj.dragEndTime;
    },

    /***************************************
    함수명 : setDragPlayMode
    설명   : 수동 구간재생 설정 처리
    ****************************************/
    setDragPlayMode: function(dragMode){
        if(typeof dragMode != "boolean"){
            alert(alertInputErrTypeofBoolean +": DioVLOGPlayer.setDragPlayMode");
            return false;
        }
        DioVLOGPlayerObj.dragPlayMode = dragMode;
    },

    /***************************************
    함수명 : dragEvent
    설명   : 드레그 이벤트 처리
    ****************************************/
    //dragEvent: function(){
        //재생 시작 구간 정보 처리
    //    $(".dragStartPlay").draggable({cursor: "move",stack: ".draggable",opacity: 1.0,containment :  $("#dragPlayArea") /*드레그 진행중 처리 코드*/ });
    //    $(".dragStartPlay").bind("dragstart",function(event, ui){/*드레그 시작시 처리 코드*/});
    //    $(".dragStartPlay").bind("dragstop", function(event, ui){/*드레그 정지시 처리 코드*/
            /*설정위치 계산*/
    //        var playStartPoint = ((ui.position.left) - 0);

            /*설정위치로 재생시작 시간 계산*/
    //        var dragStartTime = (playStartPoint * (DioVLOGPlayerObj.duration - 0) / DioVLOGPlayerObj.waveWidth -0).toFixed(2);
    //        if(dragStartTime > ((DioVLOGPlayerObj.dragEndTime -0) - 2)) dragStartTime = DioVLOGPlayerObj.dragEndTime -2;
    //        if(dragStartTime < 0) dragEndTime = 0;
    //        DioVLOGPlayerObj.dragStartTime = dragStartTime;
    //        alert("위치값 정보 확인 : " + DioVLOGPlayerObj.dragStartTime + "sec" +": DioVLOGPlayer.dragEvent");

            /*설정위치로 이미지 처리*/
    //    });

        //재생 종료 구간 정보 처리
    //    $(".dragEndPlay").draggable({cursor: "move",stack: ".draggable",opacity: 1.0,containment :  $("#dragPlayArea") /*드레그 진행중 처리 코드*/ });
    //    $(".dragEndPlay").bind("dragstart",function(event, ui){/*드레그 시작시 처리 코드*/});
    //    $(".dragEndPlay").bind("dragstop", function(event, ui){/*드레그 정지시 처리 코드*/
            /*설정위치 계산*/
    //        var playEndPoint = (DioVLOGPlayerObj.waveWidth - 0) + ((ui.position.left) - 0);

            /*설정위치로 재생시작 시간 계산*/
    //        var dragEndTime = (playEndPoint * (DioVLOGPlayerObj.duration - 0) / DioVLOGPlayerObj.waveWidth -0).toFixed(2);
    //        if(dragEndTime < ((DioVLOGPlayerObj.dragStartTime - 0) + 2)) dragEndTime = DioVLOGPlayerObj.dragStartTime + 2;
    //        if(dragEndTime > DioVLOGPlayerObj.duration - 0) dragEndTime = DioVLOGPlayerObj.duration;
    //        DioVLOGPlayerObj.dragEndTime = dragEndTime;
    //        alert("위치값 정보 확인 : " + DioVLOGPlayerObj.dragEndTime + "sec" +": DioVLOGPlayer.dragEvent");

            /*설정위치로 이미지 처리*/
    //    });

        //볼륨 조정
    //    $(".dragPlayVol").draggable({cursor: "move",stack: ".draggable",opacity: 1.0,containment :  $("#dragVolArea")/*드레그 진행중 처리 코드*/ });
    //    $(".dragPlayVol").bind("dragstart",function(event, ui){/*드레그 시작시 처리 코드*/});
    //    $(".dragPlayVol").bind("dragstop", function(event, ui){/*드레그 정지시 처리 코드*/
    //        var volSize = ((ui.position.left).toFixed(1) - 0) * 2;
    //        DioVLOGPlayer.prototype.setDioVol.call(DioVLOGPlayerObj,"0",volSize);
    //    });
    //}
});
