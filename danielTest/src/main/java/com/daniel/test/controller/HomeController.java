package com.daniel.test.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	@Autowired
	private ServletContext servletContext;

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 * 
	 * @throws IOException
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) {
		logger.info("Welcome home!");

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	
	/* script Play */
	@RequestMapping(value = "/play", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> play(Map<String, Object> map) {
		logger.info("Welcome Play!");

		String filePath = "/resources/file/testWav.wav"; // 파일경로

		map.put("type", "play");
		map.put("filePath", filePath);

		return map;
	}

	
	/* file read & write */
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> read(Map<String, Object> map) {
		logger.info("Welcome Read!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\"; // 파일경로

		System.out.println(realFilePath);

		try {
			int i = 0;
			FileInputStream fis = new FileInputStream(realFilePath + "testWav.wav");
			FileOutputStream fos = new FileOutputStream(realFilePath + "dong.wav");
			
			/*while ((i = fis.read()) != -1) {
				fos.write(i);
				System.out.print((char) i);
			}*/
			
			String[] dd;
			
			//파일 내용을 담을 버퍼(?) 선언
            byte[] readBuffer = new byte[1024];
            while ( (i=fis.read(readBuffer, 0, readBuffer.length)) != -1) {
            	//fos.write(fis.read( readBuffer ));
            	fos.write(readBuffer);
            	//System.out.println(i);
            }

            System.out.println( new String( readBuffer ) ); //출력
            
			fis.close();
			fos.close();
		} catch (Exception e) {
			System.out.println("Error with File Stream Read");
		}

		map.put("type", "read");

		return map;
	}

	/* java Play */
	@RequestMapping(value = "/javaPlay", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> javaPlay(Map<String, Object> map) {
		logger.info("Welcome javaPlay!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\"; // 파일경로

		System.out.println(realFilePath);

		try {
			File file = new File(realFilePath + "testWav.wav");
			System.out.println(file.exists()); // true
			AudioInputStream stream = AudioSystem.getAudioInputStream(file);
			Clip clip = AudioSystem.getClip();
			clip.open(stream);
			clip.start();

			Thread.sleep(5000);
			clip.close();
		} catch (Exception e) {
			System.out.println("Error with File javaPlay!");
		}

		map.put("type", "javaPlay");

		return map;
	}
	
}