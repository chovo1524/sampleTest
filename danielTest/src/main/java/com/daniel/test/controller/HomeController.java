package com.daniel.test.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
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
	
	/* file read & write */
	@RequestMapping(value = "/readWrite", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> readWrite(Map<String, Object> map) {
		logger.info("Welcome readWrite!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\"; // 파일경로
		System.out.println(realFilePath);

		int i = 0;
		try {
			FileInputStream fis = new FileInputStream(realFilePath + "testPcm.wav");
			FileOutputStream fos = new FileOutputStream(realFilePath + "dong.wav");
			AudioInputStream ais = AudioSystem.getAudioInputStream(new File(realFilePath + "testPcm.wav"));
			String getFormat = ais.getFormat().toString();
			System.out.println(getFormat);
			
			/*while ((i = fis.read()) != -1) {
				fos.write(i);
				System.out.print((char) i);
			}*/
			
			// 파일 내용을 담을 버퍼(?) 선언
			byte[] readBuffer = new byte[1024];
			while ((i = fis.read(readBuffer, 0, readBuffer.length)) != -1) {
				fos.write(readBuffer);
				// System.out.println(i);
			}
			System.out.println(new String(readBuffer));

			ais.close();
			fis.close();
			fos.close();
		} catch (Exception e) {
			System.out.println("Error with File Stream Read");
		}

		map.put("type", "read");

		return map;
	}
	
	/* file write */
	@RequestMapping(value = "/write", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> write(Map<String, Object> map) throws Exception {
		logger.info("Welcome write!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		
		try {
			bis = new BufferedInputStream(new FileInputStream(realFilePath + "testPcm.wav"));
			bos = new BufferedOutputStream(new FileOutputStream(realFilePath + "copyTestPcm.wav"));
			
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
		
		map.put("type", "write");

		return map;
	}

	/* file read */
	@RequestMapping(value = "/read", method = RequestMethod.GET)
	public @ResponseBody int read(HttpServletResponse resp) throws Exception {
		logger.info("Welcome read!");

		int playTime = 0;

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		FileInputStream fis = null;
		
		ServletOutputStream sos = null;
		
		resp.setContentType("audio/x-wav");
		resp.setHeader("Content-Disposition", "dong.wav");
		resp.setBufferSize(200);
		
		try {
			AudioFileFormat aff = AudioSystem.getAudioFileFormat(new File(realFilePath + "copyTestPcm.wav"));
			AudioFormat af = aff.getFormat();
			
			fis = new FileInputStream(realFilePath + "copyTestPcm.wav");
			sos = resp.getOutputStream(); // 브라우저에 보낼 Stream
			
			int size = fis.available();
			
			int channels = af.getChannels();
			int frameRate = (int) af.getFrameRate();
			int bits = af.getSampleSizeInBits();
			playTime = size / ((channels * frameRate * bits) / 8);
			
			System.out.println("playTime : " + playTime);
			
			byte[] buf = new byte[1024];
			int readByte = 0;
			int k = 0;
			while((readByte = fis.read(buf, 0, buf.length)) != -1) {
				k += 1;
				//if(k > 200) {
					//fis.mark(k);
					sos.write(buf, 0, readByte);
				//}
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(fis != null)	fis.close();
			if(sos != null)	sos.close();
		}
		return playTime;
	}
	
	/* file test */
	@RequestMapping(value = "/stream", method = RequestMethod.GET)
	public void stream(Model model, HttpServletResponse resp, byte[] bFile) throws Exception {
		logger.info("Welcome stream!");

		String realFilePath = servletContext.getRealPath("/") + "resources\\file\\";
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		ServletOutputStream sos = null;
		
		BufferedInputStream cbis = null;
		
		resp.setContentType("audio/x-wav");
		resp.setHeader("Content-Disposition", "dong.wav");
		
		
		/*
		 * 원본 wav 파일을 복사를 하고 복사중인 파일을 가져와 출력 및 재생 방식
		 */
		try {
			bis = new BufferedInputStream(new FileInputStream(realFilePath + "testPcm.wav")); // 처음 불러올 완성된 파일
			bos = new BufferedOutputStream(new FileOutputStream(realFilePath + "copyTestPcm.wav")); // 저장중인 파일
			sos = resp.getOutputStream(); // 브라우저에 보낼 Stream
			cbis = new BufferedInputStream(new FileInputStream(realFilePath + "copyTestPcm.wav")); // 불러올 저장중인 파일
			
			byte[] buf = new byte[1024];
			byte[] sBuf = new byte[1024];
			
			int readByte = 0;
			long start = new Date().getTime();
			
			// 파일 뒷 부분부터 불러오기 위함
			File testFile = new File(realFilePath + "copyTestPcm.wav");
			int k =0;
			
			while((readByte = bis.read(buf, 0, buf.length)) != -1) {
				//sos.write(buf, 0, readByte);
				bos.write(buf, 0, readByte); // 저장중인 파일
				
				//
				System.out.println("==>"+testFile.length());
				k ++;
				
				//
				if(k >200) {
					cbis.skip(testFile.length()-1024);
					
					while((cbis.read(sBuf, 0, sBuf.length)) != -1) { // 저장중인 파일을 읽어오기 
						sos.write(sBuf, 0, readByte); // 저장중인 파일을 읽어와 브라우저에 Stream 보내기
					}
				}
			}
			long end = new Date().getTime();
			SimpleDateFormat sdf = new SimpleDateFormat("MM:ss");
			String time = sdf.format(end-start);
			System.out.println("복사시간 : " + time);
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(bis != null)	bis.close();
			if(bos != null)	bos.close();
			if(sos != null)	sos.close();
		}
		
		
		/*
		 * 파일 포맷 정보 보기
		 */
		/*AudioFileFormat aff = AudioSystem.getAudioFileFormat(new File(realFilePath + "testPcm.wav"));
		AudioFormat af = aff.getFormat();
		System.out.println(aff.toString());
		System.out.println(af.toString());
		System.out.println("Playback Time : " + aff.getFrameLength() / af.getFrameRate());*/
		
		
		/*
		 * 오디오 데이터가 포함 된 InputStream 주어지면 입력 데이터의 WAV 변환을 포함하는 byte 배열 생성 방식
		 */
		/*String uploadedFileLocation = realFilePath;
		String fileName = "test";
		
	    AudioInputStream source;
	    AudioInputStream pcm;
	    InputStream b_in = new ByteArrayInputStream(bFile);
	    source = AudioSystem.getAudioInputStream(new BufferedInputStream(b_in));
	    pcm = AudioSystem.getAudioInputStream(AudioFormat.Encoding.PCM_SIGNED, source);
	    File newFile = new File(uploadedFileLocation + fileName);
	    AudioSystem.write(pcm, Type.WAVE, newFile);

	    source.close();
	    pcm.close();*/
	}

}
