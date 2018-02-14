/*
 * 작성일자 : 2017-01-23
 * 작성자    : 셀바스 AI 홍석원
 * 버전       : 1.0
 * IE 미디어 플레이어용 오디오 자바스크립트 객체 
 * 기능 메소드
 *  -> MediaPlayer(생성자)
 *  -> play(재생)/stop(정지)/pause(일시정지)
 *  -> setVol(볼륨조정) 및 getVol(설정정보 반환)
 *  -> setRate(재생속도조정) 및 getRate(재생속도 반환)
 *  -> getState(상태정보)
 *  -> setLoop(반복설정) 및 setLoop(설정정보 반환)
 *  -> setMute(음소거설정) 및 setMute(설정정보 반환)
 *  -> setPosition(재생위치설정) 및 setPosition(설정정보 반환)
 *  
 *  사전조건: Base.js 라이브러리 필요
 */

var MediaPlayer = Base.extend({
    /***************************************
    생성자 : MediaPlayer
    설명   : 미디어 플레이어 객체 생성자
    매개변수 : 
        playerId(object 태그내 id 정보)
        url(음성파일 경로)
        rate(재생속도) 
    ****************************************/
    constructor: function(playerId, url, rate){
        this.url = url;
        this.rate = rate;
        this.playerId = playerId;
        this.player = document.getElementById(this.playerId);
        this.player.url = this.url;
        //this.player.launchURL(url);
        this.player.settings.rate = this.rate;
        this.player.uiMode = 'Invisible';
        this.player.controls.stop();
    },
    
    getUrl: function(){
        return this.url;
    },
    
    getRate: function(){
        return this.rate;
    },
    
    getPlayerId: function(){
        return this.playerId;
    },
    
    getPlayer: function(){
        return this.player;
    },

    /***************************************
    함수명 : play
    설명   : 미디어 플레이어 재생기능 메소드
    ****************************************/
    play: function(){
        this.player.controls.play();
    }, 
    
    /***************************************
    함수명 : stop
    설명   : 미디어 플레이어 정지기능 메소드
    ****************************************/
    stop: function(){
        this.player.controls.stop();
    }, 
    
    /***************************************
    함수명 : pause
    설명   : 미디어 플레이어 일시정지기능 메소드
    ****************************************/
    pause: function(){
        this.player.controls.pause();
    }, 
    
    /***************************************
    함수명 : setVol
    설명   : 미디어 플레이어 볼륨조정기능 메소드
    매개변수 : 볼륨정보(0~100)
    ****************************************/
    setVol: function(vol){
        this.player.settings.volume = vol - 0;
    },
    
    /***************************************
    함수명 : getVol
    설명   : 미디어 플레이어 볼륨정보 리턴 메소드
    ****************************************/
    getVol: function(){
        return this.player.settings.volume;
    },
    
    /***************************************
    함수명 : setRate
    설명   : 미디어 플레이어 재생속도 조정기능 메소드
    매개변수 : 속도정보
    ****************************************/
    setRate: function(rate){
        this.player.settings.rate = rate;
    },
    
    /***************************************
    함수명 : getRate
    설명   : 미디어 플레이어 재생속도 정보 리턴 메소드
    ****************************************/
    getRate: function(){
        return this.player.settings.rate;
    }, 
    
    /***************************************
    함수명 : getState
    설명   : 재생상태 정보 리턴 기능 메소드
    ****************************************/
    getState: function(){
        var playStateStr = '';
        switch(this.player.playState){
        case 0:
            playStateStr = "undefind";
            break;
        case 1:
            playStateStr = "stopped";
            break;
        case 2:
            playStateStr = "paused";
            break;
        case 3:
            playStateStr = "playing";
            break;
        case 4:
            playStateStr = "scanForward";
            break;
        case 5:
            playStateStr = "scanReverse";
            break;
        case 6:
            playStateStr = "buffering";
            break;
        case 7:
            playStateStr = "waiting";
            break;
        case 8:
            playStateStr = "mediaEnded";
            break;
        case 9:
            playStateStr = "transitioning";
            break;
        case 10:
            playStateStr = "ready";
            break;
        case 11:
            playStateStr = "Reconnecting";
            break;
        default:
            playStateStr = "";
            break;
        }
        return playStateStr;
    },

    /***************************************
    함수명 : setLoop
    설명   : 미디어 플레이어 반복 활성화기능 메소드
    매개변수 : true(반복재생) or false(반복없음)
    ****************************************/
    setLoop: function(loop){
        this.player.settings.setMode('loop',loop);
    },

    /***************************************
    함수명 : getLoop
    설명   : 미디어 플레이어 반복정보출력기능  메소드
    ****************************************/
    getLoop: function(){
        return this.player.settings.getMode('loop');
    },

    /***************************************
    함수명 : setMute
    설명   : 미디어 플레이어 음소거 활성화기능 메소드
    매개변수 : true(음소거해제) or false(음소거활성)
    ****************************************/
    setMute: function(mute){
        this.player.settings.mute = mute;
    },

    /***************************************
    함수명 : getMute
    설명   : 미디어 플레이어 음소거 활성화정보 출력기능 메소드
    ****************************************/
    getMute: function(){
        return this.player.settings.mute;
    },

    /***************************************
    함수명 : setPosition
    설명   : 미디어 플레이어 재생위치 설정기능 메소드
    매개변수 : position(재생시간정보:SEC)
    ****************************************/
    setPosition: function(position){
        this.player.controls.currentPosition = position;
    },

    /***************************************
    함수명 : getPosition
    설명   : 미디어 플레이어 재생위치 반환 설정기능 메소드
    ****************************************/
    getPosition: function(){
        return this.player.controls.currentPosition;
    }
});
