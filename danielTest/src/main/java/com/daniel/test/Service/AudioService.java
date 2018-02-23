package com.daniel.test.Service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.test.Dao.AudioDao;

@Service("audioService")
public class AudioService {

	@Autowired
	AudioDao audioDao;
	
	public List<HashMap<String, Object>> getAudioList(String callNo) {
        return audioDao.getAudioList(callNo);
    }

}
