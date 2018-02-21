package com.daniel.test.Controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daniel.test.Service.AudioService;
import com.daniel.test.Vo.AudioVo;

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
	@RequestMapping(value = "/loading", method = RequestMethod.POST)
	public String loading(Model model, AudioVo audioVo) {
		logger.info("Welcome Loading!");
		
		model.addAttribute("getData", audioVo);
		
		return "loading";
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
		logger.info("Welcome Write! End");
	}

	/**
	 * file read
	 * @throws IOException
	 */
	@RequestMapping(value = "/index/read", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> read(HttpServletResponse resp, HttpServletRequest req, Map<String, Object> map) throws Exception {
		logger.info("Welcome Read!");
		
		map.put("url", "index/live");
		System.out.println(req.getParameter("data"));
		List<Object> chatList = audioService.getAudioList("dd");
		map.put("chatList", chatList);
		
		Thread.sleep(3000);
		
		/*String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
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
		}*/
		
		return map;
	}
	
}
