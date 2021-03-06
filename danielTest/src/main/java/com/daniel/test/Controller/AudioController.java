package com.daniel.test.Controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daniel.test.Service.AudioService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class AudioController {

	@Autowired
	private ServletContext servletContext;
	@Resource(name = "audioService")
	AudioService audioService;

	private static final Logger logger = LoggerFactory.getLogger(AudioController.class);

	/**
	 * index page
	 * @throws IOException
	 */
	@RequestMapping(value = "/index")
	public String index(Model model) {
		logger.info("Welcome Index!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "index";
	}
	
	/**
	 * loading page
	 * @throws IOException
	 */
	@RequestMapping(value = "/loading", method = RequestMethod.GET)
	public String loading(Model model, HttpServletRequest req) {
		logger.info("Welcome Loading!");
		String type = req.getParameter("type");
		String callNo = req.getParameter("callNo");
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("TYPE", type);
		map.put("CALL_NO", callNo);
		
		model.addAttribute("getData", map);
		
		return "loading";
	}
	
	/**
	 * live page
	 * @throws IOException
	 */
	@SuppressWarnings("unused")
	@RequestMapping(value = "/index/live", method = RequestMethod.GET)
	public String live(Model model, HttpServletRequest req) {
		logger.info("Welcome Live!");
		
		String callNo = req.getParameter("callNo");
		System.out.println("CALL_NO : " + callNo);
		
		List<HashMap<String, Object>> chatList = audioService.getAudioList(callNo);
		int i = 0;
		int startTime = 0;
		int endTime = 0;
		int callSilenceDurationTotal = 0; // 총 묵음
		int callLappingDurationTotal = 0; // 총 말 겹침
		List callSilenceDuration = new ArrayList(); // 묵음 구간
		List callLappingDuration = new ArrayList(); // 말 겹침 구간
		for(HashMap<String, Object> time : chatList) {
			startTime = Integer.valueOf((String) time.get("START_TIME"));
			int check = startTime - endTime;
			endTime = Integer.valueOf((String) time.get("END_TIME"));
			
			HashMap<String, Object> callSilenceCheckMap = new HashMap<String, Object>();
			HashMap<String, Object> callLappingCheckMap = new HashMap<String, Object>();
			
			if (check > 0) {
				callSilenceDurationTotal += check;
				callSilenceCheckMap.put("startTime", Integer.valueOf((String) chatList.get(i).get("END_TIME")) / 1000);
				callSilenceCheckMap.put("endTime", Integer.valueOf(startTime) / 1000);
				callSilenceDuration.add(callSilenceCheckMap);
				i++;
			} else if (check < 0) {
				callLappingDurationTotal += check;
				callLappingCheckMap.put("startTime", Integer.valueOf(startTime) / 1000);
				callLappingCheckMap.put("endTime", Integer.valueOf((String) chatList.get(i).get("END_TIME")) / 1000);
				callLappingDuration.add(callLappingCheckMap);
				i++;
			}
			
			System.out.println("StarTime : " + startTime + " / EndTime : " + endTime);
		}
		callSilenceDurationTotal = callSilenceDurationTotal / 1000;
		callLappingDurationTotal = Math.abs(callLappingDurationTotal / 1000);
		System.out.println("묵음 : " + callSilenceDurationTotal + " / 말 겹침 : " + callLappingDurationTotal);
		
		
		model.addAttribute("callSilenceDuration", callSilenceDuration);
		model.addAttribute("callLappingDuration", callLappingDuration);
		model.addAttribute("callSilenceDurationTotal", callSilenceDurationTotal);
		model.addAttribute("callLappingDurationTotal", callLappingDurationTotal);
		model.addAttribute("chatList", chatList);
		model.addAttribute("callNo", callNo);
		
		return "live";
	}
	
	/**
	 * file write
	 * @throws IOException
	 */
	@RequestMapping(value = "/index/write")
	public @ResponseBody void write() throws Exception {
		logger.info("Welcome Write!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		
		try {
			bis = new BufferedInputStream(new FileInputStream(realFilePath + "testWav.wav"));
			bos = new BufferedOutputStream(new FileOutputStream(realFilePath + "copytestWav.wav"));
			
			byte[] buf = new byte[1024];
			
			int readByte = 0;
			
			while((readByte = bis.read(buf, 0, buf.length)) != -1) {
				Thread.sleep(3);
				bos.write(buf, 0, readByte);
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(bis != null)	bis.close();
			if(bos != null)	bos.close();
		}
	}
	
	/**
	 * file reading
	 * @throws IOException
	 */
	@RequestMapping(value = "/index/reading", method = RequestMethod.GET)
	public @ResponseBody int reading(HttpServletResponse resp) throws Exception {
		logger.info("Welcome Reading!");
		
		Thread.sleep(3000);
		
		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		FileInputStream fis = null;
		
		ServletOutputStream sos = null;
		
		resp.setContentType("audio/x-wav");
		resp.setHeader("Content-Disposition", "dong.wav");
		
		try {
			fis = new FileInputStream(realFilePath + "copytestWav.wav");
			sos = resp.getOutputStream(); // 브라우저에 보낼 Stream
			
			// header 파일 설정 하기
			boolean bigEndian = false;
		    boolean signed = true;
			int bits = 16;
		    int channels = 2;
			double sampleRate = 44100.0;
			double seconds = 1000.0;
			float[] buffer = new float[(int) (seconds * sampleRate)];
			AudioFormat format;
		    format = new AudioFormat((float)sampleRate, bits, channels, signed, bigEndian);
			AudioInputStream audioInputStream;
			audioInputStream = new AudioInputStream(fis, format,buffer.length);
		    
			byte[] buf = new byte[1024];
			int readByte = 0;
			while((readByte = audioInputStream.read(buf, 0, buf.length)) != -1) {
				sos.write(buf, 0, readByte);
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(fis != null)	fis.close();
			if(sos != null)	sos.close();
		}
		
		return 0;
	}

	/**
	 * file read
	 * @throws IOException
	 */
	@RequestMapping(value = "/index/read", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> read(HttpServletResponse resp, HttpServletRequest req, Map<String, Object> map) throws Exception {
		logger.info("Welcome Read!");
		
		String callNo = req.getParameter("CALL_NO");
		String type = req.getParameter("TYPE");
		System.out.println("CALL_NO : " + callNo + " / TYPE : " + type);
		
		String url = "";
		if(type.equals("type1")) {
			url = "index/record";
		} else if (type.equals("type2")) {
			url = "index/live";
		}
		
		map.put("url", url);
		map.put("callNo", callNo);
		
		return map;
	}
	
}
