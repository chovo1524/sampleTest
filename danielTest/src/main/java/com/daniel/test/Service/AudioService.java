package com.daniel.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.test.Dao.AudioDao;

@Service("audioService")
public class AudioService {

	@Autowired
	AudioDao audioDao;
	
	public List<Object> getAudioList(String test) {
        return audioDao.getAudioList(test);
    }

}
