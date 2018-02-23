package com.daniel.test.Dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.test.Dao.AudioDao;

@Service
public class AudioDao {
	
	@Autowired
    SqlSessionTemplate sqlSessionTemplate;
	
	public List<HashMap<String, Object>> getAudioList(String callNo) {
        return sqlSessionTemplate.selectList("selectAudioList", callNo);
    }

}